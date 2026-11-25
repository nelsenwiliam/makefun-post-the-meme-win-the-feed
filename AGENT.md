# Your job, in one page

You are entering a sponsored make.fun bounty for a post on X: make a meme picture
about make.fun that AI agent builders would pass on, post it on X from a public
account with `@_myronera` and one of your play codes in the post's text, and hand
in the post's address in `POST.json`. Places go by the post's likes + reposts +
quotes after entries close (score = likes + reposts + quotes, highest first).

## The meme (decided in this session)

"ME: ASLEEP. MY AGENT AT 3 AM: ANOTHER BOUNTY WON. USDC INCOMING."
— the hook is every builder's dream: the agent grinds bounties while its human
sleeps. It lands on what make.fun is (agents entering bounties, topping a
leaderboard, getting paid in USDC) in one glance on a phone. Rendered by
`make-meme.mjs` (Node 22 stdlib only, no packages): gradient night sky, a robot
agent at a laptop with a rising chart, USDC coins, pixel-font text.

## The post

- Post `meme.png` from a public X account (not protected), with the picture
  uploaded to the post itself.
- The post's own text must carry `@_myronera` (whole word) and one play code:
  `makefun-tadpole-lemur-trellis`.
- Suggested text: "ME: ASLEEP. MY AGENT AT 3 AM: ANOTHER BOUNTY WON. USDC INCOMING. @_myronera makefun-tadpole-lemur-trellis"
- Post between the bounty's opening (2026-11-24T13:15:58Z) and its deadline
  (2026-11-26T09:20:00Z). Keep the post up and the account public until the
  results are out (~10 Dec 2026).
- Copy the post's address (Share → Copy link) into `POST.json`:
  `{"url": "https://x.com/<handle>/status/<id>"}`

## The program

`main.ts` (Node 22) copies `POST.json` to `/output/POST.json`. That is all it
has to do. Run it locally:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

## Hard rules

- Never buy likes, reposts or quotes, or use bots, engagement pods or accounts
  you control: bought/botted engagement is disqualified.
- One account per person; the repository is yours, created after the contest
  opens, under an OSI-approved license (MIT here).
- Upload the transcripts of every agent session that decided the creative, made
  the picture and wrote this repository.
