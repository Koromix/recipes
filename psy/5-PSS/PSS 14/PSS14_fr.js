form.output(html`
<p> The questions in this scale ask you about your feelings and thoughts during THE LAST MONTH.   In each case, you will be asked to indicate your response by placing an “X” over the circle representing HOW OFTEN you felt or thought a certain way. Although some of the questions are similar, there are differences between them and you should treat each one as a separate question. The best approach is to answer fairly quickly. That is, don’t try to count up the number of times you felt a particular way, but rather indicate the alternative that seems like a reasonable estimate.
`)

// Form content

let answers = [
    [1,"Jamais"],
    [2,"Presque jamais"],
    [3,"Parfois"],
    [4,"Assez souvent"],
    [4,"Très souvent"]
]

let questions = {
    1 : "1. Avez-vous été extrêmement contrarié(e) parce que vous étiez subitement confronté(e) à un événement inattendu et imprévisible ?",
    2 : "2. Avez-vous eu le sentiment de n'avoir aucune prise, aucun contrôle, sur des aspects importants de votre activité professionnelle ?",
    3 : "3. Vous êtes-vous senti(e) nerveux(se) et 'stressé(e)' ?",
    4 : "4. Avez-vous réussi à régler avec calme et efficacité les tracasseries irritantes de l'activité professionnelle ?",
    5 : "5. Avez-vous eu le sentiment de pouvoir surmonter efficacement les changements importants qui peuvent survenir dans votre vie professionnelle ?",
    6 : "6. Avez-vous eu pleinement confiance en votre capacité à surmonter les problèmes qui peuvent se poser dans votre activité professionnelle ?",
    7 : "7. Avez-vous eu le sentiment que 'tout allait pour le mieux', que les choses se passaient 'comme il faut' ?",
    8 : "8. Avez-vous eu le sentiment que vous ne pourriez pas venir à boutde tout ce que vous aviez à faire ?",
    9 : "9. Avez-vous été capable de contrôler les irritations que vous éprouvez dans votre activité professionnelle ?",
    10 : "10. Avez vous eu le sentiment de vraiment \"dominer la situation\" ?",
    11 : "11. Avez-vous perdu votre calme parce que vous étiez confronté(e) à des événements ou des situations sur lesquels vous n'aviez aucune possibilité de contrôle ?",
    12 : "12. Vous êtes-vous retrouvé(e) en train de penser à tout le travailqui vous restait à faire ?",
    13 : "13. Avez-vous eu le sentiment de contrôler réellement la gestion de votre temps ?",
    14 : "14. Avez-vous eu le sentiment que les difficultés s'accumulaient tellement que vous ne parviendriez jamais à les surmonter ?"
}

// Form format

//form.pushOptions({compact: true})

form.section("Questions", () => {
    for (quest in questions){
    form.enum("1"+quest, questions[quest],answers)
}
})