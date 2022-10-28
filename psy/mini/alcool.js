let fail = false
function disable_if(cond) {
    if (cond) {
        form.pushOptions({disabled: true})
        fail = true
    }
}

form.section("Au cours des 12 derniers mois...", () => {
    form.binary("*I1", html`Vous est-il arrivé à au moins 3 reprises de boire, en moins de 3 heures, 3 verres d'alcool ou plus ?`)
    disable_if(values.I1 == 0)
    form.binary("*I2a", html`Lorsque vous buviez, finissiez-vous par boire plus que vous n'en aviez l'intention au départ ?`)
    form.binary("*I2b", html`Avez-vous eu envie, à plusieurs reprises, de réduire ou de contrôler votre consommation d'alcool ? Avez-vous essayé de limiter ou de contrôler votre consommation d'alcool mais sans y arriver ?`, {
        help: "Côtez OUI si OUI à l'une ou l'autre"
    })
    form.binary("*I2c", html`Les jours où vous buviez, passiez-vous beaucoup de temps à vous procurer de l'alcool, à boire ou à vous remettre des effets de l'alcool ?`)
    form.binary("*I2d", html`Éprouviez-vous une irrépressible envie ou un fort désir un besoin urgent de consommer de l'alcool ?`)
    form.binary("*I2e", html`Avez-vous délaissé vos responsabilités au travail, à l'école ou à la maison parce que vous buviez de façon répétée ?`)
    form.binary("*I2f", html`Avez-vous continué à boire même si cela entraînait des problèmes avec votre famille ou d'autres personnes ?`)
    form.binary("*I2g", html`Vous est-il arrivé plus d'une fois d'être sous l'effet de l'alcool dans une situation où cela était physiquement risqué pour vous ou pour d'autres personnes, comme conduire une voiture ou une moto, utiliser une machine, faire du bateau, etc. ?`)
    form.binary("*I2h", html`Avez-vous continué consommer de l'alcool, tout en sachant pertinemment que l'alcool provoquait chez vous ou aggravait des problèmes psychologiques ou physiques ?`)
    form.binary("*I2i", html`Avez-vous consacré moins de temps ou abandonné un travail important, vos activités sociales ou de loisirs parce que vous buviez ?`)
    form.binary("*I2j", html`Aviez-vous besoin de boire beaucoup plus pour obtenir même effet que quand vous avez commencé boire, ou la même quantité d'alcool vous faisait•elle beaucoup moins d'effet ?`)
})
if (fail)
    form.pushOptions({disabled: true})

let score
form.section("Sevrage", () => {
    form.multiCheck("*I2k1", html`Lorsque vous buviez moins après une consommation importante ou prolongée d'alcool, ressentiez-vous l'un des effets suivants ?`, [
        [1, "Augmentation de la transpiration ou du rythme cardiaque"],
        [2, "Tremblements des mains ou d'une autre partie du corps"],
        [3, "Troubles du sommeil"],
        [4, "Nausées ou vomissements"],
        [5, "Entendre ou voir des choses invisibles ou inaudibles pour les autres ou avoir des sensations cutanées sans raisons apparentes"],
        [6, "Agitation"],
        [7, "Anxiété"],
        [8, "Convulsions"]
    ])
    form.binary("*I2k2", html`Vous arrivait-il de boire pour éviter d'avoir ces symptômes de sevrage ou les réduire, ou pour éviter d'avoir la gueule de bois ?`)

    let k1 = values.I2k1 != null ? (0 + (values.I2k1.length >= 2))  : 0
    score = values.I2a + values.I2b + values.I2c + values.I2d + values.I2e + values.I2f +
            values.I2g + values.I2h + values.I2i + values.I2j + Math.min(1, k1 + values.I2k2)
    disable_if(!Number.isNaN(score) && score < 2)
})
if (fail) {
    form.pushOptions({disabled: true})
    score = NaN
}

form.section("Évaluation", () => {
    form.calc("Iconclusion", "Trouble lié à la consommation d'alcool (12 derniers mois)", form.isValid() ? 1 - fail : null, {
        text: value => value ? "Oui" : "Non",
        disabled: false
    })
    form.pushOptions({disabled: !values.Iconclusion})
    form.sameLine(true); form.block(() => {
        if (score >= 6) {
            form.calc("Iseverite", "Degré de sévérité", "Sévère")
        } else if (score >= 4) {
            form.calc("Iseverite", "Degré de sévérité", "Modéré")
        } else if (score >= 2) {
            form.calc("Iseverite", "Degré de sévérité", "Léger")
        } else {
            form.calc("Iseverite", "Degré de sévérité", null)
        }
    })
    
    form.section("", () => {
        form.output(html`
            <p>Si un trouble lié à la consommation d'alcool (12 derniers mois) est identifé, précisez si il est en rémission ou non.
            <p>Si ce trouble n'est pas identifié sur les 12 derniers mois, précisez s'il s'agit d'une rémission durable d'un trouble plus ancien.`)

        form.enumRadio("Iremission", "Rémission", [
            [0, "Pas de rémission"],
            [1, "En rémission précoce (critères non remplis depuis 3 à 12 mois)"],
            [2, "En rémission durable (critères non remplis depuis 12 mois ou plus)"]
        ], {
            help: "Dans les deux cas, précisez si la rémission est liée à un environnement contrôlé",
            disabled: false
        })
        if (values)
        form.sameLine(true); form.binary("Icontrolle", "Environnement contrôlé", {
            help: "Environnement où l'accès à l'alcool est impossible",
            disabled: values.Iremission == 0
        })
    })
})
