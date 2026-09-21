# Documentation architecture

Choose the structure that helps the intended reader do their work. The document structure is a reader interface, not a record of the writer's investigation.

## Select the mode

### How-to / runbook

Use when a reader already understands the surrounding domain and needs a safe route to one result. State the goal, prerequisites, ordered actions, verification, recovery, and completion. Exclude extended conceptual teaching.

### Setup guide

Use when a known starting state must become usable. Organize around readiness, installation or configuration, validation, and a first useful result. Distinguish required baseline configuration from optional customization.

### Migration guide

Use when a system moves from a source state to a target state. State compatibility, preservation requirements, the migration window, ordering constraints, validation, rollback or escalation conditions, and post-migration monitoring. Place irreversible steps and decision gates prominently.

### Troubleshooting guide

Use when the reader starts with an observed symptom rather than a chosen goal. Begin with symptom boundaries and safe checks. Narrow causes with observations that distinguish them. Each branch must state: what to inspect, what each result means, the next action, and when to escalate. Do not offer a list of unrelated fixes.

### Reference

Use for stable lookup. Mirror the product's real names and structure. Document syntax, fields, defaults, constraints, errors, platform differences, and version limits. A reference does not contain a guided action path.

### Explanation

Use to make a bounded design, mechanism, or trade-off comprehensible. Discuss context, constraints, alternatives, and consequences. Link to procedures instead of turning the explanation into one.

## Define the action model

Represent a procedure as a chain:

```text
known starting state → decision gate → action → observable result → verification → next state
```

If the reader cannot determine the next state from the document, add the missing verification, route condition, or escalation path. If the source does not establish it, identify that as an open item instead of filling the gap with a plausible instruction.

Each route has one objective. Split a document when two routes have different readers, prerequisites, risk models, or completion evidence. Keep related variants together when they share the same objective and differ only at clearly marked decisions, such as operating system, deployment target, or product version.

## Design step granularity

One step should represent one meaningful reader decision or one action that has one meaningful result. Combine trivial commands only when they have the same prerequisite, risk, and verification. Split an action when a reader could safely stop, choose a different path, cause a separate side effect, or need a different recovery action.

For an action that matters, write:

| Field | Purpose |
|---|---|
| Action | Exact reader action and necessary context |
| Why this applies | The precondition or decision that selected it |
| Expected result | What the reader should observe immediately |
| Verify | A test or observation that confirms the transition |
| If it fails | A supported correction, rollback, or escalation |

Omit fields that would be empty. Never omit verification merely to make the procedure shorter.

## Keep modes separate without losing cohesion

A reader often needs more than one documentation mode. Keep a primary artifact focused, then link to supporting sections or separate Artifacts:

| Reader need | Best form |
|---|---|
| Complete a task now | How-to or runbook |
| Understand an unexpected behavior | Explanation |
| Find exact values or options | Reference |
| Learn an unfamiliar domain through practice | Tutorial or lesson |

A procedural Artifact may include one brief explanation where the reason prevents an error. Move extended background, API catalogs, and educational exercises out of the main route.

## Specify completion

Completion evidence must test the stated objective, not a convenient proxy. Prefer an end-to-end check over “the command exited successfully” when the objective concerns user-visible behavior. State who observes the evidence, where they observe it, and any expected delay.

Examples:

- A setup guide completes when a configured client can perform the first intended request, not merely when installation finishes.
- A migration guide completes when preserved data and target behavior pass their required checks, not merely when a transfer job starts.
- A troubleshooting guide completes when the cause is identified and the system is recovered, or when the reader has collected the evidence needed for a named escalation path.
