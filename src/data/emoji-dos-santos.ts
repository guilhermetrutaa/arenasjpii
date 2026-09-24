export type EmojiSaint = {
  name: string;
  emojis: [string, string, string];
  acceptedNames?: string[];
};

export const EMOJI_GAME_ROUNDS = 8;
export const EMOJI_ROUND_SECONDS = 30;

export const emojiSaints: EmojiSaint[] = [
  // --- SANTOS ORIGINAIS (EXPANDIDOS) ---
  {
    name: "nossa senhora aparecida",
    // Representa a coroa de Rainha, as águas e a canoa dos pescadores que encontraram a imagem.
    emojis: ["👑", "🌊", "🛶"], // 
    acceptedNames: [
      "aparecida", "nossa senhora da aparecida", "nossa senhora aparecida", "padroeira do brasil",
      "aparetida", "abarecida", "notha senhora", "nosa senhora", "cida", "cidinha", "nossa senhora"
    ],
  },
  {
    name: "são francisco de assis",
    // A pomba da paz, a natureza/criação e a igrejinha de São Damião que ele reconstruiu.
    emojis: ["🕊️", "🌿", "⛪"], // [cite: 3]
    acceptedNames: [
      "francisco de assis", "são francisco", "francisquinho", "chiquinho", "protetor dos animais",
      "francitco", "frantisco", "chico", "são chico", "prancisco", "frantitco", "sao francisco"
    ],
  },
  {
    name: "santa teresinha do menino jesus",
    // A chuva de rosas, a sua juventude e a sua forte devoção à Santa Cruz.
    emojis: ["🌹", "👧", "✝️"], // [cite: 4]
    acceptedNames: [
      "santa terezinha", "teresinha do menino jesus", "teresa de lisieux", "terezinha", "santa teresa",
      "teretinha", "telisinha", "santa teretinha", "teresa de lijeu", "santa tereza"
    ],
  },
  {
    name: "são josé",
    // A serra de carpinteiro, a Sagrada Família e o lírio da pureza.
    emojis: ["🪚", "👨‍👩‍👦", "🌿"], // [cite: 5]
    acceptedNames: [
      "josé", "jote", "zezé", "tozé", "sajose", "zote", 
      "são josé", "sao jose", "são josé carpinteiro", "jose carpinteiro"
    ],
  },
  {
    name: "são pedro",
    // As chaves do Reino dos Céus, a rede de pescador de homens e a Igreja sobre a qual foi edificado.
    emojis: ["🔑", "🐟", "⛪"], // [cite: 6]
    acceptedNames: [
      "pedro", "pedu", "petro", "pedru", "pegro", 
      "são pedro", "sao pedro", "são pedro apóstolo", "apóstolo pedro"
    ],
  },
  {
    name: "são paulo",
    // As cartas/epístolas escritas, a espada da palavra e a estrada de Damasco.
    emojis: ["📜", "⚔️", "🛣️"], // [cite: 7]
    acceptedNames: [
      "paulo", "apóstolo paulo", "paulu", "baulo", "paulo apostolo", 
      "são paulo", "sao paulo", "são paulo apóstolo"
    ],
  },
  {
    name: "santa rita de cássia",
    // A rosa do milagre no inverno, a aliança do seu matrimónio e a sua profunda oração.
    emojis: ["🌹", "💍", "🙏"], // [cite: 8]
    acceptedNames: [
      "santa rita", "rita de cássia", "rita de catia", "lita", "rita de cassia", "santa lita",
      "rita", "santa rita das causas impossíveis"
    ],
  },
  {
    name: "santo antônio",
    // O pão dos pobres que ele distribuía, o Menino Jesus que lhe apareceu e a aliança de santo casamenteiro.
    emojis: ["🍞", "👶", "💍"], // [cite: 9]
    acceptedNames: [
      "antônio", "santo antónio de pádua", "santo antónio", "santo antonio", "santo casamenteiro",
      "antogno", "antonu", "atonio", "antnio", "atognio", "santo antonio de padua"
    ],
  },
  {
    name: "são joão paulo ii",
    // O avião das suas imensas viagens como Papa Peregrino, a pomba da paz e o globo terrestre.
    emojis: ["✈️", "🕊️", "🌍"], // [cite: 10]
    acceptedNames: [
      "joão paulo segundo", "papa joão paulo segundo", "joão paulo ii", "joao paulo", 
      "joan paulo", "jao paulo", "joao paulo segundo", "papa jao paulo", "papa joão paulo"
    ],
  },
  {
    name: "santa clara de assis",
    // A custódia/brilho da hóstia (representado pelo luar), o pão multiplicado e o convento.
    emojis: ["🌙", "🍞", "⛪"], // [cite: 11]
    acceptedNames: [
      "santa clara", "clara de assis", "clahra", "calara", "talara", "clara de attit", "clara"
    ],
  },
  {
    name: "são miguel arcanjo",
    // As asas celestes, a espada da justiça e o escudo de proteção contra o mal.
    emojis: ["🪽", "⚔️", "🛡️"], // [cite: 12]
    acceptedNames: [
      "miguel arcanjo", "são miguel", "arcanjo miguel", 
      "miguor", "miquel", "migueu", "sao miguel arcanjo"
    ],
  },
  {
    name: "santa luzia",
    // Os olhos no prato, a lamparina da fé/luz e a palma do martírio.
    emojis: ["👀", "🕯️", "🌿"], // 
    acceptedNames: [
      "luzia", "lutia", "luzha", "ludia", "lusia", "santa luzia", "protetora dos olhos"
    ],
  },
  {
    name: "são jorge",
    emojis: ["🐉", "🐎", "⚔️"], 
    acceptedNames: [
      "jorge", "são jorge guerreiro", "jorje", "gorge", "coirge", "saojorge", 
      "são jorge", "salve jorge", "sao jorge"
    ],
  },
  {
    name: "santo expedito",
    emojis: ["⚔️", "⏳", "🦅"], 
    acceptedNames: [
      "expedito", "etpedito", "espedito", "expeditu", "santo expedito", "santo das causas justas", "santo das causas urgentes" // 
    ],
  },
  {
    name: "são judas tadeu",
    emojis: ["🪓", "📜", "🪙"], 
    acceptedNames: [
      "judas tadeu", "são judas", "judat", "gudas", "judas tadeus", "judat tadeu", "sao judas tadeu"
    ],
  },
  {
    name: "nossa senhora de fátima",
    emojis: ["☀️", "🐑", "📿"], 
    acceptedNames: [
      "fátima", "nossa senhora da fátima", "virgem de fátima", "fatma", 
      "vatima", "fatima", "nossa senhora de fátima" // 
    ],
  },
  {
    name: "são joão batista",
    emojis: ["🐪", "🍯", "🌊"], 
    acceptedNames: [
      "joão batista", "são joão", "joao batista", "joao batihta", "joao batixta", "jao batista", "são joão batista" // 
    ],
  },
  {
    name: "são sebastião",
    emojis: ["🏹", "🌳", "🛡️"],
    acceptedNames: [
      "sebastião", "sebastiao", "tebactiao", "sebastao", "xebastiao", "tebastiao", "são sebastião", "sao sebastiao"
    ],
  },
  {
    name: "são bento",
    emojis: ["📜", "🍷", "🦅"], 
    acceptedNames: [
      "bento", "são bento de núrsia", "bento de nursia", "bentu", "pento", "saobento", "são bento", "medalha de são bento"
    ],
  },
  {
    name: "santa mônica",
    emojis: ["😭", "👩‍👦", "⛪"], 
    acceptedNames: [
      "mônica", "santa monica", "monika", "monia", "monica", "santa mônica"
    ],
  },
  {
    name: "santa faustina",
    emojis: ["📕", "💖", "✨"], // [cite: 18]
    acceptedNames: [
      "faustina", "santa maria faustina", "irmã faustina", "fautina", "pautina", "irma fautina", "santa faustina", "divina misericórdia"
    ],
  },
  {
    name: "são padre pio",
    emojis: ["🧤", "🩸", "⛪"], 
    acceptedNames: [
      "padre pio", "pio de pietrelcina", "são pio", "são padre pio", "padri pio", "pio", "sao padre pio"
    ],
  },
  {
    name: "santa dulce dos pobres",
    emojis: ["👵", "🏥", "🥖"], // [cite: 19]
    acceptedNames: [
      "irmã dulce", "dulce dos pobres", "santa dulce", "irma dulce", "dulte dos pobres", "duce", "anjo bom da bahia"
    ],
  },
  {
    name: "santa joana d'arc",
    emojis: ["🛡️", "⚜️", "🐎"], // [cite: 20]
    acceptedNames: [
      "joana d'arc", "joana darc", "toana darc", "zoana darc", "santa joana darc", "santa joana d'arc"
    ],
  },
  {
    name: "santa cecília",
    emojis: ["🎶", "🎹", "👑"], // [cite: 21]
    acceptedNames: [
      "cecília", "cecilia", "santa cecilia", "tetilia", "sesilia", "setilia", "santa cecília", "padroeira dos músicos"
    ],
  },
  {
    name: "são joão bosco",
    emojis: ["🎪", "🏫", "🐕"], 
    acceptedNames: [
      "dom bosco", "joão bosco", "sua santidade dom bosco", "joao bosco", "don bosco", "dom botco", "são joão bosco"
    ],
  },
  {
    name: "santa isabel de portugal",
    emojis: ["👑", "🌹", "🪙"], // [cite: 22]
    acceptedNames: [
      "isabel de portugal", "rainha santa isabel", "santa isabel", "itabel de portugal", "isabeu", "santa isabel de portugal"
    ],
  },
  {
    name: "são lourenço",
    emojis: ["🪙", "⛪", "📜"], // [cite: 23]
    acceptedNames: [
      "lourenço", "lourenco", "lourento", "laurenco", "lourensu", "são lourenço", "sao lourenco"
    ],
  },
  {
    name: "santa bernadete",
    emojis: ["💧", "🪵", "⛪"], // [cite: 24]
    acceptedNames: [
      "bernadete", "bernadette", "santa bernadette", "belnadete", "benadete", "santa bernadete"
    ],
  },
  {
    name: "são francisco xavier",
    emojis: ["⛵", "🔔", "✝️"], // [cite: 25]
    acceptedNames: [
      "francisco xavier", "são francisco xavier", "francisco chavier", "francitco tavier", "sao francisco xavier"
    ],
  },
  {
    name: "são lucas",
    emojis: ["🎨", "🐂", "🩺"], // [cite: 26]
    acceptedNames: [
      "lucas", "evangelista lucas", "luca", "lucat", "luta", "rucas", "são lucas", "sao lucas"
    ],
  },
  {
    name: "são domingos de gusmão",
    emojis: ["🐕", "📿", "🌟"], 
    acceptedNames: [
      "domingos", "domingos de gusmão", "domingu", "domitgos", "domingos de gutmao", "são domingos", "sao domingos" // [cite: 27]
    ],
  },
  {
    name: "são patrício",
    emojis: ["☘️", "⛪", "🌊"], // [cite: 28]
    acceptedNames: [
      "patrício", "patricio", "são patricio", "patritio", "patritsio", "batricio", "são patrício"
    ],
  },
  {
    name: "são rafael arcanjo",
    emojis: ["🪽", "🐟", "🩺"], // [cite: 29]
    acceptedNames: [
      "rafael arcanjo", "são rafael", "arcanjo rafael", "rafaeu", "lafael", "sao rafael arcanjo"
    ],
  },
  {
    name: "nossa senhora do carmo",
    emojis: ["📿", "⛰️", "👑"], // [cite: 30]
    acceptedNames: [
      "nossa senhora do carmo", "virgem do carmo", "carmo", "calmo", "nossa senhora do monte carmelo"
    ],
  },
  {
    name: "são cosme e damião",
    emojis: ["🍬", "🩺", "👦"], // [cite: 31]
    acceptedNames: [
      "cosme e damião", "são cosme e damiao", "cosme", "damião", "cotme e damiao", "são cosme e damião", "cosme damiao"
    ],
  },
  {
    name: "são tiago menor",
    emojis: ["📖", "✍️", "🏛️"], // [cite: 32]
    acceptedNames: [
      "tiago menor", "são tiago menor", "thiago menor", "tiago", "são tiago"
    ],
  },
  {
    name: "são frei galvão",
    emojis: ["💊", "📄", "✍️"], // [cite: 33]
    acceptedNames: [
      "frei galvão", "são frei galvao", "frei galvao", "flei galvao", "santo antonio de santana galvão"
    ],
  },
  {
    name: "santa catherine de sena",
    emojis: ["🕊️", "✍️", "👑"], // [cite: 34]
    acceptedNames: [
      "catarina de sena", "santa catarina de sena", "catarina", "catalina", "catherine de sena", "santa catarina"
    ],
  },
  {
    name: "carlo acutis",
    emojis: ["💻", "👟", "🍞"], // [cite: 35]
    acceptedNames: [
      "carlo acutis", "bem-aventurado carlo acutis", "carla acutis", "carlo acuti", "beato carlo acutis"
    ]
  },

  // --- NOVOS SANTOS ADICIONADOS PARA DEIXAR MAIS FÁCIL E COMPLETO ---
  {
    name: "são longuinho",
    emojis: ["🗡️", "🩸", "🔍"], // A lança, o sangue de Cristo que curou sua visão e a lupa (de procurar coisas perdidas).
    acceptedNames: [
      "são longuinho", "longuinho", "sao longuinho", "longuinho dos achados e perdidos", "longuim", "são longinho"
    ],
  },
  {
    name: "santa filomena",
    emojis: ["⚓", "🌸", "🗡️"], // A âncora do martírio, a flor da pureza e a espada.
    acceptedNames: [
      "santa filomena", "filomena", "filó", "santa filó", "filumena", "santa filumena"
    ],
  },
  {
    name: "madre teresa de calcutá",
    emojis: ["🇮🇳", "🤝", "🏥"], // A bandeira da Índia, mãos dadas ajudando os pobres e o hospital/cuidado.
    acceptedNames: [
      "madre teresa", "santa teresa de calcutá", "madre teresa de calcutá", "teresa de calcuta", "madre tereza"
    ],
  },
  {
    name: "santa helena",
    emojis: ["✝️", "👑", "⛏️"], // A cruz (encontrou a Vera Cruz), a coroa de imperatriz e a picareta da escavação.
    acceptedNames: [
      "santa helena", "helena", "elena", "santa elena", "rainha helena"
    ],
  },
  {
    name: "são brás",
    emojis: ["🗣️", "🕯️", "🧣"], // A garganta/voz, as velas cruzadas da bênção e o cachecol.
    acceptedNames: [
      "são brás", "sao bras", "brás", "bras", "protetor da garganta", "são braz"
    ],
  },
  {
    name: "nossa senhora de nazaré",
    emojis: ["🪢", "🚤", "👑"], // A corda do Círio, os barcos da procissão fluvial e a coroa.
    acceptedNames: [
      "nossa senhora de nazaré", "nazica", "nossa senhora de nazare", "virgem de nazaré", "nazaré", "círio de nazaré"
    ],
  },
  {
    name: "são lázaro",
    emojis: ["🤕", "🐕", "🩹"], // As feridas, os cachorros lambendo as feridas e os curativos.
    acceptedNames: [
      "são lázaro", "sao lazaro", "lázaro", "lazaro", "lasaro", "protetor dos cachorros"
    ],
  },
  {
    name: "santa inês",
    emojis: ["🐑", "👧", "🌿"], // O cordeiro da pureza, a juventude e a palma do martírio.
    acceptedNames: [
      "santa inês", "santa ines", "inês", "ines", "inez", "santa inez"
    ],
  },
  {
    name: "são cristóvão",
    emojis: ["🚗", "👦", "🌊"], // O carro/motoristas, o Menino Jesus e a travessia das águas.
    acceptedNames: [
      "são cristóvão", "sao cristovao", "cristóvão", "cristovao", "padroeiro dos motoristas", "são cristovão"
    ],
  },
  {
    name: "santo agostinho",
    emojis: ["📖", "❤️", "✝️"], // O livro das Confissões, o coração inquieto e a cruz.
    acceptedNames: [
      "santo agostinho", "agostinho de hipona", "agostinho", "acostinho", "agottinho", "doutor da graça"
    ],
  },
  {
    name: "são tomás de aquino",
    emojis: ["☀️", "📚", "✍️"], // O sol da inteligência, a Suma Teológica e a pena de escrever.
    acceptedNames: [
      "são tomás de aquino", "tomás de aquino", "tomas de aquino", "tomas de aquinu", "doutor angélico", "tomat de aquino"
    ],
  },
  {
    name: "nossa senhora da conceição",
    emojis: ["👑", "🌙", "🌟"], // A coroa de Rainha, a lua sob seus pés e as estrelas.
    acceptedNames: [
      "nossa senhora da conceição", "nossa senhora da conceicao", "conceição", "conceicao", "conteicao", "virgem da conceição",
      "notha senhora da conceição", "padroeira da diocese", "imaculada conceição"
    ],
  },
  {
    name: "santa teresa d'ávila",
    emojis: ["🏰", "✍️", "🕊️"], // O castelo interior, a pena de escrever e a pomba do Espírito Santo.
    acceptedNames: [
      "santa teresa d'ávila", "santa tereza d'ávila", "teresa de avila", "tereta davila", "doutora da igreja",
      "santa teresa de jesus", "tereza d'avila"
    ],
  },
  {
    name: "são jerônimo",
    emojis: ["📜", "🦁", "✝️"], // Os pergaminhos da Bíblia, o leão amigo e a cruz.
    acceptedNames: [
      "são jerônimo", "sao jeronimo", "jerônimo", "jeronimo", "jeronimu", "tradutor da bíblia", "geronimo"
    ],
  },
  {
    name: "são gabriel arcanjo",
    emojis: ["🪽", "🌺", "📯"], // As asas celestes, o lírio da anunciação e a trombeta.
    acceptedNames: [
      "são gabriel", "gabriel arcanjo", "arcanjo gabriel", "gabrieu", "gabliel", "sao gabriel arcanjo", "anjo da anunciação"
    ],
  }
];

export function getEmojiSaintsRound(count = EMOJI_GAME_ROUNDS) {
  return [...emojiSaints]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(count, emojiSaints.length));
}

export default emojiSaints;
