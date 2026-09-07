/** French overlay for Module 2 funding programmes, keyed by programme id. */

interface LocalisedProgram {
  name: string;
  provider: string;
  description: string;
  eligibility: string[];
  applicationWindow: string;
  typicalDecisionTime: string;
}

export const FR_PROGRAMS: Record<string, LocalisedProgram> = {
  "canexport-sme": {
    name: "CanExport PME",
    provider: "Affaires mondiales Canada",
    description:
      "Rembourse jusqu'à 50 % des coûts admissibles liés au développement d'un nouveau marché d'exportation : salons, études de marché, adaptation du matériel de marketing et conseils juridiques sur les ententes de distribution. C'est la subvention d'entrée la plus couramment utilisée par les entreprises qui s'implantent au Canada.",
    eligibility: [
      "Constituée en société au Canada, ou entreprise individuelle d'un résident canadien",
      "Entre 1 et 500 employés en équivalent temps plein",
      "Revenu annuel entre 100 000 $ et 100 millions $ CA",
      "Cible un marché où vos ventes annuelles sont inférieures à 100 000 $ CA",
    ],
    applicationWindow: "Dépôt continu, sous réserve du budget annuel",
    typicalDecisionTime: "60 à 90 jours",
  },
  "nrc-irap": {
    name: "Soutien financier du PARI CNRC",
    provider: "Conseil national de recherches du Canada",
    description:
      "Contributions non remboursables couvrant les salaires et les frais de sous-traitance de projets d'innovation technique, assorties d'un conseiller en technologie industrielle attitré. Favorise nettement les entreprises menant un véritable développement de produit au Canada plutôt qu'une simple distribution.",
    eligibility: [
      "PME canadienne constituée en société et à but lucratif",
      "Moins de 500 employés à temps plein",
      "Innovation technique démontrable à potentiel commercial",
      "Capacité de financer la portion du projet non couverte par la contribution",
    ],
    applicationWindow: "Continu — débute par un entretien avec un conseiller",
    typicalDecisionTime: "3 à 6 mois",
  },
  sred: {
    name: "Crédit d'impôt à l'investissement RS&DE",
    provider: "Agence du revenu du Canada",
    description:
      "Le plus important incitatif à l'innovation au Canada. Les sociétés privées sous contrôle canadien peuvent demander un crédit remboursable de 35 % sur les premiers 3 millions $ CA de dépenses admissibles de R-D ; les autres sociétés obtiennent un crédit non remboursable de 15 %. Il se réclame avec la déclaration de revenus annuelle plutôt que par une demande distincte.",
    eligibility: [
      "Société exerçant des activités au Canada",
      "Dépenses de développement expérimental ou de recherche appliquée effectuées au Canada",
      "Documentation technique constituée au fur et à mesure des travaux",
      "Produite dans les 18 mois suivant la fin de votre exercice",
    ],
    applicationWindow: "Produit avec votre déclaration T2 annuelle",
    typicalDecisionTime: "Remboursement dans les 120 jours suivant une demande complète",
  },
  "bdc-growth": {
    name: "Capital de croissance et transfert d'entreprise BDC",
    provider: "Banque de développement du Canada",
    description:
      "Financement subordonné souple n'exigeant pas de sûreté sur des actifs corporels, structuré en fonction des flux de trésorerie. Fréquemment utilisé pour combler l'écart de fonds de roulement entre l'établissement des activités canadiennes et la première année d'encaissements.",
    eligibility: [
      "Entreprise établie au Canada avec un historique de revenus démontré",
      "Flux de trésorerie positifs ou sur le point de l'être",
      "Plan de croissance défini assorti d'une utilisation crédible des fonds",
      "Équipe de direction dotée d'une expérience opérationnelle pertinente",
    ],
    applicationWindow: "Continu",
    typicalDecisionTime: "6 à 10 semaines",
  },
  "edc-export-guarantee": {
    name: "Programme de garanties d'exportations EDC",
    provider: "Exportation et développement Canada",
    description:
      "EDC fournit une garantie de partage des risques à votre banque canadienne, ce qui accroît le crédit d'exploitation que celle-ci consentira sur vos créances étrangères et vos stocks. Utile lorsque votre entité canadienne n'a pas encore d'antécédents de crédit au pays.",
    eligibility: [
      "Entreprise canadienne exerçant des activités d'exportation ou de vente internationale",
      "Relation existante ou envisagée avec une institution financière canadienne",
      "Créances étrangères ou stocks démontrables à financer",
    ],
    applicationWindow: "Continu, organisé par l'intermédiaire de votre banque",
    typicalDecisionTime: "4 à 8 semaines",
  },
  "strategic-innovation-fund": {
    name: "Fonds stratégique pour l'innovation",
    provider: "Innovation, Sciences et Développement économique Canada",
    description:
      "Contributions à grande échelle pour des projets industriels transformateurs. Réalistement hors de portée pour une première entrée de PME — inclus ici afin que vous puissiez voir où se situe le plafond et l'écarter en toute connaissance de cause.",
    eligibility: [
      "Coûts de projet généralement supérieurs à 20 millions $ CA",
      "Société à but lucratif constituée au Canada",
      "Retombées économiques importantes et quantifiées pour le Canada",
      "Investissement privé de contrepartie substantiel",
    ],
    applicationWindow: "Sur invitation, après une déclaration d'intérêt",
    typicalDecisionTime: "9 à 18 mois",
  },
  "canada-job-grant": {
    name: "Subvention canadienne pour l'emploi",
    provider: "Emploi et Développement social Canada (livrée par les provinces)",
    description:
      "Couvre jusqu'aux deux tiers des frais de formation dispensée par un tiers, pour les nouveaux employés comme pour le personnel en poste, jusqu'à un plafond par stagiaire. Livrée par chaque province sous sa propre appellation : la voie de demande dépend donc du lieu de travail de votre personnel.",
    eligibility: [
      "Employeur détenant un compte de paie canadien",
      "Formation dispensée par un fournisseur tiers admissible",
      "L'employeur assume le tiers restant des coûts",
      "Le stagiaire est citoyen canadien ou résident permanent",
    ],
    applicationWindow: "Continu jusqu'à épuisement de l'enveloppe annuelle",
    typicalDecisionTime: "4 à 8 semaines",
  },
  "on-regional-development": {
    name: "Programme de développement régional",
    provider: "Ministère du Développement économique de l'Ontario",
    description:
      "Financement à coûts partagés pour des projets créant des emplois et attirant des investissements dans des régions désignées de l'Ontario. Structuré en subvention conditionnelle pour les projets plus modestes et en contribution remboursable au-delà d'un seuil.",
    eligibility: [
      "Projet situé dans une région admissible de l'Ontario",
      "Coûts de projet admissibles d'au moins 500 000 $ CA",
      "Crée ou maintient un nombre défini d'emplois",
      "Au moins trois années d'historique d'exploitation",
    ],
    applicationWindow: "Dépôt continu",
    typicalDecisionTime: "4 à 6 mois",
  },
  "on-trade-fund": {
    name: "Fonds ontarien pour le commerce",
    provider: "Gouvernement de l'Ontario",
    description:
      "Soutient les fabricants qui diversifient leurs chaînes d'approvisionnement et accroissent leur capacité en Ontario. Privilégie les projets réduisant la dépendance à une source d'approvisionnement étrangère unique.",
    eligibility: [
      "Établissement de fabrication ou de transformation situé en Ontario",
      "Coûts de projet d'au moins 200 000 $ CA",
      "Retombées démontrées pour la chaîne d'approvisionnement ou la capacité en Ontario",
    ],
    applicationWindow: "Dépôt continu",
    typicalDecisionTime: "3 à 5 mois",
  },
  "bc-innovate-ignite": {
    name: "Programme Ignite d'Innovate BC",
    provider: "Innovate BC",
    description:
      "Financement sur trois ans pour des partenariats industrie-université résolvant un problème technique défini dans les ressources naturelles, les sciences appliquées ou le génie. Exige un partenaire de recherche nommé en Colombie-Britannique.",
    eligibility: [
      "Partenariat entre une entreprise et un établissement de recherche de la Colombie-Britannique",
      "Technologie à un stade démontrable de validation de principe",
      "Contribution de contrepartie du partenaire industriel",
    ],
    applicationWindow: "Deux périodes de dépôt par année",
    typicalDecisionTime: "3 à 4 mois",
  },
  "bc-employer-training": {
    name: "Subvention à la formation des employeurs de la C.-B.",
    provider: "WorkBC",
    description:
      "Rembourse jusqu'à 80 % des frais de formation par employé, jusqu'à un maximum annuel par employeur. Il s'agit de la mise en œuvre britanno-colombienne de la Subvention canadienne pour l'emploi, avec des volets pour les nouvelles embauches et le personnel en poste.",
    eligibility: [
      "Entreprise exerçant en Colombie-Britannique avec une paie dans la province",
      "Le stagiaire réside en Colombie-Britannique et est citoyen canadien ou résident permanent",
      "Formation dispensée par un fournisseur tiers admissible",
    ],
    applicationWindow: "Continu jusqu'à épuisement des fonds annuels",
    typicalDecisionTime: "4 à 6 semaines",
  },
  "ab-export-expansion": {
    name: "Programme d'expansion des exportations de l'Alberta",
    provider: "Gouvernement de l'Alberta",
    description:
      "Financement de déplacements et de développement de marché pour les entreprises albertaines visant de nouveaux marchés d'exportation, y compris les visites d'acheteurs au pays. Plus modeste et plus rapide d'accès que la plupart des équivalents fédéraux.",
    eligibility: [
      "Entreprise ayant son siège ou des activités importantes en Alberta",
      "Moins de 500 employés",
      "L'activité vise un marché à l'extérieur de l'Alberta",
    ],
    applicationWindow: "Dépôt continu",
    typicalDecisionTime: "4 à 8 semaines",
  },
  "ab-innovates-demonstration": {
    name: "Programme de démonstration de produits",
    provider: "Alberta Innovates",
    description:
      "Finance un projet pilote en conditions réelles pour une technologie proche du marché, auprès d'un site hôte albertain. Conçu pour combler l'écart entre un prototype fonctionnel et un premier client de référence commercial.",
    eligibility: [
      "Technologie au niveau de maturité technologique 6 ou plus",
      "Site hôte de démonstration confirmé en Alberta",
      "Contribution de contrepartie en espèces et en nature",
    ],
    applicationWindow: "Périodes de dépôt planifiées",
    typicalDecisionTime: "3 à 5 mois",
  },
  "qc-essor": {
    name: "Programme ESSOR",
    provider: "Investissement Québec",
    description:
      "Soutien aux projets d'investissement améliorant la productivité ou accroissant la capacité au Québec, offert sous forme de prêts, de garanties de prêt et, dans certains volets, de contributions non remboursables. Les demandes et la reddition de comptes se font en français.",
    eligibility: [
      "Projet réalisé dans un établissement situé au Québec",
      "Investissement admissible minimal généralement de 250 000 $ CA",
      "Résultat documenté en matière de productivité ou de capacité",
      "Demandes présentées en français",
    ],
    applicationWindow: "Dépôt continu",
    typicalDecisionTime: "3 à 6 mois",
  },
  "qc-c3i": {
    name: "Crédit d'impôt à l'investissement et à l'innovation (C3i)",
    provider: "Revenu Québec",
    description:
      "Crédit sur l'acquisition de matériel de fabrication et de transformation, de matériel informatique et de progiciels de gestion utilisés au Québec. Les taux augmentent dans les régions désignées à plus faible vitalité économique.",
    eligibility: [
      "Société ayant un établissement au Québec",
      "Bien admissible acquis pour être utilisé principalement au Québec",
      "Dépense supérieure au seuil applicable par bien",
    ],
    applicationWindow: "Réclamé avec votre déclaration de revenus des sociétés du Québec",
    typicalDecisionTime: "Évalué avec votre déclaration annuelle",
  },
};
