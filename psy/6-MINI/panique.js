let fail = false
function disable_if(cond) {
    if (cond) {
        form.pushOptions({disabled: true})
        fail = true
    }
}

form.section("Trouble panique", () => {
    form.binary("*D1a", html`Avez-vous, à plus d'une occasion, eu des périodes ou des crises durant lesquelles vous vous êtes senti(e) subitement très anxieux(se), très effrayé(e), mal à l'aise ou inquièt(e), même dans des situations où ta plupart des gens ne le seraient pas ?`)
    disable_if(values.D1a == 0)

    form.binary("*D1b", html`Ces crises atteignaient-elles leur intensité maximale en moins de 10 minutes ?`)
    disable_if(values.D1b == 0)

    form.binary("*D2", html`Certaines de ces périodes ou crises, même il y a longtemps, ont-elles été imprévisibles, ou
    sont-elles survenues sans que rien ne les provoque ?`)
    disable_if(values.D2 == 0)

    form.binary("*D3", html`À la suite de l'une de ces crises, avez-vous déjà eu une période d'au moins un mois durant laquelle vous aviez constamment peur d'avoir une autre crise, ou étiez préoccupé(e) par ses conséquences éventuelles, ou avez-vous profondément changé votre comportement du fait de ces crises ?`, {
        help: "Par exemple en évitant les situations inconnues, de quitter votre domicile ou de faire vos courses seul(e), en évitant tout ce qui pourrait provoquer une de ces crises, en consultant plus fréquemment votre médecin ou le service d'urgence."
    })
})
if (fail)
    form.pushOptions({disabled: true})

form.section("Au cours de la crise où vous êtes senti(e) le plus mal", () => {
    form.binary("*D4a", html`Aviez-vous des palpitations ou votre cœur battait-il très fort ou de façon irrégulière ?`)
    form.binary("*D4b", html`Transpiriez-vous ou aviez-vous les mains moites ?`)
    form.binary("*D4c", html`Aviez-vous des tremblements ?`)
    form.binary("*D4d", html`Aviez-vous le souffle court, du mal à respirer ou l'impression d'étouffer ?`)
    form.binary("*D4e", html`Aviez-vous l'impression de suffoquer ou d'avoir une boule dans la gorge ?`)
    form.binary("*D4f", html`Ressentiez-vous une douleur, une pression ou une gêne au niveau de la poitrine ?`)
    form.binary("*D4g", html`Aviez-vous la nausée, des maux de ventre ou une diarrhée soudaine ?`)
    form.binary("*D4h", html`Vous sentiez-vous étourdi(e), pris(e) de vertiges, la tête vide ou sur le point de vous évanouir ?`)
    form.binary("*D4i", html`Aviez-vous des bouffées de chaleur ou des frissons ?`)
    form.binary("*D4j", html`Aviez-vous des engourdissements ou des picotements ?`)
    form.binary("*D4k", html`Aviez-vous l'impression que les choses qui vous entouraient étaient étranges ou irréelles ou vous sentiez-vous comme détaché(e) de tout ou d'une partie de votre corps ou hors de votre corps ?`)
    form.binary("*D4l", html`Aviez-vous peur de perdre le contrôle ou de devenir fou (folle) ?`)
    form.binary("*D4m", html`Aviez-vous peur de mourir ?`)
})
if (fail)
    form.pushOptions({disabled: true})

form.section("Crises", () => {
    let d5
    if (fail) {
        d5 = 0
    } else {
        let d4 = values.D4a + values.D4b + values.D4c + values.D4d + values.D4e +
                 values.D4f + values.D4g + values.D4h + values.D4i + values.D4j +
                 values.D4k + values.D4l + values.D4m
        d4 = !Number.isNaN(d4) ? 0 + (d4 >= 4) : undefined
        d5 = (values.D3 != null && d4 != null) ? (0 + (values.D3 && d4)) : null
    }

    form.calc("D5", "D3 et au moins 4 des réponses de D4 sont-elles codées OUI ?", d5, {
        text: value => value ? "Oui" : "Non",
        hidden: true
    })
    disable_if(values.D5 == 0)

    form.binary("D6", html`Au cours du mois écoulé, avez-vous eu constamment peur de faire une autre crise, ou vous êtes-vous inquiété(e) des conséquences de ces crises, ou avez-vous changé votre comportement d'une manière ou d'une autre du fait de ces crises ?`)
})
if (fail)
    form.pushOptions({disabled: true})

form.section("Évaluation", () => {
    form.calc("Dconclusion", "Trouble panique", form.isValid() ? (0 + (values.D5 == 1 || values.D6 == 1)) : null, {
        text: value => value ? "Oui" : "Non",
        disabled: false
    })

    values.Dquand = []
    if (values.D5)
        values.Dquand.push(1)
    if (values.D5 && values.D6)
        values.Dquand.push(2)
    form.sameLine(true); form.multiCheck("Dquand", "Temporalité", [
        [1, "Vie entière"],
        [2, "Actuel"]
    ], {
        disabled: values.Dquand.length == 0,
        readonly: true
    })
})

if (values.Dconclusion)
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
