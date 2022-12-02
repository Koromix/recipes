form.output(html`
<p> TInstructions to the individual receiving care: This is a list of things different people might say about themselves. We are
interested in how you would describe yourself. There are no “right” or “wrong” answers. So you can describe yourself as
honestly as possible, we will keep your responses confidential. We’d like you to take your time and read each statement
carefully, selecting the response that best describes you.
`)

// Form content

let answers = [
    [1,"Very false or\n Often false"],
    [2,"Sometimes or\n Somewhat False"],
    [3,"Sometimes or Somewhat True"],
    [4,"Very True or Often True "]
]

let questions = {
1 : "1. People would describe me as reckless.",
2 : "2. I feel like I act totally on impulse.",
3 : "3. Even though I know better, I can’t stop making rash decisions.",
4 : "4. I often feel like nothing I do really matters.",
5 : "5. Others see me as irresponsible.",
6 : "6. I’m not good at planning ahead.",
7 : "7. My thoughts often don’t make sense to others.",
8 : "8. I worry about almost everything.",
9 : "9. I get emotional easily, often for very little reason.",
10 : "10. I fear being alone in life more than anything else.",
11 : "11. I get stuck on one way of doing things, even when it’s clear it won’t work.",
12 : "12. I have seen things that weren’t really there.",
13 : "13. I steer clear of romantic relationships.",
14 : "14. I’m not interested in making friends.",
15 : "15. I get irritated easily by all sorts of things.",
16 : "16. I don’t like to get too close to people.",
17 : "17. It’s no big deal if I hurt other peoples’ feelings.",
18 : "18. I rarely get enthusiastic about anything.",
19 : "19. I crave attention.",
20 : "20. I often have to deal with people who are less important than me.",
21 : "21. I often have thoughts that make sense to me but that other people say are strange.",
22 : "22. I use people to get what I want.",
23 : "23. I often “zone out” and then suddenly come to and realize that a lot of time has passed.",
24 : "24. Things around me often feel unreal, or more real than usual.",
25 : "25. It is easy for me to take advantage of others."
}

// Form format

//form.pushOptions({compact: true})

form.section("Questions", () => {
    for (quest in questions){
    form.enum("1"+quest, questions[quest],answers)
}
})