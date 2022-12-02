let fail = false
function disable_if(cond) {
    if (cond) {
        form.pushOptions({disabled: true})
        fail = true
    }
}

form.section("Au cours du mois écoulé", () => {
    form.binary("*B1", html`Avez-vous eu un accident ?`, {
        help: "Le terme « accident » inclut la prise accidentelle d'une quantité excessive de votre traitement."
    })
    if (values.B1) form.section("", () => {
        form.binary("*B1a", html`Avez-vous planifié ou eu l'intention de vous faire du mal dans un accident, soit en ne cherchant pas à éviter un risque, soit en provoquant sciemment l'accident ?`)
        if (values.B1a) {
            form.binary("*B1b", html`Avez-vous eu l'intention de mourir dans un accident ?`)
        }
    })
    form.binary("*B2", html`Avez-vous pensé (même momentanément) qu'il vaudrait mieux que vous soyez mort(e), ou souhaité être mort(e) ou ressenti le besoin d'être mort(e) ?`)
    form.binary("*B3", html`Avez-vous pensé (même momentanément) à vous blesser ou à vous faire du mal avec au moins une légère intention de mourir ou conscience que vous pourriez en mourir, ou avez-vous pensé au suicide (c'est-à-dire à vous tuer) ?`)
    if (values.B2 || values.B3) form.section("", () => {
        form.enumRadio("*B3_1", "Si oui à l'une des deux questions précédentes, demandez la fréquence :", [
            [1, "Occasionnellement"],
            [2, "Souvent"],
            [3, "Très souvent"]
        ])
        form.enumRadio("*B3_2", "Si oui à l'une des deux questions précédentes, demandez l'intensité :", [
            [1, "Légère"],
            [2, "Modérée"],
            [3, "Très sévère"]
        ])
    })
    form.binary("*B4", html`Avez-vous entendu une voix ou des voix vous ordonnant de vous tuer, ou avez-vous fait des rêves portant d'une manière ou d'une autre sur le suicide ?`)
    if (values.B4) form.section("", () => {
        form.binary("*B4_1", html`S'agissait-il d'une ou de plusieurs voix ?`)
        form.binary("*B4_2", html`S'agissait-il d'un rêve ?`)
    })
    form.binary("*B5", html`Aviez-vous à l'esprit une méthode pour vous suicider (c'est-à-dire comment) ?`)
    form.binary("*B6", html`Aviez-vous à l'esprit un moyen pour vous suicider (c'est-à-dire avec quoi) ?`)
    form.binary("*B7", html`Aviez-vous à l'esprit un endroit où tenter de vous suicider (c'est-à-dire le lieu) ?`)
    form.binary("*B8", html`Aviez-vous à l'esprit une date/une période pour tenter de vous suicider (c'est-à-dire quand) ?`)
    form.binary("*B9", html`Avez-vous pensé à des choses que vous aimeriez terminer avant d'essayer de vous tuer (par ex., rédiger une lettre de suicide) ?`)
    form.binary("*B10", html`Avez-vous eu l'intention de passer à l'acte et de vous tuer ?`)
    if (values.B10) form.section("", () => {
        form.multiCheck("*B10_1", "Si oui, cochez l'une de ces options, ou les deux :", [
            [1, "Avez-vous eu l'intention de l'intention de passer à l'acte sans attendre ?"],
            [2, "Avez-vous eu l'intention de l'intention de passer à l'acte un jour ou l'autre (dans le futur) ?"]
        ])
    })
    form.binary("*B11", html`Avez-vous eu l'intention de mourir d'un acte suicidaire ?`)
    if (values.B11) form.section("", () => {
        form.multiCheck("*B11_1", "Si oui, cochez l'une de ces options, ou les deux :", [
            [1, "Avez-vous eu l'intention de mourir par suicide sans attendre ?"],
            [2, "Avez-vous eu l'intention de mourir par suicide un jour ou l'autre (dans le futur) ?"]
        ])
    })
    form.binary("*B12", html`Avez-vous ressenti le besoin ou l'urgence de vous tuer ou de planifier votre suicide sans trop attendre ?`)
    if (values.B12) form.section("", () => {
        form.multiCheck("*B12_1", "Si oui, cochez l'une de ces options, ou les deux :", [
            [1, "Était-ce le besoin de vous tuer ?"],
            [2, "Était-ce le besoin de planifier votre suicide ?"]
        ])
        form.multiCheck("*B12_2", "Si oui, cochez l'une de ces options, ou les deux :", [
            [1, "Était-ce en grande partie sans raison précise ?"],
            [2, "Y avait-il une ou des raisons à cela ?"]
        ], {
            help: "Pour évaluer si c'était en grande partie sans cause précise, demandez : « Cinq minutes avant cette pulsion, auriez-vous pu prévoir qu'elle allait se produire à ce moment-là ? »"
        })
    })
    form.binary("*B13", html`Avez-vous eu du mal à résister ces pulsions ?`)
    form.binary("*B14", html`Avez-vous pris des mesures concrètes pour vous préparer à faire une tentative de suicide dans laquelle vous vous attendiez à mourir ou en aviez l'intention (y compris tout ce que vous avez fait ou volontairement non fait qui vous rapproche d'une tentative de suicide) ?`, {
        help: "Cela inclut les fois où vous vous apprêtiez à vous suicider, mais avez été interrompu(e) ou vous êtes arrêté(e) avant de vous faire du mal."
    })
    if (values.B14) form.section("", () => {
        form.binary("*B14a", html`Avez-vous pris des mesures concrètes pour vous préparer à vous tuer, mais sans commencer la tentative de suicide ?`)
        form.binary("*B14b", html`Avez-vous pris des mesures concrètes pour vous préparer à vous tuer, mais en vous arrêtant juste avant de vous faire du mal (« comportement préparatoire avorté ») ?`)
        form.binary("*B14c", html`Avez-vous pris des mesures concrètes pour vous préparer à vous tuer, mais vous avez été arrêté(e) par quelqu'un ou par quelque chose juste avant de vous faire du mal (« comportement préparatoire interrompu ») ?`)
    })
    form.binary("*B15", html`Vous êtes-vous délibérément blessé(e) sans avoir l'intention de vous tuer ?`)
    form.binary("*B16", html`Avez-vous fait une tentative de suicide (avez-vous essayé de vous tuer) ?`)
    if (values.B16) form.section("", () => {
        form.binary("*B16a", html`Avez-vous commencé une tentative de suicide (pour vous tuer), mais avez ensuite décidé de vous arrêter et n'êtes pas allé(e) jusqu'au bout de la tentative ?`)
        form.binary("*B16b", html`Avez-vous commencé une tentative de suicide (pour vous tuer), mais avez été interrompu(e) et n'êtes pas allé(e) jusqu'au bout de la tentative ?`)
        form.binary("*B16c", html`Avez-vous fait une tentative de suicide (pour vous tuer) exactement comme vous en aviez l'intention ?`, {
            help: "Une tentative de suicide est un acte au cours duquel vous pourriez vous blesser, et mené avec une intention, aussi minime soit-elle, de mourir."
        })
        if (values.B16c) {
            form.binary("*B16c_1", html`Espériez-vous être secouru(e)/survivre ?`)
            form.binary("*B16c_2", html`Vous attendiez vous à mourir ou aviez-vous l'intention de mourir ?`)
        }
    })

    form.section("", () => {
        form.output(html`
            <p>Combien de temps <b>passez-vous par jour</b> avec des pulsions, des pensées ou des actions suicidaires ?
        `)

        form.number("*B17_1", html`Temps passé par jour`, {
            help: "De manière générale",
            suffix: "h", max: 24
        })
        form.sameLine(); form.number("B17_1m", html`<span style="visibility: hidden;">X</span>`, {
            suffix: "m", max: 60
        })

        form.number("*B17_2", html`Temps minimal par jour`, {
            suffix: "h", max: 24
        })
        form.sameLine(); form.number("B17_2m", html`<span style="visibility: hidden;">X</span>`, {
            suffix: "m", max: 60
        })
        
        form.number("*B17_3", html`Temps maximal par jour`, {
            suffix: "h", max: 24
        })
        form.sameLine(); form.number("B17_3m", html`<span style="visibility: hidden;">X</span>`, {
            suffix: "m", max: 60
        })
    })
})

form.section("Au cours de votre vie entière", () => {
    form.binary("*B18", html`Avez-vous déjà fait une tentative de suicide (essayé de vous tuer) ?`)
    if (values.B18) form.section("", () => {
        form.number("*B18_1", html`Si oui, combien de fois ?`)
        form.enumRadio("*B18_2", html`Si oui, à quel moment remonte votre dernière tentative de suicide ?`, [
            [1, "Actuelle : au cours des 12 derniers mois"],
            [2, "En rémission précoce : de 12 à 24 mois auparavant"],
            [3, "En rémission : il y a plus de 24 mois"]
        ], {
            help: html`« Une tentative de suicide désigne tout comportement d'auto-mutilation avec au moins une intention  de mourir à l'issue de cette tentative. La preuve que l'individu a tenté de se suicider peut, du moins dans une certaine mesure, être explicite ou déduite de son comportement ou des circonstances. Par exemple, on appelle tentative de suicide tout acte ne relevant manifestement pas de l'accident ou si l'individu pense que cet acte peut être mortel, même s'il nie en avoir eu l'intention. »`
        })
        form.binary("*B18_3", "L'acte suicidaire a-t-il démarré à un moment où le sujet ne se trouvait pas dans un état de confusion ou de délire ?")
        form.binary("*B18_4", "L'acte suicidaire s'est-il produit sans motivation politique ou religieuse ?")
    })
    form.slider("*B19", html`Sur une échelle de 0 à 100 %, dans quelle proportion seriez-vous susceptible de faire une tentative de suicide au cours des 3 prochains mois ?`, {
        help: "Doublez-cliquez sur le curseur pour directement entrer une valeur numérique",
        min: 0, max: 100, prefix: "", suffix: values.B19 + ' %', value: 0,
        wide: true
    })
})

form.section("Évaluation", () => {
    let map = {
        // Don't put B1* because it does not count for YES/NO
        "B2": 1,
        "B3": 6,
        "B4": 4,
        "B5": 8,
        "B6": 8,
        "B7": 8,
        "B8": 8,
        "B9": 8,
        "B10": 8,
        "B11": 8,
        "B12": 8,
        "B13": 8,
        "B14": 0,
        "B14a": 9,
        "B14b": 10,
        "B14c": 11,
        "B15": 0,
        "B16": 0,
        "B16a": 12,
        "B16b": 13,
        "B16c": 14,
        // "B17": 0,
        "B18": 4,
        "B19": 13
    }

    let yes = false
    let score = 0
    for (let key in map) {
        if (values[key] == null)
            continue

        yes &= (values[key] == 1)
        if (values[key])
            score += map[key]
    }
    
    if (!form.isValid()) {
        score = null
        yes = null
    }

    form.calc("Bscore", "Score", score)
    if (score >= 17) {
        form.sameLine(true); form.calc("Bsuicidalite", "Suicidalité", 1, {
            text: "Élevée (≥ 17)"
        })
    } else if (score >= 9) {
        form.sameLine(true); form.calc("Bsuicidalite", "Suicidalité", 2, {
            text: "Modérée (9-16)"
        })
    } else if (score >= 1) {
        form.sameLine(true); form.calc("Bsuicidalite", "Suicidalité", 3, {
            text: "Faible (1-8)"
        })
    } else if (score != null) {
        form.sameLine(true); form.calc("Bsuicidalite", "Suicidalité", 3, {
            text: "Non"
        })
    } else {
        form.sameLine(true); form.calc("Bsuicidalite", "Suicidalité", undefined)
    }
    values.Bquand = []
    if (form.isValid()) {
        let now = values.B1a || values.B1b || values.B2   || values.B3   || values.B4   || 
                  values.B5  || values.B6  || values.B7   || values.B8   || values.B9   ||
                  values.B10 || values.B11 || values.B12  || values.B13  || values.B14  ||
                  values.B15 || values.B16 || values.B16a || values.B16b || values.B16c
        if (now)
            values.Bquand.push(1)
        if (values.B18)
            values.Bquand.push(2)
        if (values.B19)
            values.Bquand.push(3)
    }
    console.log(values.Bquand)
    form.sameLine(true); form.multiCheck("Bquand", "Temporalité", [
        [1, "Actuelle"],
        [2, "Vie entière"],
        [3, "Probable dans un avenir proche"]
    ], {
        disabled: !form.isValid(),
        readonly: true,
        help: "Actuelle = B1a à B16c, Vie entière = B18, Probable dans un avenir proche = B19"
    })

    form.textArea("Bcommentaire", html`Faites tout commentaire supplémentaire quant à votre évaluation de la suicidalité actuelle et prochaine du patient dans l'espace ci-dessous`, {
        rows: 3
    })

    let cmptmt = values.B18 && values.B18_3 && values.B18_4
    form.calc("Bcmptmt", "Comportements suicidaires", 0 + cmptmt, {
        disabled: !form.isValid(),
        text: value => value ? "Oui" : "Non"
    })
    values.Bquand2 = values.B18_2
    form.sameLine(true); form.enumRadio("Bquand2", "Temporalité", [
        [1, "Actuelle : au cours des 12 derniers mois"],
        [2, "En rémission précoce : de 12 à 24 mois auparavant"],
        [3, "En rémission : il y a plus de 24 mois"]
    ], {
        disabled: !form.isValid() || !cmptmt,
        readonly: true
    })
})
