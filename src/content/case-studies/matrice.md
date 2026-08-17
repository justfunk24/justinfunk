---
title: Building agentic contact centers that survive contact with a real support org
company: Matrice IT Advisors
metric:
  value: Certified
  label: Dialpad Agentic Delivery Partner
summary: Agentic AI contact center builds on Zoom and Dialpad, where the hard part is never the model — it's the routing, the integrations, and the handoff to a human.
period: 2025 — present
lenses:
  - applied-ai
  - cx-customer-success
  - revenue-ownership
platforms:
  - zoom
  - dialpad
order: 1
draft: false
unverified: []
---

## Situation

Every contact center vendor now ships an agentic product, and every one of them demos beautifully. A prospect asks a clean question, the agent resolves it, the room nods. Then it goes into production against a real support org — with a knowledge base that hasn't been pruned since 2019, four systems of record that disagree about who the customer is, and a queue where a third of the volume is people who already tried the bot and want a human.

That gap is where I work. Matrice delivers agentic contact center environments on Zoom and Dialpad, and the engagements that succeed are the ones where somebody takes the deployment seriously as an integration and change-management problem rather than a configuration exercise.

## What I did

**Designed the routing before the agent.** An agentic layer is a routing decision that happens earlier, not a replacement for routing. So the first artifact on every build is a flow diagram covering what the agent handles, what it must never attempt, and what the escalation path looks like when it's wrong. Containment targets get set against that diagram, not against a vendor slide.

**Built the integrations that make the agent useful.** An agent that can't see the order, the ticket history, or the entitlement is a search box with better manners. Most of the delivery work is API integration — connecting the agentic layer to the CRM and ticketing systems behind it, deciding what it's allowed to write back, and handling the cases where the source system is slow or down without stranding the customer.

**Earned the Dialpad Agentic Delivery Partner certification.** It's a real credential with a real scope, and it means Dialpad's own delivery standards are the baseline I work to rather than something I assembled myself.

**Wrote the handoff.** The moment a customer moves from the agent to a person is where the whole thing is judged. Context has to travel — what was asked, what was attempted, what failed — or the customer repeats themselves and the deflection you counted becomes a worse experience than no agent at all. That transcript-and-context handoff gets specified and tested on every build.

**Made the measurement honest.** Containment rate is the number everyone reports and the easiest one to flatter. A resolved conversation and an abandoned one both look like containment if you count them carelessly. I set up the reporting so that abandonment, repeat contacts within a window, and post-handoff resolution are visible next to it.

## Outcome

<!-- PLACEHOLDER — Justin: this section needs your real numbers. Deflection or
     containment rate, handle-time change, time-to-deploy, or number of
     environments delivered. One or two hard figures, with the client named
     only where you have permission. Everything above this line is safe to
     publish as written; this section is the one that has to be yours. -->

Currently delivering agentic contact center environments on both Zoom and Dialpad, with the Dialpad Agentic Delivery Partner certification behind the delivery work.

The through-line from more than a decade in this industry is that the technology was rarely the constraint. Adoption was. The same is true of agentic AI, just faster and more expensively — a badly deployed agent damages the customer relationship at machine speed. Knowing where the routing breaks and where the human has to catch it is the part that takes the background.

If you're evaluating an agentic build and want a second opinion on the deployment plan before you commit to it, [that's a conversation worth having](/contact).
