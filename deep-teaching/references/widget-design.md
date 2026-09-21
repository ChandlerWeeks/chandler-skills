# Widget design

Use this reference when a lesson needs meaningful interaction. Reuse a supplied widget when it matches the learner action, evidence, feedback, and accessibility requirements. Create a new widget only when no existing component fits.

This file supplements `references/assessment-design.md` and `references/accessibility.md`. Read it before you specify a widget that the supplied library does not already cover.

## Start with the learner action

Describe the action without naming a user-interface control.

Good:

- Arrange the events into execution order.
- Predict how the output changes when the parameter increases.
- Classify each example and explain the decisive feature.
- Locate the first state transition that violates the rule.
- Construct a valid request from the available fields.

Weak:

- Click the cards.
- Use a slider.
- Open each panel.
- Play with the diagram.

Choose the interface only after the learner action and evidence are clear.

## Define success evidence

State what the widget must observe to support the objective.

Examples:

- The final order and the learner’s explanation.
- The selected category for each item.
- The parameter value, predicted direction, and observed result.
- The exact step identified as the first error.
- The constructed artifact and validation result.

Do not collect clicks that do not distinguish correct and incorrect reasoning.

## Reuse before creating

Inspect the supplied widget library for a component with matching:

- Learner action.
- Input and output shape.
- Evaluation rule.
- Feedback model.
- Hint behavior.
- Accessibility behavior.
- Reset behavior.
- Persistence requirements.

Reuse the widget when adaptation only changes content or configuration. Create a new widget when reuse would require changing the component’s core interaction or would produce misleading evidence.

Do not force an objective into an ill-fitting multiple-choice or drag interaction because that component already exists.

## Write the widget specification

Before coding a new widget, define:

```text
Widget name:
Objective ID:
Learner action:
Evidence of success:
Inputs:
Outputs:
Initial state:
State transitions:
Evaluation rule:
Correct feedback:
Partial feedback:
Incorrect feedback:
Hint stages:
Keyboard behavior:
Pointer and touch behavior:
Assistive-technology behavior:
Reset behavior:
Persistence and privacy:
Static fallback:
Failure behavior:
Tests:
```

Do not begin implementation while the evaluation rule is ambiguous.

## Define the state model

Use explicit states. A common model is:

```text
idle
→ attempted
→ correct | partial | incorrect
→ hinted
→ retried
→ complete
```

Add states only when they change behavior or evidence.

For each state, define:

- Visible content.
- Enabled actions.
- Focus location.
- Programmatic name, value, and status.
- Stored learner evidence.
- Allowed transitions.

Keep evaluation state independent from Tailwind classes. A CSS class must not be the source of truth for correctness.

## Define evaluation rules

Prefer deterministic evaluation when the answer has a defined structure.

Possible rules include:

- Exact value with normalization.
- Numeric tolerance.
- Set equality.
- Sequence equality with accepted alternatives.
- Required and forbidden elements.
- Constraint validation.
- Test cases.
- Rubric-based review.

Document normalization. Decide how to handle case, whitespace, punctuation, units, ordering, equivalent notation, and duplicate values.

Do not use keyword presence as proof of a correct explanation unless the objective only requires those terms.

## Define feedback states

### Correct feedback

- Confirm the evidence.
- Explain the decisive reasoning.
- Connect the result to the objective.
- Offer the next challenge when appropriate.

### Partial fee[118;1:3udback

- Name what is correct.
- Identify the missing or conflicting part.
- Preserve the valid work.
- Give the smallest next prompt.

### Incorrect feedback

- Identify the first consequential error.
- Explain its effect.
- Ask for a correction or offer the first hint.

### Technical failure

- State that the component failed.
- Preserve the learner’s work when possible.
- Offer the static fallback.
- Do not record the event as a learner error.

Do not use only `correct`, `incorrect`, green, red, an icon, or a sound.

## Define staged hints

Use progressive disclosure:

1. Direct attention to relevant information.
2. Name the governing concept.
3. Show a partial representation or intermediate state.
4. Reveal the decisive step.
5. Show the full solution.

Record the highest hint used. Resetting the visual state must not erase assessment metadata unless the learner explicitly starts a new attempt.

## Prefer native controls

Build with native HTML controls when possible. Native controls provide established keyboard and assistive-technology behavior.

Use custom elements or small ES modules to package behavior, but keep ordinary HTML available in the light DOM or fallback when practical.

A suitable implementation order is:

1. Semantic HTML structure.
2. Deterministic state and evaluation logic.
3. Accessible status and focus behavior.
4. Pointer and touch enhancement.
5. Tailwind presentation.
6. Optional persistence.

Do not make Tailwind classes part of evaluation logic.

## Use Web Components carefully

A framework-free custom element can be useful when the widget must work across standalone lessons.

Document its public contract:

- Element name.
- Attributes.
- Properties.
- Events.
- Slots.
- Expected child markup.
- Methods.
- CSS or Tailwind assumptions.
- Accessibility behavior.
- Error behavior.

Choose a hyphenated custom-element name. Avoid global side effects. Register the element through `assets/widgets.js` when the workspace uses a central entry point.

Do not redefine a custom element if it is already registered.

## Keep data and presentation separate

Store content and evaluation data in structured objects or markup attributes. Keep rendering and visual classes separate.

Useful separation:

```text
content
state
validation
feedback
rendering
persistence
```

This separation makes the widget testable, reusable, and easier to restyle with Tailwind.

## Support keyboard and non-drag operation

Every pointer action needs an equivalent keyboard action unless the underlying task is inherently path dependent.

For drag-and-drop tasks, provide another method such as:

- Select and move.
- Move up and move down.
- Select source and destination.
- Enter an order number.

WCAG 2.2 requires functionality that uses dragging to have a single-pointer alternative without dragging unless dragging is essential.[^1]

Document nonstandard keyboard commands in the widget instructions.

## Manage focus deliberately

Keep focus where the learner expects it.

- Do not move focus after every update.
- Move focus to a dialog or modal heading when one opens.
- Return focus to the triggering control when it closes.
- After submission, keep focus on the submit control or move it to feedback only when that improves access.
- Preserve focus after re-rendering.
- Do not place hidden controls in the tab order.

Use visible `focus-visible` styling. Ensure overlays do not obscure focused elements.

## Announce meaningful changes

Use a polite live region for submission results and important state changes. Use an assertive announcement only when immediate interruption is necessary.

Announce:

- Correct, partial, or incorrect result.
- Validation error.
- Completion.
- A simulation state change that is not otherwise perceivable.

Do not announce:

- Every animation frame.
- Every pointer movement.
- Decorative changes.
- Repeated text already read through normal focus movement.

## Protect privacy

Keep responses local by default. Do not transmit learner input unless the lesson explicitly requires persistence or remote evaluation.

If persistence is requested:

- State what is stored.
- State where it is stored.
- Avoid personal identifiers unless required.
- Provide reset or deletion behavior.
- Do not store secrets.
- Treat local storage as accessible to scripts on the same origin.

## Provide a fallback

A static fallback should preserve the learning action when practical.

Examples:

- Ordering widget: numbered text fields or a printable list.
- Slider simulation: a table of representative values and outputs.
- Interactive trace: a static sequence of states with a prediction prompt.
- Classification widget: a table with selectable or printable categories.
- Code runner: instructions and expected test cases for a local environment.

At minimum, preserve the prompt, necessary content, and answer explanation when JavaScript fails.

## Common widget specifications

### Prediction and reveal

Evidence:

- Learner prediction.
- Optional reason.
- Reveal event.
- Comparison response, if used.

Rules:

- Do not reveal automatically on focus or input.
- Preserve the prediction after reveal.
- Explain the observed result.
- Permit reset without confusing old and new attempts.

### Multiple choice

Evidence:

- Selected option.
- Submission count.
- Hint use.

Rules:

- Use native radio buttons for one answer.
- Group choices with `fieldset` and `legend`.
- Explain every option after submission.
- Do not reveal through option length or formatting.

### Multi-select classification

Evidence:

- Selected set or category assignment.
- Partial correctness by item.

Rules:

- Define partial-credit behavior.
- Preserve correct selections when giving partial feedback.
- Support keyboard movement and selection.

### Ordering

Evidence:

- Final sequence.
- Accepted equivalent sequences.
- Moves or hints when relevant.

Rules:

- Provide non-drag controls.
- Announce the new position after a move.
- Keep focus on the moved item.
- Define whether duplicate positions or equivalent orders are valid.

### Parameter exploration

Evidence:

- Prediction.
- Chosen values.
- Observed outputs.
- Explanation of the relationship.

Rules:

- Label units and valid ranges.
- Provide direct numeric entry when precision matters.
- Do not update the live region on every minor slider movement.
- Provide a reset to meaningful defaults.

### Step-through simulation

Evidence:

- Predicted next state.
- Selected transition.
- Completed trace.

Rules:

- Provide previous, next, and reset controls.
- Expose the current step and total steps.
- Keep state changes available in text.
- Do not rely on animation alone.

### Code exercise

Evidence:

- Submitted code.
- Test results.
- Error category.
- Hint use.

Rules:

- State the runtime and constraints.
- Sandbox execution appropriately.
- Separate syntax, runtime, test, and conceptual feedback.
- Provide a local-run fallback when browser execution is unavailable.

### Debugging exercise

Evidence:

- Selected error location.
- Explanation.
- Correction.
- Verification test.

Rules:

- Evaluate the first consequential error.
- Do not penalize unrelated style differences.
- Preserve the original and corrected versions for comparison.

### Free response with rubric

Evidence:

- Learner response.
- Self-evaluation or model comparison.
- Rubric result when reviewed.

Rules:

- Do not claim reliable automated scoring from weak keyword matching.
- Label model-generated evaluation as provisional when appropriate.
- Keep the rubric visible before submission when it defines the task.

## Test the widget

Test at least these cases:

1. Initial state.
2. Empty submission.
3. Partial response.
4. Correct response.
5. Incorrect response.
6. Repeated submission.
7. Every hint stage.
8. Reset.
9. Keyboard-only operation.
10. Pointer operation.
11. Touch operation.
12. Screen-reader names, roles, states, and announcements.
13. Narrow viewport and high zoom.
14. Reduced motion.
15. Missing asset or script failure.
16. Invalid configuration.
17. Duplicate widget instances on one page.

Test boundary values and accepted alternatives for the specific widget type.

## Register and document the widget

Save a new widget under:

```text
assets/widgets/<widget-name>.js
```

Export or register it through:

```text
assets/widgets.js
```

Add documentation that includes:

- Purpose.
- Supported learner actions.
- Markup example.
- Attributes and properties.
- Events and event payloads.
- State model.
- Evaluation behavior.
- Accessibility behavior.
- Fallback.
- Known limits.
- Test cases.

Do not create a new widget without leaving enough documentation for another lesson author to reuse it.

## Completion checklist

Before using the widget in a lesson, verify:

- It measures an objective-relevant action.
- Reuse was considered before new implementation.
- Success evidence is explicit.
- State transitions are defined.
- Evaluation is deterministic or honestly qualified.
- Correct, partial, incorrect, and technical-failure feedback exist.
- Hints are staged.
- Keyboard, pointer, touch, and assistive-technology behavior are defined.
- Dragging has a non-drag alternative.
- Focus remains logical and visible.
- Meaningful updates are announced.
- Reset works.
- Responses stay local by default.
- A fallback exists.
- Boundary and repeated-use states are tested.
- Public attributes, events, and markup are documented.

## Sources

[^1]: World Wide Web Consortium, *Web Content Accessibility Guidelines 2.2*, including Success Criteria 2.1.1, 2.4.7, 2.5.7, 2.5.8, 3.3.1, 4.1.2, and 4.1.3. https://www.w3.org/TR/WCAG22/

