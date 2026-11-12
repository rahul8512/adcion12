import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight, Menu, X, Copy, Check, Wallet, ExternalLink,
  ShieldCheck, Coins, Layers3, Zap, Mail, ChevronRight
} from 'lucide-react';
import './style.css';

const TOKEN = {
  name: 'ADCOIN',
  symbol: 'ADCN',
  chain: 'BNB Smart Chain',
  standard: 'BEP-20',
  supply: '50,000,000',
  decimals: 18,
  address: '0x32EE6dB598E7F0Fa7c47D4601f8AB695d17Fe560',
  chainId: '0x38',
  rpc: 'https://bsc-dataseed.binance.org/',
  explorer: 'https://bscscan.com',
};
const PANCAKE_URL = `https://pancakeswap.finance/swap?outputCurrency=${TOKEN.address}&chainId=56`;

function App() {
  const [copied, setCopied] = useState(false);
  const [wallet, setWallet] = useState('');
  const [walletMessage, setWalletMessage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(TOKEN.address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setWalletMessage('Could not copy automatically. Please select and copy the contract address.');
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      setWalletMessage('MetaMask was not detected. Install the MetaMask browser extension and try again.');
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts?.[0]) setWallet(accounts[0]);
      setWalletMessage('');
    } catch (err) {
      setWalletMessage(err?.message || 'Wallet connection was cancelled.');
    }
  };

  const addToMetaMask = async () => {
    if (!window.ethereum) {
      setWalletMessage('MetaMask was not detected. Install the MetaMask browser extension and try again.');
      return;
    }
    try {
      try {
        await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: TOKEN.chainId }] });
      } catch (switchError) {
        if (switchError?.code !== 4902) throw switchError;
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: TOKEN.chainId,
            chainName: 'BNB Smart Chain',
            nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
            rpcUrls: [TOKEN.rpc],
            blockExplorerUrls: [TOKEN.explorer],
          }],
        });
      }
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: TOKEN.address,
            symbol: TOKEN.symbol,
            decimals: TOKEN.decimals,
            image: `${window.location.origin}/adcoin-logo.png`,
          },
        },
      });
      setWalletMessage('BNB Smart Chain and ADCN token have been added/requested in your wallet.');
    } catch (err) {
      setWalletMessage(err?.message || 'Could not add the network or token.');
    }
  };

  const nav = [
    ['About', '#about'], ['Tokenomics', '#tokenomics'], ['Contract', '#contract'],
    ['How to Buy', '#buy'], ['Roadmap', '#roadmap'], ['Contact', '#contact'],
  ];

  return (
    <div className="site-shell">
      <header className="header">
        <a className="brand" href="#home" aria-label="ADCOIN home">
          <img src="/adcoin-logo.png" alt="ADCOIN logo" />
          <span>AD<span className="red">COIN</span><small>ADCN TOKEN</small></span>
        </a>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <button className="wallet-btn" onClick={connectWallet}>
          <Wallet size={16} /> {wallet ? `${wallet.slice(0, 6)}…${wallet.slice(-4)}` : 'Connect Wallet'}
        </button>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse" /> BUILT ON BNB SMART CHAIN</div>
            <h1>Digital value.<br /><span className="gradient-text">A fixed supply.</span></h1>
            <p className="hero-lead">Meet ADCOIN (ADCN), a BEP-20 digital token designed around transparency, accessibility, and a predefined supply.</p>
            <div className="hero-actions">
              <a className="primary-btn" href={PANCAKE_URL} target="_blank" rel="noreferrer">Explore on PancakeSwap <ArrowUpRight size={17} /></a>
              <a className="secondary-btn" href="#about">Discover ADCOIN <ChevronRight size={17} /></a>
            </div>
            <div className="hero-proof">
              <span><ShieldCheck size={16} /> Fixed supply</span>
              <span><Layers3 size={16} /> BEP-20 token</span>
              <span><Zap size={16} /> BNB Smart Chain</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="logo-glow" />
            <img src="/adcoin-logo.png" alt="ADCOIN red and black emblem" />
            <div className="floating-chip"><span className="chip-dot" /> ADCN <small>ON BNB CHAIN</small></div>
          </div>
          <div className="hero-bottom">
            <span>ADCOIN / ADCN</span><span>01 — DIGITAL TOKEN ECOSYSTEM</span>
          </div>
        </section>

        <section className="stats section-wrap" aria-label="Token highlights">
          <div><small>TOKEN SYMBOL</small><strong>ADCN</strong></div>
          <div><small>TOTAL SUPPLY</small><strong>50M</strong></div>
          <div><small>TOKEN STANDARD</small><strong>BEP-20</strong></div>
          <div><small>NETWORK</small><strong>BNB Chain</strong></div>
        </section>

        <section className="content-section section-wrap" id="about">
          <div className="section-kicker">01 / ABOUT ADCOIN</div>
          <div className="two-col">
            <h2>A token built on<br /><span className="gradient-text">blockchain foundations.</span></h2>
            <div className="section-copy">
              <p>ADCOIN (ADCN) is a digital cryptocurrency token built on the BNB Smart Chain (BSC) using the BEP-20 token standard.</p>
              <p>ADCOIN aims to establish a modern digital token ecosystem focused on transparency, accessibility, and blockchain technology. By utilizing the BNB Smart Chain, ADCN benefits from an established blockchain infrastructure designed for efficient and cost-effective transactions.</p>
              <p>With a fixed total supply of 50 million ADCN tokens and minting disabled, ADCOIN is designed around a predefined token supply.</p>
            </div>
          </div>
          <div className="feature-grid">
            <article className="feature-card"><ShieldCheck /><h3>Predefined supply</h3><p>The token supply is set at 50 million ADCN.</p></article>
            <article className="feature-card"><Coins /><h3>Minting disabled</h3><p>No additional tokens can be minted through the token contract's mint function.</p></article>
            <article className="feature-card"><Zap /><h3>BNB Smart Chain</h3><p>Built using the widely supported BEP-20 token standard.</p></article>
          </div>
        </section>

        <section className="token-section" id="tokenomics">
          <div className="section-wrap">
            <div className="section-kicker">02 / TOKENOMICS</div>
            <div className="token-heading"><h2>Simple by <span className="gradient-text">design.</span></h2><p>Core token information at a glance. No allocation breakdown is shown because no allocation data has been supplied.</p></div>
            <div className="token-panel">
              <div className="supply-visual"><div className="supply-ring"><div><strong>50M</strong><span>ADCN</span></div></div><p>FIXED TOTAL SUPPLY</p></div>
              <div className="token-table">
                {[
                  ['Token name', 'ADCOIN'], ['Token symbol', 'ADCN'], ['Blockchain', 'BNB Smart Chain'],
                  ['Token standard', 'BEP-20'], ['Total supply', '50,000,000 ADCN'],
                  ['Decimals', '18'], ['Token type', 'Fixed supply'], ['Minting', 'Disabled'],
                ].map(([k, v]) => <div className="token-row" key={k}><span>{k}</span><strong>{v}</strong></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="content-section section-wrap" id="contract">
          <div className="section-kicker">03 / CONTRACT</div>
          <div className="contract-card">
            <div><div className="contract-icon"><Layers3 /></div><h2>On-chain.<br /><span className="gradient-text">Verifiable.</span></h2><p>Use the official contract address below to identify the ADCN token. Always check the address before making a transaction.</p></div>
            <div className="address-box"><small>ADCN CONTRACT ADDRESS · BNB SMART CHAIN</small><code>{TOKEN.address}</code><div className="address-actions"><button className="primary-btn" onClick={copyAddress}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'Copied' : 'Copy address'}</button><a className="secondary-btn" href={`${TOKEN.explorer}/address/${TOKEN.address}`} target="_blank" rel="noreferrer">View on BscScan <ExternalLink size={15} /></a></div></div>
          </div>
        </section>

        <section className="buy-section" id="buy">
          <div className="section-wrap">
            <div className="section-kicker">04 / HOW TO BUY</div>
            <div className="token-heading"><h2>Get started with <span className="gradient-text">ADCN.</span></h2><p>Use a compatible wallet and verify the token contract before swapping. Availability and liquidity may vary.</p></div>
            <div className="steps-grid">
              <article><b>01</b><Wallet /><h3>Set up a wallet</h3><p>Install MetaMask or another wallet that supports BNB Smart Chain. Keep your recovery phrase private.</p></article>
              <article><b>02</b><Layers3 /><h3>Use BNB Smart Chain</h3><p>Select BNB Smart Chain in your wallet. You may add the network using the button below.</p></article>
              <article><b>03</b><Coins /><h3>Prepare BNB</h3><p>Have enough BNB for the token swap and network gas fees. Only use a trusted source.</p></article>
              <article><b>04</b><ArrowUpRight /><h3>Swap for ADCN</h3><p>Open PancakeSwap, select the ADCN contract address, and review all swap details before confirming.</p></article>
            </div>
            <div className="buy-actions"><button className="primary-btn" onClick={addToMetaMask}><Wallet size={17} /> Add BNB Chain + ADCN to MetaMask</button><a className="secondary-btn" href={PANCAKE_URL} target="_blank" rel="noreferrer">Open PancakeSwap <ArrowUpRight size={16} /></a></div>
            {walletMessage && <p className="wallet-message" role="status">{walletMessage}</p>}
            <p className="fine-print">Never share your seed phrase or private keys. Check the network, contract address, price impact, slippage, and liquidity yourself. This website does not provide investment advice.</p>
          </div>
        </section>

        <section className="content-section section-wrap" id="roadmap">
          <div className="section-kicker">05 / ROADMAP</div>
          <div className="token-heading"><h2>Progress, <span className="gradient-text">step by step.</span></h2><p>Milestones below reflect the project information supplied by the ADCOIN team.</p></div>
          <div className="timeline">
            <article className="timeline-item complete"><div className="timeline-marker"><Check /></div><div><small>NOVEMBER 09, 2026 · 06:37:03 UTC</small><h3>Project created</h3><p>ADCOIN project creation milestone.</p><span className="status">Completed</span></div></article>
            <article className="timeline-item complete"><div className="timeline-marker"><Check /></div><div><small>NOVEMBER 09, 2026 · 08:17:33 UTC</small><h3>Uniswap listing</h3><p>Uniswap listing milestone as reported by the project team. Confirm the live market and supported network on the exchange before trading.</p><span className="status">Reported completed</span></div></article>
            <article className="timeline-item"><div className="timeline-marker">03</div><div><small>UPCOMING · DATE TO BE ANNOUNCED</small><h3>Additional exchange listing</h3><p>Work toward a further exchange listing. Exchange name and date will be announced when confirmed.</p><span className="status planned">Planned</span></div></article>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-wrap contact-inner">
            <div><div className="section-kicker">06 / CONTACT</div><h2>Questions about<br /><span className="gradient-text">ADCOIN?</span></h2><p>For official project enquiries, contact the ADCOIN support team.</p></div>
            <a className="contact-mail" href="mailto:support.adcn@gmail.com"><Mail /><span><small>OFFICIAL SUPPORT</small><strong>support.adcn@gmail.com</strong></span><ArrowUpRight /></a>
          </div>
        </section>
      </main>

      <footer className="footer section-wrap">
        <a className="brand" href="#home"><img src="/adcoin-logo.png" alt="" /><span>AD<span className="red">COIN</span><small>ADCN TOKEN</small></span></a>
        <p>© {new Date().getFullYear()} ADCOIN. All rights reserved.</p>
        <a href={`${TOKEN.explorer}/address/${TOKEN.address}`} target="_blank" rel="noreferrer">BscScan <ExternalLink size={13} /></a>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);