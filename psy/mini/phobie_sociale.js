let fail = false
function disable_if(cond) {
    if (cond) {
        form.pushOptions({disabled: true})
        fail = true
    }
}

form.section("Phobie sociale", () => {
    form.binary("*F1", html`Au cours du mois écoulé, avez-vous constamment peur ou ressenti une forte anxiété lorsque vous étiez observé(e) ou le centre de l'attention, ou encore d'être humilié(e), gêné(e) ou rejeté(é), comme par exemple lorsque vous deviez prendre la parole en public, manger en public ou avec d'autres personnes, écrire lorsqu'on vous regardait, accomplir une tâche face aux autres ou lorsque vous vous trouviez dans certaines situations sociales ?`, {
        help: html`
            Exemples de situations sociales typiques :
            <ul>
                <li>Démarrer ou soutenir une conversation
                <li>Participer à des petits groupes
                <li>Aller à un rendez-vous galant
                <li>Parler à des personnes investies d'une autorité
                <li>Participer à des soirées
                <li>Parler en public
                <li>Manger devant d'autres personnes
                <li>Devoir accomplir une tâche devant les autres
                <li>Uriner dans des toilettes publiques etc.
            </ul>
        `
    })
    disable_if(values.F1 == 0)
    form.binary("*F2", html`Ces situations sociales engendrent-elles presque toujours de la peur ou de l'anxiété ?`)
    disable_if(values.F2 == 0)
    form.binary("*F3", html`Redoutez-vous tellement ces situations que vous les évitez ou bien en souffrez-vous ou avez-vous besoin d'être accompagné(e) pour les affronter ?`)
    disable_if(values.F3 == 0)
    form.binary("*F4", html`Cette peur ou anxiété sociale est-elle excessive ou déraisonnable dans ces situations ?`)
    disable_if(values.F4 == 0)
    form.binary("*F5", html`Cet évitement social, cette peur ou cette anxiété sociales ont-ils persisté pendant au moins 6 mois ?`)
    disable_if(values.F5 == 0)
    form.binary("*F6", html`Ces peurs sociales ont-elles entrainé une détresse significative ou interféré dans votre capacité à fonctionner au travail, à l'école, socialement ou dans vos relations avec les autres ou d'une autre manière significative ?`)
    disable_if(values.F6 == 0)
})
if (fail)
    form.pushOptions({disabled: true})

form.section("Évaluation", () => {
    form.calc("Fconclusion", "Trouble de l'anxiété sociale actuel", form.isValid() ? 1 - fail : null, {
        text: value => value ? "Oui" : "Non",
        disabled: false
    })
    form.pushOptions({disabled: !values.Fconclusion})
    form.sameLine(true); form.binary("Fpublic", "Limité à la performance en public", {
        help: "Merci de spécifier si les peurs du patient se limitent au fait de devoir prendre la parole ou accomplir une tâche en public"
    })
})

if (values.Fconclusion)
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
