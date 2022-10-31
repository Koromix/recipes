form.output(html`
    <p>Ce qui suit est une série de questions à propos d’évènements graves ou traumatiques dans la vie de quelqu’un. En réalité, ces types d’évènements se produisent régulièrement, bien que nous aimerions croire qu’ils sont rares. Par conséquent, ils affectent la manière dont les personnes peuvent ressentir certaines choses, réagir ou encore réfléchir. Etre conscient du fait que de tels faits surviennent et connaître les diverses réactions des individus face à cela nous aidera à élaborer des programmes de préventions, d’éducations et autres services. Le questionnaire est divisé en questions couvrant les expériences criminelles, les catastrophes en général, les questions de traumatisme et enfin, des interrogations à propos d’expériences physiques et sexuelles.  
    <p>Pour chaque évènement, veuillez indiquer (en encerclant la ou les réponses appropriées), si cela s’est produit, et si oui, le nombre de fois et votre âge approximatif quand cela s’est produit (donner la meilleure estimation de votre âge si vous n’êtes pas sûr). Notez également la nature de votre relation avec la personne en cause et la nature spécifique de l’événement le cas échéant. 

    `)

// Form content

let part = {
    1 : "Evenements liés à la criminalité",
    2 : "Catastrophes générales et traumatismes",
    3 : "Expériences physiques et sexuelles",
    4 : "Autres événements"
}

let questions = {
    1 : "1. Quelqu’un a-t-il déjà tenté de vous prendre quelque chose directement en utilisant la force ou la menace de la force, comme une agression ou un braquage? ",
    2 : "2. Quelqu’un a-t-il déjà tenté de vous voler ou vous a effectivement volé (vos effets personnels par exemple) ? ",
    3 : "3. Quelqu’un a-t-il déjà tenté ou réussi à rentrer par effraction dans votre maison lorsque vous n’étiez pas là ? ",
    4 : "4. Quelqu’un a-t-il déjà tenté ou réussi à rentrer par effraction dans votre maison alors que vous étiez là ? ",
    5 : "5. Avez-vous déjà eu un grave accident au travail, en voiture ou dans un autre endroit ? Si oui, précisez : ",
    6 : "6. Avez-vous déjà expérimenté une catastrophe naturelle telle qu’une tornade, un ouragan, une inondation, un tremblement de terre majeur,  etc., et où vous avez senti que vous ou vos proches étiez en danger de mort ou blessés ? Si oui, précisez : ",
    7 : "7. Avez-vous déjà vécu une catastrophe provoquée par l’homme tel qu’un accident de train, l’effondrement d’un bâtiment, le braquage d’une banque, un incendie,  etc., et où vous avez senti que vous ou vos proches étiez en danger de mort ou blessés ? Si oui, précisez : ",
    8 : "8. Avez-vous déjà été exposé à des produits chimiques dangereux ou à de la radioactivité qui auraient pu menacer votre santé ? ",
    9 : "9. Avez-vous déjà été dans toute autre situation dans laquelle vous avez été grièvement blessé ? Si oui, précisez : ",
    10 : "10. Avez-vous déjà été dans toute autre situation dans laquelle vous avez craint d’être tué ou gravement blessé ? Si oui, précisez : ",
    11 : "11. Avez-vous déjà vu quelqu’un gravement blessé ou se faire tuer ? Si oui, précisez qui : ",
    12 : "12. Avez-vous déjà vu des cadavres (autre part qu’à des funérailles) ou avez-vous eu à manipuler des cadavres pour une raison quelconque ? Si oui, précisez :… ",
    13 : "13. Avez-vous déjà eu un ami proche ou un membre de votre famille assassiné ou tué par un conducteur en état d’ébriété ? Si oui, précisez la relation (par exemple, votre mère, votre petit-fils,  etc.) : ",
    14 : "14. Avez-vous déjà eu un époux ou partenaire, ou un enfant qui est mort ? Si oui, précisez la relation ",
    15 : "15. Avez-vous déjà eu une maladie grave ou extrêmement grave (mettant votre vie en danger) ? Si oui, précisez : ",
    16 : "16. Avez-vous déjà appris que l’un de vos proches était grièvement blessé, avait une maladie mettant sa vie en danger ou était décédé de façon inattendue ? Si oui, précisez : ",
    17 : "17. Avez-vous déjà eu à combattre, pendant le service militaire, dans une guerre officielle ou non officielle ? Si oui, indiquez ou : ",
    18 : "18. Quelqu’un vous a-t-il déjà forcé à avoir des rapports sexuels, ou encore des rapports de type oral, anal? Si oui, indiquez la nature de la relation avec la personne (par exemple : étranger, ami, parent, frère ou sœur) : ",
    19 : "19. Quelqu’un a-t-il déjà touché des parties intimes de votre corps, ou vous a-t-il fait toucher les siennes par la force ou la menace ? Si oui, indiquez la nature de la relation avec la personne (par exemple : étranger, ami, parent, frère ou sœur) :… ",
    20 : "20. Y a-t-il d’autres situations, autres que les incidents mentionnés aux questions 18 et 19, où une personne a tenté de vous forcer à avoir des contacts sexuels non désirés ? Si oui, précisez : ",
    21 : "21. Est-ce quelqu’un, y compris des membres de votre famille ou des amis, vous a déjà attaqué avec une arme à feu, un couteau ou une autre arme ? Si oui, précisez :",
    22 : "22. Est-ce que quelqu’un, y compris des membres de votre famille ou des amis vous a déjà attaqué sans arme et vous a grièvement blessé ? ",
    23 : "23. Est-ce qu’une personne de votre famille vous a déjà battu, giflé ou poussé assez fort pour vous blesser ? ",
    24 : "24. Avez-vous déjà vécu toute autre situation ou événement extrêmement stressant qui ne soit pas mentionné ci-dessus ? Si oui, précisez :"
}

let conditionnal_quest = {
    1 : "Nombre de fois",
    2 : "Age(s) approximatif(s)",
    3 : "Repeated?",
    4 : "Approximate age(s) and frequency"
}

let answers =[
    [0,"Non"],
    [1,"Oui"]
    ]

let multiage_help = "Séparer les âges à l'aide d'un tiret '-' "

// Form format

form.section(part[1], () => {

    form.enum("q1", questions[1],answers)
        if (form.value("q1") == 1) {
            form.number("occurenceq1", conditionnal_quest[1])
            form.sameLine();form.text("ageq1a", conditionnal_quest[2], {help : multiage_help})
        }
    form.enum("q2", questions[2],answers)
        if (form.value("q2") == 1) {
            form.number("occurenceq2", conditionnal_quest[1])
            form.sameLine();form.text("ageq2", conditionnal_quest[2], {help : multiage_help})
        }
    form.enum("q3", questions[3],answers)
        if (form.value("q3") == 1) {
            form.number("occurenceq3", conditionnal_quest[1])
            form.sameLine();form.text("ageq3", conditionnal_quest[2], {help : multiage_help})
        }
    form.enum("q4", questions[4],answers)
        if (form.value("q4") == 1) {
            form.number("occurenceq4", conditionnal_quest[1])
            form.sameLine();form.text("ageq4", conditionnal_quest[2], {help : multiage_help})
        }
        })


form.section(part[2], () => {

    form.enum("q5", questions[5],answers)
        if (form.value("q5") == 1) {
            form.textArea("precision_q5")
            form.number("occurenceq5", conditionnal_quest[1])
            form.sameLine();form.text("ageq5", conditionnal_quest[2], {help : multiage_help})
        }
    form.enum("q6", questions[6],answers)
        if (form.value("q6") == 1) {
            form.textArea("precision_q6")
            form.number("occurenceq6", conditionnal_quest[1])
            form.sameLine();form.text("ageq6", conditionnal_quest[2], {help : multiage_help})
        }
    form.enum("q7", questions[7],answers)
        if (form.value("q7") == 1) {
            form.textArea("precision_q7")
            form.number("occurenceq7", conditionnal_quest[1])
            form.sameLine();form.text("ageq7", conditionnal_quest[2], {help : multiage_help})
        }
    form.enum("q8", questions[8],answers)
        if (form.value("q8") == 1) {
            form.number("occurenceq8", conditionnal_quest[1])
            form.sameLine();form.text("ageq8", conditionnal_quest[2], {help : multiage_help})
        }
    form.enum("q9", questions[9],answers)
        if (form.value("q9") == 1) {
            form.textArea("precision_q9")
            form.number("occurenceq9", conditionnal_quest[1])
            form.sameLine();form.text("ageq9", conditionnal_quest[2], {help : multiage_help})
        }
    form.enum("q10", questions[10],answers)
        if (form.value("q10") == 1) {
            form.textArea("precision_q10")
            form.number("occurenceq10", conditionnal_quest[1])
            form.sameLine();form.text("ageq10", conditionnal_quest[2], {help : multiage_help})
        }
    form.enum("q11", questions[11],answers)
        if (form.value("q11") == 1) {
            form.textArea("precision_q11")
            form.number("occurenceq11", conditionnal_quest[1])
            form.sameLine();form.text("ageq11", conditionnal_quest[2], {help : multiage_help})
        }
    form.enum("q12", questions[12],answers)
        if (form.value("q12") == 1) {
            form.textArea("precision_q12")
            form.number("occurenceq12", conditionnal_quest[1])
            form.sameLine();form.text("ageq12", conditionnal_quest[2], {help : multiage_help})
        }
    form.enum("q13", questions[13],answers)
        if (form.value("q13") == 1) {
            form.textArea("precision_q13")
            form.number("occurenceq13", conditionnal_quest[1])
            form.sameLine();form.text("ageq13", conditionnal_quest[2], {help : multiage_help})
        }
    form.enum("q14", questions[14],answers)
        if (form.value("q14") == 1) {
            form.textArea("precision_q14")
            form.number("occurenceq14", conditionnal_quest[1])
            form.sameLine();form.text("ageq14", conditionnal_quest[2], {help : multiage_help})
        }
    form.enum("q15", questions[15],answers)
        if (form.value("q15") == 1) {
            form.textArea("precision_q15")
            form.number("occurenceq15", conditionnal_quest[1])
            form.sameLine();form.text("ageq15", conditionnal_quest[2], {help : multiage_help})
        }
    form.enum("q16", questions[16],answers)
        if (form.value("q16") == 1) {
            form.number("occurenceq16", conditionnal_quest[1])
            form.sameLine();form.text("ageq16", conditionnal_quest[2], {help : multiage_help})
        }
    form.enum("q17", questions[17],answers)
        if (form.value("q17") == 1) {
            form.textArea("precision_q17")
            form.number("occurenceq17", conditionnal_quest[1])
            form.sameLine();form.text("ageq17", conditionnal_quest[2], {help : multiage_help})
        }
})

 form.section(part[3], () => {
    form.enum("q18", questions[18],answers)
        if (form.value("q18") == 1) {
            form.textArea("precision_q18")
            form.number("occurenceq18", conditionnal_quest[3])
            form.sameLine();form.text("ageq18", conditionnal_quest[4], {help : multiage_help})
        }
    form.enum("q19", questions[19],answers)
        if (form.value("q19") == 1) {
            form.textArea("precision_q19")
            form.number("occurenceq19", conditionnal_quest[3])
            form.sameLine();form.text("ageq19", conditionnal_quest[4], {help : multiage_help})
        }
    form.enum("q20", questions[20],answers)
        if (form.value("q20") == 1) {
            form.number("occurenceq20", conditionnal_quest[3])
            form.sameLine();form.text("ageq20", conditionnal_quest[4], {help : multiage_help})
        }
    form.enum("q21", questions[21],answers)
        if (form.value("q21") == 1) {
            form.number("occurenceq21", conditionnal_quest[3])
            form.sameLine();form.text("ageq21", conditionnal_quest[4], {help : multiage_help})
        }
    form.enum("q22", questions[22],answers)
        if (form.value("q22") == 1) {
            form.number("occurenceq22", conditionnal_quest[3])
            form.sameLine();form.text("ageq22", conditionnal_quest[4], {help : multiage_help})
        }
    form.enum("q23", questions[23],answers)
        if (form.value("q23") == 1) {
            form.number("occurenceq23", conditionnal_quest[3])
            form.sameLine();form.text("ageq23", conditionnal_quest[4], {help : multiage_help})
        }
})


 form.section(part[4], () => {
        form.enum("q24", questions[24],answers)
            if (form.value("q24") == 1){
                form.textArea("precision_q24")
            }
})