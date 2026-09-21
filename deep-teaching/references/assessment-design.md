# Assessment design

Use this reference to create exercises, quizzes, diagnostics, projects, rubrics, and feedback that produce valid evidence for lesson objectives.

## Assessment purpose

An assessment must answer a learning decision. Common decisions include:

- Whether a prerequisite is usable.
- Whether the learner can perform with support.
- Whether the learner can perform independently.
- Whether the learner can select the correct method.
- Whether the learner can transfer the capability.
- Whether the learner retained the capability after a delay.
- Which misconception or missing foundation needs correction.

Do not create questions only because they are easy to generate or score.

## Separate formative and summative assessment

### Formative assessment

Use formative assessment during learning. Its purpose is to improve the next attempt.

Examples include:

- Predictions.
- One-question retrieval checks.
- Partially completed examples.
- Classification tasks.
- Debugging tasks.
- Confidence ratings paired with performance.
- Explanatory feedback.
- Staged hints.

Formative feedback can teach. Allow retries unless repetition would invalidate the intended evidence.

### Summative assessment

Use summative assessment after instruction or after a lesson group. Its purpose is to judge performance against stated criteria.

Examples include:

- Mixed-topic quizzes.
- Unfamiliar applications.
- Longer problems.
- Projects.
- Explanations evaluated with a rubric.
- Implementations tested against explicit requirements.

Collect the evidence before teaching the solution. State the allowed support and conditions in advance.

## Align every item to an objective

For each item, record:

```text
Item ID
Objective ID
Prompt or task
Target action
Conditions and allowed tools
Expected evidence
Evaluation rule or rubric
Correct answer or acceptable result
Why it is correct
Likely errors or misconceptions
Hint 1
Hint 2
Full explanation
Difficulty basis
Transfer dimension, if any
```

An item can support more than one objective, but identify one primary objective when possible. Multi-objective items are harder to diagnose because one failure can hide success on another capability.

## Match the method to the target action

| Target action | Suitable assessment methods |
|---|---|
| Recall | Short answer, completion, labeling, or reconstruction |
| Recognize | Multiple choice or matching, when recognition is the intended action |
| Explain | Free response, oral explanation, annotated diagram, or causal chain |
| Apply | Problem, simulation, case, procedure, or code task |
| Analyze | Trace, compare, decompose, classify evidence, or locate an error |
| Evaluate | Judgment against criteria with supporting evidence |
| Create | Design, implementation, project, model, or original solution |
| Transfer | Unfamiliar case that requires selecting and applying the concept |

Do not use a recognition item as the only evidence for an explanation, application, design, implementation, or transfer objective.

## Write clear prompts

A prompt must state:

- The learner action.
- The relevant context.
- The available information.
- The constraints.
- The required response form.
- The success criteria when they are not obvious.

Remove irrelevant reading load unless reading under those conditions is part of the objective. Do not hide required assumptions. Do not use ambiguous pronouns or trick wording.

Put conditions before the instruction:

> Without running the code, predict the output and explain which callback executes first.

Do not write:

> Predict the output, which you must do without running the code, and explain the callback order.

## Design multiple-choice items

Use multiple choice when selection or recognition is a valid part of the objective, or when the options expose distinct mental models.

Each item should have:

- One best answer under the stated conditions.
- Plausible distractors based on real errors or misconceptions.
- Parallel grammar and comparable specificity.
- No accidental clue from length, punctuation, formatting, or vocabulary.
- An explanation for the correct answer.
- An explanation for each distractor.

Do not force every option to the same character count. Exact equality often creates unnatural choices. Prevent the correct answer from standing out instead.

Avoid:

- `All of the above` and `none of the above` when they reduce diagnostic value.
- Negative stems unless the negative is essential and visually emphasized.
- Trivia that is unrelated to the objective.
- Distractors that no informed learner would choose.
- Two answers that become correct under an unstated interpretation.

## Design multi-select items

State how many answers may be correct or say `Select all that apply`.

Evaluate partial knowledge explicitly. Decide whether:

- Every correct option and no incorrect option is required.
- Partial credit is available.
- Selecting an incorrect option cancels a correct selection.

Explain each option after submission. Do not treat an incomplete response as equivalent to a fully incorrect model when partial evidence matters.

## Design ordering and sequencing items

Use ordering when sequence is part of the target capability.

Define:

- Whether one exact order is required.
- Whether equivalent orders are valid.
- Whether steps can occur concurrently.
- Whethe[118;1:3ur the learner must explain dependencies.

Provide keyboard controls and non-drag controls. Dragging cannot be the only method for completing the task under WCAG 2.2.[^1]

## Design classification items

Classification is useful for concept boundaries and discrimination.

Use:

- Clear category definitions.
- Examples near the boundary, not only obvious examples.
- An `insufficient information` category when the evidence can genuinely be incomplete.
- Feedback that names the decisive feature.

Do not classify by superficial wording when the objective concerns an underlying mechanism.

## Design prediction items

A prediction item should collect the learner’s model before the result is visible.

Require:

1. The predicted outcome.
2. A reason or mechanism when relevant.
3. An explicit reveal action.
4. The observed result.
5. A comparison between prediction and result.
6. A correction when the model differs.

Do not score a reasonable prediction as wrong when the prompt omitted necessary information.

## Design free-response items

Use free response when wording, reasoning, construction, or explanation is part of the evidence.

Provide either:

- A rubric.
- An exemplar plus comparison prompts.
- A set of required elements.
- Deterministic checks for structured answers.

Do not claim reliable semantic scoring from a brittle keyword match. If automated evaluation is approximate, label it as guidance and preserve the learner’s response for human or model review when appropriate.

## Design code exercises

A code exercise must define:

- The runtime, language, and version.
- The starting code.
- The permitted edits.
- The expected observable behavior.
- The tests or evaluation criteria.
- Whether external libraries, network access, or files are available.
- How reset works.

Test more than one example when a single hard-coded answer could pass. Separate syntax, runtime, test, and conceptual feedback.

Do not execute untrusted learner code without an appropriate sandbox. Do not imply that a browser-only evaluator is secure against hostile code.

## Design debugging exercises

Ask the learner to find the first consequential error, not every stylistic imperfection.

A complete debugging response can include:

- The location of the error.
- The incorrect assumption or operation.
- The effect on later behavior.
- The smallest correction.
- A test that distinguishes the broken and corrected versions.

Use realistic faults. Avoid artificial mistakes that would not occur in the target environment.

## Design calculations and quantitative problems

State units, rounding rules, allowed tools, and required precision. Accept mathematically equivalent forms when the representation is not part of the objective.

Separate:

- Method selection.
- Setup.
- Calculation.
- Unit handling.
- Interpretation.

A correct number with unsupported reasoning may not demonstrate the intended method. An arithmetic slip after a correct setup should not always erase evidence of conceptual success.

## Design projects and performance tasks

A project should produce evidence that smaller items cannot provide.

Define:

- The authentic result.
- Required constraints.
- Intermediate checkpoints.
- Deliverables.
- Evaluation criteria.
- Allowed collaboration and tools.
- Evidence of individual contribution when required.
- Transfer requirements.

Do not grade hidden preferences. Put every consequential criterion in the rubric or task statement.

## Build rubrics

Use criteria that map directly to objectives. A criterion must describe observable qualities of the result.

A useful analytic rubric includes:

| Criterion | Does not yet meet | Partly meets | Meets | Exceeds, if needed |
|---|---|---|---|---|
| Target behavior | Observable description | Observable description | Observable description | Observable description |

Avoid labels without descriptions. `Good`, `fair`, and `poor` do not tell the learner what changed.

Use the fewest levels that support the decision. Add an `exceeds` level only when performance beyond the objective is meaningful.

## Use staged hints

Hints must preserve as much learner reasoning as possible.

Use this progression:

1. Restate the goal or direct attention to relevant information.
2. Name the governing concept or likely location of the error.
3. Show an intermediate representation or partial step.
4. Show the decisive step.
5. Show the complete solution.

Record the highest hint used. Do not count a response as independent when a hint supplied the decisive reasoning.

Do not disguise the full answer as a hint.

## Give explanatory feedback

Feedback should answer:

- What does the response show?
- What is correct?
- What is the first consequential error?
- Why does that error change the result?
- What should the learner do next?

Prefer:

> The trace is correct through step 3. At step 4, the promise callback enters the microtask queue, not the timer queue. Move that callback before the timer, then trace the remaining steps again.

Avoid:

> Incorrect. Try again.

Praise can acknowledge effort or success, but it cannot replace information.

## Preserve assessment validity

An item is invalid when success or failure depends on something outside the intended objective.

Check for:

- Reading complexity that exceeds the objective.
- Unstated domain knowledge.
- Inaccessible interaction.
- Cultural assumptions that are unrelated to the skill.
- Required motor precision when motor skill is not the objective.
- Time pressure when speed is not the objective.
- Interface failure treated as learner failure.
- Answer clues from formatting.
- Scoring rules that reward verbosity instead of quality.

If a widget fails, record a technical issue. Do not use the failed interaction as evidence against the learner.

## Use confidence for calibration

Ask for confidence only when calibration serves a learning decision. Collect confidence before feedback.

Interpret confidence with performance:

| Performance | Confidence | Possible action |
|---|---|---|
| Correct | High | Increase independence or test transfer |
| Correct | Low | Confirm reasoning and reduce unnecessary support |
| Incorrect | High | Address the model and use a contrast case |
| Incorrect | Low | Restore prerequisites or provide guided practice |

Do not infer confidence from tone, speed, or hesitation. Record only learner-reported confidence.

## Schedule retrieval

A course should revisit important objectives after a delay. The exact interval depends on the course duration and retention goal.

For each retrieval event, record:

- Objective.
- Date taught.
- Date retrieved.
- Retrieval prompt.
- Result before feedback.
- Confidence, if requested.
- Corrective feedback.
- Next retrieval date.

Research reviews support retrieval practice and spacing as useful strategies for durable learning, but they also report boundary conditions and the importance of feedback, task design, and learner knowledge.[^2]

## Report evidence by objective

Use objective states such as:

- Not introduced.
- Introduced.
- Practiced with support.
- Demonstrated independently.
- Demonstrated in transfer.
- Due for retrieval.
- Retained after delay.

Do not advance an objective beyond the available evidence.

For each result, store:

- The task.
- The learner response or artifact reference.
- The evaluation criteria.
- The result.
- The support used.
- The first consequential error, if any.
- The feedback given.
- The next action.

## Assessment review checklist

Before delivery, verify:

- Every item maps to an objective.
- The response method matches the objective action.
- Instructions define conditions and success.
- One best answer exists where required.
- Distractors reflect plausible errors.
- Free responses have a rubric or required elements.
- Hints preserve learner reasoning.
- Feedback explains causes and corrections.
- The assessment distinguishes support from independence.
- Transfer items require method selection.
- The interface is accessible.
- Technical failures cannot lower the learner result.
- Results can be reported by objective.

## Sources

[^1]: World Wide Web Consortium, *Web Content Accessibility Guidelines 2.2*, Success Criterion 2.5.7, Dragging Movements. https://www.w3.org/TR/WCAG22/#dragging-movements

[^2]: Shana K. Carpenter, Steven C. Pan, and Andrew C. Butler, “The science of effective learning with spacing and retrieval practice,” *Nature Reviews Psychology* 1 (2022): 496–511. https://doi.org/10.1038/s44159-022-00089-1

