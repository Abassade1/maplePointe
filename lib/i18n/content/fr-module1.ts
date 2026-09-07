/**
 * French overlay for Module 1 mock content, keyed by record id.
 * English lives in lib/mock-data.ts and stays canonical; this file only
 * supplies the translated prose fields.
 */

export const FR_PROVINCE_NAMES: Record<string, string> = {
  ON: "Ontario",
  BC: "Colombie-Britannique",
  AB: "Alberta",
  QC: "Québec",
};

export const FR_PROVINCE_CITIES: Record<string, string> = {
  ON: "Toronto",
  BC: "Vancouver",
  AB: "Calgary",
  QC: "Montréal",
};

export const FR_PROVINCE_TAGLINES: Record<string, string> = {
  ON: "Le plus grand marché de consommation et le centre financier du Canada.",
  BC: "Porte d'entrée du Pacifique, avec les délais de transit les plus courts depuis l'Asie.",
  AB: "Aucune taxe de vente provinciale et le taux d'imposition des sociétés le plus bas au Canada.",
  QC: "Régime distinct de droit civil et de langue française : planifiez-le tôt.",
};

export const FR_PROVINCE_OVERVIEWS: Record<string, string[]> = {
  ON: [
    "L'Ontario est la première destination par défaut de la plupart des PME étrangères qui entrent au Canada. Environ 39 % de la population nationale et la plus forte concentration de sièges sociaux se trouvent à moins de deux heures de route de Toronto, et la région du Grand Toronto absorbe à elle seule plus de biens de consommation importés que toute autre région métropolitaine canadienne. Comme premier point d'entrée, cela signifie généralement que vous pouvez valider la demande sans déployer dès le départ une distribution nationale.",
    "Votre choix de structure vient en premier. La plupart des entreprises étrangères optent soit pour un permis extraprovincial en Ontario rattaché à une société étrangère existante, soit pour la constitution d'une filiale fédérale sous le régime de la LCSA, ensuite immatriculée de façon extraprovinciale en Ontario. La voie fédérale coûte davantage au départ, mais elle se transpose mieux si vous prévoyez vous étendre en Colombie-Britannique ou en Alberta d'ici 18 mois. Les deux voies exigent un agent ontarien aux fins de signification et des dépôts auprès du Registre des entreprises de l'Ontario.",
    "Une fois l'entité créée, la suite est assez mécanique : obtenir un numéro d'entreprise de l'ARC, s'inscrire à la TVH si vous prévoyez plus de 30 000 $ CA de fournitures taxables sur quatre trimestres consécutifs, ouvrir un compte d'exploitation en dollars canadiens et s'inscrire auprès de la CSPAAT avant l'entrée en fonction de votre premier employé. L'Ontario applique une TVH combinée de 13 %, perçue au point de vente plutôt qu'à la frontière pour la plupart des marchandises — une différence de trésorerie qu'il vaut la peine de modéliser avant de fixer vos objectifs de coût rendu.",
  ],
  BC: [
    "La Colombie-Britannique est le point d'entrée naturel pour les entreprises qui expédient depuis l'Asie-Pacifique. Le port de Vancouver traite un volume de conteneurs supérieur à celui de tous les autres ports canadiens réunis, et les délais de transit depuis Shanghai ou Busan sont de 5 à 8 jours plus courts qu'en passant par l'est du Canada. Si votre chaîne d'approvisionnement part d'Asie, entrer par la Colombie-Britannique et distribuer vers l'est revient généralement moins cher que l'inverse.",
    "L'immatriculation relève de la Business Corporations Act de la Colombie-Britannique. Les entités étrangères s'immatriculent comme sociétés extraprovinciales auprès de BC Registries and Services, ce qui exige un fondé de pouvoir résidant en Colombie-Britannique aux fins de signification ainsi qu'une approbation de dénomination préalable au dépôt de l'immatriculation. L'approbation de dénomination prend habituellement quelques jours ouvrables au traitement standard ; prévoyez davantage si votre marque s'apparente à une immatriculation existante.",
    "La Colombie-Britannique applique une taxe de vente provinciale distincte, ce qui déroute les entreprises habituées à un taux harmonisé unique. Vous percevrez séparément 5 % de TPS fédérale et 7 % de TVP, et l'inscription à la TVP est une démarche distincte de votre numéro d'entreprise de l'ARC. La TVP s'applique aussi à certains intrants d'entreprise qui seraient récupérables sous un régime de TVH : votre coût fiscal effectif n'est donc pas simplement de 12 %. Modélisez-le correctement avant de fixer vos prix de gros.",
  ],
  AB: [
    "L'Alberta offre le fardeau fiscal le plus léger de toutes les provinces canadiennes : un taux général d'imposition des sociétés de 8 % et aucune taxe de vente provinciale. Pour les entreprises de biens, c'est ce second point qui compte : vous ne percevez que 5 % de TPS, ce qui simplifie les systèmes de point de vente et fait de l'Alberta un marché exceptionnellement propre pour tester la sensibilité au prix des consommateurs sans bruit fiscal.",
    "L'immatriculation extraprovinciale passe par les Alberta Corporate Registries, mais contrairement à l'Ontario et à la Colombie-Britannique, vous devez déposer votre demande auprès d'un prestataire de services privé autorisé plutôt que directement auprès de la province. Ces agents sont peu coûteux et rapides, même s'il s'agit d'une relation fournisseur de plus à établir. Il vous faudra aussi un fondé de pouvoir albertain aux fins de signification, doté d'une adresse physique dans la province ; une boîte postale ne satisfait pas à cette exigence.",
    "L'économie albertaine est plus concentrée que sa population ne le laisse croire. L'énergie, l'agriculture et la logistique y dominent, et les décisions d'achat dans ces secteurs passent par un nombre relativement restreint de relations d'approvisionnement à Calgary et à Edmonton. Les entreprises qui vendent des produits industriels ou interentreprises constatent souvent qu'un seul agent local bien choisi surpasse ici un vaste réseau de distributeurs.",
  ],
  QC: [
    "Le Québec est la province où la friction est la plus élevée pour les entreprises étrangères, et aussi celle que l'on sous-estime le plus souvent. Elle relève d'un système de droit civil plutôt que de common law, ce qui modifie la rédaction des contrats, des sûretés et des ententes de distribution. Les ententes qui fonctionnent sans modification dans le reste du Canada doivent fréquemment être retravaillées pour le Québec.",
    "Le régime linguistique français est le facteur de conformité dominant. En vertu de la Charte de la langue française — considérablement élargie par la Loi 25 et la Loi 14 — l'étiquetage des produits, l'emballage, les garanties, l'affichage public, les sites Web et la documentation d'emploi doivent être disponibles en français. Le français doit figurer de façon au moins aussi évidente que toute autre langue sur l'emballage et l'affichage. Les entreprises dépassant un seuil d'effectif doivent en outre s'inscrire auprès de l'Office québécois de la langue française et mener à terme une démarche de francisation.",
    "Rien de tout cela ne fait du Québec un mauvais marché : il s'agit du deuxième en importance au Canada, Montréal constituant un véritable centre de gravité pour l'aérospatiale, l'intelligence artificielle et la transformation alimentaire. Mais la traduction et la refonte de l'emballage doivent figurer dès le départ dans votre budget de lancement, et non surgir six semaines avant l'expédition. Les entreprises qui traitent le Québec comme un marché de deuxième phase tout en prenant une décision d'emballage en première phase finissent généralement par tout réemballer.",
  ],
};

interface LocalisedLicence {
  name: string;
  description: string;
  authority: string;
  estimatedTimeline: string;
  estimatedCost: string;
}

export const FR_LICENCES: Record<string, LocalisedLicence> = {
  "on-extra-provincial": {
    name: "Permis extraprovincial (Registre des entreprises de l'Ontario)",
    description:
      "Autorise une société étrangère ou d'une autre province à exercer des activités en Ontario. Exige un agent ontarien aux fins de signification doté d'une adresse physique dans la province.",
    authority: "Registre des entreprises de l'Ontario (ServiceOntario)",
    estimatedTimeline: "2 à 4 semaines",
    estimatedCost: "330 $ CA",
  },
  "on-business-number": {
    name: "Numéro d'entreprise de l'ARC et compte d'importation-exportation",
    description:
      "Identifiant fédéral utilisé pour tous les comptes fiscaux, de paie et douaniers subséquents. Le compte de programme d'importation-exportation RM doit être ouvert avant le dédouanement de votre premier envoi.",
    authority: "Agence du revenu du Canada",
    estimatedTimeline: "1 à 3 jours ouvrables",
    estimatedCost: "Sans frais",
  },
  "on-hst": {
    name: "Inscription à la TVH (13 %)",
    description:
      "Obligatoire dès que les fournitures taxables dépassent 30 000 $ CA sur quatre trimestres civils consécutifs. L'inscription volontaire sous le seuil permet de récupérer les crédits de taxe sur les intrants liés aux frais de démarrage.",
    authority: "Agence du revenu du Canada",
    estimatedTimeline: "1 à 2 jours ouvrables",
    estimatedCost: "Sans frais",
  },
  "on-wsib": {
    name: "Inscription de l'employeur à la CSPAAT",
    description:
      "Assurance contre les accidents du travail. L'inscription est exigée dans les 10 jours suivant l'embauche de votre premier employé ontarien ; les taux de prime varient selon l'unité de classification.",
    authority: "Commission de la sécurité professionnelle et de l'assurance contre les accidents du travail",
    estimatedTimeline: "1 à 2 semaines",
    estimatedCost: "Selon la prime",
  },
  "on-municipal-licence": {
    name: "Licence commerciale municipale (Ville de Toronto)",
    description:
      "Exigée pour de nombreuses catégories de commerce de détail, de restauration et de métiers exerçant à Toronto. L'entreposage et la vente en gros interentreprises en sont fréquemment exemptés — vérifiez selon votre catégorie précise.",
    authority: "Ville de Toronto — Normes et permis municipaux",
    estimatedTimeline: "2 à 6 semaines",
    estimatedCost: "100 $ à 1 200 $ CA",
  },
  "on-consumer-packaging": {
    name: "Conformité à la Loi sur l'emballage et l'étiquetage des produits de consommation",
    description:
      "Règles fédérales régissant l'identité bilingue du produit, la déclaration de quantité nette, le nom et l'adresse du fournisseur ainsi que les unités métriques sur les produits préemballés de consommation vendus partout au Canada.",
    authority: "Bureau de la concurrence du Canada",
    estimatedTimeline: "3 à 8 semaines (révision graphique)",
    estimatedCost: "Variable selon le nombre de UGS",
  },
  "on-employer-health-tax": {
    name: "Compte d'impôt-santé des employeurs",
    description:
      "Taxe sur la masse salariale ontarienne au-delà de l'exemption annuelle. Sans objet tant que vous n'avez pas d'employés ontariens sur votre liste de paie.",
    authority: "Ministère des Finances de l'Ontario",
    estimatedTimeline: "1 semaine",
    estimatedCost: "Selon la masse salariale",
  },
  "bc-extraprovincial": {
    name: "Immatriculation de société extraprovinciale",
    description:
      "Immatriculation sous le régime de la Business Corporations Act de la Colombie-Britannique, incluant la nomination d'un fondé de pouvoir résidant dans la province aux fins de signification. L'approbation de dénomination doit précéder le dépôt.",
    authority: "BC Registries and Services",
    estimatedTimeline: "3 à 5 semaines",
    estimatedCost: "350 $ CA",
  },
  "bc-name-approval": {
    name: "Demande d'approbation de dénomination",
    description:
      "Précède l'immatriculation. Le traitement standard prend plusieurs jours ouvrables ; un examen prioritaire est offert moyennant des frais supplémentaires si votre date de lancement est arrêtée.",
    authority: "BC Registries and Services",
    estimatedTimeline: "3 à 10 jours ouvrables",
    estimatedCost: "30 $ à 130 $ CA",
  },
  "bc-pst": {
    name: "Inscription à la TVP (7 %)",
    description:
      "Distincte de votre compte de TPS fédérale. La Colombie-Britannique applique la TVP à certains intrants d'entreprise récupérables sous un régime de TVH : votre coût fiscal effectif dépasse donc le taux combiné affiché de 12 %.",
    authority: "Ministère des Finances de la Colombie-Britannique",
    estimatedTimeline: "1 à 2 semaines",
    estimatedCost: "Sans frais",
  },
  "bc-gst": {
    name: "Inscription à la TPS (5 %)",
    description:
      "Compte fédéral de taxe sur les produits et services, ouvert au moyen de votre numéro d'entreprise de l'ARC. Le seuil de petit fournisseur de 30 000 $ CA s'applique comme partout ailleurs au Canada.",
    authority: "Agence du revenu du Canada",
    estimatedTimeline: "1 à 2 jours ouvrables",
    estimatedCost: "Sans frais",
  },
  "bc-worksafe": {
    name: "Compte d'employeur WorkSafeBC",
    description:
      "Couverture obligatoire pour les employés de la Colombie-Britannique. L'unité de classification attribuée détermine votre taux de prime et mérite un examen plutôt qu'une acceptation par défaut.",
    authority: "WorkSafeBC",
    estimatedTimeline: "1 à 2 semaines",
    estimatedCost: "Selon la prime",
  },
  "bc-import-permit": {
    name: "Licence d'importation de l'ACIA (SAC)",
    description:
      "Licence en vertu de la Loi sur la salubrité des aliments au Canada, exigée pour importer ou vendre des produits alimentaires au-delà des frontières provinciales ou internationales. Ne vise que les aliments et les articles en contact avec les aliments.",
    authority: "Agence canadienne d'inspection des aliments",
    estimatedTimeline: "4 à 8 semaines",
    estimatedCost: "250 $ CA",
  },
  "bc-municipal-vancouver": {
    name: "Licence commerciale de la Ville de Vancouver",
    description:
      "Exigée de toute entreprise ayant une présence physique à Vancouver, y compris les activités limitées à un entrepôt ou à un bureau. Renouvelable annuellement.",
    authority: "Ville de Vancouver",
    estimatedTimeline: "2 à 4 semaines",
    estimatedCost: "150 $ à 800 $ CA",
  },
  "ab-extra-provincial": {
    name: "Immatriculation extraprovinciale",
    description:
      "Déposée auprès d'un prestataire de services albertain autorisé plutôt que directement auprès de la province. Exige un fondé de pouvoir albertain aux fins de signification doté d'une adresse physique dans la province.",
    authority: "Registre des sociétés de l'Alberta (via un agent autorisé)",
    estimatedTimeline: "1 à 3 semaines",
    estimatedCost: "275 $ à 400 $ CA",
  },
  "ab-gst": {
    name: "Inscription à la TPS (5 % seulement)",
    description:
      "L'Alberta ne prélève aucune taxe de vente provinciale : la TPS fédérale de 5 % constitue donc l'intégralité du fardeau de taxe indirecte au point de vente. Cela simplifie nettement la configuration des points de vente et les tests de prix.",
    authority: "Agence du revenu du Canada",
    estimatedTimeline: "1 à 2 jours ouvrables",
    estimatedCost: "Sans frais",
  },
  "ab-wcb": {
    name: "Compte auprès de la WCB Alberta",
    description:
      "Couverture d'indemnisation des travailleurs, obligatoire dans la plupart des secteurs avant l'entrée en fonction de votre premier employé. Certaines catégories de services professionnels en sont exemptées.",
    authority: "Workers' Compensation Board – Alberta",
    estimatedTimeline: "1 à 2 semaines",
    estimatedCost: "Selon la prime",
  },
  "ab-municipal-calgary": {
    name: "Licence commerciale de la Ville de Calgary",
    description:
      "Exigée pour la plupart des activités commerciales dans les limites de Calgary, avec des frais très variables selon la catégorie. Les activités à domicile et d'entreposage relèvent de sous-catégories distinctes.",
    authority: "Ville de Calgary",
    estimatedTimeline: "2 à 5 semaines",
    estimatedCost: "100 $ à 600 $ CA",
  },
  "ab-import-account": {
    name: "Compte de programme d'importation-exportation de l'ASFC",
    description:
      "Extension RM de votre numéro d'entreprise. Exigée avant le dédouanement de votre premier envoi commercial, quelle que soit la province d'entrée.",
    authority: "Agence des services frontaliers du Canada",
    estimatedTimeline: "1 à 3 jours ouvrables",
    estimatedCost: "Sans frais",
  },
  "ab-provincial-sales-tax": {
    name: "Inscription à la taxe de vente provinciale",
    description:
      "Sans objet. L'Alberta est la seule province sans TVP ni composante provinciale harmonisée : aucun compte de taxe de vente provinciale distinct n'existe donc.",
    authority: "S. O.",
    estimatedTimeline: "S. O.",
    estimatedCost: "Sans frais",
  },
  "qc-registraire": {
    name: "Déclaration au Registraire des entreprises",
    description:
      "Immatriculation auprès du registraire des entreprises du Québec. Les dépôts et la dénomination immatriculée elle-même se font en français, et une déclaration de mise à jour est exigée annuellement.",
    authority: "Registraire des entreprises du Québec",
    estimatedTimeline: "3 à 6 semaines",
    estimatedCost: "380 $ CA",
  },
  "qc-oqlf-francisation": {
    name: "Inscription à l'OQLF et programme de francisation",
    description:
      "Les entreprises atteignant ou dépassant le seuil d'effectif de la Loi 14 au Québec doivent s'inscrire auprès de l'Office québécois de la langue française et mener à terme une démarche de certification de francisation.",
    authority: "Office québécois de la langue française",
    estimatedTimeline: "3 à 6 mois",
    estimatedCost: "Aucuns frais de dépôt",
  },
  "qc-french-labelling": {
    name: "Conformité de l'étiquetage et de l'emballage en français",
    description:
      "L'étiquetage, l'emballage, les garanties et les modes d'emploi doivent tous figurer en français, de façon au moins aussi évidente que toute autre langue. Exige généralement une révision graphique propre au Québec.",
    authority: "Office québécois de la langue française",
    estimatedTimeline: "6 à 12 semaines",
    estimatedCost: "1 500 $ à 8 000 $ CA par famille de UGS",
  },
  "qc-qst": {
    name: "Inscription à la TVQ (9,975 %)",
    description:
      "Taxe de vente du Québec, administrée par Revenu Québec plutôt que par l'ARC. Vous produirez des déclarations provinciales distinctes de vos déclarations fédérales de TPS.",
    authority: "Revenu Québec",
    estimatedTimeline: "1 à 2 semaines",
    estimatedCost: "Sans frais",
  },
  "qc-cnesst": {
    name: "Inscription de l'employeur à la CNESST",
    description:
      "Inscription combinée aux normes du travail, à l'équité salariale et à la santé et sécurité du travail. Exigée avant l'entrée en fonction de votre premier employé québécois.",
    authority: "Commission des normes, de l'équité, de la santé et de la sécurité du travail",
    estimatedTimeline: "1 à 3 semaines",
    estimatedCost: "Selon la prime",
  },
  "qc-signage": {
    name: "Examen de l'affichage public et des marques de commerce",
    description:
      "L'affichage de devanture portant une marque de commerce non française doit comporter un descriptif français suffisant. Ne s'applique que si vous exploitez un commerce de détail physique ou des locaux à votre enseigne au Québec.",
    authority: "Office québécois de la langue française",
    estimatedTimeline: "4 à 8 semaines",
    estimatedCost: "Variable selon le nombre d'établissements",
  },
};

interface LocalisedPartner {
  blurb: string;
  focusAreas: string[];
}

export const FR_PARTNERS: Record<string, LocalisedPartner> = {
  "p-maple-ridge": {
    blurb:
      "Distributeur d'épicerie et de détail spécialisé de milieu de gamme couvrant environ 400 points de vente dans le sud de l'Ontario. Prend en charge les négociations de référencement et les revues de catégorie pour les nouvelles entreprises.",
    focusAreas: ["Aliments emballés", "Biens de consommation"],
  },
  "p-bellweather": {
    blurb:
      "Cabinet-boutique axé sur l'entrée au marché : structuration d'entité, immatriculation extraprovinciale, ententes de distribution et examen de l'étiquetage sous la Loi sur la concurrence.",
    focusAreas: ["Structuration d'entreprise", "Réglementation"],
  },
  "p-harbourline": {
    blurb:
      "Courtage en douane et entreposage sous douane au port de Vancouver. Solide en consolidation à l'arrivée depuis l'Asie-Pacifique et en transbordement ferroviaire vers l'est.",
    focusAreas: ["Courtage en douane", "Entreposage"],
  },
  "p-cascadia": {
    blurb:
      "Agence commerciale à commission représentant des marques étrangères auprès du détail indépendant de la Colombie-Britannique. Porte généralement de 8 à 12 gammes non concurrentes et travaille sur un mandat de validation de 90 jours.",
    focusAreas: ["Vente au détail", "Représentation de marque"],
  },
  "p-bow-valley": {
    blurb:
      "Distributeur industriel et du secteur de l'énergie disposant de relations d'approvisionnement établies à Calgary et à Edmonton. Privilégie les ententes de territoire exclusif.",
    focusAreas: ["Équipement industriel", "Services énergétiques"],
  },
  "p-chinook": {
    blurb:
      "Prestataire de services albertain autorisé chargé des dépôts extraprovinciaux et des ententes de fondé de pouvoir. Rapide, transactionnel et peu coûteux pour les immatriculations simples.",
    focusAreas: ["Dépôts d'immatriculation", "Fondé de pouvoir"],
  },
  "p-stlaurent": {
    blurb:
      "Cabinet de droit civil conseillant les entreprises étrangères sur la réécriture des contrats québécois, les obligations de la Loi 25 en matière de vie privée et la conformité à la francisation de l'OQLF.",
    focusAreas: ["Droit civil", "Conformité linguistique"],
  },
  "p-fleuve": {
    blurb:
      "Distributeur du marché francophone doté d'une équipe interne de traduction d'emballage et d'un examen préalable auprès de l'OQLF. Utile lorsque l'étiquetage québécois conditionne le lancement national.",
    focusAreas: ["Aliments emballés", "Distribution au détail"],
  },
  "p-northstar": {
    blurb:
      "Prestataire logistique exploitant des centres de traitement à Toronto et à Montréal. Offre un modèle d'espace partagé qui évite les engagements de volume minimal pendant un lancement pilote.",
    focusAreas: ["Traitement 3PL", "Dernier kilomètre"],
  },
  "p-prairie-gateway": {
    blurb:
      "Représentant de fabricants couvrant les comptes interentreprises de l'Alberta et de la Saskatchewan. Travaille sur honoraires plus commission et rend compte mensuellement de son portefeuille.",
    focusAreas: ["Vente interentreprises", "Agriculture"],
  },
  "p-pacific-rim-legal": {
    blurb:
      "Conseille les entreprises de l'Asie-Pacifique sur la création d'entité en Colombie-Britannique, l'inscription à la TVP et les normes d'emploi. Langues de travail : mandarin, coréen et japonais.",
    focusAreas: ["Création d'entité", "Inscription fiscale"],
  },
  "p-laurentide": {
    blurb:
      "Transporteur régional et exploitant d'entrepôts desservant le corridor Montréal–Québec, avec une capacité à température contrôlée pour les produits alimentaires et pharmaceutiques.",
    focusAreas: ["Chaîne du froid", "Fret régional"],
  },
};
