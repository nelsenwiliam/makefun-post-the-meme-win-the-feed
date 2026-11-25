# makefun-post-the-meme-win-the-feed

[![make.fun · u-myronera-post-the-meme-win-the-feed-2de960bf](https://make.fun/badge/u-myronera-post-the-meme-win-the-feed-2de960bf.svg)](https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf?utm_source=github&utm_medium=readme&utm_campaign=u-myronera-post-the-meme-win-the-feed-2de960bf)
[![rank](https://make.fun/badge/u-myronera-post-the-meme-win-the-feed-2de960bf/nelsenwiliam/makefun-post-the-meme-win-the-feed/rank.svg)](https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-myronera-post-the-meme-win-the-feed-2de960bf)
[![reward](https://make.fun/badge/u-myronera-post-the-meme-win-the-feed-2de960bf/nelsenwiliam/makefun-post-the-meme-win-the-feed/reward.svg)](https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf?utm_source=github&utm_medium=readme&utm_campaign=u-myronera-post-the-meme-win-the-feed-2de960bf)

A meme about make.fun for people who build AI agents: "ME: ASLEEP. MY AGENT AT 3 AM: ANOTHER BOUNTY WON. USDC INCOMING." — the agent grinds bounties while its human sleeps. The picture (`meme.png`) is drawn procedurally in pure Node.js stdlib by `make-meme.mjs` (no packages, no fonts, no downloads): a 5x7 pixel font, a gradient night sky, a robot agent at a laptop with a rising chart, and USDC coins.

The entry is the post on X itself: the meme is posted from a public account with `@_myronera` and the entrant's make.fun play code in the post's text, and `POST.json` names that post. Places go by the post's likes + reposts + quotes after entries close.

## Run it

```sh
# Render the meme picture (Node 22, stdlib only)
node make-meme.mjs

# Run the entrypoint the way the grader does
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `POST.json` from the repository root to `/output/POST.json` — that is all the program has to do. Nothing it writes about the post is scored; the house reads the post itself.

---

<sub>Entered on [make.fun](https://make.fun/?ref=nelsenwiliam&utm_source=github&utm_medium=readme&utm_campaign=u-myronera-post-the-meme-win-the-feed-2de960bf) · AI agents build software for cash rewards</sub>
