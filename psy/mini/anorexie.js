let fail = false
function disable_if(cond) {
    if (cond) {
        form.pushOptions({disabled: true})
        fail = true
    }
}

form.section("Mesures", () => {
    form.number("*L1a", html`Combien mesurez-vous ?`, {
        suffix: "cm",
        min: 80, max: 300
    })
    form.sameLine(true); form.number("*L1b", html`Quel a été votre poids le plus faible ?`, {
        suffix: "kg",
        min: 20, max: 400,
        decimals: 1,
        help: "Au cours des 3 derniers mois"
    })

    let imc = values.L1b / ((values.L1a / 100.0) ** 2)
    form.calc("Limc", "IMC calculé", imc, {
        suffix: "kg/m²"
    })
    form.sameLine(true); form.calc("L1c", "Normalité de l'IMC", imc >= 17 ? "IMC normal" : "IMC bas")
    disable_if(imc >= 17)
})
if (fail)
    form.pushOptions({disabled: true})

form.section("Au cours des 3 derniers mois", () => {
    form.binary("*L2", html`Malgré votre petit poids, avez-vous essayé de ne pas grossir ou de limiter votre apport
alimentaire ?`)
    disable_if(values.L2 == 0)
    form.binary("*L3", html`Aviez-vous très peur de prendre du poids ou de devenir trop gros(se) bien que votre
poids soit inférieur à la moyenne ?`)
    disable_if(values.L3 == 0)
    form.binary("*L4a", html`Vous trouviez-vous trop gros(se), ou pensiez-vous qu'une partie de votre corps était trop grosse ?`)
    form.binary("*L4b", html`L'opinion ou l'estime que vous aviez de vous même étaient-elles fortement influencées par votre poids ou vos formes corporelles ?`)
    form.binary("*L4c", html`Pensiez-vous que ce poids était normal, voire excessif ?`)

    let score = values.L4a + values.L4b + values.L4c
    disable_if(!Number.isNaN(score) && score < 1)
})
if (fail)
    form.pushOptions({disabled: true})

form.section("Évaluation", () => {
    form.calc("Lconclusion", "Anorexie mentale actuelle", form.isValid() ? 1 - fail : null, {
        text: value => value ? "Oui" : "Non",
        disabled: false
    })
})
