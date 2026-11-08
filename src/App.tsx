/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  FileCheck2,
  ShieldCheck,
  Droplets,
  AlertTriangle,
  BookOpen,
  Terminal,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  Eye,
  Clock,
  Layers,
} from 'lucide-react';
import { CERTIFICATE_10_DATA, CertificateRecord } from './data/campaignData';
import { CertificateDocument } from './components/CertificateDocument';
import { OcularEmergencySimulator } from './components/OcularEmergencySimulator';
import { PocketInfographicSection } from './components/PocketInfographicSection';
import { PublicValidatorSection } from './components/PublicValidatorSection';
import { GithubCommandSection } from './components/GithubCommandSection';
import { LogoEditoraMenteSaude, LogoCentroMariaDalva } from './components/CertificateGraphics';

export default function App() {
  const [certificateData, setCertificateData] = useState<CertificateRecord>(CERTIFICATE_10_DATA);
  const [urlQueryCode, setUrlQueryCode] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setCertificateData((prev) => ({
      ...prev,
      verificationUrlBase: prev.verificationUrlBase || window.location.origin,
    }));

    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get('codigo') || params.get('chave') || '';
    if (codeParam) {
      setUrlQueryCode(codeParam);
    }

    if (window.location.hash === '#validador' || codeParam) {
      setTimeout(() => {
        const el = document.getElementById('validador');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 250);
    }
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* =====================================================================
          STRICT 3-ZONE TOP BAR CONTRACT
         ===================================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 no-print">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#campanha"
            className="text-lg font-extrabold tracking-tight text-[#0F172A] whitespace-nowrap shrink-0"
          >
            Extensão Saúde Ocular
          </a>

          {/* Zone 2: 5 single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a
              href="#campanha"
              className="hover:text-[#0F172A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Campanha
            </a>
            <a
              href="#simulador"
              className="hover:text-[#0F172A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Simulador Clínico
            </a>
            <a
              href="#infografico"
              className="hover:text-[#0F172A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Infográfico de Bolso
            </a>
            <a
              href="#certificado-10"
              className="hover:text-[#0F172A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Certificado Nº 10
            </a>
            <a
              href="#validador"
              className="hover:text-[#0F172A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Validador
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('certificado-10')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#E11D48] hover:bg-[#BE123C] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
            >
              Ver Certificado & PDF
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ===================================================================
            HERO & CAMPAIGN OVERVIEW SECTION
           =================================================================== */}
        <section
          id="campanha"
          className="bg-[#0F172A] text-white border-b border-slate-800 pt-10 pb-14 px-6 no-print"
        >
          <div className="max-w-[1320px] mx-auto">
            {/* Clean Unboxed Institutional Metadata Strip */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code text-slate-300 pb-6 border-b border-slate-800">
              <span className="text-[#FB7185] font-bold">CERTIFICADO Nº {certificateData.certNumber}</span>
              <span aria-hidden="true">·</span>
              <span>CÓD. {certificateData.code}</span>
              <span aria-hidden="true">·</span>
              <span>CHAVE {certificateData.controlKey}</span>
              <span aria-hidden="true">·</span>
              <span>LIVRO {certificateData.bookNumber}, FOLHA {certificateData.sheetNumber}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-semibold">
                ITEM 08 — EXTENSÃO E ATIVIDADE COMUNITÁRIA ({certificateData.totalHoursText.toUpperCase()})
              </span>
            </div>

            {/* 2-Column Balanced Hero Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch pt-8">
              {/* Left Column: Campaign Narrative & Actions (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-mono-code text-amber-400 tracking-wide">
                    PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO E EDUCAÇÃO EM SAÚDE OCULAR
                  </div>

                  <h1
                    className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-[1.15] mt-3"
                    style={{ textWrap: 'balance' }}
                  >
                    {certificateData.title}
                  </h1>

                  <p className="text-base text-slate-300 leading-relaxed mt-5 max-w-2xl">
                    Ação extensionista desenvolvida por{' '}
                    <strong className="text-white">{certificateData.holderName}</strong> ({certificateData.holderRole}
                    · CPF {certificateData.holderCpf} · {certificateData.holderInstitution}), voltada à prevenção da cegueira
                    evitável por acidentes químicos domésticos e ocupacionais, traumas perfurantes e
                    automedicação com colírios anestésicos ou receitas caseiras.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-slate-800/90">
                  <button
                    type="button"
                    onClick={() => scrollToSection('certificado-10')}
                    className="px-5 py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white text-sm font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
                  >
                    <FileCheck2 className="w-4 h-4" />
                    <span>Visualizar, Editar e Baixar Certificado Nº {certificateData.certNumber} (PDF)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('validador')}
                    className="px-5 py-3 bg-[#1D4ED8] hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Autenticador Público ({certificateData.code})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('comando-github')}
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-medium rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Terminal className="w-4 h-4 text-amber-400" />
                    <span>Comando GitHub</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Institutional Accreditation & Clinical Urgency Card (5 cols) */}
              <div className="lg:col-span-5 bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-700">
                    <div className="flex items-center gap-3">
                      <LogoEditoraMenteSaude size={48} />
                      <LogoCentroMariaDalva size={48} />
                    </div>
                    <div className="text-right font-mono-code text-xs">
                      <div className="text-emerald-400 font-bold">FÉ PÚBLICA VERIFICADA</div>
                      <div className="text-slate-400">{certificateData.period}</div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-xs sm:text-sm">
                    <div className="bg-[#0F172A]/90 border border-slate-800 rounded-xl p-3.5">
                      <div className="text-[11px] font-mono-code text-slate-400">
                        INSTITUIÇÕES CERTIFICADORAS PARCEIRAS
                      </div>
                      <div className="font-bold text-white mt-1">
                        Editora Mente e Saúde · CNPJ 51.372.335/0001-71
                      </div>
                      <div className="font-bold text-sky-300 mt-0.5">
                        Centro Profissionalizante Maria Dalva de Araújo · CNPJ 51.269.112/0001-83
                      </div>
                    </div>

                    <div className="bg-[#0F172A]/90 border border-slate-800 rounded-xl p-3.5">
                      <div className="text-[11px] font-mono-code text-amber-400">
                        IMPACTO CLÍNICO E EPIDEMIOLÓGICO DA CAMPANHA
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1">
                        Queimaduras oculares por álcalis (cimento, cal, soda cáustica) iniciam a
                        saponificação celular e penetração intraocular em menos de{' '}
                        <strong className="text-white">60 segundos</strong>. O acesso imediato ao
                        Infográfico de Bolso reduz o tempo para início da lavagem ocular no próprio
                        local do acidente.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs font-mono-code text-slate-300">
                  <span>TITULAR: {certificateData.holderName}</span>
                  <span className="text-amber-400 font-bold">CARGA HORÁRIA: {String(certificateData.totalHoursNumeric).padStart(2, '0')}H</span>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Quantitative Proof & Methodology Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-800">
              <div className="bg-[#1E293B]/70 border border-slate-800 rounded-xl p-4">
                <div className="text-xs font-mono-code text-[#FB7185]">
                  01. JANELA TERAPÊUTICA CRÍTICA
                </div>
                <div className="text-2xl font-extrabold font-mono-code text-white mt-1">
                  &lt; 10 Segundos
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Tempo máximo preconizado nos infográficos para iniciar a irrigação ocular contínua
                  no local do acidente químico.
                </p>
              </div>

              <div className="bg-[#1E293B]/70 border border-slate-800 rounded-xl p-4">
                <div className="text-xs font-mono-code text-sky-400">
                  02. PROTOCOLO DE IRRIGAÇÃO
                </div>
                <div className="text-2xl font-extrabold font-mono-code text-white mt-1">
                  15 a 30 Minutos
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Lavagem abundante com 2 a 3 litros de água corrente ou SF 0,9% até normalizar o pH
                  conjuntival (7,0–7,4).
                </p>
              </div>

              <div className="bg-[#1E293B]/70 border border-slate-800 rounded-xl p-4">
                <div className="text-xs font-mono-code text-amber-400">
                  03. METODOLOGIA EM 4 EIXOS
                </div>
                <div className="text-2xl font-extrabold font-mono-code text-white mt-1">
                  08 Horas Práticas
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Curadoria CBO/OMS (2h), Design de Infográficos (2h30), Combate a Fake News (1h30)
                  e Ação Comunitária SUS (2h).
                </p>
              </div>

              <div className="bg-[#1E293B]/70 border border-slate-800 rounded-xl p-4">
                <div className="text-xs font-mono-code text-emerald-400">
                  04. REDE PÚBLICA DE URGÊNCIA
                </div>
                <div className="text-2xl font-extrabold font-mono-code text-white mt-1">
                  192 · 193 · SUS
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Integração direta com SAMU 192, Corpo de Bombeiros 193, CIATox ANVISA e Centros de
                  Referência em Oftalmologia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SCIENTIFIC EXPLANATION OF THE CAMPAIGN (4 AXES & CLINICAL RATIONALE)
           =================================================================== */}
        <section className="py-14 px-6 border-b border-slate-200 bg-white no-print">
          <div className="max-w-[1320px] mx-auto">
            <div className="max-w-3xl">
              <div className="text-xs font-mono-code font-bold text-[#E11D48] uppercase tracking-wider">
                FUNDAMENTAÇÃO CIENTÍFICA E PEDAGÓGICA DA AÇÃO EXTENSIONISTA
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5">
                Por que um Infográfico de Bolso sobre Traumas e Queimaduras Químicas Salva a Visão?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-3">
                Na prática oftalmológica de urgência, a maioria das perdas visuais irreversíveis por
                agentes químicos ou traumas mecânicos não ocorre por falta de recursos cirúrgicos no
                hospital, mas por <strong>condutas equivocadas nos primeiros 5 minutos</strong> após
                o acidente — seja pela demora em lavar uma queimadura por álcali, seja pela
                compressão indevida de um olho perfurado.
              </p>
            </div>

            {/* 3 Clinical Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-[#FFF1F2]/70 rounded-2xl border border-[#FECDD3] p-6">
                <div className="text-xs font-mono-code font-bold text-[#E11D48]">
                  PILAR 01 · DIFERENCIAÇÃO QUÍMICA CRÍTICA
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1.5">
                  Álcalis (Saponificação) vs. Ácidos (Coagulação)
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2.5">
                  Produtos alcalinos como <strong>cal, argamassa, cimento, soda cáustica e amônia</strong>{' '}
                  saponificam os lipídios celulares e destroem o estroma e o limbo corneano em
                  segundos. Já os ácidos (baterias, ácido muriático) coagulam proteínas superficiais.
                  Em ambos os casos, a lavagem imediata no local por 15 a 30 minutos é a única medida
                  capaz de impedir a isquemia limbar.
                </p>
              </div>

              <div className="bg-blue-50/70 rounded-2xl border border-blue-200 p-6">
                <div className="text-xs font-mono-code font-bold text-[#1D4ED8]">
                  PILAR 02 · BIOMECÂNICA DO TRAUMA OCULAR
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1.5">
                  Quando Lavar vs. Quando Proteger com Escudo Rígido
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2.5">
                  A população frequentemente confunde a conduta: em queimaduras químicas, deve-se
                  lavar abundantemente; porém, em <strong>traumas perfurantes ou cortes</strong>{' '}
                  (vidro, arame, estilhaço metálico), é estritamente proibido lavar ou comprimir. O
                  infográfico ensina a técnica do <strong>copinho descartável apoiado no rebordo orbitário</strong>.
                </p>
              </div>

              <div className="bg-amber-50/70 rounded-2xl border border-amber-200 p-6">
                <div className="text-xs font-mono-code font-bold text-[#D97706]">
                  PILAR 03 · COMBATE À DESINFORMAÇÃO E AUTOMEDICAÇÃO
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1.5">
                  O Perigo dos Colírios Anestésicos e Receitas Caseiras
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2.5">
                  Trabalhadores expostos a arco de solda elétrica ou limalha de ferro frequentemente
                  utilizam <strong>colírios anestésicos por conta própria</strong> ou pingam leite,
                  óleo e chás. A campanha atua na desmistificação ativa dessas práticas que causam
                  ceratopatia tóxica, anel de ferrugem e úlceras corneanas graves.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            INTERACTIVE CLINICAL SIMULATOR SECTION
           =================================================================== */}
        <section id="simulador" className="py-14 px-6 border-b border-slate-200 no-print">
          <div className="max-w-[1320px] mx-auto">
            <OcularEmergencySimulator />
          </div>
        </section>

        {/* ===================================================================
            INTERACTIVE POCKET INFOGRAPHIC & COMMUNITY QUIZ SECTION
           =================================================================== */}
        <section id="infografico" className="py-14 px-6 border-b border-slate-200 bg-slate-100/60 no-print">
          <div className="max-w-[1320px] mx-auto">
            <PocketInfographicSection />
          </div>
        </section>

        {/* ===================================================================
            OFFICIAL CERTIFICATE #10 VIEWER & PDF DOWNLOAD SECTION
           =================================================================== */}
        <section id="certificado-10" className="py-14 px-6 border-b border-slate-200 bg-white">
          <div className="max-w-[1320px] mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 no-print">
              <div>
                <div className="text-xs font-mono-code font-bold text-[#0F4C3A] uppercase tracking-wider">
                  DOCUMENTO OFICIAL DE 2 LAUDAS (FRENTE E VERSO) · MODELO 10 · ACESSÍVEL E EDITÁVEL
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Certificado Nº {certificateData.certNumber} — Visualização PDF Editável e Links Clicáveis
                </h2>
                <p className="text-sm text-slate-600 mt-1 max-w-3xl">
                  As duas laudas abaixo possuem <strong>QR Code e links de rodapé clicáveis</strong>{' '}
                  (tanto na tela quanto dentro do arquivo PDF baixado), camada de texto acessível e
                  permitem edição completa de campos, textos e da URL do site antes da exportação.
                </p>
              </div>

              <div className="text-xs font-mono-code text-slate-500 shrink-0">
                Formato Oficial: A4 Horizontal (297mm × 210mm)
              </div>
            </div>

            <CertificateDocument
              certificate={certificateData}
              onUpdateCertificate={setCertificateData}
              onValidateClick={() => scrollToSection('validador')}
            />
          </div>
        </section>

        {/* ===================================================================
            PUBLIC VALIDATOR & AUTHENTICATOR SECTION (#validador)
           =================================================================== */}
        <section id="validador" className="py-14 px-6 border-b border-slate-200 bg-[#F8FAFC] no-print">
          <div className="max-w-[1320px] mx-auto">
            <PublicValidatorSection
              certificate={certificateData}
              initialQueryCode={urlQueryCode}
              onScrollToCertificate={() => scrollToSection('certificado-10')}
            />
          </div>
        </section>

        {/* ===================================================================
            GITHUB REPOSITORY COMMAND / FULL-STACK PROMPT SECTION
           =================================================================== */}
        <section id="comando-github" className="py-14 px-6 bg-white no-print">
          <div className="max-w-[1320px] mx-auto">
            <GithubCommandSection />
          </div>
        </section>
      </main>

      {/* =====================================================================
          CLEAN INSTITUTIONAL FOOTER
         ===================================================================== */}
      <footer className="bg-[#0F172A] text-slate-400 border-t border-slate-800 py-10 px-6 no-print">
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs">
          <div className="space-y-1.5">
            <div className="font-bold text-white text-sm">
              Programa Interinstitucional de Extensão, Comunicação Científica e Educação em Saúde
            </div>
            <div>
              Editora Mente e Saúde (CNPJ: 51.372.335/0001-71) · Centro Profissionalizante Maria
              Dalva de Araújo (CNPJ: 51.269.112/0001-83)
            </div>
            <div className="font-mono-code text-slate-500">
              Registro Oficial: Certificado Nº 10 · Livro 01/2026, Folha 34 · Cód.{' '}
              {CERTIFICATE_10_DATA.code} · Chave {CERTIFICATE_10_DATA.controlKey}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-300 font-medium">
            <a href="#campanha" className="hover:text-white transition-colors">
              Campanha
            </a>
            <span>·</span>
            <a href="#simulador" className="hover:text-white transition-colors">
              Simulador
            </a>
            <span>·</span>
            <a href="#infografico" className="hover:text-white transition-colors">
              Infográfico de Bolso
            </a>
            <span>·</span>
            <a href="#certificado-10" className="hover:text-white transition-colors">
              Certificado Nº 10 (PDF)
            </a>
            <span>·</span>
            <a href="#validador" className="hover:text-white transition-colors">
              Validador Público
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
