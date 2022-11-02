form.output(html`
<p> The questions in this scale ask you about your feelings and thoughts during THE LAST MONTH.   In each case, you will be asked to indicate your response by placing an “X” over the circle representing HOW OFTEN you felt or thought a certain way. Although some of the questions are similar, there are differences between them and you should treat each one as a separate question. The best approach is to answer fairly quickly. That is, don’t try to count up the number of times you felt a particular way, but rather indicate the alternative that seems like a reasonable estimate.
`)

// Form content

let answers = [
    [1,"Never"],
    [2,"Almost never"],
    [3,"Sometimes"],
    [4,"Fairly often"],
    [4,"Very often"]
]

let questions = {
    1 : "1. In the last month, how often have you been upset because of something that happened unexpectedly?",
    2 : "2. In the last month, how often have you felt that you were unable to control the important things in your life?",
    3 : "3. In the last month, how often have you felt nervous and “stressed”?",
    4 : "4. In the last month, how often have you dealt successfully with day to day problems and annoyances?",
    5 : "5. In the last month, how often have you felt that you were effectively coping with important changes that were occurring in your life?",
    6 : "6. In the last month, how often have you felt confident about your ability to handle your personal problems?",
    7 : "7. In the last month, how often have you felt that things were going your way?",
    8 : "8. In the last month, how often have you found that you could not cope with all the things that you had to do?",
    9 : "9. In the last month, how often have you been able to control irritations in your life?",
    10 : "10.   In the last month, how often have you felt that you were on top of things?",
    11 : "11.   In the last month, how often have you been angered because of things that happened that were outside of your control?",
    12 : "12.   In the last month, how often have you found yourself thinking about things that you have to accomplish?",
    13 : "13.   In the last month, how often have you been able to control the way you spend your time?",
    14 : "14.   In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?"
    }


// Form format

//form.pushOptions({compact: true})

form.section("Questions", () => {
    for (quest in questions){
    form.enum("1"+quest, questions[quest],answers)
}
})