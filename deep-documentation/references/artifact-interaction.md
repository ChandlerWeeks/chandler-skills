# Artifact interaction and publishing

An Artifact is the delivery surface for the documentation. Design it for a reader who may consult it while operating a system, often on a narrow screen and without the originating chat transcript.

## Publishing contract

The built-in `Artifact` tool publishes a self-contained page to a private claude.ai Artifact URL. Use it only in an interactive Claude Code session where the tool is available. Give it:

- A concise, task-oriented title in the page.
- A stable, appropriate favicon.
- A label that tells a reader what version or source state they are viewing.
- The existing Artifact URL on an update, when supported, so the revised document remains at the same address.

The owner controls sharing after publication. Do not claim that teammates can access an Artifact until the owner shares it.

The implementation payload may be HTML because that is the Artifact tool's input format. This is a publishing implementation detail, not a request to build or deliver a standalone website. Keep it self-contained; do not depend on external style sheets, scripts, images, fonts, analytics, or remote data at runtime.

## Interaction patterns

Use interaction to lower operational effort, not to entertain the reader.

| Pattern | Use when | Essential fallback |
|---|---|---|
| Route selector | Starting state determines a different valid path | All routes are visible in ordered text |
| Readiness checklist | Prerequisites are easy to overlook | A static prerequisite list and instructions for checking each item |
| Step progress | A long route benefits from local place-keeping | Numbered steps with stable headings |
| Copy control | Exact commands or values are needed | Selectable, visible text with context and placeholders |
| Expandable recovery detail | Failure handling is useful but not on the common path | A labeled recovery section that remains reachable without scripting |
| Filtered troubleshooting | Symptoms map to bounded diagnostic branches | A complete symptom-to-branch index |
| Before/after comparison | Readers must preserve or change a known state | A readable comparison table |
| State or dependency diagram | Relationships explain ordering or ownership | Caption and a text sequence or adjacency list |

Keep a control's label action-oriented and explicit: “Show the Kubernetes route,” “Copy the staging command,” or “Mark step 3 complete.” Do not use ambiguous labels such as “Continue” when the consequence is not obvious.

## Accessibility and resilience

Build the Artifact with semantic headings, landmarks, buttons, controls, tables, lists, and code blocks. Do not replace native elements with custom ARIA controls unless necessary.

Before publishing, check:

- Every control has an accessible name and works with keyboard, touch, and pointer input.
- Keyboard focus order follows reading order, focus is visible, and dynamic status messages are announced appropriately.
- Color is not the only indicator of route, status, warning, or completion.
- Text, controls, and focus indicators meet useful contrast at normal and increased zoom.
- Essential instruction remains available when JavaScript fails or a reader does not interact.
- Content is usable at narrow widths. Wrap long paths and identifiers; make wide code, diagrams, and tables scroll inside their own regions rather than the page body.
- Motion is optional, minimal, and respects reduced-motion preferences.

Use browser-local storage only for low-risk reader convenience, such as checklist or collapse state. Namespace it to the Artifact and avoid storing sensitive values. Do not collect telemetry, make network calls, or transmit reader state unless the user explicitly requests and authorizes that design.

## Review interaction quality

For every interactive component, answer:

1. What reader decision, action, or verification problem does this remove?
2. What content and route remain available without it?
3. How does a keyboard and screen-reader user operate it?
4. What state can it store, and where?
5. How can the reader reset or correct it?

Remove the component when the answer to the first question is merely “it looks better.”
