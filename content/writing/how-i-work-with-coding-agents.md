---
title: How I Work with Coding Agents
date: 2026-11-15
---

I've built my work with coding agents around three things I care about: a
clear head, full ownership of what I ship, and one task at a time.

This post is the why, and the shape of the system. The scripts and the
commands are in [My Agent Harness and Rex Setup](/writing/my-agent-harness-and-rex-setup/).

Most of these ideas aren't mine. I lean on behavioral psychology: how
attention works, what it costs to switch tasks, and how we learn from error
signals. The sources are in the notes at the end.

## I talk to one agent

I only talk to one agent. I call it the parent. If the work needs more hands,
the parent starts workers, and they report to it, not to me.

Working memory is small. The usual estimate is about four things at
once.[^cowan] Cognitive load theory starts from that limit.[^sweller] Every
extra conversation is one more thing to hold: what I asked, what it answered,
what's still pending. Effort I spend on that is effort I don't spend on the
problem.

So I keep the surface small: one conversation, one voice, short answers.

## I own the work

I gather the information. I design the solution. Then the agents execute,
test and report, and I iterate on what comes back.

```goat
        me                  me                agents              agents
  .------------.      .------------.      .------------.      .------------.
  |   Gather   +----->|   Design   +----->|  Execute   +----->|   Report   |
  '------------'      '------------'      '------------'      '------+-----'
         ^                                                           |
         |                    me: read it, decide                    |
         '-----------------------------------------------------------'
```

I don't hand over the thinking. Part of that is taste. Part of it is a trap
that's been known for forty years. Bainbridge described it in 1983: the more
you automate, the more the person is left to monitor, and people are bad at
monitoring. When the automation fails, the one who has to take over has lost
both the practice and the picture.[^bainbridge] Later work measured it:
people kept out of the loop are slower and worse when they have to step back
in.[^endsley] We also trust automation too much when it's usually
right.[^parasuraman]

So the design and the verdict stay with me. An agent can show me a diff. It
can't approve one. Pull requests and pipelines are mine too.

## One task in my head, many in the background

My head is on one task at a time. The agents aren't: they work in parallel.

Switching tasks isn't free. Every switch costs time, and more when the tasks
are complex.[^rubinstein] Part of your attention also stays on the task you
left, above all if you left it unfinished.[^leroy] And people who get
interrupted still finish their work, but with more stress.[^mark]

So I try not to be the one who switches. Workers can't ask me questions. They
decide what's reversible, write the decision down and keep going. Their
status goes to a ticket, not to my screen. I look when I choose to.

I also try to avoid dead time. The parent splits the work so that no agent
waits for another one, and none of them waits for me.

## Errors are signals

This is the part I take most directly from psychology.

We learn from the gap between what we expected and what happened. Rescorla
and Wagner built a model of learning on that gap in 1972.[^rw] Later, the
activity of dopamine neurons was shown to track it.[^schultz] No surprise, no
learning.

Feedback is how the gap reaches you, and not all feedback works. In one large
review, more than a third of feedback interventions made performance worse.
The ones that helped kept attention on the task, not on the
person.[^kluger]

I'm not claiming that a language model learns like a brain. But the same
rules make a good harness:

- **The signal is about the task.** A check passes or fails. It doesn't say
  "good job".
- **It arrives where the mistake is made.** The check runs before the agent
  can say "done", not at review time.
- **It's honest about the gaps.** A check that doesn't exist isn't a pass.
  "I didn't run the end-to-end tests" is part of the report.
- **A repeated mistake gets a new check.** And that check has to fail on the
  old mistake.

The last signal is for me. A report that says what was not verified corrects
my own expectations, so I know where to look.

## The shape

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

- **Me and the parent.** One conversation. This is where I gather and
  design.
- **Parent to worker.** A ticket and a brief for each task: the goal, the
  files the worker may write, and a command that proves the result.
- **Worker.** Its own terminal tab and its own worktree, so two workers never
  edit the same files.
- **Back up.** The worker delivers with evidence. The parent verifies it.
  I decide.

## Where an error gets caught

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

Each gate is cheaper than the next. A mistake caught by the checks costs the
agent a retry. The same mistake caught in review costs my attention, which is
the thing I'm trying to protect.

## What I'm not saying

I'm not saying this is the right way to work with agents. It's the way that
keeps my head clear and my name on the work. For a different take on the same
problem, read Mitchell Hashimoto's account of how he adopted these
tools.[^mitchell]

## Notes

[^cowan]: Cowan, N. (2001). "The magical number 4 in short-term memory: A reconsideration of mental storage capacity." *Behavioral and Brain Sciences*, 24(1).

[^sweller]: Sweller, J. (1988). "Cognitive load during problem solving: Effects on learning." *Cognitive Science*, 12(2).

[^bainbridge]: Bainbridge, L. (1983). "Ironies of automation." *Automatica*, 19(6).

[^endsley]: Endsley, M. R., & Kiris, E. O. (1995). "The out-of-the-loop performance problem and level of control in automation." *Human Factors*, 37(2).

[^parasuraman]: Parasuraman, R., & Manzey, D. H. (2010). "Complacency and bias in human use of automation: An attentional integration." *Human Factors*, 52(3).

[^rubinstein]: Rubinstein, J. S., Meyer, D. E., & Evans, J. E. (2001). "Executive control of cognitive processes in task switching." *Journal of Experimental Psychology: Human Perception and Performance*, 27(4).

[^leroy]: Leroy, S. (2009). "Why is it so hard to do my work? The challenge of attention residue when switching between work tasks." *Organizational Behavior and Human Decision Processes*, 109(2).

[^mark]: Mark, G., Gudith, D., & Klocke, U. (2008). "The cost of interrupted work: More speed and stress." *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '08)*.

[^rw]: Rescorla, R. A., & Wagner, A. R. (1972). "A theory of Pavlovian conditioning: Variations in the effectiveness of reinforcement and nonreinforcement." In *Classical Conditioning II: Current Research and Theory*.

[^schultz]: Schultz, W., Dayan, P., & Montague, P. R. (1997). "A neural substrate of prediction and reward." *Science*, 275(5306).

[^kluger]: Kluger, A. N., & DeNisi, A. (1996). "The effects of feedback interventions on performance: A historical review, a meta-analysis, and a preliminary feedback intervention theory." *Psychological Bulletin*, 119(2).

[^mitchell]: Hashimoto, M. (2026). ["My AI Adoption Journey."](https://mitchellh.com/writing/my-ai-adoption-journey)
