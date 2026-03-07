import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BootSequence from "./BootSequence";
import evidencia from "src/assets/cofee.png";

// ═══════════════════════════════════════════════════════════════════
// EDITÁVEL: Página secreta do COFEE — acessada após clicar várias
// vezes no dossiê suprimido (ARQ-004) no Dashboard.
// Edite os textos abaixo para expandir o lore do infiltrado.
// ═══════════════════════════════════════════════════════════════════

function useTypewriter(text: string, speed = 25) {
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

export default function SecretCofee() {
  const [isBooting, setIsBooting] = useState(true);
  const [revealed, setRevealed] = useState(0);
  const typed = useTypewriter("ARQUIVO CORROMPIDO RECUPERADO — COFEE-0 — DOSSIÊ DE INFILTRAÇÃO", 30);

// Seções do dossiê secreto do COFEE
const sections = [
  {
    title: "1. PERFIL DO ALVO: COFEE-0",
    content:
      "Anteriormente registrado como ECHO-17, profissional associado ao NordSternLab com acesso a setores técnicos restritos. Após o Incidente DL-09 (11/02/2028), todos os registros administrativos ligados ao indivíduo foram removidos do banco de dados central. Informações posteriores indicam que ele passou a atuar como líder da USRF, uma célula dissidente responsável por operações clandestinas direcionadas contra o laboratório e seus projetos associados.",
  },
  {
    title: "2. OPERAÇÃO USRF (CÉLULA REBELDE)",
    content:
      "A USRF opera de forma descentralizada e com recursos limitados, priorizando sabotagem direcionada e vazamento seletivo de informações. Entre 2028 e 2029, a célula conduziu diversas interferências contra sistemas do NordSternLab, incluindo a divulgação de documentos internos relacionados ao caso clínico de Ingrid S. e tentativas de comprometimento da infraestrutura digital do setor de biosegurança. As comunicações interceptadas sugerem motivação pessoal e forte hostilidade institucional.",
  },
  {
    title: "3. CRONOLOGIA DE INTERFERÊNCIA",
    content:
      "Registros de segurança associam atividades da USRF a múltiplos eventos críticos: (19/11/2027) sabotagem documentada envolvendo o Vetor Aerossol A-02; (30/10/2028) acesso não autorizado a materiais da Calibração Neural RP-10; (18/07/2029) última detecção confirmada de COFEE-0 tentando sobrecarregar os sistemas do setor de biotecnologia antes de desaparecer do perímetro monitorado.",
  },
  {
    title: "4. DADOS COMPROMETIDOS",
    content:
      "A análise de incidentes indica que a USRF obteve acesso parcial a arquivos classificados. Entre os dados potencialmente comprometidos estão: (1) sequências genéticas vinculadas ao caso clínico associado a Ingrid S.; (2) relatórios técnicos de falha do protótipo RP-10; (3) registros logísticos relacionados ao carregamento orbital NZ-01. A extensão completa do vazamento permanece em avaliação.",
  },
  {
    title: "5. STATUS OPERACIONAL",
    content:
      "COFEE-0 foi oficialmente declarado morto em 2029 para fins administrativos internos. No entanto, relatórios subsequentes indicam atividade operacional compatível com a presença continuada da liderança da USRF. A interceptação do carregamento NZ-01 em 05/03/2030 é considerada, por alguns analistas, uma possível ação deliberada da célula. Status atual: não confirmado. Nível de ameaça atribuído: elevado.",
  },
];

  if (isBooting) {
  return <BootSequence onComplete={() => setIsBooting(false)} />;
}

  return (
    <div className={`scanlines min-h-screen bg-background font-mono crt-vignette p-4 md:p-8 ${!isBooting ? "animate-power-onp opacity-100" : "opacity-0"}`}>
      {/* Scanline */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-50 h-8 w-full opacity-10"
        style={{
          background: "linear-gradient(to bottom, transparent, hsl(187 100% 80% / 0.15), transparent)",
          animation: "scanline 8s linear infinite",
        }}
      />

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header glitch */}
        <div className="text-center space-y-2">
          <div className="text-xs text-alert-red animate-flicker tracking-widest">⚠ DADOS RECUPERADOS DE SETOR CORROMPIDO ⚠</div>
          <div className="text-xs text-primary tracking-widest">
            {typed}<span className="animate-blink text-primary">█</span>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-alert-red to-transparent opacity-50" />

        {/* Warning */}
        <div className="border border-alert-red bg-card p-4">
          <div className="text-xs text-alert-red font-bold tracking-widest animate-flicker">
            ⚠ ARQUIVO PARCIALMENTE CORROMPIDO — DADOS PODEM ESTAR INCOMPLETOS
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Este dossiê foi recuperado de um setor de armazenamento marcado para exclusão permanente. 
            A integridade dos dados não pode ser garantida.
          </p>
        </div>

        {/* Progressive reveal sections */}
        {sections.map((sec, i) => (
          <div
            key={i}
            className={`terminal-box p-4 space-y-2 transition-all duration-500 ${
              i <= revealed ? "opacity-100" : "opacity-20 cursor-pointer hover:opacity-40"
            } ${i === revealed + 1 ? "border-l-alert-yellow" : ""}`}
            onClick={() => { if (i === revealed + 1) setRevealed(i); }}
          >
            <div className="text-xs font-bold text-primary tracking-widest uppercase">{sec.title}</div>
            {i <= revealed ? (
              <p className="text-xs text-muted-foreground leading-relaxed animate-fade-in-up">{sec.content}</p>
            ) : (
              <div className="text-xs text-muted-foreground redacted">
                ████████████████████████████████████████████████
              </div>
            )}
            {i === revealed && i < sections.length - 1 && (
              <div className="text-xs text-alert-yellow animate-pulse mt-2">
                ▼ Clique na próxima seção para descriptografar ▼
              </div>
            )}
          </div>
        ))}

        {/* Puzzle hint */}
        {revealed >= sections.length - 1 && (
          <div className="border border-primary bg-card p-4 text-center space-y-2 animate-fade-in-up">
            <div className="text-xs text-primary font-bold tracking-widest">DOSSIÊ COMPLETO DESBLOQUEADO</div>
            {/* EDITÁVEL: Mensagem final após revelar tudo */}
            <p className="text-xs text-muted-foreground">
              Você acessou todos os dados disponíveis sobre COFEE-0. 
              Este registro será automaticamente suprimido em 24 horas.
            </p>
          </div>
        )}

        {/* Slot para imagem / evidência */}
        <div className="terminal-box p-4 space-y-2">
          <div className="text-xs text-muted-foreground tracking-widest uppercase">EVIDÊNCIA FOTOGRÁFICA</div>
          <div className="aspect-video bg-secondary border border-border flex items-center justify-center">
            <div className="text-center space-y-1">
              <div className="text-2xl text-muted-foreground opacity-20">📷</div>
              <div className="text-xs text-muted-foreground"><img src="src/assets/cofee.png"/></div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="text-center">
          <Link
            to="/dashboard"
            className="inline-block px-6 py-2 text-xs font-bold tracking-widest uppercase border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
          >
            ← RETORNAR AO PAINEL
          </Link>
        </div>
      </div>
      <>{isBooting && <BootSequence onComplete={() => setIsBooting(false)} />}</>
    </div>
  );
}
