let fail = false
function disable_if(cond) {
    if (cond) {
        form.pushOptions({disabled: true})
        fail = true
    }
}

form.section("Trouble anxiété sociale", () => {
    form.binary("*E1", html`Vous sentez-vous anxieux(se) ou mal à l'aise dans des endroits ou situations où il serait difficile d'obtenir de l'aide ou dont il serait difficile de s'échapper si vous faisiez une crise d'angoisse ou de panique ou si vous présentiez des symptômes gênants, comme : être dans une foule, dans une file d'attente, dans un espace ouvert ou passer sur un pont, ou être dans un espace fermé, ou seul(e), hors de votre domicile ou seul(e) à la maison, ou voyager en train, en bus ou en voiture ou dans les transports publics ?`)
    disable_if(values.E1 == 0)
    form.binary("*E1_1", html`Y a-t-il au moins 2 situations de ce type côtées OUI ?`)
    disable_if(values.E1_1 == 0)
    form.binary("*E2", html`Ces situations engendrent-elles presque toujours de la peur ou de l'anxiété ?`)
    disable_if(values.E2 == 0)
    form.binary("*E3", html`Redoutez-vous tellement ces situations que vous les évitez ou bien en souffrez-vous ou avez-vous besoin d'être accompagné(e) pour les affronter ?`)
    disable_if(values.E3 == 0)
    form.binary("*E4", html`Cette peur ou cette anxiété sont-elles excessives ou disproportionnées par rapport au danger réel de la situation ?`)
    disable_if(values.E4 == 0)
    form.binary("*E5", html`Cet évitement, cette peur ou cette anxiété ont-ils persisté pendant au moins 6 mois ?`)
    disable_if(values.E5 == 0)
    form.binary("*E6", html`Ces symptômes ont-ils entraîné une détresse ou des difficultés significatives à la maison, au travail, à l'école, socialement ou d'une autre manière significative ?`)
    disable_if(values.E6 == 0)
})
if (fail)
    form.pushOptions({disabled: true})

form.section("Évaluation", () => {
    form.calc("Econclusion", "Agoraphobie actuelle", form.isValid() ? 1 - fail : null, {
        text: value => value ? "Oui" : "Non",
        disabled: false
    })
})
