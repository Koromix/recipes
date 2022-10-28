let fail = false
function disable_if(cond) {
    if (cond) {
        form.pushOptions({disabled: true})
        fail = true
    }
}

form.section("Trouble de stress post-traumatique", () => {
    form.binary("*H1", html`Avez-vous déjà vécu, ou été le témoin de, ou eu à faire face à un évènement extrêmement traumatisant, au cours duquel des personnes ou vous-même sont mortes, ou ont été menacées de mort, ou gravement blessées ou victimes de violences sexuelles ?`, {
        help: "Exemples de contextes traumatiques : accident grave, agression, viol, attentat, prise d'otages, kidnapping, incendie, découverte de cadavre, guerre ou catastrophe naturelle, être témoin de la mort violente ou soudaine d'un proche, maladie compromettant le diagnostic vital..."
    })
    disable_if(values.H1 == 0)
    form.binary("*H2", html`À l'issue de cet évènement traumatisant, avez-vous souvent revécu cet évènement de manière involontaire et douloureuse (par exemple par le biais de rêves récurrents en lien avec l'évènement, de souvenirs insensés ou de flashbacks, comme si l'évènement se répétait), ou avez-vous eu des réactions physiques ou psychologiques intenses lorsque quelque chose ou quelqu'un vous rappelait l'évènement, ou que vous étiez exposé(e) à un évènement similaire ?`)
    disable_if(values.H2 == 0)
})
if (fail)
    form.pushOptions({disabled: true})

form.section("Au cours du mois écoulé...", () => {
    form.binary("*H3a", html`Essayiez-vous constamment d'éviter de penser à / d'éviter de vous souvenir de certains détails ou sensations douloureux liés à l'évènement ?`)
    form.binary("*H3b", html`Cherchiez-vous constamment à éviter les personnes, les conversations, lieux, les situations, les activités ou les objets qui vous évoquaient des souvenirs douloureux de l'événement ?`)
    disable_if(values.H3a == 0 && values.H3b == 0)
})
if (fail)
    form.pushOptions({disabled: true})

form.section("Au cours du mois écoulé...", () => {
    form.binary("*H4a", html`Aviez-vous du mal à vous souvenir de certains épisodes importants du traumatisme ?`, {
        help: "Mais pas à cause de / en lien avec un traumatisme crânien, une consommation d'alcool ou de drogue."
    })
    form.binary("*H4b", html`Étiez-vous constamment déraisonnablement négatif(ve) à propos de vous-même ou des autres, ou de monde qui vous entoure ?`)
    form.binary("*H4c", html`Vous accusiez-vous constamment ou accusiez-vous les autres de ce traumatisme de façon déraisonnable ?`)
    form.binary("*H4d", html`Éprouviez-vous toujours des sentiments négatifs (tels que la peur, l'horreur, la colère, la culpabilité ou la honte) ?`)
    form.binary("*H4e", html`Aviez-vous perdu beaucoup de votre intérêt pour les activités qui avaient de l'importance pour vous auparavant ?`)
    form.binary("*H4f", html`Vous sentiez-vous déconnecté(e) des autres ou étranger(ère) aux autres ?`)
    form.binary("*H4g", html`Étiez-vous incapable d'éprouver des sentiments positifs (tels que des sentiments de joie, de la satisfaction ou de l'amour) ?`)
    let score = values.H4a + values.H4b + values.H4c + values.H4d + values.H4e + values.H4f + values.H4g
    disable_if(!Number.isNaN(score) && score < 2)
})
if (fail)
    form.pushOptions({disabled: true})

form.section("Au cours du mois écoulé...", () => {
    form.binary("*H5a", html`Étiez-vous particulièrement irritable ou avez-vous eu des accès de colère sans raison particulière ou pour pas grand chose ?`)
    form.binary("*H5b", html`Étiez-vous plus imprudent(e) ou aviez-vous davantage de comportements auto- destructeurs ?`)
    form.binary("*H5c", html`Étiez-vous plus nerveux(se) ou constamment sur vos gardes ?`)
    form.binary("*H5d", html`Un rien vous faisait-il sursauter ?`)
    form.binary("*H5e", html`Aviez-vous plus de mal à vous concentrer ?`)
    form.binary("*H5f", html`Aviez-vous plus de problèmes de sommeil ?`)
    let score = values.H5a + values.H5b + values.H5c + values.H5d + values.H5e + values.H5f
    disable_if(!Number.isNaN(score) && score < 2)
})
if (fail)
    form.pushOptions({disabled: true})

form.section("Temporalité", () => {
    form.binary("*H6", html`Tous ces problèmes ont-ils commencé après l'évènement traumatisant, et ont-ils duré plus d'un mois ?`)
    disable_if(values.H6 == 0)
    form.binary("*H7", html`Au cours du mois écoulé, ces problèmes ont-ils entrainé une détresse significative ou interféré dans votre capacité à fonctionner chez vous, au travail, l'école, socialement ou dans vos relations avec les autres, ou d'une autre manière significative ?`)
    disable_if(values.H7 == 0)
})
if (fail)
    form.pushOptions({disabled: true})

form.section("Évaluation", () => {
    form.calc("Hconclusion", "Trouble de stress post-traumatique actuel", form.isValid() ? 1 - fail : null, {
        text: value => value ? "Oui" : "Non",
        disabled: false
    })
    form.pushOptions({disabled: !values.Hconclusion})
    form.sameLine(true); form.multiCheck("Hpublic", "Manifestations associées", [
        [1, "Dépersonnalisation"],
        [2, "Déréalisation"],
        [3, "Expression retardée"]
    ], {
        help: "Précisez si l'état est associé à une dépersonnalisation, une déréalisation ou une expression retardée."
    })
})

if (values.Hconclusion)
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
