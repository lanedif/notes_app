# notes_app
Application for parsing notes for actions and organizing into a simple webpage. The overall goal is Simple, Fast, and Clean fron end for notes

## Usage

```
cd ./note_app
python3 -m http.server 8000
```

### Why
There's probably a ton of CRUD apps that do this (or something like it) right out of the box, but there's so many that "meet the bar", but still aren't exactly what I want and I figured that with the help of AI I can beuild exactly the features I want with relatively little effort and have some fun along the way.

### Background
In my career I've found we have a ton of meetings with disorganized discussion and no record of notes, so about a year ago I made a habbit of capturing all of the meeting notes in markdown because it is fast, easy, requires no internet, where as a lot of the web based tools take time to start up login, etc. While I've done a great job capturing notes and actions I've struggled to find all of my outstanding actions, assign them, give them due dates, priorities, etc. and (again) while I could do this in Jira it's just crazy slow and I get very frustrated with the "click happy" Jira Experience. 

### What is this doing
This applicaiton is very opinionated in what it expects the flow and operation of how you use it. 

1. This applicaiton expects that your day to day notes are in .md files 
2. That you capture your "actions" in the format `- action:` followed by some info on what the action is

The Application is intended to either be run locally on your files OR in a pipeline so that as your notes are updated, there's CI/CD to update the page serving them in cleaner format.

### Future Features
I'm planning to add additional features to make this easier to use and more intuitive. Things like::
- The ability to sort cards based on their status, assignee, etc.
- The ability to export the whole thing as a CSV
- The ability to live edit the corresponding markdown -- This may result in needing a DB or allowing your browser access to certiain local files, which I could see being dangerous
- General color and interface updates to look cleaner