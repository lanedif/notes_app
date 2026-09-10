from pathlib import Path
from datetime import datetime, timezone
import json
import re

NOTES_DIR = Path("notes")
OUTPUT_FILE = Path("generated/actions.json")

ACTION_RE = re.compile(
    r"^\s*-\s*action\s*:\s*(?P<text>.+?)\s*$",
    re.IGNORECASE,
)

STATUS_RE = re.compile(
    r"\[(?P<status>open|done|waiting|blocked|cancelled)\]",
    re.IGNORECASE,
)

DUE_RE = re.compile(
    r"\[due:\s*(?P<due>[^\]]+)\]",
    re.IGNORECASE,
)


def extract_action(line):
    match = ACTION_RE.match(line)
    if not match:
        return None

    original_text = match.group("text").strip()

    status_match = STATUS_RE.search(original_text)
    due_match = DUE_RE.search(original_text)

    status = (
        status_match.group("status").lower()
        if status_match
        else "open"
    )

    due = due_match.group("due").strip() if due_match else ""

    clean_text = STATUS_RE.sub("", original_text)
    clean_text = DUE_RE.sub("", clean_text)
    clean_text = clean_text.strip()

    return {
        "text": clean_text,
        "status": status,
        "due": due,
    }


actions = []

for path in sorted(NOTES_DIR.rglob("*.md")):
    relative_path = path.relative_to(NOTES_DIR)
    lines = path.read_text(encoding="utf-8").splitlines()

    for line_number, line in enumerate(lines, start=1):
        action = extract_action(line)

        if action:
            action.update({
                "source": str(relative_path),
                "line": line_number,
            })
            actions.append(action)

actions.sort(key=lambda item: (
    item["status"] != "open",
    item["due"] or "9999-12-31",
    item["source"],
    item["line"],
))

output = {
    "generated_at": datetime.now(timezone.utc).isoformat(),
    "actions": actions,
}

OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
OUTPUT_FILE.write_text(
    json.dumps(output, indent=2, ensure_ascii=False) + "\n",
    encoding="utf-8",
)

print(f"Generated {len(actions)} actions")
