let fail = false
function disable_if(cond) {
    if (cond) {
        form.pushOptions({disabled: true})
        fail = true
    }
}

form.section("Boulimie", () => {
    form.binary("*M1", html`Au cours des trois derniers mois, vous est-il arrivé d'avoir des crises de frénésie alimentaire ou de manger de très grandes quantités de nourriture en moins de 2 heures ?`)
    if (values.M1) form.section("", () => {
        form.binary("*M2", html`Durant ces crises de frénésie alimentafre, aviez-vous l'impression de ne pas pouvoir contrôler ce que vous manger ?`)
    })
    form.binary("*M3", html`Afin de compenser ou d'éviter une prise de poids, faisiez-vous certaines choses comme vous faire vomir, jeûner, faire de l'exercice, des lavements, prendre des taxatifs, des     diurétiques ou d'autres traitements ? Le faisiez-vous au une fois par semaine ?`, {
        help: "Ne côtez OUI que si la réponses aux DEUX QUESTIONS est OUI !"
    })
    disable_if(values.M3 == 0)
    if (values.M3) form.section("", () => {
        form.number("M3a_1", html`Nombre d'épisodes de comportements compensatoires inappropriés par semaine ?`, {
            min: 0,
            max: 20
        })
        form.number("M3a_2", html`Nombre de jours avec comportements compensatoires inappropriés par semaine ?`, {
            min: 0,
            max: 7
        })
    })
    form.binary("*M4", html`Au cours de ces 3 derniers mois, avez-vous eu de telles crises de frénésie alimentaire au moins une fors par semaine ?`)
    disable_if(values.M4 == 0)
    form.binary("*M5", html`L'opinion ou l'estime que vous avez de vous-même sont-elles fortement influencées par votre poids ou vos formes corporelles ?`)
    disable_if(values.M5 == 0)
    form.binary("*M6", html`Les symptômes du patient correspondent-ils à ceux d'une anorexie mentale ?`)
    if (values.M6) form.section("", () => {
        let treshold = 17 * ((values.L1a / 100.0) ** 2)
        form.binary("*M7", html`Ces crises de frénésie alimentaire surviennent-elles toujours lorsque votre poids est inférieur à ${!Number.isNaN(treshold) ? treshold.toFixed(1) : "?"} kg ?`, {
            help: "Le poids seuil est calculé à partir de la taille renseignée dans le section sur l'anorexie mentale, en se basant sur un IMC seuil à 17 kg/m²"
        })
    })
})

form.section("Évaluation", () => {
    let boulimie = values.M5 && (!values.M6 || !values.M7)
    let amtb = values.M6 && values.M7
    form.calc("Mconclusion1", "Boulimie actuelle", form.isValid() ? 0 + boulimie : null, {
        text: value => value ? "Oui" : "Non",
        disabled: false
    })
    form.sameLine(true); form.calc("Mconclusion2", "Anorexie mentale type boulimique", form.isValid() ? amtb : null, {
        text: value => value ? "Oui" : "Non",
        disabled: false,
        help: "Type boulimique/avec vomissements ou prise de purgatifs"
    })
})
