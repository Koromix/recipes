form.output(html`
    <p>The following is a series of questions about serious or traumatic life events. These types of events actually occur with some regularity, although we would like to believe they are rare, and they affect how people feel about, react to, and/or think about things subsequently. Knowing about the occurrence of such events, and reactions to them, will help us to develop programs for prevention, education, and other services. The questionnaire is divided into questions covering crime experiences, general disaster and trauma questions, and questions about physical and sexual experiences. 

    <p> For each event, please indicate (circle) whether it happened and, if it did, the number of times and your approximate age when it happened (give your best guess if you are not sure). Also note the nature of your relationship to the person involved and the specific nature of the event, if appropriate.     `)

// Form content

let part = {
    1 : "Crime-Related Events",
    2 : "General Disaster and Trauma",
    3 : "Physical and Sexual Experiences",
    4 : "Other events"
}

let questions = {
    1 : "1. Has anyone ever tried to take something directly from you by using force or the threat of force, such as a stick-up or mugging?",
    2 : "2. Has anyone ever attempted to rob you or actually robbed you (i.e., stolen your personal belongings)?",
    3 : html`3 Has anyone ever attempted to or succeeded in breaking into your home when you were <u>not</u> there?`,
    4 : html`4 Has anyone ever attempted to or succeed in breaking into your home while you <u>were</u> there?`,
    5 : "5. Have you ever had a serious accident at work, in a car, or somewhere else? (If yes, please specify below)",
    6 : "6. Have you ever experienced a natural disaster such as a tornado, hurricane, flood or major earthquake, etc., where you felt you or your loved ones were in danger of death or injury? (If yes, please specify below)",
    7 : "7. Have you ever experienced a “man-made” disaster such as a train crash, building collapse, bank robbery, fire, etc., where you felt you or your loved ones were in danger of death or injury? (If yes, please specify below)",
    8 : "8. Have you ever been exposed to dangerous chemicals or radioactivity that might threaten your health? ",
    9 : "9. Have you ever been in any other situation in which you were seriously injured? (If yes, please specify below)",
    10 : "10. Have you ever been in any other situation in which you feared you might be killed or seriously injured? (If yes, please specify below)",
    11 : "11. Have you ever seen someone seriously injured or killed? (If yes, please specify who below)",
    12 : "12. Have you ever seen dead bodies (other than at a funeral) or had to handle dead bodies for any reason? (If yes, please specify below)",
    13 : "13. Have you ever had a close friend or family member murdered, or killed by a drunk driver? (If yes, please specify relationship [e.g., mother, grandson, etc.] below)",
    14 : "14. Have you ever had a spouse, romantic partner, or child die? (If yes, please specify relationship below)",
    15 : "15. Have you ever had a serious or life-threatening illness? (If yes, please specify below)",
    16 : "16. Have you ever received news of a serious injury, life-threatening illness, or unexpected death of someone close to you? (If yes, please indicate below)",
    17 : "17. Have you ever had to engage in combat while in military service in an official or unofficial war zone? (If yes, please indicate where below)",
    18 : "18. Has anyone ever made you have intercourse or oral or anal sex against your will? (If yes, please indicate nature of relationship with person [e.g., stranger, friend, relative, parent, sibling] below)",
    19 : "19. Has anyone ever touched private parts of your body, or made you touch theirs, under force or threat? (If yes, please indicate nature of relationship with person [e.g., stranger, friend, relative, parent, sibling] below)",
    20 : "20. Other than incidents mentioned in Questions 18 and 19, have there been any other situations in which another person tried to force you to have an unwanted sexual contact? ",
    21 : "21. Has anyone, including family members or friends, ever attacked you with a gun, knife, or some other weapon? ",
    22 : "22. Has anyone, including family members or friends, ever attacked you without a weapon and seriously injured you? ",
    23 : "23. Has anyone in your family ever beaten, spanked, or pushed you hard enough to cause injury? ",
    24 : "24. Have you experienced any other extraordinarily stressful situation or event that is not covered above? (If yes, please specify below)"
}

let conditionnal_quest = {
    1 : "Number of times",
    2 : "Approximate age(s)",
    3 : "Repeated?",
    4 : "Approximate age(s) and frequency"
}

let answers =[
    [0,"No"],
    [1,"Yes"]
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