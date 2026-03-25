export const processStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Syne:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ps-root {
    background: #0e0e18;
    font-family: 'Syne', sans-serif;
    color: #f0ece2;
    position: relative;
    overflow: hidden;
    padding: 96px 0;
  }

  .ps-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .ps-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(ellipse, rgba(120,90,230,0.14) 0%, transparent 70%);
    border-radius: 50%;
  }
  .ps-bg::after {
    content: '';
    position: absolute;
    bottom: -20%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(ellipse, rgba(230,184,48,0.1) 0%, transparent 70%);
    border-radius: 50%;
  }

  .ps-noise {
    position: absolute;
    inset: 0;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  .ps-inner {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 32px;
  }

  /* Header */
  .ps-header {
    text-align: center;
    margin-bottom: 80px;
  }

  .ps-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.35em;
    color: #e6b830;
    text-transform: uppercase;
    margin-bottom: 20px;
    display: block;
  }

  .ps-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(44px, 5vw, 68px);
    font-weight: 300;
    line-height: 1.05;
    color: #f0ece2;
    margin-bottom: 20px;
  }

  .ps-title em {
    font-style: italic;
    color: #e6b830;
  }

  .ps-subtitle {
    font-size: 15px;
    line-height: 1.7;
    color: rgba(240,236,226,0.55);
    max-width: 480px;
    margin: 0 auto;
  }

  /* Steps */
  .ps-steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    position: relative;
    margin-bottom: 64px;
  }

  @media (max-width: 768px) {
    .ps-steps {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }

  /* Connector track running between steps (desktop) */
  .ps-track {
    position: absolute;
    top: 52px;
    left: calc(100% / 6);
    right: calc(100% / 6);
    height: 1px;
    background: rgba(240,236,226,0.08);
    z-index: 0;
  }

  .ps-track-fill {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, #e6b830 0%, rgba(230,184,48,0.2) 100%);
    transform-origin: left;
    animation: ps-fill 1.4s cubic-bezier(0.4,0,0.2,1) 0.3s both;
  }

  @keyframes ps-fill {
    from { transform: scaleX(0); opacity: 0; }
    to   { transform: scaleX(1); opacity: 1; }
  }

  @media (max-width: 768px) {
    .ps-track { display: none; }
  }

  /* Step card */
  .ps-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 32px 56px;
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    .ps-step {
      flex-direction: row;
      text-align: left;
      align-items: flex-start;
      padding: 0 0 48px;
      gap: 28px;
    }
    .ps-step:last-child { padding-bottom: 0; }
    .ps-step-body { padding-top: 4px; }
  }

  /* Mobile connector */
  @media (max-width: 768px) {
    .ps-step:not(:last-child)::after {
      content: '';
      position: absolute;
      left: 25px;
      top: 52px;
      bottom: 0;
      width: 1px;
      background: linear-gradient(180deg, #e6b830 0%, rgba(230,184,48,0.1) 100%);
    }
  }

  .ps-num-wrap {
    position: relative;
    margin-bottom: 28px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    .ps-num-wrap { margin-bottom: 0; }
  }

  .ps-num-ring {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: 1px solid rgba(230,184,48,0.35);
    background: rgba(230,184,48,0.07);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.3s, background 0.3s;
  }

  .ps-step:hover .ps-num-ring {
    border-color: #e6b830;
    background: rgba(230,184,48,0.14);
  }

  .ps-num {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    font-weight: 500;
    color: #e6b830;
    letter-spacing: 0.05em;
  }

  .ps-step-title {
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #f0ece2;
    line-height: 1.3;
    margin-bottom: 12px;
    letter-spacing: 0.01em;
  }

  .ps-step-desc {
    font-size: 13px;
    line-height: 1.8;
    color: rgba(240,236,226,0.5);
  }

  /* CTA banner */
  .ps-cta {
    border: 1px solid rgba(240,236,226,0.1);
    border-radius: 6px;
    padding: 32px 40px;
    display: flex;
    align-items: flex-start;
    gap: 24px;
    background: rgba(240,236,226,0.025);
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s, background 0.3s;
  }

  .ps-cta::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(230,184,48,0.04) 0%, transparent 60%);
    pointer-events: none;
  }

  .ps-cta-icon {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    border: 1px solid rgba(230,184,48,0.3);
    background: rgba(230,184,48,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .ps-cta-icon svg {
    width: 18px;
    height: 18px;
    color: #e6b830;
  }

  .ps-cta-body {}

  .ps-cta-strong {
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #f0ece2;
    display: block;
    margin-bottom: 6px;
  }

  .ps-cta-text {
    font-size: 13px;
    line-height: 1.75;
    color: rgba(240,236,226,0.52);
  }

  .ps-cta-tag {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(230,184,48,0.5);
    margin-left: auto;
    align-self: center;
    white-space: nowrap;
    flex-shrink: 0;
  }

  @media (max-width: 600px) {
    .ps-cta { flex-direction: column; gap: 16px; padding: 28px 24px; }
    .ps-cta-tag { display: none; }
  }
`;

export const servicesStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Syne:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ss-root {
    background: #0e0e18;
    font-family: 'Syne', sans-serif;
    color: #f0ece2;
    position: relative;
    overflow: hidden;
    padding: 96px 0;
  }

  .ss-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .ss-bg::before {
    content: '';
    position: absolute;
    top: -30%;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 600px;
    background: radial-gradient(ellipse, rgba(230,184,48,0.1) 0%, transparent 65%);
    border-radius: 50%;
  }
  .ss-bg::after {
    content: '';
    position: absolute;
    bottom: -20%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(ellipse, rgba(120,90,230,0.12) 0%, transparent 70%);
    border-radius: 50%;
  }

  .ss-noise {
    position: absolute;
    inset: 0;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  .ss-inner {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 32px;
  }

  /* Header */
  .ss-header {
    text-align: center;
    margin-bottom: 72px;
  }

  .ss-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.35em;
    color: #e6b830;
    text-transform: uppercase;
    margin-bottom: 20px;
    display: block;
  }

  .ss-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(44px, 5vw, 68px);
    font-weight: 300;
    line-height: 1.05;
    color: #f0ece2;
    margin-bottom: 20px;
  }

  .ss-title em {
    font-style: italic;
    color: #e6b830;
  }

  .ss-subtitle {
    font-size: 15px;
    line-height: 1.7;
    color: rgba(240,236,226,0.58);
    max-width: 540px;
    margin: 0 auto;
    font-weight: 400;
  }

  /* Grid */
  .ss-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1px;
    background: rgba(240,236,226,0.08);
    border: 1px solid rgba(240,236,226,0.08);
    border-radius: 8px;
    overflow: hidden;
  }

  @media (max-width: 1024px) {
    .ss-grid { grid-template-columns: repeat(3, 1fr); }
    .ss-card:last-child { grid-column: span 3; max-width: 380px; margin: 0 auto; width: 100%; }
  }

  @media (max-width: 640px) {
    .ss-grid { grid-template-columns: 1fr 1fr; }
    .ss-card:last-child { grid-column: span 2; }
  }

  /* Card */
  .ss-card {
    background: rgba(240,236,226,0.025);
    padding: 36px 28px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    cursor: default;
    transition: background 0.25s;
    position: relative;
    overflow: hidden;
  }

  .ss-card::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #e6b830, transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .ss-card:hover {
    background: rgba(230,184,48,0.06);
  }

  .ss-card:hover::after {
    opacity: 1;
  }

  .ss-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .ss-icon-wrap {
    width: 44px;
    height: 44px;
    border: 1px solid rgba(230,184,48,0.25);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(230,184,48,0.07);
    transition: border-color 0.25s, background 0.25s;
    flex-shrink: 0;
  }

  .ss-card:hover .ss-icon-wrap {
    border-color: rgba(230,184,48,0.6);
    background: rgba(230,184,48,0.14);
  }

  .ss-icon {
    width: 20px;
    height: 20px;
    color: #e6b830;
  }

  .ss-tag {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.2em;
    color: rgba(240,236,226,0.25);
    text-transform: uppercase;
    transition: color 0.25s;
  }

  .ss-card:hover .ss-tag {
    color: rgba(230,184,48,0.5);
  }

  .ss-card-title {
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #f0ece2;
    line-height: 1.3;
    letter-spacing: 0.01em;
  }

  .ss-card-desc {
    font-size: 13px;
    line-height: 1.75;
    color: rgba(240,236,226,0.52);
    font-weight: 400;
    flex: 1;
  }

  .ss-card-arrow {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: rgba(240,236,226,0.18);
    margin-top: 8px;
    transition: color 0.25s, transform 0.25s;
    display: inline-block;
    letter-spacing: 0.05em;
  }

  .ss-card:hover .ss-card-arrow {
    color: #e6b830;
    transform: translateX(4px);
  }

  /* Bottom rule */
  .ss-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    margin-top: 56px;
  }

  .ss-footer-line {
    flex: 1;
    max-width: 120px;
    height: 1px;
    background: rgba(240,236,226,0.1);
  }

  .ss-footer-text {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.25em;
    color: rgba(240,236,226,0.25);
    text-transform: uppercase;
  }
`;

export const quoteStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Syne:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .qf-root {
    min-height: 100vh;
    background: #0e0e18;
    font-family: 'Syne', sans-serif;
    color: #f0ece2;
    position: relative;
    overflow: hidden;
  }

  .qf-bg {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }
  .qf-bg::before {
    content: '';
    position: absolute;
    top: -20%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(ellipse, rgba(230,184,48,0.25) 0%, transparent 70%);
    border-radius: 50%;
  }
  .qf-bg::after {
    content: '';
    position: absolute;
    bottom: -20%;
    left: -15%;
    width: 500px;
    height: 500px;
    background: radial-gradient(ellipse, rgba(120,90,230,0.20) 0%, transparent 70%);
    border-radius: 50%;
  }
  .qf-noise {
    position: fixed;
    inset: 0;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 1;
  }

  .qf-container {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
  }

  @media (max-width: 900px) {
    .qf-container { grid-template-columns: 1fr; }
    .qf-sidebar { display: none; }
  }

  /* Sidebar */
  .qf-sidebar {
    padding: 64px 56px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid rgba(240,236,226,0.12);
    position: sticky;
    top: 0;
    height: 100vh;
  }

  .qf-logo {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.2em;
    color: rgba(240,236,226,0.7);
    text-transform: uppercase;
  }

  .qf-sidebar-headline {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 24px;
  }

  .qf-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.3em;
    color: #e6b830;
    text-transform: uppercase;
  }

  .qf-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(52px, 5vw, 76px);
    font-weight: 300;
    line-height: 1.05;
    color: #f0ece2;
  }

  .qf-title em {
    font-style: italic;
    color: #e6b830;
  }

  .qf-subtitle {
    font-size: 14px;
    line-height: 1.7;
    color: rgba(240,236,226,0.7);
    max-width: 280px;
    font-weight: 400;
  }

  .qf-divider {
    width: 32px;
    height: 1px;
    background: #e6b830;
    opacity: 0.5;
  }

  .qf-steps {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .qf-step {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .qf-step-num {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: #e6b830;
    opacity: 0.6;
    width: 20px;
  }

  .qf-step-text {
    font-size: 12px;
    color: rgba(240,236,226,0.72);
    letter-spacing: 0.05em;
  }

  .qf-step-line {
    flex: 1;
    height: 1px;
    background: rgba(240,236,226,0.15);
  }

  /* Form panel */
  .qf-panel {
    padding: 64px 56px;
    overflow-y: auto;
  }

  @media (max-width: 900px) {
    .qf-panel { padding: 48px 24px; }
  }

  .qf-form-header {
    margin-bottom: 48px;
  }

  .qf-form-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 300;
    color: #f0ece2;
    margin-bottom: 8px;
  }

  .qf-form-desc {
    font-size: 13px;
    color: rgba(240,236,226,0.72);
    letter-spacing: 0.02em;
    font-family: 'DM Mono', monospace;
    font-weight: 300;
  }

  /* Fields */
  .qf-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  @media (max-width: 600px) {
    .qf-row { grid-template-columns: 1fr; }
  }

  .qf-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 28px;
  }

  .qf-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(240,236,226,0.65);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .qf-label-req {
    color: #e6b830;
    font-size: 12px;
  }

  .qf-input {
    width: 100%;
    background: rgba(240,236,226,0.05);
    border: 1px solid rgba(240,236,226,0.2);
    border-radius: 4px;
    padding: 13px 16px;
    color: #f0ece2;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 400;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    -webkit-appearance: none;
    appearance: none;
  }

  .qf-input::placeholder {
    color: rgba(240,236,226,0.4);
    font-weight: 400;
  }

  .qf-input:focus {
    border-color: rgba(230,184,48,0.7);
    background: rgba(230,184,48,0.08);
    box-shadow: 0 0 0 3px rgba(230,184,48,0.1);
  }

  .qf-input.error {
    border-color: rgba(220,80,80,0.5);
  }

  .qf-error {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: #e06060;
    letter-spacing: 0.05em;
  }

  /* Project type pills */
  .qf-pills {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  @media (max-width: 600px) {
    .qf-pills { grid-template-columns: repeat(2, 1fr); }
  }

  .qf-pill {
    background: rgba(240,236,226,0.05);
    border: 1px solid rgba(240,236,226,0.2);
    border-radius: 4px;
    padding: 12px 10px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    text-align: center;
  }

  .qf-pill:hover {
    border-color: rgba(230,184,48,0.45);
    background: rgba(230,184,48,0.08);
  }

  .qf-pill.selected {
    border-color: #e6b830;
    background: rgba(230,184,48,0.15);
  }

  .qf-pill-icon {
    font-size: 18px;
    color: rgba(240,236,226,0.7);
    transition: color 0.2s;
  }

  .qf-pill.selected .qf-pill-icon {
    color: #e6b830;
  }

  .qf-pill-label {
    font-size: 11px;
    color: rgba(240,236,226,0.75);
    font-weight: 500;
    letter-spacing: 0.03em;
    transition: color 0.2s;
    line-height: 1.3;
  }

  .qf-pill.selected .qf-pill-label {
    color: #f0ece2;
  }

  /* Select */
  .qf-select-wrap {
    position: relative;
  }

  .qf-select-wrap::after {
    content: '↓';
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(240,236,226,0.7);
    font-size: 12px;
    pointer-events: none;
    font-family: 'DM Mono', monospace;
  }

  select.qf-input {
    cursor: pointer;
    padding-right: 40px;
  }

  select.qf-input option {
    background: #16162a;
    color: #f0ece2;
  }

  /* Inline options for budget & timeline */
  .qf-options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .qf-opt {
    background: rgba(240,236,226,0.05);
    border: 1px solid rgba(240,236,226,0.2);
    border-radius: 100px;
    padding: 8px 18px;
    cursor: pointer;
    font-size: 12px;
    color: rgba(240,236,226,0.7);
    font-family: 'Syne', sans-serif;
    font-weight: 500;
    letter-spacing: 0.03em;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .qf-opt:hover {
    border-color: rgba(230,184,48,0.45);
    color: rgba(240,236,226,0.85);
  }

  .qf-opt.selected {
    border-color: #e6b830;
    background: rgba(230,184,48,0.18);
    color: #f0ece2;
  }

  /* Textarea */
  textarea.qf-input {
    resize: none;
    min-height: 120px;
    line-height: 1.6;
  }

  /* Separator */
  .qf-sep {
    height: 1px;
    background: rgba(240,236,226,0.15);
    margin: 8px 0 32px;
  }

  .qf-section-label {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(240,236,226,0.4);
    margin-bottom: 16px;
  }

  /* Submit */
  .qf-submit {
    width: 100%;
    background: #e6b830;
    border: none;
    border-radius: 4px;
    padding: 16px 32px;
    color: #0e0e18;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.25s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 8px;
  }

  .qf-submit:hover:not(:disabled) {
    background: #f0c840;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(230,184,48,0.3);
  }

  .qf-submit:active:not(:disabled) {
    transform: translateY(0);
  }

  .qf-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .qf-note {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: rgba(240,236,226,0.4);
    text-align: center;
    margin-top: 16px;
    letter-spacing: 0.05em;
  }

  /* Spinner */
  .qf-spinner {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(8,8,16,0.3);
    border-top-color: #0e0e18;
    border-radius: 50%;
    animation: qf-spin 0.6s linear infinite;
  }

  @keyframes qf-spin {
    to { transform: rotate(360deg); }
  }

  /* Success */
  .qf-success {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    position: relative;
    z-index: 2;
  }

  .qf-success-card {
    max-width: 520px;
    width: 100%;
    text-align: center;
  }

  .qf-success-icon {
    width: 72px;
    height: 72px;
    border: 1px solid rgba(230,184,48,0.45);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 40px;
    font-size: 28px;
    color: #e6b830;
    animation: qf-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes qf-pop {
    from { transform: scale(0.5); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .qf-success-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 52px;
    font-weight: 300;
    color: #f0ece2;
    line-height: 1.1;
    margin-bottom: 16px;
  }

  .qf-success-sub {
    font-size: 14px;
    color: rgba(240,236,226,0.65);
    line-height: 1.7;
    margin-bottom: 48px;
  }

  .qf-success-steps {
    border: 1px solid rgba(232,228,220,0.07);
    border-radius: 8px;
    overflow: hidden;
  }

  .qf-success-step {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    padding: 20px 24px;
    border-bottom: 1px solid rgba(240,236,226,0.15);
  }

  .qf-success-step:last-child { border-bottom: none; }

  .qf-success-step-num {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: #e6b830;
    opacity: 0.7;
    margin-top: 2px;
    flex-shrink: 0;
  }

  .qf-success-step-text {
    font-size: 13px;
    color: rgba(240,236,226,0.75);
    line-height: 1.6;
    text-align: left;
  }

  .qf-success-step-text strong {
    color: #f0ece2;
    font-weight: 600;
  }
`;

export const heroStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Syne:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .hs-root {
    background: #0e0e18;
    font-family: 'Syne', sans-serif;
    color: #f0ece2;
    position: relative;
    overflow: hidden;
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

  /* Background orbs */
  .hs-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .hs-bg::before {
    content: '';
    position: absolute;
    top: -15%;
    right: -10%;
    width: 700px;
    height: 700px;
    background: radial-gradient(ellipse, rgba(230,184,48,0.13) 0%, transparent 65%);
    border-radius: 50%;
  }
  .hs-bg::after {
    content: '';
    position: absolute;
    bottom: -20%;
    left: -15%;
    width: 600px;
    height: 600px;
    background: radial-gradient(ellipse, rgba(120,90,230,0.15) 0%, transparent 65%);
    border-radius: 50%;
  }

  .hs-noise {
    position: absolute;
    inset: 0;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  /* Grid overlay */
  .hs-grid {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(240,236,226,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(240,236,226,0.03) 1px, transparent 1px);
    background-size: 80px 80px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
  }

  /* Inner */
  .hs-inner {
    position: relative;
    z-index: 2;
    max-width: 1000px;
    margin: 0 auto;
    padding: 120px 32px;
    text-align: center;
    width: 100%;
  }

  /* Badge */
  .hs-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 1px solid rgba(230,184,48,0.25);
    border-radius: 100px;
    padding: 7px 18px 7px 12px;
    margin-bottom: 48px;
    background: rgba(230,184,48,0.05);
  }

  .hs-badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #e6b830;
    box-shadow: 0 0 8px rgba(230,184,48,0.8);
    animation: hs-pulse 2s ease-in-out infinite;
  }

  @keyframes hs-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .hs-badge-text {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(230,184,48,0.8);
  }

  /* Headline */
  .hs-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(52px, 7vw, 96px);
    font-weight: 300;
    line-height: 1.0;
    letter-spacing: -0.01em;
    color: #f0ece2;
    margin-bottom: 32px;
  }

  .hs-headline em {
    font-style: italic;
    color: #e6b830;
    display: block;
  }

  .hs-headline strong {
    font-style: normal;
    font-weight: 300;
    font-family: 'Syne', sans-serif;
    font-size: 0.52em;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(240,236,226,0.4);
    display: block;
    margin-bottom: 8px;
  }

  /* Subtitle */
  .hs-sub {
    font-size: clamp(15px, 1.6vw, 18px);
    line-height: 1.75;
    color: rgba(240,236,226,0.52);
    max-width: 600px;
    margin: 0 auto 56px;
    font-weight: 400;
  }

  /* CTAs */
  .hs-ctas {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .hs-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #e6b830;
    color: #0e0e18;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    border: none;
    border-radius: 4px;
    padding: 16px 32px;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  }

  .hs-btn-primary:hover {
    background: #f0c840;
    transform: translateY(-2px);
    box-shadow: 0 10px 36px rgba(230,184,48,0.3);
  }

  .hs-btn-primary:active {
    transform: translateY(0);
  }

  .hs-btn-primary svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s;
  }

  .hs-btn-primary:hover svg {
    transform: translateX(3px);
  }

  .hs-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: transparent;
    color: rgba(240,236,226,0.65);
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border: 1px solid rgba(240,236,226,0.15);
    border-radius: 4px;
    padding: 15px 28px;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
  }

  .hs-btn-secondary:hover {
    border-color: rgba(240,236,226,0.35);
    color: #f0ece2;
    background: rgba(240,236,226,0.04);
  }

  /* Stats row */
  .hs-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    margin-top: 80px;
    border-top: 1px solid rgba(240,236,226,0.07);
    padding-top: 48px;
  }

  .hs-stat {
    flex: 1;
    max-width: 200px;
    text-align: center;
    padding: 0 32px;
    border-right: 1px solid rgba(240,236,226,0.07);
  }

  .hs-stat:last-child { border-right: none; }

  .hs-stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 42px;
    font-weight: 300;
    color: #e6b830;
    line-height: 1;
    margin-bottom: 8px;
    letter-spacing: -0.01em;
  }

  .hs-stat-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(240,236,226,0.35);
  }

  @media (max-width: 640px) {
    .hs-inner { padding: 80px 24px; }
    .hs-stats { gap: 0; flex-wrap: wrap; }
    .hs-stat { max-width: 50%; border-right: none; border-bottom: 1px solid rgba(240,236,226,0.07); padding: 24px 16px; }
    .hs-stat:last-child { border-bottom: none; }
  }
`;

export const adminStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Syne:wght@400;500;600;700&display=swap');

  .ad-root {
    min-height: 100vh;
    background: #0e0e18;
    font-family: 'Syne', sans-serif;
    color: #f0ece2;
    position: relative;
    overflow: hidden;
  }

  .ad-bg {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  .ad-bg::before {
    content: '';
    position: absolute;
    top: -12%;
    right: -8%;
    width: 620px;
    height: 620px;
    border-radius: 50%;
    background: radial-gradient(ellipse, rgba(230,184,48,0.2) 0%, transparent 68%);
  }

  .ad-bg::after {
    content: '';
    position: absolute;
    bottom: -18%;
    left: -12%;
    width: 560px;
    height: 560px;
    border-radius: 50%;
    background: radial-gradient(ellipse, rgba(120,90,230,0.18) 0%, transparent 68%);
  }

  .ad-noise {
    position: fixed;
    inset: 0;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 1;
  }

  .ad-shell {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 32px 72px;
  }

  .ad-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 40px;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(240,236,226,0.1);
  }

  .ad-brand {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(240,236,226,0.72);
  }

  .ad-topbar-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .ad-hero {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 40px;
    margin-bottom: 32px;
  }

  .ad-hero-main {
    padding: 8px 0;
  }

  .ad-eyebrow {
    display: inline-block;
    margin-bottom: 18px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: #e6b830;
  }

  .ad-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(46px, 6vw, 72px);
    font-weight: 300;
    line-height: 1.03;
    color: #f0ece2;
    margin-bottom: 18px;
  }

  .ad-title em {
    font-style: italic;
    color: #e6b830;
  }

  .ad-subtitle {
    max-width: 560px;
    font-size: 14px;
    line-height: 1.8;
    color: rgba(240,236,226,0.6);
  }

  .ad-session {
    border: 1px solid rgba(240,236,226,0.1);
    border-radius: 8px;
    background: rgba(240,236,226,0.03);
    padding: 28px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
  }

  .ad-session-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(240,236,226,0.4);
  }

  .ad-session-value {
    font-size: 18px;
    font-weight: 500;
    color: #f0ece2;
    word-break: break-word;
  }

  .ad-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    margin-bottom: 28px;
    border: 1px solid rgba(240,236,226,0.08);
    border-radius: 8px;
    overflow: hidden;
    background: rgba(240,236,226,0.08);
  }

  .ad-stat {
    background: rgba(240,236,226,0.025);
    padding: 28px 24px;
  }

  .ad-stat-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(240,236,226,0.38);
    margin-bottom: 12px;
  }

  .ad-stat-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 46px;
    line-height: 1;
    color: #f0ece2;
  }

  .ad-filters {
    border: 1px solid rgba(240,236,226,0.1);
    border-radius: 8px;
    background: rgba(240,236,226,0.03);
    padding: 28px;
    margin-bottom: 28px;
  }

  .ad-section-kicker {
    display: block;
    margin-bottom: 18px;
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: rgba(240,236,226,0.34);
  }

  .ad-filter-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr auto;
    gap: 16px;
    align-items: end;
  }

  .ad-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .ad-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(240,236,226,0.6);
  }

  .ad-input {
    width: 100%;
    height: 48px;
    border: 1px solid rgba(240,236,226,0.18);
    border-radius: 4px;
    background: rgba(240,236,226,0.045);
    color: #f0ece2;
    padding: 0 16px;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }

  .ad-input:focus {
    border-color: rgba(230,184,48,0.7);
    background: rgba(230,184,48,0.08);
    box-shadow: 0 0 0 3px rgba(230,184,48,0.08);
  }

  .ad-input option {
    background: #16162a;
    color: #f0ece2;
  }

  .ad-filter-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .ad-btn-primary,
  .ad-btn-secondary {
    height: 48px;
    border-radius: 4px;
    padding: 0 22px;
    font-family: 'Syne', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .ad-btn-primary {
    border: none;
    background: #e6b830;
    color: #0e0e18;
  }

  .ad-btn-primary:hover:not(:disabled) {
    background: #f0c840;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(230,184,48,0.24);
  }

  .ad-btn-secondary {
    border: 1px solid rgba(240,236,226,0.16);
    background: rgba(240,236,226,0.04);
    color: #f0ece2;
  }

  .ad-btn-secondary:hover:not(:disabled) {
    border-color: rgba(230,184,48,0.35);
    color: #e6b830;
    background: rgba(230,184,48,0.06);
  }

  .ad-btn-primary:disabled,
  .ad-btn-secondary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .ad-error {
    border: 1px solid rgba(224,96,96,0.3);
    border-radius: 8px;
    background: rgba(224,96,96,0.08);
    color: #f1b4b4;
    padding: 16px 18px;
    font-size: 13px;
    line-height: 1.7;
    margin-bottom: 24px;
  }

  .ad-list {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .ad-empty {
    border: 1px dashed rgba(240,236,226,0.14);
    border-radius: 8px;
    background: rgba(240,236,226,0.02);
    padding: 44px 24px;
    text-align: center;
    color: rgba(240,236,226,0.58);
    font-size: 14px;
  }

  .ad-card {
    border: 1px solid rgba(240,236,226,0.1);
    border-radius: 8px;
    background: rgba(240,236,226,0.03);
    overflow: hidden;
  }

  .ad-card-inner {
    padding: 28px;
    display: flex;
    justify-content: space-between;
    gap: 24px;
  }

  .ad-card-main {
    flex: 1;
    min-width: 0;
  }

  .ad-card-top {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 18px;
  }

  .ad-card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 34px;
    font-weight: 300;
    color: #f0ece2;
    line-height: 1.05;
  }

  .ad-status {
    display: inline-flex;
    align-items: center;
    border: 1px solid rgba(240,236,226,0.16);
    border-radius: 100px;
    padding: 7px 12px;
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  .ad-status.pending {
    border-color: rgba(230,184,48,0.3);
    background: rgba(230,184,48,0.08);
    color: #e6b830;
  }

  .ad-status.answered {
    border-color: rgba(104,201,149,0.3);
    background: rgba(104,201,149,0.08);
    color: #8ae0b1;
  }

  .ad-status.approved {
    border-color: rgba(126,197,255,0.3);
    background: rgba(126,197,255,0.08);
    color: #9fd6ff;
  }

  .ad-status.rejected {
    border-color: rgba(224,96,96,0.3);
    background: rgba(224,96,96,0.08);
    color: #f1b4b4;
  }

  .ad-card-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin-bottom: 16px;
  }

  .ad-chip {
    border: 1px solid rgba(240,236,226,0.08);
    border-radius: 4px;
    background: rgba(240,236,226,0.025);
    padding: 12px 14px;
    min-width: 0;
  }

  .ad-chip-label {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(240,236,226,0.34);
    margin-bottom: 6px;
  }

  .ad-chip-value {
    display: block;
    font-size: 13px;
    line-height: 1.55;
    color: rgba(240,236,226,0.82);
    word-break: break-word;
  }

  .ad-card-desc {
    font-size: 14px;
    line-height: 1.8;
    color: rgba(240,236,226,0.58);
    max-width: 760px;
  }

  .ad-card-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 160px;
  }

  .ad-pagination {
    margin-top: 22px;
    border-top: 1px solid rgba(240,236,226,0.08);
    padding-top: 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .ad-pagination-text {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(240,236,226,0.34);
  }

  .ad-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(8,8,16,0.78);
    backdrop-filter: blur(6px);
    z-index: 60;
  }

  .ad-modal-wrap {
    position: fixed;
    inset: 0;
    z-index: 61;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .ad-modal-panel {
    position: relative;
    width: 100%;
    max-width: 980px;
    max-height: 90vh;
    overflow: hidden;
    border: 1px solid rgba(240,236,226,0.1);
    border-radius: 8px;
    background: #12121f;
    box-shadow: 0 24px 80px rgba(0,0,0,0.35);
  }

  .ad-modal-head {
    padding: 24px 28px;
    border-bottom: 1px solid rgba(240,236,226,0.08);
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }

  .ad-modal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    font-weight: 300;
    color: #f0ece2;
    line-height: 1.05;
    margin-bottom: 6px;
  }

  .ad-modal-desc {
    font-size: 13px;
    line-height: 1.7;
    color: rgba(240,236,226,0.54);
    max-width: 680px;
  }

  .ad-modal-close {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid rgba(240,236,226,0.12);
    background: rgba(240,236,226,0.03);
    color: rgba(240,236,226,0.75);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
  }

  .ad-modal-close:hover {
    color: #e6b830;
    border-color: rgba(230,184,48,0.35);
    background: rgba(230,184,48,0.06);
  }

  .ad-modal-body {
    max-height: calc(90vh - 100px);
    overflow-y: auto;
    padding: 28px;
  }

  .ad-detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .ad-detail-box {
    border: 1px solid rgba(240,236,226,0.08);
    border-radius: 6px;
    background: rgba(240,236,226,0.025);
    padding: 18px 20px;
  }

  .ad-detail-box.full {
    grid-column: 1 / -1;
  }

  .ad-detail-label {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(240,236,226,0.34);
    margin-bottom: 8px;
  }

  .ad-detail-value {
    font-size: 15px;
    line-height: 1.7;
    color: rgba(240,236,226,0.86);
    word-break: break-word;
  }

  .ad-history {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .ad-history-item {
    border: 1px solid rgba(240,236,226,0.08);
    border-radius: 6px;
    background: rgba(240,236,226,0.025);
    padding: 16px 18px;
  }

  .ad-history-top {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 8px;
  }

  .ad-history-author {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #e6b830;
  }

  .ad-history-date {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(240,236,226,0.34);
  }

  .ad-history-text {
    font-size: 14px;
    line-height: 1.75;
    color: rgba(240,236,226,0.78);
    white-space: pre-wrap;
  }

  .ad-textarea {
    width: 100%;
    min-height: 180px;
    border: 1px solid rgba(240,236,226,0.18);
    border-radius: 4px;
    background: rgba(240,236,226,0.045);
    color: #f0ece2;
    padding: 14px 16px;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    line-height: 1.7;
    outline: none;
    resize: vertical;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }

  .ad-textarea:focus {
    border-color: rgba(230,184,48,0.7);
    background: rgba(230,184,48,0.08);
    box-shadow: 0 0 0 3px rgba(230,184,48,0.08);
  }

  .ad-modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    flex-wrap: wrap;
  }

  .ad-footer {
    margin-top: 24px;
    text-align: center;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(240,236,226,0.28);
  }

  .ad-footer a {
    color: #e6b830;
    text-decoration: none;
  }

  @media (max-width: 960px) {
    .ad-hero,
    .ad-filter-grid,
    .ad-detail-grid {
      grid-template-columns: 1fr;
    }

    .ad-card-inner {
      flex-direction: column;
    }

    .ad-card-grid {
      grid-template-columns: 1fr 1fr;
    }

    .ad-card-actions {
      min-width: 0;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }

  @media (max-width: 720px) {
    .ad-shell {
      padding: 28px 20px 56px;
    }

    .ad-topbar,
    .ad-pagination {
      flex-direction: column;
      align-items: stretch;
    }

    .ad-stats {
      grid-template-columns: 1fr;
    }

    .ad-card-grid {
      grid-template-columns: 1fr;
    }

    .ad-modal-head,
    .ad-modal-body,
    .ad-filters,
    .ad-session,
    .ad-card-inner {
      padding: 22px;
    }
  }
`;
