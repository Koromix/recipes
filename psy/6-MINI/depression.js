let fail = false
function disable_if(cond) {
    if (cond) {
        form.pushOptions({disabled: true})
        fail = true
    }
}

form.section("Épisode dépressif caractérisé", () => {
    form.binary("*A1a", html`Vous est-il <u>déjà</u> arrivé de vous sentir déprimé(e) ou abattu(e), ou triste, vide ou sans espoir presque tout la journée, presque tous les jours, pendant une période de deux semaines ?`)
    form.binary("*A1b", html`<u>Au cours des deux dernières semaines</u>, vous êtes vous senti(e) déprimé(e) ou abattu(e), ou triste, vide ou sans espoir, presque toute la journée, presque tous les jours ?`, {
        value: values.A1a === 0 ? 0 : null
    })
    if (values.A1a === 0 && values.A1b === 1) {
        form.error("A1b", "Vous ne devez pas cocher OUI ici alors que la question précédente est à NON")
    }
    form.binary("*A2a", html`Vous êtes-vous <u>déjà</u> senti(e), pendant une période de deux semaines, nettement moins intéressé(e) par la plupart des choses ou nettement moins capable d'apprécier les choses que vous appréciez habituellement ?`)
    form.binary("*A2b", html`Au cours des <u>deux dernières semaines</u>, étiez-vous nettement moins intéressé(e) par la plupart des choses ou nettement moins capable d'apprécier les choses que vous appréciez habituellement ?`, {
        value: values.A2a === 0 ? 0 : null
    })
    if (values.A2a === 0 && values.A2b === 1) {
        form.error("A2b", "Vous ne devez pas cocher OUI ici alors que la question précédente est à NON")
    }
    disable_if(values.A1a == 0 && values.A2a == 0)
})
if (fail)
    form.pushOptions({disabled: true})

form.section("Épisodes et symptômes", () => {
    function question(key, label, options = {}, extra = () => {}) {
        if (values.A1b == 0 && values.A2b == 0) {
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
    
    question("*A3a", html`aviez-vous soit plus d'appétit, soit moins d'appétit que d'habitude, et ce presque tous les jours ? Avez-vous pris ou perdu du poids sans en avoir l'intention (variation au cours du mois de ±5 %, c.-à-d. <u>± 3,5 kg</u> pour une personne de <u>70 kg</u>) ?`, {
        help: "Côtez OUI si OUI à l'une ou l'autre"
    })
    question("*A3b" , html`aviez-vous des problèmes de sommeil presque toutes les nuits (difficulté à s'endormir, réveils au milieu de la nuit ou plus tôt que prévu, ou dormir trop) ?`)
    question("*A3c" , html`parliez-vous ou vous déplaciez-vous plus lentement que d'habitude ou, au contraire, vous sentiez-vous agité(e) et aviez-vous du mal à rester en place, presque tous les jours ? Quelqu'un l'a-t-il remarqué ?`)
    question("*A3d" , html`vous sentiez-vous fatigué(e) ou sans énergie, et ce presque tous les jours ?`)
    question("*A3e" , html`vous sentiez-vous bon(ne) à rien ou coupable, et ce presque tous les jours ?`, {
        help: "Si oui, demandez des exemples. Recherchez les pensées délirantes d'échec, d'inadéquation, de ruine ou de culpabilité, ou de besoin de punitition, ou les pensées délirantes de maladie ou de mort ou les pensées délirantes somatiques ou nihilistes."
    }, (suffix, intf) => {
        if (intf.value) form.section("", () => {
            form.textArea("*A3e_det" + suffix, "Exemples donnés :")
            form.sameLine(true); form.binary("*A3e_1" + suffix, "Les exemples concordent-ils avec une idée délirante ?")
        })
    })
    question("*A3f" , html`aviez-vous du mal à vous concentrer, à réfléchir ou à prendre des décisions, et ce presque tous les jours ?`)
    question("*A3g" , html`avez-vous pensé à plusieurs reprises à la mort (la peur de mourir ne compte pas dans ce cas), ou l'idée de vous suicider vous a-t-elle traversé l'esprit, ou aviez-vous l'intention ou le projet de vous suicider ? Avez-vous tenté de vous suicider ?`, {
        help: "Côtez OUI si OUI à l'une ou l'autre"
    })
    question("*A4" , html`ces symptômes ont-ils entraîné des difficultés ou des problèmes significatifs à la maison, au travail, à l'école, socialement, dans vos relations avec les autres ou d'une autre manière significative, et représentent-ils un changement par rapport à votre mode de fonctionnement antérieur ?`)

    form.binary("*A5", html`Entre 2 épisodes de dépression, avez-vous déjà eu un intervalle d'au moins deux mois sans aucune dépression significative ni perte d'intérêt significative ?`)
})

form.section("Évaluation", () => {
    let score_present = values.A1b + values.A2b + values.A3a_present + values.A3b_present +
                        values.A3c_present +  values.A3d_present + values.A3e_present +
                        values.A3f_present + values.A3g_present
    let present = (!Number.isNaN(score_present) && values.A4_present != null) ? 0 + (score_present >= 5 && values.A4_present) : null

    let score_passe = values.A1a + values.A2a + values.A3a_passe + values.A3b_passe +
                      values.A3c_passe +  values.A3d_passe + values.A3e_passe +
                      values.A3f_passe + values.A3g_passe
    let passe = (!Number.isNaN(score_passe) && values.A4_passe != null) ? 0 + (score_passe >= 5 && values.A4_passe) : null

    form.calc("Aconclusion", "Episode dépressif caractérisé", form.isValid() ? (0 + (passe || present)) : null, {
        text: value => value ? "Oui" : "Non",
        disabled: false
    })
    form.pushOptions({disabled: !values.Aconclusion})

    values.Aquand = []
    if (form.isValid() && present)
        values.Aquand.push(1)
    if (form.isValid() && passe)
        values.Aquand.push(2)
    if (form.isValid() && values.A5)
        values.Aquand.push(3)
    form.sameLine(true); form.multiCheck("Aquand", "Temporalité", [
        [1, "Actuel"],
        [2, "Passé"],
        [3, "Récurrent"]
    ], {
        readonly: true
    })

    form.number("Aduree", html`Durée de l'épisode actuelle`, {
        min: 0,
        suffix: "mois",
        disabled: !values.Aquand.includes(1)
    })
    form.sameLine(true); form.calc("Aprolonge", "Durée actuelle ≥ 2 ans",
                                   values.Aduree != null ? 0 + (values.Aduree >= 24) : null, {
        text: value => value ? "Oui" : "Non",
        disabled: !values.Aquand.includes(1)
    })
    form.number("A6", html`Combien d'épisodes de dépression avez-vous eus dans votre vie ?`, {
        min: 0, max: 30,
        help: "Les épisodes doivent être entrecoupés de périodes d'au moins 2 mois sans dépression significative."
    })
})

if (values.Aconclusion)
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
