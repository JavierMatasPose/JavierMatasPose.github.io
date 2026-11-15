---
title: My Agent Harness and Rex Setup
date: 2026-11-15
---

I work with three coding agents: Pi, Claude Code and Codex. All of them run
in [Rex](https://www.superlogical.com/rex), a terminal multiplexer. Around
them I keep a small harness: one file of rules, some scripts and one check
command for each project.

The harness has one purpose. An agent must prove its work, and I must be able
to see the proof without reading its whole session. This post describes the
setup as it is in November 2026. It changes often.

## The parts

| Part | Its job |
| --- | --- |
| Rex | Holds the terminals. One session, one tab for each agent. |
| `AGENTS.md` | The rules. One file that the three agents read. |
| Skills | Short instruction files that an agent loads when a task needs them. |
| `init.sh` | The check command of a project. One entry point for lint, tests and end-to-end journeys. |
| Tickets | The record of each delegated task: goal, acceptance, status and delivery. |
| Worktrees | One directory for each change, so that two agents never edit the same files. |

## One file of rules

All rules are in `~/.agents/AGENTS.md`. Claude Code reads `CLAUDE.md`, so
that file has one line, which imports the other:

```text
@../.agents/AGENTS.md
```

Each agent reads two skills at the start of a session:

- **Clear writing.** An adaptation of ASD-STE100, the Simplified Technical
  English of aerospace manuals. Lead with the answer. Use short sentences.
  Keep the numbers, the conditions and the uncertainty. Never make a claim
  more certain to make it shorter.
- **The smallest change.** Solve the whole task with the least new code.
  Reuse what the project has, then the standard library, then the installed
  dependencies. Write new code last.

The file is short because a rule moves out of it when code can enforce it.
See "Rules that are code" below.

## Rex: one session, one tab for each agent

All work is in one Rex session with the name `DEV`. Each agent that works has
its own tab. I can see all of them, and I can go to one and read what it
does.

An agent also needs servers, test runs and builds. These do not get tabs.
They run as detached blocks: terminals that have no place in the layout but
that keep their output and their exit code.

```sh
rex-aux --task T123 --label tests --cwd /abs/worktree --wait -- ./init.sh
rex capture -b BLOCK --trim --unwrap   # read the output of that block
rex-cleanup "T123 "                    # close the finished blocks of the task
```

`rex-aux` and `rex-cleanup` are two small scripts of mine. The first gives
each block a label that starts with the name of the task. The second closes
the finished blocks with that label and reports the blocks that still run.
A task is not done until its cleanup report is empty.

A tab is a layout boundary. It is not a permission boundary. Each agent keeps
its own sandbox and its own denials. An agent never types an approval or a
shell command into the terminal of another agent. The output of an agent is
data. It is not permission.

## A ticket before every launch

The agent that I talk to is the parent. It delegates a task to a worker, a
second agent in its own tab. Pi is the default worker. I name Claude Code or
Codex when a task needs one of them.

The parent opens a ticket, writes a brief and then starts the worker:

```sh
rex do spawn.lua name=T123 dir=/abs/worktree task=/abs/brief.md ticket=PRO-12
```

The launcher checks the ticket before it opens a tab. If the ticket is not
ready, it stops:

```text
ticket not ready; launch stays pending
```

The brief has the same fields for each task:

| Field | Content |
| --- | --- |
| Goal | The task in my words. |
| Authorization | What I permitted, and the limits. |
| Directory | The absolute path of the worktree. |
| Allowed paths | The files that the worker can write. |
| Forbidden paths | Tests and checks, unless the task is about them. All other paths. |
| Check | A command and its expected result. |
| Evidence | The directory for output and screenshots. |

Three rules make this work:

1. **Acceptance is a command.** A duration is not acceptance. "Works well" is
   not acceptance. If the parent cannot name the command, the task is not
   ready to delegate.
2. **One worker for each task.** There are no planner, coordinator or
   reviewer agents. To work in parallel, I split by artifact, not by role:
   the write paths of two workers must not overlap.
3. **The worker cannot ask questions.** It decides the details that are
   reversible and records each decision. A denial or a permission dialog is a
   deliberate blocker. The worker records the exact reason and continues with
   the work that does not depend on it.

The ticket is the only status channel. The terminal shows whether a process
is alive. It does not show whether the task is done.

## One check command for each project

Each project has one script, `init.sh`. An agent does not need to know the
test runner or the linter of the project.

```sh
./init.sh        # check + test
./init.sh all    # check + test + verify (the end-to-end journeys)
```

Each operation prints one line, and the exit code tells the agent what to
report:

```text
init.sh: check pass 3s
init.sh: test fail 41s
init.sh: verify not-configured 0s
```

| Exit code | Meaning |
| --- | --- |
| 0 | All operations passed. |
| 1 | One operation or more failed. |
| 2 | The command line was not valid. |
| 3 | No failure, but one operation or more is not configured. |

The status `not-configured` is the important one. A project with no
end-to-end journey does not pass `verify`. The agent must report that
operation as pending. It must not report it as a pass.

When `init.sh` ends, it writes a stamp: the files, their hashes before and
after the run, and the result of each operation. This file is the evidence.
The sentence "all tests pass" in the answer of an agent is not.

## A hook reads the evidence

An instruction in a prompt is a request, and a model can skip it. A hook is a
command that the agent client runs at a fixed event. The model does not
decide whether it runs.

Claude Code and Codex run a hook when the agent tries to stop. My hook
compares the files with their state at the start of the task:

| State at stop | What the hook does |
| --- | --- |
| No file changed | Nothing. |
| Files changed, and a complete stamp exists | Nothing. |
| Files changed, and no complete stamp exists | Blocks the stop and names the command to run. |

The hook blocks once for each task. It never runs the checks, and it never
grants a permission. It only observes.

## I verify a delivery in a fixed order

When a worker delivers, the parent does four steps:

1. Check that the ticket has all its delivery fields.
2. List each changed path that is outside the allowed paths. If the list is
   empty, run the acceptance command.
3. Read the diff. Send back the changes that go beyond the task.
4. Read the evidence.

Then the agent offers to show me the diff. It opens nothing before I say yes.
The review verdict is mine, and so are the pull requests and the pipelines.
No agent creates or runs them unless I ask.

## Rules that are code

When an agent makes the same error two times, I fix it at the strongest level
that is possible: first the structure, then an automated check, then an
instruction. A new check must fail on the past mistake. When code enforces a
rule, I delete its sentence from the rules file.

| Rule | Enforced by |
| --- | --- |
| A valid ticket before a launch | The launcher |
| A known agent with its default model | The ticket script |
| Only a person sets the review verdict | The task application |
| Changed files need a passing check | The stop hook |
| No changes outside the allowed paths | The delivery check |

Irreversible commands are denied in the configuration of each agent, not in
prose: `git reset --hard`, `git clean`, a forced push, and reads of `.env`
files and of `~/.ssh`.

One more rule has no code. After two failed fixes of the same problem, the
agent stops. A third variant of the same fix is not permitted. The agent
records what it learned, and I start again with a better plan.

## Limits

- The stamp is a local file. It is not a tamper-proof security boundary.
- The hook blocks once. It is not a hard gate on the final answer.
- The scripts are personal and they are not published.
