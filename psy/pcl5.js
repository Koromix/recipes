form.section("Post-traumatic stress disorder Checlist version DSM-5 (PCL-5)", () => {
    form.output(html`
        <p><i>Voici une liste de problèmes que les gens éprouvent parfois suite à une expérience vraiment stressante. Veuillez lire chaque énoncé attentivement et cocher la case pour indiquer dans quelle mesure ce problème vous a affecté dans le <b>dernier mois</b>.</i></p>
        <p>Dans le dernier mois, dans quelle mesure avez-vous été affecté par :</p>
    `)

    let choices = [
        [0, "Pas du tout"],
        [1, "Un peu"],
        [2, "Modérément"],
        [3, "Beaucoup"],
        [4, "Extrêmement"]
    ]

    form.enumRadio("*pcl1", "1. Des souvenirs répétés, pénibles et involontaires de l’expérience stressante ?", choices)

    form.enumRadio("*pcl2", "2. Des rêves répétés et pénibles de l’expérience stressante ?", choices)

    form.enumRadio("*pcl3", "3. Se sentir ou agir soudainement comme si vous viviez à nouveau l’expérience stressante ?", choices)

    form.enumRadio("*pcl4", "4. Se sentir mal quand quelque chose vous rappelle l’événement ?", choices)

    form.enumRadio("*pcl5", "5. Avoir de fortes réactions physiques lorsque quelque chose vous rappelle l’événement (accélération cardiaque, difficulté respiratoire, sudation) ?", choices)

    form.enumRadio("*pcl6", "6. Essayer d’éviter les souvenirs, pensées, et sentiments liés à l’événement ?", choices)

    form.enumRadio("*pcl7", "7. Essayer d’éviter les personnes et les choses qui vous rappellent l’expérience stressante (lieux, personnes, activités, objets) ? ", choices)

    form.enumRadio("*pcl8", "8. Des difficultés à vous rappeler des parties importantes de l’événement ?", choices)

    form.enumRadio("*pcl9", "9. Des croyances négatives sur vous-même, les autres, le monde (des croyances comme : je suis mauvais, j’ai quelque chose qui cloche, je ne peux avoir confiance en personne, le monde est dangereux) ?", choices)

    form.enumRadio("*pcl10", "10. Vous blâmer ou blâmer quelqu’un d’autre pour l’événement ou ce qui s’est produit ensuite ?", choices)

    form.enumRadio("*pcl11", "11. Avoir des sentiments négatifs intenses tels que peur, horreur, colère, culpabilité, ou honte ?", choices)

    form.enumRadio("*pcl12", "12. Perdre de l’intérêt pour des activités que vous aimiez auparavant ?", choices)

    form.enumRadio("*pcl13", "13. Vous sentir distant ou coupé des autres ?", choices)

    form.enumRadio("*pcl14", "14. Avoir du mal à éprouver des sentiments positifs (par exemple être incapable de ressentir de la joie ou de l’amour envers vos proches) ?", choices)

    form.enumRadio("*pcl15", "15. Comportement irritable, explosions de colère, ou agir agressivement ?", choices)

    form.enumRadio("*pcl16", "16. Prendre des risques inconsidérés ou encore avoir des conduites qui pourraient vous mettre en danger ?", choices)

    form.enumRadio("*pcl17", "17. Être en état de « super-alerte », hyper vigilant ou sur vos gardes ?", choices)

    form.enumRadio("*pcl18", "18. Sursauter facilement ?", choices)

    form.enumRadio("*pcl19", "19. Avoir du mal à vous concentrer ?", choices)

    form.enumRadio("*pcl20", "20. Avoir du mal à trouver le sommeil ou à rester endormi ?", choices)
})

form.section("Cotation", () => {
    form.output(html`
        <center><i>Les items sont cotés sur une échelle à 5 points. Le score maximum est de 80. Un seuil de 33 à 38 est présentement proposé pour faire le dépistage du TSPT </i></center>
    `)

    let score = values.pcl1 + values.pcl2 + values.pcl3 + values.pcl4 +
                values.pcl5 + values.pcl6 + values.pcl7 + values.pcl8 +
                values.pcl9 + values.pcl10 + values.pcl11 + values.pcl12 +
                values.pcl13 + values.pcl14 + values.pcl15 + values.pcl16 +
                values.pcl17 + values.pcl18 + values.pcl19 + values.pcl20
    form.calc("score_pcl", "Score total", score, {suffix: "/ 80"})

    if (values.score_pcl > 38) {
        form.sameLine(true); form.calc("interpretation_pcl", "Interprétation", "Score significatif");
    } else if (values.score_pcl != null) {
        form.sameLine(true); form.calc("interpretation_pcl", "Interprétation", "Score non-significatif");
    } else {
        form.sameLine(true); form.calc("interpretation_pcl", "Interprétation", undefined);
    }
}, { hidden: goupile.isLocked() })
