import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  Phone,
  Eye,
  Clock,
  Award,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { POCKET_INFOGRAPHIC_DATA } from '../data/campaignData';

interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; isCorrect: boolean; explanation: string }[];
}

const COMMUNITY_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question:
      '1. Um trabalhador da construção civil sofre respingo de cal ou cimento (álcali) no olho. Qual deve ser a PRIMEIRA atitude nos primeiros 10 segundos?',
    options: [
      {
        label: 'Lavar imediatamente no local com água corrente limpa abundante por 15 a 30 minutos.',
        isCorrect: true,
        explanation:
          'Correto! Álcalis penetram na córnea em menos de 1 minuto (saponificação). Lavar imediatamente no local salva a visão antes mesmo do transporte ao hospital.',
      },
      {
        label: 'Fechar o olho com pano e correr para o hospital sem jogar água.',
        isCorrect: false,
        explanation:
          'Incorreto e perigoso! Enquanto o paciente se desloca sem lavar, o cimento/cal continua queimando as células-tronco do limbo corneano.',
      },
      {
        label: 'Pingar leite, limão ou óleo de cozinha para neutralizar a química.',
        isCorrect: false,
        explanation:
          'Mito perigoso! Reações de neutralização liberam calor (reação exotérmica) e substâncias caseiras causam infecção grave e necrose.',
      },
    ],
  },
  {
    id: 2,
    question:
      '2. Em um acidente com estilhaço de vidro ou arame que perfurou ou ficou encravado no olho, qual é a conduta correta do Infográfico de Bolso?',
    options: [
      {
        label: 'Retirar o objeto com pinça e lavar com jato forte de água.',
        isCorrect: false,
        explanation:
          'Proibido! Puxar objetos encravados ou jogar jato de água em olho perfurado causa extrusão do conteúdo intraocular.',
      },
      {
        label: 'NÃO tocar, NÃO lavar, proteger com copinho descartável apoiado no osso da face e acionar o SAMU 192 em jejum.',
        isCorrect: true,
        explanation:
          'Exato! O escudo rígido (copinho descartável) protege o globo aberto contra pressão externa até a microcirurgia no SUS.',
      },
      {
        label: 'Fazer um curativo bem apertado com gaze sobre a pálpebra.',
        isCorrect: false,
        explanation:
          'Jamais comprima um olho com suspeita de perfuração! Qualquer pressão expulsa a íris e a retina.',
      },
    ],
  },
  {
    id: 3,
    question:
      '3. Sobre o uso de colírio anestésico em casa após faísca de solda ou cisco no olho, o que a Campanha Educativa alerta?',
    options: [
      {
        label: 'Pode ser pingado de hora em hora até a dor passar.',
        isCorrect: false,
        explanation:
          'Risco de cegueira! O colírio anestésico é de uso estritamente diagnóstico pelo médico no consultório.',
      },
      {
        label: 'É estritamente proibido em casa: paralisa a cicatrização da córnea, mascara infecções e pode derreter a córnea (ceratopatia tóxica).',
        isCorrect: true,
        explanation:
          'Perfeito! O combate ao uso domiciliar de colírio anestésico é um dos pilares centrais desta campanha educativa.',
      },
    ],
  },
];

export const PocketInfographicSection: React.FC = () => {
  const [activeCardSide, setActiveCardSide] = useState<'all' | 'front' | 'back'>('all');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = COMMUNITY_QUIZ.filter((q) => {
    const picked = selectedAnswers[q.id];
    return picked !== undefined && q.options[picked]?.isCorrect;
  }).length;

  return (
    <div className="space-y-12">
      {/* Pocket Infographic Interactive Showcase */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono-code text-[#E11D48] font-bold uppercase tracking-wider">
              MATERIAL EDITORIAL DISTRIBUÍDO À COMUNIDADE · EIXO II (02H 30MIN)
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              {POCKET_INFOGRAPHIC_DATA.title}
            </h3>
            <p className="text-sm text-slate-600 mt-1">{POCKET_INFOGRAPHIC_DATA.subtitle}</p>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveCardSide('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCardSide === 'all'
                  ? 'bg-[#0F172A] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Visão Completa (Frente + Verso)
            </button>
            <button
              type="button"
              onClick={() => setActiveCardSide('front')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCardSide === 'front'
                  ? 'bg-[#0F172A] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lado A: Queimadura Química
            </button>
            <button
              type="button"
              onClick={() => setActiveCardSide('back')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCardSide === 'back'
                  ? 'bg-[#0F172A] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lado B: Traumas e Rede SUS
            </button>
          </div>
        </div>

        {/* Two-Side Pocket Infographic Cards */}
        <div className="p-6 sm:p-8 bg-slate-50 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LADO A — FRENTE DO INFOGRÁFICO DE BOLSO */}
          {(activeCardSide === 'all' || activeCardSide === 'front') && (
            <div className="bg-white rounded-2xl border-2 border-[#0F172A] shadow-md overflow-hidden flex flex-col justify-between">
              <div>
                <div className="bg-[#E11D48] text-white px-6 py-4 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-mono-code font-bold uppercase tracking-widest text-rose-100">
                      CARTÃO DE BOLSO · LADO A (EMERGÊNCIA QUÍMICA)
                    </div>
                    <h4 className="text-lg font-extrabold tracking-tight mt-0.5">
                      OS 10 SEGUNDOS QUE SALVAM A VISÃO
                    </h4>
                  </div>
                  <AlertOctagon className="w-8 h-8 text-white shrink-0" />
                </div>

                <div className="p-6 space-y-5">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                    <strong className="text-[#B45309] block mb-1 font-mono-code uppercase">
                      ▲ REGRA DE OURO DA OFTALMOLOGIA DE URGÊNCIA:
                    </strong>
                    {POCKET_INFOGRAPHIC_DATA.goldenRule}
                  </div>

                  <div className="space-y-3">
                    {POCKET_INFOGRAPHIC_DATA.chemicalSteps.map((step, i) => (
                      <div
                        key={step.time}
                        className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200"
                      >
                        <div className="px-2.5 py-1.5 rounded-lg bg-[#0F172A] text-white font-mono-code text-xs font-bold shrink-0">
                          {step.time}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">
                            {i + 1}. {step.action}
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 text-slate-300 px-6 py-3.5 text-[11px] font-mono-code flex items-center justify-between">
                <span>EDITORA MENTE E SAÚDE · CENTRO MARIA DALVA DE ARAÚJO</span>
                <span className="text-rose-400 font-bold">CÓD. EMS-EXT-2026-1042</span>
              </div>
            </div>
          )}

          {/* LADO B — VERSO DO INFOGRÁFICO DE BOLSO */}
          {(activeCardSide === 'all' || activeCardSide === 'back') && (
            <div className="bg-white rounded-2xl border-2 border-[#1D4ED8] shadow-md overflow-hidden flex flex-col justify-between">
              <div>
                <div className="bg-[#1D4ED8] text-white px-6 py-4 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-mono-code font-bold uppercase tracking-widest text-blue-100">
                      CARTÃO DE BOLSO · LADO B (CONDUTA DIFERENCIAL E SUS)
                    </div>
                    <h4 className="text-lg font-extrabold tracking-tight mt-0.5">
                      O QUE FAZER vs. O QUE JAMAIS FAZER
                    </h4>
                  </div>
                  <Eye className="w-8 h-8 text-white shrink-0" />
                </div>

                <div className="p-6 space-y-4">
                  {POCKET_INFOGRAPHIC_DATA.traumaComparison.map((row) => (
                    <div
                      key={row.type}
                      className="rounded-xl border border-slate-200 p-3.5 bg-slate-50/70 space-y-2"
                    >
                      <div
                        className="text-xs font-mono-code font-bold uppercase"
                        style={{ color: row.color }}
                      >
                        ■ {row.type}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-emerald-950">
                          <span className="font-bold text-emerald-700 block mb-0.5">
                            ✓ FAZER IMEDIATAMENTE:
                          </span>
                          {row.doAction}
                        </div>
                        <div className="bg-rose-50 border border-rose-200 rounded-lg p-2.5 text-rose-950">
                          <span className="font-bold text-[#E11D48] block mb-0.5">
                            ✕ ERRO PROIBIDO:
                          </span>
                          {row.dontAction}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* SUS Emergency Contacts Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                    {POCKET_INFOGRAPHIC_DATA.susEmergencyContacts.map((contact) => (
                      <div
                        key={contact.number}
                        className="bg-[#0F172A] text-white rounded-lg p-2.5 text-center"
                      >
                        <div className="text-sm font-extrabold font-mono-code text-amber-400">
                          {contact.number}
                        </div>
                        <div className="text-[10px] font-semibold text-white mt-0.5">
                          {contact.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 text-slate-300 px-6 py-3.5 text-[11px] font-mono-code flex items-center justify-between">
                <span>DISTRIBUIÇÃO COMUNITÁRIA GRATUITA · PROIBIDA A VENDA</span>
                <span className="text-sky-400 font-bold">SAÚDE OCULAR SUS</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Community Knowledge Quiz (Coleta de Dados Populacionais — Eixo III) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="text-xs font-mono-code font-bold text-[#1D4ED8] uppercase tracking-wider">
              INSTRUMENTO DE LETRAMENTO E COLETA DE DADOS POPULACIONAIS · EIXO III
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Autoavaliação Rápida: Você Saberia Agir em uma Emergência Ocular?
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs font-mono-code bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-lg text-slate-800">
              Acertos: <strong>{correctCount}</strong> / {COMMUNITY_QUIZ.length}
            </div>
            {answeredCount > 0 && (
              <button
                type="button"
                onClick={() => setSelectedAnswers({})}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {COMMUNITY_QUIZ.map((q) => {
            const chosenIndex = selectedAnswers[q.id];
            return (
              <div
                key={q.id}
                className="bg-slate-50 rounded-xl border border-slate-200 p-5 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug mb-4">
                    {q.question}
                  </h4>
                  <div className="space-y-2.5">
                    {q.options.map((opt, idx) => {
                      const isPicked = chosenIndex === idx;
                      let btnStyle =
                        'bg-white border-slate-200 text-slate-700 hover:border-slate-400';
                      if (chosenIndex !== undefined) {
                        if (opt.isCorrect) {
                          btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold';
                        } else if (isPicked && !opt.isCorrect) {
                          btnStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                        }
                      }
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() =>
                            setSelectedAnswers((prev) => ({ ...prev, [q.id]: idx }))
                          }
                          className={`w-full text-left text-xs p-3 rounded-lg border transition-all cursor-pointer ${btnStyle}`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {chosenIndex !== undefined && (
                  <div
                    className={`mt-4 p-3 rounded-lg text-xs leading-relaxed border ${
                      q.options[chosenIndex].isCorrect
                        ? 'bg-emerald-100/70 border-emerald-300 text-emerald-950'
                        : 'bg-rose-100/70 border-rose-300 text-rose-950'
                    }`}
                  >
                    <strong>Feedback Científico:</strong> {q.options[chosenIndex].explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
