// ═══════════════════════════════════════════════════════════════════
// PÁGINA: Anúncio da Série — Acessível via login secreto
// EDITÁVEL: Altere textos, data de lançamento e imagem de fundo
// ═══════════════════════════════════════════════════════════════════

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logos.png";

function useTypewriter(text: string, speed = 35) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return displayed;
}

// ─────────────────────────────────────────────────────────────────
// EDITÁVEL: Imagem de fundo — coloque sua imagem em src/assets/
// e descomente a linha abaixo. Ex: import bg from "@/assets/serie-bg.jpg";
// ─────────────────────────────────────────────────────────────────
let bgImage: string | null = null;
try {
  bgImage = new URL("../assets/serie-bg.png", import.meta.url).href;
} catch {
  bgImage = null;
}

export default function Anuncio() {
  const [tick, setTick] = useState(0);
  const typed = useTypewriter("TRANSMISSÃO INTERCEPTADA — CANAL SEGURO ATIVADO", 30);

  // ─────────────────────────────────────────────────────────────────
  // EDITÁVEL: Data de lançamento da série (formato: ano, mês-1, dia)
  // ─────────────────────────────────────────────────────────────────
  const LAUNCH_DATE = new Date(2026, 4, 3); // 03/05/2026
  const now = new Date();
  const diff = LAUNCH_DATE.getTime() - now.getTime();
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
  const seconds = Math.max(0, Math.floor((diff % (1000 * 60)) / 1000));

  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="scanlines min-h-screen bg-background font-mono crt-vignette relative overflow-hidden">
      {/* ─── EDITÁVEL: Background da série ─── */}
      {bgImage && (
        <div
          className="absolute inset-0 opacity-15 z-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(80%) contrast(1.2)",
          }}
        />
      )}

      {/* Scanline */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-50 h-8 w-full opacity-10"
        style={{
          background: "linear-gradient(to bottom, transparent, hsl(187 100% 80% / 0.15), transparent)",
          animation: "scanline 8s linear infinite",
        }}
      />

      {/* Grid background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-5 z-0"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="max-w-2xl w-full space-y-8 text-center">

          {/* Logo */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={logo}
                alt="NordSternLab"
                className="h-20 w-20 opacity-90"
                style={{ filter: "drop-shadow(0 0 15px hsl(187 100% 50% / 0.5))" }}
              />
              <div className="absolute inset-0 animate-pulse-cyan rounded-full" />
            </div>
          </div>

          {/* Typewriter */}
          <div className="terminal-box p-3">
            <span className="text-xs text-primary tracking-widest">{typed}</span>
            <span className="animate-blink text-primary">█</span>
          </div>

          {/* ─── EDITÁVEL: Título principal do anúncio ─── */}
          <div className="space-y-3">
            <div className="stamp text-sm mx-auto inline-block">CLASSIFICADO: +18</div>
            <h1
              className="text-3xl md:text-5xl font-black text-primary tracking-widest glitch"
              data-text="NORDSTERNLAB"
              style={{ textShadow: "0 0 20px hsl(187 100% 50% / 0.4)" }}
            >
              PROJETO NZ-01
            </h1>
            {/* EDITÁVEL: Subtítulo */}
            <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase">
              UMA SÉRIE ORIGINAL — POR TODDY
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-40" />

          {/* ─── EDITÁVEL: Descrição / sinopse ─── */}
          <div className="terminal-box p-6 text-left space-y-3">
            <div className="text-xs text-primary font-bold tracking-widest">SINOPSE PÚBLICA</div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              O fim não foi decretado por bombas, mas pelo desespero. O que começou como um acerto de contas pessoal entre potências globais culminou no vazamento da arma biológica alemã, um erro que silenciou o mundo. A população não apenas sucumbiu; ela se destruiu em prantos diante do contágio e das mutações. Dezesseis anos se passaram desde que a humanidade foi consumida por sua própria criação. Agora, em 2046, em meio às ruínas de uma civilização esquecida, a linha entre a salvação e a destruição tornou-se impossível de distinguir.
            </p>
            <p className="text-xs text-alert-red animate-flicker">
              A verdade tem um preço, o passado cobrará o que é devido.
            </p>
          </div>

          {/* Countdown */}
          <div className="space-y-3">
            <div className="text-xs text-muted-foreground tracking-widest uppercase">
              LANÇAMENTO: <span className="text-primary font-bold">03.05.2026</span>
            </div>
            <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
              {[
                { label: "DIAS", value: days },
                { label: "HORAS", value: hours },
                { label: "MIN", value: minutes },
                { label: "SEG", value: seconds },
              ].map((item) => (
                <div key={item.label} className="terminal-box p-3 text-center">
                  <div className="text-xl md:text-2xl font-black text-primary" style={{ textShadow: "0 0 8px hsl(187 100% 50% / 0.4)" }}>
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] text-muted-foreground tracking-widest mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── EDITÁVEL: Slot para imagem/banner da série ─── */}
          <div className="terminal-box p-4 space-y-2">
            <div className="text-xs text-muted-foreground tracking-widest uppercase">MATERIAL PROMOCIONAL</div>
            <div className="aspect-video bg-secondary border border-border flex items-center justify-center">
              <div className="text-center space-y-1">
                <div className="text-3xl text-muted-foreground opacity-20"></div>
                <div className="text-xs text-muted-foreground opacity-40">
                  <img src="/src/assets/ad.jpg"/>
                </div>
              </div>
            </div>
          </div>

          {/* ─── EDITÁVEL: Slot para trailer/teaser ─── */}
          <div className="terminal-box p-4 space-y-2">
            <div className="text-xs text-muted-foreground tracking-widest uppercase">TEASER</div>
            {/* EDITÁVEL: Troque o youtubeId pelo ID do seu vídeo */}
            <div className="aspect-video bg-secondary border border-border flex items-center justify-center">
              <div className="text-xs text-muted-foreground opacity-40">youtubeId: "W83GZ1D0fEuvscSl"</div>
            </div>
          </div>

          {/* Warning footer */}
          <div className="border border-alert-red bg-card p-4">
            <p className="text-xs text-alert-red font-bold tracking-widest animate-flicker">
              ⚠ ESTA TRANSMISSÃO É MONITORADA
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Qualquer tentativa de redistribuição não autorizada será rastreada.
            </p>
          </div>

          {/* Back */}
          <Link
            to="/"
            className="inline-block px-6 py-2 text-xs font-bold tracking-widest uppercase border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
          >
            ← ESCAPAR
          </Link>
        </div>
      </div>
    </div>
  );
}
