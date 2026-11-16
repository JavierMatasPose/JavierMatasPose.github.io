---
title: How I Work with Coding Agents
date: 2026-11-15
---

For a while I tried to read every line of code my agents produced. It didn't
work for me. In practice, delivering more work faster just meant using that
saved time to take on another task, and another, and another...
So I just burned out faster.

So I had to organize and limit my own time: keep a clear head, retain full
ownership of what I build, and focus on one task at a time.

This post is the human side of that: how much work I take on, what I keep for
myself, and what I ask of my tools. The tools are in the next post,
[My Agent Harness and Rex Setup](/writing/my-agent-harness-and-rex-setup/).

Most of these ideas aren't mine. Where one came from someone else, I link to
it. I'm also not a psychologist. This is what works for me today.

## A Fixed Budget

Say that without AI I finish two complex tasks in a day. With AI I could
probably push through ten. But is ten the right target? Each extra task adds a
context switch and a result to verify. I don't know if that cost grows in a
straight line or faster, and I don't know how tired I will be tomorrow.

My answer is to keep the load constant, with or without AI. If two tasks
without AI cost me 100 units of attention (a number I just made up), then 100
units is still my budget with AI. That might be three or four tasks done well.
When the budget is spent, I take the gain, stop, and come back the next day
with a clear head.

The alternative is to fill the same hours with more tasks. Two researchers at
Berkeley followed 200 employees of a tech company for eight months and
[found](https://hbr.org/2026/02/ai-doesnt-reduce-work-it-intensifies-it) that
AI didn't reduce their work. It intensified it. In their words, "the reality
was a continual switching of attention, frequent checking of AI outputs, and a
growing number of open tasks." Simon Willison
[read it](https://simonwillison.net/2026/Feb/9/ai-intensifies-work/) and added
that with two or three projects running in parallel, "after just an hour or
two my mental energy for the day feels almost entirely depleted."

I also don't trust my own sense of speed. In a
[2025 study by METR](https://metr.substack.com/p/2025-07-10-early-2025-ai-experienced-os-dev-study),
experienced open-source developers took 19% longer with AI and still believed
it had made them about 20% faster. METR has
[since said](https://metr.substack.com/p/2026-02-24-uplift-update) that
developers are likely faster with today's tools, on evidence it calls "only
very weak". The part I keep is that how fast I feel and how fast I am are two
different numbers.

## What I Keep for Myself

I like to think, I like to design, and I like to own what I build. Agents are
very useful for delivery. I don't treat them as a source of wisdom, and I
don't trust their work without supervision.

So the agents get the execution. I keep the framing of the problem, the
design, and the final review.

I could do the opposite: delegate everything and watch the output go by. I
get no pleasure from that. I also think it would make me worse at my job.

Anthropic ran a
[randomized trial](https://www.anthropic.com/research/AI-assistance-coding-skills)
with 52 mostly junior engineers who had to learn a new Python library. The
group with an AI assistant averaged 50% on a quiz afterwards. The group that
coded by hand averaged 67%, and the largest gap was on debugging questions. It
is one small study with a sidebar assistant, not agents, so I hold it loosely.
It does match what Stanislas Dehaene says about learning in general: active
engagement is one of his four pillars.[^dehaene] If I only watch, I don't
learn.

Mitchell Hashimoto
[describes the trade](https://mitchellh.com/writing/my-ai-adoption-journey)
well: "not forming skills for the tasks you're delegating to the agent while
continuing to form skills naturally in the tasks you continue to work on
manually." I choose what to delegate with that in mind.

Watching is also something people are bad at. In 1983 Lisanne Bainbridge wrote
[Ironies of Automation](https://gwern.net/doc/sociology/technology/1983-bainbridge.pdf)
about the operators of automated plants: "it is impossible for even a highly
motivated human being to maintain effective visual attention towards a source
of information on which very little happens, for more than about half an
hour." Reading diffs is not the same as watching a control panel. Her other
point fits better: "physical skills deteriorate when they are not used", and
then the operator can't take over when the automation fails. A
[2024 paper](https://arxiv.org/abs/2402.11364) makes the same argument for
generative AI: the user moves from producing the work to evaluating it.

Supervising has a cost of its own. A study published in HBR in March 2026 gave
it a name,
["AI brain fry"](https://hbr.org/2026/03/when-using-ai-leads-to-brain-fry):
mental fatigue from using or overseeing AI tools beyond what your head can
take.[^bcg] That is the thing I ran into.

## One Conversation, No Pings

My head stays on one task. The agents work in the background.

I talk to one agent, the parent. It splits the work and hands it to workers.
Every open conversation is one more thing to keep in my head: what I asked,
what it answered, what is still pending. So I keep one.

Workers report to a ticket, not to my screen. I look at it when I choose to.
Mitchell says the same in
[My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey):
"turn off agent desktop notifications. Context switching is very expensive."
He found that it was his job "to be in control of when I interrupt the agent,
not the other way around."

Attention is the scarce thing here. Herbert Simon wrote in 1971 that "a wealth
of information creates a poverty of attention".[^simon] I think of mine as a
stock that drains fast and refills slowly.

## What the Agent Decides Alone

Workers can't ask me questions, so they need a rule for what to decide on
their own. I use the one Jeff Bezos described in his
[2015 letter to shareholders](https://www.sec.gov/Archives/edgar/data/1018724/000119312516530910/d168744dex991.htm):
some decisions are one-way doors, and most are two-way doors.

A helper function name, a refactor inside the allowed directory, an internal
data structure: these are two-way doors. The worker decides, writes its reason
in the ticket, and keeps going. If it was wrong, it is cheap to undo.

I step in for the one-way doors: public APIs, architectural boundaries,
database schemas, scope changes, and the final merge.

## Checks Before Review

An agent telling me "all tests pass" tells me nothing, and I don't want to
read terminal output to find out if it is true. Before a change reaches me, I
want something I can check without reading: an exit code and a record of the
run.

When an agent makes the same mistake twice, I try to fix its environment
before I add words to the prompt. Mitchell calls this "harness engineering":
"anytime you find an agent makes a mistake, you take the time to engineer a
solution such that the agent never makes that mistake again."

The idea behind it is older and comes from behavior analysis: behavior is
shaped by its consequences much more than by instructions.[^behavior] I don't
know if that says anything about language models. As a rule for designing my
tools, I find it useful.

How this works in practice is the subject of the second post.

## Today

That is where I am today. The 100 units are a made-up number, and I have no
way to measure them. The studies I link are recent, most are small, and one of
them has already been revised by its own authors. I expect to change parts of
this as the tools change.

[^dehaene]: Stanislas Dehaene, *How We Learn* (Viking, 2020). The four pillars are attention, active engagement, error feedback and consolidation. He goes through them in [this talk](https://www.youtube.com/watch?v=j9EImcqgnE4) for Aprendemos Juntos.

[^bcg]: The authors are from BCG, and I work at BCG X.

[^simon]: Herbert A. Simon, "Designing Organizations for an Information-Rich World", in *Computers, Communications, and the Public Interest* (Johns Hopkins Press, 1971).

[^behavior]: I read it in Ramón Nogueras, *Por qué pollas haces eso* (Kailas, 2024), and in *Análisis funcional de la conducta humana*, coordinated by María Xesús Froxán Parga (Pirámide, 2020). Both are in Spanish. The classic source for behavior governed by rules versus behavior shaped by consequences is B. F. Skinner, *Contingencies of Reinforcement* (1969).
