# Legibility — First Draft

> Each section is isolated for independent editing. Voice-transcribed material cleaned up, not rewritten.

---

## 1. Hook

Legibility is something I never thought I'd value this much. I grew up with hard-to-read handwriting and communication that didn't always land — math was my love, writing was the struggle. But it's funny how software bridges that gap. Code is written in language. It has to convey meaning through naming, through structure, to help you build a model of real-world systems. A legible system is one where you can most easily build that mental model — based on how things are organized, named, and connected.

When AI started accelerating, I did the math. I calculated the average tokens I'd contributed over three years of commits and estimated the cost. The conclusion was thrilling: three years of software development could compress into a single day. But not without the right tools — which is why I jumped headfirst into building an agent engineering framework, recently branded Syntropic137.

A lot of building happened. A lot of speed. A lot of experimentation. I'd already researched event sourcing and chosen it for this system — for reasons I'd later realize were about legibility, though I didn't have that word for it yet.

But as the features piled up, something shifted. My understanding of the system slowly got smaller and smaller. I felt less confident. I felt scared to change things.

---

## 2. The New Failure Mode

With agentic coding, and now agentic engineering, AI is able to generate unimaginable amounts of code compared to pre-GPT software engineering times. We have to realize this is a paradigm shift And adapt our efforts. And it's no surprise that code has been democratized. And it's no... Scratch that. and it's now common knowledge that code is accessible to everyone which is a beautiful thing because it has been democratized and that in a way moves everyone up a level to higher complexity people who didn't know how to code before can now do stuff that current developers can do and now current developers can do stuff that with more with deeper knowledge can put together entire systems together that were different we're basically impossible without months or years of effort and by that time you're talking about you may have built a product that is completely obsolete at that point so what we're seeing is a boom in creativity but also a boom in managing complexity and much more complex systems and since a lot of it is generated which is great for scalability and productivity and just reaching a utopian ideal, which is what I hope that we all drive towards but obviously the risk is driving I would say the best metaphor is driving a not one metaphor is driving a powerful locomotive train filled with lots of flammable cargo and you know driving at full speed in the dark blind you know the possibility you know that meaning like even if there is a risk coming up that you could prevent if you had lights or something if you had lights let's say that to see the track and see ahead a mile like you would have enough time to stop the train and avoid a disaster and honestly if we were on a train if you can imagine being on a train the kind of a little thought experiment if you can imagine being on a train and it's going full speed you see the note like all the heat at the max like you can feel the movement of the train you remember how long it took to get the thing going so you know it has just like insane momentum and you can just feel the momentum behind your back as you're sitting there and just like you feel the rumble and it's like this is and you like feel these turns i feel have some long turns that kind of have like slowly you feel about yours i can feel the gravity kind of shift to you as it as it leans in and you're riding blind like you just you're in the path you're in the driver's seat but you can't see what's happening you're saying ah all you know is that like you get a you have a buzzer that tells you like when to stop at your next station but like if anything happens between we did in the station like it's gonna be bad anyways so how much how better would you feel about driving a super powerful machine that's basically an extreme leverage leverage device basically a human can be in the front and uh start up the the engine and then put it into gear and then move incredible tonnage behind them incredible amounts of weight and energy that it takes to move it and it's like a land ship in a way and like one human maybe maybe multiple maybe two humans needed to to operate from one destination to the other and that's a huge leverage, leverage device. And that's kind of like what technology provides, it provides a leverage and like in a lot of ways, it's a beautiful thing. But the reality that I've had to come to is that it's amoral. Just a powerful device. And, you know, now we have to make sure that we obviously like the cliches with great responsibility comes great power comes great responsibility and it's like yeah let's stay grounded about that but strive strive for growth to stay grounded about like with power comes risk and with risk comes responsibility

(EDIT ^^^ That was the stream of consciousness mainly. There's some good parts and some rainbow parts that might need to be pulled somewhere else out, but it's been nice to just voice dictate this.)

 \So yeah, when it comes to software, which is like my main focus these days, this season in my life, it's been my main focus. And I've been going deep on it and really love it. you know so a lot of my my experience is going to be based on that for a concrete experience but i really want to apply these essays for just general purpose because a lot of these principles are general purpose in life and in systems so uh i think that's when it's kind of like our first some things are first principle ideas uh yeah and a lot of a lot of it's based in the one thing that's definitely not changing barely any or at all compared to ai and that is human human bandwidth uh our time that the number of hours we have per day we can try this to like cut into our sleep schedule but it's not a sustainable method and honestly like the more we try the more it pulls us back because then we have less effectiveness per hour um maybe apply like a note there I just don't know if that happens so I base a lot of scalability problems and the I think that's the first part when if you want to understand like where I'm coming from from scalability I think it's an important thing to think about we have this the other limit of human cognition is bandwidth and single single focus we talk about how multitasking is hard and like the hard part about agent using using any kind of form of agent system is that you are become an orchestrator and a kind of manager and you do in a basically have to learn i don't i can't see a way around multitasking because why would you we can't just be waiting for someone to be the agent to be doing work and just be like burning our time like i mean you get double the effectiveness or something like that if you kick off multiple things right and if you can kick off longer term tasks, then you can kick off parallel agents. So I mean, I think the ideal is that in the morning you like kick off 10 parallel tasks that last 24 hours and then or last eight hours and then maybe last four hours and you review the second four hours and get feedback again. And then that's kind of, I think where we can get into the nitty gritty about agent length time and parallelization. But so that's kind of an interesting challenge is like we're expecting, like we have this human cognition that's really built for single focus. And I think that's very valuable. But at the same time, we have all of a sudden this everyone has their own workforce below them. and if they want to leverage it that um these are my opinion skills that are universal uh like these are just kind of universal philosophies for anyone in any field anyone at all and in a way like i see this is like the ultimate level plane this is the ultimate leveling field for humanity because everyone has access to like the smartest the smartest like uh the smartest probabilistic word generator if you want to call it um which can do amazing things i mean uh for anyone so uh so yes which is beautiful but now it's like the people who, in my opinion, the people who are able to leverage them the more most are going to basically be able to have an edge in whatever they're wanting to build or do. And it's not always about an edge. It's also about just being more effective and being able to have more enjoyment and satisfaction in your life just because you're able to like have an idea and just get it to creation faster. and I think it's just like a beautiful time or renaissance as I've heard before maybe Okinawa source there for creators and builders


( aside: So now with AI, in a concrete example with coding, it's basically amazing for creativity but code is complex and due to the limit of a context window. The context window is another thing I actually want to do some hard math about, like engineering focused math because I want to keep it a little bit engineering math focused based on reality. And one thing is like talking about, like we look at the average code base size of kind of like the average, like the size of different code bases basically. And just kind of give a, have like in the footnotes about where they're from. And then you just kind of give a quick math calculation of like saying like, okay, these are like how many thousand, hundred thousands of lines uh every time you start a fresh agent session like claude at this point has been 200 000 tokens and then also consider like a million tokens)

So with AI, one of my projections was looking at scaling to basically the possibility in three years to be able to afford, I guess average human being able to afford using 1 billion tokens per day. you get to give a token as like what do they say 0.75 words it's close to a word if you want to generalize fact check that please and then but if you can scale to 1 billion tokens a day if you convert that to code output I was comparing it to my own commits and that was 3 years worth of software development that can be compressed into one single day so at that point we're talking like the ai can absolutely handle the generation and at cost and scale and speed of course we're talking about a few orders of a couple orders of magnitude where we are from today but honestly uh i would say some people are honestly already there and companies at scale are definitely very close like you are just able to commit so much code um but of course when it comes to that kind of scale doing reviewing three years of working a single day like i think it's obvious at that point when you're like oh man like it's literally impossible to read all that code uh and i would love to add some uh code uh code line examples i have it So now if a single person, now we know that single people are going to basically manage entire systems. The question is how do you manage a system at scale? And that's where legibility comes in. How do we understand what the system can do? How do we have a clear understanding of where the boundaries are? If you imagine a building is a great example. Since software is abstract, it's hard to see a visualization of where the inputs and outputs are, what it can actually do, unless that kind of stuff is made intentional. Now for me I'm seeing using visuals, using automated visual tool, building automated visualization tools to to visualize code quality and structure.

So, yes. So now we're looking to... It seems like at this current stage it's like planning is really key because planning is... You can generate a lot of code, like bad code and then reviewing it can be a challenge but planning is going to be important for... So being able to visualize and understand the system is also important too, because when you want to plan new things you want to have confidence that you can change it at scale and not break it. And we're talking about doing things that whole teams used to manage. And if you can't understand where a new feature fits in then you hit a complexity limit. So this kind of idea is making things visible and your process visible is applicable to anyone using AI these days in my opinion because basically what it means is that we can do so much more on a computer than we could have done before, than was humanly possible before.


---

## 3. What Breaks When Legibility Breaks

<!-- TODO: Voice transcribe this section -->

---

## 4. The 3 Pillars

### Pillar 1: Temporal + Domain Legibility

<!-- TODO: Voice transcribe this section -->

### Pillar 2: Modularity + Low Cognitive Load

<!-- TODO: Voice transcribe this section -->

### Pillar 3: Standardization / Consistency

<!-- TODO: Voice transcribe this section -->

---

## 5. Legibility Checklist

<!-- TODO: Voice transcribe this section -->

---

## 6. Closing

<!-- TODO: Voice transcribe this section -->
