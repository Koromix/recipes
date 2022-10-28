form.pushOptions({ mandatory: true })

form.section("HAD", () => {
    form.output(html`Dans la série de questions ci-dessous, cochez la réponse qui exprime le mieux ce que vous avez éprouvé <b>au cours de la semaine</b> qui vient de s’écouler.`)

    form.enumRadio("q1", "Je me sens tendu(e) ou énervé(e)", [
        [3, "La plupart du temps"],
        [2, "Souvent"],
        [1, "De temps en temps"],
        [0, "Jamais"],
    ])

    form.enumRadio("q2", "Je prends plaisir aux mêmes choses qu’autrefois", [
        [3, "Oui, tout autant"],
        [2, "Pas autant"],
        [1, "Un peu seulement"],
        [0, "Presque plus"],
    ])

    form.enumRadio("q3", "J’ai une sensation de peur comme si quelque chose d’horrible allait m’arriver", [
        [3, "Oui, très nettement"],
        [2, "Oui, mais ce n’est pas trop grave"],
        [1, "Un peu, mais cela ne m’inquiète pas"],
        [0, "Pas du tout"],
    ])

    form.enumRadio("q4", "Je ris facilement et vois le bon côté des choses", [
        [3, "Autant que par le passé"],
        [2, "Plus autant qu’avant"],
        [1, "Vraiment moins qu’avant"], 
        [0, "Plus du tout"],
    ])

    form.enumRadio("q5", "Je me fais du souci", [
        [3, "Très souvent"],
        [2, "Assez souvent"],
        [1, "Occasionnellement"],
        [0, "Très occasionnellement"],
    ])

    form.enumRadio("q6", "Je suis de bonne humeur", [
        [3, "Jamais"],
        [2, "Rarement"],
        [1, "Assez souvent"],
        [0, "La plupart du temps"],
    ])

    form.enumRadio("q7", "Je peux rester tranquillement assis(e) à ne rien faire et me sentir décontracté(e)", [
        [3, "Oui, quoi qu’il arrive"],
        [2, "Oui, en général"],
        [1, "Rarement"],
        [0, "Jamais"],
    ])

    form.enumRadio("q8", "J’ai l’impression de fonctionner au ralenti", [
        [3, "Presque toujours"],
        [2, "Très souvent"],
        [1, "Parfois"],
        [0, "Jamais"],
    ])

    form.enumRadio("q9", "J’éprouve des sensations de peur et j’ai l’estomac noué", [
        [3, "Jamais"],
        [2, "Parfois"],
        [1, "Assez souvent"],
        [0, "Très souvent"]
    ])
    
    form.enumRadio("q10", "Je ne m’intéresse plus à mon apparence", [
        [3, "Plus du tout"],
        [2, "Je n’y accorde pas autant d’attention que je devrais"],
        [1, "Il se peut que je n’y fasse plus autant attention"],
        [0, "J’y prête autant d’attention que par le passé"],
    ])

    form.enumRadio("q11", "J’ai la bougeotte et n’arrive pas à tenir en place", [
        [3, "Oui, c’est tout à fait le cas"],
        [2, "Un peu"],
        [1, "Pas tellement"],
        [0, "Pas du tout"],
    ])

    form.enumRadio("q12", "Je me réjouis d’avance à l’idée de faire certaines choses", [
        [3, "Autant qu’avant"],
        [2, "Un peu moins qu’avant"],
        [1, "Bien moins qu’avant"],
        [0, "Presque jamais"],
    ])

    form.enumRadio("q13", "J’éprouve des sensations soudaines de panique", [
        [3, "Vraiment très souvent"],
        [2, "Assez souvent"],
        [1, "Pas très souvent"],
        [0, "Jamais"],
    ])

    form.enumRadio("q14", "Je peux prendre plaisir à un bon livre ou à une bonne émission de radio ou de télévision", [
        [3, "Souvent"],
        [2, "Parfois"],
        [1, "Rarement"],
        [0, "Très rarement"]
    ])
})

form.section("Idées suicidaires", () => {
    form.binary("q15", "Au cours du mois écoulé, avez-vous eu des idées suicidaires ?")
})

form.section("Évaluation", () => {
    let a = values.q1 + values.q3 + values.q5 + values.q7 + values.q9 + values.q11 + values.q13
    let d = values.q2 + values.q4 + values.q6 + values.q8 + values.q10 + values.q12 + values.q14

    form.calc("anxiete", "Anxiété", a, {
        suffix: "/ 21",
        help: classify(a)
    })
    form.sameLine(true); form.calc("depression", "Dépression", d, {
        suffix: "/ 21",
        help: classify(d)
    })

    function classify(a) {
        if (a >= 11) {
            return "Symptomatologie certaine"
        } else if (a >= 8) {
            return "Symptomatologie douteuse"
        } else if (a < 8) {
            return "Absence de symptomatologie"
        } else {
            return null
        }
    }
}, { hidden: goupile.isLocked() })

if (profile.userid < 0) {
    let enable_save = !form.hasErrors()

    form.action('+Continuer', { disabled: !enable_save }, async e => {
        form.triggerErrors()
        await nav.save()
        return nav.go(ENV.urls.instance + 'main/addictions')
    })

    if (meta.saved) {
        form.action('Enregistrer', { disabled: !form.hasChanged() || !enable_save },  () => {
            form.triggerErrors()
            nav.save()
        })
    }
}
