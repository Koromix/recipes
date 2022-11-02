form.output(html`
<p> TInstructions to the individual receiving care: This is a list of things different people might say about themselves. We are
interested in how you would describe yourself. There are no “right” or “wrong” answers. So you can describe yourself as
honestly as possible, we will keep your responses confidential. We’d like you to take your time and read each statement
carefully, selecting the response that best describes you.
`)

// Form content

let answers = [
    [1,"Very false or\n Often false"],
    [2,"Sometimes or\n SomewhatFalse"],
    [3,"Sometimes or Somewhat True"],
    [4,"Very True or Often True "]
]

let questions = {
1 : "1. I don’t get as much pleasure out of things as others seem to.",
2 : "2. Plenty of people are out to get me.",
3 : "3. People would describe me as reckless.",
4 : "4. I feel like I act totally on impulse.",
5 : "5. I often have ideas that are too unusual to explain to anyone.",
6 : "6. I lose track of conversations because other things catch my attention.",
7 : "7. I avoid risky situations.",
8 : "8. When it comes to my emotions, people tell me I’m a “cold fish”.",
9 : "9. I change what I do depending on what others want.",
10 : "10. I prefer not to get too close to people.",
11 : "11. I often get into physical fights.",
12 : "12. I dread being without someone to love me.",
13 : "13. Being rude and unfriendly is just a part of who I am.",
14 : "14. I do things to make sure people notice me.",
15 : "15. I usually do what others think I should do.",
16 : "16. I usually do things on impulse without thinking about what might happen as a result.",
17 : "17. Even though I know better, I can’t stop making rash decisions.",
18 : "18. My emotions sometimes change for no good reason.",
19 : "19. I really don’t care if I make other people suffer.",
20 : "20. I keep to myself.",
21 : "21. I often say things that others find odd or strange.",
22 : "22. I always do things on the spur of the moment.",
23 : "23. Nothing seems to interest me very much.",
24 : "24. Other people seem to think my behavior is weird.",
25 : "25. People have told me that I think about things in a really strange way.",
26 : "26. I almost never enjoy life.",
27 : "27. I often feel like nothing I do really matters.",
28 : "28. I snap at people when they do little things that irritate me.",
29 : "29. I can’t concentrate on anything.",
30 : "30. I’m an energetic person.",
31 : "31. Others see me as irresponsible.",
32 : "32. I can be mean when I need to be.",
33 : "33. My thoughts often go off in odd or unusual directions.",
34 : "34. I’ve been told that I spend too much time making sure things are exactly in place.",
35 : "35. I avoid risky sports and activities.",
36 : "36. I can have trouble telling the difference between dreams and waking life.",
37 : "37. Sometimes I get this weird feeling that parts of my body feel like they’re dead or not really me.",
38 : "38. I am easily angered.",
39 : "39. I have no limits when it comes to doing dangerous things.",
40 : "40. To be honest, I’m just more important than other people.",
41 : "41. I make up stories about things that happened that are totally untrue.",
42 : "42. People often talk about me doing things I don’t remember at all.",
43 : "43. I do things so that people just have to admire me.",
44 : "44. It’s weird, but sometimes ordinary objects seem to be a different shape than usual.",
45 : "45. I don’t have very long-lasting emotional reactions to things.",
46 : "46. It is hard for me to stop an activity, even when it’s time to do so.",
47 : "47. I’m not good at planning ahead.",
48 : "48. I do a lot of things that others consider risky.",
49 : "49. People tell me that I focus too much on minor details.",
50 : "50. I worry a lot about being alone.",
51 : "51. I’ve missed out on things because I was busy trying to get something I was doing exactly right.",
52 : "52. My thoughts often don’t make sense to others.",
53 : "53. I often make up things about myself to help me get what I want.",
54 : "54. It doesn’t really bother me to see other people get hurt.",
55 : "55. People often look at me as if I’d said something really weird.",
56 : "56. People don’t realize that I’m flattering them to get something.",
57 : "57. I’d rather be in a bad relationship than be alone.",
58 : "58. I usually think before I act.",
59 : "59. I often see vivid dream-like images when I’m falling asleep or waking up.",
60 : "60. I keep approaching things the same way, even when it isn’t working.",
61 : "61. I’m very dissatisfied with myself.",
62 : "62. I have much stronger emotional reactions than almost everyone else.",
63 : "63. I do what other people tell me to do.",
64 : "64. I can’t stand being left alone, even for a few hours.",
65 : "65. I have outstanding qualities that few others possess.",
66 : "66. The future looks really hopeless to me.",
67 : "67. I like to take risks.",
68 : "68. I can’t achieve goals because other things capture my attention.",
69 : "69. When I want to do something, I don’t let the possibility that it might be risky stop me.",
70 : "70. Others seem to think I’m quite odd or unusual.",
71 : "71. My thoughts are strange and unpredictable.",
72 : "72. I don’t care about other people’s feelings.",
73 : "73. You need to step on some toes to get what you want in life.",
74 : "74. I love getting the attention of other people.",
75 : "75. I go out of my way to avoid any kind of group activity.",
76 : "76. I can be sneaky if it means getting what I want.",
77 : "77. Sometimes when I look at a familiar object, it’s somehow like I’m seeing it for the first time.",
78 : "78. It is hard for me to shift from one activity to another.",
79 : "79. I worry a lot about terrible things that might happen.",
80 : "80. I have trouble changing how I’m doing something even if what I’m doing isn’t going well.",
81 : "81. The world would be better off if I were dead.",
82 : "82. I keep my distance from people.",
83 : "83. I often can’t control what I think about.",
84 : "84. I don’t get emotional.",
85 : "85. I resent being told what to do, even by people in charge.",
86 : "86. I’m so ashamed by how I’ve let people down in lots of little ways.",
87 : "87. I avoid anything that might be even a little bit dangerous.",
88 : "88. I have trouble pursuing specific goals even for short periods of time.",
89 : "89. I prefer to keep romance out of my life.",
90 : "90. I would never harm another person.",
91 : "91. I don’t show emotions strongly.",
92 : "92. I have a very short temper.",
93 : "93. I often worry that something bad will happen due to mistakes I made in the past.",
94 : "94. I have some unusual abilities, like sometimes knowing exactly what someone is thinking.",
95 : "95. I get very nervous when I think about the future.",
96 : "96. I rarely worry about things.",
97 : "97. I enjoy being in love.",
98 : "98. I prefer to play it safe rather than take unnecessary chances.",
99 : "99. I sometimes have heard things that others couldn’t hear.",
100 : "100. I get fixated on certain things and can’t stop.",
101 : "101. People tell me it’s difficult to know what I’m feeling.",
102 : "102. I am a highly emotional person.",
103 : "103. Others would take advantage of me if they could.",
104 : "104. I often feel like a failure.",
105 : "105. If something I do isn’t absolutely perfect, it’s simply not acceptable.",
106 : "106. I often have unusual experiences, such as sensing the presence of someone who isn’t actually there.",
107 : "107. I’m good at making people do what I want them to do.",
108 : "108. I break off relationships if they start to get close.",
109 : "109. I’m always worrying about something.",
110 : "110. I worry about almost everything.",
111 : "111. I like standing out in a crowd.",
112 : "112. I don’t mind a little risk now and then.",
113 : "113. My behavior is often bold and grabs peoples’ attention.",
114 : "114. I’m better than almost everyone else.",
115 : "115. People complain about my need to have everything all arranged.",
116 : "116. I always make sure I get back at people who wrong me.",
117 : "117. I’m always on my guard for someone trying to trick or harm me.",
118 : "118. I have trouble keeping my mind focused on what needs to be done.",
119 : "119. I talk about suicide a lot.",
120 : "120. I’m just not very interested in having sexual relationships.",
121 : "121. I get stuck on things a lot.",
122 : "122. I get emotional easily, often for very little reason.",
123 : "123. Even though it drives other people crazy, I insist on absolute perfection in everything I do.",
124 : "124. I almost never feel happy about my day-to-day activities.",
125 : "125. Sweet-talking others helps me get what I want.",
126 : "126. Sometimes you need to exaggerate to get ahead.",
127 : "127. I fear being alone in life more than anything else.",
128 : "128. I get stuck on one way of doing things, even when it’s clear it won’t work.",
129 : "129. I’m often pretty careless with my own and others’ things.",
130 : "130. I am a very anxious person.",
131 : "131. People are basically trustworthy.",
132 : "132. I am easily distracted.",
133 : "133. It seems like I’m always getting a “raw deal” from others.",
134 : "134. I don’t hesitate to cheat if it gets me ahead.",
135 : "135. I check things several times to make sure they are perfect.",
136 : "136. I don’t like spending time with others.",
137 : "137. I feel compelled to go on with things even when it makes little sense to do so.",
138 : "138. I never know where my emotions will go from moment to moment.",
139 : "139. I have seen things that weren’t really there.",
140 : "140. It is important to me that things are done in a certain way.",
141 : "141. I always expect the worst to happen.",
142 : "142. I try to tell the truth even when it’s hard.",
143 : "143. I believe that some people can move things with their minds.",
144 : "144. I can’t focus on things for very long.",
145 : "145. I steer clear of romantic relationships.",
146 : "146. I’m not interested in making friends.",
147 : "147. I say as little as possible when dealing with people.",
148 : "148. I’m useless as a person.",
149 : "149. I’ll do just about anything to keep someone from abandoning me.",
150 : "150. Sometimes I can influence other people just by sending my thoughts to them.",
151 : "151. Life looks pretty bleak to me.",
152 : "152. I think about things in odd ways that don’t make sense to most people.",
153 : "153. I don’t care if my actions hurt others.",
154 : "154. Sometimes I feel “controlled” by thoughts that belong to someone else.",
155 : "155. I really live life to the fullest.",
156 : "156. I make promises that I don’t really intend to keep.",
157 : "157. Nothing seems to make me feel good.",
158 : "158. I get irritated easily by all sorts of things.",
159 : "159. I do what I want regardless of how unsafe it might be.",
160 : "160. I often forget to pay my bills.",
161 : "161. I don’t like to get too close to people.",
162 : "162. I’m good at conning people.",
163 : "163. Everything seems pointless to me.",
164 : "164. I never take risks.",
165 : "165. I get emotional over every little thing.",
166 : "166. It’s no big deal if I hurt other peoples’ feelings.",
167 : "167. I never show emotions to others.",
168 : "168. I often feel just miserable.",
169 : "169. I have no worth as a person.",
170 : "170. I am usually pretty hostile.",
171 : "171. I’ve skipped town to avoid responsibilities.",
172 : "172. I’ve been told more than once that I have a number of odd quirks or habits.",
173 : "173. I like being a person who gets noticed.",
174 : "174. I’m always fearful or on edge about bad things that might happen.",
175 : "175. I never want to be alone.",
176 : "176. I keep trying to make things perfect, even when I’ve gotten them as good as they’re likely to get.",
177 : "177. I rarely feel that people I know are trying to take advantage of me.",
178 : "178. I know I’ll commit suicide sooner or later.",
179 : "179. I’ve achieved far more than almost anyone I know.",
180 : "180. I can certainly turn on the charm if I need to get my way.",
181 : "181. My emotions are unpredictable.",
182 : "182. I don’t deal with people unless I have to.",
183 : "183. I don’t care about other peoples’ problems.",
184 : "184. I don’t react much to things that seem to make others emotional.",
185 : "185. I have several habits that others find eccentric or strange.",
186 : "186. I avoid social events.",
187 : "187. I deserve special treatment.",
188 : "188. It makes me really angry when people insult me in even a minor way.",
189 : "189. I rarely get enthusiastic about anything.",
190 : "190. I suspect that even my so-called “friends” betray me a lot.",
191 : "191. I crave attention.",
192 : "192. Sometimes I think someone else is removing thoughts from my head.",
193 : "193. I have periods in which I feel disconnected from the world or from myself.",
194 : "194. I often see unusual connections between things that most people miss.",
195 : "195. I don’t think about getting hurt when I’m doing things that might be dangerous.",
196 : "196. I simply won’t put up with things being out of their proper places.",
197 : "197. I often have to deal with people who are less important than me.",
198 : "198. I sometimes hit people to remind them who’s in charge",
199 : "199. I get pulled off-task by even minor distractions.",
200 : "200. I enjoy making people in control look stupid.",
201 : "201. I just skip appointments or meetings if I’m not in the mood.",
202 : "202. I try to do what others want me to do.",
203 : "203. I prefer being alone to having a close romantic partner.",
204 : "204. I am very impulsive.",
205 : "205. I often have thoughts that make sense to me but that other people say are strange.",
206 : "206. I use people to get what I want.",
207 : "207. I don’t see the point in feeling guilty about things I’ve done that have hurt other people.",
208 : "208. Most of the time I don’t see the point in being friendly.",
209 : "209. I’ve had some really weird experiences that are very difficult to explain.",
210 : "210. I follow through on commitments.",
211 : "211. I like to draw attention to myself.",
212 : "212. I feel guilty much of the time.",
213 : "213. I often “zone out” and then suddenly come to and realize that a lot of time has passed.",
214 : "214. Lying comes easily to me.",
215 : "215. I hate to take chances.",
216 : "216. I’m nasty and short to anybody who deserves it.",
217 : "217. Things around me often feel unreal, or more real than usual.",
218 : "218. I’ll stretch the truth if it’s to my advantage.",
219 : "219. It is easy for me to take advantage of others.",
220 : "220. I have a strict way of doing things."
}

// Form format

//form.pushOptions({compact: true})

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
    form.enum("q29", questions[29],answers)
    form.enum("q30", questions[30],answers)
    form.enum("q31", questions[31],answers)
    form.enum("q32", questions[32],answers)
    form.enum("q33", questions[33],answers)
    form.enum("q34", questions[34],answers)
    form.enum("q35", questions[35],answers)
    form.enum("q36", questions[36],answers)
    form.enum("q37", questions[37],answers)
    form.enum("q38", questions[38],answers)
    form.enum("q39", questions[39],answers)
    form.enum("q40", questions[40],answers)
    form.enum("q41", questions[41],answers)
    form.enum("q42", questions[42],answers)
    form.enum("q43", questions[43],answers)
    form.enum("q44", questions[44],answers)
    form.enum("q45", questions[45],answers)
    form.enum("q46", questions[46],answers)
    form.enum("q47", questions[47],answers)
    form.enum("q48", questions[48],answers)
    form.enum("q49", questions[49],answers)
    form.enum("q50", questions[50],answers)
    form.enum("q51", questions[51],answers)
    form.enum("q52", questions[52],answers)
    form.enum("q53", questions[53],answers)
    form.enum("q54", questions[54],answers)
    form.enum("q55", questions[55],answers)
    form.enum("q56", questions[56],answers)
    form.enum("q57", questions[57],answers)
    form.enum("q58", questions[58],answers)
    form.enum("q59", questions[59],answers)
    form.enum("q60", questions[60],answers)
    form.enum("q61", questions[61],answers)
    form.enum("q62", questions[62],answers)
    form.enum("q63", questions[63],answers)
    form.enum("q64", questions[64],answers)
    form.enum("q65", questions[65],answers)
    form.enum("q66", questions[66],answers)
    form.enum("q67", questions[67],answers)
    form.enum("q68", questions[68],answers)
    form.enum("q69", questions[69],answers)
    form.enum("q70", questions[70],answers)
    form.enum("q71", questions[71],answers)
    form.enum("q72", questions[72],answers)
    form.enum("q73", questions[73],answers)
    form.enum("q74", questions[74],answers)
    form.enum("q75", questions[75],answers)
    form.enum("q76", questions[76],answers)
    form.enum("q77", questions[77],answers)
    form.enum("q78", questions[78],answers)
    form.enum("q79", questions[79],answers)
    form.enum("q80", questions[80],answers)
    form.enum("q81", questions[81],answers)
    form.enum("q82", questions[82],answers)
    form.enum("q83", questions[83],answers)
    form.enum("q84", questions[84],answers)
    form.enum("q85", questions[85],answers)
    form.enum("q86", questions[86],answers)
    form.enum("q87", questions[87],answers)
    form.enum("q88", questions[88],answers)
    form.enum("q89", questions[89],answers)
    form.enum("q90", questions[90],answers)
    form.enum("q91", questions[91],answers)
    form.enum("q92", questions[92],answers)
    form.enum("q93", questions[93],answers)
    form.enum("q94", questions[94],answers)
    form.enum("q95", questions[95],answers)
    form.enum("q96", questions[96],answers)
    form.enum("q97", questions[97],answers)
    form.enum("q98", questions[98],answers)
    form.enum("q99", questions[99],answers)
    form.enum("q100", questions[100],answers)
    form.enum("q101", questions[101],answers)
    form.enum("q102", questions[102],answers)
    form.enum("q103", questions[103],answers)
    form.enum("q104", questions[104],answers)
    form.enum("q105", questions[105],answers)
    form.enum("q106", questions[106],answers)
    form.enum("q107", questions[107],answers)
    form.enum("q108", questions[108],answers)
    form.enum("q109", questions[109],answers)
    form.enum("q110", questions[110],answers)
    form.enum("q111", questions[111],answers)
    form.enum("q112", questions[112],answers)
    form.enum("q113", questions[113],answers)
    form.enum("q114", questions[114],answers)
    form.enum("q115", questions[115],answers)
    form.enum("q116", questions[116],answers)
    form.enum("q117", questions[117],answers)
    form.enum("q118", questions[118],answers)
    form.enum("q119", questions[119],answers)
    form.enum("q120", questions[120],answers)
    form.enum("q121", questions[121],answers)
    form.enum("q122", questions[122],answers)
    form.enum("q123", questions[123],answers)
    form.enum("q124", questions[124],answers)
    form.enum("q125", questions[125],answers)
    form.enum("q126", questions[126],answers)
    form.enum("q127", questions[127],answers)
    form.enum("q128", questions[128],answers)
    form.enum("q129", questions[129],answers)
    form.enum("q130", questions[130],answers)
    form.enum("q131", questions[131],answers)
    form.enum("q132", questions[132],answers)
    form.enum("q133", questions[133],answers)
    form.enum("q134", questions[134],answers)
    form.enum("q135", questions[135],answers)
    form.enum("q136", questions[136],answers)
    form.enum("q137", questions[137],answers)
    form.enum("q138", questions[138],answers)
    form.enum("q139", questions[139],answers)
    form.enum("q140", questions[140],answers)
    form.enum("q141", questions[141],answers)
    form.enum("q142", questions[142],answers)
    form.enum("q143", questions[143],answers)
    form.enum("q144", questions[144],answers)
    form.enum("q145", questions[145],answers)
    form.enum("q146", questions[146],answers)
    form.enum("q147", questions[147],answers)
    form.enum("q148", questions[148],answers)
    form.enum("q149", questions[149],answers)
    form.enum("q150", questions[150],answers)
    form.enum("q151", questions[151],answers)
    form.enum("q152", questions[152],answers)
    form.enum("q153", questions[153],answers)
    form.enum("q154", questions[154],answers)
    form.enum("q155", questions[155],answers)
    form.enum("q156", questions[156],answers)
    form.enum("q157", questions[157],answers)
    form.enum("q158", questions[158],answers)
    form.enum("q159", questions[159],answers)
    form.enum("q160", questions[160],answers)
    form.enum("q161", questions[161],answers)
    form.enum("q162", questions[162],answers)
    form.enum("q163", questions[163],answers)
    form.enum("q164", questions[164],answers)
    form.enum("q165", questions[165],answers)
    form.enum("q166", questions[166],answers)
    form.enum("q167", questions[167],answers)
    form.enum("q168", questions[168],answers)
    form.enum("q169", questions[169],answers)
    form.enum("q170", questions[170],answers)
    form.enum("q171", questions[171],answers)
    form.enum("q172", questions[172],answers)
    form.enum("q173", questions[173],answers)
    form.enum("q174", questions[174],answers)
    form.enum("q175", questions[175],answers)
    form.enum("q176", questions[176],answers)
    form.enum("q177", questions[177],answers)
    form.enum("q178", questions[178],answers)
    form.enum("q179", questions[179],answers)
    form.enum("q180", questions[180],answers)
    form.enum("q181", questions[181],answers)
    form.enum("q182", questions[182],answers)
    form.enum("q183", questions[183],answers)
    form.enum("q184", questions[184],answers)
    form.enum("q185", questions[185],answers)
    form.enum("q186", questions[186],answers)
    form.enum("q187", questions[187],answers)
    form.enum("q188", questions[188],answers)
    form.enum("q189", questions[189],answers)
    form.enum("q190", questions[190],answers)
    form.enum("q191", questions[191],answers)
    form.enum("q192", questions[192],answers)
    form.enum("q193", questions[193],answers)
    form.enum("q194", questions[194],answers)
    form.enum("q195", questions[195],answers)
    form.enum("q196", questions[196],answers)
    form.enum("q197", questions[197],answers)
    form.enum("q198", questions[198],answers)
    form.enum("q199", questions[199],answers)
    form.enum("q200", questions[200],answers)
    form.enum("q201", questions[201],answers)
    form.enum("q202", questions[202],answers)
    form.enum("q203", questions[203],answers)
    form.enum("q204", questions[204],answers)
    form.enum("q205", questions[205],answers)
    form.enum("q206", questions[206],answers)
    form.enum("q207", questions[207],answers)
    form.enum("q208", questions[208],answers)
    form.enum("q209", questions[209],answers)
    form.enum("q210", questions[210],answers)
    form.enum("q211", questions[211],answers)
    form.enum("q212", questions[212],answers)
    form.enum("q213", questions[213],answers)
    form.enum("q214", questions[214],answers)
    form.enum("q215", questions[215],answers)
    form.enum("q216", questions[216],answers)
    form.enum("q217", questions[217],answers)
    form.enum("q218", questions[218],answers)
    form.enum("q219", questions[219],answers)
    form.enum("q220", questions[220],answers)
})