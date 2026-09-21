---
name: grilling
description: "Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or uses any 'grill' trigger phrases."
---

# Grilling

Interview the user relentlessly until you reach a shared understanding. Map the work as a design tree. Every decision branches into the decisions that depend on it.

Work the tree in rounds. The frontier is every decision whose prerequisites are settled. Those are the questions you can ask now without guessing at answers you have not heard yet. Ask the whole frontier in one round. Number each question and give your recommended answer. Then wait for the user's answers before you start the next round.

Format a round like this:

**Q1. <question title>**

<question body, which can run to several paragraphs and can offer multiple choices>

Recommended: <your recommended answer>

---

**Q2. <question title>**

<question body>

Recommended: <your recommended answer>

Each round of answers reshapes the tree. Settled decisions extend the frontier and unblock the questions that depended on them. Recompute the frontier and ask the next round. A question whose answer depends on another open question belongs to a later round.

Finding facts is your job, never the user's. When a frontier question needs a fact from the environment, such as the filesystem or a tool, dispatch a sub-agent to find it. Never ask the user for something you can look up yourself.

Do not block on that sub-agent. A running exploration is an unsettled prerequisite, so only the questions below it wait for the report. Ask the rest of the frontier now.

The decisions belong to the user. Put each one to them and wait.

The session ends when the frontier is empty. By then you have visited every branch of the design tree and stated every assumption. Do not act on the plan until the user confirms that you have reached a shared understanding.
