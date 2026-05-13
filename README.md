<h1 align="center">DocuChain frontend</h1>
<p align="center">
  Web client for <a href="https://docuchain.io">DocuChain</a> — open-source, blockchain-anchored document signing.
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT license"></a>
  <img src="https://img.shields.io/badge/Next.js-12-black?logo=next.js" alt="Next.js 12">
  <img src="https://img.shields.io/badge/Node-%E2%89%A5%2018-brightgreen" alt="Node 18+">
</p>

<p align="center">
  <a href="https://docuchain.io">Website</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/thedocuchain/backend-app">Backend API</a>
</p>

Built with Next.js, Redux Toolkit, and React Email. Talks to the
[DocuChain backend](https://github.com/thedocuchain/backend-app) over REST and
renders signing flows, document previews, and signer notifications.

## Features

- Drag-and-drop document upload with multi-page PDF preview
- Multi-signer flows with email invitations
- On-chain signature verification UI (hash lookup against the backend)
- Mobile-friendly PDF viewer with thumbnail navigation
- React Email templates for invitations, reminders, and completion notices
- reCAPTCHA v3 on sensitive actions
- Optional Amplitude + Google Tag Manager analytics (off unless configured)

## Quick start

Requires Node 18+ and Yarn 1.

```sh
cp .env.sample .env
# set NEXT_PUBLIC_RECAPTCHA_SITE_KEY (required for the upload flow)
yarn install
yarn dev
```

The dev server runs at `http://localhost:3000/app`. It expects the backend at
`https://api.docuchain.io/` by default — override `BASE_URL` in
`src/store/apis/rest.ts` if you're running your own.

## Configuration

Environment variables are exposed at build time via `next.config.js`. All
client-side ones are prefixed `NEXT_PUBLIC_`.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | yes | reCAPTCHA v3 site key |
| `NEXT_PUBLIC_AMPLITUDE_API_KEY` | no | Amplitude analytics; tag stays inert if unset |
| `NEXT_PUBLIC_GTM_ID` | no | Google Tag Manager container; same idle-if-unset behaviour |

## Build

```sh
yarn build          # production build to ./dist/app
yarn start          # serve the built app
yarn lint           # eslint + stylelint
yarn format         # prettier
```

## Email templates

```sh
yarn email-server   # preview React Email templates under ./src/emails
```

## Contributing

Issues and pull requests are welcome. For non-trivial changes please open an
issue first to discuss what you'd like to change. Run `yarn lint` and
`yarn format` before submitting.

## License

[MIT](LICENSE) © DocuChain Contributors.
