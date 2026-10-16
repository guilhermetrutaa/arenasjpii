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
    "saint": "Santo Inácio de Loyola",
    "forbidden": ["jesuítas", "exercícios", "militar", "companhia", "espiritual"],
    "category": "saint",
    "acceptedNames": ["Santo Inácio de Loyola", "Santo Inácio", "Inácio de Loyola", "Inacio"]
  },
  {
    "saint": "São Tomás de Aquino",
    "forbidden": ["teologia", "doutor", "boi", "suma", "filosofia"],
    "category": "saint",
    "acceptedNames": ["São Tomás de Aquino", "Tomás de Aquino", "São Tomás", "Tomas de Aquino"]
  },
  {
    "saint": "São Vicente de Paulo",
    "forbidden": ["caridade", "pobres", "vicentinos", "freiras", "asilo"],
    "category": "saint",
    "acceptedNames": ["São Vicente de Paulo", "São Vicente", "Vicente de Paulo", "Sao Vicente"]
  },
  {
    "saint": "Santa Catarina de Sena",
    "forbidden": ["itália", "doutora", "estigmas", "papa", "cartas"],
    "category": "saint",
    "acceptedNames": ["Santa Catarina de Sena", "Santa Catarina", "Catarina de Sena"]
  },
  {
    "saint": "Nossa Senhora de Guadalupe",
    "forbidden": ["méxico", "índio", "tilma", "rosas", "manto"],
    "category": "saint",
    "acceptedNames": ["Nossa Senhora de Guadalupe", "Guadalupe"]
  },
  {
    "saint": "Nossa Senhora do Perpétuo Socorro",
    "forbidden": ["ícone", "bizantino", "novena", "socorro", "mãe"],
    "category": "saint",
    "acceptedNames": ["Nossa Senhora do Perpétuo Socorro", "Perpétuo Socorro", "Perpetuo Socorro"]
  },
  {
    "saint": "Beato Carlo Acutis",
    "forbidden": ["jovem", "internet", "eucaristia", "computador", "leucemia"],
    "category": "saint",
    "acceptedNames": ["Beato Carlo Acutis", "Carlo Acutis", "Carlo", "Carlos Acutis"]
  },
  {
    "saint": "São João Evangelista",
    "forbidden": ["amado", "cruz", "apocalipse", "águia", "maria"],
    "category": "saint",
    "acceptedNames": ["São João Evangelista", "João Evangelista", "Apóstolo João"]
  },
  {
    "saint": "Santa Faustina",
    "forbidden": ["misericórdia", "diário", "raios", "polônia", "jesus"],
    "category": "saint",
    "acceptedNames": ["Santa Faustina", "Irmã Faustina", "Faustina"]
  },
  {
    "saint": "Santa Maria Madalena",
    "forbidden": ["pecadora", "perfume", "pés", "ressurreição", "túmulo"],
    "category": "saint",
    "acceptedNames": ["Santa Maria Madalena", "Maria Madalena", "Madalena"]
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
  {
    "saint": "Papa Francisco",
    "forbidden": ["jesuíta", "argentino", "vaticano", "roma", "pontífice"],
    "category": "priest",
    "acceptedNames": ["Papa Francisco", "Francisco", "Papa", "Jorge Bergoglio"]
  },
  {
    "saint": "Papa São João Paulo II",
    "forbidden": ["polônia", "jovens", "vaticano", "atentado", "pontífice"],
    "category": "priest",
    "acceptedNames": ["Papa João Paulo II", "João Paulo Segundo", "Karol Wojtyla"]
  },
  {
    "saint": "Papa Bento XVI",
    "forbidden": ["renúncia", "alemão", "ratzinger", "teólogo", "emérito"],
    "category": "priest",
    "acceptedNames": ["Papa Bento XVI", "Bento XVI", "Bento Dezesseis", "Joseph Ratzinger"]
  },
  {
    "saint": "Frei Gilson",
    "forbidden": ["carmelo", "música", "rosário", "madrugada", "pregação"],
    "category": "priest",
    "acceptedNames": ["Frei Gilson", "Gilson", "Frei Gilso"]
  },
  {
    "saint": "Padre Antônio Maria",
    "forbidden": ["cantor", "romaria", "terço", "música", "órfãos"],
    "category": "priest",
    "acceptedNames": ["Padre Antônio Maria", "Padre Antonio Maria", "Antonio Maria"]
  },
  {
    "saint": "Irmã Dulce (Santa Dulce dos Pobres)",
    "forbidden": ["bahia", "anjo", "hospital", "obras", "freira"],
    "category": "priest",
    "acceptedNames": ["Irmã Dulce", "Santa Dulce", "Dulce dos Pobres", "Irma Dulce"]
  },
  {
    "saint": "Padre Júlio Lancellotti",
    "forbidden": ["rua", "moradores", "marreta", "pedras", "pobres"],
    "category": "priest",
    "acceptedNames": ["Padre Júlio Lancellotti", "Padre Julio", "Padre Julio Lanceloti"]
  },
  {
    "saint": "Padre Paulo Ricardo",
    "forbidden": ["internet", "cuiabá", "conservador", "teologia", "aulas"],
    "category": "priest",
    "acceptedNames": ["Padre Paulo Ricardo", "Paulo Ricardo"]
  },
  {
    "saint": "Padre Vítor Coelho de Almeida",
    "forbidden": ["aparecida", "rádio", "redentorista", "apóstolo", "santo"],
    "category": "priest",
    "acceptedNames": ["Padre Vítor Coelho", "Padre Vitor", "Vítor Coelho"]
  },
  {
    "saint": "Dom Pedro Casaldáliga",
    "forbidden": ["araguaia", "bispo", "índios", "poesia", "pobres"],
    "category": "priest",
    "acceptedNames": ["Dom Pedro Casaldáliga", "Pedro Casaldáliga", "Dom Pedro"]
  },
  {
    "saint": "Padre Joãozinho",
    "forbidden": ["música", "dehoniano", "teólogo", "cantor", "scj"],
    "category": "priest",
    "acceptedNames": ["Padre Joãozinho", "Joãozinho"]
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
  {
    "saint": "Turíbulo",
    "forbidden": ["incenso", "fumaça", "balançar", "fogo", "missa"],
    "category": "object",
    "acceptedNames": ["Turíbulo", "Turibulo", "Toribulo"]
  },
  {
    "saint": "Naveta",
    "forbidden": ["barquinho", "incenso", "colher", "turíbulo", "grãos"],
    "category": "object",
    "acceptedNames": ["Naveta", "Navet", "Nave", "Vasinho de incenso"]
  },
  {
    "saint": "Ambão",
    "forbidden": ["leitura", "palavra", "púlpito", "lecionário", "estante"],
    "category": "object",
    "acceptedNames": ["Ambão", "Ambao", "Púlpito", "Pulpito"]
  },
  {
    "saint": "Galhetas",
    "forbidden": ["água", "vinho", "jarrinhas", "vidro", "sangue"],
    "category": "object",
    "acceptedNames": ["Galhetas", "Galheta", "Gaieta", "Jarrinhas", "Cruhetas"]
  },
  {
    "saint": "Âmbula (Píxide)",
    "forbidden": ["hóstias", "sacrário", "copo", "tampa", "comunhão"],
    "category": "object",
    "acceptedNames": ["Âmbula", "Ambula", "Píxide", "Pixide", "Cibório", "Ciborio"]
  },
  {
    "saint": "Sino",
    "forbidden": ["tocar", "barulho", "consagração", "torre", "corda"],
    "category": "object",
    "acceptedNames": ["Sino", "Sinos", "Campainha", "Carrilhão"]
  },
  {
    "saint": "Patena",
    "forbidden": ["prato", "hóstia", "dourada", "cálice", "maior"],
    "category": "object",
    "acceptedNames": ["Patena", "Pratinho", "Prato", "Pátena"]
  },
  {
    "saint": "Círio Pascal",
    "forbidden": ["vela", "grande", "páscoa", "fogo", "cruz"],
    "category": "object",
    "acceptedNames": ["Círio Pascal", "Cirio Pascal", "Cirio", "Círio", "Vela Pascal"]
  },
  {
    "saint": "Crucifixo",
    "forbidden": ["cruz", "jesus", "altar", "parede", "cristo"],
    "category": "object",
    "acceptedNames": ["Crucifixo", "Crussifixo", "Cruz", "Cruz com Jesus"]
  },
  {
    "saint": "Hissope (Aspergente)",
    "forbidden": ["água", "benta", "jogar", "molhar", "caldeirinha"],
    "category": "object",
    "acceptedNames": ["Hissope", "Aspergente", "Aspersório", "Aspersorio"]
  },
  {
    "saint": "Casula",
    "forbidden": ["veste", "padre", "cor", "missa", "litúrgica"],
    "category": "object",
    "acceptedNames": ["Casula", "Cazula", "Roupa do Padre"]
  },
  {
    "saint": "Estola",
    "forbidden": ["faixa", "pescoço", "padre", "confissão", "sacramento"],
    "category": "object",
    "acceptedNames": ["Estola", "Extola"]
  },
  {
    "saint": "Missal",
    "forbidden": ["livro", "vermelho", "altar", "orações", "padre"],
    "category": "object",
    "acceptedNames": ["Missal", "Misal"]
  },
  {
    "saint": "Lecionário",
    "forbidden": ["livro", "leituras", "ambão", "evangelho", "epístola"],
    "category": "object",
    "acceptedNames": ["Lecionário", "Lecionario"]
  },
  {
    "saint": "Mitra",
    "forbidden": ["bispo", "cabeça", "chapéu", "pontuda", "dom"],
    "category": "object",
    "acceptedNames": ["Mitra"]
  },
  {
    "saint": "Báculo",
    "forbidden": ["cajado", "bispo", "pastor", "dom", "ovelhas"],
    "category": "object",
    "acceptedNames": ["Báculo", "Baculo"]
  },
  {
    "saint": "Corporal",
    "forbidden": ["pano", "quadrado", "hóstia", "cálice", "altar"],
    "category": "object",
    "acceptedNames": ["Corporal", "Pano do altar"]
  },
  {
    "saint": "Sanguíneo",
    "forbidden": ["pano", "limpar", "cálice", "boca", "purificar"],
    "category": "object",
    "acceptedNames": ["Sanguíneo", "Sanguineo", "Sanguinho"]
  },
  {
    "saint": "Manustérgio",
    "forbidden": ["toalha", "mãos", "lavar", "padre", "purificação"],
    "category": "object",
    "acceptedNames": ["Manustérgio", "Manustergio", "Toalhinha"]
  },

  // ==========================================
  // CATEGORIA: IGREJAS / LOCAIS
  // ==========================================
  {
    "saint": "Catedral de Nossa Senhora da Conceição",
    "forbidden": ["centro", "sede", "praça", "diocese", "bispo"],
    "category": "church",
    "acceptedNames": ["Catedral de Nossa Senhora da Conceição", "Catedral da Conceicao", "Catredal", "Tatedral", "Catedral"]
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
  },
  {
    "saint": "Igreja de São Francisco",
    "forbidden": ["convento", "frades", "praça", "centro", "porciúncula"],
    "category": "church",
    "acceptedNames": ["Igreja de São Francisco", "Igreja Sao Francisco", "Paróquia São Francisco", "Convento"]
  },
  {
    "saint": "Santuário do Sagrado Coração de Jesus",
    "forbidden": ["catolé", "paróquia", "coração", "santuário", "redentorista"],
    "category": "church",
    "acceptedNames": ["Santuário do Sagrado Coração de Jesus", "Santuario do Sagrado Coracao", "Igreja do Catolé", "Coração de Jesus"]
  },
  {
    "saint": "Paróquia de Santo Antônio",
    "forbidden": ["treze", "bairro", "casamento", "franciscano", "festa"],
    "category": "church",
    "acceptedNames": ["Paróquia de Santo Antônio", "Igreja de Santo Antonio", "Santo Antônio"]
  },
  {
    "saint": "Paróquia Nossa Senhora do Carmo",
    "forbidden": ["puxinanã", "bairro", "escapulário", "novena", "carmelitas"],
    "category": "church",
    "acceptedNames": ["Paróquia Nossa Senhora do Carmo", "Igreja do Carmo", "Nossa Senhora do Carmo"]
  },
  {
    "saint": "Paróquia da Sagrada Família",
    "forbidden": ["rocha", "cavalcante", "jesus", "maria", "josé"],
    "category": "church",
    "acceptedNames": ["Paróquia da Sagrada Família", "Igreja Sagrada Familia", "Sagrada Família"]
  },
  {
    "saint": "Igreja de São Vicente de Paulo",
    "forbidden": ["bodocongó", "vicentinos", "caridade", "pobres", "praça"],
    "category": "church",
    "acceptedNames": ["Igreja de São Vicente de Paulo", "Paróquia São Vicente", "Igreja de São Vicente"]
  },
  {
    "saint": "Paróquia de São Cristóvão",
    "forbidden": ["centenário", "motoristas", "procissão", "bairro", "bênção"],
    "category": "church",
    "acceptedNames": ["Paróquia de São Cristóvão", "Igreja de São Cristóvão", "São Cristóvão", "Sao Cristovao"]
  },
  {
    "saint": "Paróquia Nossa Senhora das Graças",
    "forbidden": ["cruzeiro", "medalha", "bairro", "ladeira", "paróquia"],
    "category": "church",
    "acceptedNames": ["Paróquia Nossa Senhora das Graças", "Igreja das Graças", "Nossa Senhora das Graças"]
  },
  {
    "saint": "Paróquia Santa Rosa de Lima",
    "forbidden": ["santa", "bairro", "matriz", "paróquia", "festa"],
    "category": "church",
    "acceptedNames": ["Paróquia Santa Rosa de Lima", "Igreja de Santa Rosa", "Santa Rosa"]
  },
  {
    "saint": "Paróquia São João Bosco",
    "forbidden": ["liberdade", "bairro", "juventude", "oratório", "salesiano"],
    "category": "church",
    "acceptedNames": ["Paróquia São João Bosco", "Igreja São João Bosco", "São João Bosco", "Dom Bosco"]
  },
  {
    "saint": "Santuário de Nossa Senhora da Guia",
    "forbidden": ["galante", "distrito", "forró", "padroeira", "matriz"],
    "category": "church",
    "acceptedNames": ["Santuário de Nossa Senhora da Guia", "Igreja de Galante", "Nossa Senhora da Guia"]
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

// Two categories are level when their draw progress matches to within this,
// which lets a genuine tie break at random instead of favouring a fixed order.
const RATIO_TIE = 1e-9;

// Takes any subset of the deck so the round builder can shuffle only the cards
// a player has not seen yet.
export function shuffleInterleaved(cards: ForbiddenCard[] = DATA): ForbiddenCard[] {
  const buckets: ForbiddenCard[][] = [];
  const bucketOf: Record<string, number> = {};
  for (const card of cards) {
    if (bucketOf[card.category] === undefined) {
      bucketOf[card.category] = buckets.length;
      buckets.push([]);
    }
    buckets[bucketOf[card.category]].push(card);
  }

  for (const bucket of buckets) {
    const shuffled = shuffle(bucket);
    bucket.length = 0;
    bucket.push(...shuffled);
  }

  const pointers = new Array<number>(buckets.length).fill(0);
  const result: ForbiddenCard[] = [];
  // Always draws from the category that is furthest behind its own share of the
  // deck, so the categories stay mixed for the whole round. Taking one card per
  // category per pass instead drained the small ones first: with 57 saints
  // against 16 churches it ended the deck on 30 consecutive saints.
  while (result.length < cards.length) {
    let best = -1;
    let bestRatio = Number.POSITIVE_INFINITY;
    for (let index = 0; index < buckets.length; index += 1) {
      if (pointers[index] >= buckets[index].length) continue;
      const ratio = pointers[index] / buckets[index].length;
      // Ties break at random so a round does not always open on the same
      // category.
      if (ratio < bestRatio - RATIO_TIE || (Math.abs(ratio - bestRatio) <= RATIO_TIE && Math.random() < 0.5)) {
        best = index;
        bestRatio = ratio;
      }
    }
    if (best === -1) break;
    result.push(buckets[best][pointers[best]]);
    pointers[best] += 1;
  }

  return result;
}

// The round builder in `src/lib/forbidden-deck.ts` owns the draw order and the
// "already seen" memory. A pointer over a single memoized shuffle used to live
// here, but it re-delivered the same cards right after a full cycle and kept
// no memory across reloads, which is exactly what the no-repeat rule forbids.
export default DATA;