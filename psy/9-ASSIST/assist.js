form.output(html`
    <p>De nombreuses drogues, certains médicaments inclus, peuvent affecter votre santé. Pour <b>bien vous soigner</b>, il est important pour votre soignant d’avoir des informations précises sur vos consommations.
    <p>Les questions qui suivent portent sur vos consommations d’alcool, de tabac et d’autres drogues <b>au cours des 4 dernières semaines</b>, indépendamment de la voie de consommation (fumé, avalé, sniffé, inhalé, injecté, pris sous forme de pilule, etc.). Certaines des substances listées peuvent être prescrites par un médecin (comme par ex. des médicaments contre la douleur, des calmants, des somnifères, des coupe-faim, des stimulants).
    <p>Pour cet entretien, nous ne prenons <b>pas en compte les médicaments pris sur ordonnance médicale</b>. Cependant, si vous avez pris ces médicaments pour des raisons autres que celles de la prescription ou que vous les avez pris plus fréquemment ou à plus haute dose que prescrit, je vous prie de me le faire savoir.
    <p>Soyez assuré que toutes les informations recueillies seront traitées de façon <b>strictement confidentielle</b>, y compris celles concernant les drogues illicites ou interdites.
`)

let start = nav.page.key.endsWith('_m0') ? 30 : 0
for (let i = start; i >= 0; i--) {
    if (i > 0 && meta.map.inclus.values["id_date" + i] == null)
        continue

    form.section("Substances consommées", () => {
        if (i > 0)
            form.pushOptions({path: ["liberation" + i]})

        let consos = [
            [1, "Jamais"],
            [2, "1 ou 2 fois"],
            [3, "Mensuellement"],
            [4, "Hebdomadairement"],
            [5, "Chaque jour ou presque"]
        ]
    
        if (nav.page.key === "assist_m0") {
            form.output(html`
                En détention, combien de fois avez-vous <b>consommé les substances suivantes</b> ?
            `)
        } else {
            form.output(html`
                Depuis votre libération, combien de fois avez-vous <b>consommé les substances suivantes</b> ?
            `)
        }
            
        form.enum("q1a", "Tabac (cigarette, cigare, pipe, narguilé, tabac à chiquer, etc.)", consos)
        form.enum("q1b", "Boissons alcooliques (bière, alcopop, vin, spiritueux, etc.)", consos)
        form.enum("q1c", "Cannabis (marijuana, joint, herbe, hash, etc.)", consos)
        form.enum("q1d", "Cocaïne (coke, crack, etc.)", consos)
        form.enum("q1e", "Stimulants de type amphétamine (speed, pilules thaï, pilules coupe faim, ecstasy, etc.)", consos)
        form.enum("q1f", "Solvants (colle, essence, diluant, etc.)", consos)
        form.enum("q1g", "Calmants ou somnifères (Valium, Seresta, Dormicum, Rohypnol, Stilnox, etc.)", consos)
        form.enum("q1h", "Hallucinogènes (LSD, champignons, PCP, etc.)", consos)
        form.enum("q1i", "Opiacés (héroïne, morphine, méthadone, codéine, buprénorphine, etc.)", consos)
        form.enum("q1j", "Autres", consos)
        if (values.q1j > 1) {
            form.sameLine()
            form.text("q1j_prec", "Précisez :")
        }

        if (nav.page.key === "assist_m0") {
            form.binary("q2", "En détention, avez-vous fait une overdose ?")
        } else {
            form.binary("q2", "Depuis votre libération, avez-vous fait une overdose ?")
        }
    })
}
