export interface CertificateAxis {
  axisNumber: string;
  title: string;
  subtitle: string;
  description: string;
  hours: string;
}

export interface CertificateRecord {
  certNumber: string;
  bookNumber: string;
  sheetNumber: string;
  code: string;
  controlKey: string;
  sha256: string;
  holderName: string;
  holderCpf: string;
  holderRole: string;
  holderInstitution: string;
  title: string;
  modality: string;
  curriculumItem: string;
  period: string;
  issueDate: string;
  cityState: string;
  totalHoursNumeric: number;
  totalHoursText: string;
  frontBodyParagraph1: {
    prefix: string;
    bold1: string;
    middle1: string;
    boldTitle: string;
    middle2: string;
    boldModality: string;
    middle3: string;
    boldPeriod: string;
    middle4: string;
    boldHours: string;
  };
  frontBodyParagraph2: {
    text1: string;
    bold1: string;
    text2: string;
    bold2: string;
    text3: string;
    bold3: string;
    text4: string;
  };
  axes: CertificateAxis[];
  verificationUrlBase: string;
  status: 'VÁLIDO E AUTENTICADO' | 'REVOGADO';
}

export const CERTIFICATE_10_DATA: CertificateRecord = {
  certNumber: '10',
  bookNumber: '01/2026',
  sheetNumber: '34',
  code: 'EMS-EXT-2026-1042',
  controlKey: '1042-8834-5921-7F4C',
  sha256: '9f4e8c21a7b36d50e1928c47b6a50d38f2e19c84a7b63d51e0829f4a6c3b1042',
  holderName: 'LUCAS GONÇALVES SILVEIRA',
  holderCpf: '702.794.941-57',
  holderRole: 'Médico',
  holderInstitution: 'Centro Universitário de Anápolis (UNIFAN)',
  title:
    'Campanha Educativa Comunitária de Primeiros Socorros Oculares: Distribuição de Infográficos de Bolso sobre Traumas e Queimaduras Químicas',
  modality: 'Campanha Educativa e Atividade Comunitária',
  curriculumItem:
    'Item 08 - Atividades de Extensão: Campanhas educativas, de vacinação, coleta de dados populacionais e atividades comunitárias',
  period: '12 a 14 de março de 2026',
  issueDate: '20 de março de 2026',
  cityState: 'Goiânia - GO',
  totalHoursNumeric: 8,
  totalHoursText: '08 (oito) horas',
  frontBodyParagraph1: {
    prefix: 'participou de forma efetiva da ',
    bold1: 'Atividade de Extensão',
    middle1: ' intitulada ',
    boldTitle:
      '“Campanha Educativa Comunitária de Primeiros Socorros Oculares: Distribuição de Infográficos de Bolso sobre Traumas e Queimaduras Químicas”',
    middle2: ', desenvolvida na modalidade de ',
    boldModality: 'Campanha Educativa e Atividade Comunitária',
    middle3: ', realizada no período de ',
    boldPeriod: '12 a 14 de março de 2026',
    middle4: ', contabilizando carga horária total de ',
    boldHours: '08 (oito) horas.',
  },
  frontBodyParagraph2: {
    text1:
      'No âmbito desta ação extensionista, o profissional atuou na elaboração técnico-científica e distribuição comunitária física e digital de ',
    bold1:
      'infográficos rápidos de bolso e guias preventivos sobre conduta imediata em traumas e queimaduras químicas oculares',
    text2:
      ' (protocolo de irrigação abundante nos primeiros segundos), ',
    bold2:
      'comunicação científica para combate à desinformação (fake news)',
    text3:
      ' sobre receitas caseiras e colírios anestésicos sem prescrição, aplicação de enquete comunitária de letramento em urgências visuais para ',
    bold3:
      'coleta de dados populacionais e divulgação dos canais oficiais de urgência oftalmológica do SUS (SAMU 192, Corpo de Bombeiros 193 e UPA 24h).',
    text4: '',
  },
  axes: [
    {
      axisNumber: 'Eixo I — Curadoria Científica e Protocolos de Urgência Oftalmológica',
      title: 'Sistematização de Diretrizes sobre Queimaduras por Álcalis, Ácidos e Traumas',
      subtitle: 'Fundamentação Técnica em Diretrizes do CBO, OMS e Ministério da Saúde',
      description:
        'Revisão de literatura médica oftalmológica e tradução do conhecimento científico para linguagem comunitária acessível sobre o mecanismo de saponificação celular por álcalis, coagulação proteica por ácidos e proteção mecânica em traumas perfurantes.',
      hours: '02h 00min',
    },
    {
      axisNumber: 'Eixo II — Produção Editorial de Infográficos de Bolso e Guias Rápidos',
      title: 'Design Instrucional de Alto Contraste para Consulta em Emergências',
      subtitle: 'Editoração Científica sobre Irrigação Ocular Imediata e Triagem de Sinais de Alarme',
      description:
        'Elaboração didática e diagramação do Infográfico de Bolso "Primeiros Socorros Oculares: Os Segundos que Salvam a Visão", estruturando o passo a passo de lavagem contínua com água corrente ou soro fisiológico 0,9% por 15 a 30 minutos.',
      hours: '02h 30min',
    },
    {
      axisNumber: 'Eixo III — Comunicação Científica, Coleta de Dados e Combate a Fake News',
      title: 'Desmistificação de Condutas Caseiras Perigosas e Levantamento Comunitário',
      subtitle: 'Prevenção de Necrose Corneana, Perfuração e Automedicação com Colírios Anestésicos',
      description:
        'Campanha educativa e enquete rápida de percepção de risco (coleta de dados populacionais) alertando contra o uso de leite, óleos, água boricada, chás ou compressão sobre olhos traumatizados, prevenindo cegueira evitável.',
      hours: '01h 30min',
    },
    {
      axisNumber: 'Eixo IV — Ação Comunitária e Divulgação dos Canais de Urgência do SUS',
      title: 'Distribuição Gratuita aos Trabalhadores e Articulação com a Rede Pública',
      subtitle: 'Cidadania em Saúde Visual e Fluxo de Emergência (SAMU 192 / Bombeiros 193 / SUS)',
      description:
        'Entrega comunitária gratuita dos infográficos impressos e digitais para trabalhadores da construção civil, limpeza, indústria e comunidade geral, orientando o acionamento imediato do SAMU 192, Corpo de Bombeiros 193 e Centros de Referência em Oftalmologia do SUS.',
      hours: '02h 00min',
    },
  ],
  verificationUrlBase: typeof window !== 'undefined' ? window.location.origin : '',
  status: 'VÁLIDO E AUTENTICADO',
};

export interface EmergencyScenario {
  id: 'alcali' | 'acido' | 'perfurante' | 'corpo_estranho';
  name: string;
  badgeText: string;
  severityLevel: 'CRÍTICA — EMERGÊNCIA ABSOLUTA' | 'ALTA — URGÊNCIA IMEDIATA' | 'MODERADA A ALTA — ATENÇÃO RÁPIDA';
  accentColor: string;
  initialPh: number;
  targetPh: number;
  recommendedWashMinutes: number;
  examples: string[];
  pathophysiology: string;
  limbusRisk: string;
  immediateSteps: {
    step: string;
    title: string;
    detail: string;
  }[];
  forbiddenActions: string[];
  susRouting: string;
}

export const EMERGENCY_SCENARIOS: EmergencyScenario[] = [
  {
    id: 'alcali',
    name: 'Queimadura por Álcali (Base)',
    badgeText: 'MAIOR RISCO DE CEGUEIRA — PENETRAÇÃO RÁPIDA',
    severityLevel: 'CRÍTICA — EMERGÊNCIA ABSOLUTA',
    accentColor: '#E11D48',
    initialPh: 12.8,
    targetPh: 7.2,
    recommendedWashMinutes: 30,
    examples: [
      'Soda cáustica (hidróxido de sódio) e desentupidores',
      'Cal virgem, argamassa e cimento na construção civil',
      'Amônia, água sanitária concentrada e fertilizantes',
      'Pó químico de airbags automotivos',
    ],
    pathophysiology:
      'Substâncias alcalinas provocam SAPONIFICAÇÃO dos ácidos graxos das membranas celulares epiteliais e estromais. Ao contrário dos ácidos, os álcalis não formam barreira de proteção: penetram na câmara anterior em menos de 60 segundos, destruindo células-tronco do limbo corneano, cristalino e malha trabecular.',
    limbusRisk:
      'Altíssimo risco de isquemia limbar (>180°), olho branco isquêmico ("olho cozido"), perfuração corneana e glaucoma secundário severo se a lavagem não começar nos primeiros 10 segundos.',
    immediateSteps: [
      {
        step: '01',
        title: 'Irrigação Imediata no Local (0 a 10 segundos)',
        detail:
          'Não perca tempo procurando soro se não estiver na mão: use água corrente limpa da torneira, chuveiro ou lava-olhos imediatamente, mantendo as pálpebras abertas com os dedos.',
      },
      {
        step: '02',
        title: 'Lavagem Abundante Contínua por 30 Minutos',
        detail:
          'Direcione o jato suave do canto nasal para o canto temporal (evitando contaminar o outro olho). Utilize pelo menos 2 a 3 litros de água ou Soro Fisiológico 0,9% / Ringer Lactato.',
      },
      {
        step: '03',
        title: 'Inspeção dos Fórnices Conjuntivais',
        detail:
          'Partículas sólidas de cal ou cimento ficam retidas sob a pálpebra superior e continuam liberando álcali mesmo após a lavagem superficial. É indispensável everter a pálpebra na emergência médica.',
      },
      {
        step: '04',
        title: 'Transporte Imediato mantendo Irrigação',
        detail:
          'Acione o SAMU 192 ou dirija-se imediatamente a uma Emergência Oftalmológica do SUS levando o rótulo/embalagem do produto químico.',
      },
    ],
    forbiddenActions: [
      'JAMAIS tente neutralizar o álcali pingando vinagre, limão ou soluções ácidas (a reação exotérmica gera calor e agrava a necrose).',
      'NÃO coloque leite, clara de ovo, óleo de cozinha, chás ou pomadas caseiras.',
      'NÃO use colírio anestésico em casa (ele paralisa a cicatrização epitelial e mascara a dor enquanto a córnea derrete).',
      'NÃO espere chegar ao hospital para iniciar a lavagem ocular: o prognóstico visual é definido nos primeiros 60 segundos.',
    ],
    susRouting:
      'Acionamento imediato SAMU 192 / Bombeiros 193 → Lavagem contínua com SF 0,9% até pH conjuntival entre 7,0 e 7,4 → Encaminhamento prioritário (Código Vermelho) para Centro de Referência em Oftalmologia do SUS.',
  },
  {
    id: 'acido',
    name: 'Queimadura por Ácido',
    badgeText: 'COAGULAÇÃO PROTEICA — IRRIGAÇÃO IMEDIATA',
    severityLevel: 'CRÍTICA — EMERGÊNCIA ABSOLUTA',
    accentColor: '#D97706',
    initialPh: 2.1,
    targetPh: 7.2,
    recommendedWashMinutes: 20,
    examples: [
      'Ácido sulfúrico (explosão ou vazamento de baterias automotivas)',
      'Ácido muriático (ácido clorídrico para limpeza de pedras/pisos)',
      'Ácido fluorídrico (limpa-alumínio e decapantes — altíssimo risco!)',
      'Ácido acético glacial e reagentes laboratoriais',
    ],
    pathophysiology:
      'Os ácidos desnaturam e precipitam as proteínas do epitélio corneano superficial, formando uma barreira de coagulação (escarificação opaca) que costuma limitar a penetração profunda. Exceção crítica: o Ácido Fluorídrico (limpa-alumínio) atravessa a membrana celular rapidamente como um álcali.',
    limbusRisk:
      'Risco elevado de opacidade estromal, simbléfaro e defeito epitelial persistente, especialmente quando associado a trauma térmico/explosão de bateria.',
    immediateSteps: [
      {
        step: '01',
        title: 'Lavagem Imediata com Água Corrente (Primeiros Segundos)',
        detail:
          'Inicie a irrigação abundante imediatamente no local do acidente, afastando as pálpebras para vencer o blefaroespasmo reflexo.',
      },
      {
        step: '02',
        title: 'Irrigação Contínua por no mínimo 20 Minutos',
        detail:
          'Mantenha o fluxo constante do canto interno (nasal) para o externo (temporal), pedindo para a vítima movimentar o olho em todas as direções.',
      },
      {
        step: '03',
        title: 'Atenção a Fragmentos de Bateria',
        detail:
          'Em explosões de bateria automotiva, além do ácido sulfúrico há risco de fragmentos metálicos/plásticos. Lave sem comprimir o globo ocular.',
      },
      {
        step: '04',
        title: 'Avaliação Oftalmológica de Urgência no SUS',
        detail:
          'Encaminhe imediatamente à UPA 24h ou Pronto-Socorro Oftalmológico para aferição de pH com fita de tornassol e classificação de Roper-Hall / Dua.',
      },
    ],
    forbiddenActions: [
      'JAMAIS pingue bicarbonato de sódio ou soluções alcalinas para tentar neutralizar o ácido.',
      'NÃO esfregue nem comprima o globo ocular caso haja suspeita de explosão de bateria.',
      'NÃO faça tampão oclusivo antes da lavagem completa e aferição do pH.',
      'NÃO utilize água boricada ou colírios vasoconstritores ("clareadores oculares").',
    ],
    susRouting:
      'Irrigação ininterrupta no local (20 min) → Atendimento em UPA 24h / Pronto-Socorro Oftalmológico do SUS → Medição de pH no fundo de saco conjuntival + antibioticoterapia tópica e lubrificação sem conservantes.',
  },
  {
    id: 'perfurante',
    name: 'Trauma Perfurante / Corte Ocular',
    badgeText: 'PROIBIDO LAVAR OU COMPRIMIR — ESCUDO RÍGIDO',
    severityLevel: 'CRÍTICA — EMERGÊNCIA ABSOLUTA',
    accentColor: '#1D4ED8',
    initialPh: 7.4,
    targetPh: 7.4,
    recommendedWashMinutes: 0,
    examples: [
      'Estilhaços metálicos em alta velocidade (roçadeira, martelo no ferro, esmeril)',
      'Perfuração por arame, galho de árvore, faca, tesoura ou lápis',
      'Estilhaços de vidro ou acidentes automobilísticos',
      'Trauma contuso severo com suspeita de ruptura escleral (pupila em gota)',
    ],
    pathophysiology:
      'Na suspeita de perfuração ou laceração de espessura total da córnea/esclera, qualquer pressão externa sobre as pálpebras ou sobre o globo ocular provoca extrusão do conteúdo intraocular (íris, cristalino, humor vítreo e retina), resultando em perda irreversível do olho.',
    limbusRisk:
      'Risco imediato de extrusão uveal/vítrea e endoftalmite pós-traumática nas primeiras 24 horas se houver manipulação indevida.',
    immediateSteps: [
      {
        step: '01',
        title: 'NÃO Toque, NÃO Lave e NÃO Comprima o Olho',
        detail:
          'Diferente da queimadura química, na suspeita de globo ocular aberto é PROIBIDO jogar jatos de água, pingar colírios ou apertar o olho com gaze.',
      },
      {
        step: '02',
        title: 'NÃO Remova Objetos Encravados',
        detail:
          'Se houver farpa, arame, vidro ou objeto preso no olho, jamais puxe! A remoção fora do centro cirúrgico causa hemorragia expulsiva e hérnia de íris.',
      },
      {
        step: '03',
        title: 'Proteção com Escudo Rígido (Copinho Descartável)',
        detail:
          'Corte o fundo de um copo descartável limpo (ou use protetor ocular rígido) e apoie as bordas nos ossos ao redor do olho (testa e maçã do rosto), sem encostar no globo ocular.',
      },
      {
        step: '04',
        title: 'Jejum Absoluto e Remoção ao Centro Cirúrgico SUS',
        detail:
          'Mantenha o paciente calmo, sem fazer esforço físico (evitar manobra de Valsalva) e em jejum absoluto para cirurgia oftalmológica de urgência.',
      },
    ],
    forbiddenActions: [
      'JAMAIS puxe ou tente retirar qualquer objeto encravado no olho com pinça, cotonete ou dedos.',
      'NÃO faça curativo compressivo com gaze apertando a pálpebra fechada.',
      'NÃO aplique pomadas, colírios ou soluções caseiras em olho com suspeita de perfuração.',
      'NÃO ofereça água ou alimentos à vítima (ela precisará de anestesia para microcirurgia de urgência).',
    ],
    susRouting:
      'Proteção com escudo rígido apoiado no rebordo orbitário + Jejum → Acionamento SAMU 192 / Regulação de Urgência SUS → Microcirurgia de fechamento primário em Hospital Oftalmológico de Referência.',
  },
  {
    id: 'corpo_estranho',
    name: 'Corpo Estranho Superficial e Solda',
    badgeText: 'PROIBIDO COÇAR — REMOÇÃO NA LÂMPADA DE FENDA',
    severityLevel: 'ALTA — URGÊNCIA IMEDIATA',
    accentColor: '#0284C7',
    initialPh: 7.4,
    targetPh: 7.4,
    recommendedWashMinutes: 10,
    examples: [
      'Limalha de ferro / fagulha de lixadeira aderida à córnea',
      'Poeira, areia, cisco ou inseto sob a pálpebra',
      'Ceratite actínica (queimadura ultravioleta por arco de solda elétrica)',
      'Abrasão corneana superficial por folha de papel ou unha',
    ],
    pathophysiology:
      'O ato reflexo de esfregar ou coçar os olhos transforma um corpo estranho solto no filme lacrimal em sulcos profundos na camada de Bowman da córnea. Limalhas metálicas oxidam em poucas horas, formando um anel de ferrugem tóxico ao estroma corneano.',
    limbusRisk:
      'Risco de úlcera de córnea infecciosa secundária (bacteriana ou fúngica) quando há tentativa leiga de retirada com moeda, nota de dinheiro, palito ou unha.',
    immediateSteps: [
      {
        step: '01',
        title: 'Impeça o Paciente de Esfregar os Olhos',
        detail:
          'Oriente a piscar repetidamente dentro de um recipiente com água filtrada ou soro fisiológico 0,9% para que o fluxo lacrimal desloque partículas soltas.',
      },
      {
        step: '02',
        title: 'Irrigação Suave com Soro Fisiológico 0,9%',
        detail:
          'Lave suavemente por 5 a 10 minutos. Se o cisco estiver aderido à córnea (comum em esmeril/solda), não force a retirada.',
      },
      {
        step: '03',
        title: 'Compressa Fria Apenas em Queimadura de Solda (UV)',
        detail:
          'Na fotoftalmia por solda elétrica (olhos intactos, dor intensa 6h após a exposição), repouso em ambiente escuro e compressas frias aliviam até o atendimento médico.',
      },
      {
        step: '04',
        title: 'Remoção Asséptica no Consultório / Pronto-Socorro',
        detail:
          'Limalhas de ferro exigem remoção na lâmpada de fenda por médico oftalmologista, com retirada do anel de ferrugem e prescrição de antibiótico tópico.',
      },
    ],
    forbiddenActions: [
      'JAMAIS tente remover limalha de ferro com ímã, agulha, ponta de pano, moeda ou língua.',
      'NÃO leve para casa o colírio anestésico usado pelo médico no consultório (o uso repetido causa derretimento corneano — ceratopatia tóxica grave!).',
      'NÃO use leite materno, limão, café ou chás nos olhos.',
      'NÃO ignore olho vermelho com dor e fotofobia após mexer com plantas/terra (alto risco de úlcera fúngica).',
    ],
    susRouting:
      'Irrigação leve com SF 0,9% sem fricção → Atendimento em UBS / UPA 24h ou Ambulatório de Urgência Oftalmológica do SUS para exame com fluoresceína e lâmpada de fenda.',
  },
];

export const POCKET_INFOGRAPHIC_DATA = {
  title: 'INFOGRÁFICO DE BOLSO · PRIMEIROS SOCORROS OCULARES',
  subtitle: 'Protocolo Comunitário de Conduta nos Primeiros Segundos — Edição 2026',
  editionCode: 'SÉRIE EXTENSÃO EM SAÚDE OCULAR Nº 10 · DISTRIBUIÇÃO GRATUITA',
  goldenRule:
    'Em queimaduras químicas (cal, cimento, soda cáustica, ácido ou produtos de limpeza), os PRIMEIROS 10 SEGUNDOS decidem se a pessoa continuará enxergando. Lave imediatamente antes mesmo de ir ao hospital!',
  chemicalSteps: [
    {
      time: '00s – 10s',
      action: 'ABRA E LAVE NO LOCAL',
      desc: 'Abra as pálpebras com os dedos e jogue água corrente limpa ou Soro Fisiológico 0,9% sem parar.',
    },
    {
      time: '01m – 30m',
      action: 'IRRIGAÇÃO CONTÍNUA (2 A 3 LITROS)',
      desc: 'Direcione o fluxo do canto do nariz para fora (para não atingir o olho bom). Remova lentes de contato se saírem facilmente.',
    },
    {
      time: 'IMEDIATO',
      action: 'ACIONE 192 / 193 E LEVE O RÓTULO',
      desc: 'Procure a Emergência Oftalmológica do SUS imediatamente e leve a embalagem ou foto do produto químico.',
    },
  ],
  traumaComparison: [
    {
      type: 'QUEIMADURA QUÍMICA (Cal, Soda, Ácido, Alvejante)',
      doAction: 'LAVAR IMEDIATAMENTE por 15 a 30 minutos com água corrente abundante.',
      dontAction: 'Jamais pingar leite, óleo, limão, vinagre ou esperar chegar ao hospital para lavar.',
      color: '#E11D48',
    },
    {
      type: 'TRAUMA PERFURANTE (Vidro, Arame, Estilhaço, Faca)',
      doAction: 'PROTEGER COM COPINHO DESCARTÁVEL apoiado no osso da face e manter jejum.',
      dontAction: 'PROIBIDO LAVAR, proibido apertar o olho e proibido puxar objetos encravados.',
      color: '#1D4ED8',
    },
    {
      type: 'CISCO, POEIRA OU FAÍSCA DE ESMERIL / SOLDA',
      doAction: 'PISCAR EM SORO FISIOLÓGICO 0,9% e buscar remoção médica na lâmpada de fenda.',
      dontAction: 'Jamais coçar, jamais usar agulha/ímã/pano e jamais usar colírio anestésico por conta própria.',
      color: '#D97706',
    },
  ],
  susEmergencyContacts: [
    { number: '192', label: 'SAMU — Urgência Médica', detail: 'Orientação médica imediata por telefone e ambulância' },
    { number: '193', label: 'Corpo de Bombeiros', detail: 'Acidentes químicos industriais, resgate e trauma' },
    { number: '0800 722 6001', label: 'CIATox — ANVISA / SUS', detail: 'Disque-Intoxicação Nacional 24h (Agentes Químicos)' },
    { number: 'SUS 24h', label: 'UPA 24h & Centros de Oftalmologia', detail: 'Acesso universal à Rede de Urgência Oftalmológica' },
  ],
};

export const GITHUB_REPOSITORY_COMMAND = `# COMANDO COMPLETO PARA REPOSITÓRIO GITHUB
# Projeto: Plataforma Completa + Validador Público + Certificado Nº 10 Acessível e Editável
# Tema: Campanha Educativa Comunitária de Primeiros Socorros Oculares: Distribuição de Infográficos de Bolso sobre Traumas e Queimaduras Químicas

CONTEXTO E PAPEL DA IA / DESENVOLVEDOR FULL-STACK:
Você é o Arquiteto de Software Sênior, Designer Editorial e Especialista em Conformidade Documental da Editora Mente e Saúde (CNPJ: 51.372.335/0001-71) e do Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83).

Sua missão é construir uma aplicação web completa, interativa e responsiva (React + TypeScript + Tailwind CSS + Vite) que funcione simultaneamente como:
1. Plataforma Educativa Interativa da "Campanha Educativa Comunitária de Primeiros Socorros Oculares: Distribuição de Infográficos de Bolso sobre Traumas e Queimaduras Químicas".
2. Visualizador e Editor Oficial em Estilo PDF Embutido (2 Laudas A4 Horizontal: Frente e Verso) do CERTIFICADO Nº 10 (Código: EMS-EXT-2026-1042), com PDF ACESSÍVEL (camada de texto selecionável/pesquisável), EDITÁVEL (painel de edição em tempo real + edição direta in-loco no documento) e com LINKS CLICÁVEIS ativos no QR Code e nos rodapés das Laudas 1 e 2 apontando dinamicamente para a URL do próprio site (NÃO defina domínio fixo .vercel.app antecipadamente: use \`window.location.origin\` dinamicamente e permita editar a URL base na interface).
3. Sistema Validador e Autenticador Público Interinstitucional (com suporte automático a parâmetros de URL \`?codigo=EMS-EXT-2026-1042#validador\`, leitura via QR Code, validação por Código ou Chave de Controle e verificação de Hash SHA-256).

================================================================================
1. DIRETRIZES DE DESIGN E PALETA DE CORES CRIATIVA E ORIGINAL
================================================================================
- Paleta da Plataforma Web (60-30-10):
  * 60% Fundo Clínico & Editorial: Off-White Cirúrgico (#F8FAFC) alternado com seções de alto contraste em Azul Cobalto Profundo (#0F172A).
  * 30% Superfícies Estruturais: Branco Puro (#FFFFFF), bordas finas (#E2E8F0) e tipografia em Ardósia (#334155).
  * 10% Acentos de Urgência Oftalmológica:
    - Coral de Alerta Químico (#E11D48): Destaques de emergência absoluta (queimaduras por álcali e condutas proibidas).
    - Azul Cobalto Clínico (#1D4ED8): Protocolos de irrigação ocular, proteção com escudo rígido e fluxos do SUS.
    - Âmbar Químico (#D97706): Indicadores de equilíbrio de pH conjuntival, alertas de ácido e tempo de lavagem.
- Paleta Exclusiva do Certificado Nº 10 (Padrão Acadêmico Solene Inalterável):
  * Fundo Creme Acadêmico (#FAF9F6)
  * Moldura Dupla: Externa em Verde Institucional (#0F4C3A) e Interna em Azul Marinho (#1B365D)
  * Selo Oficial de Fé Pública em Ouro Velho (#B8962E / #FDF8E7)
  * Fontes: 'Libre Baskerville' (títulos solenes, nome do titular e cidade/data em itálico), 'Plus Jakarta Sans' (corpo do texto perfeitamente alinhado) e 'IBM Plex Mono' (códigos, CNPJ, chaves e hash SHA-256).

================================================================================
2. REQUISITOS CRÍTICOS DO PDF: ACESSÍVEL, EDITÁVEL E COM LINKS CLICÁVEIS (SEM URL VERCEL FIXA)
================================================================================
1. URL Dinâmica (Não definir domínio Vercel fixo antecipadamente):
   - O sistema NÃO deve trazer uma URL ".vercel.app" chumbada/fixa por padrão.
   - Deve capturar automaticamente \`window.location.origin\` (a URL real onde o projeto estiver rodando) e permitir que o usuário edite a URL base em tempo real no Painel Editor do Certificado antes de gerar o PDF.
2. Certificado Editável (Painel de Edição + Edição Direta no Documento):
   - Disponibilize um modo "Editar Certificado / Configurar URL" onde todos os campos (URL do site autenticador, Nome, CPF, Período, Data de Emissão, Carga Horária, Livro/Folha, Código, Chave de Controle, SHA-256 e Textos) possam ser editados antes da exportação, além de permitir \`contentEditable\` direto nos textos do certificado quando o modo de edição estiver ativo.
3. Links Clicáveis no QR Code e no Rodapé (Na Tela e Dentro do Arquivo PDF Baixado):
   - Na visualização web E no arquivo PDF gerado:
     * O QR Code da Lauda 1 (Frente) e o QR Code da Lauda 2 (Verso) devem ser links clicáveis (\`<a href="...">\` no HTML e \`pdf.link(x, y, w, h, { url })\` no jsPDF) que abrem \`\${siteUrl}/?codigo=EMS-EXT-2026-1042#validador\`.
     * O endereço web no quadro "AUTENTICAÇÃO PÚBLICA MANUAL", na linha de rodapé da Lauda 1 e no Bloco 4 da Lauda 2 também devem ser links clicáveis ativos tanto na tela quanto dentro do PDF baixado!
4. PDF Acessível (Texto Selecionável / Vetorial + Metadados de Acessibilidade PDF):
   - O gerador PDF deve embutir metadados completos do documento (\`pdf.setProperties({ title, subject, author, keywords, creator })\`), camada de texto acessível/selecionável e oferecer também o botão de exportação PDF Vetorial Nativo (\`window.print()\` com \`@page { size: A4 landscape; margin: 0; }\`) onde 100% das fontes, SVGs e links são vetoriais e editáveis em softwares como Adobe Acrobat, Illustrator ou LibreOffice Draw.

================================================================================
3. HIGIENIZAÇÃO VISUAL OBRIGATÓRIA DOS LOGOTIPOS E ASSINATURAS (VETOR / PNG TRANSPARENTE)
================================================================================
1. Logotipo "Editora Mente e Saúde" (Canto Superior Esquerdo):
   - Emblema vetorial com fundo 100% transparente/integrado, livro aberto na base e selo circular com perfil humano + cérebro/folhas verdes (#0F4C3A).
   - Ao lado:
     EDITORA MENTE E SAÚDE
     CNPJ: 51.372.335/0001-71
     Conselho Editorial e Extensão Científica
2. Logotipo "Centro Profissionalizante Maria Dalva de Araújo" (Canto Superior Direito):
   - Emblema circular azul-marinho (#1B365D) com lâmpada em quebra-cabeça branca ao centro, sem cantoneiras externas e SEM números de telefone.
   - Ao lado:
     CENTRO PROFISSIONALIZANTE
     MARIA DALVA DE ARAÚJO
     CNPJ: 51.269.112/0001-83
3. Assinatura 1 — Bárbara Lima dos Santos (Esquerda):
   - Rubrica vetorial limpa em fundo 100% transparente (sem mancha cinza de papel).
   - Texto impresso corrigido no feminino:
     BÁRBARA LIMA DOS SANTOS
     Editora-Chefe e Coordenadora de Extensão Editorial
     Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)
4. Assinatura 2 — James Araújo de Santana (Direita):
   - Rubrica vetorial limpa em fundo 100% transparente.
   - Texto impresso com CNPJ na pontuação oficial da Receita Federal:
     JAMES ARAÚJO DE SANTANA
     Coordenador de Extensão e Projetos Educativos
     Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)

================================================================================
4. CONTEÚDO INTEGRAL DO CERTIFICADO Nº 10 (FRENTE E VERSO — 2 LAUDAS A4 PAISAGEM)
================================================================================

--- PÁGINA 1: FRENTE DO CERTIFICADO (297mm x 210mm) ---
CABEÇALHO CENTRAL:
PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO, COMUNICAÇÃO CIENTÍFICA E EDUCAÇÃO EM SAÚDE
Certificado Nº 10 · Livro de Extensão nº 01/2026 · Cód. EMS-EXT-2026-1042

TÍTULO PRINCIPAL:
CERTIFICADO DE ATIVIDADE DE EXTENSÃO

TEXTO DE ABERTURA:
A Editora Mente e Saúde (CNPJ: 51.372.335/0001-71), em parceria institucional com o Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83), certifica para os devidos fins de comprovação curricular e acadêmica que

QUADRO DO TITULAR:
LUCAS GONÇALVES SILVEIRA
Médico | CPF: 702.794.941-57 | Centro Universitário de Anápolis (UNIFAN)

CORPO DO TEXTO (COM NEGRITOS ESTRATÉGICOS PARA BANCA EXAMINADORA):
Parágrafo 1:
participou de forma efetiva da **Atividade de Extensão** intitulada **“Campanha Educativa Comunitária de Primeiros Socorros Oculares: Distribuição de Infográficos de Bolso sobre Traumas e Queimaduras Químicas”**, desenvolvida na modalidade de **Campanha Educativa e Atividade Comunitária**, realizada no período de **12 a 14 de março de 2026**, contabilizando carga horária total de **08 (oito) horas**.

Parágrafo 2:
No âmbito desta ação extensionista, o profissional atuou na elaboração técnico-científica e distribuição comunitária física e digital de **infográficos rápidos de bolso e guias preventivos sobre conduta imediata em traumas e queimaduras químicas oculares** (protocolo de irrigação abundante nos primeiros segundos), **comunicação científica para combate à desinformação (fake news)** sobre receitas caseiras e colírios anestésicos sem prescrição, aplicação de enquete comunitária de letramento em urgências visuais para **coleta de dados populacionais e divulgação dos canais oficiais de urgência oftalmológica do SUS (SAMU 192, Corpo de Bombeiros 193 e UPA 24h).**

LOCAL E DATA:
Goiânia - GO, 20 de março de 2026.

RODAPÉ DE AUTENTICAÇÃO (PÁGINA 1):
- Assinatura Esquerda: Bárbara Lima dos Santos
- Centro: Selo Oficial Fé Pública (EMS-EXT-2026-1042) + QR Code Clicável + Quadro "AUTENTICAÇÃO PÚBLICA MANUAL":
  * Cód.: EMS-EXT-2026-1042
  * Chave: 1042-8834-5921-7F4C
  * Endereço p/ Verificação Online: Link Clicável Dinâmico (\`\${siteUrl}/?codigo=EMS-EXT-2026-1042#validador\`)
- Assinatura Direita: James Araújo de Santana
- Linha Inferior: Verifique via QR Code ou acesse [LINK CLICÁVEL DINÂMICO] informando o Código EMS-EXT-2026-1042 ou Chave 1042-8834-5921-7F4C

--- PÁGINA 2: VERSO DO CERTIFICADO — MEMORIAL DESCRITIVO (297mm x 210mm) ---
TÍTULO DO VERSO:
MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO DE ATIVIDADE DE EXTENSÃO
Verso Oficial do Certificado Nº 10 · Fé Pública Interinstitucional e Validação Curricular

BLOCO 1 — DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL EXTENSIONISTA:
- Titular Certificado: LUCAS GONÇALVES SILVEIRA
- CPF Registrado: 702.794.941-57
- Qualificação Profissional: Médico
- Instituição de Origem: Centro Universitário de Anápolis (UNIFAN)

BLOCO 2 — ENQUADRAMENTO CURRICULAR E PONTUAÇÃO:
- Item 08 - Atividades de Extensão: Campanhas educativas, de vacinação, coleta de dados populacionais e atividades comunitárias
- Período: 12 a 14 de março de 2026 | Total: 08h

BLOCO 3 — MATRIZ DE ATIVIDADES PRÁTICAS E METODOLOGIA EXTENSIONISTA (08 HORAS):
- Eixo I — Curadoria Científica e Protocolos de Urgência Oftalmológica (02h 00min)
- Eixo II — Produção Editorial de Infográficos de Bolso e Guias Rápidos (02h 30min)
- Eixo III — Comunicação Científica, Coleta de Dados e Combate a Fake News (01h 30min)
- Eixo IV — Ação Comunitária e Divulgação dos Canais de Urgência do SUS (02h 00min)

BLOCO 4 — REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE VERIFICAÇÃO:
- Registro: Certificado registrado sob o nº 10 no Livro de Extensão nº 01/2026, Folha 34.
- CÓDIGO DE AUTENTICIDADE: EMS-EXT-2026-1042 | CHAVE DE CONTROLE / DÍGITO: 1042-8834-5921-7F4C
- ENDEREÇO PARA VERIFICAÇÃO MANUAL (SEM QR CODE): Link Clicável Dinâmico (\`\${siteUrl}/?codigo=EMS-EXT-2026-1042#validador\`)
- HASH SHA-256: 9f4e8c21a7b36d50e1928c47b6a50d38f2e19c84a7b63d51e0829f4a6c3b1042`;

