form.section("", () => {
    form.output(html`
        <p>Pour toutes les questions de ce module, en cas de réponse positive, demander un exemple, ne côtez OUI <b>que si les exemples montrent clairement une distorsion de la pensée ou de la perception ou s'ils sont culturellement inappropriés</b>.
        <p>Ce module nécessite de l'expérience.
    `)
})

form.section("À présent, je vais vous poser des questions sur des expériences inhabituelles ou bizarres qui peuvent survenir chez certaines personnes...", () => {
    form.binary("*K1a", html`Avez-vous déjà eu l'impression que quelqu'un vous espionnait, ou complotait contre vous, ou bien encore que l'on essayait de vous faire du mal ?`, {
        help: "Demandez des exemples pour éliminer un harcèlement réel."
    })
    form.sameLine(true); form.textArea("K1a_1", "Exemples donnés par le patient :")
    if (values.K1a) form.section("", () => {
        form.binary("*K1b", html`Si oui, avez-vous actuellement cette impression ?`)
    })
    form.binary("*K2a", html`Avez-vous déjà eu l'impression que l'on pouvait lite ou entendre vos pensées ou que vous pouviez lire ou entendre les pensées des autres ?`)
    if (values.K2a) form.section("", () => {
        form.binary("*K2b", html`Si oui, avez-vous actuellement cette impression ?`)
    })
    form.binary("*K3a", html`Avez-vous déjà cru que quelqu'un ou que quelque chose d'extérieur à vous introduisait dans votre tête des pensées qui n'étaient pas les vôtres ou vous faisait agir d'une façon inhabituelle pour vous ? Avez-vous déjà eu l'impression d'être possédé(e) ?`, {
        help: "Clinicien : demandez des exemples et ignorez ceux qui ne sont pas de nature psychotique."
    })
    form.sameLine(true); form.textArea("K3a_1", "Exemples donnés par le patient :")
    if (values.K3a) form.section("", () => {
        form.binary("*K3b", html`Si oui, avez-vous actuellement cette impression ?`)
    })
    form.binary("*K4a", html`Avez-vous déjà eu l'impression que l'on vous envoyait des messages spéciaux à travers la télévision, la radio, internet, les livres ou les jourraux et magazines, ou que certaines personnes que vous ne connaissiez pas personnellement s'intéressaient particulièrement à vous ?`)
    if (values.K4a) form.section("", () => {
        form.binary("K4b", html`Si oui, avez-vous actuellement cette impression ?`)
    })
    form.binary("*K5a", html`Vos proches ont-ils déjà jugé certaines de vos idées comme étranges ou inhabituelles ?`, {
        help: "Évaluateur : demandez des exemples, ne côtez OUI que si le patient présente clairement des idées délirantes non explorées par les questions K1 à K4, comme des idées délirantes de religion, de mort, de maladie, ou somatiques, de grandeur, de jalousie ou de culpabilité, d'échec, d'inadéquation, de ruine ou de destitution, ou encore nihilistes."
    })
    if (values.K4a) form.section("", () => {
        form.binary("*K5b", html`Si oui, actuellement, considèrent-ils vos idées comme étranges ou inhabituelles ?`)
    })
    form.binary("*K6a", html`Vous est-il déjà arrivé d'entendre des choses que d'autres personnes ne pouvaient pas entendre, comme des voix ?`)
    if (values.K6a) form.section("", () => {
        form.binary("K6a_1", html`Si oui à la <u>question précédente</u>, ces voix commentaient-elles vos pensées ou vos actes ou entendiez-vous deux ou plusieurs voix parler entre elles ?`)
        form.binary("K6b", html`Avez-vous entendu des sons/des voix au cours du mois écoulé ?`)
        if (values.K6b) {
            form.binary("K6b_1", html`Si oui à la <u>question précédente</u> : ces voix commentaient-elles vos pensées ou vos actes ou entendiez-vous deux ou plusieurs voix parler entre elles ?`)
        }
    })
    form.binary("*K7a", html`Vous est-il déjà arrivé, alors que vous étiez éveilé(e), d'avoir des visions ou de voir des choses que d'autres personnes ne pouvaient pas voir ?`, {
        help: "Clinicien : vérifiez si elles sont culturellement inappropriées."
    })
    form.sameLine(true); form.textArea("K7a_1", "Exemples donnés par le patient :")
    if (values.K7a) form.section("", () => {
        form.binary("*K7b", html`Si oui, cela vous est-il arrivé au cours du mois écoulé ?`)
    })
})

form.section("Observation du clinicien", () => {
    let choices = [
        [1, "Oui"],
        [0, "Non"],
        [-1, "Non évaluable"]
    ]
    form.enum("K8a", html`Le patient a-t-il présenté par le passé un discours incohérent ou désorganisé ou décousu, ou un net relâchement des associations ?`, choices)
    form.binary("K8b", html`Actuellement, le patient présente-t-il un discours incohérent ou désorganisé ou décousu, ou un net relâchement des associations ?`)
    form.enum("K9a", html`Le patient a-t-il déjà présenté par le passé un comportement désorganisé ou catatonique ?`, choices)
    form.binary("K9b", html`Actuellement, le patient présente-t-il un comportement désorganisé ou catatonique ?`)
    form.enum("K10a", html`Le patient a-t-il déjà présenté par le passé des symptômes négatifs, comme une baisse considérables de l'expression émotionnelle, un affect abrasé, une pauvreté du discours (alogie) ou une incapacité à entreprendre ou mener à bien des activités (avolution) ?`, choices)
    form.binary("K10b", html`Des symptômes négatifs typiquement schizophréniques sont-ils proéminents pendant l'entretien, par exemple une baisse considérables de l'expression émotionnelle, un affect abrasé, une pauvreté du discours (alogie), une incapacité à entreprendre ou mener à bien des activités (avolution) ?`, choices)
})

/*form.section("Évaluation", () => {
    let score = values.K1a + values.K2a + values.K3a + values.K4a + values.K5a +
                values.K6a + values.K7a
    form.output("MODULE NON TERMINE")
    // XXX: Compléter ce module ++
})*/

//if (values.Gconclusion)
/*form.section("Eliminer une cause organique", () => {
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
})*/
