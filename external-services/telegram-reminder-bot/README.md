# Tayanch Telegram reminder bot

This is intentionally separate from the static Astro site. A static site cannot subscribe users, read chats, or safely store chat IDs. The bot only messages chat IDs that explicitly opt in with `/start`; `/stop` opts out.

## Setup
1. Create a bot in BotFather and place its token in a local `.env` (never commit it).
2. Install dependencies: `npm install`.
3. Provide `TELEGRAM_BOT_TOKEN` and run `npm start` under a hosted process manager.
4. For production, replace the in-memory set with secured persistent storage, record consent and opt-out status, choose an approved schedule/time zone, and publish the privacy notice.

The `OPTED_IN_CHAT_IDS` environment value is only a bootstrap option for already-consented IDs. Do not add people without consent.
