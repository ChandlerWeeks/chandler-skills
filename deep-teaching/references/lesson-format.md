# Lesson format

Use this reference to select an output mode and construct a complete teaching artifact. Keep one primary mode for each output.

## Select one primary mode

| Mode | Immediate learner goal | Default output |
|---|---|---|
| Explain | Build a correct mental model | Concise explanation with one useful example or figure |
| Guided lesson | Learn a bounded concept through instruction and practice | Lesson with explanation, prediction, practice, and feedback |
| Tutorial | Gain a capability by building or completing a real task | End-to-end guided project with visible results |
| Practice | Improve an existing capability | Exercises, staged hints, feedback, and correction |
| Assess | Produce evidence of current capability | Diagnostic or summative assessment with objective-level results |
| Course | Develop capability across sessions | Course plan, lessons, learning records, and delayed retrieval |
| Reference | Look up stable facts | Factual page organized around the subject or interface |

A lesson can contain short explanations and formative checks without becoming a mixed-mode document. Split substantial procedural, explanatory, or reference material into linked outputs.

## Conversational explanation contract

Use a conversational explanation for a narrow question.

1. Answer the question in the first paragraph.
2. Give the smallest complete mental model.
3. Define necessary terms when first used.
4. Use one concrete example, trace, or figure when it improves reasoning.
5. State any important simplification or version limit.
6. Cite claims that depend on external facts.
7. Stop at a natural boundary.

Do not turn a narrow question into a course. Do not add a quiz unless the learner asks for practice or assessment.

## Bounded guided lesson contract

A complete guided lesson contains the following sections in this order unless the subject requires a different sequence.

### 1. Purpose

Connect the lesson to the learner’s real goal. State what the capability enables.

### 2. Objectives

State one to three observable objectives. Each objective must identify the learner action and evidence of success.

### 3. Prerequisite check

Use one or two brief tasks that test required foundations. Supply a remediation path if the learner cannot perform them.

### 4. Plain explanation

Give the smallest complete explanation in ordinary language. Define the main parts and their relationship. Label any teaching simplification.

### 5. Concrete model

Demonstrate the mechanism with an example, trace, figure, simulation, table, or annotated artifact. Tell the learner what to notice.

### 6. Prediction

Ask the learner to predict an outcome before revealing it. Require a short reason when reasoning is part of the objective.

### 7. Worked example

Complete one representative task. Expose the important decisions, not only the operations or final answer.

### 8. Guided practice

Give a similar task with staged hints and immediate explanatory feedback. Keep the learner responsible for the target reasoning.

### 9. Independent exercise

Remove most scaffolding. Match the objective’s conditions and evidence requirements.

### 10. Retrieval check

Ask the learner to reconstruct the central idea or procedure without copying lesson wording. Do not call this delayed retention when it occurs in the same session.

### 11. Transfer exercise

Use the concept in a different context. Require the learner to recognize when and how the concept applies.

### 12. Corrections

Explain likely errors and misconceptions. State why each wrong approach fails and how to repair it.

### 13. Summary

Restate only what the objectives require. Prefer a short model, rule set, or decision procedure over a broad recap.

### 14. Sources

List verified sources. State what each source supports. Put citations near consequential claims in the lesson body.

### 15. Next step

Select the next action from the learner’s evidence. Possible actions include another supported example, independent practice, transfer, prerequisite repair, or delayed retrieval.

If a short lesson omits a section, record the omission and reason during planning. Do not silently omit independent evidence, sources, or accessibility requirements.

## Tutorial contract

A tutorial teaches through a successful, guided task. Open with the result that the learner will build or run.

Use this structure:

1. State the finished result.
2. List only the prerequisites and tools required to begin.
3. Establish a working starting state.
4. Give one action per step.
5. Show the expected visible result after each consequential step.
6. Explain only what the learner needs to continue.
7. Add short prediction or debugging pauses at meaningful decisions.
8. Finish with a working artifact or verified outcome.
9. Ask the learner to change or extend the result independently.
10. Link to separate explanation and reference material.

Do not interrupt a tutorial with exhaustive option tables or long design debates. Do not omit recovery steps that a novice needs to complete the path.

## Practice contract

A practice session assumes that the learner has already encountered the concept.

Use a progression such as:

1. One warm-up retrieval item.
2. One representative item with optional hints.
3. Two or more independent items.
4. One discrimination item that requires m[118;1:3uethod selection.
5. One transfer item.
6. A correction pass for consequential errors.
7. A short record of objective-level evidence.

Do not show the full solution before a genuine attempt unless the learner requests a worked example. Use hints that reveal progressively more information.

## Assessment contract

An assessment measures current capability. It does not teach the answer before collecting evidence.

Before the assessment, state:

- The objectives assessed.
- The allowed tools and resources.
- The time conditions, if time is part of the objective.
- The scoring or evaluation criteria.
- Whether hints are available and how they affect the result.
- Whether responses are stored or transmitted.

After the assessment:

1. Report results by objective.
2. Cite the response or artifact that supports each judgment.
3. Separate conceptual errors from notation, arithmetic, interface, or delivery errors.
4. Explain the first consequential error.
5. Provide corrective instruction after evidence collection.
6. Recommend the next learning action.

Do not reduce the result to one percentage when the evidence supports more useful objective-level findings.

## Course contract

A course has persistent state. Use the course-plan and learning-record templates.

A course workspace holds the learner's material only. The skill's own files stay in the skill.

```text
MISSION.md
LEARNER.md
COURSE.md
RESOURCES.md
GLOSSARY.md
PROGRESS.md
lessons/
reference/
learning-records/
assets/
├── widgets.js
└── widgets/
```

Copy `assets/` from the skill the first time the course produces an HTML lesson.

Maintain:

- A mission.
- Stable objective identifiers.
- A dependency or concept map.
- Lesson status.
- Objective-level evidence.
- Misconceptions and corrections.
- Retrieval dates.
- Transfer evidence.
- Source and version notes.
- Accessibility or delivery issues.

Create one lesson because it advances an objective or repairs a prerequisite. Do not add lessons only to make the course longer.

## Reference-page contract

A reference page supports lookup. It describes facts, options, defaults, behavior, limits, errors, and examples.

Organize the page around the subject or interface:

1. Overview.
2. Terms.
3. Syntax or form.
4. Parameters, components, or inputs.
5. Behavior.
6. Limits.
7. Errors or failure modes.
8. Examples that clarify facts.
9. Version or platform notes.
10. Sources.

Do not include tutorial hand-holding, persuasion, or assessment activities in a reference page.

## HTML lesson structure

Use the supplied `templates/lesson.html` file as the starting point for a standalone lesson.

The final page must:

- Use semantic HTML landmarks and headings.
- Use one `h1` and a logical heading hierarchy.
- Use Tailwind CSS for presentation.
- Include a descriptive page title and metadata.
- Provide a skip link.
- Keep the main reading measure comfortable.
- Place feedback near the learner action that produced it.
- Use live regions only for meaningful status changes.
- Work with keyboard, pointer, touch, and assistive technology.
- Include a static fallback when an interactive component is not available.
- Keep assessment answers hidden until the required attempt or reveal action.
- Include verified sources.

For a prototype, Tailwind can load through the browser script. For production or offline delivery, compile the used Tailwind classes into a local CSS file and remove the network dependency.

## Section-writing rules

### Purpose

Write one short paragraph. Name the practical result, not a vague benefit.

### Objectives

Use parallel verb phrases. Do not exceed three objectives in a bounded lesson.

### Explanations

Lead with the conclusion. Use ordinary words. Call each thing by one name. State the mechanism before exceptions unless the exception is needed for safety or correctness.

### Figures

Introduce the figure before it appears. State what the learner should inspect. Add a caption that interprets the relevant feature without repeating the entire explanation.

### Activities

Write the learner action as a direct command. State the condition before the action. State what counts as completion.

### Feedback

Name what the response shows. Explain the cause of the result. Give the next action. Do not use praise as a substitute for information.

### Summaries

Compress the lesson into a model or decision rule. Do not introduce new content.

## Interaction placement

Add interaction where the learner must make a meaningful decision.

Useful placements include:

- Before a reveal, to collect a prediction.
- During a process, to choose the next state or step.
- After a worked example, to complete a faded step.
- During classification, to distinguish close cases.
- During debugging, to locate the first consequential error.
- During transfer, to select and apply the concept.

Do not add interaction only to create movement or clicks. Expanding hidden prose can support navigation, but it is not sufficient practice.

## Pacing

Control pacing with conceptual boundaries, not arbitrary screen counts.

A learner should encounter:

- A visible result early in a tutorial.
- A meaningful action before a long explanation.
- A prediction before an important reveal.
- Feedback soon enough to connect it to the attempt.
- An independent task before the lesson claims success.

Allow the learner to pause, repeat, reset, or continue at natural boundaries.

## Verification checklist

Before delivery, verify:

- The primary mode is clear.
- The purpose matches the learner’s request.
- Every objective is observable.
- Every objective has aligned independent evidence.
- Required prerequisites are checked or stated.
- The explanation is complete enough to reason from.
- The example exposes reusable reasoning.
- Interaction requires thought rather than clicks alone.
- Feedback explains the result.
- The transfer task changes context without changing the target concept.
- Sources support the claims made.
- The page remains usable without the chat transcript.
- The output meets the accessibility reference.

