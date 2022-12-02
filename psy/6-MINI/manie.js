let fail = false
function disable_if(cond) {
    if (cond) {
        form.pushOptions({disabled: true})
        fail = true
    }
}

form.section("Épisodes (hypo)maniques", () => {
    form.binary("C0", html`Avez-vous <u>déjà</u> dans votre famille des antécédents de maladie maniaco-dépressive ou de trouble bipolaire ou un membre de votre famille ayant souffert de sautes d'humeur traitées avec un médicament comme le lithium, le divalproate de sodium (Depakote) ou la lamotrigine (Lamictal) ?`, {
        help: "Cette question n'est pas un critère pour le trouble bipolaire, mais est posée pour accroitre la vigilance du clinicien à propos du risque de trouble bipolaire."
    })
    if (values.C0) form.section("", () => {
        form.text("C0_1", html`Veuillez précisez qui :`)
    })
    form.binary("*C1a", html`Avez-vous déjà traversé une période où vous vous sentiez exalté(e) ou excité(e) ou hyperactif(ve), et tellement actif(ve) ou plein(e) d'énergie ou remonté(e) que cela vous a posé des problèmes ou que certaines personnes ont pensé que vous n'étiez pas dans votre état habituel ?`, {
        help: [
            html`Si le patient ne comprend pas le sens d'exalté ou excité ou hyperactif, expliquez : Par « exalté » ou « excité » ou « hyperactif », je veux dire être euphorique, avoir un regain d'énergie ou être plus actif, avoir besoin de moins de sommeil, ; penser vite, déborder d'idées, ressentir une augmentation de votre productivité, motivation ou créativité, ou être très impulsif ; téléphoner ou travailler excessivement ou dépenser plus d'argent que d'habitude.`,
            "Ne prenez pas en compte les périodes pendant lesquelles vous étiez sous l'effet de drogues ou d'alcool."
        ]
    })
    form.binary("*C1b", html`Vous sentez-vous, en ce moment, exalté(e), excité(e), hyperactif(ve) ou plein(e) d'énergie ?`, {
        value: values.C1a == 0 ? 0 : null
    })
    if (values.C1a === 0 && values.C1b === 1) {
        form.error("C1b", "Vous ne devez pas cocher OUI ici alors que la question précédente est à NON")
    }
    form.binary("*C2a", html`Avez-vous déjà été constamment irritable, pendant plusieurs jours, au point d'en arriver à des disputes, des bagarres verbales ou physiques, ou à crier sur des personnes extérieures à votre famille ? Aviez-vous vous-même remarqué, ou les autres avaient-ils remarqué, que vous étiez plus irritable ou que vous réagissiez plus vivement que les autres, même dans des situations où vous trouviez cela justifié ?`)
    form.binary("*C2b", html`Vous sentez-vous constamment irritable en ce moment ?`, {
        value: values.C2a == 0 ? 0 : null
    })
    if (values.C2a === 0 && values.C2b === 1) {
        form.error("C2b", "Vous ne devez pas cocher OUI ici alors que la question précédente est à NON")
    }

    disable_if(values.C1a == 0 && values.C2a == 0)
})
if (fail)
    form.pushOptions({disabled: true})

form.section("Exploration des épisodes", ( ) => {
    function question(key, label, options = {}, extra = () => {}) {
        if (values.C1b == 0 && values.C2b == 0) {
            let intf = form.binary(key + "_passe", html`Par le passé, ${label}`, options)
            extra("_passe", intf)
        } else {
            //form.section("", () => {
            let intf1 = form.binary(key + "_present", html`Au cours des 2 dernières semaines, ${label}`, options)
            extra("_present", intf1)
            let intf2 = form.binary(key + "_passe", html`Et par le passé ?`, options)
            extra("_passe", intf2)
            //})
        }
    }
    function questionRadio(key, label, props, options = {}, extra = () => {}) {
        if (values.C1b == 0 && values.C2b == 0) {
            let intf = form.enumRadio(key + "_passe", html`Par le passé, ${label}`, props, options)
            extra("_passe", intf)
        } else {
            //form.section("", () => {
            let intf1 = form.enumRadio(key + "_present", html`Au cours des 2 dernières semaines, ${label}`, props, options)
            extra("_present", intf1)
            let intf2 = form.enumRadio(key + "_passe", html`Et par le passé ?`, props, options)
            extra("_passe", intf2)
            //})
        }
    }

    /*if (values.C1b == 0 && values.C2b == 0) {
        form.output(html`
            <p>Explorez uniquement l'épisode passé, préfacez chaque question comme suit : <b>Dans le passé, au cours d'une période de quelques jours pendant laquelle vous vous sentiez le plus exalté(e) et plein(e) d'énergie ou le plus irritable</b> (...).
        `)
    
        form.tabs("periods", () => {
            period("passe", "Dans le passé")
        })
    } else {
        form.output(html`
            <p>Lorsque vous explorez l'épisode actuel, préfacez chaque question comme suit : <b>Au cours de ces derniers jours, y compris aujourd'hui, lorsque vous vous sentiez exalté(e) et plein(e) d'énergie ou irritable</b> (...).
            <p>Lorsque vous explorez l'épisode passé, préfacez chaque question comme suit : <b>Dans le passé, au cours d'une période de quelques jours pendant laquelle vous vous sentiez le plus exalté(e) et plein(e) d'énergie ou le plus irritable</b> (...).
        `)

        form.tabs("periods", () => {
            period("present", "Période actuelle")
            period("passe", "Dans le passé")
        })
    }*/

    question("*C3a", html`aviez-vous le sentiment que vous pourriez faire des choses que les autres sont incapables de faire ou que vous étiez quelqu'un de particulièrement important ?`, {
        help: "Si oui, demandez des exemples"
    }, (suffix, intf) => {
        if (intf.value) form.section("", () => {
            form.textArea("*C3e_det" + suffix, "Exemples donnés :")
            form.sameLine(true); form.binary("*C3e_1" + suffix, "Les exemples concordent-ils avec une idée délirante ?")
        })
    })
    question("*C3b", html`aviez-vous moins besoin de sommeil que d'habitude (par exemple, vous sentiez-vous reposé(e) après seulement quelques heures de sommeil) ?`)
    question("*C3c", html`parliez-vous trop et sans arrêt ou ressentiez-vous le besoin de continuer à parler ?`)
    question("*C3d", html`avez-vous remarqué que vos pensées allaient très vite ou défilaient ou se bousculaient ou passaient très rapidement d'un sujet à un autre ?`)
    question("*C3e", html`étiez-vous si facilement distrait(e) que la moindre interruption vous faisait perdre le fil de ce que vous faisiez ou pensiez ?`)
    question("*C3f", html`étiez-vous nettement plus actif(ve) ou motivé, au travail, à l'école, socialement ou sexuellement, ou vous sentiez-vous nerveux(se) ou incapable de tenir en place ?`, {
        help: "Cette hausse d'activité peut survenir avec ou sans raison."
    })
    question("*C3g", html`aviez-vous tellement envie de faire des choses agréables ou tentantes que vous en négligiez les risques ou les conséquences qu'elles pourraient entraîner ?`, {
        help: "Par exemple, faire des achats inconsidérés, conduire imprudemment, avoir une activité sexuelle excessive et irréfléchie"
    })
    questionRadio("*C4", html`quelle a été la durée maximale pendant laquelle ces symptômes ont persisté (la majeure partie de la journée, presque tous les jours) ?`, [
        [1, "3 jours ou moins"],
        [2, "4 à 6 jours"],
        [3, "7 jours ou plus"]
    ], {
        help: "Évaluez cette durée depuis le tout début jusqu'à la toute fin des symptômes, et pas uniquement à leur paroxysme."
    })
    question("*C5", html`avez-vous été hospitalisé(e) à cause de ces problèmes ?`)
    question("*C6", html`ces symptômes ont-ils entrainé des difficultés significatives à la maison, au travail, socialement, dans vos relations avec les autres ou d'une autre manière significative ?`, {})
    question("*C7", html`ces symptômes étaient-ils associés à un changement évident par rapport à votre mode de fonctionnement antérieur, et différent de votre personnalité habituelle ?`)
})

form.section("Évaluation", () => {
    // Episode maniaque
    {
        let present = (values.C1b == 0 && values.C2b == 0) ? 0 : episode_maniaque('present', values.C1b)
        let passe = episode_maniaque('passe', values.C1a)

        form.calc("Cconclusion1", "Épisode maniaque", form.isValid() ? (0 + (present || passe)) : null, {
            text: value => value ? "Oui" : "Non",
            disabled: false
        })

        values.Cquand1 = [];
        if (form.isValid() && present)
            values.Cquand1.push(1)
        if (form.isValid() && passe)
            values.Cquand1.push(2)
        form.sameLine(true); form.multiCheck("Cquand1", "Temporalité", [
            [1, "Actuel"],
            [2, "Passé"]
        ], {
            disabled: !values.Cconclusion1,
            readonly: true
        })
    }

    // Episode hypomaniaque
    {
        let present = (values.C1b == 0 && values.C2b == 0) ? 0 : episode_hypomaniaque('present', values.C1b)
        let passe = episode_hypomaniaque('passe', values.C1a)

        if (values.Cquand1 != null && values.Cquand1.includes(1))
            present = 0
        if (values.Cquand1 != null && values.Cquand1.includes(2))
            passe = 0

        form.calc("Cconclusion2", "Épisode hypomaniaque", form.isValid() ? (0 + (present || passe)) : null, {
            text: value => value ? "Oui" : "Non",
            disabled: false
        })

        let non_exp_passe = (values.Cquand1 != null && values.Cquand1.includes(2))

        values.Cquand2 = [];
        if (form.isValid() && present)
            values.Cquand2.push(1)
        if (form.isValid() && passe)
            values.Cquand2.push(2)
        form.sameLine(true); form.multiCheck("Cquand2", "Temporalité", [
            [1, "Actuel"],
            [2, non_exp_passe ? "Passé non exploré (épisode maniaque)" : "Passé"]
        ], {
            disabled: !values.Cconclusion2,
            readonly: true
        })
    }

    // Symptômes hypomaniaques
    {
        let present = (values.C1b == 0 && values.C2b == 0) ? 0 : symptomes_hypomaniaques('present', values.C1b)
        let passe = symptomes_hypomaniaques('passe', values.C1a)

        if (values.Cquand1 != null && values.Cquand1.includes(1))
            present = 0
        if (values.Cquand1 != null && values.Cquand1.includes(2))
            passe = 0
        if (values.Cquand2 != null && values.Cquand2.includes(1))
            present = 0
        if (values.Cquand2 != null && values.Cquand2.includes(2))
            passe = 0

        form.calc("Cconclusion3", "Symptômes hypomaniaques", form.isValid() ? (0 + (present || passe)) : null, {
            text: value => value ? "Oui" : "Non",
            disabled: false
        })

        let non_exp_passe = (values.Cquand1 != null && values.Cquand1.includes(2)) ||
                            (values.Cquand2 != null && values.Cquand2.includes(2))

        values.Cquand3 = [];
        if (form.isValid() && present)
            values.Cquand3.push(1)
        if (form.isValid() && passe)
            values.Cquand3.push(2)
        form.sameLine(true); form.multiCheck("Cquand3", "Temporalité", [
            [1, "Actuel"],
            [2, non_exp_passe ? "Passé non exploré (épisode maniaque ou hypomaniaque)" : "Passé"]
        ], {
            disabled: !values.Cconclusion3,
            readonly: true
        })
    }

    if (values.Cconclusion1 == 1 || values.Cconclusion2 == 1 || values.Cconclusion3 == 1) form.section("", () => {
        if (values.Cconclusion1 == 1) {
            form.binary("C8a", html`Avez-vous eu au moins 2 de ces épisodes maniaques d'au moins 7 jours, dans votre vie (en comptant l'éventuel épisode actuel) ?`)
        }
        if (values.Cconclusion2 == 1) {
            form.binary("C8b", html`Avez-vous eu au moins 2 de ces épisodes hypomaniaques d'au moins 4 jours dans votre vie (en comptant l'épisode actuel) ?`)
        }
        if (values.Cconclusion3 == 1) {
            form.binary("C8c", html`Avez-vous eu ces symptômes hypomaniaques durant seulement 1 à 3 jours, au moins deux fois dans votre vie (en comptant l'éventuel épisode actuel) ?`)
        } 
    })
})

function episode_maniaque(suffix, expansif) {
    // XXX: Caractéristiques K1 à K8
    let c3 = values["C3a_" + suffix] + values["C3b_" + suffix] + values["C3c_" + suffix] +
             values["C3d_" + suffix] + values["C3e_" + suffix] + values["C3f_" + suffix] +
             values["C3g_" + suffix]
    c3 = !Number.isNaN(c3) ? (0 + (expansif ? c3 >= 3 : c3 >= 4)) : NaN
    let c4c = values["C4_" + suffix] != null ? (values["C4_" + suffix] == 3) : NaN

    let score = c3 + values["C7_" + suffix] +
                Math.min(c4c + values["C5_" + suffix] + values["C6_" + suffix], 1)
    return (!Number.isNaN(c3) && !Number.isNaN(score)) ? (score == 3) : null
}

function episode_hypomaniaque(suffix, expansif) {
    // XXX: Caractéristiques K1 à K8
    let c3 = values["C3a_" + suffix] + values["C3b_" + suffix] + values["C3c_" + suffix] +
             values["C3d_" + suffix] + values["C3e_" + suffix] + values["C3f_" + suffix] +
             values["C3g_" + suffix]
    c3 = !Number.isNaN(c3) ? (0 + (expansif ? c3 >= 3 : c3 >= 4)) : NaN
    let c4bc = values["C4_" + suffix] != null ? (values["C4_" + suffix] == 2 || values["C4_" + suffix] == 3) : NaN

    let score = c3 + (1 - values["C5_" + suffix]) +
                (1 - values["C6_" + suffix]) + values["C7_" + suffix] + c4bc
    return !Number.isNaN(score) ? (score == 5) : null
}

function symptomes_hypomaniaques(suffix, expansif) {
    // XXX: Caractéristiques K1 à K8
    let c3 = values["C3a_" + suffix] + values["C3b_" + suffix] + values["C3c_" + suffix] +
             values["C3d_" + suffix] + values["C3e_" + suffix] + values["C3f_" + suffix] +
             values["C3g_" + suffix]
    c3 = !Number.isNaN(c3) ? (0 + (expansif ? c3 >= 3 : c3 >= 4)) : NaN
    let c4a = values["C4_" + suffix] != null ? (values["C4_" + suffix] == 1) : NaN

    let score = c3 + c4a + (1 - values["C5_" + suffix])
    return !Number.isNaN(score) ? (score == 3) : null
}

if (values.Cconclusion1 || values.Cconclusion2 || values.Cconclusion3)
form.section("Eliminer une cause organique", () => {
    let fail = false
    function disable_if(cond) {
        if (cond) {
            form.pushOptions({disabled: true})
            fail = true
        }
    }

    form.pushOptions({
        path: ["organique_" + nav.page.key]
    })
    
    form.output(html`
        Juste avant que ces symptômes ne débutent...
    `)

    form.enum("*O1a", html`Preniez-vous des drogues ou des médicaments ou étiez-vous en période de sevrage ?`, [
        [1, "Oui"],
        [0, "Non"],
        [-1, "Incertain"]
    ])
    form.enum("*O1b", html`Avez-vous une maladie physique quelle qu'elle soit ?`, [
        [1, "Oui"],
        [0, "Non"],
        [-1, "Incertain"]
    ])

    let ptr = values["organique_" + nav.page.key]
    disable_if(values.O1a == 0 && values.O1b == 0)

    // D'après vous, l'une ou l'autre peut-elle être 

    form.enum("*O2", html`D'après vous, l'une ou l'autre peut-elle être une cause directe du trouble du patient ?`, [
        [1, "Oui"],
        [0, "Non"],
        [-1, "Incertain"]
    ], {
        help: "Si nécessaire, posez des questions supplémentaires"
    })
    if (ptr.O2) form.section("", () => {
        form.textArea("*O2_plus", "Détaillez ce que vous pensez être la cause des symptômes :")
    })
    
    form.section("", () => {
        let evaluation
        switch (ptr.O2) {
            case 1: { evaluation = 0; } break;
            case 0: { evaluation = 1; } break;
            case -1: { evaluation = -1; } break;
        }
        form.calc("Pevaluation", "Une cause médicale, organique, ou toxique est écartée", evaluation, {
            text: value => {
                switch (value) {
                    case 1: return "Oui"
                    case 0: return "Non"
                    case -1: return "Incertain"
                }
            },
            disabled: false
        })
        form.textArea("Ocommentaire", "Avez-vous des commentaires ou des doutes sur une possible cause médicale, organique ou toxique ?", {
            disabled: false
        })
    })
})
