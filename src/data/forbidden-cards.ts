export type ForbiddenCard = {
  saint: string;
  forbidden: string[];
  category: "saint" | "object" | "priest" | "church";
  acceptedNames?: string[];
};

export const CATEGORY_LABELS: Record<ForbiddenCard["category"], string> = {
  saint: "Santos",
  priest: "Padres e Religiosos",
  object: "Objetos Litúrgicos",
  church: "Igrejas de Campina Grande",
};

export const DATA: ForbiddenCard[] = [
  // ==========================================
  // CATEGORIA: SANTOS
  // ==========================================
  {
    "saint": "São Francisco de Assis",
    "forbidden": ["pobreza", "animais", "itália", "harmonia", "natureza"],
    "category": "saint",
    "acceptedNames": ["São Francisco de Assis", "São Francisco", "Sao Francisco", "Francitco", "Frantisco", "Prancisco", "Frantitco", "Chico"]
  },
  {
    "saint": "Santa Teresinha",
    "forbidden": ["rosas", "pequena", "carmelo", "padroeira", "franca"],
    "category": "saint",
    "acceptedNames": ["Santa Teresinha", "Terezinha", "Teretinha", "Teresina", "Telisinha", "Teresa", "Santa Teretinha"]
  },
  {
    "saint": "São João Paulo II",
    "forbidden": ["papa", "polônia", "jovens", "vaticano", "atentado"],
    "category": "saint",
    "acceptedNames": ["São João Paulo Segundo", "João Paulo Segundo", "Joao Paulo", "Joan Paulo", "Jao Paulo", "Papa Jao Paulo"]
  },
  {
    "saint": "Santa Clara",
    "forbidden": ["ostensório", "clarissas", "claridade", "pobreza", "convento"],
    "category": "saint",
    "acceptedNames": ["Santa Clara", "Clara", "Calara", "Talara", "Clahra", "Santa Calara"]
  },
  {
    "saint": "Santo Antônio",
    "forbidden": ["comida", "casamento", "lisboa", "menino", "festas"],
    "category": "saint",
    "acceptedNames": ["Santo Antônio", "Santo Antonio", "Antônio", "Antonio", "Antogno", "Atonio", "Antoni"]
  },
  {
    "saint": "São José",
    "forbidden": ["carpinteiro", "jesus", "silêncio", "família", "esposo"],
    "category": "saint",
    "acceptedNames": ["São José", "Sao Jose", "José", "Jose", "Jote", "Zote", "Zezé"]
  },
  {
    "saint": "Nossa Senhora Aparecida",
    "forbidden": ["patria", "aguas", "manto", "preta", "pescadores"],
    "category": "saint",
    "acceptedNames": ["Nossa Senhora Aparecida", "Nossa Senhora da Aparecida", "Aparecida", "Aparetida", "Abarecida", "Notha Senhora", "Nosa Senhora"]
  },
  {
    "saint": "Nossa Senhora de Fátima",
    "forbidden": ["europa", "videntes", "rosário", "astro", "lúcia"],
    "category": "saint",
    "acceptedNames": ["Nossa Senhora de Fátima", "Nossa Senhora da Fatima", "Fátima", "Fatima", "Fatma", "Vatima"]
  },
  {
    "saint": "Nossa Senhora de Lourdes",
    "forbidden": ["frança", "gruta", "bernadete", "milagres", "água"],
    "category": "saint",
    "acceptedNames": ["Nossa Senhora de Lourdes", "Nossa Senhora da Lurdes", "Lourdes", "Lurdes", "Luldes"]
  },
  {
    "saint": "Nossa Senhora do Carmo",
    "forbidden": ["escapulário", "monte", "carmelitas", "amparo", "hábito"],
    "category": "saint",
    "acceptedNames": ["Nossa Senhora do Carmo", "Nossa Senhora da Carmo", "Carmo", "Calmo", "Talmo"]
  },
  {
    "saint": "Nossa Senhora da Conceição",
    "forbidden": ["imaculada", "graça", "dogma", "virgem", "pecado"],
    "category": "saint",
    "acceptedNames": ["Nossa Senhora da Conceição", "Nossa Senhora da Conteicao", "Conceição", "Conceicao", "Conteicao", "Conseisao"]
  },
  {
    "saint": "Nossa Senhora das Graças",
    "forbidden": ["pingente", "milagrosa", "catarina", "claridade", "raios"],
    "category": "saint",
    "acceptedNames": ["Nossa Senhora das Graças", "Nossa Senhora das Gracas", "Graças", "Gracas", "Glatas", "Gratas"]
  },
  {
    "saint": "São Pedro",
    "forbidden": ["portas", "primeiro", "papa", "igreja", "pescador"],
    "category": "saint",
    "acceptedNames": ["São Pedro", "Sao Pedro", "Pedro", "Pedu", "Petro", "Pedru", "Pegro"]
  },
  {
    "saint": "São Paulo",
    "forbidden": ["perseguidor", "estrada", "damasco", "mudanca", "apóstolo"],
    "category": "saint",
    "acceptedNames": ["São Paulo", "Sao Paulo", "Paulo", "Paulu", "Baulo"]
  },
  {
    "saint": "São João Batista",
    "forbidden": ["batismo", "deserto", "inseto", "aguas", "precursor"],
    "category": "saint",
    "acceptedNames": ["São João Batista", "João Batista", "Joao Batista", "Joao Batihta", "Joao Batixta", "Jao Batista"]
  },
  {
    "saint": "Santo Agostinho",
    "forbidden": ["confissões", "hipona", "graça", "mudanca", "doutor"],
    "category": "saint",
    "acceptedNames": ["Santo Agostinho", "Agostinho", "Agottinho", "Acostinho", "Agostinu"]
  },
  {
    "saint": "Santa Rita de Cássia",
    "forbidden": ["esposa", "processo", "causas", "impossíveis", "espinho"],
    "category": "saint",
    "acceptedNames": ["Santa Rita de Cássia", "Rita de Cássia", "Rita de Catia", "Santa Rita", "Lita"]
  },
  {
    "saint": "Santo Expedito",
    "forbidden": ["urgente", "causas", "justiça", "soldado", "mártir"],
    "category": "saint",
    "acceptedNames": ["Santo Expedito", "Expedito", "Etpedito", "Espedito", "Expeditu"]
  },
  {
    "saint": "São Judas Tadeu",
    "forbidden": ["causas", "desesperadas", "apóstolo", "primo", "ferramenta"],
    "category": "saint",
    "acceptedNames": ["São Judas Tadeu", "Judas Tadeu", "São Judas", "Judat", "Gudas", "Judas Tadeus"]
  },
  {
    "saint": "São Sebastião",
    "forbidden": ["setas", "soldado", "mártir", "praga", "amparo"],
    "category": "saint",
    "acceptedNames": ["São Sebastião", "Sebastião", "Sebastiao", "Tebactiao", "Sebastao", "Xebastiao"]
  },
  {
    "saint": "São Jorge",
    "forbidden": ["monstro", "soldado", "capa", "cavaleiro", "mártir"],
    "category": "saint",
    "acceptedNames": ["São Jorge", "Sao Jorge", "Jorge", "Jorje", "Gorge", "Coirge", "Saojorge"]
  },
  {
    "saint": "Santa Luzia",
    "forbidden": ["vista", "focar", "claridade", "cegueira", "mártir"],
    "category": "saint",
    "acceptedNames": ["Santa Luzia", "Luzia", "Lutia", "Luzha", "Ludia", "Lusia"]
  },
  {
    "saint": "Santa Cecília",
    "forbidden": ["música", "canto", "piano", "padroeira", "mártir"],
    "category": "saint",
    "acceptedNames": ["Santa Cecília", "Cecília", "Cecilia", "Tetilia", "Sesilia", "Setilia"]
  },
  {
    "saint": "São Bento",
    "forbidden": ["objeto", "regra", "mosteiro", "prece", "abade"],
    "category": "saint",
    "acceptedNames": ["São Bento", "Sao Bento", "Bento", "Bentu", "Pento", "Saobento"]
  },
  {
    "saint": "Santa Mônica",
    "forbidden": ["matriarca", "lágrimas", "mudanca", "paciência", "esposa"],
    "category": "saint",
    "acceptedNames": ["Santa Mônica", "Santa Monica", "Mônica", "Monica", "Monika", "Monia"]
  },
  {
    "saint": "São Miguel Arcanjo",
    "forbidden": ["guerreiro", "demônio", "lutar", "paraiso", "espada"],
    "category": "saint",
    "acceptedNames": ["São Miguel Arcanjo", "Miguel Arcanjo", "São Miguel", "Miguor", "Miquel", "Migueu"]
  },
  {
    "saint": "São Gabriel Arcanjo",
    "forbidden": ["aviso", "maria", "mensagem", "nascer", "lírio"],
    "category": "saint",
    "acceptedNames": ["São Gabriel Arcanjo", "Gabriel Arcanjo", "São Gabriel", "Gabrieu", "Gabliel"]
  },
  {
    "saint": "São Rafael Arcanjo",
    "forbidden": ["viagem", "cura", "tobias", "companheiro", "pescado"],
    "category": "saint",
    "acceptedNames": ["São Rafael Arcanjo", "Rafael Arcanjo", "São Rafael", "Rafaeu", "Lafael"]
  },
  {
    "saint": "São José de Anchieta",
    "forbidden": ["índios", "apóstolo", "patria", "catequese", "poema"],
    "category": "saint",
    "acceptedNames": ["São José de Anchieta", "José de Anchieta", "Jose de Anchieta", "Jote de Anchieta"]
  },
  {
    "saint": "São João Bosco",
    "forbidden": ["jovens", "dormir", "salesiano", "turim", "ensino"],
    "category": "saint",
    "acceptedNames": ["São João Bosco", "João Bosco", "Dom Bosco", "Joao Botco", "Don Bosco"]
  },
  {
    "saint": "São Mateus",
    "forbidden": ["publicano", "impostos", "apóstolo", "escritos", "coletor"],
    "category": "saint",
    "acceptedNames": ["São Mateus", "Mateus", "Mateu", "Mateur", "Mates"]
  },
  {
    "saint": "São Lucas",
    "forbidden": ["médico", "escritos", "touro", "atos", "grego"],
    "category": "saint",
    "acceptedNames": ["São Lucas", "Lucas", "Luca", "Lucat", "Luta", "Rucas"]
  },
  {
    "saint": "São Marcos",
    "forbidden": ["felino", "escritos", "veneza", "basílica", "símbolo"],
    "category": "saint",
    "acceptedNames": ["São Marcos", "Marcos", "Marco", "Marcot", "Malcos"]
  },
  {
    "saint": "São Lázaro",
    "forbidden": ["ressuscitou", "morto", "betânia", "sepulcro", "milagre"],
    "category": "saint",
    "acceptedNames": ["São Lázaro", "Lázaro", "Lazaro", "Lajaro", "Ladaro"]
  },
  {
    "saint": "São Longuinho",
    "forbidden": ["lança", "madeiro", "soldado", "sangue", "cego"],
    "category": "saint",
    "acceptedNames": ["São Longuinho", "Longuinho", "Lõguinho", "Longuinhu", "Loguinho"]
  },
  {
    "saint": "Santo André",
    "forbidden": ["pescador", "apóstolo", "crucificado", "formato", "parente"],
    "category": "saint",
    "acceptedNames": ["Santo André", "André", "Andre", "Andle"]
  },
  {
    "saint": "São Tomé",
    "forbidden": ["duvidar", "apóstolo", "índia", "feridas", "incredulidade"],
    "category": "saint",
    "acceptedNames": ["São Tomé", "Tomé", "Tome", "Tumé"]
  },
  {
    "saint": "São Cristóvão",
    "forbidden": ["viajantes", "menino", "aguas", "gigante", "protetor"],
    "category": "saint",
    "acceptedNames": ["São Cristóvão", "Cristóvão", "Cristovao", "Critovao", "Tritovao"]
  },
  {
    "saint": "São Valentim",
    "forbidden": ["namorados", "amor", "casais", "fevereiro", "padroeiro"],
    "category": "saint",
    "acceptedNames": ["São Valentim", "Valentim", "Valentin", "Varentim"]
  },
  {
    "saint": "Santa Edwiges",
    "forbidden": ["viúva", "pobres", "dívidas", "polônia", "duquesa"],
    "category": "saint",
    "acceptedNames": ["Santa Edwiges", "Edwiges", "Edviges", "Ediviges"]
  },
  {
    "saint": "Santa Bárbara",
    "forbidden": ["raio", "torre", "tempestade", "protetora", "mártir"],
    "category": "saint",
    "acceptedNames": ["Santa Bárbara", "Bárbara", "Barbara", "Babara", "Balbala", "Vavara"]
  },
  {
    "saint": "São Cosme e Damião",
    "forbidden": ["gêmeos", "médicos", "doentes", "farmacêuticos", "fraternidade"],
    "category": "saint",
    "acceptedNames": ["São Cosme e Damião", "Cosme e Damião", "Cosme e Damiao", "Cozme"]
  },
  {
    "saint": "São Nicolau de Mira",
    "forbidden": ["festa", "presentes", "crianças", "papai", "festivo"],
    "category": "saint",
    "acceptedNames": ["São Nicolau de Mira", "Nicolau", "Micolau", "Licolau"]
  },
  {
    "saint": "Santa Joana D'Arc",
    "forbidden": ["frança", "guerra", "fogueira", "donzela", "orleans"],
    "category": "saint",
    "acceptedNames": ["Santa Joana D'Arc", "Joana D'Arc", "Joana Darc", "Toana Darc", "Zoana Darc"]
  },
  {
    "saint": "São Padre Pio",
    "forbidden": ["feridas", "estigmas", "penitencia", "frade", "itália"],
    "category": "saint",
    "acceptedNames": ["São Padre Pio", "Padre Pio", "Pio", "Padri Pio"]
  },
  {
    "saint": "Santa Madre Teresa de Calcutá",
    "forbidden": ["pobres", "índia", "missionária", "caridade", "doentes"],
    "category": "saint",
    "acceptedNames": ["Santa Madre Teresa", "Madre Teresa", "Madri Teresa", "Madre Tereta"]
  },
  {
    "saint": "Anjo da Guarda",
    "forbidden": ["espírito", "celeste", "protetor", "paraiso", "crianças"],
    "category": "saint",
    "acceptedNames": ["Anjo da Guarda", "Anju da Gualda"]
  },

  // ==========================================
  // CATEGORIA: PADRES / RELIGIOSOS
  // ==========================================
  {
    "saint": "Padre Cícero",
    "forbidden": ["juazeiro", "nordeste", "romeiro", "milagres", "ceará"],
    "category": "priest",
    "acceptedNames": ["Padre Cícero", "Padre Cicero", "Padin Ciço", "Padre Titero"]
  },
  {
    "saint": "Padre Marcelo Rossi",
    "forbidden": ["cantor", "música", "queda", "missa", "programa"],
    "category": "priest",
    "acceptedNames": ["Padre Marcelo Rossi", "Padre Marcelo Roti", "Marcelo Roci"]
  },
  {
    "saint": "Padre Fábio de Melo",
    "forbidden": ["cantor", "música", "compositor", "programa", "poeta"],
    "category": "priest",
    "acceptedNames": ["Padre Fábio de Melo", "Padre Fabio de Melo", "Padre Fabio"]
  },
  {
    "saint": "São Frei Galvão",
    "forbidden": ["pílulas", "guaratinguetá", "recado", "milagre", "franciscano"],
    "category": "priest",
    "acceptedNames": ["São Frei Galvão", "Frei Galvão", "Frei Galvao", "Flei Galvao"]
  },
  {
    "saint": "Monsenhor Jonas Abib",
    "forbidden": ["musica", "nova", "paulista", "fundador", "carisma"],
    "category": "priest",
    "acceptedNames": ["Monsenhor Jonas Abib", "Jonas Abib", "Moncenhor Jonat", "Jonat Abib"]
  },
  {
    "saint": "Padre Léo",
    "forbidden": ["bethânia", "pregador", "programa", "humor", "palestras"],
    "category": "priest",
    "acceptedNames": ["Padre Léo", "Padre Leo", "Padri Leo"]
  },
  {
    "saint": "Padre Zezinho",
    "forbidden": ["música", "cantor", "compositor", "missionário", "instrumento"],
    "category": "priest",
    "acceptedNames": ["Padre Zezinho", "Padri Zezinho", "Zezinhu"]
  },
  {
    "saint": "Padre Reginaldo Manzotti",
    "forbidden": ["evangelizar", "cantor", "multidões", "rádio", "fortaleza"],
    "category": "priest",
    "acceptedNames": ["Padre Reginaldo Manzotti", "Padre Reginaldo", "Padre Reginaldo Manzoti"]
  },
  {
    "saint": "Frei Damião",
    "forbidden": ["frade", "nordeste", "missões", "romaria", "pernambuco"],
    "category": "priest",
    "acceptedNames": ["Frei Damião", "Frei Damiao", "Flei Damiao"]
  },
  {
    "saint": "Dom Helder Câmara",
    "forbidden": ["bispo", "pobres", "ditadura", "justica", "recife"],
    "category": "priest",
    "acceptedNames": ["Dom Helder Câmara", "Dom Elder", "Dom Helder"]
  },
  {
    "saint": "Padre Alessandro Campos",
    "forbidden": ["sertanejo", "acessorio", "cantor", "programa", "música"],
    "category": "priest",
    "acceptedNames": ["Padre Alessandro Campos", "Padre Alessandro", "Aletandro"]
  },
  {
    "saint": "Padre Chrystian Shankar",
    "forbidden": ["família", "casamento", "palestra", "claridade", "minas"],
    "category": "priest",
    "acceptedNames": ["Padre Chrystian Shankar", "Padre Christian", "Padre Cristian Chancar", "Cristian"]
  },
  {
    "saint": "Padre Patrick Fernandes",
    "forbidden": ["humor", "redes", "quadro", "pará", "perguntas"],
    "category": "priest",
    "acceptedNames": ["Padre Patrick Fernandes", "Padre Patrick", "Padre Patrique"]
  },
  {
    "saint": "Irmã Kelly Patrícia",
    "forbidden": ["cantora", "freira", "hesed", "castelo", "música"],
    "category": "priest",
    "acceptedNames": ["Irmã Kelly Patrícia", "Irma Kelly Patricia", "Irma Keli", "Keli Patricia"]
  },
  {
    "saint": "Padre Nilson Nunes",
    "forbidden": ["missa", "claridade", "cantor", "emissora", "programa"],
    "category": "priest",
    "acceptedNames": ["Padre Nilson Nunes", "Padre Nilson", "Padre Niuton"]
  },
  {
    "saint": "Padre Rodolfo Lucena",
    "forbidden": ["santo", "antônio", "juventude", "crescer", "cargo"],
    "category": "priest",
    "acceptedNames": ["Padre Rodolfo Lucena", "Padre Hodolfo Lucena", "Padre Rodolfo"]
  },
  {
    "saint": "Dom Dulcênio Fontes de Matos",
    "forbidden": ["bispo", "diocese", "pastoral", "catedral", "conselho"],
    "category": "priest",
    "acceptedNames": ["Dom Dulcênio", "Dom Dulcenio", "Dom Dulcinio", "Dom Dulcênio Fontes", "Bispo Dulcênio"]
  },

  // ==========================================
  // CATEGORIA: OBJETOS LITÚRGICOS
  // ==========================================
  {
    "saint": "Ostensório",
    "forbidden": ["hóstia", "venerar", "mostra", "astro", "altar"],
    "category": "object",
    "acceptedNames": ["Ostensório", "Ostensorio", "Otentorio", "Ostensoio", "Otrentorio"]
  },
  {
    "saint": "Cálice",
    "forbidden": ["sangue", "vinho", "eucaristia", "sagrado", "missa"],
    "category": "object",
    "acceptedNames": ["Cálice", "Calice", "Catite", "Cálise"]
  },
  {
    "saint": "Sacrário",
    "forbidden": ["igreja", "hóstia", "jesus", "capela", "reserva"],
    "category": "object",
    "acceptedNames": ["Sacrário", "Sacrario", "Tacrario", "Satrario"]
  },
  {
    "saint": "Altar",
    "forbidden": ["missa", "sacrifício", "eucaristia", "pedra", "mesa"],
    "category": "object",
    "acceptedNames": ["Altar", "O Altar", "Autal", "Autar"]
  },
  {
    "saint": "Hóstia",
    "forbidden": ["alimento", "sagrado", "eucaristia", "corpo", "consagrar"],
    "category": "object",
    "acceptedNames": ["Hóstia", "Hostia", "Otia"]
  },
  {
    "saint": "Bíblia",
    "forbidden": ["palavra", "sagrada", "escrituras", "livro", "deus"],
    "category": "object",
    "acceptedNames": ["Bíblia", "Biblia", "Briblia", "A Biblia"]
  },
  {
    "saint": "Pia Batismal",
    "forbidden": ["batismo", "água", "nascer", "criança", "pascoa"],
    "category": "object",
    "acceptedNames": ["Pia Batismal", "Pia Batismao"]
  },
  {
    "saint": "Rosário",
    "forbidden": ["contas", "prece", "maria", "mistérios", "rezar"],
    "category": "object",
    "acceptedNames": ["Rosário", "Rosario", "Hozario", "Rojario"]
  },

  // ==========================================
  // CATEGORIA: IGREJAS / LOCAIS
  // ==========================================
  {
    "saint": "Catedral de Nossa Senhora da Conceição",
    "forbidden": ["centro", "sede", "praça", "diocese", "bispo"],
    "category": "church",
    "acceptedNames": ["Catedral de Nossa Senhora da Conceição", "Catedral da Conceicao", "Catredal", "Tatedral"]
  },
  {
    "saint": "Igreja de São José",
    "forbidden": ["morro", "grande", "ponto", "turistico", "escadaria"],
    "category": "church",
    "acceptedNames": ["Igreja de São José", "Igreja de Sao Jose", "Sao Jose", "Igleja"]
  },
  {
    "saint": "Igreja de Nossa Senhora do Rosário",
    "forbidden": ["histórica", "pretos", "1781", "antiga", "escravos"],
    "category": "church",
    "acceptedNames": ["Igreja de Nossa Senhora do Rosário", "Igreja do Rosario", "Rosario"]
  },
  {
    "saint": "Paróquia Nossa Senhora de Fátima",
    "forbidden": ["palmeira", "videntes", "oracao", "pastorinhos", "lúcia"],
    "category": "church",
    "acceptedNames": ["Paróquia Nossa Senhora de Fátima", "Paroquia Nossa Senhora de Fatima", "Nossa Senhora de Fatima", "Fatima", "Fatma"]
  },
  {
    "saint": "Paróquia São João Paulo II",
    "forbidden": ["campos", "jovens", "virtudes", "pastoral", "bairro"],
    "category": "church",
    "acceptedNames": ["Paróquia São João Paulo II", "Paroquia Joao Paulo II", "Joao Paulo Segundo", "Joao Paulo"]
  }
];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy;
}

function shuffleInterleaved(): ForbiddenCard[] {
  const groups: Record<string, ForbiddenCard[]> = {};
  for (const card of DATA) {
    if (!groups[card.category]) groups[card.category] = [];
    groups[card.category].push(card);
  }

  for (const key of Object.keys(groups)) {
    groups[key] = shuffle(groups[key]);
  }

  const pointers: Record<string, number> = {};
  for (const key of Object.keys(groups)) {
    pointers[key] = 0;
  }

  const result: ForbiddenCard[] = [];
  const catList = shuffle(Object.keys(groups));
  let remaining = DATA.length;

  while (remaining > 0) {
    const shuffledCats = shuffle(catList.filter((c) => pointers[c] < groups[c].length));
    for (const cat of shuffledCats) {
      if (pointers[cat] < groups[cat].length) {
        result.push(groups[cat][pointers[cat]]);
        pointers[cat]++;
        remaining--;
      }
    }
  }

  return result;
}

let shuffled: ForbiddenCard[] | null = null;
let pointer = 0;

export function getShuffledCards(): ForbiddenCard[] {
  if (!shuffled) {
    shuffled = shuffleInterleaved();
    pointer = 0;
  }
  return shuffled;
}

export function getNextCard(): ForbiddenCard {
  const cards = getShuffledCards();
  const card = cards[pointer % cards.length];
  pointer++;
  if (pointer % cards.length === 0) {
    shuffled = shuffleInterleaved();
    pointer = 0;
  }
  return card;
}

export default DATA;
