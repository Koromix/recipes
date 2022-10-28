form.pushOptions({ mandatory: true })

form.section("Questionnaire FACE", () => {
    form.enumRadio("q16", "À quelle fréquence consommez-vous des boissons contenant de l’alcool ?", [
        [0, "Jamais"],
        [1, "Une fois par mois au mois"],
        [2, "Deux à quatre fois par mois"],
        [3, "Deux à quatre fois par semaine"],
        [4, "Quatre fois par semaine ou plus"]
    ])

    form.enumRadio("q17", "Combien de verres standards buvez-vous les jours où vous buvez de l’alcool ?", [
        [0, "1 ou 2"],
        [1, "3 ou 4"],
        [2, "5 ou 6"],
        [3, "7 à 9"],
        [4, "10 ou plus"]
    ])

    form.enum("q18", "Votre entourage vous a-t-il fait des remarques concernant votre consommation d’alcool ?", [
        [4, "Oui"],
        [0, "Non"]
    ])
    form.enum("q19", "Vous est-il déjà arrivé de consommer de l’alcool le matin pour vous sentir en forme ?", [
        [4, "Oui"],
        [0, "Non"]
    ])
    form.enum("q20", "Vous est-il arrivé de boire et de ne plus vous souvenir le matin de ce que vous avez pu dire ou faire ?", [
        [4, "Oui"],
        [0, "Non"]
    ])
})

form.section("Short Tabac test d’après Fagerstrom", () => {
    form.enumRadio("q21", "Combien de cigarette fumez-vous par jour ?", [
        [0, "10 ou mois"],
        [1, "11 à 20"],
        [2, "21 à 30"],
        [3, "31 ou plus"]
    ])
    form.binary("q22", "Dans quel délai après le réveil fumez-vous votre première cigarette ?", [
        [0, "Moins de 5 minutes"],
        [1, "6 à 30 minutes"],
        [2, "31 à 60 minutes"],
        [3, "Après plus d’une heure"]
    ])
})

form.section("Questionnaire CAST (cannabis Abus Screening Test)", () => {
    form.output(html`Au cours de votre vie :`)

    form.binary("q23", "Avez-vous déjà fumé du cannabis avant midi ?")
    form.binary("q24", "Avez-vous déjà fumé du cannabis lorsque vous étiez seul(e) ?")
    form.binary("q25", "Avez-vous déjà eu des problèmes de mémoire quand vous fumez du cannabis ?")
    form.binary("q26", "Des amis ou des membres de votre famille vous ont-ils déjà dit que vous devriez réduire votre consommation de cannabis ?")
    form.binary("q27", "Avez-vous déjà essayé de réduire ou d’arrêter votre consommation de cannabis sans y parvenir ?")
    form.binary("q28", "Avez-vous déjà eu des problèmes à cause de votre consommation de cannabis (dispute, bagarre, accident, mauvais résultat à l’école, etc.) ?")
})

form.section("Autres drogues", () => {
    form.binary("q29", "Au cours de l’année écoulée, avez-vous consommé une ou des drogues illicites autres que le cannabis ?")
})

form.section("Évaluation", () => {
    let face = values.q16 + values.q17 + values.q18 + values.q19 + values.q20
    let fager = values.q21 + values.q22
    let cast = values.q23 + values.q24 + values.q25 + values.q26 + values.q27 + values.q28

    form.calc("face", "FACE", face, {
        suffix: "/ 20",
        help: doFACE(face)
    })
    form.sameLine(true); form.calc("fager", "Fagerström", fager, {
        suffix: "/ 6",
        help: doFager(fager)
    })
    form.sameLine(true); form.calc("cast", "CAST", cast, {
        suffix: "/ 6",
        help: doCAST(cast)
    })

    function doFACE(a) {
        if (a >= 9) {
            return "Dépendance"
        } else if (a >= 4) { // XXX: 4 (femmes) ou 5 (hommes)
            return "Mésusage"
        } else if (a < 4) {
            return "Absence de symptomatologie"
        } else {
            return null
        }
    }

    function doFager(a) {
        if (a >= 4) {
            return "Dépendance forte"
        } else if (a >= 2) {
            return "Dépendance modérée"
        } else if (a < 2) {
            return "Absence de symptomatologie"
        } else {
            return null
        }
    }

    function doCAST(a) {
        if (a >= 3) {
            return "Dépendance"
        } else if (a >= 2) {
            return "Mésusage"
        } else if (a < 2) {
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
        return nav.go(ENV.urls.instance + 'main/fpq16')
    })

    if (meta.saved) {
        form.action('Enregistrer', { disabled: !form.hasChanged() || !enable_save },  () => {
            form.triggerErrors()
            nav.save()
        })
    }
}
