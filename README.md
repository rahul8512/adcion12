# ADCOIN (ADCN) website

A responsive React + Vite one-page website using the supplied ADCOIN logo.

## Requirements
- Node.js 20 or newer (Node.js 18.0+ should also work with compatible npm)
- npm
- MetaMask browser extension for wallet testing

## 1. Run locally
Open a terminal in this folder and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

## 2. Build for production

```bash
npm run build
npm run preview
```

The production website is generated in the `dist/` folder.

## 3. Publish the website
You can deploy this Vite project to Vercel, Netlify, or Cloudflare Pages:
- Build command: `npm run build`
- Output / publish directory: `dist`
- Install command: `npm install`

Connect your Git repository to your hosting provider and deploy. Add your own domain in the hosting provider's domain settings.

## 4. Where to edit
- `src/main.jsx`: website text, token data, wallet functions, links, sections and roadmap.
- `src/style.css`: colors, layout, fonts and responsive styling.
- `public/adcoin-logo.png`: supplied ADCOIN logo and browser favicon.
- `index.html`: browser title and SEO description.

## Important checks before publishing
1. Verify the contract address and token details on BscScan.
2. Verify the token is actually tradable and has sufficient liquidity on the selected DEX. The PancakeSwap button opens a swap page prefilled with the token address; it does not guarantee a market or liquidity.
3. The roadmap records the Uniswap listing as a milestone supplied by the project owner. Confirm the exact network, pool, and live listing before making public claims.
4. No token allocation percentages were provided, so the site intentionally does not invent an allocation chart.
5. Replace or supplement the support email only if the official contact changes.
6. Have the smart contract and public project claims reviewed before launch. This template is a website, not an audit or legal/financial advice.

## Wallet behavior
- **Connect Wallet** requests account access from an injected EVM wallet such as MetaMask.
- **Add BNB Chain + ADCN to MetaMask** requests BNB Smart Chain (chain ID 56) and then asks the wallet to add ADCN as a watched token.
- Wallet actions require a compatible wallet extension and user approval. The website never requests or stores seed phrases or private keys.

## Token data used
- Name: ADCOIN
- Symbol: ADCN
- Network: BNB Smart Chain
- Standard: BEP-20
- Supply: 50,000,000 ADCN
- Decimals: 18
- Supply model: fixed supply; minting disabled (as supplied by project owner)
- Contract: `0x32EE6dB598E7F0Fa7c47D4601f8AB695d17Fe560`
