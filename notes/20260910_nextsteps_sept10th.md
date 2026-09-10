
## Next septs to expand on notes
- create a new structure of the folders that are used to track notes

```
my-notes/
├── notes/
│   ├── 20260910 Meeting with Vendors Sept 10th.md
│   └── 20260911 Product Planning Sept 11th.md
├── site/
│   ├── index.html
│   └── app.js
├── scripts/
│   └── build_actions.py
├── generated/
│   └── actions.json
└── .github/
    └── workflows/
        └── publish.yml
```

- suggests including a [status] for every action like this:
    - status: [open], [done], [waiting], [blocked], [cancelled]

        - action: Chris, follow up with vendors on the AI strategy [open] [due: 2026-09-17]
        - action: Alex, send revised proposal [waiting]
        - action: Jamie, confirm meeting date [done]
        
- sugegsts connecting the whole app to git and using this python app `../notes_app/scripts/build_actions.py`

- testing they python script locally 

- outputting the actions into a json file in ../notes_app/generated/actions.json
    - an example is there.

- creating a webpage that interracts with an app file and json

