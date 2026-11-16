---
title: My Agent Harness and Rex Setup
date: 2026-11-15
---

I use three coding agents every day: Pi, Claude Code, and
Codex. Out of the box they talk a lot and stop to ask questions. I want them
to work quietly and show me proof.

So I built a small harness around them. This post shows it: how the work is
split, how it runs in Rex, the one command that checks everything, the stop
hook, and what I do when an agent repeats a mistake. The reasons behind it are
in the previous post,
[How I Work with Coding Agents](/writing/how-i-work-with-coding-agents/).

## The Setup

```goat
                            one conversation
     Me  <------------------------------------------------>  Parent
                                                                |
               .-----------------------+------------------------+
               |                       |                        |
               v                       v                        v
          .--------.              .--------.               .--------.
          | Worker |              | Worker |               | Worker |
          '----+---'              '----+---'               '----+---'
               |                       |                        |
               v                       v                        v

          worktree A              worktree B               worktree C
```

I talk to one agent, the parent. That conversation is where I frame the
problem and decide the design. The parent splits the work, opens a ticket for
each task, and starts a worker for it. Each worker gets its own Git worktree
and its own terminal tab, so two agents don't write to the same files. When a
worker finishes, the parent checks the delivery. The final verdict is mine.

Everything runs in [Rex](https://www.superlogical.com/rex), the terminal
multiplexer from [Superlogical](https://mitchellh.com/writing/superlogical),
Mitchell Hashimoto's new company. It is in beta. I love Mitchell's work, and a
good part of this post follows his idea of
["harness engineering"](https://mitchellh.com/writing/my-ai-adoption-journey).

Agents also start servers, long test runs and builds. If each of those had a
tab, I would lose track. They run as detached blocks instead: processes with
no place in the layout that still keep their output and their exit code.

```sh
# Run the checks for task T123 in the background
rex-aux --task T123 --label tests --cwd /abs/worktree --wait -- ./init.sh

# Read the output when I need it
rex capture -b BLOCK --trim --unwrap

# Close the finished blocks of that task
rex-cleanup "T123 "
```

`rex-aux` and `rex-cleanup` are two Python scripts of about 70 lines each. The
first labels each block with its task. The second closes the finished blocks
and reports anything still running. A task isn't done until that report is
clean.

A tab is a layout, not a permission boundary. Each agent keeps its own sandbox
and its own denials, and no agent types into another agent's terminal. What an
agent prints is data for the others, not an instruction.

## The Rules File

All three agents read the same file, `~/.agents/AGENTS.md`. Claude Code reads
`~/.claude/CLAUDE.md`, so that file has one line:

```text
@../.agents/AGENTS.md
```

At the start of a session each agent loads two skills.

The first is about how to talk to me. It is an adaptation of ASD-STE100, the
simplified English used in aerospace maintenance manuals: lead with the
answer, keep sentences short, and don't sound more certain than you are to
save words.

The second is about code: solve the task with the least new code. Reuse what
the project has, then the standard library, then installed dependencies, and
write new code last.

I try to keep the file short. When code can enforce a rule, I move the rule
into the harness and delete the sentence.

## One Task, Start to Finish

When the parent delegates a task, it writes a brief, opens a ticket, and calls
the launcher:

```sh
rex do spawn.lua name=T123 dir=/abs/worktree task=/abs/brief.md ticket=PRO-12
```

The launcher checks the ticket first. If the ticket is missing or incomplete,
nothing starts:

```text
ticket not ready; launch stays pending
```

An agent can skip a sentence in a prompt. It can't skip a launcher that
refuses to run.

Tickets live in my own task app (a basic Go API, a simple frontend, and SQLite). The ticket is the only status
channel between the parent and a worker.

The brief has:

- The goal, in my words.
- What the worker is authorized to do.
- The path of its worktree.
- The files it may write.
- The files it may not write. Tests and checks are on that list by default.
- The acceptance command and its expected result.
- Where the evidence goes.

Two rules apply to the worker.

Acceptance is a command. "Looks good" is not. If the parent can't name a
command and its expected result, the task isn't ready to hand off.

The worker can't ask me questions. For anything reversible it decides, writes
its reason in the ticket, and continues. If it hits a denied permission or
something it can't undo, it records the exact blocker and moves to work that
doesn't depend on it.

When the worker reports that it is done, the parent checks four things before
I see anything:

1. The ticket has every delivery field filled in.
2. No changed file is outside the allowed list, and the acceptance command
   passes.
3. The diff doesn't go beyond the task. If it does, it goes back to the
   worker.
4. The evidence exists and can be read.

Then the parent tells me there is a diff to review. The verdict, the merge and
the pull request are mine.

The whole path looks like this:

```goat
  .----------.     .----------.     .-----------.     .-----------.     .--------.
  |  Change  +---->|  Checks  +---->| Stop hook +---->| Delivery  +---->| Review |
  '----------'     '-----+----'     '-----+-----'     '-----+-----'     '--------'
                         |                |                 |
                       fail           no proof        out of scope
                         |                |                 |
                         v                v                 v

                   agent fixes it   agent runs the     sent back to
                                        checks          the worker
```

A problem caught on the left costs machine time. Only what reaches the right
costs my attention. [Birgitta Böckeler](https://martinfowler.com/articles/harness-engineering.html) calls this shifting feedback left.

## One Command to Check Everything

Every project has an `init.sh`. An agent doesn't need to know the project's
test runner or its linter. It needs one command:

```sh
./init.sh        # checks + unit tests
./init.sh all    # checks + unit tests + end-to-end journeys
```

It prints one line per operation:

```text
init.sh: check pass 3s
init.sh: test fail 41s
init.sh: verify not-configured 0s
```

The exit code is the result:

| Exit code | Meaning |
| :--- | :--- |
| `0` | Everything passed. |
| `1` | Something failed. |
| `2` | The arguments were invalid. |
| `3` | Nothing failed, but at least one operation is not configured. |

Exit code `3` is the one I care about most. If a project has no end-to-end
journeys, `verify` says `not-configured`, and the agent has to report that as
pending. A suite that never ran is not a pass.

Agents do skip this when nothing stops them. Anthropic describes "Claude's
tendency to mark a feature as complete without proper testing" in its post on
[harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents).

In a project where I opt in, `./init.sh` also writes a stamp. I list the exact
files that the checks depend on. The script takes one SHA-256 over those files before the run and one
after. A stamp counts only if every required operation passed at full scope
and the two hashes match, which means nothing changed while the checks ran. A
later run that fails revokes an earlier pass. If an agent says "tests pass" in
chat and there is no stamp, I don't count it.

## The Stop Hook

Asking a model to "always run the tests before finishing" is a request.
[Claude Code](https://code.claude.com/docs/en/hooks-guide) and
[Codex](https://developers.openai.com/codex/hooks) both let me run my own code
when the agent tries to end its turn. That code runs every time. In the words
of the Claude Code docs, "certain actions always happen rather than relying on
the LLM to choose to run them."

My hook does very little. When I send a prompt, it takes a fingerprint of the
files I listed. When the agent tries to stop, it compares:

1. Nothing changed. The hook does nothing.
2. Files changed and there is a valid stamp for them. The hook does nothing.
3. Files changed and there is no valid stamp. The hook blocks the stop and
   names the exact `./init.sh` command to run.

It blocks once per task. After that it only reports that verification is
pending. A hook that keeps blocking can loop, and Claude Code itself overrides
a Stop hook after eight blocks in a row.

The hook never runs the checks and never grants a permission. If the agent was
denied permission to run `./init.sh`, the hook tells it to report the blocker
and not to retry.

## When an Agent Repeats a Mistake

The first time an agent makes a mistake, I correct it. The second time, I look
for the place where the environment let it happen.

This is Mitchell's
[harness engineering](https://mitchellh.com/writing/my-ai-adoption-journey):
"anytime you find an agent makes a mistake, you take the time to engineer a
solution such that the agent never makes that mistake again." He does it in
two ways, a better `AGENTS.md` and programmed tools. My order is structure
first, then an automated check, and an instruction last. When a check is in
place, I delete the sentence it replaces.

Böckeler has good words for the two kinds of fix: guides act before the agent
does, and sensors act after. Her rule is the same: "Whenever an issue happens
multiple times, the feedforward and feedback controls should be improved."

This is what code enforces today:

| Rule | Enforced by |
| :--- | :--- |
| A valid ticket before launch | The launcher, `spawn.lua` |
| A known agent and its default model on each ticket | The ticket script |
| Only I can set a review verdict | `pd` |
| Changed files need a passing stamp | The Stop hook, once, in projects where it is on |
| No changes outside the allowed paths | The delivery check |
| No `git reset --hard`, `git clean` or forced push, and no reading `.env` or `~/.ssh` | Deny rules in each agent's configuration |


There is a second rule, and it is for the agent. After two failed fixes of the
same problem, it stops. It writes down what it tried and what it learned, and
it doesn't try a third variant. I come back with a better plan.

## What It Isn't

It isn't a security boundary. The stamp is a local file, and an agent could
edit it. The stop hook blocks once and then only reports.

It isn't complete. The harness is something I turn on per project, and it
stays out of the project's commits. The stop hook exists for Claude Code and
Codex. My default worker is Pi, and for Pi I only have a prototype that asks
for the check once.

It isn't as small as I would like. My rule of thumb is that a script over 100
lines is doing too much. The scripts around Rex are seven Python files and one
Lua launcher, and three of them are already over that line. The stop hook and
the stamp are two more files of about 150 lines each. I don't want this to
become another project that I have to maintain.

What it does is catch oversights and save me from second-guessing what an
agent tells me.
