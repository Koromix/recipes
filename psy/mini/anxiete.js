let fail = false
function disable_if(cond) {
    if (cond) {
        form.pushOptions({disabled: true})
        fail = true
    }
}

form.section("Anxiété", () => {
    form.binary("*N1a", html`Au cours des six derniers mois, vous êtes-vous senti(e) excessivement préoccupé(e), inquiet(e), anxieux(se) ou angoissé(e) pour des problèmes de la vie de tous les jours ?`, {
        help: "Si le patient ne voit pas bien ce que vous voulez dire, approfondissez en demandant : Est-ce que les autres pensent que vous vous inquiétez pour des « broutilles » ou que vous êtes « un(e) inquiet(e) » ? (et obtenez des exemples)."
    })
    disable_if(values.N1a == 0)
    form.sameLine(true); form.textArea("N1a_1", "Exemples donnés par le patient :")
    form.binary("*N1b", html`Ces angoisses et inquiétudes sont-elles présentes presque tous les jours ?`)
    disable_if(values.N1b == 0)
    form.binary("*N1c", html`Est-ce que l'anxiété et les inquiétudes du patient sont uniquement limitées à, ou mieux expliquées par l'un des troubles explorés jusqu'ici ?`)
    if (values.N1c) form.section("", () => {
        form.textArea("*N1c_1", "Précisez quel(s) trouble(s) :", {rows: 2})
    })
    disable_if(values.N1c == 1)
    form.binary("*N2", html`Vous est-il difficile de contrôler ces préoccupations ?`)
    disable_if(values.N2 == 0)
})
if (fail)
    form.pushOptions({disabled: true})

form.section("Symptômes physiques", () => {
    form.section("", () => {
        form.output(html`
            <p>Pour ce qui suit, côtez NON si les symptômes se limitent aux caractéristiques de l'un des troubles explorés jusque ici.
            <p>Pour poser ces questions, commencez par : <b>Au cours des 6 derniers mois, lorsque vous vous sentiez anxieux(se) ou angoissé(e), vous arrivait-il souvent</b> (...)
        `)
    })
    form.binary("*N3a", html`De vous sentir agité(e), tendu(e), les nerfs à fleur de peau ?`)
    form.binary("*N3b", html`D'avoir des tensions musculaires`)
    form.binary("*N3c", html`De vou sentir fatigué(e), faible ou facilement épuisé(e) ?`)
    form.binary("*N3d", html`D'avoir des difficultés à vous concentrer ou d'avoir des absences ?`)
    form.binary("*N3e", html`D'être irritable ?`)
    form.binary("*N3f", html`D'avoir des problèmes de sommeil (difficulté à s'endormir, réveils au milieu de la nuit ou plus tôt que prévu, ou dormir trop) ?`)
    
    let score = values.N3a + values.N3b + values.N3c + values.N3d + values.N3e + values.N3f
    disable_if(!Number.isNaN(score) && score < 3)
})
if (fail)
    form.pushOptions({disabled: true})

form.section("Détresse", () => {
    form.binary("*N4", html`Ces angoisses et ces inquiétudes entraînent-elles chez vous une détresse significative ou interférent-elles avec votre capacité à travailler, à fonctionner socialement ou dans vos relations avec les autres ou dans d'autres domaines importants de votre vie ?`)
    disable_if(values.N4 == 0)
})
if (fail)
    form.pushOptions({disabled: true})

form.section("Évaluation", () => {
    form.calc("Nconclusion", "Trouble d'anxiété généralisée actuel", form.isValid() ? 1 - fail : null, {
        text: value => value ? "Oui" : "Non",
        disabled: false
    })
})
