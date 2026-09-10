let allActions = [];
let currentFilter = "open";

async function loadActions() {
  const response = await fetch("actions.json");
  const data = await response.json();

  allActions = data.actions;

  document.getElementById("summary").textContent =
    `${countOpen(allActions)} outstanding actions · ` +
    `Updated ${new Date(data.generated_at).toLocaleString()}`;

  render();
}

function countOpen(actions) {
  return actions.filter(action =>
    ["open", "waiting", "blocked"].includes(action.status)
  ).length;
}

function showStatus(status) {
  currentFilter = status;
  render();
}

function render() {
  const container = document.getElementById("actions");

  const visibleActions = allActions.filter(action => {
    if (currentFilter === "all") return true;
    return action.status === currentFilter;
  });

  container.innerHTML = visibleActions.map(action => {
    const source = encodeURIComponent(action.source);

    return `
      <tr>
        <td>
          <span class="status ${escapeHtml(action.status)}">
            ${escapeHtml(action.status)}
          </span>
        </td>
        <td>${escapeHtml(action.text)}</td>
        <td>${escapeHtml(action.due || "—")}</td>
        <td>
          <span class="muted">
            ${escapeHtml(action.source)}:${action.line}
          </span>
        </td>
      </tr>
    `;
  }).join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

loadActions().catch(error => {
  document.getElementById("summary").textContent =
    "Could not load action data.";
  console.error(error);
});
