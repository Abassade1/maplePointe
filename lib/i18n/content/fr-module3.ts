/** French overlay for Module 3 diaspora content, keyed by record id or country. */

export const FR_COUNTRIES: Record<string, string> = {
  Brazil: "Brésil", France: "France", Germany: "Allemagne", Ghana: "Ghana",
  India: "Inde", Italy: "Italie", Japan: "Japon", Kenya: "Kenya",
  Mexico: "Mexique", Netherlands: "Pays-Bas", Nigeria: "Nigéria", Poland: "Pologne",
  Singapore: "Singapour", "South Africa": "Afrique du Sud", "South Korea": "Corée du Sud",
  Spain: "Espagne", Sweden: "Suède", "United Arab Emirates": "Émirats arabes unis",
  "United Kingdom": "Royaume-Uni", "United States": "États-Unis", Vietnam: "Vietnam",
  Other: "Autre",
};

/**
 * Feminine nationality adjectives, agreeing with "communauté".
 * French says "la communauté japonaise", never "la communauté Japon".
 */
export const FR_COMMUNITY_ADJECTIVES: Record<string, string> = {
  Brazil: "brésilienne", France: "française", Germany: "allemande", Ghana: "ghanéenne",
  India: "indienne", Italy: "italienne", Japan: "japonaise", Kenya: "kényane",
  Mexico: "mexicaine", Netherlands: "néerlandaise", Nigeria: "nigériane", Poland: "polonaise",
  Singapore: "singapourienne", "South Africa": "sud-africaine", "South Korea": "sud-coréenne",
  Spain: "espagnole", Sweden: "suédoise", "United Arab Emirates": "émirienne",
  "United Kingdom": "britannique", "United States": "américaine", Vietnam: "vietnamienne",
};

export const FR_LANGUAGES: Record<string, string> = {
  English: "anglais", French: "français", Punjabi: "pendjabi", Hindi: "hindi",
  Gujarati: "gujarati", Tamil: "tamoul", Yoruba: "yoruba", Igbo: "igbo",
  Hausa: "haoussa", Japanese: "japonais", Portuguese: "portugais", Korean: "coréen",
  Kannada: "kannada", Arabic: "arabe", Twi: "twi", Mandarin: "mandarin",
};

export const FR_COMMUNITY_INSIGHTS: Record<string, string[]> = {
  default: [
    "Les entreprises fondées par des immigrants au Canada représentent une part disproportionnée des nouvelles activités d'exportation, et les réseaux de la diaspora constituent systématiquement la voie la plus rapide vers un premier client canadien de référence. Ces communautés se concentrent étroitement dans quelques régions métropolitaines, ce qui signifie qu'un lancement ciblé dans un ou deux quartiers surpasse souvent une campagne nationale générale à budget égal.",
    "La valeur pratique tient à trois éléments : des premiers clients qui connaissent déjà votre marque sur votre marché d'origine, des conseillers ayant personnellement parcouru le même chemin d'immatriculation et de conformité, et des relations de distribution fondées sur une confiance préexistante plutôt que sur la prospection à froid. Voyez-y une voie vers vos vingt premiers clients, et non un substitut à la distribution grand public.",
  ],
  India: [
    "La communauté indo-canadienne est la plus importante diaspora non européenne au Canada et la mieux organisée sur le plan commercial. Brampton et Surrey fonctionnent en particulier comme des écosystèmes de détail denses et autonomes, où une marque indienne reconnue peut obtenir une distribution significative auprès d'épiciers indépendants avant même d'approcher une chaîne nationale.",
    "Pour les produits de consommation, la séquence pratique passe habituellement d'abord par l'épicerie sud-asiatique indépendante, puis par une bannière régionale, et enfin par des discussions de référencement national appuyées sur les données de volume générées par les deux premières étapes. Pour les activités interentreprises et technologiques, la concentration de la communauté dans le génie et la finance à Toronto rend les présentations chaleureuses particulièrement productives.",
  ],
  Nigeria: [
    "La communauté nigériano-canadienne figure parmi celles qui croissent le plus rapidement au pays ; elle est jeune, urbaine et très scolarisée, avec une concentration inhabituelle en santé, en génie et en services financiers. La part de l'Alberta est plus élevée que la plupart des entreprises ne l'anticipent, portée par une décennie de recrutement dans le secteur énergétique et en santé.",
    "Le commerce communautaire passe largement par les réseaux associatifs ainsi que par les organisations religieuses et sociales, plutôt que par des organismes commerciaux formels : les présentations comptent donc plus que les répertoires. Les programmes fédéraux et provinciaux destinés aux entrepreneurs noirs méritent également d'être examinés parallèlement à l'offre générale de financement du copilote de financement.",
  ],
  Japan: [
    "La communauté nippo-canadienne est comparativement modeste, mais exceptionnellement bien institutionnalisée, avec des centres culturels de longue date et une présence corporative dense bâtie autour de fabricants et de maisons de commerce japonais actifs au Canada depuis des décennies. La Colombie-Britannique en détient la plus grande part, reflet à la fois de l'établissement historique et du rôle de Vancouver comme porte d'entrée du commerce pacifique.",
    "Pour les entreprises industrielles et interentreprises, la strate corporative importe davantage que la strate grand public : les filiales canadiennes de sociétés japonaises établies constituent une voie éprouvée vers des présentations aux services d'approvisionnement, des partenariats techniques et des dirigeants bilingues expérimentés qui maîtrisent déjà les deux environnements réglementaires.",
  ],
  "United Kingdom": [
    "Les entreprises britanniques font face à la friction culturelle et linguistique la plus faible de tous les marchés étrangers, ce qui constitue à la fois un avantage et un piège. La langue commune amène régulièrement les entreprises à sous-estimer les différences réglementaires — en particulier l'étiquetage bilingue et l'immatriculation provinciale plutôt que nationale — parce que le marché leur semble familier.",
    "Le réseau britanno-canadien est moins un canal de distribution qu'un réseau de conseil. Sa valeur réside dans des dirigeants ayant fait exactement cette transition et capables de vous dire quelles hypothèses du marché britannique ne se transposent pas, notamment sur la structure du détail, la fragmentation provinciale et les coûts logistiques liés aux distances.",
  ],
  Brazil: [
    "La communauté brésilienne au Canada se concentre à Toronto et à Montréal et a connu une croissance rapide par les voies étudiantes et de travailleurs qualifiés. Elle est jeune, entrepreneuriale et regroupée dans les technologies, la restauration et les industries créatives, avec des réseaux d'affaires informels actifs bien antérieurs à toute organisation commerciale formelle.",
    "Montréal mérite une attention particulière : la communauté lusophone y recoupe un établissement portugais de longue date, créant une base de consommateurs combinée plus large que ne le laisse croire la seule population brésilienne — même si les obligations linguistiques françaises du Québec s'appliquent intégralement.",
  ],
  "South Korea": [
    "Le commerce coréano-canadien est densément regroupé et fortement axé sur le détail, avec des corridors commerciaux bien définis à North York et à Coquitlam qui servent de bancs d'essai pour les produits de consommation. L'épicerie et la cosmétique coréennes se sont notamment révélées des canaux de distribution initiaux fiables pour des marques ensuite reprises par les bannières grand public.",
    "Le fort taux de propriété de petites entreprises dans la communauté fait que les discussions de partenariat et de franchise avancent plus vite que sur des marchés comparables, mais attendez-vous à une négociation directe sur la marge et l'exclusivité. Les distributeurs coréano-canadiens établis souhaitent généralement un territoire défini en contrepartie de l'accès aux tablettes qu'ils procurent.",
  ],
};

interface LocalisedOrg {
  name?: string;
  blurb: string;
  focusAreas: string[];
}

export const FR_ORGANISATIONS: Record<string, LocalisedOrg> = {
  "org-maple-bharat": {
    blurb:
      "Conseil commercial bilatéral organisant des rencontres trimestrielles acheteurs-fournisseurs et un parcours formel de mentorat en entrée au marché pour les entreprises indiennes qui s'implantent au Canada.",
    focusAreas: ["Missions commerciales", "Jumelage d'acheteurs", "Représentation politique"],
  },
  "org-punjab-retail": {
    blurb:
      "Groupement d'achat réunissant environ 180 épiciers sud-asiatiques indépendants de la région du Grand Toronto. Négocie les référencements collectivement, ce qui permet à une nouvelle marque d'atteindre un volume réel en tablette en une seule conversation.",
    focusAreas: ["Épicerie de détail", "Achat collectif"],
  },
  "org-naija-enterprise": {
    blurb:
      "Réseau de propriétaires d'entreprise nigériano-canadiens avec des sections à Toronto, Calgary et Montréal. Anime un programme structuré de présentations pour les entreprises arrivant d'Afrique de l'Ouest.",
    focusAreas: ["Réseau de fondateurs", "Présentations", "Mentorat"],
  },
  "org-lagos-calgary": {
    blurb:
      "Organisme commercial axé sur l'énergie et les services professionnels, reliant les équipes d'approvisionnement albertaines aux fournisseurs et cabinets de services nigérians.",
    focusAreas: ["Services énergétiques", "Approvisionnement"],
  },
  "org-sakura-commerce": {
    blurb:
      "Association de longue date regroupant les entreprises à capitaux japonais et leurs filiales canadiennes de la côte Ouest. Anime un programme permanent de présentations pour les entreprises industrielles en quête de contacts d'approvisionnement.",
    focusAreas: ["Approvisionnement industriel", "Facilitation commerciale"],
  },
  "org-nikkei-founders": {
    blurb:
      "Réseau de pairs regroupant dirigeants et fondateurs nippo-canadiens des technologies et de la fabrication de pointe, avec une table ronde technique mensuelle à Toronto.",
    focusAreas: ["Fabrication de pointe", "Technologies"],
  },
  "org-thistle-exchange": {
    blurb:
      "Réseau informel mais très bien connecté de fondateurs et de cadres britanniques au Canada. À privilégier pour des conseils francs sur ce qui se transpose ou non depuis le marché britannique.",
    focusAreas: ["Conseils entre pairs", "Réseau de cadres"],
  },
  "org-verde-atlantico": {
    blurb:
      "Cercle d'affaires lusophone réunissant les communautés brésilienne et portugaise de Montréal, avec un soutien pratique en francisation québécoise et en conformité linguistique française.",
    focusAreas: ["Conformité linguistique", "Détail communautaire"],
  },
  "org-hanguk-trade": {
    blurb:
      "Forum commercial coréano-canadien fortement implanté dans l'épicerie et la cosmétique coréennes du Grand Vancouver. Organise deux fois l'an une vitrine de produits pour les nouvelles entreprises.",
    focusAreas: ["Détail de consommation", "Beauté et soins personnels"],
  },
  "org-newcomer-founders": {
    blurb:
      "Programme de douze semaines pour les fondateurs immigrants et étrangers qui établissent des activités canadiennes : constitution en société, services bancaires, embauche, et journée de démonstration devant des acheteurs canadiens.",
    focusAreas: ["Incubation", "Entrée au marché", "Financement"],
  },
  "org-pacific-gateway-diaspora": {
    blurb:
      "Chambre pandiasporique assurant la coordination entre douze associations d'affaires nationales en Colombie-Britannique, utile lorsque votre communauté ne dispose pas d'un organisme dédié.",
    focusAreas: ["Intercommunautaire", "Missions commerciales"],
  },
  "org-prairie-newcomer": {
    blurb:
      "Alliance albertaine soutenant les entreprises appartenant à des immigrants par l'accès à l'approvisionnement, la navigation des subventions provinciales et un registre de mentors.",
    focusAreas: ["Approvisionnement", "Navigation des subventions"],
  },
};

interface LocalisedMentor {
  role: string;
  blurb: string;
  expertise: string[];
}

export const FR_MENTORS: Record<string, LocalisedMentor> = {
  "mentor-priya-raghavan": {
    role: "Vice-présidente, International",
    blurb:
      "A mené une entreprise agroalimentaire de Chennai du premier conteneur au référencement national en épicerie sur quatre ans. Directe et précise sur les structures de marge du détail et sur ce qu'un acheteur canadien attend réellement d'une présentation de référencement.",
    expertise: ["Épicerie de détail", "Distribution", "Conformité de l'emballage"],
  },
  "mentor-arjun-mehta": {
    role: "Fondateur",
    blurb:
      "A bâti la filiale canadienne d'une entreprise logicielle de Bangalore, de zéro à quarante employés. Utile sur les demandes de RS&DE, le recrutement technique et la structuration d'une filiale qui garde la PI là où vous le souhaitez.",
    expertise: ["SaaS", "RS&DE", "Structuration de filiale"],
  },
  "mentor-chidi-okafor": {
    role: "Associé directeur",
    blurb:
      "Vingt ans en approvisionnement énergétique albertain, puis conseil aux fournisseurs ouest-africains sur la qualification aux listes de fournisseurs des exploitants canadiens. Sans détour sur la durée réelle de cette qualification.",
    expertise: ["Approvisionnement énergétique", "Qualification de fournisseurs", "Vente interentreprises"],
  },
  "mentor-amina-bello": {
    role: "Directrice des opérations",
    blurb:
      "A dirigé le lancement canadien d'une marque de soins personnels de Lagos dans le détail indépendant et ethnique avant un référencement en bannière nationale. Solide sur l'ACIA et les cycles de révision d'étiquetage.",
    expertise: ["Biens de consommation", "Conformité ACIA", "Lancement au détail"],
  },
  "mentor-kenji-sato": {
    role: "Directeur général, Canada",
    blurb:
      "A établi et dirigé pendant deux décennies la filiale canadienne d'un fabricant japonais de commandes industrielles. Très pointu sur les cycles d'approvisionnement des équipementiers, la certification technique et le recrutement d'ingénieurs de terrain bilingues.",
    expertise: ["Équipement industriel", "Vente aux équipementiers", "Certification"],
  },
  "mentor-yuki-tanaka": {
    role: "Directrice de la chaîne d'approvisionnement",
    blurb:
      "Dirige la logistique d'arrivée du Pacifique pour une maison de commerce japonaise. Pragmatique sur le choix d'un courtier en douane, l'entreposage sous douane et l'écart de coût réel entre une entrée par Vancouver et par l'est.",
    expertise: ["Logistique", "Douanes", "Opérations portuaires"],
  },
  "mentor-eleanor-shaw": {
    role: "Directrice commerciale",
    blurb:
      "A introduit une marque britannique d'articles ménagers dans les grands magasins canadiens. Franche sur les hypothèses du détail britannique qui ne tiennent pas ici, notamment quant à la fragmentation provinciale et aux coûts de transport.",
    expertise: ["Stratégie de détail", "Positionnement de marque", "Négociation avec les acheteurs"],
  },
  "mentor-rafael-costa": {
    role: "Cofondateur",
    blurb:
      "A bâti le bureau d'ingénierie montréalais d'une entreprise logicielle de São Paulo. A traversé deux fois la francisation de l'OQLF et vous dira précisément où le temps se perd.",
    expertise: ["Conformité québécoise", "Francisation", "Recrutement technique"],
  },
  "mentor-jisoo-park": {
    role: "Fondatrice",
    blurb:
      "A développé une entreprise d'importation alimentaire coréenne d'une seule devanture à la distribution régionale. Particulièrement utile pour négocier territoire et exclusivité avec les distributeurs communautaires.",
    expertise: ["Importation alimentaire", "Ententes de distribution", "Détail communautaire"],
  },
  "mentor-fatima-haddad": {
    role: "Associée principale",
    blurb:
      "Conseille des PME étrangères de diverses communautés sur les dix-huit premiers mois au Canada. Généraliste plutôt que spécialiste sectorielle — une bonne première conversation si vous hésitez encore sur la province.",
    expertise: ["Stratégie d'entrée au marché", "Choix de province", "Financement"],
  },
  "mentor-david-osei": {
    role: "Directeur",
    blurb:
      "Accompagne les fondateurs immigrants dans leurs demandes de subventions albertaines et l'accès à l'approvisionnement public. A siégé à des comités d'évaluation : il sait à quoi ressemble une demande faible vue de l'autre côté.",
    expertise: ["Demandes de subvention", "Approvisionnement public"],
  },
};

interface LocalisedEvent {
  title: string;
  description: string;
}

export const FR_EVENTS: Record<string, LocalisedEvent> = {
  "event-gta-showcase": {
    title: "Vitrine des importateurs du Grand Toronto",
    description:
      "Salon de présentation jumelant quarante nouvelles marques d'importation à des acheteurs d'épiceries indépendantes et de détail spécialisé de toute la région du Grand Toronto.",
  },
  "event-pacific-roundtable": {
    title: "Table ronde sur l'approvisionnement industriel du Pacifique",
    description:
      "Séance à huis clos où les responsables de l'approvisionnement de quatre fabricants canadiens exposent leurs besoins d'approvisionnement à venir et leurs exigences de qualification.",
  },
  "event-quebec-compliance": {
    title: "Clinique de conformité au marché québécois",
    description:
      "Atelier de travail sur l'étiquetage en français, la francisation OQLF et le calendrier de révision de l'emballage, avec examen en direct des graphismes des participants.",
  },
  "event-alberta-vendor": {
    title: "Atelier de qualification des fournisseurs en Alberta",
    description:
      "Parcours détaillé pour figurer aux listes de fournisseurs des exploitants dans l'approvisionnement énergétique et industriel albertain, y compris les préalables d'assurance et de sécurité.",
  },
  "event-founders-dinner": {
    title: "Souper des fondateurs nouvellement arrivés",
    description:
      "Souper en petit comité pour les fondateurs qui en sont à leurs deux premières années d'activités canadiennes. Vingt places, délibérément multisectoriel.",
  },
  "event-grant-clinic": {
    title: "Clinique de demandes de subventions fédérales",
    description:
      "Examen ligne par ligne des demandes CanExport PME et PARI avec d'anciens évaluateurs de programme, destiné aux entreprises qui déposent une première demande.",
  },
};
