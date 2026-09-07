import type { Dictionary } from "./en";

/** Canadian French. Typographic conventions follow Quebec usage. */
export const fr: Dictionary = {
  common: {
    skipToContent: "Passer au contenu principal",
    openMenu: "Ouvrir le menu de navigation",
    closeMenu: "Fermer la navigation",
    close: "Fermer",
    dismiss: "Fermer la notification",
    notifications: "Notifications",
    back: "Retour",
    continue: "Continuer",
    clearFilters: "Effacer les filtres",
    allProvinces: "Toutes les provinces",
    allTypes: "Tous les types",
    province: "Province",
    language: "Langue",
    changeLanguage: "Changer de langue",
    signedInAs: "Connecté en tant que {name}",
    homeLink: "Accueil Northgate AI",
    dashboardLink: "Tableau de bord Northgate AI",
    matchScore: "Score de correspondance : {score} sur 100",
    match: "corresp.",
    requestIntro: "Demander une présentation",
    introRequested: "Présentation demandée",
    introRequestedAria: "Présentation déjà demandée auprès de {name}",
    requestIntroAria: "Demander une présentation auprès de {name}",
    showingOf: "Affichage de {shown} {noun} sur {total}",
    matchingFilters: " correspondant à vos filtres",
    demoDisclaimer:
      "Produit de démonstration. Les indications fournies sont illustratives et ne constituent pas un avis juridique.",
  },

  nav: {
    primary: "Principale",
    dashboard: "Tableau de bord",
    provinces: "Provinces",
    howItWorks: "Fonctionnement",
    customers: "Clients",
    signIn: "Se connecter",
    startAssessment: "Commencer l'évaluation",
    groups: {
      marketEntry: "Navigateur d'entrée sur le marché",
      funding: "Copilote de financement",
      diaspora: "Passerelle diaspora",
    },
    items: {
      overview: "Aperçu",
      overviewDesc: "État de préparation, éléments ouverts et prochaines étapes",
      guide: "Guide des provinces",
      guideDesc: "Immatriculations et licences par province",
      assistant: "Assistant IA",
      assistantDesc: "Posez toutes vos questions sur l'entrée au Canada",
      partners: "Partenaires",
      partnersDesc: "Distributeurs, conseillers et logistique",
      checklist: "Liste de conformité",
      checklistDesc: "Suivez tout ce que vous devez déposer",
      funding: "Programmes de financement",
      fundingDesc: "Subventions, crédits, prêts et aides salariales",
      pipeline: "Suivi des demandes",
      pipelineDesc: "Suivez vos demandes du brouillon à l'octroi",
      diaspora: "Communauté et réseaux",
      diasporaDesc: "Chambres, réseaux et implantation de votre communauté",
      mentors: "Mentors et conseillers",
      mentorsDesc: "Des dirigeants qui ont fait le même parcours",
    },
    moduleBlurbs: {
      marketEntry:
        "Déterminez où vous implanter, ce que vous devez immatriculer et avec qui travailler.",
      funding:
        "Trouvez les subventions, crédits et financements auxquels vous êtes réellement admissible.",
      diaspora:
        "Atteignez vos premiers clients grâce à la communauté déjà présente au Canada.",
    },
  },

  landing: {
    badge: "Trois modules · Un parcours guidé",
    heroTitle: "Entrer au Canada ne devrait pas exiger six consultants et neuf mois.",
    heroBody:
      "Les conseils sur l'entrée au marché sont dispersés entre les organismes fédéraux, quatre registres provinciaux, des règlements municipaux et une dizaine de conseillers qui n'en voient chacun qu'une facette. Northgate les rassemble en un seul parcours guidé : dans quelle province vous implanter, ce que vous devez immatriculer, où les règles bilingues s'appliquent et avec qui travailler sur place.",
    heroNote: "Quatre questions. Aucun compte requis.",
    stats: {
      provinces: "Provinces cartographiées",
      licences: "Licences et immatriculations suivies",
      partners: "Partenaires locaux évalués",
    },
    preview: {
      title: "Aperçu de préparation",
      landingPoint: "Point d'entrée recommandé",
      landingPointBody:
        "Toronto (Ontario) — 39 % de la demande nationale à moins de deux heures.",
      registrations: "Immatriculations repérées",
      registrationsBody: "7 éléments · 330 $ CA de frais · délai de 2 à 4 semaines.",
      compliance: "Signal de conformité",
      complianceBody:
        "L'étiquetage bilingue fédéral s'applique même en dehors du Québec.",
      partners: "Partenaires correspondants",
      partnersBody: "3 distributeurs et 2 conseillers correspondant à votre catégorie.",
    },
    howItWorks: {
      title: "Fonctionnement",
      subtitle: "Un parcours guidé plutôt qu'une dizaine de conversations décousues.",
      assess: "Évaluer",
      assessBody:
        "Indiquez-nous votre produit, votre marché d'origine et les provinces envisagées. Northgate établit le profil de votre position d'entrée et signale les contraintes qui détermineront réellement votre calendrier.",
      guide: "Guider",
      guideBody:
        "Obtenez, province par province, le détail de chaque immatriculation, licence et compte de taxes nécessaire — avec des délais et des frais réalistes, ainsi que les règles d'étiquetage bilingue que la plupart des entreprises découvrent bien trop tard.",
      connect: "Connecter",
      connectBody:
        "Suivez une liste de conformité vivante et laissez-vous jumeler à des distributeurs, courtiers en douane et conseillers juridiques ayant déjà accompagné des entreprises de votre catégorie.",
    },
    modules: {
      title: "Trois modules, un seul plan d'entrée",
      subtitle:
        "Chacun répond à une question différente et tous partagent le même profil : ce que vous accomplissez dans l'un se répercute dans le suivant.",
      m1: "Navigateur d'entrée sur le marché",
      m1Summary:
        "Déterminez dans quelle province vous implanter, ce que vous devez précisément immatriculer et où s'appliquent les règles d'étiquetage bilingue — puis suivez le tout jusqu'à son achèvement.",
      m1Points: [
        "Guides d'immatriculation province par province",
        "Exigences de licence avec délais et frais",
        "Conformité bilingue et française au Québec",
        "Distributeurs, courtiers et conseillers évalués",
      ],
      m2: "Copilote de financement",
      m2Summary:
        "Le Canada offre un éventail dense de subventions, de crédits d'impôt et de financement à l'exportation. La plupart des entreprises l'apprennent bien trop tard, ou présentent une demande avant d'être admissibles.",
      m2Points: [
        "Programmes fédéraux et provinciaux qui vous correspondent",
        "Critères d'admissibilité en langage clair",
        "Signalement des cas exigeant une entité canadienne",
        "Un suivi des demandes, du brouillon à l'octroi",
      ],
      m3: "Passerelle diaspora",
      m3Summary:
        "Votre communauté est déjà ici. Les réseaux de la diaspora constituent systématiquement la voie la plus rapide vers un premier client canadien et vers les conseils de gens ayant fait le même parcours.",
      m3Points: [
        "L'implantation de votre communauté, province par province",
        "Chambres de commerce, réseaux d'affaires et incubateurs",
        "Des mentors qui ont suivi le même scénario",
        "Salons, cliniques et tables rondes d'acheteurs",
      ],
    },
    social: {
      eyebrow: "En collaboration avec des partenaires de conception dans six pays",
      disclaimer:
        "Les noms d'entreprise et les citations ci-dessus sont fictifs et présentés à des fins de démonstration uniquement.",
    },
    cta: {
      title: "Cartographiez votre entrée au Canada en dix minutes.",
      body:
        "Répondez à quatre questions sur votre entreprise et obtenez un plan province par province que vous pourrez présenter à votre conseil.",
    },
    footer: {
      tagline:
        "Entrée sur le marché guidée par l'IA pour les entreprises qui s'implantent au Canada.",
      product: "Produit",
      company: "Entreprise",
      resources: "Ressources",
      legal: "Mentions légales",
      links: {
        navigator: "Navigateur d'entrée sur le marché",
        funding: "Copilote de financement",
        diaspora: "Passerelle diaspora",
        pricing: "Tarifs",
        about: "À propos",
        careers: "Carrières",
        press: "Presse",
        contact: "Nous joindre",
        guides: "Guides",
        provincialData: "Données provinciales",
        help: "Centre d'aide",
        status: "État des services",
        privacy: "Confidentialité",
        terms: "Conditions",
        security: "Sécurité",
        accessibility: "Accessibilité",
      },
      rights: "© {year} Northgate AI. Tous droits réservés.",
    },
  },

  onboarding: {
    title: "Cartographions votre entrée au Canada",
    subtitle:
      "Quatre étapes brèves. Pour cette démonstration, tout ce que vous saisissez reste dans votre navigateur.",
    stepOf: "Étape {current} sur {total}",
    percentComplete: "{percent} % complété",
    progressLabel: "Progression de l'inscription",
    generatePlan: "Générer mon plan",
    building: "Préparation de votre plan…",
    steps: {
      company: "Entreprise",
      product: "Produit",
      provinces: "Provinces",
      goals: "Objectifs",
    },
    step1: {
      title: "Renseignements sur l'entreprise",
      description:
        "Ces éléments fondent chacune de nos recommandations, du choix de la province au jumelage avec des partenaires.",
      name: "Nom de l'entreprise",
      namePlaceholder: "Nordvik Foods AB",
      nameError: "Saisissez le nom de votre entreprise.",
      industry: "Secteur d'activité",
      industryPlaceholder: "Choisissez un secteur",
      industryError: "Choisissez un secteur d'activité.",
      country: "Pays d'origine",
      countryPlaceholder: "Choisissez un pays",
      countryError: "Choisissez votre pays d'origine.",
      size: "Taille de l'entreprise",
      sizeHint:
        "L'effectif détermine les obligations de francisation qui s'appliquent à vous au Québec.",
      sizeError: "Choisissez une taille d'entreprise.",
    },
    step2: {
      title: "Qu'apportez-vous sur le marché ?",
      description:
        "Le type de produit détermine l'essentiel du portrait de conformité : les produits emballés entraînent des obligations d'étiquetage que les logiciels n'ont pas.",
      category: "Catégorie de produit",
      categoryPlaceholder: "Choisissez une catégorie",
      categoryError: "Choisissez une catégorie de produit.",
      description_: "Description du produit ou du service",
      descriptionPlaceholder:
        "Nous produisons des soupes biologiques de longue conservation en cartons recyclables, actuellement vendues en épicerie dans les pays scandinaves.",
      descriptionHint:
        "Une ou deux phrases suffisent. Mentionnez l'emballage ou les ingrédients réglementés s'il y a lieu.",
      descriptionError:
        "Ajoutez au moins {min} caractères afin que nous puissions adapter nos conseils.",
    },
    step3: {
      title: "Quelles provinces envisagez-vous ?",
      description:
        "Sélectionnez toutes les provinces que vous évaluez. Vous pourrez les comparer côte à côte plus tard et affiner votre choix au fil du temps.",
      legend: "Provinces ciblées",
      error: "Sélectionnez au moins une province.",
      note:
        "La plupart des entreprises débutent dans une seule province avant de s'étendre. En sélectionner plusieurs ici ne vous engage à rien : cela signifie simplement que nous les cartographierons toutes.",
    },
    step4: {
      title: "Sur quoi avez-vous le plus besoin d'aide ?",
      description:
        "Sélectionnez tout ce qui s'applique. Cela détermine ce que nous mettons en avant sur votre tableau de bord.",
      legend: "Objectifs d'entrée sur le marché",
      error: "Sélectionnez au moins un objectif.",
    },
  },

  dashboard: {
    welcome: "Bon retour, {name}",
    subtitle: "Entrée au Canada depuis {country} · {provinces}",
    openGuide: "Ouvrir le guide des provinces",
    readiness: "Score de préparation",
    readinessAria: "Score de préparation : {score} sur 100",
    readinessBody:
      "Une combinaison illustrative de l'exhaustivité de votre profil et de votre progression dans la liste de conformité. Il évolue à mesure que vous avancez.",
    readinessLabels: {
      ready: "Prêt au lancement",
      onTrack: "Sur la bonne voie",
      early: "Premiers progrès",
      starting: "Tout début",
    },
    openItems: "Éléments ouverts",
    openItemsEmpty:
      "{count} immatriculations obligatoires repérées dans vos provinces. Ajoutez-les depuis le guide pour commencer le suivi.",
    openItemsProgress: "{done} des {total} éléments suivis sont terminés.",
    reviewRequirements: "Examiner les exigences",
    openChecklist: "Ouvrir la liste",
    fundingIdentified: "Financement repéré",
    fundingBody:
      "Réparti sur {count} programmes fédéraux et provinciaux réellement accessibles à votre profil.",
    viewFunding: "Voir les programmes",
    nextStep: "Prochaine étape suggérée",
    nextSteps: {
      reviewTitle: "Examinez vos exigences provinciales",
      reviewBody:
        "Ouvrez le guide des provinces et marquez les immatriculations qui vous concernent. Elles s'ajouteront automatiquement à votre liste de conformité.",
      reviewCta: "Aller au guide des provinces",
      fundingTitle: "Organisez votre financement",
      fundingBody:
        "Vos éléments de conformité suivis sont terminés : vous satisfaites donc au critère d'entité canadienne qu'exigent la plupart des programmes. Examinez les subventions et crédits qui vous sont ouverts.",
      fundingCta: "Voir les programmes",
      workTitle: "Traitez vos {count} éléments ouverts",
      workTitleOne: "Traitez votre élément ouvert",
      workBody:
        "Les éléments d'immatriculation et d'étiquetage se trouvent généralement sur le chemin critique. Les régler tôt préserve la crédibilité de votre date de lancement.",
      workCta: "Ouvrir la liste",
    },
    profile: {
      title: "Votre profil d'entrée",
      subtitle:
        "Recueilli lors de votre évaluation. Il oriente chacune de nos recommandations.",
      industry: "Secteur",
      size: "Taille de l'entreprise",
      sizeValue: "{size} employés",
      homeMarket: "Marché d'origine",
      targetProvinces: "Provinces ciblées",
      whatYouBring: "Ce que vous apportez sur le marché",
      priorities: "Priorités",
    },
    modulesHeading: "Vos modules",
    open: "Ouvrir",
    guard: {
      title: "Complétez d'abord votre évaluation",
      body:
        "Nous avons besoin de quelques renseignements sur votre entreprise avant de cartographier votre entrée au Canada. Cela prend environ deux minutes.",
      cta: "Commencer l'évaluation",
    },
  },

  guide: {
    title: "Guide des provinces",
    subtitle:
      "Étapes d'immatriculation, licences et obligations de conformité pour chaque province que vous envisagez.",
    yourProvinces: "Vos provinces",
    requirements: "{count} exigences",
    tracked: "{tracked} sur {total} suivies",
    frenchRegime: "Régime linguistique français",
    licencesTitle: "Licences et immatriculations",
    licencesSubtitle:
      "{count} éléments repérés · {required} obligatoires. Déployez un élément et marquez-le comme examiné pour l'ajouter à votre liste de conformité.",
    authority: "Autorité émettrice",
    timeline: "Délai habituel",
    cost: "Coût estimé",
    markReviewed: "Marquer comme examiné",
    onChecklist: "Dans votre liste",
    markReviewedAria: "Marquer {name} comme examiné et l'ajouter à la liste",
    alreadyOnChecklist: "{name} figure déjà dans votre liste",
    addedToast: "Ajouté à votre liste",
    addedToastBody: "{name} est maintenant suivi dans votre liste de conformité.",
    trackedLabel: "Suivi",
    disclaimer:
      "Les chiffres présentés sont des estimations de planification illustratives pour cette démonstration et ne constituent pas un avis juridique ou fiscal. Vérifiez les frais et délais en vigueur auprès de l'autorité émettrice avant tout dépôt.",
    noProvinces: {
      title: "Aucune province sélectionnée",
      body:
        "Votre évaluation ne comportait aucune province ciblée. Refaites-la pour choisir où vous souhaitez vous implanter.",
      cta: "Mettre à jour votre évaluation",
    },
    status: {
      required: "Obligatoire",
      recommended: "Recommandé",
      notApplicable: "Sans objet",
    },
    categories: {
      registration: "Immatriculation",
      tax: "Fiscalité",
      permit: "Permis",
      labelling: "Étiquetage",
      employment: "Emploi",
      import: "Importation",
    },
    bilingual: {
      quebecHeading: "Des exigences linguistiques françaises s'appliquent ici",
      quebecBody:
        "La Charte de la langue française du Québec régit l'étiquetage, l'emballage, les garanties, les modes d'emploi, l'affichage public, les sites Web et la documentation d'emploi. Le français doit figurer de façon au moins aussi évidente que toute autre langue, et une marque de commerce non française sur l'affichage doit être accompagnée d'un descriptif français suffisant.",
      quebecAction:
        "Prévoyez de 1 500 $ à 8 000 $ CA par famille de UGS et de 6 à 12 semaines pour la révision graphique. Si votre effectif atteint ou dépasse le seuil de la Loi 14, vous devez également vous inscrire auprès de l'OQLF et mener à terme une démarche de francisation.",
      federalHeading: "L'étiquetage bilingue s'applique aussi hors du Québec",
      federalBody:
        "La Loi fédérale sur l'emballage et l'étiquetage des produits de consommation exige que l'identité du produit et la déclaration de quantité nette figurent en français et en anglais sur les produits préemballés vendus partout au Canada — y compris dans les provinces dépourvues de législation linguistique propre.",
      federalAction:
        "Concevez un graphisme bilingue dès le départ, une seule fois. Les entreprises qui produisent un emballage unilingue anglais pour une première province paient couramment une seconde série de production au moment de s'étendre.",
    },
  },

  checklist: {
    title: "Liste de conformité",
    subtitle:
      "Tout ce que vous avez marqué comme examiné, regroupé par province et suivi jusqu'à son achèvement.",
    addMore: "Ajouter depuis le guide",
    overallProgress: "Progression globale",
    itemsComplete: "{done} des {total} éléments terminés",
    remaining: " · {count} restants",
    progressAria: "Liste complétée à {percent} pour cent",
    completeOf: "{done} sur {total} terminés",
    removeAria: "Retirer {name} de votre liste",
    empty: {
      title: "Votre liste est vide",
      body:
        "Ouvrez le guide des provinces, déployez une licence ou une immatriculation, puis choisissez « Marquer comme examiné ». Les éléments marqués apparaîtront ici pour que vous puissiez les suivre jusqu'au bout.",
      cta: "Aller au guide des provinces",
    },
  },

  assistant: {
    title: "Assistant IA",
    subtitle:
      "Posez toutes vos questions sur l'entrée au marché canadien. Les réponses s'appuient sur votre profil d'évaluation.",
    newConversation: "Nouvelle conversation",
    emptyTitle: "Comment puis-je aider {name} à entrer au Canada ?",
    emptyBody:
      "Je peux vous guider sur les licences, les taxes de vente, l'étiquetage bilingue, le choix des partenaires, les coûts et les délais. Choisissez une question ci-dessous ou posez la vôtre.",
    inputLabel: "Poser une question sur l'entrée au marché canadien",
    inputPlaceholder: "Licences, étiquetage, taxes, partenaires, coûts…",
    send: "Envoyer le message",
    conversation: "Conversation",
    typing: "L'assistant est en train d'écrire",
    youSaid: "Vous avez dit :",
    assistantReplied: "L'assistant a répondu :",
    suggested: "Questions suggérées",
    disclaimer:
      "Assistant de démonstration. Les réponses sont pré-rédigées et illustratives ; elles ne constituent pas un avis juridique.",
  },

  partners: {
    title: "Partenaires",
    subtitle:
      "Distributeurs, conseillers et prestataires logistiques correspondant à la catégorie et aux provinces ciblées de {name}.",
    filterLabel: "Filtrer les partenaires",
    partnerType: "Type de partenaire",
    noun: "partenaires",
    types: {
      distributor: "Distributeur",
      legalAdvisor: "Conseiller juridique",
      logistics: "Logistique",
      localAgent: "Agent local",
    },
    empty: {
      title: "Aucun partenaire ne correspond à ces filtres",
      body:
        "Nous n'avons pas encore de {type} dans cette province. Essayez d'élargir votre recherche.",
      genericType: "partenaire",
    },
    introToast: "Présentation demandée",
    introToastBody:
      "Nous communiquerons avec {name} et vous mettrons en copie de la présentation d'ici deux jours ouvrables.",
    disclaimer:
      "Toutes les organisations partenaires présentées sont fictives et incluses à des fins de démonstration uniquement.",
  },

  funding: {
    title: "Programmes de financement",
    subtitle:
      "Subventions, crédits d'impôt, prêts et aides salariales accessibles à {name} auprès du gouvernement fédéral et de vos provinces ciblées.",
    viewPipeline: "Voir le suivi",
    noun: "programmes correspondants",
    identified: "Financement repéré",
    identifiedBody:
      "Point médian des {count} programmes réellement accessibles. Les programmes hors de portée sont listés mais exclus.",
    strongMatches: "Fortes correspondances",
    strongMatchesBody:
      "Sur {total} programmes qui vous sont ouverts, obtenant 75 ou plus par rapport à votre profil.",
    inPipeline: "Dans votre suivi",
    inPipelineEmpty:
      "Suivez un programme pour commencer à constituer votre portefeuille de demandes.",
    inPipelineBody: "Les demandes que vous suivez actuellement jusqu'à une décision.",
    filterLabel: "Filtrer les programmes de financement",
    level: "Palier de gouvernement",
    allLevels: "Tous les paliers",
    federal: "Fédéral",
    provincial: "Provincial",
    fundingType: "Type de financement",
    viewDetails: "Voir les détails",
    track: "Suivre",
    tracked: "Suivi",
    trackAria: "Suivre {name} dans votre portefeuille de demandes",
    trackedAria: "{name} figure déjà dans votre suivi",
    trackToast: "Ajouté à votre suivi",
    trackToastBody: "{name} est maintenant suivi dans votre portefeuille de demandes.",
    fundingRange: "Fourchette de financement",
    intake: "Période de dépôt",
    decisionTime: "Délai de décision",
    eligibility: "Critères d'admissibilité",
    entityRequiredWarning:
      "Ce programme exige une entité immatriculée au Canada. Complétez votre immatriculation extraprovinciale avant de présenter une demande, sinon celle-ci vous sera retournée.",
    entityRequiredOk:
      "Ce programme exige une entité immatriculée au Canada, et votre immatriculation provinciale est marquée comme terminée dans votre liste de conformité.",
    openGuideLink: "Ouvrir le guide des provinces",
    detailDisclaimer:
      "Les détails des programmes sont des estimations de planification illustratives pour cette démonstration. Vérifiez les critères, montants et dates de dépôt en vigueur auprès de l'organisme responsable avant de présenter une demande.",
    empty: {
      title: "Aucun programme ne correspond à ces filtres",
      body:
        "Il n'existe aucun programme de ce type à ce palier pour les provinces sélectionnées. Essayez d'élargir votre recherche.",
    },
    disclaimer:
      "Les montants, périodes de dépôt et délais de décision sont des estimations de planification illustratives pour cette démonstration et ne constituent pas un avis financier ou juridique.",
    types: {
      grant: "Subvention",
      loan: "Prêt",
      taxCredit: "Crédit d'impôt",
      wageSubsidy: "Aide salariale",
      exportFinancing: "Financement à l'exportation",
    },
    competitiveness: {
      low: "Faible concurrence",
      moderate: "Concurrence modérée",
      high: "Très concurrentiel",
    },
  },

  pipeline: {
    title: "Suivi des demandes",
    subtitle:
      "Tous les programmes de financement que vous suivez, du premier brouillon jusqu'à la décision.",
    potentialValue: "Valeur potentielle",
    acrossTracked: "Réparti sur {count} programmes suivis",
    acrossTrackedOne: "Sur 1 programme suivi",
    submittedOrAwarded: "Déposées ou octroyées",
    submittedAria: "{percent} pour cent des programmes suivis ont été déposés",
    awarded: "Octroyé",
    nothingAwarded: "Rien d'octroyé pour l'instant",
    programmesAwarded: "{count} programmes octroyés",
    programmeAwarded: "1 programme octroyé",
    programmesCount: "{count} programmes",
    programmeCount: "1 programme",
    statusLabelFor: "Statut de la demande pour {name}",
    removeAria: "Retirer {name} de votre suivi",
    empty: {
      title: "Votre suivi est vide",
      body:
        "Ouvrez les programmes de financement, examinez-en un, puis choisissez « Suivre ». Les programmes suivis apparaîtront ici pour que vous puissiez les mener jusqu'à une décision.",
      cta: "Parcourir les programmes",
    },
    status: {
      notStarted: "Non commencée",
      preparing: "En préparation",
      submitted: "Déposée",
      awarded: "Octroyée",
      declined: "Refusée",
    },
  },

  diaspora: {
    title: "Communauté et réseaux",
    subtitle:
      "L'implantation de la communauté {community} au Canada, et les chambres et réseaux qui peuvent ouvrir des portes à {name}.",
    browseMentors: "Parcourir les mentors",
    communityIn: "La communauté {community} au Canada",
    communitiesGeneric: "Communautés de la diaspora au Canada",
    communitySize: "Taille de la communauté",
    largestConcentration: "Plus forte concentration",
    workingLanguages: "Langues de travail",
    whereTheyLive: "Où vit la communauté",
    distributionAria: "{province} : {share} pour cent, concentrée à {metro}",
    noProfile:
      "Nous n'avons pas encore de profil communautaire dédié pour {country}. Les chiffres ci-dessus constituent une base intercommunautaire — les organisations et mentors ci-dessous demeurent pertinents, et les organismes pandiasporiques sont un bon premier point de contact.",
    countryOrgs: "Organisations de la communauté {community}",
    countryOrgsBody:
      "Des organismes qui servent directement votre marché d'origine. C'est habituellement la voie la plus rapide vers une présentation chaleureuse.",
    broaderNetwork: "Réseau élargi",
    organisations: "Organisations",
    broaderBody:
      "Chambres et réseaux pandiasporiques actifs auprès de plusieurs communautés, ainsi que des organismes servant d'autres marchés.",
    events: "Événements à venir",
    eventsBody:
      "Salons, cliniques et tables rondes où les nouvelles entreprises rencontrent acheteurs et conseillers en personne.",
    hostedBy: "Organisé par {host}",
    members: "{count} membres",
    introToastBody:
      "Nous vous présenterons à {name} et vous mettrons en copie du message d'ici deux jours ouvrables.",
    disclaimer:
      "Toutes les organisations, mentors, événements et données communautaires présentés sont fictifs ou illustratifs et inclus à des fins de démonstration uniquement.",
    orgTypes: {
      chamber: "Chambre de commerce",
      businessNetwork: "Réseau d'affaires",
      culturalAssociation: "Association culturelle",
      incubator: "Incubateur",
    },
    eventFormats: { inPerson: "En personne", virtual: "Virtuel", hybrid: "Hybride" },
  },

  mentors: {
    title: "Mentors et conseillers",
    subtitleWithCount:
      "Des dirigeants qui ont fait le même parcours. {count} d'entre eux viennent de {country}.",
    subtitleNone:
      "Des dirigeants qui ont implanté des entreprises étrangères au Canada. Aucun mentor de {country} ne figure encore au registre ; l'ensemble du réseau est donc affiché.",
    filterLabel: "Filtrer les mentors",
    homeMarket: "Marché d'origine",
    allMentors: "Tous les mentors",
    fromCountry: "De {country}",
    otherMarkets: "Autres marchés",
    noun: "mentors",
    yearsInCanada: "{years} ans au Canada",
    introToastBody:
      "Nous demanderons à {name} un appel de présentation de 30 minutes et vous mettrons en copie du message.",
    empty: {
      title: "Aucun mentor ne correspond à ces filtres",
      body:
        "Nous n'avons pas encore de mentor répondant à ces deux critères. Essayez d'élargir votre recherche.",
    },
    disclaimer:
      "Tous les mentors présentés sont fictifs et inclus à des fins de démonstration uniquement.",
  },

  options: {
    sizes: {
      "1-10": "1 à 10 employés",
      "11-50": "11 à 50 employés",
      "51-200": "51 à 200 employés",
      "201-1000": "201 à 1 000 employés",
      "1000+": "Plus de 1 000 employés",
    },
    categories: {
      "packaged-food": "Aliments et boissons emballés",
      "consumer-goods": "Biens de consommation",
      "industrial-equipment": "Équipement industriel",
      "software-saas": "Logiciel / SaaS",
      "professional-services": "Services professionnels",
      "medical-devices": "Dispositifs médicaux",
      other: "Autre",
    },
    goals: {
      "understand-licensing": "Comprendre les licences",
      "understand-licensingDesc":
        "Savoir précisément quelles immatriculations et quels permis nous concernent.",
      "find-distribution-partners": "Trouver des partenaires de distribution",
      "find-distribution-partnersDesc":
        "Repérer des distributeurs, agents et prestataires logistiques.",
      "estimate-costs": "Estimer les coûts",
      "estimate-costsDesc":
        "Établir un budget défendable pour les 12 premiers mois d'implantation.",
      "understand-compliance": "Comprendre la conformité",
      "understand-complianceDesc":
        "Étiquetage, exigences bilingues et obligations continues.",
    },
    industries: {
      "Food & Beverage": "Agroalimentaire",
      "Consumer Retail": "Commerce de détail",
      Manufacturing: "Fabrication",
      "Technology & Software": "Technologies et logiciels",
      "Healthcare & Life Sciences": "Santé et sciences de la vie",
      "Professional Services": "Services professionnels",
      "Logistics & Transportation": "Logistique et transport",
      "Energy & Resources": "Énergie et ressources",
      Agriculture: "Agriculture",
      Other: "Autre",
    },
  },
};
