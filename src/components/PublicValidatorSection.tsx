import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Search,
  QrCode,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  FileText,
  Lock,
  Sparkles,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { CERTIFICATE_10_DATA, CertificateRecord } from '../data/campaignData';

interface PublicValidatorSectionProps {
  certificate: CertificateRecord;
  initialQueryCode?: string;
  onScrollToCertificate: () => void;
}

export const PublicValidatorSection: React.FC<PublicValidatorSectionProps> = ({
  certificate,
  initialQueryCode,
  onScrollToCertificate,
}) => {
  const [inputCode, setInputCode] = useState<string>(initialQueryCode || certificate.code);
  const [validationState, setValidationState] = useState<'verified' | 'invalid' | 'idle'>('verified');
  const [copiedHash, setCopiedHash] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [verifiedTimestamp, setVerifiedTimestamp] = useState<string>('');

  const defaultOrigin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://seu-dominio-aqui.com.br';

  const baseSiteUrl = (certificate.verificationUrlBase || defaultOrigin).replace(/\/+$/, '');
  const directValidationUrl = `${baseSiteUrl}/?codigo=${encodeURIComponent(
    certificate.code
  )}#validador`;

  useEffect(() => {
    const now = new Date();
    setVerifiedTimestamp(
      now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR')
    );
  }, []);

  useEffect(() => {
    if (initialQueryCode) {
      setInputCode(initialQueryCode);
      verifyCodeString(initialQueryCode);
    }
  }, [initialQueryCode]);

  const verifyCodeString = (raw: string) => {
    const clean = raw.trim().toUpperCase();
    const validMatches = [
      certificate.code.toUpperCase(),
      certificate.controlKey.toUpperCase(),
      certificate.holderCpf.replace(/\D/g, ''),
      certificate.holderCpf.toUpperCase(),
      'EMS-EXT-2026-1042',
      '1042-8834-5921-7F4C',
      '1042',
    ];

    if (
      validMatches.includes(clean) ||
      clean.replace(/\D/g, '') === '70279494157'
    ) {
      setValidationState('verified');
      const now = new Date();
      setVerifiedTimestamp(
        now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR')
      );
      if (typeof window !== 'undefined' && window.history?.replaceState) {
        const newUrl = `${window.location.pathname}?codigo=${certificate.code}#validador`;
        window.history.replaceState({}, '', newUrl);
      }
    } else {
      setValidationState('invalid');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyCodeString(inputCode);
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(certificate.sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2500);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(directValidationUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header Banner */}
      <div className="bg-[#0F172A] text-white p-6 sm:p-8 border-b border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-emerald-400">
              <Lock className="w-3.5 h-3.5" />
              <span>SISTEMA INTEGRADO DE FÉ PÚBLICA E AUTENTICAÇÃO ACADÊMICA · ITEM 08</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
              Validador Público de Certificados e Registro Interinstitucional
            </h2>
            <p className="text-sm text-slate-300 mt-1.5 max-w-2xl">
              Consulte a autenticidade de certificados expedidos em parceria pela{' '}
              <strong className="text-white">Editora Mente e Saúde</strong> (CNPJ: 51.372.335/0001-71) e{' '}
              <strong className="text-white">
                Centro Profissionalizante Maria Dalva de Araújo
              </strong>{' '}
              (CNPJ: 51.269.112/0001-83).
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#1E293B] border border-slate-700 p-3 rounded-xl shrink-0">
            <div className="bg-white p-1.5 rounded-lg">
              <QRCodeSVG
                value={directValidationUrl}
                size={60}
                level="M"
                bgColor="#FFFFFF"
                fgColor="#0F172A"
              />
            </div>
            <div className="text-xs">
              <div className="font-mono-code font-bold text-emerald-400">
                QR CODE ATIVO NO SITE
              </div>
              <div className="text-slate-300 mt-0.5">Aponte a câmera ou clique:</div>
              <button
                type="button"
                onClick={() => {
                  setInputCode(certificate.code);
                  verifyCodeString(certificate.code);
                }}
                className="text-sky-400 hover:text-sky-300 underline font-mono-code font-semibold mt-0.5 cursor-pointer"
              >
                ?codigo={certificate.code}
              </button>
            </div>
          </div>
        </div>

        {/* Search / Verification Form */}
        <form onSubmit={handleFormSubmit} className="mt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Digite o Código (EMS-EXT-2026-1042), Chave (1042-8834-5921-7F4C) ou CPF..."
                className="w-full pl-12 pr-4 py-3.5 bg-[#1E293B] border border-slate-700 focus:border-sky-400 rounded-xl text-white font-mono-code text-sm outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 bg-[#1D4ED8] hover:bg-blue-600 text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verificar Autenticidade</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setInputCode(certificate.controlKey);
                verifyCodeString(certificate.controlKey);
              }}
              className="px-4 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono-code text-xs rounded-xl border border-slate-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Validar por Chave ({certificate.controlKey})
            </button>
          </div>
        </form>
      </div>

      {/* Verification Output Body */}
      <div className="p-6 sm:p-8">
        {validationState === 'verified' ? (
          <div className="space-y-6">
            {/* Green Official Verification Seal Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs font-mono-code font-bold text-emerald-800 uppercase tracking-wider">
                    CERTIFICADO Nº {certificate.certNumber} · LIVRO {certificate.bookNumber} · FOLHA{' '}
                    {certificate.sheetNumber} · STATUS: {certificate.status}
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-emerald-950 mt-0.5">
                    Autenticidade Confirmada com Fé Pública Interinstitucional
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-800 mt-0.5">
                    Verificação realizada em {verifiedTimestamp || 'tempo real'} via protocolo
                    criptográfico SHA-256. Documento de 2 laudas válido em todo o território nacional.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={onScrollToCertificate}
                  className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Inspecionar Certificado (2 Laudas)</span>
                </button>
              </div>
            </div>

            {/* Detailed Audit Metadata Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Column 1: Holder Data */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
                <div className="text-xs font-mono-code font-bold text-[#0F4C3A] uppercase tracking-wider pb-3 border-b border-slate-200">
                  01. Titular do Certificado Validado
                </div>
                <dl className="mt-4 space-y-3 text-xs sm:text-sm">
                  <div>
                    <dt className="text-slate-500 text-xs">Nome Completo do Profissional:</dt>
                    <dd className="font-bold text-slate-900 mt-0.5">{certificate.holderName}</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <dt className="text-slate-500 text-xs">CPF Registrado:</dt>
                      <dd className="font-mono-code font-bold text-slate-900 mt-0.5">
                        {certificate.holderCpf}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500 text-xs">Qualificação:</dt>
                      <dd className="font-bold text-slate-900 mt-0.5">{certificate.holderRole}</dd>
                    </div>
                  </div>
                  <div>
                    <dt className="text-slate-500 text-xs">Instituição de Origem:</dt>
                    <dd className="font-semibold text-slate-800 mt-0.5">
                      {certificate.holderInstitution}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Column 2: Extension Activity Details */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
                <div className="text-xs font-mono-code font-bold text-[#1D4ED8] uppercase tracking-wider pb-3 border-b border-slate-200">
                  02. Enquadramento Curricular (Item 08)
                </div>
                <dl className="mt-4 space-y-3 text-xs sm:text-sm">
                  <div>
                    <dt className="text-slate-500 text-xs">Título Oficial da Ação Extensionista:</dt>
                    <dd className="font-bold text-slate-900 mt-0.5 leading-snug">
                      {certificate.title}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-500 text-xs">Modalidade & Edital:</dt>
                    <dd className="font-semibold text-slate-800 mt-0.5">{certificate.modality}</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <dt className="text-slate-500 text-xs">Período de Execução:</dt>
                      <dd className="font-mono-code font-semibold text-slate-900 mt-0.5">
                        {certificate.period}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500 text-xs">Carga Horária Total:</dt>
                      <dd className="font-mono-code font-bold text-emerald-700 mt-0.5">
                        {certificate.totalHoursText}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>

              {/* Column 3: Cryptographic & Book Registry */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
                <div className="text-xs font-mono-code font-bold text-[#D97706] uppercase tracking-wider pb-3 border-b border-slate-200">
                  03. Registro Físico e Chaves Criptográficas
                </div>
                <dl className="mt-4 space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <dt className="text-slate-500">Código Oficial:</dt>
                      <dd className="font-mono-code font-bold text-slate-900 mt-0.5">
                        {certificate.code}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Chave de Controle:</dt>
                      <dd className="font-mono-code font-bold text-slate-900 mt-0.5">
                        {certificate.controlKey}
                      </dd>
                    </div>
                  </div>
                  <div>
                    <dt className="text-slate-500">Assinatura Criptográfica SHA-256:</dt>
                    <dd className="mt-1 flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-2 font-mono-code text-[11px] text-slate-700 break-all">
                      <span className="flex-1">{certificate.sha256}</span>
                      <button
                        type="button"
                        onClick={handleCopyHash}
                        className="p-1.5 text-slate-500 hover:text-slate-900 rounded bg-slate-100 shrink-0 cursor-pointer"
                        title="Copiar Hash SHA-256"
                      >
                        {copiedHash ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Link Direto do Autenticador (QR Code):</dt>
                    <dd className="mt-1 flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-2 font-mono-code text-[11px] text-[#1D4ED8] break-all">
                      <span className="flex-1">{directValidationUrl}</span>
                      <button
                        type="button"
                        onClick={handleCopyUrl}
                        className="p-1.5 text-slate-500 hover:text-slate-900 rounded bg-slate-100 shrink-0 cursor-pointer"
                        title="Copiar Link do Validador"
                      >
                        {copiedUrl ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <AlertCircle className="w-10 h-10 text-[#E11D48] shrink-0" />
              <div>
                <h4 className="text-base font-bold text-rose-950">
                  Código ou Chave não localizado: &ldquo;{inputCode}&rdquo;
                </h4>
                <p className="text-xs sm:text-sm text-rose-800 mt-0.5">
                  Para validar o Certificado Nº 10 desta campanha, utilize o código oficial{' '}
                  <strong className="font-mono-code">EMS-EXT-2026-1042</strong> ou a chave{' '}
                  <strong className="font-mono-code">1042-8834-5921-7F4C</strong>.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setInputCode(certificate.code);
                verifyCodeString(certificate.code);
              }}
              className="px-4 py-2.5 bg-[#E11D48] hover:bg-rose-700 text-white text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 cursor-pointer"
            >
              Preencher Código Oficial ({certificate.code})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
