let drogues = [
    { type: "stimulants", classe: "Stimulants", substances: ["amphétamines", "speed", "crystal meth", "Dexedrine", "Ritaline", "pilules coupe-faim"] },
    { type: "cocaine", classe: "Cocaïne", substances: ["sniff", "shoot", "freebase", "crack", "speedball"] },
    { type: "opiaces", classe: "Opiacés", substances: ["héroïne", "morphine", "Dilaudid", "opium", "méthadone", "codéïne", "mépéridine", "fentanyl"] },
    { type: "hallucinogenes", classe: "Hallucinogènes", substances: ["LSD (acide)", "mescaline", "psilocybine", "champignons", "ecstasy", "peyotl", "iboga", "ayahuasca", "MDA", "MDMA"] },
    { type: "drogues_dissociatives", classe: "Drogues dissociatives", substances: ["PCP (Phencyclidine, angel dust)", "kétamine (special K)"] },
    { type: "produits_inhales", classe: "Produits à inhaler", substances: ["colle", "éther", "protoxyde d'azote (gaz hilarant)", "amyle ou butyl de nitrite (poppers)"] },
    { type: "cannabinoides", classe: "Cannabinoïdes", substances: ["cannabis", "marijuana (herbe, weed, ganja)", "haschisch (hasch, shit)", "THC"] },
    { type: "sedatifs", classe: "Sédatifs", substances: ["Valium", "Xanax", "Témesta", "Halcion", "Lexomil", "GHB", "secobarbital", "barbis"] },
    { type: "divers", classe: "Divers", substances: ["stéroïdes", "somnifères", "pilules amaigrissantes en vente libre", "médicaments contre la toux", "autres substances"] }
]

form.section("Substances consommées", () => {
    form.output(html`
        <p>Maintenant je vais vous lire une liste de drogues et de médicaments...
    `)

    form.binary("*J1a", "Au cours des 12 derniers mois, avez-vous pris plus d'une fois l'un de ces produits dans le but de planer, de vous sentir euphorique, de vous éclater ou de changer votre humeur ?", {readonly: false})

    form.section("", () => {
        form.pushOptions({disabled: values.J1a == 0})

        form.multiCheck("Jdrogues", "Cochez chaque classe de produit consommé :",
                        drogues.map(cat => [cat.type, html`<b>${cat.classe}</b> : ${cat.substances.join(', ')}`]))
    
        if (values.Jdrogues != null && values.Jdrogues.length) {
            form.multiCheck("Jconsommees", "Quelles sont les classes de substances les plus consommées ?",
                            drogues.filter(cat => values.Jdrogues != null && values.Jdrogues.includes(cat.type))
                                   .map(cat => [cat.type, cat.classe]))
            form.multiCheck("Jproblematiques", "Quelles sont les classes de substances les plus problématiques ?",
                            drogues.filter(cat => values.Jdrogues != null && values.Jdrogues.includes(cat.type))
                                   .map(cat => [cat.type, cat.classe]))
        }
    })
})

function in_de(classe) {
    classe = classe.toLowerCase()

    if ("aeiouyh".includes(classe[0])) {
        return `d'${classe}`;
    } else {
        return `de ${classe}`;
    }
}
function in_des(classe) {
    classe = classe.toLowerCase()

    if (classe.endsWith('s')) {
        return `des ${classe}`;
    } else {
        return `du/de la ${classe}`;
    }
}
function in_le(classe) {
    classe = classe.toLowerCase()

    if (classe.endsWith('s')) {
        return `aux ${classe}`;
    } else {
        return `le/la ${classe}`;
    }
}

let ordered = new Set
if (values.Jdrogues != null) {
    for (let type of (values.Jproblematiques || [])) 
        ordered.add(type)
    for (let type of (values.Jconsommees || [])) 
        ordered.add(type)
    for (let type of values.Jdrogues) 
        ordered.add(type)

    // XXX: Widgets should filter out unknown propositions directly
    ordered = Array.from(ordered).filter(type => values.Jdrogues.includes(type))
}

for (let type of ordered) {
    let classe = drogues.find(drogue => drogue.type === type).classe.toLowerCase()

    form.section(`Concernant votre consommation ${in_de(classe)} au cours des 12 derniers mois`, () => {
        form.pushOptions({path: "J" + type})
    
        form.binary("*J2a", html`Lorsque vous consommiez ${in_des(classe)}, finissiez-vous par consommer plus ${in_de(classe)} que vous n'en aviez l'intention au départ ?`)
        form.binary("*J2b", html`Avez-vous eu envie, à plusieurs reprises, de réduire ou de contrôler votre consommation ${in_de(classe)} ? Avez-vous essayé de réduire ou de contrôler votre consommation, mais sans y arriver ?`, {
            help: "Côtez OUI si OUI à l'une ou l'autre question"
        })
        form.binary("*J2c", html`Les jours où vous preniez plus ${in_de(classe)}, passiez-vous beaucoup de temps à vous en procurer, à en consommer ou à vous remettre de ses (leurs) effets ?`)
        form.binary("*J2d", html`Éprouviez-vous une envie irrépressible ou un fort désir ou un besoin urgent de consommer ${classe} ?`)
        form.binary("*J2e", html`Avez-vous délaissé vos responsabilités au travail, à l'école ou à la maison en raison de votre consommation répétée ${in_de(classe)} ?`)
        form.binary("*J2f", html`Avez-vous continué à prendre ${in_des(classe)}, même si cela entraînait des problèmes avec votre famille ou d'autres personnes ?`)
        form.binary("*J2g", html`Vous est-il arrivé plus d'une fois d'être sous l'effet de la drogue dans une situation où cela était physiquement risqué pour vous ou pour d'autres personnes, comme conduire une voiture ou une moto, utiliser une machine, faire du bâteau, etc. ?`)
        form.binary("*J2h", html`Avez-vous continué votre consommation ${in_de(classe)} tout en sachant pertinemment que ${classe} provoquait ou aggravait chez vous des problèmes psychologiques ou physiques ?`)
        form.binary("*J2i", html`Avez-vous consacré moins de temps à ou abandonné un travail important, vos activités sociales ou de loisirs à cause de votre consommation ${in_de(classe)} ?`)
        form.binary("*J2j", html`Aviez-vous besoin de prendre beaucoup plus ${in_de(classe)} pour obtenir le même effet que quand vous avez commencé à en consommer, ou la même quantité de drogue vous faisait-elle moins d'effet ?`, {
            help: "Ce critère est côté NON s'il s'agit de médicaments prescrits et consommés sous surveillance médicale."
        })
        
        let ptr = values['J' + type]

        let symptomes_sevrage
        if (type === "sedatifs") {
            let symptomes = [
                [1, "Augmentation de la transpiration ou du rythme cardiaque"],
                [2, "Tremblement des mains ou d'une autre partie du corps"],
                [3, "Troubles du sommeil"],
                [4, "Nausées ou vomissements"],
                [5, "Entendre ou voir des choses invisibles ou inaudibles pour les autres ou pour avoir des sensations cutanées sans raison apparente"],
                [6, "Agitation"],
                [7, "Anxiété"],
                [8, "Convulsions"]
            ]

            form.multiCheck("J2k1_a", html`Lorsque vous preniez moins de sédatifs après une consommation importante ou prolongée, ressentiez-vous l'un des symptômes de sevrage ?`, symptomes, {
                help: "Ce critère est côté NON s'il s'agit de médicaments prescrits et consommés sous surveillance médicale."
            })

            symptomes_sevrage = (ptr.J2k1_a != null && ptr.J2k1_a.length >= 2)
        } else if (type === "opiaces") {
            let symptomes = [
                [1, "État dépressif"],
                [2, "Nausées ou vomissements"],
                [3, "Douleurs musculaires"],
                [4, "Nez qui coule ou yeux larmoyants"],
                [5, "Pupilles dilatées, chair de poule, poils ou cheveux hérissés ou transpiration anormale"],
                [6, "Diarrhée"],
                [7, "Bâillements"],
                [8, "Bouffées de chaleur"],
                [9, "Troubles du sommeil"]
            ]

            form.multiCheck("J2k1_a", html`Lorsque vous preniez moins d'opiacés après une consommation importante ou prolongée, ressentiez-vous l'un des symptômes de sevrage ?`, symptomes, {
                help: "Ce critère est côté NON s'il s'agit de médicaments prescrits et consommés sous surveillance médicale."
            })

            symptomes_sevrage = (ptr.J2k1_a != null && ptr.J2k1_a.length >= 3)
        } else if (type === "stimulants") {
            let symptomes = [
                [1, "Fatigue"],
                [2, "Rêves intenses ou désagréables"],
                [3, "Difficultés à dormir ou trop dormir"],
                [4, "Augmentation de l'appétit"],
                [5, "Avoir la sensation ou être physiquement ou mentalement ralenti"]
            ]

            form.multiCheck("J2k1_a", html`Lorsque vous preniez moins de drogue après une consommation importante ou prolongée, ressentiez-vous l'un des symptômes de sevrage ?`, symptomes, {
                help: "Ce critère est côté NON s'il s'agit de médicaments prescrits et consommés sous surveillance médicale."
            })

            symptomes_sevrage = (ptr.J2k1_a != null && ptr.J2k1_a.length >= 2)
        } else if (type === "cannabinoides") {
            let symptomes = [
                [1, "Irritabilité, colère ou aggressivité"],
                [2, "Nervosité ou anxiété"],
                [3, "Troubles du sommeil"],
                [4, "Perte de poids ou appétit"],
                [5, "Agitation"],
                [6, "État dépressif"],
                [7, "Inconfort important causé par l'un des troubles suivants : maux de ventre, tremblements, transpiration, bouffées de chaleur, frissons, maux de tête"]
            ]

            form.multiCheck("J2k1_a", html`Lorsque vous preniez moins de cannabinoïdes après une consommation importante ou prolongée, ressentiez-vous l'un des symptômes de sevrage ?`, symptomes, {
                help: "Ce critère est côté NON s'il s'agit de médicaments prescrits et consommés sous surveillance médicale."
            })

            symptomes_sevrage = (ptr.J2k1_a != null && ptr.J2k1_a.length >= 3)
        }

        if (symptomes_sevrage != null)
            ptr.J2k1 = 0 + symptomes_sevrage
        form.binary("*J2k1", html`Lorsque vous preniez moins ${in_de(classe)} après une consommation importante ou prolongée, ressentiez-vous l'un des symptômes de sevrage ?`, {
            help: "Si oui au nombre minimum de symptômes pour une classe, côtez OUI à J2k2. Ce critère est côté NON s'il s'agit de médicaments prescrits et consommés sous surveillance médicale.",
            hidden: symptomes_sevrage != null,
            readonly: symptomes_sevrage != null
        })

        form.binary("*J2k2", html`Vous arrivait-il de consommer ${in_des(classe)} pour réduire ou éviter les symptômes de sevrage ?`)
    })
}

form.section("Évaluation", () => {
    let troubles = []
    let max = 0
    for (let type of (values.Jdrogues || [])) {
        let ptr = values["J" + type]
        let score = ptr.J2a + ptr.J2b + ptr.J2c + ptr.J2d + ptr.J2e + ptr.J2f + ptr.J2g +
                    ptr.J2h + ptr.J2i + ptr.J2j + Math.min(1, ptr.J2k1 + ptr.J2k2)

        if (score >= 2) {
            troubles.push(type)
            max = Math.max(max, score)
        }
    }

    let severite
    if (max >= 6) severite = "Sévère"
    else if (max >= 4) severite = "Modéré"
    else if (max >= 2) severite = "Léger"

    form.block(() => {
        form.calc("Jsynthese", "Troubles liés à une substance", form.isValid() ? 0 + !!troubles.length : undefined, {
            text: value => value ? "Oui" : "Non",
            disabled: false
        })
        form.calc("Jsynthese2", "Degré de sévérité du trouble", severite, {
            disabled: !form.isValid() || !values.Jsynthese
        })
    })
    if (!form.isValid() || !values.Jsynthese)
        form.pushOptions({disabled: true})
    values.Jsynthese3 = troubles.length ? troubles : undefined
    form.sameLine(true); form.multiCheck("Jsynthese3", "Substances incriminées",
                                         drogues.map(cat => [cat.type, cat.classe]), {
        readonly: true
    })

    for (let type of ordered) {
        form.section("", () => {
            form.pushOptions({path: ["J" + type, "remission"]})

            let classe = drogues.find(drogue => drogue.type === type).classe.toLowerCase()

            form.enumRadio("Iremission", `Rémission de la consommation ${in_de(classe)}`, [
                [0, "Pas de rémission"],
                [1, "En rémission précoce (critères non remplis depuis 3 à 12 mois)"],
            ], {
                help: [
                    "Une rémission durable (> 12 mois) implique que les critères ne sont pas remplis, et cette drogue ne devrait pas être cochée en début de module.",
                    "Dans les deux cas, précisez si la rémission est liée à un environnement contrôlé."
                ],
                disabled: false
            })
            if (values)
            form.sameLine(true); form.binary("Icontrolle", "Environnement contrôlé", {
                help: "Environnement où l'accès à la substance est impossible",
                disabled: values.Iremission == 0
            })
        })
    }

    let others = drogues.filter(d => !ordered.includes(d.type))

    if (others.length) {
        form.multiCheck("Idurables", "Parmi ces drogues pour lesquelles les critères ne sont pas remplis ces 12 derniers mois, lesquelles ont posé problèmé par le passe mais sont en rémission durable (critères non remplis depuis plus de 12 mois) ?", others.map(d => [d.type, d.classe]), {
            disabled: false
        })
    }
})
