form.section("Gravité de la maladie", () => {
    form.enumRadio("q1", "En fonction de votre expérience clinique totale avec ce type de patient, quel est le niveau de gravité des troubles mentaux actuels du patient ?", [
        [0, "Non évalué"],
        [1, "Normal, pas du tout malade"],
        [2, "À la limite"],
        [3, "Légèrement malade"],
        [4, "Modérément malade"],
        [5, "Manifestement malade"],
        [6, "Gravement malade"],
        [7, "Parmi les patients les plus malades"]
    ])
})

form.section("Amélioration globale", () => {
    form.enumRadio("q2", "Evaluer l'amélioration totale qu'elle soit ou non, selon votre opinion, due entièrement au traitement médicamenteux. Comparé à son état au début du traitement, de quelle façon le patient a-t-il changé ?", [
        [0, "Non évalué"],
        [1, "Très fortement amélioré"],
        [2, "Fortement amélioré"],
        [3, "Légèrement amélioré"],
        [4, "Pas de changement"],
        [5, "Légèrement aggravé"],
        [6, "Fortement aggravé"],
        [7, "Très fortement aggravé"]
    ])
})

form.section("Index thérapeutique", () => {
    form.output(html`
        <p>Evaluer cet item uniquement en fonction de l'<b>effet du médicament</b>. Choisissez les termes qui décrivent le mieux les degrés d'efficacité thérapeutique et d'effets secondaires.
        <p>Ces items ne doivent <b>pas être évalués lors de l'évaluation initiale</b>, cochez donc "Non évalué" ci-dessous.
    `)

    form.enumRadio("q3_primaire", "Effet thérapeutique", [
        [0, "Non évalué"],
        [1, "Important (amélioration marquée, disparition complète ou presque complète de tous les symptômes)"],
        [2, "Modéré (amélioration nette : disparition partielle des symptômes)"],
        [3, "Minime (très légère amélioration qui ne modifie pas le fonctionnement du patient)"],
        [4, "Nul ou aggravation"]
    ], {
        value: nav.page.key === 'cgi_m0' ? 0 : null
    })
    form.sameLine(true); form.enumRadio("q3_secondaire", "Effets secondaires", [
        [1, "Aucun"],
        [2, "N'interfèrent pas significativement avec le fonctionnement du patient"],
        [3, "Interfèrent significativement avec le fonctionnement du patient"],
        [4, "Dépassent l'effet thérapeutique"]
    ], {
        disabled: values.q3_primaire === 0
    })
    
    let index = -4 + 4 * values.q3_primaire + values.q3_secondaire
    if (values.q3_primaire === 0)
        index = 0

    form.calc("q3", "Index thérapeutique", index, {
        text: value => ('' + value).padStart(2, '0')
    })
})
