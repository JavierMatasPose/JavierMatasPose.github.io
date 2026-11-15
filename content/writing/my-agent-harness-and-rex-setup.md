---
title: My Agent Harness and Rex Setup
date: 2026-11-15
---

I use three coding harnesses every day: Pi, Claude Code and Codex. They're good.
But I need something more personal.

So I built a small harness around them. The goal: reliable work.
I think and design all my solutions, then the harness provides a framework for agents to work, test and report.

This post is the implementation: the files, the scripts and the commands.
The reasons behind them are in
[How I Work with Coding Agents](/writing/how-i-work-with-coding-agents/).

This is how it looks in November 2026. It changes often, and I'm not claiming
it's the right setup for anyone else. It's the one I use.

## One file of rules

All three agents read the same file, `~/.agents/AGENTS.md`. Claude Code wants
a `CLAUDE.md`, so mine has a single line that imports the other one:

```text
@../.agents/AGENTS.md
```

At the start of a session, each agent also loads two skills. A skill is just
a short instruction file.

The first one is about writing. It's an adaptation of ASD-STE100, the
simplified English that aerospace uses for maintenance manuals. Lead with the
answer, keep sentences short, and never make a claim sound more certain just
to make it shorter. I want agent output to the minimum, so I keep it brief and
honest.

The second one is about code: solve the whole task with the least new code.
Reuse what the project has, then the standard library, then what's already
installed. New code comes last.

I try to keep the rules file short. When code can enforce a rule, I move the
rule there and delete the sentence. More on that below.

## One tab per agent

Everything runs in [Rex](https://www.superlogical.com/rex) (btw, I love Mitchell's work), in a single
session. Each agent gets its own tab, so I can see who's working
and jump into any of them.

Agents also start servers, test runs and builds. Those don't get tabs, or I'd
drown in them. They run as detached blocks: terminals with no place in the
layout that still keep their output and their exit code.

```sh
rex-aux --task T123 --label tests --cwd /abs/worktree --wait -- ./init.sh
rex capture -b BLOCK --trim --unwrap   # read the output of that block
rex-cleanup "T123 "                    # close the finished blocks of the task
```

`rex-aux` and `rex-cleanup` are two small scripts I wrote. The first labels
each block with the name of its task. The second closes the finished ones and
tells me what's still running. A task isn't done until that report is empty.

A tab isn't a permission boundary. Each agent
keeps its own sandbox and its own denials. An agent never types an approval
or a command into another agent's terminal. What an agent prints is data,
not permission.

## No ticket, no launch

I only talk to one agent, to avoid cognitive load. Let's call it parent. When it delegates, it starts a worker: a
second agent in its own tab. Pi is my default worker. I ask for Claude Code
or Codex by name when a task needs one of them.

Before a worker starts, the parent opens a ticket based on my demands and writes a brief. Then it
launches:

```sh
rex do spawn.lua name=T123 dir=/abs/worktree task=/abs/brief.md ticket=PRO-12
```

The launcher checks the ticket first. No valid ticket, no tab:

```text
ticket not ready; launch stays pending
```

I put this in the launcher on purpose. An instruction can be forgotten. A
launcher that refuses can't.

The brief is always the same list: the goal in my words, what I've
authorized and where the limits are, the worktree, the files the worker may
write, the files it may not, the check command with its expected result, and
a directory for evidence. Tests and checks are off limits by default. A
worker that can edit the test can make anything pass.

Three rules do most of the work here.

**Acceptance is a command.** "Works well" isn't acceptance, and neither is a
time limit. If the parent can't name a command and its expected result, the
task isn't ready to hand off.

**One worker per task.** I don't run planner, coordinator or reviewer agents.
When I want things in parallel, I split by artifact, not by role, and no two
workers write to the same paths. I try to avoid dead time between agents, and between an agent and me,
so I parallelize when possible.

**The worker can't ask questions.** It decides anything reversible and writes
the decision down. A denial or a permission dialog is a deliberate blocker:
the worker records the exact reason and carries on with whatever doesn't
depend on it.

Status lives in the ticket and nowhere else. The terminal tells me a process
is alive. It doesn't tell me the task is done.

## One command to check everything

Every project has an `init.sh`. An agent doesn't need to know the project's
test runner or its linter. It needs one command.

```sh
./init.sh        # check + test
./init.sh all    # check + test + verify (the end-to-end journeys)
```

Each operation prints one line:

```text
init.sh: check pass 3s
init.sh: test fail 41s
init.sh: verify not-configured 0s
```

And the exit code says what to report:

| Exit code | Meaning |
| --- | --- |
| 0 | All operations passed. |
| 1 | One operation or more failed. |
| 2 | The command line was not valid. |
| 3 | No failure, but one operation or more is not configured. |

Exit code 3 is the one I care about most. A project with no end-to-end
journey doesn't pass `verify`. It reports `not-configured`, and the agent has
to report that as pending. Not as a pass.

When `init.sh` finishes, it writes a stamp: the files, their hashes before
and after the run, and each result. That file is the evidence. "All tests
pass" in an agent's answer isn't.

## A hook, because a prompt is only a request

I can write "run the checks before you finish" in a prompt, and the model can
skip it. A hook is different. It's a command that the agent client runs at a
fixed moment, and the model doesn't get a vote.

Claude Code and Codex both run a hook when the agent tries to stop. Mine
compares the files with how they were at the start of the task. If nothing
changed, it does nothing. If files changed and there's a complete stamp, it
does nothing. If files changed and there's no stamp, it blocks the stop and
names the command to run.

It blocks once per task. It never runs the checks itself, and it never grants
a permission. It only watches.

## Checking a delivery

When a worker delivers, the parent goes through the same four steps, in
order:

1. Check that the ticket has all its delivery fields.
2. List every changed path that's outside the allowed paths. If the list is
   empty, run the acceptance command.
3. Read the diff. Send back anything that goes beyond the task.
4. Read the evidence.

Then it offers to show me the diff, and it opens nothing until I say yes. The
review verdict is mine. So are pull requests and pipelines: no agent creates
or runs one unless I ask.

## Rules become code

When an agent makes the same mistake twice, I fix it at the strongest level I
can: structure first, then an automated check, then an instruction. A new
check has to fail on the mistake that caused it. Once code enforces a rule, I
delete its sentence from the rules file.

This is where things stand:

| Rule | Enforced by |
| --- | --- |
| A valid ticket before a launch | The launcher |
| A known agent with its default model | The ticket script |
| Only a person sets the review verdict | The task application |
| Changed files need a passing check | The stop hook |
| No changes outside the allowed paths | The delivery check |

Destructive commands are denied in each agent's configuration, not in prose:
`git reset --hard`, `git clean`, a forced push, and any read of `.env` files
or `~/.ssh`.

One rule has no code behind it. After two failed fixes for the same problem,
the agent stops. No third variant. It writes down what it learned, and I
start again with a better plan.

## What it isn't

None of this is a security boundary. The stamp is a local file, and the hook
blocks once and then lets go. It's there to catch an agent that forgot, and
to make the proof easy for me to read.

The scripts are personal and I haven't published them.

That's the setup. It works for me today, and I expect it to look different in
a month.
