let fail = false
function disable_if(cond) {
    if (cond) {
        form.pushOptions({disabled: true})
        fail = true
    }
}

form.section("Pensées obsessionnelles", () => {
    form.binary("*G1a", html`Au cours du mois écoulé, avez-vous été pertubé(e) par des pensées, des pulsions ou des images récurrentes, détestables, inappropriées, intrusives ou angoissantes ?`, {
        help: "Par exemple, la pensée que vous étiez sale ou contaminé(e) ou porteur(se) de microbes, ou la peur de contaminer les autres, ou la peur de faire du mal à quelqu'un bien que cela vous perturbe ou vous tourmente, ou la peur d'agir de manière impulsive ou la peur ou l'idée superstitieuse que quelque chose se passe mal par votre faute ou être envahi(e) par des pensées, images ou pulsions à caractère sexuel ou religeux."
    })
    if (values.G1a == 0)
        form.pushOptions({disabled: true})
    form.binary("*G1b", html`Au cours du mois écoulé, avez-vous tenté de réprimer ces pensées, pulsions ou images, de les neutraliser ou de les limites en pensant à autre chose ou en faisant autre chose ?`, {
        help: "Ne pas prendre en compte les préoccupations excessives concernant les problèmes de la vie réelle, ne pas prendre en compte les obsessions directement liées à une accumulation compulsive, une trichotillomanie, se gratter la peau, une dysmorphophobie corporelle, aux troubles du comportement alimentaire, à des déviations sexuelles, à une addiction au jeu ou à un abus de drogue ou d'alcool car le patient peut en tirer un certain plaisir et vouloir y résister à cause de leurs conséquences négatives."
    })
    if (values.G1b == 0)
        form.pushOptions({disabled: true})
    form.binary("*G2", html`Ces pensées, pulsions ou images revenaient-elles sans cesse même lorsque vous essayiez de les ignorer ou de vous en débarasser ?`)
})

form.section("Comportements compulsifs", () => {
    form.binary("*G3a", html`Au cours du mois écoulé, avez-vous éprouvé le besoin de faire certaines choses de manière répétée, en réponse à une obsession ou à une règle rigide, comme vous laver ou faire le ménage de manière excessive, compter ou vérifier les mêmes choses à de nombreuses reprises, répéter certaines actions ou ranger des objets, ou d'autres rituels superstitieux ?`)
    if (values.G3a == 0)
        form.pushOptions({disabled: true})
    form.binary("*G3b", html`Ces rituels sont-ils accomplis afin d'éviter ou de réduire un sentiment d'anxiété ou de détresse, ou pour empêcher que quelque chose de négatif se produise, et sont-ils excessifs ou déraisonnables ?`)
})

let test = (values.G1a == 1 && values.G1b == 1 && values.G2 == 1) ||
           (values.G3a == 1 && values.G3b == 1)
disable_if(!test)

form.section("Retentissement", () => {
    form.binary("*G4", html`Au cours du mois écoulé, ces pensées obsessionnelles et/ou ces comportements compulsifs ont-ils entrainé une détresse significative ou interféré dans votre capacité à fonctionner chez vous, à votre travail, à l'école, socialement ou dans vos relations avec les autres, ou d'une autre manière significative, ou duraient-ils plus d'une heure par jour ?`)
    disable_if(values.G4 == 0)
})
if (fail)
    form.pushOptions({disabled: true})

form.section("Évaluation", () => {
    form.calc("Gconclusion", "T.O.C. actuel", form.isValid() ? 1 - fail : null, {
        text: value => value ? "Oui" : "Non",
        disabled: false
    })
    form.pushOptions({disabled: !values.Gconclusion})
    form.sameLine(true); form.enumRadio("Ginsight", "Degré d'insight", [
        [1, "Bon ou juste"],
        [2, "Médiocre"],
        [3, "Absent"],
        [4, "Trouble délirant"]
    ])
    form.sameLine(true); form.binary("Gtic", "Lié à un TIC")
})

if (values.Gconclusion)
form.section("Eliminer une cause organique", () => {
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
})
