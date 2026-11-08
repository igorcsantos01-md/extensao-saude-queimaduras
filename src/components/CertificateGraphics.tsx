import React from 'react';

export const LogoEditoraMenteSaude: React.FC<{ size?: number }> = ({ size = 60 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    {/* Outer rounded square */}
    <rect
      x="4"
      y="4"
      width="112"
      height="112"
      rx="16"
      fill="#EAF4EE"
      stroke="#0F4C3A"
      strokeWidth="3.5"
    />
    {/* Inner subtle border */}
    <rect
      x="9"
      y="9"
      width="102"
      height="102"
      rx="12"
      stroke="#0F4C3A"
      strokeWidth="1"
      strokeOpacity="0.35"
    />

    {/* Curved text arc definition */}
    <defs>
      <path id="emsArcTop" d="M 20,62 A 40,40 0 1,1 100,62" />
    </defs>

    {/* Outer circle of emblem */}
    <circle cx="60" cy="56" r="34" fill="#F6FBF8" stroke="#0F4C3A" strokeWidth="2.4" />
    <circle cx="60" cy="56" r="24" fill="#EAF4EE" stroke="#0F4C3A" strokeWidth="1.6" />

    {/* Curved text around top */}
    <text
      fill="#0F4C3A"
      fontSize="6.7"
      fontWeight="700"
      letterSpacing="0.8"
      fontFamily="Plus Jakarta Sans, sans-serif"
    >
      <textPath href="#emsArcTop" startOffset="50%" textAnchor="middle">
        EDITORA MENTE E SAÚDE
      </textPath>
    </text>

    {/* Human profile silhouette + brain/leaf inside inner circle */}
    <path
      d="M52 72V66C47 64 45 59 45 53C45 44 52 38 61 38C69 38 75 43 75 50C75 53 77 55 78 57C76 58 75 60 74 62C73 66 69 67 65 67V72"
      stroke="#0F4C3A"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Green brain/leaf inside profile */}
    <path
      d="M53 51C53 46.5 57 43 62 43C66.5 43 70 46 70 50.5C70 55 66 58 61 58C56.5 58 53 55 53 51Z"
      fill="#1E7A5C"
      fillOpacity="0.28"
      stroke="#0F4C3A"
      strokeWidth="1.8"
    />
    <path
      d="M57 49C60 47 64 47 66 50M56 53C59 52 63 52 66 54M61.5 43.5V57.5"
      stroke="#0F4C3A"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Open academic book at base */}
    <path
      d="M28 96C38 92 49 93 60 97C71 93 82 92 92 96V83C82 79 71 80 60 84C49 80 38 79 28 83V96Z"
      fill="#FFFFFF"
      stroke="#0F4C3A"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <path d="M60 84V97" stroke="#0F4C3A" strokeWidth="2.2" strokeLinecap="round" />
    <path
      d="M24 99C36 95 48 96 60 100C72 96 84 95 96 99"
      stroke="#0F4C3A"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

export const LogoCentroMariaDalva: React.FC<{ size?: number }> = ({ size = 60 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    {/* Outer Navy Seal Circle */}
    <circle cx="60" cy="60" r="56" fill="#1B365D" stroke="#0F2544" strokeWidth="2.5" />
    <circle
      cx="60"
      cy="60"
      r="50"
      stroke="#93C5FD"
      strokeWidth="1.2"
      strokeOpacity="0.55"
    />
    <circle
      cx="60"
      cy="60"
      r="35"
      fill="#152C4E"
      stroke="#60A5FA"
      strokeWidth="1.2"
      strokeOpacity="0.45"
    />

    <defs>
      <path id="cpmdaTopArc" d="M 16,60 A 44,44 0 1,1 104,60" />
      <path id="cpmdaBottomArc" d="M 104,60 A 44,44 0 1,1 16,60" />
    </defs>

    <text
      fill="#FFFFFF"
      fontSize="6.3"
      fontWeight="700"
      letterSpacing="0.9"
      fontFamily="Plus Jakarta Sans, sans-serif"
    >
      <textPath href="#cpmdaTopArc" startOffset="50%" textAnchor="middle">
        CENTRO PROFISSIONALIZANTE
      </textPath>
    </text>

    <text
      fill="#E2E8F0"
      fontSize="6.1"
      fontWeight="700"
      letterSpacing="0.8"
      fontFamily="Plus Jakarta Sans, sans-serif"
    >
      <textPath href="#cpmdaBottomArc" startOffset="50%" textAnchor="middle">
        · MARIA DALVA DE ARAÚJO ·
      </textPath>
    </text>

    {/* Lightbulb rays */}
    <line x1="60" y1="27" x2="60" y2="32" stroke="#FDE047" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="39" y1="35" x2="43" y2="39" stroke="#FDE047" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="81" y1="35" x2="77" y2="39" stroke="#FDE047" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="32" y1="53" x2="37" y2="53" stroke="#FDE047" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="88" y1="53" x2="83" y2="53" stroke="#FDE047" strokeWidth="2.2" strokeLinecap="round" />

    {/* Puzzle Lightbulb Body */}
    <path
      d="M60 36C50.6 36 43 43.6 43 53C43 59.2 46.4 64.6 51.4 67.5L52.5 74H67.5L68.6 67.5C73.6 64.6 77 59.2 77 53C77 43.6 69.4 36 60 36Z"
      fill="#FFFFFF"
      stroke="#93C5FD"
      strokeWidth="1.5"
    />
    {/* Puzzle interlocking lines inside bulb */}
    <path
      d="M60 36V49C62.5 49 64 50.5 64 52.5C64 54.5 62.5 56 60 56V74"
      stroke="#1B365D"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M43.5 54H54C54 51.5 55.8 50 57.5 50C59.2 50 61 51.5 61 54H76.5"
      stroke="#1B365D"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Bulb Screw Base */}
    <rect x="53" y="76" width="14" height="3.5" rx="1.75" fill="#93C5FD" />
    <rect x="54.5" y="81" width="11" height="3.5" rx="1.75" fill="#93C5FD" />
    <path d="M56.5 86H63.5L61.5 89.5H58.5L56.5 86Z" fill="#FDE047" />
  </svg>
);

export const SignatureBarbaraLima: React.FC<{ width?: number; height?: number }> = ({
  width = 185,
  height = 52,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 240 68"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Exact vector reproduction of Bárbara Lima dos Santos signature from reference PDF */}
    <path
      d="M36 16C34 29 31 44 30 53M31 24C36 15 51 13 54 22C56 28 45 33 35 35C48 35 59 40 56 49C53 56 38 56 28 51"
      stroke="#111827"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M58 46C63 44 68 37 70 34C70 40 72 46 77 46C82 46 86 40 88 35C89 41 92 46 98 45C105 44 114 29 116 16C113 27 111 42 118 46C124 49 131 42 135 36C136 42 141 45 147 44C153 43 159 38 163 35C165 41 171 45 179 44C188 43 200 28 202 15C199 28 197 43 205 47C212 50 222 46 230 43"
      stroke="#111827"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Accent stroke and dot */}
    <path d="M73 24L79 18" stroke="#111827" strokeWidth="2.3" strokeLinecap="round" />
    <circle cx="136" cy="25" r="2" fill="#111827" />
  </svg>
);

export const SignatureJamesAraujo: React.FC<{ width?: number; height?: number }> = ({
  width = 195,
  height = 52,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 250 68"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Exact vector reproduction of James Araújo de Santana signature from reference PDF */}
    <path
      d="M24 20C35 14 48 12 50 22C52 33 43 49 34 53C27 56 22 51 27 46C34 40 54 42 74 42C86 42 98 39 109 36"
      stroke="#111827"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M126 44C133 34 141 20 146 13C148 23 150 36 153 44M132 34C142 32 154 31 163 34C167 36 169 41 175 41C181 41 186 35 190 32C192 37 196 41 202 40C209 39 216 25 219 14C217 26 218 39 226 42C232 44 238 41 243 39"
      stroke="#111827"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Characteristic sweeping underline flourish */}
    <path
      d="M42 58C92 53 164 46 238 43"
      stroke="#111827"
      strokeWidth="2.1"
      strokeLinecap="round"
    />
  </svg>
);

export const OfficialPublicFaithSeal: React.FC<{ code: string; size?: number }> = ({
  code,
  size = 86,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    <circle
      cx="60"
      cy="60"
      r="55"
      fill="#FDF9EE"
      stroke="#C59B27"
      strokeWidth="2.5"
    />
    <circle
      cx="60"
      cy="60"
      r="49"
      fill="#FCF5DF"
      stroke="#C59B27"
      strokeWidth="1.2"
      strokeDasharray="3 2"
    />
    {/* Top stars */}
    <text
      x="60"
      y="33"
      textAnchor="middle"
      fill="#9A7414"
      fontSize="9"
      fontWeight="700"
      letterSpacing="2"
    >
      ★ ★ ★
    </text>
    <text
      x="60"
      y="49"
      textAnchor="middle"
      fill="#7C5D0E"
      fontSize="8.8"
      fontWeight="800"
      fontFamily="Plus Jakarta Sans, sans-serif"
      letterSpacing="0.6"
    >
      SELO OFICIAL
    </text>
    <text
      x="60"
      y="63"
      textAnchor="middle"
      fill="#7C5D0E"
      fontSize="10.2"
      fontWeight="800"
      fontFamily="Plus Jakarta Sans, sans-serif"
      letterSpacing="0.5"
    >
      FÉ PÚBLICA
    </text>
    <line x1="25" y1="71" x2="95" y2="71" stroke="#C59B27" strokeWidth="1" />
    <text
      x="60"
      y="83"
      textAnchor="middle"
      fill="#8B6914"
      fontSize="6.6"
      fontWeight="700"
      fontFamily="IBM Plex Mono, monospace"
    >
      {code}
    </text>
    <text
      x="60"
      y="98"
      textAnchor="middle"
      fill="#9A7414"
      fontSize="8"
      fontWeight="700"
      letterSpacing="2"
    >
      ★ ★
    </text>
  </svg>
);
