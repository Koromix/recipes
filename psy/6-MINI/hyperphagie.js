let fail = false
function disable_if(cond) {
    if (cond) {
        form.pushOptions({disabled: true})
        fail = true
    }
}

form.section("Anorexie et boulimie", () => {
    form.binary("*MB1", html`Les symptômes du patient correspondent-ils à ceux d'une anorexie mentale ?`, { value: values.Lconclusion })
    disable_if(values.MB1 == 1)
    form.binary("*MB2", html`Les symptômes du patient correspondent-ils à ceux d'une boulimie`, { value: values.Mconclusion1 })
    disable_if(values.MB2 == 1)

    form.pushOptions({ hidden: true })

    form.calc("MB3", html`M2 est-elle côté OUI ?`, values.M2, {
        text: value => value ? "Oui" : "Non"
    })
    disable_if(values.MB3 == 0)
    form.sameLine(true); form.calc("MB4", html`M3 est-elle côté OUI ?`, values.M3, {
        text: value => value ? "Oui" : "Non"
    })
    disable_if(values.MB4 == 1)
    form.sameLine(true); form.calc("MB5", html`M4 est-elle côté OUI ?`, values.M4, {
        text: value => value ? "Oui" : "Non"
    })
    disable_if(values.MB5 == 0)
})
if (fail)
    form.pushOptions({disabled: true})

form.section("Au cours des 3 derniers mois, pendant ces crises de frénésie...", () => {
    form.binary("*MB6a", html`Avez-vous mangé plus que d'habitude ?`)
    form.binary("*MB6b", html`Avez-vous trop mangé, au point de vous sentir physiquement mal ?`)
    form.binary("*MB6c", html`Avez-vous mangé de grandes quantités de nourriture sans avoir faim ?`)
    form.binary("*MB6d", html`Avez-vous mangé seul(e) car vous vous sentiez gêné(e) par la quantité de nourriture que vous mangiez ?`)
    form.binary("*MB6e", html`Vous êtes-vous senti(e) coupable, déprimé(e) ou vous êtes-vous dégouté(e) après une crise de frénésie alimentaire ?`)

    let mb6 = values.MB6a + values.MB6b + values.MB6c + values.MB6d + values.MB6e
    disable_if(!Number.isNaN(mb6) && mb6 < 3)

    form.binary("*MB7", html`Vos crises de frénésie alimentaire vous font-elles beaucoup souffrir ?`)
    disable_if(values.MB7 == 0)

    form.number("MB8_1", html`Nombre de crises de frénésie alimentaire par semaine ?`, {
        suffix: " par semaine",
        min: 0, max: 20
    })
    form.number("MB8_2", html`Nombre de jours avec des crises de frénésie alimentaire par semaine ?`, {
        suffix: " par semaine",
        min: 0, max: 7
    })
})
if (fail)
    form.pushOptions({disabled: true})

form.section("Évaluation", () => {
    form.calc("MBconclusion", "Hyperphagie boulimique actuelle", form.isValid() ? 1 - fail : null, {
        text: value => value ? "Oui" : "Non",
        disabled: false
    })
    form.pushOptions({disabled: !values.MBconclusion})
    
    let severite
    if (values.MB8_1 >= 14) {
        severite = 4
    } else if (values.MB8_1 >= 8) {
        severite = 3
    } else if (values.MB8_1 >= 4) {
        severite = 2
    } else if (values.MB8_1 >= 1) {
        severite = 1
    }
    form.sameLine(true); form.enumRadio("MBseverite", "Degré de sévérité", [
        [1, "Léger (1 à 3 épisodes par semaine)"],
        [2, "Modéré (4 à 7 épisodes par semaine)"],
        [3, "Sévère (8 à 13 épisodes par semaine)"],
        [4, "Extrême (14 épisodes par semaine ou plus)"]
    ], {
        value: severite,
        readonly: true
    })
})
