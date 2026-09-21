---
name: principle-divide-the-work
description: "Divide the work when a task splits into independent parts, such as several files, sources, or checks whose results do not depend on each other, or when one step would flood the main thread with bulk output. Give each part to its own subagent and merge short summaries."
---

# Divide the Work

Split a task into subtasks when its parts are independent. Each subtask runs in its own subagent, and the main thread receives only its summary. Even division keeps the main context small and lets the parts run in parallel.

**Why:** Raw output from every part piles up in one context. Attention thins, reasoning degrades, and the session stalls. Independent parts gain nothing from sharing a context.

## Split test

Divide when both hold:

- **Independent.** Every subtask can start from the inputs at hand. Each one owns its files and state exclusively.
- **Weighty.** Doing a part inline would put more raw material in the main thread than its result is worth: many files, long documents, verbose logs, screenshots.

Keep the work inline when parts run in sequence, share state, or take a few lines each. Every subagent starts cold, so a small part costs more to brief than to do.

## Divide evenly

- Cut along natural seams: one file, module, source, or question per subtask.
- Size subtasks to similar effort, so no single subtask becomes the bottleneck and recreates the bulk problem.
- Give each subtask one deliverable of its own.

## Brief each subtask

State the goal, the inputs, the output format, and the done condition. The subagent knows only what the brief says. Ask for a summary of a fixed length, with file paths as evidence.

## Merge

Combine the summaries, then check the artifacts they point to (the diff, the file, the output) against **principle-prove-it-works**. The work is done when every subtask has returned and the merged result answers the original task.

<!-- Derived from pstack's principle-guard-the-context-window. MIT License, Copyright (c) 2026 Lauren Tan. https://github.com/cursor/plugins -->
