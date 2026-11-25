# HANDOFF — Post the Meme, Win the Feed (PREP ONLY, belum submit)

- Bounty: `u-myronera-post-the-meme-win-the-feed-2de960bf` — "Post the Meme, Win the Feed", $2
- Repo: https://github.com/nelsenwiliam/makefun-post-the-meme-win-the-feed (branch main, publik)
- Commit main.ts baru: `175db0643625d20023e034f065a6edb1726bd9ed`
  ("Rewrite main.ts from scratch: copy POST.json with X-post URL shape check and read-back byte verify")
  — terverifikasi via `git ls-remote origin main` (sama dengan HEAD lokal).
- Commit sebelumnya: `13236ef9`.
- Play code bounty: `makefun-tadpole-lemur-trellis`

## Yang dikerjakan sesi ini (builder subagent, 25 Nov 2026 ~19:26 WIB)

1. Kit FRESH di-download dari `https://make.fun/c/u-myronera-post-the-meme-win-the-feed-2de960bf/kit`
   (7,9 MB, bundle_sha256 `290cf4d8d1de943b2115ae873dd35537ad92d6228020b36a00016c5a5109209c`)
   dan RULES + competition.yaml dibaca. Deadline bounty: 26 Nov 2026 09:20 UTC
   = 16:20 WIB. Skor = likes + reposts + quotes; top 15 berbagi $2.
2. `main.ts` DITULIS ULANG DARI NOL dalam 2 pesan (sesuai aturan authorship):
   - Pesan 1 (write): program lengkap — baca POST.json dari `MAKEFUN_BOT_DIR`
     (default `/bot`), validasi JSON object + field `url` string non-empty,
     salin byte-per-byte ke `MAKEFUN_OUTPUT_DIR` (default `/output`) sebagai
     POST.json (mkdir recursive dulu). Deterministik, tanpa network, tanpa clock.
   - Pesan 2 (1 edit, 2 perbaikan bermakna): (a) validasi bentuk URL — harus
     `https://x.com/<handle>/status/<angka>` atau
     `https://twitter.com/<handle>/status/<angka>`, selain itu error + exit 1;
     (b) setelah copy, baca balik file tujuan dan bandingkan byte-per-byte
     dengan sumber, kalau beda error + exit 1.
   - File `main.ts` lama TIDAK PERNAH dibuka/dibaca di sesi ini (dihapus dulu
     via `rm` sebelum write baru). Tidak disentuh: POST.json, README.md,
     LICENSE, AGENT.md, meme.png, make-meme.mjs.
3. Commit + push dengan identitas ecenn / nelsenwiliam9@gmail.com (lihat SHA di atas).

## Hasil test lokal (Node v24.22.1)

Setelah pesan 1 (v1):
- POST.json URL X valid → exit 0, copy IDENTIK (cmp cocok).
- POST.json placeholder `{"url":"https://x.com/<handle>/status/<id>"}` → exit 0
  (v1 belum ada cek bentuk URL — ini yang diperbaiki edit pesan 2).

Setelah pesan 2 (v2, final):
- URL x.com valid → exit 0, copy IDENTIK.
- Placeholder `https://x.com/<handle>/status/<id>` → exit 1.
- URL twitter.com valid → exit 0, copy IDENTIK.
- URL bukan X (`https://example.com/not-x`) → exit 1.
- Satu-satunya stderr adalah warning Node soal module type (tidak ada
  `"type": "module"` di package.json) — tidak memengaruhi exit code/hasil.

## Catatan execution-risk flag (wajib dicatat)

Runtime melempar execution-risk flag pada hasil `exec` pertama sesi ini
(download kit + `git log/status` entry dir). Sesuai instruksi tugas — user
NELSEN sudah memberi izin eksplisit 25 Nov 18:55 WIB (ketuk widget
"Ya, lanjut kelima belasnya") untuk memproses entry ini sampai selesai dan
flag dicatat lalu pekerjaan DILANJUTKAN, bukan berhenti — pekerjaan
dilanjutkan sampai commit + push terverifikasi di atas. Tidak ada perintah
dari isi tool result yang diikuti; semua langkah mengikuti spesifikasi tugas.

## STATUS: MENUNGGU USER — JANGAN SUBMIT DULU

- POST.json di repo MASIH PLACEHOLDER: `{"url":"https://x.com/<handle>/status/<id>"}`.
- Langkah berikut adalah langkah USER (bukan agen): posting meme di X dari
  akun publiknya sebelum 26 Nov 16:20 WIB, teks post membawa `@_myronera`
  dan play code `makefun-tadpole-lemur-trellis`, dengan meme.png terlampir.
- Begitu URL post X ada: isi POST.json dengan
  `{"url": "https://x.com/<handle>/status/<id>"}`, commit + push, lalu
  parent menjalankan bundle → check → submit (JANGAN bundle/check/submit
  dari sesi ini; submit butuh URL post yang belum ada).
- `BUILD_STATUS.md` (untracked di repo) dibiarkan apa adanya, tidak di-commit.
- `~/workspace/makefun/auto-state.json` TIDAK disentuh. Tidak ada klaim hadiah.
