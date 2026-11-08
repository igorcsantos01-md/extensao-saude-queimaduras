import React, { useRef, useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas-pro';
import {
  Download,
  FileCheck2,
  Printer,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  Loader2,
  Edit3,
  Link2,
  ExternalLink,
  RotateCw,
  Check,
  SlidersHorizontal,
} from 'lucide-react';
import { CertificateRecord, CERTIFICATE_10_DATA } from '../data/campaignData';
import {
  LogoEditoraMenteSaude,
  LogoCentroMariaDalva,
  SignatureBarbaraLima,
  SignatureJamesAraujo,
  OfficialPublicFaithSeal,
} from './CertificateGraphics';

interface CertificateDocumentProps {
  certificate: CertificateRecord;
  onUpdateCertificate: (updated: CertificateRecord) => void;
  onValidateClick?: () => void;
}

export const CertificateDocument: React.FC<CertificateDocumentProps> = ({
  certificate,
  onUpdateCertificate,
  onValidateClick,
}) => {
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const containerWrapperRef = useRef<HTMLDivElement>(null);

  const [viewMode, setViewMode] = useState<'both' | 'front' | 'back'>('both');
  const [scale, setScale] = useState<number>(0.85);
  const [autoFit, setAutoFit] = useState<boolean>(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [pdfSuccessMessage, setPdfSuccessMessage] = useState<boolean>(false);

  // Editability states
  const [showEditorPanel, setShowEditorPanel] = useState<boolean>(false);
  const [isDirectEditMode, setIsDirectEditMode] = useState<boolean>(false);

  // Dynamic site URL (defaults to current live origin, no hardcoded vercel.app)
  const defaultOrigin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://seu-dominio-aqui.com.br';

  const baseSiteUrl = (certificate.verificationUrlBase || defaultOrigin).replace(/\/+$/, '');
  const fullVerificationUrl = `${baseSiteUrl}/?codigo=${encodeURIComponent(
    certificate.code
  )}#validador`;

  useEffect(() => {
    const updateScale = () => {
      if (!autoFit || !containerWrapperRef.current) return;
      const availableWidth = containerWrapperRef.current.clientWidth - 32;
      const computed = Math.min(1, Math.max(0.32, availableWidth / 1122));
      setScale(Number(computed.toFixed(3)));
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [autoFit]);

  // Helper to attach clickable PDF link hotspots + accessible selectable text layer on a 297x210mm page
  const attachLinksAndAccessibleTextToPage = (
    pdf: jsPDF,
    pageEl: HTMLElement,
    fallbackVerificationUrl: string
  ) => {
    const pageRect = pageEl.getBoundingClientRect();
    if (pageRect.width === 0 || pageRect.height === 0) return;

    // 1. Attach clickable link annotations for every element with [data-pdf-link]
    const linkElements = pageEl.querySelectorAll<HTMLElement>('[data-pdf-link]');
    linkElements.forEach((el) => {
      const targetUrl = el.getAttribute('data-pdf-link') || fallbackVerificationUrl;
      const rect = el.getBoundingClientRect();
      const xMm = ((rect.left - pageRect.left) / pageRect.width) * 297;
      const yMm = ((rect.top - pageRect.top) / pageRect.height) * 210;
      const wMm = (rect.width / pageRect.width) * 297;
      const hMm = (rect.height / pageRect.height) * 210;

      if (wMm > 0 && hMm > 0) {
        pdf.link(xMm, yMm, wMm, hMm, { url: targetUrl });
      }
    });

    // 2. Embed invisible accessible/selectable text layer for screen readers and Ctrl+F / copy-paste
    const textBlocks = pageEl.querySelectorAll<HTMLElement>('[data-pdf-text]');
    pdf.setFont('helvetica', 'normal');
    textBlocks.forEach((el) => {
      const rawText = (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim();
      if (!rawText) return;
      const rect = el.getBoundingClientRect();
      const xMm = ((rect.left - pageRect.left) / pageRect.width) * 297;
      const yMm = ((rect.top - pageRect.top) / pageRect.height) * 210 + 3.5;
      const wMm = Math.max(20, (rect.width / pageRect.width) * 297);

      pdf.setFontSize(8.5);
      pdf.text(rawText, xMm, yMm, {
        maxWidth: wMm,
        renderingMode: 'invisible',
      });
    });
  };

  const handleDownloadPdf = async () => {
    if (!page1Ref.current || !page2Ref.current || isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    setPdfSuccessMessage(false);

    // Temporarily disable direct-edit dashed outlines while capturing
    const previousDirectEdit = isDirectEditMode;
    if (previousDirectEdit) {
      setIsDirectEditMode(false);
      await new Promise((r) => setTimeout(r, 80));
    }

    const previousViewMode = viewMode;
    if (previousViewMode !== 'both') {
      setViewMode('both');
      await new Promise((r) => setTimeout(r, 80));
    }

    try {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      // Set accessible PDF document metadata
      pdf.setProperties({
        title: `Certificado Nº ${certificate.certNumber} - ${certificate.holderName} (${certificate.code})`,
        subject: `${certificate.title} — Atividade de Extensão (${certificate.totalHoursText})`,
        author:
          'Editora Mente e Saúde (CNPJ: 51.372.335/0001-71) e Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)',
        keywords: `Certificado, Extensão, ${certificate.code}, ${certificate.controlKey}, ${certificate.holderName}, Primeiros Socorros Oculares`,
        creator: 'Sistema Interinstitucional de Certificação e Fé Pública EMS & CPMDA',
      });

      const renderOptions = {
        scale: 2.6,
        useCORS: true,
        backgroundColor: '#FAF9F6',
        width: 1122,
        height: 794,
        windowWidth: 1200,
        windowHeight: 900,
      };

      // Capture Page 1 (Frente) + Add Clickable Links & Accessible Text Layer
      const canvas1 = await html2canvas(page1Ref.current, renderOptions);
      const imgData1 = canvas1.toDataURL('image/jpeg', 0.98);
      pdf.addImage(imgData1, 'JPEG', 0, 0, 297, 210, undefined, 'FAST');
      attachLinksAndAccessibleTextToPage(pdf, page1Ref.current, fullVerificationUrl);

      // Capture Page 2 (Verso) + Add Clickable Links & Accessible Text Layer
      pdf.addPage('a4', 'landscape');
      const canvas2 = await html2canvas(page2Ref.current, renderOptions);
      const imgData2 = canvas2.toDataURL('image/jpeg', 0.98);
      pdf.addImage(imgData2, 'JPEG', 0, 0, 297, 210, undefined, 'FAST');
      attachLinksAndAccessibleTextToPage(pdf, page2Ref.current, fullVerificationUrl);

      const cleanHolder = certificate.holderName
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '_');
      const fileName = `Certificado_Extensao_${certificate.certNumber}_${certificate.code}_${cleanHolder}.pdf`;
      pdf.save(fileName);

      setPdfSuccessMessage(true);
      setTimeout(() => setPdfSuccessMessage(false), 6000);
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      window.print();
    } finally {
      if (previousDirectEdit) setIsDirectEditMode(true);
      if (previousViewMode !== 'both') setViewMode(previousViewMode);
      setIsGeneratingPdf(false);
    }
  };

  const handleResetDefault = () => {
    onUpdateCertificate({
      ...CERTIFICATE_10_DATA,
      verificationUrlBase:
        typeof window !== 'undefined' && window.location.origin ? window.location.origin : '',
    });
  };

  return (
    <div className="w-full">
      {/* Control Toolbar for Embedded PDF Style Viewer & Editor */}
      <div className="bg-[#0F172A] text-white rounded-t-2xl border border-[#1E293B] p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E11D48]/15 border border-[#E11D48]/40 flex items-center justify-center text-[#FB7185]">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-mono-code">
              <span>PDF ACESSÍVEL & EDITÁVEL</span>
              <span>·</span>
              <span className="text-emerald-400">QR CODE & RODAPÉ CLICÁVEIS</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Certificado_Extensao_{certificate.certNumber}_{certificate.code}.pdf
            </h3>
          </div>
        </div>

        {/* Interactive View, Edit & Export Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle Form Editor Panel */}
          <button
            type="button"
            onClick={() => setShowEditorPanel((v) => !v)}
            className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              showEditorPanel
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-[#1E293B] text-amber-300 border-slate-700 hover:bg-slate-800'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showEditorPanel ? 'Fechar Painel Editor' : 'Editar Dados / URL do Site'}</span>
          </button>

          {/* Toggle Direct Inline ContentEditable on the PDF Canvas */}
          <button
            type="button"
            onClick={() => setIsDirectEditMode((v) => !v)}
            className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              isDirectEditMode
                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                : 'bg-[#1E293B] text-emerald-300 border-slate-700 hover:bg-slate-800'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>
              {isDirectEditMode ? 'Edição Direta no Texto: ATIVA' : 'Editar Texto Direto no PDF'}
            </span>
          </button>

          {/* Segmented Page Selector */}
          <div className="flex items-center bg-[#1E293B] p-1 rounded-lg border border-slate-700/80">
            <button
              type="button"
              onClick={() => setViewMode('both')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewMode === 'both'
                  ? 'bg-[#1D4ED8] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              2 Laudas
            </button>
            <button
              type="button"
              onClick={() => setViewMode('front')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewMode === 'front'
                  ? 'bg-[#1D4ED8] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Frente
            </button>
            <button
              type="button"
              onClick={() => setViewMode('back')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewMode === 'back'
                  ? 'bg-[#1D4ED8] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Verso
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="hidden xl:flex items-center bg-[#1E293B] p-1 rounded-lg border border-slate-700/80 gap-1">
            <button
              type="button"
              onClick={() => {
                setAutoFit(false);
                setScale((s) => Math.max(0.45, Number((s - 0.1).toFixed(2))));
              }}
              title="Reduzir Zoom"
              className="p-1.5 text-slate-300 hover:text-white rounded cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 text-xs font-mono-code text-slate-200">
              {Math.round(scale * 100)}%
            </span>
            <button
              type="button"
              onClick={() => {
                setAutoFit(false);
                setScale((s) => Math.min(1.15, Number((s + 0.1).toFixed(2))));
              }}
              title="Aumentar Zoom"
              className="p-1.5 text-slate-300 hover:text-white rounded cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setAutoFit(true)}
              title="Ajustar à Largura"
              className="p-1.5 text-slate-300 hover:text-white rounded cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Primary Download PDF Button (with Clickable Links & Accessible Text Layer) */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="flex items-center gap-2 px-4 py-2 bg-[#E11D48] hover:bg-[#BE123C] disabled:opacity-60 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Gerando PDF Clicável...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Baixar PDF com Links Clicáveis</span>
              </>
            )}
          </button>

          {/* Native Vector Printable/Editable PDF Button */}
          <button
            type="button"
            onClick={() => window.print()}
            title="Salvar como PDF Vetorial 100% Editável via Navegador"
            className="px-3 py-2 bg-[#1E293B] hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-sky-400" />
            <span className="hidden sm:inline">PDF Vetorial Nativo</span>
          </button>
        </div>
      </div>

      {/* Collapsible Live Certificate & URL Editor Drawer */}
      {showEditorPanel && (
        <div className="bg-[#1E293B] border-x border-b border-slate-700 p-5 sm:p-6 text-white no-print">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-700">
            <div>
              <div className="text-xs font-mono-code text-amber-400 font-bold uppercase">
                EDITOR EM TEMPO REAL DO CERTIFICADO Nº 10 E CONFIGURAÇÃO DE URL DO VALIDADOR
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Altere qualquer campo abaixo (ou ative &ldquo;Editar Texto Direto no PDF&rdquo; para
                clicar diretamente sobre o certificado). O QR Code e os links clicáveis são
                atualizados instantaneamente.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetDefault}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Restaurar Padrão Modelo 10</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {/* Dynamic Site Base URL Input (Highlighted) */}
            <div className="lg:col-span-2 bg-[#0F172A] p-3.5 rounded-xl border border-amber-500/40">
              <label className="block text-xs font-mono-code font-bold text-amber-400 mb-1">
                URL Base do Site (Usada no QR Code Clicável e no Rodapé — Sem Vercel fixo):
              </label>
              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-amber-400 shrink-0" />
                <input
                  type="text"
                  value={certificate.verificationUrlBase}
                  onChange={(e) =>
                    onUpdateCertificate({
                      ...certificate,
                      verificationUrlBase: e.target.value.trim(),
                    })
                  }
                  placeholder="Ex: https://seu-site.com.br (vazio usa a URL atual automaticamente)"
                  className="w-full bg-[#1E293B] border border-slate-700 focus:border-amber-400 rounded-lg px-3 py-1.5 text-xs font-mono-code text-white outline-none"
                />
              </div>
              <div className="text-[11px] font-mono-code text-slate-400 mt-1.5 truncate">
                Link ativo gerado: <span className="text-emerald-400">{fullVerificationUrl}</span>
              </div>
            </div>

            {/* Code & Control Key */}
            <div className="bg-[#0F172A] p-3.5 rounded-xl border border-slate-800">
              <label className="block text-xs font-mono-code text-slate-400 mb-1">
                Código de Autenticidade:
              </label>
              <input
                type="text"
                value={certificate.code}
                onChange={(e) =>
                  onUpdateCertificate({ ...certificate, code: e.target.value })
                }
                className="w-full bg-[#1E293B] border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono-code text-white outline-none"
              />
              <label className="block text-xs font-mono-code text-slate-400 mt-2 mb-1">
                Chave de Controle:
              </label>
              <input
                type="text"
                value={certificate.controlKey}
                onChange={(e) =>
                  onUpdateCertificate({ ...certificate, controlKey: e.target.value })
                }
                className="w-full bg-[#1E293B] border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono-code text-white outline-none"
              />
            </div>

            {/* Cert Number, Book, Sheet */}
            <div className="bg-[#0F172A] p-3.5 rounded-xl border border-slate-800">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-mono-code text-slate-400 mb-1">
                    Cert. Nº
                  </label>
                  <input
                    type="text"
                    value={certificate.certNumber}
                    onChange={(e) =>
                      onUpdateCertificate({ ...certificate, certNumber: e.target.value })
                    }
                    className="w-full bg-[#1E293B] border border-slate-700 rounded-lg px-2 py-1.5 text-xs font-mono-code text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono-code text-slate-400 mb-1">
                    Livro nº
                  </label>
                  <input
                    type="text"
                    value={certificate.bookNumber}
                    onChange={(e) =>
                      onUpdateCertificate({ ...certificate, bookNumber: e.target.value })
                    }
                    className="w-full bg-[#1E293B] border border-slate-700 rounded-lg px-2 py-1.5 text-xs font-mono-code text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono-code text-slate-400 mb-1">
                    Folha
                  </label>
                  <input
                    type="text"
                    value={certificate.sheetNumber}
                    onChange={(e) =>
                      onUpdateCertificate({ ...certificate, sheetNumber: e.target.value })
                    }
                    className="w-full bg-[#1E293B] border border-slate-700 rounded-lg px-2 py-1.5 text-xs font-mono-code text-white outline-none"
                  />
                </div>
              </div>
              <label className="block text-[11px] font-mono-code text-slate-400 mt-2 mb-1">
                Período & Carga Horária:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={certificate.period}
                  onChange={(e) =>
                    onUpdateCertificate({
                      ...certificate,
                      period: e.target.value,
                      frontBodyParagraph1: {
                        ...certificate.frontBodyParagraph1,
                        boldPeriod: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#1E293B] border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white outline-none"
                />
                <input
                  type="text"
                  value={certificate.totalHoursText}
                  onChange={(e) =>
                    onUpdateCertificate({
                      ...certificate,
                      totalHoursText: e.target.value,
                      frontBodyParagraph1: {
                        ...certificate.frontBodyParagraph1,
                        boldHours: `${e.target.value}.`,
                      },
                    })
                  }
                  className="w-full bg-[#1E293B] border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white outline-none"
                />
              </div>
            </div>

            {/* Holder Name & CPF */}
            <div className="bg-[#0F172A] p-3.5 rounded-xl border border-slate-800">
              <label className="block text-xs font-mono-code text-slate-400 mb-1">
                Nome do Titular:
              </label>
              <input
                type="text"
                value={certificate.holderName}
                onChange={(e) =>
                  onUpdateCertificate({ ...certificate, holderName: e.target.value })
                }
                className="w-full bg-[#1E293B] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
              />
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <label className="block text-[11px] font-mono-code text-slate-400 mb-1">
                    CPF:
                  </label>
                  <input
                    type="text"
                    value={certificate.holderCpf}
                    onChange={(e) =>
                      onUpdateCertificate({ ...certificate, holderCpf: e.target.value })
                    }
                    className="w-full bg-[#1E293B] border border-slate-700 rounded-lg px-2 py-1.5 text-xs font-mono-code text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono-code text-slate-400 mb-1">
                    Qualificação:
                  </label>
                  <input
                    type="text"
                    value={certificate.holderRole}
                    onChange={(e) =>
                      onUpdateCertificate({ ...certificate, holderRole: e.target.value })
                    }
                    className="w-full bg-[#1E293B] border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Institution & Issue Date */}
            <div className="bg-[#0F172A] p-3.5 rounded-xl border border-slate-800">
              <label className="block text-xs font-mono-code text-slate-400 mb-1">
                Instituição de Origem:
              </label>
              <input
                type="text"
                value={certificate.holderInstitution}
                onChange={(e) =>
                  onUpdateCertificate({ ...certificate, holderInstitution: e.target.value })
                }
                className="w-full bg-[#1E293B] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
              />
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <label className="block text-[11px] font-mono-code text-slate-400 mb-1">
                    Cidade / UF:
                  </label>
                  <input
                    type="text"
                    value={certificate.cityState}
                    onChange={(e) =>
                      onUpdateCertificate({ ...certificate, cityState: e.target.value })
                    }
                    className="w-full bg-[#1E293B] border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono-code text-slate-400 mb-1">
                    Data de Emissão:
                  </label>
                  <input
                    type="text"
                    value={certificate.issueDate}
                    onChange={(e) =>
                      onUpdateCertificate({ ...certificate, issueDate: e.target.value })
                    }
                    className="w-full bg-[#1E293B] border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Campaign Title */}
            <div className="lg:col-span-2 bg-[#0F172A] p-3.5 rounded-xl border border-slate-800">
              <label className="block text-xs font-mono-code text-slate-400 mb-1">
                Título Oficial da Campanha (Modelo 10):
              </label>
              <input
                type="text"
                value={certificate.title}
                onChange={(e) =>
                  onUpdateCertificate({
                    ...certificate,
                    title: e.target.value,
                    frontBodyParagraph1: {
                      ...certificate.frontBodyParagraph1,
                      boldTitle: `“${e.target.value}”`,
                    },
                  })
                }
                className="w-full bg-[#1E293B] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
              />
              <label className="block text-[11px] font-mono-code text-slate-400 mt-2 mb-1">
                Hash Criptográfico SHA-256:
              </label>
              <input
                type="text"
                value={certificate.sha256}
                onChange={(e) =>
                  onUpdateCertificate({ ...certificate, sha256: e.target.value })
                }
                className="w-full bg-[#1E293B] border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono-code text-slate-300 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Direct Edit Mode Helper Banner */}
      {isDirectEditMode && (
        <div className="bg-blue-950 border-x border-b border-blue-700 px-6 py-2.5 text-blue-100 text-xs flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-sky-400 shrink-0" />
            <span>
              <strong>Modo Edição Direta Ativo:</strong> Clique diretamente sobre qualquer texto do
              certificado abaixo (Lauda 1 ou Lauda 2) para editar como em um editor de documentos. Ao
              clicar em &ldquo;Baixar PDF&rdquo;, as marcações tracejadas são ocultadas
              automaticamente.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsDirectEditMode(false)}
            className="px-3 py-1 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-md whitespace-nowrap cursor-pointer"
          >
            Concluir Edição
          </button>
        </div>
      )}

      {/* Download confirmation banner */}
      {pdfSuccessMessage && (
        <div className="bg-emerald-950 border-x border-b border-emerald-700/60 px-6 py-3 text-emerald-200 text-xs sm:text-sm flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              PDF gerado com sucesso! O arquivo inclui{' '}
              <strong className="text-white">
                links clicáveis ativos no QR Code e no rodapé
              </strong>{' '}
              apontando para <span className="font-mono-code text-emerald-300">{fullVerificationUrl}</span>{' '}
              e camada de texto acessível.
            </span>
          </div>
          {onValidateClick && (
            <button
              type="button"
              onClick={onValidateClick}
              className="underline font-semibold text-emerald-300 hover:text-white ml-4 whitespace-nowrap cursor-pointer"
            >
              Testar no Validador →
            </button>
          )}
        </div>
      )}

      {/* Embedded PDF Stage Canvas */}
      <div
        ref={containerWrapperRef}
        className="print-cert-stage w-full bg-[#1E293B]/95 border-x border-b border-[#1E293B] rounded-b-2xl py-8 px-4 flex flex-col items-center gap-10 overflow-x-auto"
      >
        {/* ===================================================================
            LAUDA 1 — FRENTE DO CERTIFICADO Nº 10 (1122px x 794px A4 Landscape)
           =================================================================== */}
        <div
          className={`flex flex-col items-center ${
            viewMode === 'back' ? 'hidden' : 'flex'
          }`}
        >
          <div className="flex items-center justify-between w-full max-w-[1122px] mb-2 px-1 text-xs text-slate-300 no-print">
            <span className="font-mono-code">
              LAUDA 01 / 02 — FRENTE OFICIAL DO CERTIFICADO (A4 PAISAGEM · 297mm × 210mm)
            </span>
            <span className="text-emerald-400 font-mono-code flex items-center gap-1">
              <Link2 className="w-3.5 h-3.5" />
              QR Code e Rodapé com Link Clicável Ativo
            </span>
          </div>

          <div
            style={{
              width: `${Math.round(1122 * scale)}px`,
              height: `${Math.round(794 * scale)}px`,
              position: 'relative',
            }}
            className="print-cert-page-wrapper shadow-2xl rounded-sm overflow-hidden shrink-0"
          >
            <div
              ref={page1Ref}
              style={{
                width: '1122px',
                height: '794px',
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                backgroundColor: '#FAF9F6',
                color: '#0F172A',
                padding: '18px',
                boxSizing: 'border-box',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
              className="print-cert-page-inner"
            >
              {/* Outer Green Institutional Border */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  border: '2.5px solid #0F4C3A',
                  padding: '5px',
                  boxSizing: 'border-box',
                }}
              >
                {/* Inner Navy Institutional Border */}
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    border: '1.5px solid #1B365D',
                    padding: '22px 34px 16px 34px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                  }}
                >
                  {/* 1. HEADER: Institutional Partnership */}
                  <div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '320px 1fr 320px',
                        alignItems: 'center',
                        paddingBottom: '14px',
                        borderBottom: '1.5px solid #CBD5E1',
                      }}
                    >
                      {/* Left Institution: Editora Mente e Saúde */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <LogoEditoraMenteSaude size={62} />
                        <div
                          data-pdf-text="true"
                          contentEditable={isDirectEditMode}
                          suppressContentEditableWarning
                          className="cert-inline-editable"
                          style={{ lineHeight: 1.25 }}
                        >
                          <div
                            style={{
                              fontSize: '13.5px',
                              fontWeight: 800,
                              color: '#0F4C3A',
                              letterSpacing: '0.02em',
                            }}
                          >
                            EDITORA MENTE E SAÚDE
                          </div>
                          <div
                            style={{
                              fontSize: '10.5px',
                              fontWeight: 700,
                              color: '#334155',
                              fontFamily: "'IBM Plex Mono', monospace",
                              marginTop: '2px',
                            }}
                          >
                            CNPJ: 51.372.335/0001-71
                          </div>
                          <div
                            style={{
                              fontSize: '10px',
                              fontWeight: 600,
                              color: '#0F4C3A',
                              marginTop: '2px',
                            }}
                          >
                            Conselho Editorial e Extensão Científica
                          </div>
                        </div>
                      </div>

                      {/* Center Program Header */}
                      <div
                        data-pdf-text="true"
                        contentEditable={isDirectEditMode}
                        suppressContentEditableWarning
                        className="cert-inline-editable"
                        style={{ textAlign: 'center', padding: '0 8px' }}
                      >
                        <div
                          style={{
                            fontSize: '10.5px',
                            fontWeight: 800,
                            color: '#1E293B',
                            letterSpacing: '0.06em',
                            lineHeight: 1.35,
                            textTransform: 'uppercase',
                          }}
                        >
                          PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO,
                          <br />
                          COMUNICAÇÃO CIENTÍFICA E EDUCAÇÃO EM SAÚDE
                        </div>
                        <div
                          style={{
                            fontSize: '10.2px',
                            fontWeight: 700,
                            color: '#334155',
                            fontFamily: "'IBM Plex Mono', monospace",
                            marginTop: '6px',
                          }}
                        >
                          Certificado Nº {certificate.certNumber} · Livro de Extensão nº{' '}
                          {certificate.bookNumber} · Cód. {certificate.code}
                        </div>
                      </div>

                      {/* Right Institution: Centro Profissionalizante Maria Dalva de Araújo */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          gap: '12px',
                        }}
                      >
                        <div
                          data-pdf-text="true"
                          contentEditable={isDirectEditMode}
                          suppressContentEditableWarning
                          className="cert-inline-editable"
                          style={{ textAlign: 'right', lineHeight: 1.25 }}
                        >
                          <div
                            style={{
                              fontSize: '12.5px',
                              fontWeight: 800,
                              color: '#1B365D',
                              letterSpacing: '0.02em',
                            }}
                          >
                            CENTRO PROFISSIONALIZANTE
                            <br />
                            MARIA DALVA DE ARAÚJO
                          </div>
                          <div
                            style={{
                              fontSize: '10.5px',
                              fontWeight: 700,
                              color: '#334155',
                              fontFamily: "'IBM Plex Mono', monospace",
                              marginTop: '3px',
                            }}
                          >
                            CNPJ: 51.269.112/0001-83
                          </div>
                        </div>
                        <LogoCentroMariaDalva size={62} />
                      </div>
                    </div>

                    {/* 2. MAIN CERTIFICATE TITLE */}
                    <div
                      data-pdf-text="true"
                      contentEditable={isDirectEditMode}
                      suppressContentEditableWarning
                      className="cert-inline-editable"
                      style={{ textAlign: 'center', marginTop: '18px' }}
                    >
                      <h1
                        style={{
                          fontFamily: "'Libre Baskerville', Georgia, serif",
                          fontSize: '29px',
                          fontWeight: 700,
                          color: '#0F4C3A',
                          letterSpacing: '0.045em',
                          margin: 0,
                        }}
                      >
                        CERTIFICADO DE ATIVIDADE DE EXTENSÃO
                      </h1>
                      <p
                        style={{
                          fontSize: '13.2px',
                          color: '#1E293B',
                          marginTop: '10px',
                          marginBottom: '12px',
                          lineHeight: 1.45,
                        }}
                      >
                        A <strong style={{ fontWeight: 700 }}>Editora Mente e Saúde</strong> (CNPJ:
                        51.372.335/0001-71), em parceria institucional com o{' '}
                        <strong style={{ fontWeight: 700 }}>
                          Centro Profissionalizante Maria Dalva de Araújo
                        </strong>{' '}
                        (CNPJ:
                        <br />
                        51.269.112/0001-83), certifica para os devidos fins de comprovação
                        curricular e acadêmica que
                      </p>
                    </div>

                    {/* 3. RECIPIENT HIGHLIGHT BOX */}
                    <div
                      data-pdf-text="true"
                      contentEditable={isDirectEditMode}
                      suppressContentEditableWarning
                      className="cert-inline-editable"
                      style={{
                        backgroundColor: '#F3F1E8',
                        border: '1px solid #DCD7C6',
                        padding: '12px 24px',
                        textAlign: 'center',
                        margin: '0 auto 14px auto',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Libre Baskerville', Georgia, serif",
                          fontSize: '25px',
                          fontWeight: 700,
                          color: '#0F172A',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {certificate.holderName}
                      </div>
                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: '#1E293B',
                          marginTop: '4px',
                        }}
                      >
                        {certificate.holderRole} | CPF: {certificate.holderCpf} |{' '}
                        {certificate.holderInstitution}
                      </div>
                    </div>

                    {/* 4. BODY PARAGRAPHS */}
                    <div
                      data-pdf-text="true"
                      contentEditable={isDirectEditMode}
                      suppressContentEditableWarning
                      className="cert-inline-editable"
                      style={{
                        fontSize: '13.1px',
                        lineHeight: 1.55,
                        color: '#111827',
                        textAlign: 'justify',
                      }}
                    >
                      <p style={{ margin: '0 0 10px 0' }}>
                        {certificate.frontBodyParagraph1.prefix}
                        <strong style={{ fontWeight: 700 }}>
                          {certificate.frontBodyParagraph1.bold1}
                        </strong>
                        {certificate.frontBodyParagraph1.middle1}
                        <strong style={{ fontWeight: 700 }}>
                          {certificate.frontBodyParagraph1.boldTitle}
                        </strong>
                        {certificate.frontBodyParagraph1.middle2}
                        <strong style={{ fontWeight: 700 }}>
                          {certificate.frontBodyParagraph1.boldModality}
                        </strong>
                        {certificate.frontBodyParagraph1.middle3}
                        <strong style={{ fontWeight: 700 }}>
                          {certificate.frontBodyParagraph1.boldPeriod}
                        </strong>
                        {certificate.frontBodyParagraph1.middle4}
                        <strong style={{ fontWeight: 700 }}>
                          {certificate.frontBodyParagraph1.boldHours}
                        </strong>
                      </p>

                      <p style={{ margin: 0 }}>
                        {certificate.frontBodyParagraph2.text1}
                        <strong style={{ fontWeight: 700 }}>
                          {certificate.frontBodyParagraph2.bold1}
                        </strong>
                        {certificate.frontBodyParagraph2.text2}
                        <strong style={{ fontWeight: 700 }}>
                          {certificate.frontBodyParagraph2.bold2}
                        </strong>
                        {certificate.frontBodyParagraph2.text3}
                        <strong style={{ fontWeight: 700 }}>
                          {certificate.frontBodyParagraph2.bold3}
                        </strong>
                        {certificate.frontBodyParagraph2.text4}
                      </p>
                    </div>

                    {/* 5. LOCATION AND ISSUE DATE */}
                    <div
                      data-pdf-text="true"
                      contentEditable={isDirectEditMode}
                      suppressContentEditableWarning
                      className="cert-inline-editable"
                      style={{
                        textAlign: 'center',
                        marginTop: '14px',
                        fontFamily: "'Libre Baskerville', Georgia, serif",
                        fontSize: '15.5px',
                        fontWeight: 700,
                        fontStyle: 'italic',
                        color: '#0F172A',
                      }}
                    >
                      {certificate.cityState}, {certificate.issueDate}.
                    </div>
                  </div>

                  {/* 6. FOOTER: Signatures, Seal, Clickable QR Code & Clickable Manual Auth Box */}
                  <div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '285px 1fr 285px',
                        alignItems: 'end',
                        gap: '12px',
                        marginBottom: '10px',
                      }}
                    >
                      {/* Left Signature: Bárbara Lima dos Santos */}
                      <div style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '-4px',
                          }}
                        >
                          <SignatureBarbaraLima width={185} height={50} />
                        </div>
                        <div
                          data-pdf-text="true"
                          contentEditable={isDirectEditMode}
                          suppressContentEditableWarning
                          className="cert-inline-editable"
                          style={{
                            borderTop: '1.2px solid #334155',
                            paddingTop: '5px',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '11.5px',
                              fontWeight: 800,
                              color: '#0F172A',
                              letterSpacing: '0.02em',
                            }}
                          >
                            BÁRBARA LIMA DOS SANTOS
                          </div>
                          <div
                            style={{
                              fontSize: '10px',
                              fontWeight: 600,
                              color: '#334155',
                              marginTop: '1px',
                            }}
                          >
                            Editora-Chefe e Coordenadora de Extensão Editorial
                          </div>
                          <div
                            style={{
                              fontSize: '9px',
                              fontWeight: 700,
                              color: '#475569',
                              fontFamily: "'IBM Plex Mono', monospace",
                              marginTop: '2px',
                            }}
                          >
                            Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)
                          </div>
                        </div>
                      </div>

                      {/* Center Verification Cluster: Seal + Clickable QR Code + Manual Auth Box */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                        }}
                      >
                        <OfficialPublicFaithSeal code={certificate.code} size={88} />

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            padding: '6px 10px',
                            gap: '10px',
                          }}
                        >
                          {/* Clickable QR Code Link (Works on Web AND inside Downloaded PDF!) */}
                          <a
                            href={fullVerificationUrl}
                            data-pdf-link={fullVerificationUrl}
                            title={`Verificar autenticidade: ${fullVerificationUrl}`}
                            onClick={(e) => {
                              if (onValidateClick && baseSiteUrl === defaultOrigin) {
                                e.preventDefault();
                                onValidateClick();
                              }
                            }}
                            style={{
                              padding: '2px',
                              backgroundColor: '#FFFFFF',
                              display: 'block',
                              cursor: 'pointer',
                            }}
                          >
                            <QRCodeSVG
                              value={fullVerificationUrl}
                              size={76}
                              level="M"
                              bgColor="#FFFFFF"
                              fgColor="#0F172A"
                            />
                          </a>

                          <div
                            data-pdf-text="true"
                            style={{
                              textAlign: 'left',
                              fontSize: '8.5px',
                              lineHeight: 1.35,
                              color: '#1E293B',
                              maxWidth: '162px',
                            }}
                          >
                            <div
                              style={{
                                fontWeight: 800,
                                fontSize: '9px',
                                color: '#0F4C3A',
                                marginBottom: '2px',
                              }}
                            >
                              AUTENTICAÇÃO PÚBLICA MANUAL
                            </div>
                            <div style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                              <strong>Cód.:</strong> {certificate.code}
                            </div>
                            <div style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                              <strong>Chave:</strong> {certificate.controlKey}
                            </div>
                            <div style={{ marginTop: '3px', fontWeight: 700, color: '#334155' }}>
                              Endereço p/ Verificação Online:
                            </div>
                            <a
                              href={fullVerificationUrl}
                              data-pdf-link={fullVerificationUrl}
                              onClick={(e) => {
                                if (onValidateClick && baseSiteUrl === defaultOrigin) {
                                  e.preventDefault();
                                  onValidateClick();
                                }
                              }}
                              style={{
                                fontFamily: "'IBM Plex Mono', monospace",
                                fontSize: '7.5px',
                                color: '#1D4ED8',
                                textDecoration: 'underline',
                                wordBreak: 'break-all',
                                display: 'inline-block',
                              }}
                            >
                              {baseSiteUrl}/?codigo={certificate.code}#validador
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Right Signature: James Araújo de Santana */}
                      <div style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '-4px',
                          }}
                        >
                          <SignatureJamesAraujo width={190} height={50} />
                        </div>
                        <div
                          data-pdf-text="true"
                          contentEditable={isDirectEditMode}
                          suppressContentEditableWarning
                          className="cert-inline-editable"
                          style={{
                            borderTop: '1.2px solid #334155',
                            paddingTop: '5px',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '11.5px',
                              fontWeight: 800,
                              color: '#0F172A',
                              letterSpacing: '0.02em',
                            }}
                          >
                            JAMES ARAÚJO DE SANTANA
                          </div>
                          <div
                            style={{
                              fontSize: '10px',
                              fontWeight: 600,
                              color: '#334155',
                              marginTop: '1px',
                            }}
                          >
                            Coordenador de Extensão e Projetos Educativos
                          </div>
                          <div
                            style={{
                              fontSize: '8.8px',
                              fontWeight: 700,
                              color: '#475569',
                              fontFamily: "'IBM Plex Mono', monospace",
                              marginTop: '2px',
                            }}
                          >
                            Centro Profissionalizante Maria Dalva de Araújo (CNPJ:
                            51.269.112/0001-83)
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Fine Clickable Verification Bar */}
                    <div
                      data-pdf-text="true"
                      style={{
                        borderTop: '1px solid #CBD5E1',
                        paddingTop: '6px',
                        textAlign: 'center',
                        fontSize: '9.4px',
                        fontWeight: 600,
                        color: '#334155',
                        fontFamily: "'IBM Plex Mono', monospace",
                      }}
                    >
                      Verifique via QR Code ou acesse{' '}
                      <a
                        href={fullVerificationUrl}
                        data-pdf-link={fullVerificationUrl}
                        onClick={(e) => {
                          if (onValidateClick && baseSiteUrl === defaultOrigin) {
                            e.preventDefault();
                            onValidateClick();
                          }
                        }}
                        style={{
                          color: '#1D4ED8',
                          fontWeight: 700,
                          textDecoration: 'underline',
                        }}
                      >
                        {fullVerificationUrl}
                      </a>{' '}
                      informando o Código <strong style={{ color: '#0F172A' }}>{certificate.code}</strong>{' '}
                      ou Chave <strong style={{ color: '#0F172A' }}>{certificate.controlKey}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            LAUDA 2 — VERSO DO CERTIFICADO Nº 10 (1122px x 794px A4 Landscape)
           =================================================================== */}
        <div
          className={`flex flex-col items-center ${
            viewMode === 'front' ? 'hidden' : 'flex'
          }`}
        >
          <div className="flex items-center justify-between w-full max-w-[1122px] mb-2 px-1 text-xs text-slate-300 no-print">
            <span className="font-mono-code">
              LAUDA 02 / 02 — VERSO OFICIAL E MEMORIAL DESCRITIVO (A4 PAISAGEM · 297mm × 210mm)
            </span>
            <span className="text-emerald-400 font-mono-code flex items-center gap-1">
              <Link2 className="w-3.5 h-3.5" />
              QR Code e Link de Verificação Clicáveis no PDF
            </span>
          </div>

          <div
            style={{
              width: `${Math.round(1122 * scale)}px`,
              height: `${Math.round(794 * scale)}px`,
              position: 'relative',
            }}
            className="print-cert-page-wrapper shadow-2xl rounded-sm overflow-hidden shrink-0"
          >
            <div
              ref={page2Ref}
              style={{
                width: '1122px',
                height: '794px',
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                backgroundColor: '#FAF9F6',
                color: '#0F172A',
                padding: '18px',
                boxSizing: 'border-box',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
              className="print-cert-page-inner"
            >
              {/* Outer Green Institutional Border */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  border: '2.5px solid #0F4C3A',
                  padding: '5px',
                  boxSizing: 'border-box',
                }}
              >
                {/* Inner Navy Institutional Border */}
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    border: '1.5px solid #1B365D',
                    padding: '18px 28px 14px 28px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    {/* 1. VERSO HEADER */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        paddingBottom: '10px',
                        borderBottom: '1.5px solid #0F4C3A',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <LogoEditoraMenteSaude size={44} />
                        <LogoCentroMariaDalva size={44} />
                      </div>
                      <div
                        data-pdf-text="true"
                        contentEditable={isDirectEditMode}
                        suppressContentEditableWarning
                        className="cert-inline-editable"
                      >
                        <h2
                          style={{
                            fontFamily: "'Libre Baskerville', Georgia, serif",
                            fontSize: '17.5px',
                            fontWeight: 700,
                            color: '#0F4C3A',
                            margin: 0,
                            letterSpacing: '0.02em',
                          }}
                        >
                          MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO DE ATIVIDADE DE EXTENSÃO
                        </h2>
                        <div
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: '#334155',
                            marginTop: '2px',
                          }}
                        >
                          Verso Oficial do Certificado Nº {certificate.certNumber} · Fé Pública
                          Interinstitucional e Validação Curricular
                        </div>
                      </div>
                    </div>

                    {/* 2. TOP 2 BOXES: Holder Data & Curricular Framing */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '14px',
                        marginTop: '10px',
                      }}
                    >
                      {/* Box 1 */}
                      <div
                        data-pdf-text="true"
                        contentEditable={isDirectEditMode}
                        suppressContentEditableWarning
                        className="cert-inline-editable"
                        style={{
                          backgroundColor: '#F5F4EE',
                          border: '1px solid #D6D3C4',
                          padding: '10px 14px',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '10.5px',
                            fontWeight: 800,
                            color: '#0F4C3A',
                            borderBottom: '1px solid #DCD9CC',
                            paddingBottom: '4px',
                            marginBottom: '6px',
                            letterSpacing: '0.03em',
                          }}
                        >
                          1. DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL EXTENSIONISTA
                        </div>
                        <div style={{ fontSize: '11.5px', lineHeight: 1.55, color: '#1E293B' }}>
                          <div>
                            Titular Certificado:{' '}
                            <strong style={{ color: '#0F172A' }}>{certificate.holderName}</strong>
                          </div>
                          <div>
                            CPF Registrado:{' '}
                            <strong style={{ color: '#0F172A' }}>{certificate.holderCpf}</strong>
                          </div>
                          <div>
                            Qualificação Profissional:{' '}
                            <strong style={{ color: '#0F172A' }}>{certificate.holderRole}</strong>
                          </div>
                          <div>
                            Instituição de Origem:{' '}
                            <strong style={{ color: '#0F172A' }}>
                              {certificate.holderInstitution}
                            </strong>
                          </div>
                        </div>
                      </div>

                      {/* Box 2 */}
                      <div
                        data-pdf-text="true"
                        contentEditable={isDirectEditMode}
                        suppressContentEditableWarning
                        className="cert-inline-editable"
                        style={{
                          backgroundColor: '#F5F4EE',
                          border: '1px solid #D6D3C4',
                          padding: '10px 14px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: '10.5px',
                              fontWeight: 800,
                              color: '#1B365D',
                              borderBottom: '1px solid #DCD9CC',
                              paddingBottom: '4px',
                              marginBottom: '6px',
                              letterSpacing: '0.03em',
                            }}
                          >
                            2. ENQUADRAMENTO CURRICULAR E PONTUAÇÃO
                          </div>
                          <div
                            style={{
                              fontSize: '12px',
                              fontWeight: 700,
                              color: '#0F172A',
                              lineHeight: 1.4,
                            }}
                          >
                            {certificate.curriculumItem}
                          </div>
                        </div>
                        <div
                          style={{
                            fontSize: '11.5px',
                            fontWeight: 700,
                            fontFamily: "'IBM Plex Mono', monospace",
                            color: '#0F4C3A',
                            borderTop: '1px solid #DCD9CC',
                            paddingTop: '6px',
                            marginTop: '6px',
                          }}
                        >
                          Período: {certificate.period} &nbsp;|&nbsp; Total:{' '}
                          {String(certificate.totalHoursNumeric).padStart(2, '0')}h
                        </div>
                      </div>
                    </div>

                    {/* 3. PRACTICAL ACTIVITIES MATRIX (08 HOURS) */}
                    <div
                      style={{
                        border: '1px solid #CBD5E1',
                        backgroundColor: '#FFFFFF',
                        marginTop: '10px',
                      }}
                    >
                      <div
                        data-pdf-text="true"
                        contentEditable={isDirectEditMode}
                        suppressContentEditableWarning
                        className="cert-inline-editable"
                        style={{
                          backgroundColor: '#EFF6F3',
                          borderBottom: '1px solid #CBD5E1',
                          padding: '6px 14px',
                          fontSize: '10.5px',
                          fontWeight: 800,
                          color: '#0F4C3A',
                          letterSpacing: '0.03em',
                        }}
                      >
                        3. MATRIZ DE ATIVIDADES PRÁTICAS E METODOLOGIA EXTENSIONISTA (
                        {String(certificate.totalHoursNumeric).padStart(2, '0')} HORAS)
                      </div>

                      <div>
                        {certificate.axes.map((axis, idx) => (
                          <div
                            key={axis.axisNumber}
                            data-pdf-text="true"
                            contentEditable={isDirectEditMode}
                            suppressContentEditableWarning
                            className="cert-inline-editable"
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '290px 1fr 90px',
                              alignItems: 'center',
                              padding: '7px 14px',
                              borderBottom:
                                idx < certificate.axes.length - 1 ? '1px solid #E2E8F0' : 'none',
                              gap: '14px',
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  fontSize: '10.8px',
                                  fontWeight: 800,
                                  color: '#0F172A',
                                  lineHeight: 1.25,
                                }}
                              >
                                {axis.axisNumber}
                              </div>
                              <div
                                style={{
                                  fontSize: '9.3px',
                                  color: '#64748B',
                                  marginTop: '2px',
                                  lineHeight: 1.2,
                                }}
                              >
                                {axis.subtitle}
                              </div>
                            </div>

                            <div
                              style={{
                                fontSize: '10.6px',
                                color: '#1E293B',
                                lineHeight: 1.35,
                              }}
                            >
                              {axis.description}
                            </div>

                            <div
                              style={{
                                textAlign: 'right',
                                fontFamily: "'IBM Plex Mono', monospace",
                                fontSize: '11px',
                                fontWeight: 700,
                                color: '#0F4C3A',
                              }}
                            >
                              {axis.hours}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 4. OFFICIAL PUBLIC FAITH REGISTRATION & CLICKABLE CRYPTOGRAPHIC KEYS */}
                    <div
                      style={{
                        backgroundColor: '#FCF8EC',
                        border: '1px solid #E2C878',
                        padding: '9px 14px',
                        marginTop: '10px',
                        display: 'grid',
                        gridTemplateColumns: '1fr 94px',
                        alignItems: 'center',
                        gap: '14px',
                      }}
                    >
                      <div data-pdf-text="true">
                        <div
                          style={{
                            fontSize: '10.2px',
                            fontWeight: 800,
                            color: '#78560A',
                            letterSpacing: '0.03em',
                            marginBottom: '4px',
                          }}
                        >
                          4. REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE VERIFICAÇÃO
                          DE AUTENTICIDADE
                        </div>
                        <div
                          contentEditable={isDirectEditMode}
                          suppressContentEditableWarning
                          className="cert-inline-editable"
                          style={{
                            fontSize: '10.5px',
                            color: '#1E293B',
                            lineHeight: 1.35,
                            marginBottom: '5px',
                          }}
                        >
                          Certificado registrado sob o{' '}
                          <strong>
                            nº {certificate.certNumber} no Livro de Extensão nº{' '}
                            {certificate.bookNumber}, Folha {certificate.sheetNumber}
                          </strong>
                          , expedido pela <strong>Editora Mente e Saúde</strong> (CNPJ:
                          51.372.335/0001-71) e{' '}
                          <strong>Centro Profissionalizante Maria Dalva de Araújo</strong> (CNPJ:
                          51.269.112/0001-83).
                        </div>
                        <div
                          style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: '9.5px',
                            color: '#0F172A',
                            lineHeight: 1.45,
                          }}
                        >
                          <div>
                            <strong>CÓDIGO DE AUTENTICIDADE:</strong> {certificate.code}{' '}
                            &nbsp;|&nbsp; <strong>CHAVE DE CONTROLE / DÍGITO:</strong>{' '}
                            {certificate.controlKey}
                          </div>
                          <div>
                            <strong>ENDEREÇO PARA VERIFICAÇÃO MANUAL (SEM QR CODE):</strong>{' '}
                            <a
                              href={fullVerificationUrl}
                              data-pdf-link={fullVerificationUrl}
                              onClick={(e) => {
                                if (onValidateClick && baseSiteUrl === defaultOrigin) {
                                  e.preventDefault();
                                  onValidateClick();
                                }
                              }}
                              style={{
                                color: '#1D4ED8',
                                fontWeight: 700,
                                textDecoration: 'underline',
                              }}
                            >
                              {fullVerificationUrl}
                            </a>
                          </div>
                          <div style={{ color: '#475569' }}>
                            <strong>HASH SHA-256:</strong> {certificate.sha256}
                          </div>
                        </div>
                      </div>

                      {/* Clickable QR Code on Page 2 */}
                      <a
                        href={fullVerificationUrl}
                        data-pdf-link={fullVerificationUrl}
                        title={`Verificar autenticidade via QR Code: ${fullVerificationUrl}`}
                        onClick={(e) => {
                          if (onValidateClick && baseSiteUrl === defaultOrigin) {
                            e.preventDefault();
                            onValidateClick();
                          }
                        }}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #CBD5E1',
                          padding: '5px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <QRCodeSVG
                          value={fullVerificationUrl}
                          size={80}
                          level="M"
                          bgColor="#FFFFFF"
                          fgColor="#0F172A"
                        />
                      </a>
                    </div>
                  </div>

                  {/* 5. VERSO FOOTER SIGNATURES */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '280px 1fr 280px',
                      alignItems: 'end',
                      paddingTop: '4px',
                    }}
                  >
                    {/* Left Signature */}
                    <div style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginBottom: '-6px',
                        }}
                      >
                        <SignatureBarbaraLima width={165} height={42} />
                      </div>
                      <div
                        data-pdf-text="true"
                        style={{ borderTop: '1.2px solid #334155', paddingTop: '4px' }}
                      >
                        <div style={{ fontSize: '10.8px', fontWeight: 800, color: '#0F172A' }}>
                          BÁRBARA LIMA DOS SANTOS
                        </div>
                        <div
                          style={{
                            fontSize: '8.8px',
                            fontWeight: 700,
                            color: '#475569',
                            fontFamily: "'IBM Plex Mono', monospace",
                          }}
                        >
                          Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)
                        </div>
                      </div>
                    </div>

                    {/* Center Summary with Clickable Verification Link */}
                    <div
                      data-pdf-text="true"
                      style={{ textAlign: 'center', paddingBottom: '2px' }}
                    >
                      <div
                        style={{
                          fontFamily: "'Libre Baskerville', Georgia, serif",
                          fontSize: '13.5px',
                          fontWeight: 700,
                          fontStyle: 'italic',
                          color: '#0F172A',
                        }}
                      >
                        {certificate.cityState}, {certificate.issueDate}.
                      </div>
                      <div
                        style={{
                          fontSize: '9.5px',
                          fontWeight: 600,
                          color: '#334155',
                          marginTop: '2px',
                        }}
                      >
                        Documento Oficial de 2 Laudas (Frente e Verso) · Válido em Todo o
                        Território Nacional
                      </div>
                      <div
                        style={{
                          fontSize: '8.8px',
                          fontFamily: "'IBM Plex Mono', monospace",
                          color: '#475569',
                          marginTop: '1px',
                        }}
                      >
                        <a
                          href={fullVerificationUrl}
                          data-pdf-link={fullVerificationUrl}
                          onClick={(e) => {
                            if (onValidateClick && baseSiteUrl === defaultOrigin) {
                              e.preventDefault();
                              onValidateClick();
                            }
                          }}
                          style={{ color: '#1D4ED8', textDecoration: 'underline' }}
                        >
                          Registro: {certificate.code} · Chave: {certificate.controlKey}
                        </a>
                      </div>
                    </div>

                    {/* Right Signature */}
                    <div style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginBottom: '-6px',
                        }}
                      >
                        <SignatureJamesAraujo width={170} height={42} />
                      </div>
                      <div
                        data-pdf-text="true"
                        style={{ borderTop: '1.2px solid #334155', paddingTop: '4px' }}
                      >
                        <div style={{ fontSize: '10.8px', fontWeight: 800, color: '#0F172A' }}>
                          JAMES ARAÚJO DE SANTANA
                        </div>
                        <div
                          style={{
                            fontSize: '8.8px',
                            fontWeight: 700,
                            color: '#475569',
                            fontFamily: "'IBM Plex Mono', monospace",
                          }}
                        >
                          Centro Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
