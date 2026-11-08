import React, { useState } from 'react';
import { Terminal, Copy, Check, Download, Code2, Sparkles } from 'lucide-react';
import { GITHUB_REPOSITORY_COMMAND } from '../data/campaignData';

export const GithubCommandSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(GITHUB_REPOSITORY_COMMAND);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadPromptTxt = () => {
    const blob = new Blob([GITHUB_REPOSITORY_COMMAND], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'COMANDO_GITHUB_CERTIFICADO_10_PRIMEIROS_SOCORROS_OCULARES.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#0F172A] text-white rounded-2xl border border-slate-800 shadow-lg overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-slate-800 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-code text-amber-400">
            <Terminal className="w-4 h-4" />
            <span>ESPECIFICAÇÃO ARQUITETURAL & COMANDO PARA REPOSITÓRIO GITHUB / VERCEL</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Comando Completo para Gerar o Sistema + Certificado Nº 10 no GitHub
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            Abaixo está o comando estruturado passo a passo (pronto para copiar e colar em qualquer
            agente de código no GitHub, Cursor, Copilot ou Vercel) contendo todas as regras de
            higienização das logos e assinaturas, paleta de cores e textos do Modelo 10.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleCopyCommand}
            className="px-4 py-2.5 bg-[#E11D48] hover:bg-rose-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Comando Copiado com Sucesso!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Comando GitHub Completo</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadPromptTxt}
            className="px-3.5 py-2.5 bg-[#1E293B] hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Baixar .MD</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded((v) => !v)}
            className="px-3.5 py-2.5 bg-[#1E293B] hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium rounded-xl transition-colors whitespace-nowrap cursor-pointer"
          >
            {isExpanded ? 'Recolher Bloco' : 'Expandir Bloco'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 sm:p-6 bg-[#090E1A]">
          <pre className="text-xs sm:text-[13px] font-mono-code text-slate-200 leading-relaxed overflow-x-auto max-h-[480px] overflow-y-auto p-4 rounded-xl bg-[#0F172A] border border-slate-800 whitespace-pre-wrap">
            {GITHUB_REPOSITORY_COMMAND}
          </pre>
        </div>
      )}
    </div>
  );
};
