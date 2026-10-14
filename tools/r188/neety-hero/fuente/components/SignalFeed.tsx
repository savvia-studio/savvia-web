"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Buildings,
  Users,
  ThermometerHot,
  FireSimple,
  ArrowBendUpLeft,
  CalendarCheck,
} from "@phosphor-icons/react";
import { copy } from "@/lib/i18n";
import { useLang } from "@/lib/i18n-client";

/* ---- data (from Figma node 14340:3494) ----------------------------------- */

/* Empresas del feed: CLIENTES REALES de Neety con marca de símbolo
   (recursos.neety.com/agendar, 3-sept); los chips salen de bento-logos/. */
const COMPANIES = [
  { name: "Betsaide", score: 94, logo: "/assets/bento-logos/betsaide.avif", flip: false },
  { name: "Arania", score: 91, logo: "/assets/bento-logos/arania.avif", flip: false },
  { name: "Fagor Automation", score: 88, logo: "/assets/bento-logos/fagor-automation.avif", flip: false },
];

const PEOPLE = [
  { name: "Iker Goikoetxea", score: 94, photo: "/assets/anim/jon-96.jpg", jon: true },
  { name: "Ane Larrañaga", score: 91, photo: "/assets/anim/nerea-96.jpg", jon: false },
  { name: "Naroa Iturbe", score: 88, photo: "/assets/anim/ines-96.jpg", jon: false },
];

/* Copy por idioma de la animación (nombres de persona/empresa se mantienen; `roles` va
   en el orden de PEOPLE). El mensaje también se traduce: lo teclea el timeline letra a
   letra, así que la duración de la card 5 depende del idioma (se calcula al vuelo). */
const COPY = copy({
  es: {
    roles: ["Director de compras · Betsaide", "Directora de operaciones · Arania", "Directora de planta · Fagor Automation"],
    actions: ["Ha visitado tu perfil", "Ha aceptado tu solicitud", "Has reaccionado a su post"],
    message:
      "Hola Iker, he visto que Betsaide está reforzando compras. Creo que podemos ayudaros a priorizar mejor oportunidades. ¿Lo vemos esta semana?",
    companiesTitle: "Neety encontró empresas que encajan",
    peopleTitle: "3 personas clave encontradas",
    warmingTitle: "Iker empieza a activarse",
    warm: "Templado",
    signalTitle: "Señal: Betsaide cerró una ronda de financiación",
    signalSub: "Es el momento perfecto para escribir",
    hot: "Hot",
    messageTitle: "Neety te preparó el mensaje",
    send: "Aprobar y enviar",
    sent: "Enviado ✓",
    replyTitle: "Iker respondió: “Me interesa, hablemos”",
    replySub: "Neety prepara el cierre por ti",
    meetingTitle: "Reunión agendada",
    meetingDate: "18 Jun",
    meetingSub: "Iker Goikoetxea · Betsaide · 12:00",
  },
  en: {
    roles: ["Purchasing Director · Betsaide", "Operations Director · Arania", "Plant Director · Fagor Automation"],
    actions: ["Viewed your profile", "Accepted your request", "You reacted to their post"],
    message:
      "Hi Iker, I saw Betsaide is strengthening its purchasing team. I think we can help you prioritize opportunities better. Could we talk this week?",
    companiesTitle: "Neety found companies that fit",
    peopleTitle: "3 key people found",
    warmingTitle: "Iker is starting to warm up",
    warm: "Warm",
    signalTitle: "Signal: Betsaide closed a funding round",
    signalSub: "It's the perfect moment to reach out",
    hot: "Hot",
    messageTitle: "Neety prepared the message for you",
    send: "Approve and send",
    sent: "Sent ✓",
    replyTitle: "Iker replied: “I'm interested, let's talk”",
    replySub: "Neety prepares the close for you",
    meetingTitle: "Meeting scheduled",
    meetingDate: "Jun 18",
    meetingSub: "Iker Goikoetxea · Betsaide · 12:00",
  },
});

type Copy = (typeof COPY)["es"];

/* ---- shared styles ------------------------------------------------------- */

const FROST = "sf-card flex w-full flex-col items-center rounded-[12px] bg-[rgba(67,27,68,0.1)] p-1 will-change-[transform,opacity] lg:backdrop-blur-[20px] lg:will-change-[transform,opacity,filter]";
const CARD = "flex w-full flex-col rounded-[10px] bg-white font-sans";
const ROW = "sf-in flex items-center gap-3 border-b border-[rgba(67,27,68,0.05)] pb-3";
const HEAD = "sf-head flex items-center gap-3 border-b border-[rgba(67,27,68,0.05)] pb-3";
const TITLE_LG = "flex-1 font-display text-[16px] font-medium leading-[21px] text-[#431b44]";
const TITLE_MD = "font-display text-[14px] font-medium leading-[16px] text-[#431b44]";
const SUB = "sf-in pl-11 font-sans text-[12px] leading-[18px] tracking-[0.25px] text-[rgba(67,27,68,0.6)]";
const NAME = "font-sans text-[12px] font-medium leading-[18px] text-[#431b44]";
const ROLE = "font-sans text-[10px] leading-[1.2] text-[rgba(67,27,68,0.4)]";
const SCORE = "flex w-10 shrink-0 flex-col items-center rounded-[12px] bg-[rgba(11,183,131,0.15)] px-2 py-0.5";
const SCORE_TXT = "w-full text-center font-sans text-[12px] font-medium leading-[18px] text-[#431b44]";
const CHIP_GRIS = "flex shrink-0 items-center justify-center bg-[#f5f7f9]";
const CHIP_BLUE = "flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-[rgba(167,197,249,0.2)]";
const PILL = "flex shrink-0 items-center gap-1 rounded-[32px] px-2 py-1";

/* skeleton primitives */
const SKB = "shrink-0 animate-pulse rounded-full bg-[rgba(67,27,68,0.055)]"; // bar
const SKS = "shrink-0 animate-pulse bg-[rgba(67,27,68,0.07)]"; // solid chip
const SKROW = "flex items-center gap-3 border-b border-[rgba(67,27,68,0.04)] pb-3";

/** Loading skeleton whose shape MATCHES each card's real content (fades out as the card activates). */
function Skeleton({ variant, pad, gap }: { variant: string; pad: string; gap: string }) {
  const headChip = variant === "señal" ? "rounded-[4px]" : "rounded-[8px]";
  const bordered = variant === "empresas" || variant === "personas" || variant === "activarse";
  const head = (
    <div className={`flex items-center gap-3${bordered ? " border-b border-[rgba(67,27,68,0.04)] pb-3" : ""}`}>
      <div className={`${SKS} ${variant === "mensaje" ? "size-6 rounded-[4px]" : `size-8 ${headChip}`}`} />
      <div className={`${SKB} h-3.5 flex-1 max-w-[58%]`} />
    </div>
  );
  let body: React.ReactNode = null;
  if (variant === "empresas") {
    body = [0, 1, 2].map((i) => (
      <div key={i} className={SKROW}>
        <div className={`${SKS} size-6 rounded-[4px]`} />
        <div className={`${SKB} h-3 w-[24%]`} />
        <div className={`${SKS} ml-auto h-[22px] w-10 rounded-[12px]`} />
      </div>
    ));
  } else if (variant === "personas") {
    body = [0, 1, 2].map((i) => (
      <div key={i} className={SKROW}>
        <div className={`${SKS} size-8 rounded-[4px]`} />
        <div className="flex flex-1 flex-col gap-1.5">
          <div className={`${SKB} h-2.5 w-[38%]`} />
          <div className={`${SKB} h-2 w-[62%]`} />
        </div>
        <div className={`${SKS} h-[22px] w-10 rounded-[12px]`} />
      </div>
    ));
  } else if (variant === "activarse") {
    body = (
      <div className="flex flex-col gap-5 pt-0.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <div className={`${SKS} size-1.5 rounded-full`} />
            <div className={`${SKB} h-2.5`} style={{ width: `${48 - i * 6}%` }} />
          </div>
        ))}
      </div>
    );
  } else if (variant === "mensaje") {
    body = (
      <>
        <div className="rounded-[8px] bg-[rgba(67,27,68,0.03)] p-3">
          <div className={`${SKB} h-2 w-[88%]`} />
          <div className={`${SKB} mt-2 h-2 w-[62%]`} />
        </div>
        <div className="h-8 w-full shrink-0 animate-pulse rounded-[32px] bg-[rgba(67,27,68,0.05)]" />
      </>
    );
  } else {
    // señal / respuesta / reunión: a single sub-line under the header
    body = <div className={`${SKB} ml-11 h-2.5 w-[55%]`} />;
  }
  return (
    <div className={`sf-skel pointer-events-none absolute inset-0 flex flex-col overflow-hidden rounded-[10px] ${pad} ${gap}`}>
      {head}
      {body}
    </div>
  );
}

function CardShell({ gap, pad = "p-4", variant, children }: { gap: string; relative?: boolean; pad?: string; variant: string; children: React.ReactNode }) {
  return (
    <div className={FROST}>
      <div className={`${CARD} ${pad} ${gap} relative`}>
        <Skeleton variant={variant} pad={pad} gap={gap} />
        {children}
      </div>
    </div>
  );
}

function CardSet({ t }: { t: Copy }) {
  return (
    <>
      {/* 1 — empresas */}
      <CardShell gap="gap-3" variant="empresas">
        <div className={HEAD}>
          <span className={`${CHIP_GRIS} size-8 rounded-[8px]`}><Buildings size={16} weight="duotone" color="#431b44" /></span>
          <p className={TITLE_LG}>{t.companiesTitle}</p>
        </div>
        {COMPANIES.map((c) => (
          <div key={c.name} className={ROW}>
            <span className={`${CHIP_GRIS} size-6 rounded-[4px]`}>
              <img src={c.logo} alt="" className={`h-3 w-3 object-contain${c.flip ? " [transform:scaleY(-1)]" : ""}`} />
            </span>
            <p className={`flex-1 ${NAME}`}>{c.name}</p>
            <span className={SCORE}><span className={SCORE_TXT}>{c.score}%</span></span>
          </div>
        ))}
      </CardShell>

      {/* 2 — personas */}
      <CardShell gap="gap-3" variant="personas">
        <div className={HEAD}>
          <span className={`${CHIP_GRIS} size-8 rounded-[8px]`}><Users size={16} weight="duotone" color="#431b44" /></span>
          <p className={TITLE_LG}>{t.peopleTitle}</p>
        </div>
        {PEOPLE.map((p, i) => (
          <div key={p.name} className={`relative ${ROW}`}>
            {p.jon && <span className="sf-jonhl absolute -inset-x-2 top-[-7px] bottom-[5px] -z-0 rounded-[8px] bg-[rgba(167,197,249,0.2)]" />}
            <img src={p.photo} alt={p.name} className="relative size-8 shrink-0 rounded-[4px] object-cover" />
            <div className="relative flex flex-1 flex-col justify-center">
              <p className={NAME}>{p.name}</p>
              <p className={ROLE}>{t.roles[i]}</p>
            </div>
            <span className={`relative ${SCORE}`}><span className={SCORE_TXT}>{p.score}%</span></span>
          </div>
        ))}
      </CardShell>

      {/* 3 — activarse */}
      <CardShell gap="gap-3" variant="activarse">
        <div className={HEAD}>
          <img src="/assets/anim/jon-96.jpg" alt="Iker Goikoetxea" className="size-8 shrink-0 rounded-[8px] object-cover" />
          <p className={TITLE_LG}>{t.warmingTitle}</p>
          <span className={`sf-pop ${PILL} bg-[#fff9e5]`}>
            <ThermometerHot size={12} weight="duotone" color="#988c62" />
            <span className="font-display text-[12px] font-medium leading-[18px] text-[#988c62]">{t.warm}</span>
          </span>
        </div>
        <div className="relative flex flex-col gap-5">
          <span className="sf-line absolute left-[3px] top-[7px] bottom-[7px] w-px origin-top bg-[rgba(67,27,68,0.12)]" />
          {t.actions.map((a) => (
            <div key={a} className="sf-act relative flex h-3.5 items-center gap-4">
              <span className="sf-dot size-[7px] shrink-0 rounded-full bg-[#431b44]" />
              <span className="font-sans text-[12px] leading-none tracking-[0.25px] text-[rgba(67,27,68,0.6)]">{a}</span>
            </div>
          ))}
        </div>
      </CardShell>

      {/* 4 — señal */}
      <CardShell gap="gap-3" relative variant="señal">
        <div className="sf-head flex items-center gap-3">
          <span className={`${CHIP_GRIS} size-8 rounded-[4px]`}>
            <img src="/assets/bento-logos/betsaide.avif" alt="" className="h-4 w-4 rounded-[3px] object-contain" />
          </span>
          <p className={`max-w-[210px] ${TITLE_MD}`}>{t.signalTitle}</p>
        </div>
        <p className={SUB}>{t.signalSub}</p>
        <span className={`sf-pop ${PILL} absolute right-3 top-[19px] bg-[rgba(190,30,30,0.1)]`}>
          <FireSimple size={12} weight="duotone" color="#b25959" />
          <span className="font-display text-[12px] font-medium leading-[18px] text-[#b25959]">{t.hot}</span>
        </span>
      </CardShell>

      {/* 5 — mensaje */}
      <CardShell gap="gap-3" variant="mensaje">
        <div className="sf-head flex items-center gap-3">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-[4px] bg-[#431b44] p-1.5">
            <img src="/assets/anim/neety-isotipo.svg" alt="" className="size-3 object-contain [filter:brightness(0)_invert(1)]" />
          </span>
          <p className="flex-1 font-display text-[14px] font-medium leading-[16px] text-[#431b44]">{t.messageTitle}</p>
        </div>
        <div className="sf-in rounded-[8px] bg-[rgba(67,27,68,0.05)] p-3">
          <p className="font-sans text-[12px] leading-[1.5] tracking-[0.25px] text-[rgba(67,27,68,0.6)]">
            <span className="sf-typed">{t.message}</span>
            <span className="sf-caret ml-px inline-block h-3 w-px translate-y-px bg-[rgba(67,27,68,0.6)] align-middle opacity-0" />
          </p>
        </div>
        <div className="sf-in">
          <div className="sf-btn relative flex w-full items-center justify-center rounded-[32px] bg-[#431b44] px-6 py-2">
            <span className="sf-btn-default font-display text-[12px] font-medium leading-[1.2] text-white">{t.send}</span>
            <span className="sf-btn-sent absolute inset-0 flex items-center justify-center gap-1 font-display text-[12px] font-medium leading-[1.2] text-[#0a935c] opacity-0">{t.sent}</span>
          </div>
        </div>
      </CardShell>

      {/* 6 — respuesta */}
      <CardShell gap="gap-1.5" variant="respuesta">
        <div className="sf-head flex items-center gap-3">
          <span className={CHIP_BLUE}><ArrowBendUpLeft size={16} weight="duotone" color="#431b44" /></span>
          <p className={`max-w-[309px] ${TITLE_MD}`}>{t.replyTitle}</p>
        </div>
        <p className={SUB}>{t.replySub}</p>
      </CardShell>

      {/* 7 — reunión */}
      <CardShell gap="gap-1.5" pad="px-4 pt-3 pb-[18px]" variant="reunión">
        <div className="sf-head flex items-center gap-3">
          <span className={CHIP_BLUE}><CalendarCheck size={16} weight="duotone" color="#431b44" /></span>
          <p className={`flex-1 ${TITLE_MD}`}>{t.meetingTitle}</p>
          <span className="sf-pop flex h-[16px] shrink-0 items-center rounded-[6px] bg-[rgba(67,27,68,0.05)] px-1.5">
            <span className="font-mono text-[8px] font-medium uppercase leading-none tracking-[0.4px] text-[rgba(67,27,68,0.4)]">{t.meetingDate}</span>
          </span>
        </div>
        <p className={SUB}>{t.meetingSub}</p>
      </CardShell>
    </>
  );
}

/* ---- component ----------------------------------------------------------- */

/* the feed is authored at a fixed 408px design width; everything else scales from it */
const DESIGN_W = 408;

export default function SignalFeed() {
  const lang = useLang();
  const tx = COPY[lang]; // `t` es el cursor de tiempo del timeline más abajo
  const box = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const feed = useRef<HTMLDivElement>(null);

  // Make the illustration responsive *as a unit*: render it at its 408px design width and
  // uniformly scale it to whatever width the parent gives it — so it shrinks proportionally
  // (fonts, spacing, everything) instead of reflowing/wrapping. GSAP still measures in the
  // unscaled design space, so the animation is unaffected.
  useEffect(() => {
    const b = box.current, s = stage.current;
    if (!b || !s) return;
    // Scale to fill width, and translate so the animation's "active zone" (0.4·stageH, where
    // GSAP parks the focused card) lands at TARGET·window height. Desktop (lg): 0.28 — a bit
    // above centre, lifting the feed up a touch. Mobile/tablet: the box is cropped to little
    // more than the tallest card (256px design), so the focused card must sit centred in the
    // mask's solid zone (10%–82%) → TARGET = (0.10+0.82)/2 = 0.46; anything else clips the
    // tall "personas" card against a fade edge.
    const fit = () => {
      const TARGET = window.matchMedia("(min-width: 64rem)").matches ? 0.28 : 0.46;
      const sc = b.clientWidth / DESIGN_W;
      const activeY = DESIGN_W * (760 / 408) * 0.4 * sc; // = 304·sc, the active zone in CSS px
      const ty = TARGET * b.clientHeight - activeY;
      s.style.transform = `translateY(${ty.toFixed(1)}px) scale(${sc})`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(b);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".sf-card", stage.current);
      if (cards.length < 7 || !feed.current || !stage.current) return;
      const spacing = cards[1].offsetTop;
      const stageH = () => stage.current?.clientHeight ?? 0;
      const activeAt = () => stageH() * 0.4; // active zone in the upper-centre
      const centerY = (i: number) => activeAt() - (cards[i].offsetTop + cards[i].offsetHeight / 2);
      const cl = (x: number) => Math.min(Math.max(x, 0), 1);
      // El blur dinámico por distancia re-rasteriza cada tarjeta en cada frame; en iOS eso
      // tira el movimiento a ~30fps ("cámara lenta"). Solo lo aplicamos en desktop (lg); en
      // móvil la profundidad la dan opacidad + escala (compositadas, gratis) y la máscara.
      const lgMQ = window.matchMedia("(min-width: 64rem)");

      const rd = cards.map((el) => ({
        el,
        skel: el.querySelector<HTMLElement>(".sf-skel"),
        heads: Array.from(el.querySelectorAll<HTMLElement>(".sf-head")),
        ins: Array.from(el.querySelectorAll<HTMLElement>(".sf-in")),
        acts: Array.from(el.querySelectorAll<HTMLElement>(".sf-act")),
        dots: Array.from(el.querySelectorAll<HTMLElement>(".sf-dot")),
        pops: Array.from(el.querySelectorAll<HTMLElement>(".sf-pop")),
        line: el.querySelector<HTMLElement>(".sf-line"),
        jonhl: el.querySelector<HTMLElement>(".sf-jonhl"),
        typed: el.querySelector<HTMLElement>(".sf-typed"),
      }));
      const typedEl = rd[4].typed;
      let activeK = -1; // the card whose inner content the timeline is animating (skipped by focus)
      const done = new Set<number>(); // cards already activated → shown full; the rest only peek

      // focus() = the carousel: every card visible & blurred by distance. The inner content only
      // PEEKS (≈40%) while a card is still rising (so next-steps look half-full); passed cards
      // above are full; the ACTIVE card is left to the timeline, which makes its content APPEAR.
      const focus = () => {
        const y = Number(gsap.getProperty(feed.current, "y"));
        const midY = activeAt();
        rd.forEach(({ el, skel, heads, ins, acts, dots, pops, line, jonhl, typed }, k) => {
          const cardCenter = el.offsetTop + el.offsetHeight / 2 + y;
          const d = cl((Math.abs(cardCenter - midY) - 26) / (spacing * 0.8));
          el.style.opacity = (1 - 0.72 * d).toFixed(3);
          if (lgMQ.matches) el.style.filter = d < 0.02 ? "none" : `blur(${(d * 5).toFixed(2)}px)`;
          else if (el.style.filter) el.style.filter = "";
          el.style.transform = `scale(${(1 - 0.05 * d).toFixed(3)})`;
          if (k === activeK) return; // timeline owns the active card's content (+ its skeleton)

          // already-activated cards (above) show full content; the rest below show the SKELETON
          // (content hidden) → the entrance at the top is a clean 0→100 organic reveal.
          const full = done.has(k);
          if (skel) skel.style.opacity = full ? "0" : "1";
          const p = full ? 1 : 0;
          const yo = ((1 - p) * 16).toFixed(1);
          heads.forEach((it) => { it.style.opacity = p.toFixed(3); }); // titles just snap in (no slide)
          ins.forEach((it) => { it.style.opacity = p.toFixed(3); it.style.transform = `translateY(${yo}px) scale(${(0.9 + 0.1 * p).toFixed(3)})`; });
          acts.forEach((it) => { it.style.opacity = p.toFixed(3); it.style.transform = `translateY(${((1 - p) * 10).toFixed(1)}px)`; });
          dots.forEach((it) => { it.style.transform = `scale(${p.toFixed(3)})`; });
          if (line) line.style.transform = `scaleY(${p.toFixed(3)})`;
          if (jonhl) jonhl.style.opacity = full ? "1" : "0";
          pops.forEach((it) => { it.style.opacity = p.toFixed(3); it.style.transform = `scale(${(0.6 + 0.4 * p).toFixed(3)})`; });
          if (typed && !full) typed.textContent = "";
        });
      };

      focus();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(feed.current, { y: centerY(1) });
        activeK = 1;
        const c = gsap.utils.selector(cards[1]);
        gsap.set(c(".sf-skel"), { opacity: 0 });
        gsap.set(c(".sf-head, .sf-in, .sf-act"), { opacity: 1, y: 0 });
        gsap.set(c(".sf-dot"), { scale: 1 });
        gsap.set(c(".sf-jonhl"), { opacity: 1 });
        focus();
        return;
      }
      gsap.ticker.add(focus);

      const move = 0.7;
      const dwell = 1.25;
      const c4 = gsap.utils.selector(cards[4]);
      const entry = stageH() * 0.5;
      const tl = gsap.timeline({ repeat: -1, paused: true });
      tl.set(feed.current, { opacity: 1, y: centerY(0) + entry }, 0)
        .call(() => { activeK = -1; done.clear(); }, undefined, 0)
        .set(c4(".sf-btn"), { scale: 1, backgroundColor: "#431b44" }, 0)
        .set(c4(".sf-btn-default"), { opacity: 1 }, 0)
        .set(c4(".sf-btn-sent"), { opacity: 0 }, 0)
        .set(c4(".sf-caret"), { opacity: 0 }, 0)
        .call(() => { if (typedEl) typedEl.textContent = ""; }, undefined, 0);

      // organic entrance for a card's inner blocks: always from 0 (fromTo), soft power3 easing.
      const inFrom = { opacity: 0, y: 18, scale: 0.92 };
      const revealIn = (targets: Element[], at: number, stagger = 0.1, duration = 0.55) =>
        tl.fromTo(targets, inFrom, { opacity: 1, y: 0, scale: 1, duration, stagger, ease: "power3.out" }, at);
      const popIn = (targets: Element[], at: number) =>
        tl.fromTo(targets, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, at);

      let t = 0.1;
      for (let k = 0; k < 7; k++) {
        const mv = k === 0 ? 0.5 : move; // first card rises back in a touch faster after the gap
        tl.to(feed.current, { y: centerY(k), duration: mv, ease: k === 0 ? "power2.out" : "power2.inOut" }, t);
        const ca = t + mv; // card parked at the active zone → its content APPEARS here
        const kk = k;
        tl.call(() => { activeK = kk; done.add(kk); }, undefined, ca - 0.14);
        const c = gsap.utils.selector(cards[k]);
        tl.to(c(".sf-skel"), { opacity: 0, duration: 0.3, ease: "power1.out" }, ca - 0.12); // dissolve skeleton
        const ci = ca - 0.12; // content starts right as the card lands (no perceptible delay)
        tl.to(c(".sf-head"), { opacity: 1, duration: 0.2, ease: "power1.out" }, ci); // title appears directly
        let dur = 0.9;

        if (k === 0) {
          revealIn(c(".sf-in"), ci);
          dur = 0.6 + 3 * 0.1;
        } else if (k === 1) {
          revealIn(c(".sf-in"), ci);
          tl.fromTo(c(".sf-jonhl"), { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, ci + 0.7);
          dur = 0.7 + 0.5;
        } else if (k === 2) {
          revealIn(c(".sf-in"), ci, 0, 0.5);
          popIn(c(".sf-pop"), ci + 0.2);
          const bStart = ci + 0.35, gap = 0.42;
          tl.fromTo(c(".sf-line"), { scaleY: 0 }, { scaleY: 1, duration: 2 * gap + 0.45, ease: "power2.inOut" }, bStart);
          tl.fromTo(c(".sf-act"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, stagger: gap, ease: "power3.out" }, bStart);
          tl.fromTo(c(".sf-dot"), { scale: 0 }, { scale: 1, duration: 0.45, stagger: gap, ease: "back.out(2.4)" }, bStart);
          dur = 0.35 + 2 * gap + 0.45;
        } else if (k === 3) {
          revealIn(c(".sf-in"), ci, 0.12);
          popIn(c(".sf-pop"), ci + 0.5);
          dur = 1.1;
        } else if (k === 4) {
          revealIn(c(".sf-in"), ci, 0.12, 0.5);
          const typeStart = ca + 0.75;
          const MESSAGE = tx.message; // el idioma no cambia en caliente (cada árbol es una carga completa)
          let ct = 0;
          for (let i = 0; i < MESSAGE.length; i++) {
            const idx = i;
            tl.call(() => { if (typedEl) typedEl.textContent = MESSAGE.slice(0, idx + 1); }, undefined, typeStart + ct);
            const ch = MESSAGE[i];
            let dd = 0.014 + (MESSAGE.charCodeAt(i) % 5) * 0.004;
            if (ch === " ") dd += 0.008;
            if (ch === "," || ch === ";") dd += 0.07;
            if (ch === "." || ch === "?" || ch === "!") dd += 0.13;
            ct += dd;
          }
          const typeEnd = typeStart + ct;
          tl.set(c(".sf-caret"), { opacity: 1 }, typeStart)
            .to(c(".sf-caret"), { opacity: 0, duration: 0.45, repeat: Math.round(ct / 0.9), yoyo: true, ease: "steps(1)" }, typeStart)
            .set(c(".sf-caret"), { opacity: 0 }, typeEnd + 0.05);
          tl.to(c(".sf-btn"), { scale: 0.95, duration: 0.11, yoyo: true, repeat: 1, ease: "power2.inOut" }, typeEnd + 0.45)
            .to(c(".sf-btn-default"), { opacity: 0, duration: 0.18 }, typeEnd + 0.57)
            .to(c(".sf-btn-sent"), { opacity: 1, duration: 0.18 }, typeEnd + 0.57)
            .to(c(".sf-btn"), { backgroundColor: "rgba(11,183,131,0.15)", duration: 0.28 }, typeEnd + 0.57);
          dur = 0.7 + ct + 1.3;
        } else if (k === 5) {
          revealIn(c(".sf-in"), ci, 0.14);
          dur = 1.0;
        } else {
          revealIn(c(".sf-in"), ci, 0.14);
          popIn(c(".sf-pop"), ci + 0.5);
          dur = 1.1;
        }
        t = t + mv + dur + dwell;
      }
      // infinite loop with a short empty gap between the last card and the first (kept snappy)
      tl.to(feed.current, { y: centerY(6) - stageH() * 0.55, duration: 0.5, ease: "power2.in" }, t);
      tl.to({}, { duration: 0.12 }, t + 0.5);

      // Coordinación con el loader de intro: en la 1ª visita el hero (y esta ilustración) queda
      // oculto tras el loader ~2.7s. No dejar que el feed avance por debajo (si no, al revelarse
      // ya vamos por la 2ª card). Esperamos el evento `neety:intro-done` para arrancar desde la 1ª
      // card; en visitas repetidas (ya visto) arranca de inmediato.
      const w = window as typeof window & { __neetyIntroDone?: boolean };
      let introPending = false;
      try {
        introPending = !sessionStorage.getItem("neety-intro-seen");
      } catch {}
      gsap.set(feed.current, { y: centerY(0) + entry }); // frame inicial estático mientras espera
      let started = false;
      const startFeed = () => {
        if (started) return;
        started = true;
        tl.play(0);
      };
      let removeIntroListener: (() => void) | undefined;
      if (introPending && !w.__neetyIntroDone) {
        window.addEventListener("neety:intro-done", startFeed);
        removeIntroListener = () =>
          window.removeEventListener("neety:intro-done", startFeed);
        gsap.delayedCall(5, startFeed); // fallback: nunca quedarse congelada
      } else {
        startFeed();
      }

      return () => {
        gsap.ticker.remove(focus);
        removeIntroListener?.();
        tl.kill();
      };
    },
    { scope: stage },
  );

  return (
    <div
      ref={box}
      className="relative aspect-[310/290] w-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_10%,#000_82%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_10%,#000_82%,transparent)] lg:aspect-[408/760] lg:[mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_72%,transparent)] lg:[-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_72%,transparent)]"
    >
      {/* fixed design-width canvas, uniformly scaled to fill `box` (see useEffect above) */}
      <div
        ref={stage}
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: DESIGN_W, height: DESIGN_W * (760 / 408) }}
      >
        <div ref={feed} className="absolute inset-x-0 top-0 flex flex-col gap-3">
          <CardSet t={tx} />
          {/* empty gap so the loop separates the last card from the first (kept short) */}
          <div aria-hidden className="h-[340px] w-full shrink-0" />
        </div>
      </div>
    </div>
  );
}
