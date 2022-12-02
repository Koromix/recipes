let catastrophes = {
    1:  "Catastrophe naturelle (inondation, ouragan, tornade, tremblement de terre, etc.)",
    2:  "Incendie ou explosion",
    3:  "Accident de la route (accident de voiture ou de bateau, déraillement de train, écrasement d’avion, etc.)",
    4:  "Accident grave au travail, à domicile ou pendant des occupations de loisirs",
    5:  "Exposition à une substance toxique (produits chimiques dangereux, radiations, etc.)",
    6:  "Agression physique (avoir été attaqué, frappé, poignardé, battu, roué de coups, etc.)",
    7:  "Attaque à main armée (avoir été menacé ou blessé par une arme à feu, un couteau, une bombe, etc.)",
    8:  "Agression sexuelle (viol, tentative de viol, accomplir tout acte sexuel par la force ou sous la menace)",
    9:  "Autre expérience sexuelle non désirée et désagréable (abus sexuel dans l’enfance)",
    10: "Participation à un conflit armé ou présence dans une zone de guerre (dans l’armée ou comme civil)",
    11: "Captivité (avoir été kidnappé, enlevé, pris en otage, incarcéré comme prisonnier de guerre, etc.)",
    12: "Maladie ou blessure mettant la vie en danger",
    13: "Souffrances humaines intenses",
    14: "Mort violente (homicide, suicide, etc.)",
    15: "Mort subite et inattendue d’un proche",
    16: "Blessure grave, dommage ou mort causé par vous à quelqu’un",
    17: "Toute autre expérience très stressante (négligence sévère dans l’enfance, etc.)",
    99: "Autre (précisez) :"
}

form.section("Critère A : exposition à la mort d'une personne, à la possibilitéde mort, à une blessure sérieuse ou à de la violence sexuelle", () => {
    form.section("", () => {
        form.output(html`
            <p>Être exposé à la mort d’une personne, à la possibilité de mort, à une blessure sérieuse ou à de la violence sexuelle :</p>
            <ul>
                <li><b>A1</b> : Faire l’expérience directe d’un événement traumatique.
                <li><b>A2</b> : Être témoin, en personne, d’un événement traumatique vécu par autrui.
                <li><b>A3</b> : Apprendre qu’un événement traumatique est arrivé à un membre de sa famille proche ou à un ami proche. Dans le cas de mort ou de la possibilité de mort d’un membre de famille proche ou d’un ami proche, l’événement doit avoir été violent ou accidentel.
                <li><b>A4</b> : Être exposé, à répétition ou de manière extrême, à des détails aversifs liés à un ou plusieurs événements traumatiques (des secouristes ramassant des restes humains, des policiers exposés à répétition à des détails liés à des abus d’enfants).
            </ul>
            <i>Note : le critère A4 ne s’applique pas à une exposition via les médias électroniques, la télévision, des films ou des images, à moins que cette exposition ne soit reliée au travail.</i>
        `)
    })

    form.output(html`
        <p>Je vais vous poser des questions sur les expériences stressantes que vous avez encerclées sur le questionnaire. D’abord, je vais vous demander de me décrire brièvement l’événement que vous avez identifié comme ayant été le pire pour vous. Puis, je vais vous demander comment cet événement vous a affecté au cours du MOIS DERNIER. De manière générale, je n’ai pas besoin de beaucoup d’information - juste assez pour que je comprenne le problème que vous avez pu avoir. Si vous devenez bouleversé(e) quand nous abordons différentes questions, veuillez m’en informer de manière à ce que nous puissions ralentir et en parler. Également, laissez-moi savoir si vous avez une question ou si vous ne comprenez pas quelque chose. Avez-vous des questions avant que nous commencions ?</p>
        ${values.evt_index != null ? html`
            <p>L'évènement que vous avez identifié comme le plus difficile est <b>${catastrophes[values.evt_index].toLowerCase()}</b>${values.idx_age != null ? html`, vers l'âge de ${values.idx_age}${values.idx_age > 1 ? " ans" : " an"}` : ''}.<br/>
            J'aimerais que vous me décriviez brièvement ce qui s'est produit.
        ` : ''}
    `)

    form.section("", () => {
        form.output(html`<i>Événement traumatique de référence : Que s’est-il passé ? (Quel âge aviez-vous ? En quoi avez-vous été impliqué ? Qui d’autre fut impliqué ? Est-ce que quelqu’un a été sérieusement blessé ou tué ? Est-ce que la vie de quelqu’un a été mise en danger ? Combien de fois est-ce que cela s’est produit ?)`)

        form.enum("expo_type", "Type d'exposition", [
            [1, "Vécu"],
            [2, "Témoin"],
            [3, "Appris"],
            [4, "Exposition à des détails aversifs"]
        ])
        form.binary("expo_menace1", "Votre vie a été menacée ?")
        form.sameLine(true); form.binary("expo_menace2", "La vie d'autrui a été menacée ?")
        form.binary("expo_blessure1", "Vous avez subi(e) des blessures sérieuses ?")
        form.sameLine(true); form.binary("expo_blessure2", "Quelqu'un d'autre a subi des blessures sérieuses ?")
        form.binary("expo_sex1", "Vous avez subi des violences sexuelles ?")
        form.sameLine(true); form.binary("expo_sex2", "Quelqu'un d'autre a subi des violences sexuelles ?")
    })

    form.enum("*a", "Le critère A est-il rempli ?", [
        [1, "Oui"],
        [2, "Probablement"],
        [0, "Non"]
    ])

    form.textArea("texte1", "TEXTE LIBRE")

    form.output(html`
        Pour le reste de l’entrevue, j’aimerais que vous gardiez cet événement (nommez-le) en tête alors que je vais vous poser des questions sur divers problèmes qu’il aurait pu vous causer. Vous pouvez avoir eu certains de ces problèmes auparavant, mais, pour cette entrevue, nous allons focaliser seulement sur le dernier mois. Pour chaque problème, je vais vous demander si vous l’avez eu au cours du mois dernier et, si oui, combien de fois et à quelle intensité ce problème vous a-t-il dérangé.
    `)
})

form.section("B. Symptômes intrusifs", () => {
    form.section("", () => {
        form.output(html`
            <b>B1. Souvenirs récurrents, involontaires et intrusifs de l'évènement traumatique</b><br/><br/>
            <i>Au cours du mois dernier, avez-vous eu des <u>souvenirs involontaires</u> de cet événement alors que vous étiez éveillés, donc sans compter les rêves ?</i> (Cotez 0 = Absent si seulement lors de rêves)<br/>
               <i>Comment cela se passe-t-il quand vous commencez à vous souvenir de cet événement ?</i><br/>
               Si non clair; <i>Est-ce que ces souvenirs sont involontaires ou est-ce que vous pensez à cet événement volontairement ?</i><br/>
            Cotez 0 = Absent à moins que perçus comme involontaires intrusifs)<br/>
            <i>Jusqu’à quel point ces souvenirs vous dérangent ? Êtes-vous capable de les sortir de votre tête et de penser à autre chose ?</i>
        `)

    form.textArea("texte2", "TEXTE LIBRE")


        form.block(() => {
            form.enum("b1_det", "Niveau de détresse", [
                [1, "Minimale"],
                [2, "Clairement présente"],
                [3, "Présente"],
                [4, "Extrême"]
            ])
            form.number("b1_n", "Combien de fois avez-vous eu de tels souvenirs le mois dernier ?", { min: 0 })
        })

        form.sameLine(true); form.enumRadio("*b1", "Cotation du critère B1", [
            [0, "0 = Absent"],
            [1, "1 = Léger / sous le seuil"],
            [2, "2 = Modéré / au seuil"],
            [3, "3 = Sévère / élevé"],
            [4, "4 = Extrême / incapacitant"]
        ], {
            help: [
                "Points-clés de cotation = fréquence et intensité de la détresse",
                "Modéré = au moins 2 fois par mois / détresse clairement présente, un peu de difficulté à chasser les souvenir",
                "Sévère = au moins 2 fois par semaine / détresse prononcée, difficulté considérable à chasser les souvenirs"
            ]
        })
        
    })

    form.section("", () => {
        form.output(html`
            <b>B2. Rêves récurrents et troublants dont le contenu/l’affect est lié à l’événement traumatique</b><br/><br/>
            <i>Au cours du mois dernier, avez-vous fait des rêves déplaisants liés à cet événement (nommez-le) ? Décrivez un rêve typique.</i><br/>
            Si non clair ; <i>Est-ce que ces rêves vous réveillent ?</i><br/>
            Si oui ; <i>Comment vous sentez-vous quand vous vous éveillez ? Si non-retour au sommeil ; Combien d’heures de sommeil perdez-vous ?<br/>
            Jusqu’à quel point ces rêves vous dérangent ?</i>
        `)
        
        form.textArea("texte3", "TEXTE LIBRE")


        form.block(() => {
            form.enum("b2_det", "Niveau de détresse", [
                [1, "Minimale"],
                [2, "Clairement présente"],
                [3, "Présente"],
                [4, "Extrême"]
            ])
            form.number("b2_n", "Combien de fois avez-vous eu de tels rêves le mois dernier ?", { min: 0 })
        })

        form.sameLine(true); form.enumRadio("*b2", "Cotation du critère B2", [
            [0, "0 = Absent"],
            [1, "1 = Léger / sous le seuil"],
            [2, "2 = Modéré / au seuil"],
            [3, "3 = Sévère / élevé"],
            [4, "4 = Extrême / incapacitant"]
        ], {
            help: [
                "Points-clés de cotation = fréquence et intensité de la détresse",
                "Modéré = au moins 2 fois par mois / détresse clairement présente, moins d’une heure de sommeil perdue",
                "Sévère = au moins 2 fois par semaine / détresse prononcée, plus d’une heure de sommeil perdue"
            ]
        })
    })

    form.section("", () => {
        form.output(html`
            <b>B3. Réactions dissociatives (flash-back) lors desquelles la personne se sent ou agit comme si l’événement traumatique se reproduisait</b><br/><br/>
            <i>Au cours du mois dernier, y a-t-il eu des moments lors desquels vous avez <u>agi</u> ou vous vous êtes <u>senti soudainement</u> comme si l’événement se reproduisait dans la réalité ?</i> Si non clair ; <i>Cela diffère d’y penser ou d’y rêver ; là, je parle de flash-back, soit quand vous vous sentez comme si vous étiez de nouveau au moment de cet événement, en train de le revivre</i>.<br/>
            Jusqu’à quel point avez-vous l’impression que cet événement survient à nouveau ? <i>(Êtes-vous confus quant à savoir où vous êtes réellement ?)</i><br/>
            Que faites-vous quand cela survient ? <i>(Est-ce que d’autres remarquent votre comportement ? Que disent-ils ?)</i><br/>
            Combien de temps cela dure-t-il ?
        `)
        
        form.textArea("texte4", "TEXTE LIBRE")


        form.block(() => {
            form.enum("b3_dis", "Niveau de dissociation", [
                [1, "Minimale"],
                [2, "Clairement présente"],
                [3, "Présente"],
                [4, "Extrême"]
            ])
            form.number("b3_n", "Combien de fois cela s’est-il produit au cours du mois dernier ?", { min: 0 })
        })

        form.sameLine(true); form.enumRadio("*b3", "Cotation du critère B3", [
            [0, "0 = Absent"],
            [1, "1 = Léger / sous le seuil"],
            [2, "2 = Modéré / au seuil"],
            [3, "3 = Sévère / élevé"],
            [4, "4 = Extrême / incapacitant"]
        ], {
            help: [
                "Points-clés de cotation = fréquence et intensité de la dissociation",
                "Modéré = au moins 2 fois par mois / qualité dissociative clairement présente, rétention possible d’une certaine conscience de l’environnement mais revécu de l’événement clairement distinct des pensées et des souvenirs",
                "Sévère = au moins 2 fois semaine / qualité dissociative prononcée, avec un revécu vivide (images, sons, odeurs, etc.)"
            ]
        })
    })

    form.section("", () => {
        form.output(html`
            <b>B4. Détresse psychologique, intense ou prolongée, à l’exposition à des indices, internes ou externes, symbolisant ou ressemblant à un aspect de l’événement traumatique</b><br/><br/>
            <i>Au cours du mois dernier, êtes-vous devenu <u>troublé(e) psychologiquement</u> quand <u>quelque chose vous a rappelé</u> cet événement ? Quelles choses provoquent ces rappels et vous troublent ?<br/>
            Êtes-vous capable de vous calmer quand cela arrive ? (Combien de temps cela prend-t-il ?)</i>
        `)
            form.textArea("texte5", "TEXTE LIBRE")


        form.block(() => {
            form.enum("b4_det", "Niveau de détresse", [
                [1, "Minimale"],
                [2, "Clairement présente"],
                [3, "Présente"],
                [4, "Extrême"]
            ])
            form.number("b4_n", "Combien de fois cela s'est-il produit le mois dernier ?", { min: 0 })
        })

        form.sameLine(true); form.enumRadio("*b4", "Cotation du critère B4", [
            [0, "0 = Absent"],
            [1, "1 = Léger / sous le seuil"],
            [2, "2 = Modéré / au seuil"],
            [3, "3 = Sévère / élevé"],
            [4, "4 = Extrême / incapacitant"]
        ], {
            help: [
                "Points-clés de cotation = fréquence et intensité de la détresse",
                "Modéré = au moins 2 fois par mois / détresse clairement présente, certaine difficulté à récupérer",
                "Sévère = au moins 2 fois par semaine / détresse prononcée, difficulté considérable à récupérer"
            ]
        })
    })

    form.section("", () => {
        form.output(html`
            <b>B5. Réactions physiologiques marquées à l’exposition d’indices, internes ou externes, symbolisant ou ressemblant à un aspect de l’événement traumatique</b><br/><br/>
            <i>Au cours du mois dernier, avez-vous eu des réactions physiques quand quelque chose vous a rappelé cet événement ? Pouvez-vous me donner des exemples ? (Est-ce que votre cœur se débat ou votre respiration change ? Qu’en est-il de la sudation ou de devenir vraiment tendu ou trembler ?)<br/>
            Quelles choses vous rappelant l’événement ont provoqué ces réactions ?<br/>
            Combien de temps ça vous prend pour récupérer ?</i>
        `)
        
            form.textArea("texte6", "TEXTE LIBRE")


        form.block(() => {
            form.enum("b5_reac", "Niveau de réactivité", [
                [1, "Minimale"],
                [2, "Clairement présente"],
                [3, "Présente"],
                [4, "Extrême"]
            ])
            form.number("b5_n", "Combien de fois cela s'est-il produit le mois dernier ?", { min: 0 })
        })

        form.sameLine(true); form.enumRadio("*b5", "Cotation du critère B5", [
            [0, "0 = Absent"],
            [1, "1 = Léger / sous le seuil"],
            [2, "2 = Modéré / au seuil"],
            [3, "3 = Sévère / élevé"],
            [4, "4 = Extrême / incapacitant"]
        ], {
            help: [
                "Points-clés de cotation = fréquence et intensité de l’activation physiologique",
                "Modéré = au moins 2 fois par mois / réactivité clairement présente, certaine difficulté à récupérer",
                "Sévère = au moins 2 fois par semaine / réactivité prononcée, difficulté considérable à récupérer"
            ]
        })
    })
})

form.section("C. Évitement persistant des stimuli associés à l’événement traumatique, ayant débuté après la survenue de l’événement, tel que déterminé par 1 (ou plusieurs) des symptômes suivants", () =>  {
    form.section("", () => {
        form.output(html`
            <b>C1. Évitement ou efforts d’évitement des souvenirs, pensées ou sentiments dysphoriques concernant ou associés à l’événement traumatique</b><br/><br/>
            <i>Au cours du mois dernier, avez-vous essayé d’éviter les pensées ou les sentiments liés à cet événement ?<br/>
            Quels genres de pensées ou de sentiments évitez-vous ?<br/>
            Jusqu’à quel point avez-vous tenté d’éviter ces pensées ou sentiments ? (Que faites-vous alors ?)</i>
        `)
        
            form.textArea("texte7", "TEXTE LIBRE")


        form.block(() => {
            form.enum("c1_evit", "Niveau d'évitement", [
                [1, "Minimale"],
                [2, "Clairement présent"],
                [3, "Présente"],
                [4, "Extrême"]
            ])
            form.number("c1_n", "Combien de fois cela s'est-il produit au cours du mois dernier ?", { min: 0 })
        })

        form.sameLine(true); form.enumRadio("*c1", "Cotation du critère C1", [
            [0, "0 = Absent"],
            [1, "1 = Léger / sous le seuil"],
            [2, "2 = Modéré / au seuil"],
            [3, "3 = Sévère / élevé"],
            [4, "4 = Extrême / incapacitant"]
        ], {
            help: [
                "Points-clés de cotation = fréquence et intensité de l'évitement",
                "Modéré = au moins 2 fois par mois / évitement clairement présent",
                "Sévère = au moins 2 fois par semaine / évitement prononcé"
            ]
        })
    })

    form.section("", () => {
        form.output(html`
            <b>C2. Évitement ou efforts d’évitement des indices extérieurs (personnes, endroits, conversations, activités, objets, situations) qui ravivent des souvenirs, pensées ou sentiments troublants associés à l’événement traumatique</b><br/><br/>
            <i>Au cours du mois dernier, avez-vous essayé <u>d’éviter les choses</u> qui <u>vous rappellent</u> cet événement, tels que des personnes, des endroits ou des situations ? Quelles choses évitez-vous ?<br/>
            Jusqu’à quel point avez-vous tenté d’éviter (ces personnes ou) ces choses ? (Avez-vous eu à planifier autrement ou à changer vos activités pour les éviter ?)</i><br/>
            Si non clair ; <i>En général, jusqu’à quel point est-ce un problème pour vous ? Comment les choses seraient différentes si vous n’aviez pas à éviter ces (personnes ou) ces choses ?</i>
        `)

        form.textArea("texte8", "TEXTE LIBRE")


        form.block(() => {
            form.enum("c2_evit", "Niveau d'évitement", [
                [1, "Minimale"],
                [2, "Clairement présent"],
                [3, "Présente"],
                [4, "Extrême"]
            ])
            form.number("c2_n", "Combien de fois cela s'est-il produit au cours du mois dernier ?", { min: 0 })
        })

        form.sameLine(true); form.enumRadio("*c2", "Cotation du critère C2", [
            [0, "0 = Absent"],
            [1, "1 = Léger / sous le seuil"],
            [2, "2 = Modéré / au seuil"],
            [3, "3 = Sévère / élevé"],
            [4, "4 = Extrême / incapacitant"]
        ], {
            help: [
                "Points-clés de cotation = fréquence et intensité de l'évitement",
                "Modéré = au moins 2 fois par mois / évitement clairement présent",
                "Sévère = au moins 2 fois par semaine / évitement prononcé"
            ]
        })
    })
})

form.section("D. Incapacité à se souvenir d’un aspect important de l’événement traumatique (due à une amnésie dissociative et non à des facteurs tels qu’un traumatisme crânien, à l’alcool ou la drogue)", () => {
    form.section("", () => {
        form.output(html`
            <b>D1. Incapacité à se souvenir d’un aspect important de l’événement traumatique</b> (due à une amnésie dissociative et non à des facteurs tels qu’un traumatisme crânien, à l’alcool ou la drogue)<br/><br/>
            <i>Au cours du mois dernier, avez-vous eu des difficultés à vous souvenir d’aspects de cet événement ? (Avez-vous l’impression qu’il vous manque des fragments de cet événement ?)<br/>
            De quelles parties de l’événement avez-vous eu de la difficulté à vous rappeler ?<br/>
            Avez-vous l’impression que vous devriez pouvoir vous souvenir de ces choses ?</i><br/>
            Si non clair ; <i>Pourquoi pensez-vous que vous ne le pouvez pas ? Avez-vous eu un traumatisme crânien lors de l’événement ? Avez-vous perdu conscience ? Étiez-vous sous l’effet de l’alcool ou de la drogue ?</i> (Cotez 0 = Absent si cela est dû à un traumatisme crânien ou à une intoxication lors de l’événement)</i><br/>
            Si cela est toujours non clair ; <i>Est-ce seulement un oubli normal ? Ou pensez-vous que vous auriez pu bloquer le souvenir de vos pensées parce qu’il serait trop douloureux ?</i> (Cotez 0 = Absent si cela est dû seulement à un oubli normal)
        `)
        
            form.textArea("texte9", "TEXTE LIBRE")


        form.block(() => {
            form.enum("d1_diff", "Difficulté à se souvenir", [
                [1, "Minimale"],
                [2, "Clairement présente"],
                [3, "Présente"],
                [4, "Extrême"]
            ])
            form.number("d1_n", "Au cours du mois dernier, combien de parties importantes de l’événement avez-vous eu de la difficulté à vous souvenir ? (De quels aspects vous souvenez-vous toujours ?)")
            form.binary("d1_y", "Seriez-vous capable de vous rappeler de ces choses si vous essayiez ?")
        })

        form.sameLine(true); form.enumRadio("*d1", "Cotation du critère D1", [
            [0, "0 = Absent"],
            [1, "1 = Léger / sous le seuil"],
            [2, "2 = Modéré / au seuil"],
            [3, "3 = Sévère / élevé"],
            [4, "4 = Extrême / incapacitant"]
        ], {
            help: [
                "Points-clés de cotation = quantité de l’événement non rappelé / intensité de l’incapacité à se rappeler",
                "Modéré = au moins 1 aspect important / difficulté à se souvenir clairement présente, certain rappel possible avec effort",
                "Sévère = plusieurs aspects importants / difficulté prononcée à se souvenir, peu de rappel même avec effort"
            ]
        })
    })

    form.section("", () => {
        form.output(html`
            <b>D2. Croyances ou attentes négatives, persistantes et exagérées, face à soi, autrui ou le monde</b><br/>
            ("Je suis une mauvaise personne", "On ne peut faire confiance à personne", "Il y a du danger partout", "Mon système nerveux est endommagé à jamais")<br/><br/>
            <i>Au cours du mois dernier, avez-vous eu de <u>fortes croyances négatives</u> face à vous-même, à autrui ou à ce monde ?<br/>
            Pouvez-vous me donner des exemples ? (Avez-vous pensé des choses telles que "Je suis une mauvaise personne", "Il y a quelque chose qui cloche en moi", "On ne peut faire confiance à personne", "Le danger est partout" ?)<br/>
            Jusqu’à quel point ces croyances sont-elles fortes ? (Jusqu’à quel point êtes-vous convaincu que ces croyances sont exactes ? Pouvez-vous concevoir d’autres façons de voir les choses ?)</i>
        `)
        
            form.textArea("texte10", "TEXTE LIBRE")


        form.block(() => {
            form.enum("d2_conv", "Niveau de conviction", [
                [1, "Minimale"],
                [2, "Clairement présente"],
                [3, "Présente"],
                [4, "Extrême"]
            ])
            form.slider("d2_pct", "Au cours du mois dernier, quel pourcentage de temps vous êtes-vous senti ainsi ?", {
                prefix: "0%", suffix: "100%",
                min: 0, max: 100
            })
            form.enum("d2_rel", "Relation au traumatisme", [
                [3, "Définitif"],
                [2, "Probable"],
                [1, "Improbable"]
            ], {
                help: "Est-ce que ces croyances négatives ont débuté ou se sont aggravées suite à l’événement ? (Croyez-vous que ces croyances sont reliés à l’événement ? En quoi ?)"
            })
        })

        form.sameLine(true); form.enumRadio("*d2", "Cotation du critère D2", [
            [0, "0 = Absent"],
            [1, "1 = Léger / sous le seuil"],
            [2, "2 = Modéré / au seuil"],
            [3, "3 = Sévère / élevé"],
            [4, "4 = Extrême / incapacitant"]
        ], {
            help: [
                "Points-clés de cotation = fréquence et intensité des croyances",
                "Modéré = parfois (20-30% du temps) / attentes négatives exagérées et clairement présentes, certaines difficultés à considérer des croyances plus réalistes",
                "Sévère = souvent (50-60%) / attentes négatives exagérées et prononcées, difficultés considérables à considérer des croyances plus réalistes"
            ]
        })
    })

    form.section("", () => {
        form.output(html`
            <b>D3. Cognitions erronées et persistantes à propos de la cause et des conséquences de l’événement traumatique qui ont amené la personne à se blâmer ou à blâmer autrui</b><br/><br/>
            <i>Au cours du mois dernier, <u>vous êtes-vous blâmé</u> pour cet événement ou pour ses conséquences ?<br/>
            Pouvez-vous m’en dire davantage ? (De quelle façon considérez-vous avoir causé cet événement ? Est-ce à cause de quelque chose que vous avez faite ? Ou à propos de quelque chose que vous pensez que vous auriez dû faire mais n’avez pas faite ? Est-ce à cause de quelque chose reliée à vous de manière usuelle ?)<br/>
            Qu’en est-il de <u>blâmer quelqu’un d’autre</u> pour cet événement ou pour ses conséquences ? Pouvez-vous m’en dire davantage ? (De quelle manière voyez-vous quelqu’un d’autre comme ayant causé cet événement ? Est-ce à cause de quelque chose que cet autre a faite ? Ou à propos de quelque chose que cet autre aurait dû faire mais n’a pas faite ?)<br/>
            Jusqu’à quel point blâmez-vous, vous-même ou autrui ?<br/>
            Jusqu’à quel point êtes-vous convaincu que vous ou d’autres portent réellement la responsabilité de ce qui est arrivé ? (Est-ce que d’autres personnes sont d’accord avec vous à ce sujet ? Pouvez-vous concevoir d’autres façons d’envisager cela ?</i> (Cotez 0=Absent si seul l’agresseur est blâmé ; c’est-à-dire quelqu’un qui a délibérément causé l’événement et/ou avait l’intention de causer du tort)<br/>
        `)
        
            form.textArea("texte11", "TEXTE LIBRE")


        form.block(() => {
            form.enum("d3_conv", "Niveau de conviction", [
                [1, "Minimale"],
                [2, "Clairement présente"],
                [3, "Présente"],
                [4, "Extrême"]
            ])
            form.slider("d3_pct", "Au cours du mois dernier, quel pourcentage de temps vous êtes-vous senti ainsi ?", {
                prefix: "0%", suffix: "100%",
                min: 0, max: 100
            })
        })

        form.sameLine(true); form.enumRadio("*d3", "Cotation du critère D3", [
            [0, "0 = Absent"],
            [1, "1 = Léger / sous le seuil"],
            [2, "2 = Modéré / au seuil"],
            [3, "3 = Sévère / élevé"],
            [4, "4 = Extrême / incapacitant"]
        ], {
            help: [
                "Points-clés de cotation = fréquence et intensité du blâme",
                "Modéré = parfois (20-30% du temps) / blâme faussé et clairement présent, certaines difficultés à considérer des croyances plus réalistes",
                "Sévère = souvent (50-60%) / blâme faussé et prononcé, difficultés considérables à considérer des croyances plus réalistes"
            ]
        })
    })

    form.section("", () => {
        form.output(html`
            <b>D4. État émotionnel négatif et persistant (peur, horreur, colère, culpabilité, ou honte)</b><br/><br/>
            <i>Au cours du mois dernier, avez-vous eu de fortes émotions négatives telles que la peur, l’horreur, la colère, la culpabilité ou la honte ?<br/>
            Pouvez-vous me donner des exemples ? (Quelles émotions négatives vivez-vous ?)<br/>
            Jusqu’à quel point ces émotions sont-elles fortes ? Jusqu’à quel point êtes-vous capable de les gérer ?</i>
        `)
        
            form.textArea("texte12", "TEXTE LIBRE")


        form.block(() => {
            form.enum("d4_emot", "Présence d'émotions négatives", [
                [1, "Minimale"],
                [2, "Clairement présentes"],
                [3, "Présentes"],
                [4, "Extrêmes"]
            ])
            form.slider("d4_pct", "Au cours du mois dernier, quel pourcentage de temps vou, êtes-vous senti ainsi ?", {
                prefix: "0%", suffix: "100%",
                min: 0, max: 100
            })
            form.enum("d4_rel", "Relation au traumatisme", [
                [3, "Définitif"],
                [2, "Probable"],
                [1, "Improbable"]
            ], {
                help: "Est-ce que ces émotions négatives ont débuté ou se sont aggravées suite à l’événement ? (Pensez-vous qu'elles sont reliés à l’événement ? En quoi ?)"
            })
        })

        form.sameLine(true); form.enumRadio("*d4", "Cotation du critère D4", [
            [0, "0 = Absent"],
            [1, "1 = Léger / sous le seuil"],
            [2, "2 = Modéré / au seuil"],
            [3, "3 = Sévère / élevé"],
            [4, "4 = Extrême / incapacitant"]
        ], {
            help: [
                "Points-clés de cotation = fréquence et intensité des émotions négatives",
                "Modéré = parfois (20-30% du temps) / émotions négatives clairement présentes, certaines difficultés à les gérer",
                "Sévère = souvent (50-60%) / émotions négatives prononcées, difficultés considérables à les gérer"
            ]
        })
    })

    form.section("", () => {
        form.output(html`
            <b>D5. Diminution marquée de l’intérêt ou de la participation à des activités signifiantes</b><br/><br/>
            <i>Au cours du mois dernier, avez-vous été moins intéressé(e) aux activités que vous aimiez auparavant ?<br/>
            À quelles activités êtes-vous moins intéressé(e) qu’avant, ou quelles activités ne faites-vous plus autant qu’avant ? (Y en a-t-il d’autres aussi ?)<br/>
            Pourquoi est-ce ainsi ?</i> (Cotez 0=Absent si la diminution de participation est due à un manque de possibilités, une incapacité physique ou un changement développemental approprié face aux activités appréciées)<br/>
            <i>Quelle est l’ampleur de votre perte d’intérêt ? (Si vous vous forciez, arriveriez-vous à prendre un certain plaisir dans ces activités ? Quelles activités aimez-vous toujours faire ?)</i>
        `)
        
            form.textArea("texte13", "TEXTE LIBRE")


        form.block(() => {
            form.enum("d5_evit", "Perte d'intérêt", [
                [1, "Minimale"],
                [2, "Clairement présente"],
                [3, "Présente"],
                [4, "Extrême"]
            ])
            form.slider("d5_pct", "Au cours du mois dernier, dans l'ensemble, dans quelle mesure avez-vous été moins intéréssé(e) par ces activités ?", {
                prefix: "(intérêt conservé) 0%", suffix: "100% (plus d'intérêt)",
                min: 0, max: 100
            })
            form.enum("d5_rel", "Relation au traumatisme", [
                [3, "Définitif"],
                [2, "Probable"],
                [1, "Improbable"]
            ], {
                help: "Est-ce que votre perte d'intérêt a débuté ou s'est aggravée après l'évènement ? (Pensez-vous que cela soit relié à l'évènement ? En quoi ?"
            })
        })

        form.sameLine(true); form.enumRadio("*d5", "Cotation du critère D5", [
            [0, "0 = Absent"],
            [1, "1 = Léger / sous le seuil"],
            [2, "2 = Modéré / au seuil"],
            [3, "3 = Sévère / élevé"],
            [4, "4 = Extrême / incapacitant"]
        ], {
            help: [
                "Points-clés de cotation = fréquence et intensité de la perte d'intérêt",
                "Modéré = parfois (20-30% du temps) / perte d’intérêt clairement présente mais persiste une connexion interpersonnelle",
                "Sévère = souvent (50-60%) / perte d’intérêt prononcée, peu d’intérêt ou de participation à des activités"
            ]
        })
    })

    form.section("", () => {
        form.output(html`
            <b>D6. Sentiment de détachement ou d’aliénation face à autrui</b><br/><br/>
            <i>Au cours du mois dernier, vous êtes-vous senti distant(e) ou séparé(e) des autres ?<br/>
            Pouvez-vous m’en dire plus ?<br/>
            Quelle est l’intensité de votre sentiment d’être distant ou séparé des autres ? (De qui vous sentez-vous le plus proche ? Avec combien de personnes vous sentez-vous confortable pour parler de choses personnelles ?)</i>
        `)
        
            form.textArea("texte14", "TEXTE LIBRE")


        form.block(() => {
            form.enum("d6_alienation", "Détachement ou aliénation", [
                [1, "Minimale"],
                [2, "Clairement présent"],
                [3, "Présent"],
                [4, "Extrême"]
            ])
            form.slider("d6_pct", "Au cours du mois dernier, quel pourcentage de temps vous êtes-vous senti ainsi ?", {
                prefix: "0%", suffix: "100%",
                min: 0, max: 100
            })
            form.enum("d6_rel", "Relation au traumatisme", [
                [3, "Définitif"],
                [2, "Probable"],
                [1, "Improbable"]
            ], {
                help: "Ce sentiment d'être distant ou séparé(e) des autres, a-t-il débuté ou s'est-il aggravé depuis cet évènement ? (Pensez-vous que cela soit relié à cet évènement ? En quoi ?)"
            })
        })

        form.sameLine(true); form.enumRadio("*d6", "Cotation du critère D6", [
            [0, "0 = Absent"],
            [1, "1 = Léger / sous le seuil"],
            [2, "2 = Modéré / au seuil"],
            [3, "3 = Sévère / élevé"],
            [4, "4 = Extrême / incapacitant"]
        ], {
            help: [
                "Points-clés de cotation = fréquence et intensité du détachement ou de l'aliénation",
                "Modéré = parfois (20-30% du temps) / détachement clairement présent mais présence d’une connexion interpersonnelle",
                "Sévère = souvent (50-60%) / détachement ou aliénation prononcé face à plupart, possibilité de sentir près de seulement une ou deux personnes"
            ]
        })
    })

    form.section("", () => {
        form.output(html`
            <b>D7. Incapacité persistante de vivre des émotions positives</b> (bonheur, satisfaction ou amour)<br/>
            <i>Au cours du mois dernier, y a-t-il eu des moments lors desquels vous avez eu de la difficulté à vivre des émotions positives telles que l’amour ou le bonheur ?<br/>
            Pouvez-vous m’en dire plus ? (Quels sentiments sont difficiles à éprouver ?)<br/>
            Jusqu’à quel point avez-vous de la difficulté éprouver des sentiments positifs ? (Êtes-vous encore capable de ressentir certains sentiments positifs ?)</i>
        `)
        
            form.textArea("texte15", "TEXTE LIBRE")


        form.block(() => {
            form.enum("d7_evit", "Réduction d'émotions positives", [
                [1, "Minimale"],
                [2, "Clairement présente"],
                [3, "Présente"],
                [4, "Extrême"]
            ])
            form.slider("d7_pct", "Au cours du mois dernier, quel pourcentage de temps vous êtes-vous senti ainsi ?", {
                prefix: "0%", suffix: "100%",
                min: 0, max: 100
            })
            form.enum("d7_rel", "Relation au traumatisme", [
                [3, "Définitif"],
                [2, "Probable"],
                [1, "Improbable"]
            ], {
                help: "Est-ce que cette difficulté a commencé ou s'est aggravée suite à l'évènement ? (Pensez-vous que cela soit relié à cet évènement ? En quoi ?"
            })
        })

        form.sameLine(true); form.enumRadio("*d7", "Cotation du critère D7", [
            [0, "0 = Absent"],
            [1, "1 = Léger / sous le seuil"],
            [2, "2 = Modéré / au seuil"],
            [3, "3 = Sévère / élevé"],
            [4, "4 = Extrême / incapacitant"]
        ], {
            help: [
                "Points-clés de cotation = fréquence et intensité de la réduction de l’expérience de sentiments positifs",
                "Modéré = parfois (20-30% du temps) / réduction clairement présente de sentiments positifs, mais capacité d’en ressentir encore certains",
                "Sévère = souvent (50-60%) / réduction prononcée dans la capacité à ressentir de nombreux sentiments positifs"
            ]
        })
    })
})

form.section("E. Altérations  marquées  de  l’activation  et  de  la  réactivité,  associées  à  l’événement traumatique et ayant débuté après la survenue de cet événement, tel que déterminé par 2 (ou plusieurs) des symptômes suivants", () => {
    form.section("", () => {
        form.output(html`
            <b>E1. Comportement irritable et crises de colère</b> (suite à peu ou pas de provocation) <b>exprimés typiquement sous la forme d’agression verbale ou physique envers des objets ou des gens</b><br/><br/>
            <i>Au cours du mois dernier, y a-t-il eu des moments lors desquels vous vous êtes senti particulièrement <u>irritable ou en colère</u> et l’avez démontré dans <u>votre comportement</u> ?<br/>
            Pouvez-vous me donnez des exemples ? (Comment l’avez-vous démontré ? Avez-vous monté le ton ou crié :? Avez-vous lancé ou frappé des objets ? Avez-vous poussé ou frappé des gens ?)</i>
        `)
        
            form.textArea("texte16", "TEXTE LIBRE")


        form.block(() => {
            form.enum("e1_agg", "Agression", [
                [1, "Minimale"],
                [2, "Clairement présente"],
                [3, "Présente"],
                [4, "Extrême"]
            ])
            form.number("e1_n", "Combien de fois avez-vous agi ainsi au cours du mois dernier ?")
            form.enum("e1_rel", "Relation au traumatisme", [
                [3, "Définitif"],
                [2, "Probable"],
                [1, "Improbable"]
            ], {
                help: "Est-ce que ce comportement a débuté ou s’est aggravé après l’événement ? (Pensez-vous que cela soit relié à cet événement ? En quoi ?)"
            })
        })

        form.sameLine(true); form.enumRadio("*e1", "Cotation du critère E1", [
            [0, "0 = Absent"],
            [1, "1 = Léger / sous le seuil"],
            [2, "2 = Modéré / au seuil"],
            [3, "3 = Sévère / élevé"],
            [4, "4 = Extrême / incapacitant"]
        ], {
            help: [
                "Points-clés de cotation = fréquence et intensité du comportement agressif",
                "Modéré = au moins 2 fois par mois / agression clairement présente, surtout verbale",
                "Sévère = au moins 2 fois par semaine / agression prononcée, au moins une agression physique"
            ]
        })
    })

    form.section("", () => {
        form.output(html`
            <b>E2. Comportement dangereux ou autodestructeur</b><br/><br/>
            <i>Au cours du mois dernier, y a-t-il eu des moments lors desquels vous avez pris plus de risques ou vous avez fait quelque chose qui aurait <u>pu vous causer du tort</u> ?<br/>
            Pouvez-vous me donnez des exemples ? (En quoi était-ce dangereux ? Vous êtes-vous blessé ou fait mal ?)</i>
        `)
        
            form.textArea("texte17", "TEXTE LIBRE")


        form.block(() => {
            form.enum("e2_risque", "Risque", [
                [1, "Minimal"],
                [2, "Clairement présent"],
                [3, "Présent"],
                [4, "Extrême"]
            ])
            form.number("e2_n", "Combien de fois au cours du mois dernier ?")
            form.enum("e2_rel", "Relation au traumatisme", [
                [3, "Définitif"],
                [2, "Probable"],
                [1, "Improbable"]
            ], {
                help: "Est-ce que ce comportement a débuté ou s’est aggravé après l’événement ? (Pensez-vous que cela soit relié à cet événement ? En quoi ?)"
            })
        })

        form.sameLine(true); form.enumRadio("*e2", "Cotation du critère E2", [
            [0, "0 = Absent"],
            [1, "1 = Léger / sous le seuil"],
            [2, "2 = Modéré / au seuil"],
            [3, "3 = Sévère / élevé"],
            [4, "4 = Extrême / incapacitant"]
        ], {
            help: [
                "Points-clés de cotation = fréquence et degré du degré de risque",
                "Modéré = au moins 2 fois par mois / risque clairement présent, ayant pu causer du tort",
                "Sévère = au moins 2 fois par semaine / risque prononcé, ayant causé du tort ou ayant eu une forte probabilité à cela"
            ]
        })
    })

    form.section("", () => {
        form.output(html`
            <b>E3. Hypervigilance</b><br/><br/>
            <i>Au cours du mois dernier, avez-vous été <u>en alerte ou sur vos gardes</u>, même quand il n’y avait pas de danger ou de menace spécifique ? (Vous êtes-vous senti comme si vous deviez être sur vos gardes ?)<br/>
            Pouvez-vous me donnez des exemples ? (Que faites-vous quand vous êtes en alerte ou sur vos gardes ?)</i><br/>
            Si non clair ; <i>Qu’est-ce qui fait que vous réagissez ainsi ? Avez-vous l’impression d’être en danger ou menacé d’une quelconque façon ? Vous sentez-vous ainsi plus que les autres ?</i>
        `)
        
            form.textArea("texte18", "TEXTE LIBRE")


        form.block(() => {
            form.enum("e3_hyper", "Hypervigilance", [
                [1, "Minimale"],
                [2, "Clairement présente"],
                [3, "Présente"],
                [4, "Extrême"]
            ])
            form.slider("e3_pct", "Au cours du mois dernier, quel pourcentage de temps vous êtes-vous senti ainsi ?", {
                prefix: "0%", suffix: "100%",
                min: 0, max: 100
            })
            form.enum("e3_rel", "Relation au traumatisme", [
                [3, "Définitif"],
                [2, "Probable"],
                [1, "Improbable"]
            ], {
                help: "Est-ce qu’être en alerte ou sur vos gardes a débuté ou s’est aggravé après cet événement ? (Pensez-vous que cela soit relié à cet événement ? En quoi ?)"
            })
        })

        form.sameLine(true); form.enumRadio("*e3", "Cotation du critère E3", [
            [0, "0 = Absent"],
            [1, "1 = Léger / sous le seuil"],
            [2, "2 = Modéré / au seuil"],
            [3, "3 = Sévère / élevé"],
            [4, "4 = Extrême / incapacitant"]
        ], {
            help: [
                "Points-clés de cotation = fréquence et intensité de l’hypervigilance",
                "Modéré = parfois (20-30% du temps) / hypervigilance clairement présente (en alerte, conscience aigüe d’un danger)",
                "Sévère = souvent (50-60%) / hypervigilance prononcée (scruter l’environnement,  déployer des rituels de sécurité, considération exagérée pour la sécurité de soi/famille/foyer"
            ]
        })
    })

    form.section("", () => {
        form.output(html`
            <b>E4. Réactions de sursaut exagérées</b><br/><br/>
            <i>Au cours du mois dernier, avez-vous eu de <u>fortes réactions de sursaut</u> ? Qu’est-ce qui vous a fait sursauter ? Qu’elle est l’intensité de ces réactions de sursaut ? (En quoi se comparent-elles à ce que les autres gens feraient ? Faites-vous des choses que les gens remarquent ?)<br/>
            Combien de temps prenez-vous pour vous en remettre ?</i>
        `)
        
            form.textArea("texte19", "TEXTE LIBRE")


        form.block(() => {
            form.enum("e4_risque", "Réactions de sursaut", [
                [1, "Minimales"],
                [2, "Clairement présentes"],
                [3, "Présentes"],
                [4, "Extrêmes"]
            ])
            form.number("e4_n", "Combien de fois au cours du mois dernier ?")
            form.enum("e4_rel", "Relation au traumatisme", [
                [3, "Définitif"],
                [2, "Probable"],
                [1, "Improbable"]
            ], {
                help: "Est-ce que ces réactions de sursaut ont débuté ou se sont aggravées après l’événement ? (Pensez-vous que cela soit relié à cet événement ? En quoi ?)"
            })
        })

        form.sameLine(true); form.enumRadio("*e4", "Cotation du critère E4", [
            [0, "0 = Absent"],
            [1, "1 = Léger / sous le seuil"],
            [2, "2 = Modéré / au seuil"],
            [3, "3 = Sévère / élevé"],
            [4, "4 = Extrême / incapacitant"]
        ], {
            help: [
                "Points-clés de cotation = fréquence et intensité du sursaut",
                "Modéré = au moins 2 fois par mois / sursaut clairement présent, avec certaines difficultés à s’en remettre",
                "Sévère = au moins 2 fois par semaine / sursaut prononcé, avec activation soutenue et difficultés considérables à récupérer"
            ]
        })
    })

    form.section("", () => {
        form.output(html`
            <b>E5. Difficultés de concentration</b><br/><br/>
            <i>Au cours du mois dernier, avez-vous eu des <u>difficultés de concentration</u> ?<br/>
            Pouvez-vous me donnez des exemples ?<br/>
            Êtes-vous capable de vous concentrer si vous y mettez des efforts ?</i>
        `)
        
            form.textArea("texte20", "TEXTE LIBRE")


        form.block(() => {
            form.enum("e5_focus", "Difficultés de concentration", [
                [1, "Minimales"],
                [2, "Clairement présentes"],
                [3, "Présentes"],
                [4, "Extrêmes"]
            ])
            form.slider("e5_pct", "Au cours du mois dernier, quel pourcentage de temps avez-vous eu des difficultés de concentration ?", {
                prefix: "0%", suffix: "100%",
                min: 0, max: 100
            })
            form.enum("e5_rel", "Relation au traumatisme", [
                [3, "Définitif"],
                [2, "Probable"],
                [1, "Improbable"]
            ], {
                help: "Est-ce que ces difficultés de concentration ont débuté ou s’est aggravé après l’événement ? (Pensez-vous que cela soit relié à cet événement ? En quoi ?)"
            })
        })

        form.sameLine(true); form.enumRadio("*e5", "Cotation du critère E5", [
            [0, "0 = Absent"],
            [1, "1 = Léger / sous le seuil"],
            [2, "2 = Modéré / au seuil"],
            [3, "3 = Sévère / élevé"],
            [4, "4 = Extrême / incapacitant"]
        ], {
            help: [
                "Points-clés de cotation = fréquence et intensité des difficultés de concentration",
                "Modéré = parfois (20-30% du temps) / difficultés clairement présentes, mais possibilité de se concentrer avec effort",
                "Sévère = souvent (50-60%) / difficultés de concentration prononcées, même avec effort"
            ]
        })
    })

    form.section("", () => {
        form.output(html`
            <b>E6. Difficultés de sommeil</b> (difficulté à s’endormir ou à demeurer endormi, ou sommeil agité)<br/><br/>
            <i>Au cours du mois dernier, avez-vous eu des difficultés à vous endormir ou à demeurer endormi(e) ?<br/>
            Quelles sont ces difficultés ? (Combien de temps mettez-vous à vous endormir ? Combien de fois vous réveillez-vous au cours d’une nuit ? Vous réveillez-vous plus tôt que vous ne le souhaiteriez ?)</i>
        `)
        
                    form.textArea("texte21", "TEXTE LIBRE")


        form.number("e6_dodo1", "Au total, combien d'heures dormez-vous par nuit ?", {
            suffix: "h",
            min: 0, max: 12
        })
        form.sameLine(true); form.number("e6_dodo2", "Combien d'heures devriez-vous dormir par nuit ?", {
            suffix: "h",
            min: 0, max: 12
        })

        form.block(() => {
            form.enum("e6_sommeil", "Difficultés de concentration", [
                [1, "Minimales"],
                [2, "Clairement présentes"],
                [3, "Présentes"],
                [4, "Extrêmes"]
            ])
            form.number("e6_n", "Combien de fois au cours du mois dernier ?")
            form.enum("e6_rel", "Relation au traumatisme", [
                [3, "Définitif"],
                [2, "Probable"],
                [1, "Improbable"]
            ], {
                help: "Est-ce que ces difficultés de sommeil ont débuté ou se sont aggravées après l’événement ? (Pensez-vous que cela soit relié à cet événement ? En quoi ?)"
            })
        })

        form.sameLine(true); form.enumRadio("*e6", "Cotation du critère E6", [
            [0, "0 = Absent"],
            [1, "1 = Léger / sous le seuil"],
            [2, "2 = Modéré / au seuil"],
            [3, "3 = Sévère / élevé"],
            [4, "4 = Extrême / incapacitant"]
        ], {
            help: [
                "Points-clés de cotation = fréquence et intensité des difficultés de sommeil",
                "Modéré = au moins 2 fois par mois / difficultés de sommeil clairement présentes, avec des difficultés évidentes à s’endormir ou à demeurer endormi (de 30 à 90 minutes de perte de sommeil)",
                "Sévère = au moins 2 fois par semaine / difficultés de sommeil prononcées, avec difficultés considérables à s’endormir ou à demeurer endormi (de 1,5 à 3 heures de perte de sommeil)"
            ]
        })
    })
})

form.section("F. Durée de la perturbation (Critères B, C, D, E) est plus de 1 mois", () => {
    form.section("", () => {
        form.output(html`
            <b>F1. Début des symptômes</b><br/><br/>
            Si non clair ; <i>Quand avez-vous commencé à avoir la plupart des symptômes (de TSPT) dont vous m’avez parlé ? (Combien de temps après l’événement traumatique ont-ils débuté ? Plus de 6 mois ?)</i><br/>
            Si non clair ; <i>Après l’événement, combien de mois se sont écoulés avant l’apparition des symptômes ?</i>
        `)
        
                    form.textArea("texte22", "TEXTE LIBRE")


        form.number("f1_mois", "Mois écoulés avant symptômes :", {
            suffix: "mois",
            min: 0
        })
        form.sameLine(true); form.binary("*f1", "Début différé ≥ 6 mois ?")
    })

    form.section("", () => {
        form.output(html`
            <b>F2. Durée des symptômes</b><br/><br/>
            Si non clair ; <i>Depuis quand ces symptômes (de TSPT) durent-ils (en mois) ?</i>
        `)

        form.number("f2_mois", "Durée des symptômes :", {
            suffix: "mois",
            min: 0
        })
        form.sameLine(true); form.binary("*f2", "Durée ≥ 1 mois ?")
    })
})

form.section("G. La  perturbation  cause  une  détresse  cliniquement  significative  ou  une  déficience  du fonctionnement social ou occupationnel ou d’une autre dimension importante", () => {
    form.enumRadio("*g1", "G1. Détresse subjective", [
        [0, "Aucune"],
        [1, "Légère, détresse minime"],
        [2, "Modérée, détresse évidante mais encore gérable"],
        [3, "Sévère, détresse considérable"],
        [4, "Extrême, détresse incapacitante"]
    ], {
        help: [
            "En général, au cours du mois dernier, jusqu’à quel point avez-vous été dérangé(e) par ces symptômes (de TSPT) dont vous m’avez parlé ?",
            "Considérez la détresse rapportée à d’autres items"
        ]
    })

    form.enumRadio("*g2", "G2. Dysfonctionnement social", [
        [0, "Aucune"],
        [1, "Légèrement, dysfonctionnement social minime"],
        [2, "Modérément, dysfonctionnement social évident mais avec plusieurs aspects intacts"],
        [3, "Sévèrement, dysfonctionnement social marqué, avec peu d'aspects intacts"],
        [4, "Extrêmement, peu ou aucun fonctionnement social"]
    ], {
        help: [
            "Au cours du mois dernier, est-ce que ces symptômes (de TSPT) ont affecté vos relations aux autres ? En quoi ?",
            "Considérez la déficience du fonctionnement social rapportée à d’autres items"
        ]
    })

    form.enumRadio("*g3", "G3. Dysfonctionnement occupationnel ou autre", [
        [0, "Aucun effet négatif"],
        [1, "Légèrement, dysfonctionnement occupationnel/autre minime"],
        [2, "Modérément, dysfonctionnement occupationnel/autre évident, avec plusieurs aspects intacts"],
        [3, "Sévèrement, dysfonctionnement occupationnel/autre marqué, avec peu d'aspects intacts"],
        [4, "Extrêmement, peu ou aucun fonctionnement occupationnel/autre"]
    ], {
        help: [
            "Travaillez-vous actuellement ? Si oui ; Au cours du mois dernier, est-ce que ces symptômes (de TSPT) ont affecté votre travail ou votre capacité à travailler ? En quoi ? (Considérez l’histoire occupationnelle rapportée, incluant le nombre et la durée des emplois, ainsi que la qualité des relations au travail. Si le fonctionnement pré-morbide est  non  clair,  questionnez  sur  l’expérience  de  travail  pré-traumatique.  Pour  les  enfants  et  les  adolescents, évaluez la performance scolaire et la possibilité d’un trouble de comportement pré-traumatique.)",
            "Si non ; Ces symptômes (de TSPT), ont-ils affecté une autre partie importante de votre vie ? En quoi ? (Suggérez, si approprié, exemples tels que le parentage, le travail de maison, les études, le bénévolat, etc.)"
        ]
    })

    form.enumRadio("*validite", "Validité globale", [
        [0, "Excellent, aucune raison de soupçonner des réponses invalides"],
        [1, "Bonne, présence de facteurs pouvant affecter la validité"],
        [2, "Modérée, présence de facteurs pouvant définitivement réduire la validité"],
        [3, "Pauvre, validité substantiellement réduite"],
        [4, "Invalidité des réponses, état mental sévèrement altéré ou possibilité d’une intention de fausser positivement ou négativement les réponses"]
    ], {
        help: "Estimez la validité globale des réponses. Considérez la présence de facteurs tels que le désir de conformité à l’évaluateur,  l’état  mental  (des  difficultés  de  concentration,  la  compréhension  des  items,  une  certaine dissociation) et la présence évidente d’une exagération ou d’une minimisation des symptômes."
    })

    form.enumRadio("*severite", "Sévérité globale", [
        [0, "Aucun effet négatif"],
        [1, "Légèrement, dysfonctionnement occupationnel/autre minime"],
        [2, "Modérément, dysfonctionnement occupationnel/autre évident, avec plusieurs aspects intacts"],
        [3, "Sévèrement, dysfonctionnement occupationnel/autre marqué, avec peu d’aspects intacts"],
        [4, "Extrêmement, peu ou aucun fonctionnement occupationnel/autre"]
    ], {
        help: [
            "Estimez la sévérité générale des symptômes de TSPT. Considérez le niveau de détresse subjective et de dysfonctionnement, les observations comportementales en entrevue et le style de réponses."
        ]
    })

    form.enumRadio("*amelioration", "Amélioration globale", [
        [0, "Asymptomatique"],
        [1, "Amélioration considérable"],
        [2, "Amélioration modérée"],
        [3, "Amélioration légère"],
        [4, "Aucune amélioration"],
        [5, "Information insuffisante"]
    ], {
        help: "Cotez l’amélioration générale depuis la dernière cotation, ou le degré de changement"
    })
    
                form.textArea("texte26", "AUTRES REMARQUES")

})

form.section("Dissociation", () => {
    form.output(html`
        Spécifiez s’il y a des symptômes dissociatifs : les symptômes de l’individu qui rencontre les  critères d’un TSPT et, de plus, en réponse à l’événement traumatique, l’individu fait l'expérience, de manière persistante ou récurrente, d’au moins 1 des symptômes dissociatifs suivants :
    `)

    form.section("", () => {
        form.output(html`
            <b>Dépersonnalisation : avoir l’impression, de manière persistante ou récurrente, d’être détaché de ses propres pensées ou de son propre corps, comme si on l’observait de l’extérieur</b><br/>
            <i>(impression d’être dans un rêve, de non-réalité de soi ou de son corps ou que le temps se déroule plus lentement)</i><br/><br/>
            <i>Au cours du mois dernier, y a-t-il eu des moments lors desquels vous avez eu l’impression d’être séparé(e) de vous-même, comme si vous vous observiez de l’extérieur ou vous observiez vos pensées ou sentiments comme s’ils appartenaient à un autre ?</i><br/>
            Si non ; <i>Avez-vous eu l’impression d’être dans un rêve, même si vous étiez éveillé(e) ? L’impression que quelque chose en vous n’était pas réel ? L’impression que le temps se déroulait lentement ? Pouvez-vous m’en dire plus ? Quelle est l’intensité de cette impression ? (Perdez-vous le fil d’où vous êtes réellement ou de ce qui se déroule en fait ?) Que faites-vous quand ça arrive ? (Les autres, remarquent-ils votre comportement ? Que disent-ils ?) Combien de temps cela dure-t-il ?</i>
        `)
        
                    form.textArea("texte23", "TEXTE LIBRE")


        form.block(() => {
            form.enum("deper_dissoc", "Niveau de dissociation", [
                [1, "Minimale"],
                [2, "Clairement présente"],
                [3, "Présente"],
                [4, "Extrême"]
            ], {
                help: "Si non clair ; Est-ce que cela était dû à l’alcool ou aux drogues ? Était-ce lié à une condition médicale (telle que l’épilepsie) ? (Cotez 0=Absent si cela est dû aux effets d’une substance ou d’une condition médicale.)"
            })
            form.number("deper_n", "Combien de fois cela est-il arrivé au cours du mois dernier ?")
        })

        form.sameLine(true); form.enumRadio("*deper", "Cotation de la dépersonnalisation", [
            [0, "0 = Absent"],
            [1, "1 = Léger / sous le seuil"],
            [2, "2 = Modéré / au seuil"],
            [3, "3 = Sévère / élevé"],
            [4, "4 = Extrême / incapacitant"]
        ], {
            help: [
                "Points-clés de cotation = fréquence et intensité de la dissociation",
                "Modéré = au moins 2 fois par mois / qualité dissociative clairement présente mais temporaire, conservant certains aspects du sens de soi et de la conscience de l’environnement",
                "Sévère = au moins 2 fois par semaine / qualité dissociative prononcée, avec un sens marqué de détachement et d’irréalité"
            ]
        })
    })

    form.section("", () => {
        form.output(html`
            <b>Déréalisation : Avoir l’impression, persistante ou récurrente, d’irréalité de l’environnement</b><br/>
            <i>(réalité autour de l’individu vécue comme irréelle, onirique, distante ou déformée)</i><br/><br/>
            <i>Au cours du mois dernier, y a-t-il eu des moments lors desquels vous avez eu l’impression que les choses autour de vous étaient irréelles ou vraiment étranges ou inhabituelles ?</i><br/>
            Si non ; <i>Est-ce que les choses autour de vous vous semblaient être comme dans un rêve ou une scène de film ? Vous semblaient-elles distantes ou inhabituelles ? Pouvez-vous m’en dire plus ? Quelle est la force de cette impression ? (Perdez-vous le fil d’où vous êtes réellement ou de ce qui se déroule ?) Que faites-vous quand ça arrive ? (Les autres, remarquent-ils votre comportement ? Que disent-ils ? Combien de temps cela dure-t-il ?)</i>
        `)
        
                    form.textArea("texte24", "TEXTE LIBRE")

        form.block(() => {
            form.enum("derea_dissoc", "Niveau de dissociation", [
                [1, "Minimale"],
                [2, "Clairement présente"],
                [3, "Présente"],
                [4, "Extrême"]
            ], {
                help: "Si non clair ;  Est-ce que cela était dû à l’alcool ou aux drogues ? Qu’en est-il d’une condition médicale telle que l’épilepsie ? (Cotez 0=Absent si cela est dû aux effets d’une substance ou d’une condition médicale)"
            })
            form.number("derea_n", "Combien de fois cela est-il arrivé au cours du mois dernier ?")
        })

        form.sameLine(true); form.enumRadio("*derea", "Cotation de la déréalisation", [
            [0, "0 = Absent"],
            [1, "1 = Léger / sous le seuil"],
            [2, "2 = Modéré / au seuil"],
            [3, "3 = Sévère / élevé"],
            [4, "4 = Extrême / incapacitant"]
        ], {
            help: [
                "Points-clés de cotation = fréquence et intensité de la dissociation ",
                "Modéré = au moins 2 fois par mois / qualité dissociative clairement présente mais temporaire, conservant la conscience de certains aspects de l’environnement",
                "Sévère = au moins 2 fois par semaine / qualité dissociative prononcée, avec un sens marqué d’irréalité"
            ]
        })
    })
})

form.section("Cotation", () => {
    form.pushOptions({
        compact: true,
        text: value => {
            if (typeof value === "number") {
                return ["Non", "Oui", "Probablement"][value]
            } else {
                return value
            }
        }
    })

    function evalCrit(score) {
        if (score == null) {
            return null
        } else if (score >= 2) {
            return 1
        } else {
            return 0
        }
    }

    form.section("A. Exposition à la mort, actuelle ou menaces, blessures sérieuses, ou violence sexuelle, etc.", () => {
        form.calc("_a", "Le critère A est-il rempli ?", values.a)
    })

    form.section("B. Symptômes intrusifs (au moins 1)", () => {
        form.calc("_b1", "B1 – Souvenirs intrusifs", evalCrit(values.b1))
        form.calc("_b2", "B2 – Rêves troublants", evalCrit(values.b2))
        form.calc("_b3", "B3 – Réactions dissociatives", evalCrit(values.b3))
        form.calc("_b4", "B4 – Détresse psychologique / stimuli post-traumatiques", evalCrit(values.b4))
        form.calc("_b5", "B5 – Réactions physiologiques / stimuli post-traumatiques", evalCrit(values.b5))
    })
    form.sameLine(true); form.section("C. Symptômes d’évitement (au moins 1)", () => {
        form.calc("_c1", "C1 – Évitement de souvenirs, pensées et émotions", evalCrit(values.c1))
        form.calc("_c2", "C2 – Évitement de lieux et de personnes", evalCrit(values.c2))
    })

    form.section("D. Symptômes cognitifs et de l’humeur (au moins 2)", () => {
        form.calc("_d1", "D1 – Amnésie vis-à-vis des aspects de l’événement", evalCrit(values.d1))
        form.calc("_d2", "D2 – Croyances ou attentes négatives exagérées", evalCrit(values.d2))
        form.calc("_d3", "D3 – Cognitions faussées menant au blâme", evalCrit(values.d3))
        form.calc("_d4", "D4 – État émotionnel négatif persistant", evalCrit(values.d4))
        form.calc("_d5", "D5 – Intérêt ou participation diminuée à des activités", evalCrit(values.d5))
        form.calc("_d6", "D6 – Détachement ou aliénation", evalCrit(values.d6))
        form.calc("_d7", "D7 – Incapacité à ressentir des émotions positives", evalCrit(values.d7))
    })
    form.sameLine(true); form.section("E. Symptômes d’activation et de réactivité (au moins 2)", () => {
        form.calc("_e1", "E1 – Comportement irritable et colères", evalCrit(values.e1))
        form.calc("_e2", "E2 – Comportement dangereux ou autodestructeur", evalCrit(values.e2))
        form.calc("_e3", "E3 – Hypervigilance", evalCrit(values.e3))
        form.calc("_e4", "E4 – Réactions de sursaut exagérées", evalCrit(values.e4))
        form.calc("_e5", "E5 – Difficultés de concentration", evalCrit(values.e5))
        form.calc("_e6", "E6 – Problèmes de sommeil", evalCrit(values.e6))
    })

    form.section("F. Durée de la perturbation", () => {
        form.calc("_f2", "Durée de la perturbation ≥ 1 mois", values.f2)
    })
    form.sameLine(true); form.section("G. Détresse ou dysfonctionnement (au moins 1)", () => {
        form.calc("_g1", "G1 – Détresse subjective", evalCrit(values.g1))
        form.calc("_g2", "G2 – Dysfonctionnement social", evalCrit(values.g2))
        form.calc("_g3", "G3 – Dysfonctionnement occupationnel ou autre", evalCrit(values.g3))
    })

    form.section("Côtes globales", () => {
        form.calc("_validite", "Validité", values.validite)
        form.calc("_severite", "Sévérité", values.severite)
        form.calc("_amelioration", "Amélioration", values.amelioration)
    })
    form.sameLine(true); form.section("Symptômes dissociatifs", () => {
        form.calc("_deper", "Dépersonnalisation", evalCrit(values.deper))
        form.calc("_derea", "Déréalisation", evalCrit(values.derea))
    })

    let a = values._a > 0 // XXX: Que faire de la réponse "probablement"?
    let b = (values._b1 + values._b2 + values._b3 + values._b4 + values._b5) >= 1
    let c = (values._c1 + values._c2) >= 1
    let d = (values._d1 + values._d2 + values._d3 + values._d4 + values._d5 + values._d6 + values._d7) >= 2
    let e = (values._e1 + values._e2 + values._e3 + values._e4 + values._e5 + values._e6) >= 2
    let f = !!values._f2
    let g = (values._g1 + values._g2 + values._g3) >= 1

    form.section("Diagnostic de TSPT", () => {
        let tspt = form.isValid() ? (a && b && c && d && e && f && g) : undefined
        form.calc("tspt", "TSPT présent", 0 + tspt, { help: "Avec tous les critères de A à G" })

        let severite = values.b1 + values.b2 + values.b3 + values.b4 + values.b5 +
                       values.c1 + values.c2 + values.d1 + values.d2 + values.d3 +
                       values.d4 + values.d5 + values.d6 + values.d7 +
                       values.e1 + values.e2 + values.e3 + values.e4 +
                       values.e5 + values.e6
        if (Number.isNaN(severite)) {
            form.sameLine(true); form.calc("tspt2", "Score de sévérité", null, {
                disabled: tspt == null
            })
        } else if (severite / 20 >= 3) {
            form.sameLine(true); form.calc("tspt2", "Score de sévérité", `Extrême (${(severite / 20).toFixed(1)})`, {
                disabled: tspt == null
            })
        } else if (severite / 20 >= 2) {
            form.sameLine(true); form.calc("tspt2", "Score de sévérité", `Sévère (${(severite / 20).toFixed(1)})`, {
                disabled: tspt == null
            })
        } else if (severite / 20 >= 1) {
            form.sameLine(true); form.calc("tspt2", "Score de sévérité", `Modérée (${(severite / 20).toFixed(1)})`, {
                disabled: tspt == null
            })
        } else {
            form.sameLine(true); form.calc("tspt2", "Score de sévérité", `Légère (${(severite / 20).toFixed(1)})`, {
                disabled: tspt == null
            })
        }

        let dissoc = form.isValid() ? (values._deper || values._derea) : undefined
        form.calc("dissoc", "Avec symptômes dissociatifs", 0 + dissoc)

        let diff6 = form.isValid() ? values.f1 : undefined
        form.calc("diff6", "Différé ≥ 6 mois", diff6)
    })
        
        
        form.textArea("texte25", "AUTRES REMARQUES")

}, { hidden: goupile.isLocked() })