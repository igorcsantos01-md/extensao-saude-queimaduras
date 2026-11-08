import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  Droplets,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
  PhoneCall,
  RotateCcw,
  Play,
} from 'lucide-react';
import { EMERGENCY_SCENARIOS, EmergencyScenario } from '../data/campaignData';

export const OcularEmergencySimulator: React.FC = () => {
  const [selectedId, setSelectedId] = useState<EmergencyScenario['id']>('alcali');
  const [washMinutes, setWashMinutes] = useState<number>(15);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const scenario = useMemo(
    () => EMERGENCY_SCENARIOS.find((s) => s.id === selectedId) || EMERGENCY_SCENARIOS[0],
    [selectedId]
  );

  // Calculate current ocular surface pH based on washMinutes
  const currentPh = useMemo(() => {
    if (scenario.id === 'perfurante' || scenario.id === 'corpo_estranho') {
      return 7.4;
    }
    const maxMin = scenario.recommendedWashMinutes;
    const progress = Math.min(1, washMinutes / maxMin);
    // Exponential decay towards physiological pH 7.2
    const delta = scenario.initialPh - scenario.targetPh;
    const remaining = delta * Math.pow(1 - progress, 1.85);
    return Number((scenario.targetPh + remaining).toFixed(1));
  }, [scenario, washMinutes]);

  // Evaluate clinical state based on irrigation duration
  const clinicalStatus = useMemo(() => {
    if (scenario.id === 'perfurante') {
      if (washMinutes > 0) {
        return {
          code: 'PERIGO CRÍTICO: LAVAGEM PROIBIDA EM PERFURAÇÃO',
          color: '#E11D48',
          bg: 'bg-[#FFF1F2] border-[#FECDD3] text-[#9F1239]',
          desc: 'Em traumas perfurantes ou cortes oculares, o jato de água ou pressão aumenta o risco de extrusão do conteúdo intraocular. Mantenha em 0 min e aplique escudo rígido (copinho descartável)!',
        };
      }
      return {
        code: 'CONDUTA CORRETA: ESCUDO RÍGIDO SEM IRRIGAÇÃO',
        color: '#059669',
        bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
        desc: 'Globo ocular protegido sem pressão mecânica. Encaminhamento cirúrgico imediato via SAMU 192 em jejum absoluto.',
      };
    }

    if (washMinutes === 0) {
      return {
        code: 'ALERTA VERMELHO: DANO TECIDUAL PROGRESSIVO',
        color: '#E11D48',
        bg: 'bg-[#FFF1F2] border-[#FECDD3] text-[#9F1239]',
        desc: 'Sem lavagem imediata nos primeiros segundos, o agente químico continua destruindo o epitélio e as células-tronco do limbo corneano.',
      };
    }

    if (washMinutes < scenario.recommendedWashMinutes * 0.6) {
      return {
        code: 'IRRIGAÇÃO INSUFICIENTE: pH AINDA FORA DA FAIXA SEGURA',
        color: '#D97706',
        bg: 'bg-amber-50 border-amber-200 text-amber-900',
        desc: `O pH conjuntival atual (${currentPh}) ainda provoca lesão estromal residual. Continue a irrigação até atingir ${scenario.recommendedWashMinutes} minutos.`,
      };
    }

    return {
      code: 'pH FISIOLÓGICO RESTABELECIDO (7.2 – 7.4) · LIMBO PROTEGIDO',
      color: '#059669',
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      desc: `Irrigação abundante concluída (${washMinutes} min). O agente químico foi diluído e removido dos fórnices conjuntivais, preservando a transparência corneana.`,
    };
  }, [scenario, washMinutes, currentPh]);

  const handleSelectScenario = (id: EmergencyScenario['id']) => {
    setSelectedId(id);
    setActiveStepIndex(0);
    if (id === 'perfurante') {
      setWashMinutes(0);
    } else if (id === 'alcali') {
      setWashMinutes(15);
    } else if (id === 'acido') {
      setWashMinutes(15);
    } else {
      setWashMinutes(10);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top Scenario Filter Bar */}
      <div className="bg-[#0F172A] p-4 sm:p-6 border-b border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="text-xs font-mono-code text-[#FB7185] tracking-wider uppercase">
              LABORATÓRIO DE SIMULAÇÃO CLÍNICA COMUNITÁRIA · ITEM 08
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Simulador Interativo de Conduta Imediata em Traumas e Queimaduras Químicas
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-[#1E293B] p-1.5 rounded-xl border border-slate-700">
            {EMERGENCY_SCENARIOS.map((item) => {
              const active = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectScenario(item.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#E11D48] text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Two-Zone Sandbox Layout (65% Left Interactive Stage / 35% Right Clinical Deck) */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT ZONE: Interactive Stage (7 columns) */}
        <div className="lg:col-span-7 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between gap-6">
          {/* Scenario Header & KPI Telemetry */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div>
                <div className="text-xs font-mono-code text-slate-500">
                  CENÁRIO SELECIONADO · {scenario.severityLevel}
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mt-0.5">{scenario.name}</h4>
              </div>
              <span
                className="text-xs font-mono-code font-bold px-3 py-1.5 rounded-md"
                style={{
                  backgroundColor: `${scenario.accentColor}15`,
                  color: scenario.accentColor,
                }}
              >
                ▲ {scenario.badgeText}
              </span>
            </div>

            {/* Common Causal Agents */}
            <div className="mt-4">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Agentes Causadores Mais Comuns na Comunidade e Trabalho:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {scenario.examples.map((ex) => (
                  <div
                    key={ex}
                    className="text-xs text-slate-700 bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-2 font-medium"
                  >
                    • {ex}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Irrigation & pH Normalization Sandbox */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#1D4ED8] text-white flex items-center justify-center shrink-0">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <label
                    htmlFor="irrigation-slider"
                    className="block text-sm font-bold text-slate-900"
                  >
                    Controle de Tempo de Irrigação Ocular Contínua:{' '}
                    <span className="font-mono-code text-[#1D4ED8]">{washMinutes} min</span>
                  </label>
                  <span className="text-xs text-slate-500">
                    Arraste o controle para simular o efeito da lavagem no pH da superfície ocular
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setWashMinutes(scenario.recommendedWashMinutes)}
                  className="px-3 py-1.5 text-xs font-semibold bg-[#1D4ED8] hover:bg-blue-800 text-white rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Aplicar Meta ({scenario.recommendedWashMinutes} min)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setWashMinutes(0)}
                  className="px-2.5 py-1.5 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Zerar</span>
                </button>
              </div>
            </div>

            {/* Range Slider with labeled ticks */}
            <div className="my-4">
              <input
                id="irrigation-slider"
                type="range"
                min={0}
                max={30}
                step={1}
                value={washMinutes}
                onChange={(e) => setWashMinutes(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1D4ED8]"
              />
              <div className="flex justify-between text-[11px] font-mono-code text-slate-500 mt-1.5">
                <span>0 min (Acidente)</span>
                <span>5 min</span>
                <span>10 min</span>
                <span>15 min</span>
                <span>20 min (Meta Ácido)</span>
                <span>30 min (Meta Álcali)</span>
              </div>
            </div>

            {/* 3 Telemetry Readouts */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <div className="text-[11px] text-slate-500 font-medium">pH Inicial do Agente</div>
                <div className="text-xl font-bold font-mono-code text-slate-900 mt-0.5">
                  pH {scenario.initialPh.toFixed(1)}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {scenario.initialPh > 8
                    ? 'Fortemente Alcalino'
                    : scenario.initialPh < 6
                    ? 'Fortemente Ácido'
                    : 'Fisiológico Neutro'}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <div className="text-[11px] text-slate-500 font-medium">
                  pH Conjuntival Atual ({washMinutes}m)
                </div>
                <div
                  className="text-xl font-bold font-mono-code mt-0.5"
                  style={{ color: clinicalStatus.color }}
                >
                  pH {currentPh.toFixed(1)}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Meta Segura: 7.0 – 7.4</div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <div className="text-[11px] text-slate-500 font-medium">Volume Estimado SF 0,9%</div>
                <div className="text-xl font-bold font-mono-code text-[#1D4ED8] mt-0.5">
                  {(washMinutes * 0.1).toFixed(1)} Litros
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Meta: {scenario.recommendedWashMinutes} min
                </div>
              </div>
            </div>

            {/* Status Callout Banner */}
            <div className={`mt-4 p-3.5 rounded-lg border text-xs leading-relaxed ${clinicalStatus.bg}`}>
              <div className="font-bold font-mono-code flex items-center gap-1.5 mb-1">
                <Activity className="w-4 h-4 shrink-0" />
                <span>{clinicalStatus.code}</span>
              </div>
              <p>{clinicalStatus.desc}</p>
            </div>
          </div>

          {/* Interactive 4-Step Immediate Action Protocol */}
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Protocolo Sequencial de Primeiros Socorros (Clique em cada etapa):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scenario.immediateSteps.map((stepObj, idx) => {
                const isSelected = idx === activeStepIndex;
                return (
                  <button
                    key={stepObj.step}
                    type="button"
                    onClick={() => setActiveStepIndex(idx)}
                    className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-sm'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`text-xs font-mono-code font-bold ${
                          isSelected ? 'text-[#FB7185]' : 'text-[#E11D48]'
                        }`}
                      >
                        ETAPA {stepObj.step}
                      </span>
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          isSelected ? 'text-emerald-400' : 'text-slate-300'
                        }`}
                      />
                    </div>
                    <div className="text-sm font-bold leading-snug">{stepObj.title}</div>
                    <p
                      className={`text-xs mt-1.5 leading-relaxed ${
                        isSelected ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {stepObj.detail}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT ZONE: Clinical Pathophysiology & Forbidden Actions (5 columns) */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-50/70 flex flex-col justify-between gap-6">
          <div className="space-y-6">
            {/* Pathophysiology Block */}
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <div className="text-xs font-mono-code font-bold text-[#1D4ED8] uppercase tracking-wider">
                01. Fisiopatologia Ocular Explicada
              </div>
              <h5 className="text-base font-bold text-slate-900 mt-1">
                Como essa lesão age na córnea?
              </h5>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                {scenario.pathophysiology}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-700">
                <strong className="text-slate-900">Prognóstico do Limbo Corneano:</strong>{' '}
                {scenario.limbusRisk}
              </div>
            </div>

            {/* Forbidden Actions / Combat Fake News */}
            <div className="bg-[#FFF1F2] p-5 rounded-xl border border-[#FECDD3]">
              <div className="flex items-center gap-2 text-[#BE123C] font-bold text-sm">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <span>O Que JAMAIS Fazer (Combate à Desinformação)</span>
              </div>
              <p className="text-xs text-[#9F1239] mt-1 mb-3">
                Condutas caseiras combatidas diretamente nos infográficos de bolso da campanha:
              </p>
              <ul className="space-y-2.5">
                {scenario.forbiddenActions.map((forb) => (
                  <li
                    key={forb}
                    className="flex items-start gap-2 text-xs text-[#881337] leading-relaxed bg-white/80 p-2.5 rounded-lg border border-[#FECDD3]"
                  >
                    <XCircle className="w-4 h-4 text-[#E11D48] shrink-0 mt-0.5" />
                    <span>{forb}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SUS Official Routing Box */}
          <div className="bg-[#0F172A] text-white p-5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono-code text-amber-400">
              <PhoneCall className="w-4 h-4" />
              <span>FLUXO DE URGÊNCIA OFTALMOLÓGICA DO SUS</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mt-2">{scenario.susRouting}</p>
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800 text-center font-mono-code">
              <div className="bg-slate-800/90 rounded-lg py-2 px-1">
                <div className="text-sm font-bold text-[#FB7185]">SAMU 192</div>
                <div className="text-[10px] text-slate-400">Socorro Médico</div>
              </div>
              <div className="bg-slate-800/90 rounded-lg py-2 px-1">
                <div className="text-sm font-bold text-amber-400">COBOM 193</div>
                <div className="text-[10px] text-slate-400">Resgate Químico</div>
              </div>
              <div className="bg-slate-800/90 rounded-lg py-2 px-1">
                <div className="text-sm font-bold text-sky-400">UPA 24h / SUS</div>
                <div className="text-[10px] text-slate-400">Rede Pública</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
