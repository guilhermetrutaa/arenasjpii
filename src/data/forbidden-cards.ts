export type ForbiddenCard = {
  saint: string;
  forbidden: string[];
  category: "saint" | "object" | "priest" | "church";
  acceptedNames?: string[];
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
    "saint": "São João Evangelista",
    "forbidden": ["apocalipse", "escritos", "patmos", "discípulo", "águia"],
    "category": "saint",
    "acceptedNames": ["São João Evangelista", "João Evangelista", "Joao Evangelista", "Joao Evangelihta"]
  },
  {
    "saint": "Santo Agostinho",
    "forbidden": ["confissões", "hipona", "graça", "mudanca", "doutor"],
    "category": "saint",
    "acceptedNames": ["Santo Agostinho", "Agostinho", "Agottinho", "Acostinho", "Agostinu"]
  },
  {
    "saint": "São Tomás de Aquino",
    "forbidden": ["angélico", "doutor", "suma", "teologia", "filosofia"],
    "category": "saint",
    "acceptedNames": ["São Tomás de Aquino", "Tomás de Aquino", "Tomas de Aquino", "Tomas de Aquinu", "Tomat de Aquino"]
  },
  {
    "saint": "Santa Catarina de Sena",
    "forbidden": ["dominicana", "diálogo", "papas", "doutora", "itália"],
    "category": "saint",
    "acceptedNames": ["Santa Catarina de Sena", "Catarina de Sena", "Catarina de Tena", "Catarina", "Catalina"]
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
    "saint": "São Lourenço",
    "forbidden": ["fogo", "diácono", "pobres", "tesouro", "mártir"],
    "category": "saint",
    "acceptedNames": ["São Lourenço", "Lourenço", "Lourenco", "Lourento", "Laurenco", "Lourensu"]
  },
  {
    "saint": "Santo Inácio de Loyola",
    "forbidden": ["jesuíta", "ordem", "exercícios", "espirituais", "militares"],
    "category": "saint",
    "acceptedNames": ["Santo Inácio de Loyola", "Inácio de Loyola", "Inacio", "Inatio", "Inasio"]
  },
  {
    "saint": "São Bento",
    "forbidden": ["objeto", "regra", "mosteiro", "prece", "abade"],
    "category": "saint",
    "acceptedNames": ["São Bento", "Sao Bento", "Bento", "Bentu", "Pento", "Saobento"]
  },
  {
    "saint": "São Domingos",
    "forbidden": ["pregadores", "rosário", "europeu", "fundador", "fera"],
    "category": "saint",
    "acceptedNames": ["São Domingos", "Domingos", "Domingu", "Domitgos"]
  },
  {
    "saint": "São Boaventura",
    "forbidden": ["franciscano", "doutor", "teologia", "seráfico", "fundador"],
    "category": "saint",
    "acceptedNames": ["São Boaventura", "Boaventura", "Boa Ventura"]
  },
  {
    "saint": "Santa Isabel de Portugal",
    "forbidden": ["monarca", "pobres", "harmonia", "milagre", "rosas"],
    "category": "saint",
    "acceptedNames": ["Santa Isabel", "Isabel", "Izabel", "Isabeu", "Itabel"]
  },
  {
    "saint": "Santa Mônica",
    "forbidden": ["matriarca", "lágrimas", "mudanca", "paciência", "esposa"],
    "category": "saint",
    "acceptedNames": ["Santa Mônica", "Santa Monica", "Mônica", "Monica", "Monika", "Monia"]
  },
  {
    "saint": "Santa Tereza D'Ávila",
    "forbidden": ["carmelita", "doutora", "castelo", "interior", "reforma"],
    "category": "saint",
    "acceptedNames": ["Santa Tereza D'Ávila", "Tereza de Avila", "Teresa D'Avila", "Tereta"]
  },
  {
    "saint": "São Jerônimo",
    "forbidden": ["bíblia", "escrita", "vulgata", "felino", "eremita"],
    "category": "saint",
    "acceptedNames": ["São Jerônimo", "Jerônimo", "Jeronimo", "Jeronimu", "Gerorimo"]
  },
  {
    "saint": "São Patrício",
    "forbidden": ["irlanda", "trevo", "serpentes", "bispo", "missões"],
    "category": "saint",
    "acceptedNames": ["São Patrício", "Patrício", "Patricio", "Patritio", "Batricio"]
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
    "saint": "São Carlos de Foucauld",
    "forbidden": ["deserto", "irmãos", "universais", "saara", "beduínos"],
    "category": "saint",
    "acceptedNames": ["São Carlos de Foucauld", "Carlos de Foucauld", "Carlot de Foucauld"]
  },
  {
    "saint": "Santo Inácio de Antioquia",
    "forbidden": ["mártir", "teoforo", "cristo", "bispo", "leões"],
    "category": "saint",
    "acceptedNames": ["Santo Inácio de Antioquia", "Inácio de Antioquia", "Inacio", "Inatio"]
  },
  {
    "saint": "São Policarpo",
    "forbidden": ["mártir", "discípulo", "mestre", "fogo", "esmirna"],
    "category": "saint",
    "acceptedNames": ["São Policarpo", "Policarpo", "Policalpo", "Poricarpo"]
  },
  {
    "saint": "São Justino",
    "forbidden": ["filósofo", "mártir", "apologista", "roma", "diálogo"],
    "category": "saint",
    "acceptedNames": ["São Justino", "Justino", "Jutino"]
  },
  {
    "saint": "São Bento de Núrsia",
    "forbidden": ["mosteiro", "regra", "objeto", "gotas", "abade"],
    "category": "saint",
    "acceptedNames": ["São Bento de Núrsia", "Bento de Nursia", "Bento", "Bentu"]
  },
  {
    "saint": "São Bruno",
    "forbidden": ["monge", "silêncio", "deserto", "fundador", "europeu"],
    "category": "saint",
    "acceptedNames": ["São Bruno", "Bruno", "Bluno", "Buno"]
  },
  {
    "saint": "São Bernardo de Claraval",
    "forbidden": ["cisterciense", "doce", "doutor", "abadia", "monge"],
    "category": "saint",
    "acceptedNames": ["São Bernardo de Claraval", "Bernardo", "Belnardo", "Benardo"]
  },
  {
    "saint": "São Filipe Neri",
    "forbidden": ["alegria", "oratório", "roma", "sorriso", "piadas"],
    "category": "saint",
    "acceptedNames": ["São Filipe Neri", "Filipe Neri", "Felipe", "Felipe Neri"]
  },
  {
    "saint": "São Luís Gonzaga",
    "forbidden": ["jovem", "pureza", "jesuíta", "anjo", "castidade"],
    "category": "saint",
    "acceptedNames": ["São Luís Gonzaga", "Luís Gonzaga", "Luis Gonzaga", "Luit Gonzaga"]
  },
  {
    "saint": "São João Bosco",
    "forbidden": ["jovens", "dormir", "salesiano", "turim", "ensino"],
    "category": "saint",
    "acceptedNames": ["São João Bosco", "João Bosco", "Dom Bosco", "Joao Botco", "Don Bosco"]
  },
  {
    "saint": "Santa Maria Goretti",
    "forbidden": ["pureza", "desculpa", "mártir", "castidade", "jovem"],
    "category": "saint",
    "acceptedNames": ["Santa Maria Goretti", "Maria Goretti", "Malia Goreti", "Gorete"]
  },
  {
    "saint": "Santo Estêvão",
    "forbidden": ["pedras", "protomártir", "diácono", "ativismo", "atos"],
    "category": "saint",
    "acceptedNames": ["Santo Estêvão", "Estêvão", "Estevao", "Etevao"]
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
    "saint": "Santa Marta",
    "forbidden": ["servir", "lázaro", "maria", "betânia", "hospitalidade"],
    "category": "saint",
    "acceptedNames": ["Santa Marta", "Marta", "Malta", "Mata"]
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
    "saint": "São Dimas",
    "forbidden": ["santo", "bandido", "madeiro", "paraíso", "arrependimento"],
    "category": "saint",
    "acceptedNames": ["São Dimas", "Dimas", "Dimat"]
  },
  {
    "saint": "Santo André",
    "forbidden": ["pescador", "apóstolo", "crucificado", "formato", "parente"],
    "category": "saint",
    "acceptedNames": ["Santo André", "André", "Andre", "Andle"]
  },
  {
    "saint": "São Bartolomeu",
    "forbidden": ["apóstolo", "esfolado", "faca", "filipe", "armênia"],
    "category": "saint",
    "acceptedNames": ["São Bartolomeu", "Bartolomeu", "Baltolomeu"]
  },
  {
    "saint": "São Tiago Maior",
    "forbidden": ["apóstolo", "europeu", "caminho", "molusco", "romaria"],
    "category": "saint",
    "acceptedNames": ["São Tiago Maior", "Tiago Maior", "Thiago Maior", "Tiago"]
  },
  {
    "saint": "São Tiago Menor",
    "forbidden": ["apóstolo", "parente", "jerusalém", "bispo", "mártir"],
    "category": "saint",
    "acceptedNames": ["São Tiago Menor", "Tiago Menor", "Thiago Menor"]
  },
  {
    "saint": "São Filipe",
    "forbidden": ["apóstolo", "batismo", "etíope", "eunuco", "gaza"],
    "category": "saint",
    "acceptedNames": ["São Filipe", "Filipe", "Felipe"]
  },
  {
    "saint": "São Tomé",
    "forbidden": ["duvidar", "apóstolo", "índia", "feridas", "incredulidade"],
    "category": "saint",
    "acceptedNames": ["São Tomé", "Tomé", "Tome", "Tumé"]
  },
  {
    "saint": "São Matias",
    "forbidden": ["apóstolo", "substituto", "judas", "sorteio", "doze"],
    "category": "saint",
    "acceptedNames": ["São Matias", "Matias", "Matiat"]
  },
  {
    "saint": "São Paulo Miki",
    "forbidden": ["oriente", "mártir", "madeiro", "jesuíta", "nagasaki"],
    "category": "saint",
    "acceptedNames": ["São Paulo Miki", "Paulo Miki", "Paulo Miqui"]
  },
  {
    "saint": "São Maximiliano Kolbe",
    "forbidden": ["campo", "herói", "consagrada", "fome", "franciscano"],
    "category": "saint",
    "acceptedNames": ["São Maximiliano Kolbe", "Maximiliano Kolbe", "Maximiliano", "Macsimiliano"]
  },
  {
    "saint": "Santa Rosa de Lima",
    "forbidden": ["primeira", "américas", "andino", "coroa", "penitência"],
    "category": "saint",
    "acceptedNames": ["Santa Rosa de Lima", "Rosa de Lima", "Rota de Lima"]
  },
  {
    "saint": "São Martinho de Porres",
    "forbidden": ["mulato", "mascote", "andino", "dominicano", "humildade"],
    "category": "saint",
    "acceptedNames": ["São Martinho de Porres", "Martinho de Porres", "Martinho", "Maltinho"]
  },
  {
    "saint": "São Frutuoso",
    "forbidden": ["titulo", "arcipreste", "braga", "bispo", "visigodo"],
    "category": "saint",
    "acceptedNames": ["São Frutuoso", "Frutuoso", "Flutuoso", "Frutuoto"]
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
    "saint": "Santo Alberto Magno",
    "forbidden": ["doutor", "ciência", "cosmos", "polaco", "dominicano"],
    "category": "saint",
    "acceptedNames": ["Santo Alberto Magno", "Alberto Magno", "Alberto", "Auberto"]
  },
  {
    "saint": "São Peregrino",
    "forbidden": ["câncer", "doente", "milagre", "servita", "perna"],
    "category": "saint",
    "acceptedNames": ["São Peregrino", "Peregrino", "Pelegrino"]
  },
  {
    "saint": "São Roque",
    "forbidden": ["peste", "mascote", "feridas", "peregrino", "amparo"],
    "category": "saint",
    "acceptedNames": ["São Roque", "Roque", "Hoque", "Roki"]
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
    "saint": "Santa Inês",
    "forbidden": ["cordeiro", "pureza", "mártir", "cabelos", "virgem"],
    "category": "saint",
    "acceptedNames": ["Santa Inês", "Inês", "Ines", "Inet"]
  },
  {
    "saint": "São Januário",
    "forbidden": ["sangue", "milagre", "nápoles", "líquido", "ampola"],
    "category": "saint",
    "acceptedNames": ["São Januário", "Januário", "Januario", "Zanuario"]
  },
  {
    "saint": "São Guido",
    "forbidden": ["crianças", "amparo", "peregrino", "lombardia", "milagres"],
    "category": "saint",
    "acceptedNames": ["São Guido", "Guido", "Gido"]
  },
  {
    "saint": "São Cipriano",
    "forbidden": ["magia", "mártir", "cartago", "bispo", "mudanca"],
    "category": "saint",
    "acceptedNames": ["São Cipriano", "Cipriano", "Tipriano", "Sipriano"]
  },
  {
    "saint": "São Nicolau de Mira",
    "forbidden": ["festa", "presentes", "crianças", "papai", "festivo"],
    "category": "saint",
    "acceptedNames": ["São Nicolau de Mira", "Nicolau", "Micolau", "Licolau"]
  },
  {
    "saint": "Santa Filomena",
    "forbidden": ["virgem", "mártir", "jovem", "padroeira", "milagres"],
    "category": "saint",
    "acceptedNames": ["Santa Filomena", "Filomena", "Firomena"]
  },
  {
    "saint": "Santo Hilário",
    "forbidden": ["bispo", "doutor", "poitiers", "trindade", "heresia"],
    "category": "saint",
    "acceptedNames": ["Santo Hilário", "Hilário", "Hilario", "Ilario"]
  },
  {
    "saint": "São Clemente Romano",
    "forbidden": ["papa", "roma", "mártir", "carta", "âncora"],
    "category": "saint",
    "acceptedNames": ["São Clemente Romano", "Clemente", "Clemente Romano", "Cremente"]
  },
  {
    "saint": "Santa Joana D'Arc",
    "forbidden": ["frança", "guerra", "fogueira", "donzela", "orleans"],
    "category": "saint",
    "acceptedNames": ["Santa Joana D'Arc", "Joana D'Arc", "Joana Darc", "Toana Darc", "Zoana Darc"]
  },
  {
    "saint": "Santa Gianna Beretta",
    "forbidden": ["matriarca", "médica", "aborto", "bebês", "família"],
    "category": "saint",
    "acceptedNames": ["Santa Gianna Beretta", "Gianna Beretta", "Gianna", "Giana"]
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
    "saint": "Padre Eustáquio",
    "forbidden": ["holanda", "belo", "horizonte", "holandês", "doentes"],
    "category": "priest",
    "acceptedNames": ["Padre Eustáquio", "Padre Eustaquio", "Eustaquiu"]
  },
  {
    "saint": "Padre Vítor Coelho",
    "forbidden": ["redentorista", "aparecida", "rádio", "missões", "santo"],
    "category": "priest",
    "acceptedNames": ["Padre Vítor Coelho", "Padre Vitor", "Padre Vitu"]
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
    "saint": "Padre Márcio",
    "forbidden": ["sagrado", "peito", "jesus", "catolé", "igreja"],
    "category": "priest",
    "acceptedNames": ["Padre Márcio", "Padre Marcio", "Padre Maltio", "Padre Marsio"]
  },
  {
    "saint": "Padre Rodolfo Lucena",
    "forbidden": ["santo", "antônio", "juventude", "crescer", "cargo"],
    "category": "priest",
    "acceptedNames": ["Padre Rodolfo Lucena", "Padre Hodolfo Lucena", "Padre Rodolfo"]
  },
  {
    "saint": "Padre Genival",
    "forbidden": ["rosário", "prata", "titulo", "bispo", "história"],
    "category": "priest",
    "acceptedNames": ["Padre Genival", "Padri Genivau", "Padre Genivau"]
  },
  {
    "saint": "Padre Adelvan",
    "forbidden": ["graças", "liberdade", "sede", "obras", "bairro"],
    "category": "priest",
    "acceptedNames": ["Padre Adelvan", "Padre Adeuvan", "Padre Aldevan", "Padre Aldevan Guedes"]
  },
  {
    "saint": "Padre Isaías",
    "forbidden": ["sagrada", "família", "rocha", "cavalcante", "pároco"],
    "category": "priest",
    "acceptedNames": ["Padre Isaías", "Padre Isaias", "Padri Izaias"]
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
    "saint": "Padre Nilson Nunes",
    "forbidden": ["missa", "claridade", "cantor", "emissora", "programa"],
    "category": "priest",
    "acceptedNames": ["Padre Nilson Nunes", "Padre Nilson", "Padre Niuton"]
  },
  {
    "saint": "Irmã Kelly Patrícia",
    "forbidden": ["cantora", "freira", "hesed", "castelo", "música"],
    "category": "priest",
    "acceptedNames": ["Irmã Kelly Patrícia", "Irma Kelly Patricia", "Irma Keli", "Keli Patricia"]
  },
  {
    "saint": "Irmã Zélia",
    "forbidden": ["freira", "copiosa", "salvamento", "palavra", "cura"],
    "category": "priest",
    "acceptedNames": ["Irmã Zélia", "Irma Zelia", "Irma Zeria"]
  },
  {
    "saint": "Dunga",
    "forbidden": ["sigla", "musica", "nova", "jovens", "canção"],
    "category": "priest",
    "acceptedNames": ["Dunga", "O Dunga", "Cantar Dunga"]
  },
  {
    "saint": "Eliana Ribeiro",
    "forbidden": ["cantora", "musica", "nova", "força", "vitória"],
    "category": "priest",
    "acceptedNames": ["Eliana Ribeiro", "Eliana Hibeiro", "Eliana", "Eriana"]
  },
  {
    "saint": "Moysés Azevedo",
    "forbidden": ["shalom", "fundador", "comunidade", "fortaleza", "harmonia"],
    "category": "priest",
    "acceptedNames": ["Moysés Azevedo", "Moises Azevedo", "Moitet"]
  },
  {
    "saint": "Emmir Nogueira",
    "forbidden": ["shalom", "cofundadora", "estudo", "livros", "ceará"],
    "category": "priest",
    "acceptedNames": ["Emmir Nogueira", "Emir Nogueira"]
  },
  {
    "saint": "Astromar Braga",
    "forbidden": ["pregador", "crescer", "família", "acampamento", "palestra"],
    "category": "priest",
    "acceptedNames": ["Astromar Braga", "Astromar", "Astromal"]
  },
  {
    "saint": "Dom Dulcênio Fontes de Matos",
    "forbidden": ["bispo", "diocese", "pastoral", "catedral", "conselho"],
    "category": "priest",
    "acceptedNames": ["Dom Dulcênio", "Dom Dulcenio", "Dom Dulcinio", "Dom Dulcênio Fontes", "Bispo Dulcênio"]
  },
  {
    "saint": "Dom José Ruy",
    "forbidden": ["bispo", "caruaru", "sertão", "pastoral", "pernambuco"],
    "category": "priest",
    "acceptedNames": ["Dom José Ruy", "Dom Jose Ruy", "Dom Ruy", "Bispo Ruy"]
  },
  {
    "saint": "Padre Ednaldo Gomes",
    "forbidden": ["comunidade", "palestra", "missão", "campina", "carisma"],
    "category": "priest",
    "acceptedNames": ["Padre Ednaldo", "Padri Ednaldo", "Padre Ednau"]
  },
  {
    "saint": "Alam Carrion",
    "forbidden": ["pregador", "crescer", "palestra", "comunidade", "carisma"],
    "category": "priest",
    "acceptedNames": ["Alam Carrion", "Alan Carrion", "Alam Cariom"]
  },
  {
    "saint": "Anthony Feola",
    "forbidden": ["detroit", "americano", "palestra", "crescer", "família"],
    "category": "priest",
    "acceptedNames": ["Anthony Feola", "Tony Feola", "Antoni Feola"]
  },
  {
    "saint": "Irmã Maria Raquel",
    "forbidden": ["hesed", "freira", "crescer", "palestra", "carisma"],
    "category": "priest",
    "acceptedNames": ["Irmã Maria Raquel", "Irma Maria Raquel", "Maria Raquel", "Irmã Raquel"]
  },
  {
    "saint": "Irmã Maria Joana",
    "forbidden": ["cantora", "freira", "hesed", "música", "crescer"],
    "category": "priest",
    "acceptedNames": ["Irmã Maria Joana", "Irma Maria Joana", "Maria Joana", "Irmã Joana"]
  },
  {
    "saint": "Thiago Brado",
    "forbidden": ["cantor", "música", "católico", "compositor", "violão"],
    "category": "priest",
    "acceptedNames": ["Thiago Brado", "Tiago Brado", "Tiagu Brado"]
  },
  {
    "saint": "Ana Clara Rocha",
    "forbidden": ["cantora", "música", "juventude", "compositora", "crescer"],
    "category": "priest",
    "acceptedNames": ["Ana Clara Rocha", "Ana Clara", "Ana Clala"]
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
    "saint": "Patena",
    "forbidden": ["hóstia", "comida", "corpo", "altar", "missa"],
    "category": "object",
    "acceptedNames": ["Patena", "Patena Sagrada"]
  },
  {
    "saint": "Custódia",
    "forbidden": ["hóstia", "guarda", "reserva", "mostra", "adorar"],
    "category": "object",
    "acceptedNames": ["Custódia", "Custodia", "Cutodia"]
  },
  {
    "saint": "Sacrário",
    "forbidden": ["igreja", "hóstia", "jesus", "capela", "reserva"],
    "category": "object",
    "acceptedNames": ["Sacrário", "Sacrario", "Tacrario", "Satrario"]
  },
  {
    "saint": "Ambão",
    "forbidden": ["leitura", "palavra", "textos", "missa", "púlpito"],
    "category": "object",
    "acceptedNames": ["Ambão", "Ambao", "O Ambao"]
  },
  {
    "saint": "Altar",
    "forbidden": ["missa", "sacrifício", "eucaristia", "pedra", "mesa"],
    "category": "object",
    "acceptedNames": ["Altar", "O Altar", "Autal", "Autar"]
  },
  {
    "saint": "Turíbulo",
    "forbidden": ["incenso", "fumaça", "missa", "balançar", "fogo"],
    "category": "object",
    "acceptedNames": ["Turíbulo", "Turibulo", "Tulibulo"]
  },
  {
    "saint": "Naveta",
    "forbidden": ["incenso", "navio", "utensilio", "brasa", "grãos"],
    "category": "object",
    "acceptedNames": ["Naveta", "Nabeta"]
  },
  {
    "saint": "Corporal",
    "forbidden": ["pano", "hóstia", "cálice", "graca", "tecido"],
    "category": "object",
    "acceptedNames": ["Corporal", "O Corporal", "Colporal", "Corporau"]
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
    "saint": "Missal",
    "forbidden": ["missa", "liturgia", "livro", "sacerdote", "orações"],
    "category": "object",
    "acceptedNames": ["Missal", "O Missal", "Mitsal", "Missau"]
  },
  {
    "saint": "Pia Batismal",
    "forbidden": ["batismo", "água", "nascer", "criança", "pascoa"],
    "category": "object",
    "acceptedNames": ["Pia Batismal", "Pia Batismao"]
  },
  {
    "saint": "Círio Pascal",
    "forbidden": ["vela", "páscoa", "fogo", "renascer", "claridade"],
    "category": "object",
    "acceptedNames": ["Círio Pascal", "Cirio Pascal", "Tirio Patcal", "Cirio Patau"]
  },
  {
    "saint": "Sineta",
    "forbidden": ["sino", "alerta", "missa", "momento", "tocar"],
    "category": "object",
    "acceptedNames": ["Sineta", "Tineta", "A Sineta"]
  },
  {
    "saint": "Cruz Processional",
    "forbidden": ["caminhada", "missa", "entrada", "cristo", "haste"],
    "category": "object",
    "acceptedNames": ["Cruz Processional", "Cruz Protessional", "Cluz Plocessional"]
  },
  {
    "saint": "Ícone",
    "forbidden": ["imagem", "santo", "oriente", "quadro", "igreja"],
    "category": "object",
    "acceptedNames": ["Ícone", "Icone", "O Icone"]
  },
  {
    "saint": "Relicário",
    "forbidden": ["relíquia", "santo", "osso", "pedaço", "conservar"],
    "category": "object",
    "acceptedNames": ["Relicário", "Relicario", "Lelicario"]
  },
  {
    "saint": "Rosário",
    "forbidden": ["contas", "prece", "maria", "mistérios", "rezar"],
    "category": "object",
    "acceptedNames": ["Rosário", "Rosario", "Hozario", "Rojario"]
  },
  {
    "saint": "Âmbula",
    "forbidden": ["hostias", "particulas", "consagrar", "corpo", "comunhao"],
    "category": "object",
    "acceptedNames": ["Âmbula", "Ambula", "Ciborio", "Pixide"]
  },
  {
    "saint": "Lecionário",
    "forbidden": ["leituras", "missa", "palavra", "sermao", "temporal"],
    "category": "object",
    "acceptedNames": ["Lecionário", "Lecionario", "Lesionario"]
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
    "saint": "Paróquia do Sagrado Coração de Jesus",
    "forbidden": ["catolé", "tradicional", "comunidade", "cristo", "peito"],
    "category": "church",
    "acceptedNames": ["Paróquia do Sagrado Coração de Jesus", "Sagrado Coracao de Jesus", "Paroquia do Sagrado Cotacao"]
  },
  {
    "saint": "Paróquia de Santa Rosa de Lima",
    "forbidden": ["bairro", "zona", "oeste", "comunidade", "sede"],
    "category": "church",
    "acceptedNames": ["Paróquia de Santa Rosa de Lima", "Santa Rosa de Lima", "Santa Rota"]
  },
  {
    "saint": "Paróquia de São Judas Tadeu",
    "forbidden": ["bairro", "causas", "impossíveis", "desesperadas", "novena"],
    "category": "church",
    "acceptedNames": ["Paróquia de São Judas Tadeu", "São Judas Tadeu", "Sao Judat"]
  },
  {
    "saint": "Santuário de Nossa Senhora Aparecida",
    "forbidden": ["zona", "leste", "padroeira", "patria", "romaria"],
    "category": "church",
    "acceptedNames": ["Santuário de Nossa Senhora Aparecida", "Santuario Aparecida", "Santtuario"]
  },
  {
    "saint": "Paróquia Santíssima Trindade",
    "forbidden": ["catole", "unidade", "cremos", "pessoa", "divina"],
    "category": "church",
    "acceptedNames": ["Paróquia Santíssima Trindade", "Paroquia Santissima Trindade", "Santissima Trindade", "Santima Trindade"]
  },
  {
    "saint": "Paróquia Nossa Senhora das Graças",
    "forbidden": ["medalha", "milagrosa", "pingente", "catarina", "capela"],
    "category": "church",
    "acceptedNames": ["Paróquia Nossa Senhora das Graças", "Paroquia Nossa Senhora das Gracas", "Nossa Senhora das Gracas", "Graças", "Gratas", "Senhora das Gracas"]
  },
  {
    "saint": "Paróquia Nossa Senhora de Fátima",
    "forbidden": ["palmeira", "videntes", "oracao", "pastorinhos", "lúcia"],
    "category": "church",
    "acceptedNames": ["Paróquia Nossa Senhora de Fátima", "Paroquia Nossa Senhora de Fatima", "Nossa Senhora de Fatima", "Fatima", "Fatma"]
  },
  {
    "saint": "Santuário Nossa Senhora do Perpétuo Socorro",
    "forbidden": ["bodocongo", "socorro", "devoção", "novena", "mariana"],
    "category": "church",
    "acceptedNames": ["Santuário Nossa Senhora do Perpétuo Socorro", "Santuario do Perpetuo Socorro", "Perpetuo Socorro", "Santuário do Perpétuo"]
  },
  {
    "saint": "Paróquia Jesus Libertador",
    "forbidden": ["malvinas", "redencao", "escravidao", "libertador", "cativeiro"],
    "category": "church",
    "acceptedNames": ["Paróquia Jesus Libertador", "Jesus Libertador", "Igreja Jesus Libertador"]
  },
  {
    "saint": "Paróquia São Francisco de Assis",
    "forbidden": ["franciscano", "natureza", "fraternidade", "louvor", "criacao"],
    "category": "church",
    "acceptedNames": ["Paróquia São Francisco de Assis", "Paroquia Sao Francisco", "Sao Francisco", "Francitco"]
  },
  {
    "saint": "Paróquia São João Paulo II",
    "forbidden": ["campos", "jovens", "virtudes", "pastoral", "bairro"],
    "category": "church",
    "acceptedNames": ["Paróquia São João Paulo II", "Paroquia Joao Paulo II", "Joao Paulo Segundo", "Joao Paulo"]
  },
  {
    "saint": "Santuário da Divina Misericórdia",
    "forbidden": ["faustina", "confianca", "jesus", "misericordia", "imagem"],
    "category": "church",
    "acceptedNames": ["Santuário da Divina Misericórdia", "Santuario da Divina Misericordia", "Divina Misericordia", "Divina Misericordia CG"]
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