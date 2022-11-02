form.output(html`
<p> These questions ask about some of your experiences growing up as a child and a teenager. For each question, circle (or select in any other way if completing online) the number that best describes how you feel. Although some of these questions are of a personal nature, please try to answer as honestly as you can. Your answers will be kept confidential.
`)

// Form content

let answers = [
    [1,"Never true"],
    [2,"Rarely true"],
    [3,"Sometimes true"],
    [4,"Often true"],
    [5,"Very often true"]
]

let questions = {
1 : "1.   I didn't have enough to eat.",
2 : "2.   I knew that there was someone to take care of me and protect me.",
3 : "3.   People in my family called me things like \"stupid\", \"lazy\", or \"ugly\".",
4 : "4.   My parents were too drunk or high to take care of the family. ",
5 : "5.   There was someone in my family who helped me feel important or special",
6 : "6.   I had to wear dirty clothes",
7 : "7.   I felt loved. ",
8 : "8.   I thought that my parents wished I had never been born",
9 : "9.   I got hit so hard by someone in my family that I had to see a doctor or go to the hospital.",
10 : "10.  There was nothing I wanted to change about my family. ",
11 : "11.  People in my family hit me so hard that it left me with bruises or marks. ",
12 : "12.  I was punished with a belt, a board, a cord (or some other hard object).",
13 : "13.  People in my family looked out for each other.",
14 : "14.  People in my family said hurtful or insulting things to me.",
15 : "15.  I believe that I was physically abused.",
16 : "16.  I had the perfect childhood.",
17 : "17.  I got hit or beaten so badly that it was noticed by someone like a teacher, neighbour, or doctor. ",
18 : "18.  Someone in my family hated me.",
19 : "19.  People in my family felt close to each other. ",
20 : "20.  Someone tried to touch me in a sexual way or tried to make me touch them. ",
21 : "21.  Someone threatened to hurt me or tell lies about me unless I did something sexual with them.",
22 : "22.  I had the best family in the world.",
23 : "23.  Someone tried to make me do sexual things or watch sexual things. ",
24 : "24.  Someone molested me (took advantage of me sexually).",
25 : "25.  I believe that I was emotionally abused.",
26 : "26.  There was someone to take me to the doctor if I needed it ",
27 : "27.  I believe that I was sexually abused. ",
28 : "28.  My family was a source of strength and support."
}

// Form format

form.pushOptions({compact: true})

form.section("Questions", () => {
    form.enum("q1", questions[1],answers)
    form.enum("q2", questions[2],answers)
    form.enum("q3", questions[3],answers)
    form.enum("q4", questions[4],answers)
    form.enum("q5", questions[5],answers)
    form.enum("q6", questions[6],answers)
    form.enum("q7", questions[7],answers)
    form.enum("q8", questions[8],answers)
    form.enum("q9", questions[9],answers)
    form.enum("q10", questions[10],answers)
    form.enum("q11", questions[11],answers)
    form.enum("q12", questions[12],answers)
    form.enum("q13", questions[13],answers)
    form.enum("q14", questions[14],answers)
    form.enum("q15", questions[15],answers)
    form.enum("q16", questions[16],answers)
    form.enum("q17", questions[17],answers)
    form.enum("q18", questions[18],answers)
    form.enum("q19", questions[19],answers)
    form.enum("q20", questions[20],answers)
    form.enum("q21", questions[21],answers)
    form.enum("q22", questions[22],answers)
    form.enum("q23", questions[23],answers)
    form.enum("q24", questions[24],answers)
    form.enum("q25", questions[25],answers)
    form.enum("q26", questions[26],answers)
    form.enum("q27", questions[27],answers)
    form.enum("q28", questions[28],answers)
})