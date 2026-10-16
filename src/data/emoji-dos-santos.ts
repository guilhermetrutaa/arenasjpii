export type EmojiDifficultyId = "facil" | "medio" | "desafio";

export type EmojiSaint = {
  /** Identificador estável do santo. Serve para manutenção e depuração. */
  id: string;
  /** Nome normalizado: é o que o detector de fala compara. Não é exibido. */
  name: string;
  /** Nome como aparece na revelação da rodada. */
  displayName: string;
  emojis: [string, string, string];
  difficulty: EmojiDifficultyId;
  /** Primeira dica, liberada aos 10 segundos da rodada. */
  hint1: string;
  /** Segunda dica, liberada aos 20 segundos da rodada. */
  hint2: string;
  /** Curiosidade educativa mostrada junto com a resposta correta. */
  curiosity: string;
  /** Formas aceitas pelo reconhecedor de voz, além do nome canônico. */
  acceptedNames?: string[];
};

export const EMOJI_GAME_ROUNDS = 8;
export const EMOJI_ROUND_SECONDS = 30;

/**
 * Um acerto vale `EMOJI_BASE_POINTS × multiplicador do nível`. A base é 1 para
 * que a pontuação seja literalmente a quantidade de acertos multiplicada pelo
 * nível: 3 acertos no Médio valem 3 × 2 = 6 pontos, e a partida vale no máximo
 * 8 (Fácil), 16 (Médio) ou 24 (Desafio).
 */
export const EMOJI_BASE_POINTS = 1;

/**
 * Segundos decorridos na rodada em que cada dica é liberada. A primeira dica
 * entra aos 10s e a segunda aos 20s; as duas permanecem visíveis juntas.
 */
export const EMOJI_HINT_SECONDS: readonly [number, number] = [10, 20];

export type EmojiDifficulty = {
  id: EmojiDifficultyId;
  label: string;
  tagline: string;
  multiplier: number;
  description: string;
};

export const EMOJI_DIFFICULTIES: readonly EmojiDifficulty[] = [
  {
    id: "facil",
    label: "Fácil",
    tagline: "Comece a jogar",
    multiplier: 1,
    description: "Santos populares e emojis com leitura direta.",
  },
  {
    id: "medio",
    label: "Médio",
    tagline: "Vale o dobro",
    multiplier: 2,
    description: "Santos de conhecimento intermediário, com mais desafio.",
  },
  {
    id: "desafio",
    label: "Desafio",
    tagline: "Vale o triplo",
    multiplier: 3,
    description: "Santos menos conhecidos e símbolos que exigem mais estudo.",
  },
];

export const EMOJI_DIFFICULTY_BY_ID: Record<EmojiDifficultyId, EmojiDifficulty> = EMOJI_DIFFICULTIES.reduce(
  (accumulator, difficulty) => {
    accumulator[difficulty.id] = difficulty;
    return accumulator;
  },
  {} as Record<EmojiDifficultyId, EmojiDifficulty>,
);

/** Maior pontuação que uma única rodada pode conceder. */
export const EMOJI_MAX_ROUND_POINTS = EMOJI_BASE_POINTS * Math.max(...EMOJI_DIFFICULTIES.map((item) => item.multiplier));

/** Pontuação de um acerto no nível informado. */
export function emojiRoundPoints(difficulty: EmojiDifficultyId): number {
  return EMOJI_BASE_POINTS * EMOJI_DIFFICULTY_BY_ID[difficulty].multiplier;
}

/** "1 ponto por acerto" / "2 pontos por acerto". */
export function emojiPointsLabel(points: number): string {
  return `${points} ${points === 1 ? "ponto" : "pontos"}`;
}

/** "acertos × multiplicador" escrito por extenso, para explicar a pontuação. */
export function emojiScoreLabel(difficulty: EmojiDifficultyId): string {
  const { multiplier } = EMOJI_DIFFICULTY_BY_ID[difficulty];
  return `${emojiPointsLabel(multiplier)} por acerto`;
}

/**
 * Quantas dicas já podem ser exibidas depois de `elapsed` segundos de rodada.
 * As dicas são cumulativas e derivadas do relógio da rodada, o que evita
 * temporizadores extras por rodada.
 */
export function emojiHintsRevealed(elapsed: number): number {
  const [first, second] = EMOJI_HINT_SECONDS;
  if (elapsed >= second) return 2;
  if (elapsed >= first) return 1;
  return 0;
}

/** Embaralhamento Fisher-Yates: sem viés de `sort(() => Math.random() - 0.5)`. */
export function shuffleEmojiSaints<T>(values: readonly T[]): T[] {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
}

export const emojiSaints: EmojiSaint[] = [
  // =====================================================================
  // FÁCIL — santos populares no Brasil e emojis de leitura direta.
  // =====================================================================
  {
    id: "francisco-de-assis",
    name: "são francisco de assis",
    displayName: "São Francisco de Assis",
    // Os pássaros que ele pregava, o lobo de Gúbio e a criação que cantava.
    emojis: ["🐦", "🐺", "🌿"],
    difficulty: "facil",
    hint1: "É conhecido como o santo dos animais e da criação.",
    hint2: "Fundou a Ordem dos Frades Menores e reconstruiu a igreja de São Damião.",
    curiosity: "Chamado também de Pobre de Cristo, deixou a riqueza para viver na simplicidade de um frade mendicante.",
    acceptedNames: [
      "francisco de assis", "são francisco", "francisquinho", "chiquinho", "protetor dos animais",
      "francitco", "frantisco", "chico", "são chico", "prancisco", "frantitco", "sao francisco"
    ],
  },
  {
    id: "santo-antonio",
    name: "santo antônio",
    displayName: "Santo Antônio",
    // O Menino Jesus sobre o livro, o livro da pregação e o lírio.
    emojis: ["👶", "📖", "🌸"],
    difficulty: "facil",
    hint1: "É representado quase sempre com o Menino Jesus.",
    hint2: "É popularmente invocado para encontrar objetos perdidos.",
    curiosity: "Frade franciscano, pregou em Coimbra, no Marrocos e em Pádua, e é chamado de Doutor da Igreja.",
    acceptedNames: [
      "santo antônio de pádua", "santo antónio", "santo antonio", "santo casamenteiro",
      "antogno", "antonu", "atonio", "antnio", "atognio", "santo antonio de padua"
    ],
  },
  {
    id: "sao-pedro",
    name: "são pedro",
    displayName: "São Pedro",
    // As chaves do Reino, a rede de pescador e a Igreja que lhe foi confiada.
    emojis: ["🔑", "🐟", "⛪"],
    difficulty: "facil",
    hint1: "Foi um dos doze apóstolos de Jesus.",
    hint2: "É tradicionalmente representado com chaves.",
    curiosity: "No Evangelho de Mateus, Jesus lhe diz que sobre esta pedra edificará a Igreja e lhe dará as chaves do Reino dos Céus.",
    acceptedNames: [
      "pedro", "pedu", "petro", "pedru", "pegro",
      "são pedro", "sao pedro", "são pedro apóstolo", "apóstolo pedro"
    ],
  },
  {
    id: "sao-jose",
    name: "são josé",
    displayName: "São José",
    // A serra de carpinteiro, o lírio e a família de Nazaré.
    emojis: ["🪚", "🌷", "👨‍👩‍👦"],
    difficulty: "facil",
    hint1: "Foi carpinteiro e é chamado de pai de Jesus na terra.",
    hint2: "É esposo da Virgem Maria e pai do Menino Jesus.",
    curiosity: "É chamado de o justo e, na tradição católica, ocupava o primeiro lugar depois de Jesus e de Maria.",
    acceptedNames: [
      "josé", "jote", "zezé", "tozé", "sajose", "zote",
      "são josé", "sao jose", "são josé carpinteiro", "jose carpinteiro"
    ],
  },
  {
    id: "santa-teresinha",
    name: "santa teresinha do menino jesus",
    displayName: "Santa Teresinha do Menino Jesus",
    // A chuva de rosas, a juventude e a Cruz de sua devoção.
    emojis: ["🌹", "👧", "✝️"],
    difficulty: "facil",
    hint1: "Escreveu sobre a infância de Jesus e sobre a sua própria infância.",
    hint2: "Morreu aos 24 anos, em 1897, e foi canonizada em 1925.",
    curiosity: "Chamam-na de Pequena Flor: entrou no Carmelo aos 14 anos para cuidar das monjas doentes.",
    acceptedNames: [
      "santa terezinha", "teresinha do menino jesus", "teresa de lisieux", "terezinha", "santa teresa",
      "teretinha", "telisinha", "santa teretinha", "teresa de lijeu", "santa tereza"
    ],
  },
  {
    id: "sao-joao-paulo-ii",
    name: "são joão paulo ii",
    displayName: "São João Paulo II",
    // As viagens de Papa Peregrino, a pomba da paz e o mundo inteiro.
    emojis: ["✈️", "🕊️", "🌍"],
    difficulty: "facil",
    hint1: "Foi o primeiro papa a visitar o Brasil, em 1979.",
    hint2: "Como Papa, percorreu mais de cem países.",
    curiosity: "Antes do papado foi bispo de Kraków, na Polônia, e seu lema era Totus Tuus: tudo é teu, Maria.",
    acceptedNames: [
      "joão paulo segundo", "papa joão paulo segundo", "joão paulo ii", "joao paulo",
      "joan paulo", "jao paulo", "joao paulo segundo", "papa joao paulo", "papa joão paulo"
    ],
  },
  {
    id: "nossa-senhora-aparecida",
    name: "nossa senhora aparecida",
    displayName: "Nossa Senhora Aparecida",
    // A coroa de Rainha, as águas do rio e a canoa dos pescadores.
    emojis: ["👑", "🌊", "🛶"],
    difficulty: "facil",
    hint1: "É a padroeira do Brasil e sua imagem foi encontrada em um rio.",
    hint2: "Sua imagem apareceu aos pescadores no rio Paraíba.",
    curiosity: "É padroeira do Brasil desde 1826, e sua festa é celebrada em 12 de outubro.",
    acceptedNames: [
      "aparecida", "nossa senhora da aparecida", "nossa senhora aparecida", "padroeira do brasil",
      "aparetida", "abarecida", "notha senhora", "nosa senhora", "cida", "cidinha"
    ],
  },
  {
    id: "santa-rita",
    name: "santa rita de cássia",
    displayName: "Santa Rita de Cássia",
    // A roseira do milagre no inverno, a aliança do matrimônio e a oração.
    emojis: ["🌹", "💍", "🙏"],
    difficulty: "facil",
    hint1: "Chamam-na de Santa das Causas Impossíveis.",
    hint2: "Segundo a tradição, uma roseira brotou no inverno para provar a sua santidade.",
    curiosity: "Ficou oito anos casada sem conhecer o marido e só depois se fez monha; é lembrada em 22 de maio.",
    acceptedNames: [
      "santa rita", "rita de cássia", "rita de catia", "lita", "rita de cassia", "santa lita",
      "rita", "santa rita das causas impossíveis"
    ],
  },
  {
    id: "sao-miguel-arcanjo",
    name: "são miguel arcanjo",
    displayName: "São Miguel Arcanjo",
    // As asas celestes, a espada da justiça e o escudo de proteção.
    emojis: ["🪽", "⚔️", "🛡️"],
    difficulty: "facil",
    hint1: "É um arcanjo, o capitão dos exércitos celestes.",
    hint2: "Na tradição, protege a Igreja e vence o demônio.",
    curiosity: "No livro do Apocalipse aparece lutando contra o dragão, e é lembrado em 29 de setembro.",
    acceptedNames: ["miguel arcanjo", "são miguel", "arcanjo miguel", "miguor", "miquel", "migueu", "sao miguel arcanjo"],
  },
  {
    id: "santa-luzia",
    name: "santa luzia",
    displayName: "Santa Luzia",
    // Os olhos da padroeira da visão, a vela da luz e a palma do martírio.
    emojis: ["👀", "🕯️", "🌴"],
    difficulty: "facil",
    hint1: "É a protetora da visão e dos olhos.",
    hint2: "É representada com os olhos sobre uma bandeja.",
    curiosity: "Foi mártir em Siracusa, na Sicília, e seu dia é 13 de dezembro.",
    acceptedNames: ["luzia", "lutia", "luzha", "ludia", "lusia", "santa luzia", "protetora dos olhos"],
  },
  {
    id: "sao-jorge",
    name: "são jorge",
    displayName: "São Jorge",
    // O dragão da lenda, o cavalo e a espada do guerreiro.
    emojis: ["🐉", "🐎", "⚔️"],
    difficulty: "facil",
    hint1: "É o santo da cavalaria e padroeiro de várias nações europeias.",
    hint2: "É lembrado pela história do dragão e da princesa resgatada.",
    curiosity: "Sua festa, em 23 de abril, também é celebrada por quem pratica montaria e alpinismo.",
    acceptedNames: ["jorge", "são jorge guerreiro", "jorje", "gorge", "coirge", "saojorge", "são jorge", "salve jorge", "sao jorge"],
  },
  {
    id: "nossa-senhora-fatima",
    name: "nossa senhora de fátima",
    displayName: "Nossa Senhora de Fátima",
    // O sol das aparições, as ovelhas do lugar e o terço dos pastorinhos.
    emojis: ["☀️", "🐑", "📿"],
    difficulty: "facil",
    hint1: "Apareceu a três pastorinhos em 1917, em Portugal.",
    hint2: "Segundo a tradição, pediu que se construísse uma igreja no local das aparições.",
    curiosity: "Os três videntes, Lúcia dos Santos e os irmãos Francisco e Jacinta Marto, foram canonizados em 2017.",
    acceptedNames: ["fátima", "nossa senhora da fátima", "virgem de fátima", "fatma", "vatima", "fatima", "nossa senhora de fátima"],
  },
  {
    id: "sao-joao-batista",
    name: "são joão batista",
    displayName: "São João Batista",
    // O deserto da infância, a comida do deserto e o Jordão do batismo.
    emojis: ["🐪", "🍯", "🌊"],
    difficulty: "facil",
    hint1: "Batizou Jesus no rio Jordão.",
    hint2: "É chamado de precursor, porque anunciava a vinda de Cristo.",
    curiosity: "Segundo a tradição, nasceu depois de uma longa oração de sua mãe, Isabel.",
    acceptedNames: ["joão batista", "são joão", "joao batista", "joao batihta", "joao batixta", "jao batista", "são joão batista"],
  },
  {
    id: "santo-padre-pio",
    name: "são padre pio",
    displayName: "São Padre Pio",
    // Os estigmas, as luvas de frei e o convento de San Giovanni Rotondo.
    emojis: ["🩸", "🧤", "⛪"],
    difficulty: "facil",
    hint1: "Recebeu os estigmas de Jesus.",
    hint2: "Canonizado em 2003, é chamado de santo dos milagres.",
    curiosity: "Frei Pio de Pietrelcina foi capelão do convento de San Giovanni Rotondo, na Itália, onde repousa o seu corpo.",
    acceptedNames: ["padre pio", "pio de pietrelcina", "são pio", "são padre pio", "padri pio", "pio", "sao padre pio"],
  },
  {
    id: "santa-cecilia",
    name: "santa cecília",
    displayName: "Santa Cecília",
    // A música, o instrumento e a coroa da martíria virginal.
    emojis: ["🎶", "🎹", "👑"],
    difficulty: "facil",
    hint1: "É a padroeira dos músicos e da música.",
    hint2: "Escolheu a vida de virgem e mártir, recusando casar-se.",
    curiosity: "A capela de Santa Cecília, em Roma, foi erguida sobre a casa em que ela nasceu.",
    acceptedNames: ["cecília", "cecilia", "santa cecilia", "tetilia", "sesilia", "setilia", "santa cecília", "padroeira dos músicos"],
  },
  {
    id: "sao-cosme-e-damiao",
    name: "são cosme e damião",
    displayName: "São Cosme e Damião",
    // Os doces, a medicina e as crianças por eles curateadas.
    emojis: ["🍬", "🩺", "👦"],
    difficulty: "facil",
    hint1: "Foram médicos e são padroeiros das urgências e dos hospitais.",
    hint2: "Segundo a tradição, curavam sem cobrar e ajudavam crianças e pobres.",
    curiosity: "São lembrados em 26 de outubro, e várias cidades brasileiras trazem os dois nomes.",
    acceptedNames: ["cosme e damião", "são cosme e damiao", "cosme", "damião", "cotme e damiao", "são cosme e damião", "cosme damiao"],
  },
  {
    id: "madre-teresa-de-calcuta",
    name: "madre teresa de calcutá",
    displayName: "Madre Teresa de Calcutá",
    // A Índia, as mãos que acolhem e o hospital dos doentes terminais.
    emojis: ["🇮🇳", "🤝", "🏥"],
    difficulty: "facil",
    hint1: "Missionária na Índia, dedicou a vida aos pobres e aos doentes.",
    hint2: "Fundou as Missionárias da Caridade, que hoje existem em mais de cem países.",
    curiosity: "Nasceu na Albânia, recebeu o Nobel da Paz em 1979 e foi canonizada em 2016.",
    acceptedNames: ["madre teresa", "santa teresa de calcutá", "madre teresa de calcutá", "teresa de calcuta", "madre tereza"],
  },
  {
    id: "sao-cristovao",
    name: "são cristóvão",
    displayName: "São Cristóvão",
    // O carro dos motoristas, o Menino Jesus nos ombros e a travessia do rio.
    emojis: ["🚗", "👦", "🌊"],
    difficulty: "facil",
    hint1: "É o padroeiro dos motoristas.",
    hint2: "Segundo a tradição, atravessou um rio com o Menino Jesus nos ombros.",
    curiosity: "É lembrado em 25 de julho, e a lenda da travessia explica o seu padroínio dos que dirigem.",
    acceptedNames: ["são cristóvão", "sao cristovao", "cristóvão", "cristovao", "padroeiro dos motoristas", "são cristóvão"],
  },
  {
    id: "sao-joao-bosco",
    name: "são joão bosco",
    displayName: "São João Bosco",
    // O menino, o oratório e o esporte, marca da pedagogia salesiana.
    emojis: ["👦", "🏫", "⚽"],
    difficulty: "facil",
    hint1: "É chamado de pai e mestre da mocidade.",
    hint2: "Fundou as casas salesianas, onde os jovens estudam, trabalham e praticam esportes.",
    curiosity: "Nasceu na Itália em 1815 e criou o sistema educativo salesiano, à frente do seu tempo.",
    acceptedNames: ["dom bosco", "joão bosco", "sua santidade dom bosco", "joao bosco", "don bosco", "dom botco", "são joão bosco"],
  },

  // =====================================================================
  // MÉDIO — conhecimento intermediário, sem associações abstratas.
  // =====================================================================
  {
    id: "sao-paulo",
    name: "são paulo",
    displayName: "São Paulo",
    // As cartas, a espada da Palavra e o caminho de Damasco.
    emojis: ["📜", "⚔️", "🛣️"],
    difficulty: "medio",
    hint1: "É chamado de Apóstolo das Nações.",
    hint2: "No caminho de Damasco, ouviu as palavras de Cristo e se converteu.",
    curiosity: "Escreveu treze cartas que fazem parte do Novo Testamento e foi martirizado em Roma.",
    acceptedNames: ["paulo", "apóstolo paulo", "paulu", "baulo", "paulo apostolo", "são paulo", "sao paulo", "são paulo apóstolo"],
  },
  {
    id: "santa-clara-de-assis",
    name: "santa clara de assis",
    displayName: "Santa Clara de Assis",
    // O pão multiplicado, o convento de Assis e a lua do Ofício.
    emojis: ["🍞", "⛪", "🌙"],
    difficulty: "medio",
    hint1: "É irmã de São Francisco de Assis.",
    hint2: "A tradição conta que ela salvou o convento de Assis quando o pão faltava.",
    curiosity: "Fundou as Freiras Claras, a primeira ordem dirigida a mulheres na Igreja.",
    acceptedNames: ["santa clara", "clara de assis", "clahra", "calara", "talara", "clara de attit", "clara"],
  },
  {
    id: "santo-expedito",
    name: "santo expedito",
    displayName: "Santo Expedito",
    // A espada, o relógio de areia das causas urgentes e o voo rápido.
    emojis: ["⚔️", "⏳", "🦅"],
    difficulty: "medio",
    hint1: "É o santo das causas urgentes.",
    hint2: "É representado com a espada e o relógio de areia.",
    curiosity: "Foi um centurião romano convertido, é lembrado em 19 de maio e foi canonizado em 2019.",
    acceptedNames: ["expedito", "etpedito", "espedito", "expeditu", "santo expedito", "santo das causas justas", "santo das causas urgentes"],
  },
  {
    id: "sao-sebastiao",
    name: "são sebastião",
    displayName: "São Sebastião",
    // As flechas do martírio, o tronco em que foi amarrado e o escudo.
    emojis: ["🏹", "🌳", "🛡️"],
    difficulty: "medio",
    hint1: "É representado com flechas cravadas no corpo.",
    hint2: "Foi mártir sob o imperador Diocleciano.",
    curiosity: "Foi soldado do exército romano e é lembrado em 20 de janeiro.",
    acceptedNames: ["sebastião", "sebastiao", "tebactiao", "sebastao", "xebastiao", "tebastiao", "são sebastião", "sao sebastiao"],
  },
  {
    id: "santa-faustina",
    name: "santa faustina",
    displayName: "Santa Faustina",
    // O diário, o coração misericordioso e o brilho da graça.
    emojis: ["📕", "💖", "✨"],
    difficulty: "medio",
    hint1: "Registrou em um diário os ensinamentos sobre a Divina Misericórdia.",
    hint2: "Sua visão deu origem ao culto do Bom Jesus Misericordioso.",
    curiosity: "Foi canonizada em 2018 e seus restos mortais estão em Kraków, na Polônia.",
    acceptedNames: ["faustina", "santa maria faustina", "irmã faustina", "fautina", "pautina", "irma fautina", "santa faustina", "divina misericórdia"],
  },
  {
    id: "sao-francisco-xavier",
    name: "são francisco xavier",
    displayName: "São Francisco Xavier",
    // O navio das viagens missionárias, o sino do chamado e a Cruz da fé.
    emojis: ["⛵", "🔔", "✝️"],
    difficulty: "medio",
    hint1: "Companheiro de Santo Antônio, foi missionário na Índia e no Japão.",
    hint2: "É chamado de missionário do Navio, por causa das viagens marítimas.",
    curiosity: "Morreu na ilha de Shangchuan, na China, em 1552, e é lembrado em 3 de dezembro.",
    acceptedNames: ["francisco xavier", "são francisco xavier", "francisco chavier", "francitco tavier", "sao francisco xavier"],
  },
  {
    id: "sao-lucas",
    name: "são lucas",
    displayName: "São Lucas",
    // A tela, o boi do Evangelho e a medicina.
    emojis: ["🎨", "🐂", "🩺"],
    difficulty: "medio",
    hint1: "É um dos quatro evangelistas, autor do terceiro Evangelho.",
    hint2: "Seu símbolo é o boi, e é patrono dos médicos e dos pintores.",
    curiosity: "Companheiro de São Paulo, escreveu o Evangelho e o livro dos Atos dos Apóstolos.",
    acceptedNames: ["lucas", "evangelista lucas", "luca", "lucat", "luta", "rucas", "são lucas", "sao lucas"],
  },
  {
    id: "sao-rafael-arcanjo",
    name: "são rafael arcanjo",
    displayName: "São Rafael Arcanjo",
    // As asas, o peixe da cura de Tobias e a medicina.
    emojis: ["🪽", "🐟", "🩺"],
    difficulty: "medio",
    hint1: "É o arcanjo da cura e da saúde.",
    hint2: "Curou um cego com o fumo de um peixe assado.",
    curiosity: "É lembrado em 24 de outubro; o seu nome significa Deus cura.",
    acceptedNames: ["rafael arcanjo", "são rafael", "arcanjo rafael", "rafaeu", "lafael", "sao rafael arcanjo"],
  },
  {
    id: "nossa-senhora-do-carmo",
    name: "nossa senhora do carmo",
    displayName: "Nossa Senhora do Carmo",
    // O terço, o Monte Carmelo e o escapulário do Carmo.
    emojis: ["📿", "⛰️", "🧥"],
    difficulty: "medio",
    hint1: "A tradição situa a sua aparição no Monte Carmelo, na Palestina.",
    hint2: "É identificada pelo escapulário do Carmo.",
    curiosity: "Os carmelitas conservam a memória da nuvem que cobriu o monte; a festa é em 16 de julho.",
    acceptedNames: ["nossa senhora do carmo", "virgem do carmo", "carmo", "calmo", "nossa senhora do monte carmelo"],
  },
  {
    id: "carlo-acutis",
    name: "carlo acutis",
    displayName: "Carlo Acutis",
    // O computador, os tênis e o pão da eucaristia amada.
    emojis: ["💻", "👟", "🍞"],
    difficulty: "medio",
    hint1: "Foi canonizado em 2020 e é chamado de santo dos adolescentes e da internet.",
    hint2: "Adorava a Eucaristia e tinha grande afeição pelos jovens e pelos esportes.",
    curiosity: "Italiano, morreu aos 15 anos de um tumor no pulmão e é chamado de santo da internet.",
    acceptedNames: ["carlo acutis", "bem-aventurado carlo acutis", "carla acutis", "carlo acuti", "beato carlo acutis"],
  },
  {
    id: "santa-filomena",
    name: "santa filomena",
    displayName: "Santa Filomena",
    // A âncora do martírio, a flor da pureza e a espada.
    emojis: ["⚓", "🌸", "🗡️"],
    difficulty: "medio",
    hint1: "É reconhecida pela âncora, símbolo do seu martírio.",
    hint2: "É intercessora das causas perdidas e dos objetos sumidos.",
    curiosity: "Existe em Roma um relicário em cristal com seus restos mortais, descobertos em 1802.",
    acceptedNames: ["santa filomena", "filomena", "filó", "santa filó", "filumena", "santa filumena"],
  },
  {
    id: "sao-longuinho",
    name: "são longuinho",
    displayName: "São Longuinho",
    // A longa lança, a cura pelo sangue de Jesus e a lupa dos achados.
    emojis: ["🗡️", "🩸", "🔍"],
    difficulty: "medio",
    hint1: "É o padroeiro dos objetos achados e perdidos.",
    hint2: "Segundo a tradição, foi cegado por uma lança e curado pelo sangue de Jesus.",
    curiosity: "O nome vem da longa lança que o atingiu, e sua história é muito popular no Brasil.",
    acceptedNames: ["são longuinho", "longuinho", "sao longuinho", "longuinho dos achados e perdidos", "longuim", "são longinho"],
  },
  {
    id: "sao-lazaro",
    name: "são lázaro",
    displayName: "São Lázaro",
    // As feridas, os cachorros e os curativos.
    emojis: ["🤕", "🐕", "🩹"],
    difficulty: "medio",
    hint1: "É o padroeiro dos cachorros.",
    hint2: "Segundo a tradição, Jesus o ressuscitou depois de quatro dias enterrado.",
    curiosity: "A tradição conta que os cachorros liam suas feridas; é lembrado em 16 de setembro.",
    acceptedNames: ["são lázaro", "sao lazaro", "lázaro", "lazaro", "lasaro", "protetor dos cachorros"],
  },
  {
    id: "santa-ines",
    name: "santa inês",
    displayName: "Santa Inês",
    // O cordeiro da pureza, a juventude e a palma do martírio.
    emojis: ["🐑", "👧", "🌴"],
    difficulty: "medio",
    hint1: "É representada com um cordeiro aos pés, símbolo da pureza.",
    hint2: "Segundo a tradição, recusou o casamento offerto pelo imperador para se consagrar a Deus.",
    curiosity: "Foi martirizada com uma espada no pescoço e é lembrada em 21 de janeiro.",
    acceptedNames: ["santa inês", "santa ines", "inês", "ines", "inez", "santa inez"],
  },
  {
    id: "sao-bras",
    name: "são brás",
    displayName: "São Brás",
    // A garganta, as duas velas cruzadas e o lenço no pescoço.
    emojis: ["🗣️", "🕯️", "🧣"],
    difficulty: "medio",
    hint1: "É o padroeiro da garganta e da voz.",
    hint2: "É representado com duas velas cruzadas e um lenço no pescoço.",
    curiosity: "Nasceu no Japão e foi missionário na China; é lembrado em 4 de dezembro.",
    acceptedNames: ["são brás", "sao bras", "brás", "bras", "protetor da garganta", "são braz"],
  },
  {
    id: "nossa-senhora-de-nazare",
    name: "nossa senhora de nazaré",
    displayName: "Nossa Senhora de Nazaré",
    // O círio de velas, a procissão de barcos e a coroa.
    emojis: ["🕯️", "⛵", "👑"],
    difficulty: "medio",
    hint1: "É conhecida pelas grandes procissões e romarias em sua homenagem.",
    hint2: "É de uma cidade da Galileia cujo nome ficou conhecido no mundo inteiro.",
    curiosity: "O círio de Nazaré, com milhares de velas, é uma das maiores romarias do Brasil.",
    acceptedNames: ["nossa senhora de nazaré", "nazica", "nossa senhora de nazare", "virgem de nazaré", "nazaré", "círio de nazaré"],
  },
  {
    id: "santo-agostinho",
    name: "santo agostinho",
    displayName: "Santo Agostinho",
    // O livro das Confissões, o coração inquieto e a Cruz.
    emojis: ["📖", "❤️", "✝️"],
    difficulty: "medio",
    hint1: "Escreveu as Confissões, e é chamado de Doutor da Graça.",
    hint2: "Era filho de Santa Mônica e só se converteu depois de uma longa busca por Deus.",
    curiosity: "Nasceu em Hipona, na África, virou bispo em Milão e é lembrado em 29 de agosto.",
    acceptedNames: ["santo agostinho", "agostinho de hipona", "agostinho", "acostinho", "agottinho", "doutor da graça"],
  },
  {
    id: "sao-tomas-de-aquino",
    name: "são tomás de aquino",
    displayName: "São Tomás de Aquino",
    // O sol da inteligência, os livros da Suma e a pena de escrever.
    emojis: ["☀️", "📚", "✍️"],
    difficulty: "medio",
    hint1: "É chamado de Doutor Angélico.",
    hint2: "Escreveu a Suma Teológica, uma das obras mais influentes da filosofia cristã.",
    curiosity: "Pertenceu aos dominicanos, a ordem de São Domingos, e é lembrado em 7 de março.",
    acceptedNames: ["são tomás de aquino", "tomás de aquino", "tomas de aquino", "tomas de aquinu", "doutor angélico", "tomat de aquino"],
  },
  {
    id: "nossa-senhora-da-conceicao",
    name: "nossa senhora da conceição",
    displayName: "Nossa Senhora da Conceição",
    // A coroa, a lua sob os pés e a coroa de estrelas.
    emojis: ["👑", "🌙", "🌟"],
    difficulty: "medio",
    hint1: "A Igreja ensina que ela foi preservada do pecado original.",
    hint2: "No livro do Apocalipse, aparece com a lua sob os pés e uma coroa de estrelas.",
    curiosity: "O dogma da Imaculada Conceição foi definido pelo papa Pio IX, em 1854.",
    acceptedNames: ["nossa senhora da conceição", "nossa senhora da conceicao", "conceição", "conceicao", "conteicao", "virgem da conceição", "notha senhora da conceição", "imaculada conceição"],
  },
  {
    id: "sao-jeronimo",
    name: "são jerônimo",
    displayName: "São Jerônimo",
    // A Bíblia traduzida, o leão amigo e a Cruz do eremita.
    emojis: ["📜", "🦁", "✝️"],
    difficulty: "medio",
    hint1: "Traduziu a Bíblia para o latim e é representado com um leão.",
    hint2: "Segundo a tradição, tirou uma espinha do pé de um leão ferido.",
    curiosity: "Viveu muitos anos no deserto e é lembrado em 30 de setembro.",
    acceptedNames: ["são jerônimo", "sao jeronimo", "jerônimo", "jeronimo", "jeronimu", "tradutor da bíblia", "geronimo"],
  },
  {
    id: "sao-gabriel-arcanjo",
    name: "são gabriel arcanjo",
    displayName: "São Gabriel Arcanjo",
    // As asas, o lírio da Anunciação e a trombeta.
    emojis: ["🪽", "🌺", "📯"],
    difficulty: "medio",
    hint1: "É o arcanjo da Anunciação.",
    hint2: "Anunciou a Maria que ela iria ser a mãe de Jesus.",
    curiosity: "Seu nome significa força de Deus, e é lembrado em 24 de março.",
    acceptedNames: ["são gabriel", "gabriel arcanjo", "arcanjo gabriel", "gabrieu", "gabliel", "sao gabriel arcanjo", "anjo da anunciação"],
  },

  // =====================================================================
  // DESAFIO — santos menos conhecidos e símbolos que exigem mais estudo.
  // As dicas são mais sutis, mas continuam corretas e suficientes para
  // reconhecer o santo. Nada aqui pode depender de adivinhação.
  // =====================================================================
  {
    id: "sao-judas-tadeu",
    name: "são judas tadeu",
    displayName: "São Judas Tadeu",
    // O machado da pregação, a carta e as moedas da traição de Judas.
    emojis: ["🪓", "📜", "🪙"],
    difficulty: "desafio",
    hint1: "Foi um dos doze apóstolos e irmão de Tiago, o Menor.",
    hint2: "Escreveu a Carta de Santiago, que faz parte do cânon da Bíblia.",
    curiosity: "É lembrado em 28 de outubro e é representado com o martelo ou o machado.",
    acceptedNames: ["judas tadeu", "são judas", "judat", "gudas", "judas tadeus", "judat tadeu", "sao judas tadeu"],
  },
  {
    id: "santa-monica",
    name: "santa mônica",
    displayName: "Santa Mônica",
    // O choro das orações, o filho e a igreja onde ela esperou.
    emojis: ["😭", "👩‍👦", "⛪"],
    difficulty: "desafio",
    hint1: "Orou por muitos anos para a conversão do filho.",
    hint2: "Era a mãe de Santo Agostinho.",
    curiosity: "Sua história é lembrada em 27 de agosto, como exemplo de paciência e de oração.",
    acceptedNames: ["mônica", "santa monica", "monika", "monia", "monica", "santa mônica"],
  },
  {
    id: "santa-joana-darc",
    name: "santa joana d'arc",
    displayName: "Santa Joana d'Arc",
    // A armadura, a flor-de-lis da França e o cavalo de guerra.
    emojis: ["🛡️", "⚜️", "🐎"],
    difficulty: "desafio",
    hint1: "É chamada de a Virgem de Orléans.",
    hint2: "Segundo a tradição, ouviu vozes celestes que lhe pediram para libertar a França.",
    curiosity: "Foi queimada na fogueira em 1431, foi canonizada em 1920 e é padroeira da França.",
    acceptedNames: ["joana d'arc", "joana darc", "toana darc", "zoana darc", "santa joana darc", "santa joana d'arc"],
  },
  {
    id: "santa-bernadete",
    name: "santa bernadete",
    displayName: "Santa Bernardete",
    // A água da nascente, a lenha da gruta e a capela de Lourdes.
    emojis: ["💧", "🪵", "⛪"],
    difficulty: "desafio",
    hint1: "Viu a Virgem Maria em Lourdes, na França, em 1858.",
    hint2: "Segundo a tradição, era uma adolescente pobre e quase analfabeta.",
    curiosity: "Foi canonizada em 2018, e sua festa é em 16 de abril.",
    acceptedNames: ["bernadete", "bernadette", "santa bernadette", "belnadete", "benadete", "santa bernadete"],
  },
  {
    id: "sao-domingos-de-gusmao",
    name: "são domingos de gusmão",
    displayName: "São Domingos de Gusmão",
    // O cachorro da tocha, o rosário e a estrela dos pregadores.
    emojis: ["🐕", "📿", "🌟"],
    difficulty: "desafio",
    hint1: "Fundou a Ordem dos Pregadores, os dominicanos.",
    hint2: "Seu símbolo é um cachorro com uma tocha acesa na boca.",
    curiosity: "Nasceu em Portugal no século XIII, é padroeiro do Mercosul e foi canonizado em 2002.",
    acceptedNames: ["domingos", "domingos de gusmão", "domingu", "domitgos", "domingos de gutmao", "são domingos", "sao domingos"],
  },
  {
    id: "sao-patricio",
    name: "são patrício",
    displayName: "São Patrício",
    // O trevo da Trindade, a catedral e a ilha da Irlanda.
    emojis: ["☘️", "⛪", "🌊"],
    difficulty: "desafio",
    hint1: "É o padroeiro da Irlanda.",
    hint2: "Usa o trevo para representar a Santíssima Trindade.",
    curiosity: "Segundo a tradição, missionou na Irlanda e expulsou de lá as serpentes; é lembrado em 17 de março.",
    acceptedNames: ["patrício", "patricio", "são patricio", "patritio", "patritsio", "batricio", "são patrício"],
  },
  {
    id: "sao-tiago-menor",
    name: "são tiago menor",
    displayName: "São Tiago Menor",
    // O livro, a pena e a cidade onde pregou.
    emojis: ["📖", "✍️", "🏛️"],
    difficulty: "desafio",
    hint1: "Foi um dos doze apóstolos e irmão de Jesus.",
    hint2: "É creditado como autor de uma das cartas do Novo Testamento.",
    curiosity: "É o Menor para não ser confundido com São Tiago Maior, o patrono dos peregrinos.",
    acceptedNames: ["tiago menor", "são tiago menor", "thiago menor", "tiago", "são tiago"],
  },
  {
    id: "sao-frei-galvao",
    name: "são frei galvão",
    displayName: "São Frei Galvão",
    // O livro do direito, a caneta e o documento da faculdade.
    emojis: ["💊", "📄", "✍️"],
    difficulty: "desafio",
    hint1: "É o padroeiro dos advogados no Brasil.",
    hint2: "É irmão de José de Anchieta.",
    curiosity: "Ensinou direito no Brasil e é lembrado em 25 de novembro.",
    acceptedNames: ["frei galvão", "são frei galvao", "frei galvao", "flei galvao", "santo antonio de santana galvão"],
  },
  {
    id: "santa-catherine-de-sena",
    name: "santa catherine de sena",
    displayName: "Santa Catarina de Sena",
    // O Espírito Santo, a pena e a coroa da doutora da Igreja.
    emojis: ["🕊️", "✍️", "👑"],
    difficulty: "desafio",
    hint1: "Escreveu o tratado O Diálogo da Providência, também chamado de A Mística.",
    hint2: "É conhecida pelo caminho da volta: deixar tudo para seguir apenas Deus.",
    curiosity: "Autora do Cântico do Cântico dos Cantos, foi declarada Doutora da Igreja em 1975.",
    acceptedNames: ["catarina de sena", "santa catarina de sena", "catarina", "catalina", "catherine de sena", "santa catarina"],
  },
  {
    id: "santa-teresa-d-avila",
    name: "santa teresa d'ávila",
    displayName: "Santa Teresa d'Ávila",
    // O castelo da vida interior, a pena e o Espírito Santo.
    emojis: ["🏰", "✍️", "🕊️"],
    difficulty: "desafio",
    hint1: "Escreveu sobre o Castelo Interior, imagem da vida interior.",
    hint2: "Foi a primeira mulher declarada Doutora da Igreja.",
    curiosity: "Nasceu em Ávila, na Espanha, e ditou suas principais obras a um monge do Carmelo.",
    acceptedNames: ["santa teresa d'ávila", "santa tereza d'ávila", "teresa de avila", "tereta davila", "santa teresa de jesus", "tereza d'avila"],
  },
  {
    id: "sao-bento",
    name: "são bento",
    displayName: "São Bento",
    // A taça da bênção, a medalha com a cruz e a águia com o ovo.
    emojis: ["🍷", "🛡️", "🦅"],
    difficulty: "desafio",
    hint1: "Seu símbolo é uma taça com uma pequena cruz.",
    hint2: "É patrono da Europa, e o seu nome significa bênção.",
    curiosity: "Escreveu a Regra de São Bento, que orienta até hoje a ordem beneditina; é lembrado em 21 de março.",
    acceptedNames: ["bento", "são bento de núrsia", "bento de nursia", "bentu", "pento", "saobento", "são bento", "medalha de são bento"],
  },
  {
    id: "santa-helena",
    name: "santa helena",
    displayName: "Santa Helena",
    // A Cruz encontrada, a coroa de imperatriz e a escavação.
    emojis: ["✝️", "👑", "⛏️"],
    difficulty: "desafio",
    hint1: "Foi imperatriz de Roma e mãe do imperador Constantino.",
    hint2: "Segundo a tradição, encontrou a Cruz de Jesus e a levou para Roma.",
    curiosity: "Segundo a tradição, a Cruz foi descoberta por sua oração; é lembrada em 21 de agosto.",
    acceptedNames: ["santa helena", "helena", "elena", "santa elena", "rainha helena"],
  },
  {
    id: "santa-dulce",
    name: "santa dulce dos pobres",
    displayName: "Santa Dulce dos Pobres",
    // A idosa, o hospital e o pão partilhado com os pobres.
    emojis: ["👵", "🏥", "🥖"],
    difficulty: "desafio",
    hint1: "É conhecida como o anjo bom da Bahia.",
    hint2: "Dedicou a vida aos pobres, aos doentes e aos órfãos de Salvador.",
    curiosity: "Foi a primeira santa da América Latina, canonizada em 2012.",
    acceptedNames: ["irmã dulce", "dulce dos pobres", "santa dulce", "irma dulce", "dulte dos pobres", "duce", "anjo bom da bahia"],
  },
  {
    id: "santa-isabel-de-portugal",
    name: "santa isabel de portugal",
    displayName: "Santa Isabel de Portugal",
    // A coroa de rainha, a Rosa de Ouro e as moedas da esmola.
    emojis: ["👑", "🌹", "🪙"],
    difficulty: "desafio",
    hint1: "Foi rainha de Portugal e é lembrada pela Rosa de Ouro.",
    hint2: "Segundo a tradição, o pão que partia se multiplicava para que todos pudessem comer.",
    curiosity: "Divide a festa de 4 de julho com o seu filho, Santo Antônio de Pádua.",
    acceptedNames: ["isabel de portugal", "rainha santa isabel", "santa isabel", "itabel de portugal", "isabeu", "santa isabel de portugal"],
  },
  {
    id: "sao-lourenco",
    name: "são lourenço",
    displayName: "São Lourenço",
    // As moedas do tesouro da Igreja, a igreja de Roma e o documento das provisões.
    emojis: ["🪙", "⛪", "📜"],
    difficulty: "desafio",
    hint1: "Foi diácono e tesoureiro da Igreja de Roma.",
    hint2: "Segundo a tradição, quando lhe exigiram o tesouro, apresentou os próprios pobres como o verdadeiro tesouro.",
    curiosity: "A tradição conta que os pobres que ele alimentavam retribuíam com bolo na chapa, e é lembrado em 10 de agosto.",
    acceptedNames: ["lourenço", "lourenco", "lourento", "laurenco", "lourensu", "são lourenço", "sao lourenco"],
  },
];

/** Quantos santos de cada nível o jogo tem. Usado em validação e testes. */
export function emojiSaintCountByDifficulty(): Record<EmojiDifficultyId, number> {
  return emojiSaints.reduce(
    (totals, saint) => {
      totals[saint.difficulty] += 1;
      return totals;
    },
    { facil: 0, medio: 0, desafio: 0 } as Record<EmojiDifficultyId, number>,
  );
}

/**
 * Sorteia `count` santos do nível informado, sem repetição dentro da partida.
 * Cada rodada é sempre um sorteio novo, e a partida nunca repete um santo.
 */
export function getEmojiSaintsRound(
  count = EMOJI_GAME_ROUNDS,
  difficulty?: EmojiDifficultyId,
): EmojiSaint[] {
  const pool = difficulty ? emojiSaints.filter((saint) => saint.difficulty === difficulty) : emojiSaints;
  return shuffleEmojiSaints(pool).slice(0, Math.min(count, pool.length));
}

export default emojiSaints;
