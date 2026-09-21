# Widget library

Framework-free custom elements for lesson pages. Load the library once:

```html
<script type="module" src="../assets/widgets.js"></script>
```

Select a widget by the learner action it requires, not by its appearance. Read
`references/assessment-design.md` before writing the evaluation rule and the
distractor rationales, and `references/widget-design.md` before specifying a
widget this library does not already cover.

## Shared behavior

Every widget except the host inherits `WidgetBase` and provides:

| Behavior | Detail |
|---|---|
| Initial state | Deterministic. The same lesson opens the same way each time. |
| Controls | Check, Reset, and a hint button when `hints` is non-empty. |
| Hints | Revealed one at a time, in order. The remaining count is in the button label. |
| Feedback | What is right, the first consequential error, why it changes the result, where to look, the next action. |
| Announcements | A `role="status"` `aria-live="polite"` region for moves, hints, and resets. Focus moves to new feedback. |
| Result event | `lesson-widget-result` bubbles with `{ widgetId, objectiveId, outcome, attempts, hintsUsed }`. |
| Outcomes | `correct`, `partial`, `incorrect`, `incomplete`, `revealed`. Reflected on the host as `data-state`. |
| Persistence | Off by default. Add `persist` to store attempt counts in `localStorage`. Nothing is ever sent over the network. |
| Colour | Never the only carrier of meaning. Every result marker carries text. |

### Shared attributes

| Attribute | Purpose |
|---|---|
| `objective-id` | The objective this widget produces evidence for. Required for alignment. |
| `widget-id` | Registry id. Defaults to the tag name. |
| `data-config` | JSON configuration. See each widget below. |
| `persist` | Opt in to local-only persistence. |

### Shared config keys

`hints: string[]`, `pointer: string`, `nextAction: string`, `checkLabel: string`,
`emptyResponseMessage: string`.

## Failure behavior

If `data-config` is missing, malformed, or still an unreplaced `{{PLACEHOLDER}}`,
the widget keeps its authored static fallback, sets `data-state="fallback"`, and
warns in the console. A learner never sees a broken control, and an answer never
leaks because scripting failed.

## `<lesson-widget>`

Host element. Builds a registered widget from JSON so a page does not hand-write
widget markup.

```html
<lesson-widget widget-id="ordering-exercise" objective-id="obj-2" data-config='{ … }'>
  <div data-fallback>An equivalent exercise in plain text.</div>
</lesson-widget>
```

## `<prediction-reveal>`

**Learner action.** Commit a prediction in writing, then compare it against the
model answer and rate the match.
**Evidence.** A prediction made before the answer was visible, plus the learner's
own judgment of the difference.

The answer is built hidden and revealed only after a non-empty prediction. An
empty submission returns an explanation, not a disabled button.

```html
<prediction-reveal objective-id="obj-1" data-config='{"prompt":"What does the second call return?"}'>
  <div data-answer hidden>
    <p>It returns the cached value, because the first call populated the map.</p>
  </div>
</prediction-reveal>
```

Config: `prompt`, `answer` (or an authored `[data-answer]` block), `inputLabel`,
`selfRating` (default `true`).

## `<multiple-choice>`

**Learner action.** Select the option or options that satisfy the question.
**Evidence.** A discrimination judgment among plausible alternatives.

Recognition is weak evidence. Use it for discrimination between near misses, not
as proof that a learner can implement, debug, or design. Give every distractor a
rationale drawn from a real misconception.

```json
{
  "question": "Which call blocks the event loop?",
  "multiple": false,
  "revealAfterAttempts": 2,
  "options": [
    { "id": "a", "text": "readFileSync", "correct": true,  "feedback": "It returns only when the read completes." },
    { "id": "b", "text": "readFile",     "correct": false, "feedback": "It hands the work to the thread pool and returns immediately." }
  ],
  "hints": ["Which call can return a value directly?"]
}
```

Grading: correct when the selection matches exactly; partial when the selection
is a non-empty subset of the correct set with no wrong picks; otherwise
incorrect. Correct-answer rationales appear once the learner is right, or after
`revealAfterAttempts` attempts.

## `<ordering-exercise>`

**Learner action.** Arrange steps or components into the correct sequence.
**Evidence.** Whether the learner holds the causal or procedural order.

Ordering uses Move up and Move down buttons. The task never depends on pointer
input, drag gestures, or colour. Each move is announced, and focus stays on the
control the learner pressed.

```json
{
  "question": "Order the TLS handshake.",
  "items": [
    { "id": "hello",  "text": "ClientHello", "rationale": "Nothing can be negotiated before the client offers its parameters." },
    { "id": "cert",   "text": "Certificate" }
  ],
  "correctOrder": ["hello", "cert"],
  "initialOrder": ["cert", "hello"]
}
```

Grading reports the count in place and names the earliest wrong position. When
`initialOrder` is omitted, the start is `correctOrder` rotated left by one.

## `<classification-sort>`

**Learner action.** Assign each example to the category it belongs to.
**Evidence.** Whether the learner applies the defining rule or matches surface
features.

Each item uses a native `<select>`, so the task works with keyboard, touch,
pointer, and assistive technology without custom ARIA. An incomplete assignment
returns `incomplete` rather than being graded.

```json
{
  "question": "Classify each failure.",
  "categories": [{ "id": "compile", "label": "Compile time" }, { "id": "runtime", "label": "Run time" }],
  "items": [
    { "id": "i1", "text": "Type mismatch", "category": "compile", "rationale": "The compiler detects it before execution." }
  ]
}
```

## Adding a widget

Follow the procedure in `SKILL.md` under "Reuse or create widgets". In short:

1. Name the learner action without naming a UI control.
2. Extend `WidgetBase` and implement `buildBody`, `readResponse`, `evaluate`,
   and `resetBody`.
3. Return feedback keyed to expected misconceptions, not a generic error.
4. Call `registerWidget(id, { tag, factory, action, evidence })`.
5. Import the module from `assets/widgets.js`.
6. Document it here, and test every state: empty, partial, correct, incorrect,
   reset, and repeated submission.
