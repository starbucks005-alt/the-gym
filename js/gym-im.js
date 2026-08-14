// gym-im.js — The Gym IM panel. Mirrors The Dose's IM template.
//
// Usage: give any button data-im="<key>" and this wires it up. Nothing else needed.
//   <button class="cast-im-btn" data-im="coach">IM Dom</button>
//
// Keys match js/data/personal-notes.js so profiles, notes and chat all line up.

import { PERSONAL_NOTES } from './data/personal-notes.js';

export const CAST = {
  coach: {
    name: 'Coach Dom Castellanos', short: 'Dom', role: 'the Strength Coach',
    chat: 'trainer', voice: 'trainer', color: '#e0552e',
    img: '/assets/Coach_Dom_Eyes_open.png', page: '/workout-library.html',
    lane: 'programming, lifting, and why you do not need a new program',
  },
  therapist: {
    name: 'Dr. Lena Brandt, DPT', short: 'Dr. Lena', role: 'the Physical Therapist',
    chat: 'therapist', voice: 'therapist', color: '#3a7fa0',
    img: '/assets/Dr_Lena_eyes_open.png', page: '/body-map.html',
    lane: 'training around an injury, and when to stop and see someone',
  },
  breathwork: {
    name: 'Noor Haddad', short: 'Noor', role: 'Yoga & Breathwork',
    chat: 'noor', voice: 'noor', color: '#7a6a4a',
    img: '/assets/Noor_eyes_open.png', page: '/breath-room.html',
    lane: 'breath, yoga, and down-regulating a nervous system',
  },
  recovery: {
    name: 'Dr. Sana Qureshi', short: 'Dr. Sana', role: 'Sleep & Recovery',
    chat: 'recovery', voice: 'recovery', color: '#2f8f7f',
    img: '/assets/Sana_eyes_open.png', page: '/sleep-lab.html',
    lane: 'sleep, HRV, deloads, and the gains that happen while you rest',
  },
  bench: {
    name: 'Reece Ashford', short: 'Reece', role: 'the PT Intern',
    chat: 'movement', voice: 'movement', color: '#4a6a80',
    img: '/assets/Reece_eyes_open.png', page: '/dehydrator.html',
    lane: 'viral form-checks, the drying bench, and whether that reel is real',
  },
  scout: {
    name: 'Jax Rivera', short: 'Jax', role: 'the Trend Scout',
    chat: 'scout', voice: 'scout', color: '#3a5aaa',
    img: '/assets/Jax_eyes_open.png', page: null,
    lane: 'what is spiking in search right now, before it is a trend',
  },
  social: {
    name: 'Zara Cole', short: 'Zara', role: 'the Smoothie Bar',
    chat: 'social', voice: 'zara', color: '#2e7a3a',
    img: '/assets/Zara_eyes_open.png', page: '/smoothie-bar.html',
    lane: 'smoothies, what is actually in the cup, and the socials',
  },
  fuel: {
    name: 'Nadia Hassan', short: 'Nadia', role: 'Sports Nutrition',
    chat: 'nutritionist', voice: 'nutritionist', color: '#2e7a50',
    img: '/assets/Nadia_eyes_open.png', page: null,
    lane: 'protein, fueling, and every supplement label checked',
  },
  zero_proof: {
    name: 'Wyatt E. Cooper', short: 'Wyatt', role: 'the Mixologist',
    chat: 'wyatt', voice: 'wyatt', color: '#8a5a1a',
    img: '/assets/Wyatt_eyes_open.png', page: '/elixir-bar.html',
    lane: 'zero-proof drinks, and what is really in the bottle',
  },
  stoplight: {
    name: 'Eli Adler', short: 'Eli', role: 'the Fact-Checker',
    chat: 'factchecker', voice: 'factchecker', color: '#3a4a5a',
    img: '/assets/Eli_eyes_open.png', page: null,
    lane: 'running a claim through the Stoplight, with the source',
  },
};

const DISCLAIMER = 'The Gym is not medical advice. Educational only. Talk to your healthcare provider for personal medical decisions.';

/* ---------------- styles ---------------- */
const CSS = `
.gim-back{position:fixed;inset:0;background:rgba(16,22,28,.55);z-index:9998;display:flex;
  align-items:center;justify-content:center;padding:1rem;opacity:0;transition:opacity .15s;}
.gim-back.in{opacity:1;}
.gim{background:#fff;border-radius:14px;width:100%;max-width:540px;max-height:88vh;display:flex;
  flex-direction:column;overflow:hidden;box-shadow:0 18px 50px rgba(10,16,22,.35);
  font-family:'Inter',system-ui,sans-serif;transform:translateY(8px);transition:transform .15s;}
.gim-back.in .gim{transform:translateY(0);}
.gim-hd{display:flex;align-items:center;gap:.8rem;padding:1rem 1.1rem;border-bottom:1px solid #e6ecef;}
.gim-av{width:52px;height:52px;border-radius:50%;object-fit:cover;flex-shrink:0;background:#dfe6ea;}
.gim-nm{font-family:'Fraunces',Georgia,serif;font-weight:700;font-size:1.15rem;line-height:1.2;}
.gim-role{font-size:.88rem;color:#6b7a86;}
.gim-x{margin-left:auto;background:none;border:none;font-size:1.5rem;line-height:1;color:#8b98a2;
  cursor:pointer;padding:.2rem .4rem;border-radius:6px;}
.gim-x:hover{background:#f0f4f6;color:#16212b;}
.gim-scroll{overflow-y:auto;padding:1rem 1.1rem;background:#fbfcfd;flex:1;min-height:120px;}
.gim-intro{font-style:italic;color:#5a6a78;background:#fff;border:1px solid #e6ecef;border-radius:9px;
  padding:.85rem 1rem;font-size:.95rem;text-align:center;}
.gim-note{margin-top:.7rem;background:#fff;border:1px solid #e6ecef;border-left:3px solid var(--gim-c,#3a4a5a);
  border-radius:8px;padding:.75rem .9rem;font-size:.9rem;color:#3d4d59;}
.gim-note .h{font-family:'Lora',Georgia,serif;font-size:.68rem;text-transform:uppercase;letter-spacing:.1em;
  color:var(--gim-c,#3a4a5a);margin-bottom:.3rem;font-weight:600;}
.gim-note .d{font-size:.74rem;color:#93a0aa;margin-top:.4rem;}
.gim-msg{margin:.6rem 0;display:flex;}
.gim-msg .b{max-width:82%;padding:.6rem .85rem;border-radius:12px;font-size:.94rem;line-height:1.5;
  white-space:pre-wrap;word-wrap:break-word;}
.gim-msg.me{justify-content:flex-end;}
.gim-msg.me .b{background:var(--gim-c,#3a4a5a);color:#fff;border-bottom-right-radius:3px;}
.gim-msg.them .b{background:#fff;border:1px solid #e6ecef;color:#16212b;border-bottom-left-radius:3px;}
.gim-msg.sys .b{background:#fdf3f5;border:1px solid #f1c9d3;color:#8d2b42;font-size:.88rem;max-width:100%;}
.gim-typing .b{color:#93a0aa;font-style:italic;}
.gim-table{display:flex;align-items:center;gap:.7rem;flex-wrap:wrap;padding:.75rem 1.1rem;
  border-top:1px solid #e6ecef;background:#f7fafb;}
.gim-tbtn{font-family:'Inter';font-size:.9rem;font-weight:700;padding:.5rem .95rem;border-radius:8px;
  background:#fff;border:1.5px solid var(--gim-c,#3a4a5a);color:var(--gim-c,#3a4a5a);cursor:pointer;}
.gim-tbtn:hover{background:#fff8f0;}
.gim-thint{font-size:.85rem;color:#6b7a86;}
.gim-picker{padding:.2rem 1.1rem .8rem;background:#f7fafb;display:none;flex-wrap:wrap;gap:.35rem;}
.gim-picker.open{display:flex;}
.gim-pick{font-size:.82rem;font-weight:600;padding:.32rem .7rem;border-radius:999px;background:#fff;
  border:1.5px solid #dbe3e8;color:#4a5a66;cursor:pointer;}
.gim-pick.on{background:var(--gim-c,#3a4a5a);border-color:var(--gim-c,#3a4a5a);color:#fff;}
.gim-form{display:flex;gap:.6rem;padding:.85rem 1.1rem;border-top:1px solid #e6ecef;background:#fff;}
.gim-in{flex:1;padding:.7rem .8rem;font-family:'Inter';font-size:.98rem;border:1px solid #d4dde2;
  border-radius:8px;color:#16212b;background:#fff;}
.gim-in:focus{outline:2px solid var(--gim-c,#3a4a5a);outline-offset:1px;}
.gim-send{background:var(--gim-c,#3a4a5a);color:#fff;border:none;border-radius:8px;padding:.7rem 1.3rem;
  font-family:'Inter';font-weight:700;font-size:.98rem;cursor:pointer;}
.gim-send:disabled{opacity:.5;cursor:default;}
.gim-ft{padding:.7rem 1.1rem .9rem;text-align:center;font-size:.78rem;color:#93a0aa;line-height:1.45;background:#fff;}
.gim-ft a{color:#6b7a86;}
@media(max-width:520px){.gim{max-height:94vh;} .gim-thint{display:none;}}
`;

/* ---------------- state ---------------- */
let back = null, els = {}, active = null, history = [], table = [], busy = false, audio = null;

function injectCSS() {
  if (document.getElementById('gim-css')) return;
  const s = document.createElement('style');
  s.id = 'gim-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

function newestNote(key) {
  const list = PERSONAL_NOTES && PERSONAL_NOTES[key];
  if (!Array.isArray(list) || !list.length) return null;
  // Notes are stored newest first. Rotate by day so the panel is not static.
  const idx = Math.floor(Date.now() / 86400000) % list.length;
  return list[idx] || list[0];
}

function build() {
  injectCSS();
  back = document.createElement('div');
  back.className = 'gim-back';
  back.innerHTML = `
    <div class="gim" role="dialog" aria-modal="true" aria-labelledby="gim-nm">
      <div class="gim-hd">
        <img class="gim-av" id="gim-av" alt="">
        <div>
          <div class="gim-nm" id="gim-nm"></div>
          <div class="gim-role" id="gim-role"></div>
        </div>
        <button class="gim-x" id="gim-x" aria-label="Close">&times;</button>
      </div>
      <div class="gim-scroll" id="gim-scroll"></div>
      <div class="gim-table">
        <button class="gim-tbtn" id="gim-tbtn">Bring this to the table &rarr;</button>
        <span class="gim-thint" id="gim-thint"></span>
      </div>
      <div class="gim-picker" id="gim-picker"></div>
      <form class="gim-form" id="gim-form">
        <input class="gim-in" id="gim-in" placeholder="Type a message..." autocomplete="off">
        <button class="gim-send" id="gim-send" type="submit">Send</button>
      </form>
      <div class="gim-ft">${DISCLAIMER}</div>
    </div>`;
  document.body.appendChild(back);

  ['av','nm','role','x','scroll','tbtn','thint','picker','form','in','send'].forEach(k => {
    els[k] = back.querySelector('#gim-' + k);
  });

  els.x.addEventListener('click', close);
  back.addEventListener('mousedown', e => { if (e.target === back) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && back.classList.contains('in')) close(); });
  els.tbtn.addEventListener('click', () => els.picker.classList.toggle('open'));
  els.form.addEventListener('submit', onSend);
}

function bubble(cls, text) {
  const d = document.createElement('div');
  d.className = 'gim-msg ' + cls;
  const b = document.createElement('div');
  b.className = 'b';
  b.textContent = text;
  d.appendChild(b);
  els.scroll.appendChild(d);
  els.scroll.scrollTop = els.scroll.scrollHeight;
  return d;
}

export function open(key) {
  const c = CAST[key];
  if (!c) return;
  if (!back) build();
  active = key; history = []; table = []; busy = false;

  back.style.setProperty('--gim-c', c.color);
  els.av.src = c.img; els.av.alt = c.name;
  els.nm.textContent = c.short; els.nm.style.color = c.color;
  els.role.textContent = c.role;
  els.thint.textContent = `Ask ${c.short} and up to three colleagues at once`;
  els.in.placeholder = 'Type a message...';
  els.send.disabled = false;
  els.picker.classList.remove('open');

  // colleague picker
  els.picker.innerHTML = Object.keys(CAST).filter(k => k !== key)
    .map(k => `<button type="button" class="gim-pick" data-k="${k}">${CAST[k].short}</button>`).join('');
  els.picker.querySelectorAll('.gim-pick').forEach(b => b.addEventListener('click', () => {
    const k = b.dataset.k, i = table.indexOf(k);
    if (i > -1) table.splice(i, 1);
    else { if (table.length >= 3) return; table.push(k); }
    b.classList.toggle('on', table.indexOf(k) > -1);
  }));

  // opening state: intro line, then the rotating personal note
  els.scroll.innerHTML = '';
  const intro = document.createElement('div');
  intro.className = 'gim-intro';
  intro.textContent = `You're messaging ${c.short}. Say hi, or ask a question in ${c.short}'s lane.`;
  els.scroll.appendChild(intro);

  const note = newestNote(key);
  if (note) {
    const n = document.createElement('div');
    n.className = 'gim-note';
    n.innerHTML = `<div class="h">From ${c.short}'s notes</div>`;
    const p = document.createElement('div'); p.textContent = note.body; n.appendChild(p);
    if (note.date) { const d = document.createElement('div'); d.className = 'd'; d.textContent = note.date; n.appendChild(d); }
    els.scroll.appendChild(n);
  }

  if (c.page) {
    const l = document.createElement('div');
    l.className = 'gim-intro';
    l.style.marginTop = '.7rem';
    l.innerHTML = `<a href="${c.page}" style="color:${c.color};font-weight:600;">Visit ${c.short}'s page &rarr;</a>`;
    els.scroll.appendChild(l);
  }

  back.classList.add('in');
  document.body.style.overflow = 'hidden';
  setTimeout(() => els.in.focus(), 60);
}

export function close() {
  if (!back) return;
  back.classList.remove('in');
  document.body.style.overflow = '';
  if (audio) { audio.pause(); audio = null; }
}

async function onSend(e) {
  e.preventDefault();
  const text = els.in.value.trim();
  if (!text || busy) return;
  const c = CAST[active];

  els.in.value = '';
  bubble('me', text);
  history.push({ role: 'user', content: text });

  busy = true; els.send.disabled = true;
  const typing = bubble('them gim-typing', c.short + ' is typing...');

  let data = null, status = 0;
  try {
    const r = await fetch('/.netlify/functions/gym-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ characterId: c.chat, messages: history, table: table.map(k => CAST[k].chat) }),
    });
    status = r.status;
    data = await r.json().catch(() => null);
  } catch (_) { /* offline or blocked */ }

  typing.remove();

  if (data && data.reply) {
    bubble('them', data.reply);
    history.push({ role: 'assistant', content: data.reply });
    if (c.voice) speak(data.reply, c.voice);
  } else if (status === 503) {
    bubble('sys', `Messaging is not switched on yet. ${c.short} is here, the connection is not. ` +
      (c.page ? `Their page has the same material in the meantime.` : `Their page is still being built.`));
    els.send.disabled = true;
  } else {
    bubble('sys', `That message did not get through. Try again in a moment.`);
  }

  busy = false;
  if (status !== 503) els.send.disabled = false;
  els.scroll.scrollTop = els.scroll.scrollHeight;
}

async function speak(text, voice) {
  try {
    if (audio) { audio.pause(); audio = null; }
    const r = await fetch('/.netlify/functions/gym-tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ characterId: voice, text: text.slice(0, 2400) }),
    });
    if (!r.ok) return;
    const url = URL.createObjectURL(await r.blob());
    audio = new Audio(url);
    audio.onended = () => { URL.revokeObjectURL(url); audio = null; };
    audio.play().catch(() => {});
  } catch (_) { /* voice is a bonus, never a blocker */ }
}

/* ---------------- auto-wire ---------------- */
export function wire(root) {
  (root || document).querySelectorAll('[data-im]').forEach(b => {
    if (b.dataset.gimWired) return;
    b.dataset.gimWired = '1';
    b.addEventListener('click', ev => { ev.preventDefault(); open(b.dataset.im); });
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => wire());
else wire();

window.GymIM = { open, close, wire, CAST };
