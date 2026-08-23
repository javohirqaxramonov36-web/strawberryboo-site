# Payment configuration and activation

The course purchase flow is **manual**: a learner begins in Telegram, chooses a confirmed method, sends payment confirmation, then receives a Telegram confirmation and access link.

There is no Payme or Click checkout integration in this repository. Do not describe one as active, and do not add payment-provider credentials, secret keys, or unverified payment URLs to the site.

## Source of truth

`src/config/payments.ts` is the only configuration file used by the current payment-method display. Keep payment details there rather than duplicating them in pages or components.

## Before enabling Payme or Click

Obtain and verify all of the following from the account owner/provider before changing `enabled` from `false`:

1. The official public Payme or Click payment URL (if one is intended to be displayed).
2. The merchant/account identifier or official payment instruction that learners should see.
3. Written confirmation of the account owner and the course-payment purpose.
4. Localized customer-facing wording for Uzbek, Russian, and English, if the provider requires a special instruction.
5. Confirmation of whether receipts still need to be sent in Telegram and who sends the access link.

Then update only the matching object in `src/config/payments.ts`:

- Set `enabled: true` only after the details above are verified.
- Replace the placeholder `value`, `url`, and `note` with the approved public values.
- Never store provider API keys, merchant secrets, passwords, one-time codes, or private credentials in this repository.
- Test the rendered payment method and the UZ/RU/EN contact pages before deployment.

## Card payments

Card details are managed in the same config. Confirm the current card number and account owner with the owner before editing them. The website must never collect card data; the manual flow directs learners to confirm payment details in Telegram.

## Current status

- Payme: placeholder only; no public payment URL has been supplied.
- Click: placeholder only; no public payment URL has been supplied.
- Automatic payment processing: not implemented.
