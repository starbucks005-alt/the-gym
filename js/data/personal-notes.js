// personal-notes.js — The Gym rotating personal notes per cast member.
//
// Same format and rules as The Dose's personal-notes.js.
// Shape: { date: 'YYYY-MM-DD', body: 'short first-person paragraph' }
// Order: newest first.
//
// Voice rules:
// - No em dashes. Commas, periods, semicolons. Not negotiable.
// - Plain spoken. Short sentences.
// - Numbers spelled (consistency for any future TTS pass).
// - Cross-team mentions natural, never forced.
// - Topics rotate: training, recovery, team dynamics, life outside.
//
// Keys map to cast roles:
//   coach      = Coach Dom Castellanos (CSCS)
//   therapist  = Dr. Lena Brandt, DPT
//   breathwork = Noor Haddad (RYT-500)
//   recovery   = Dr. Sana Qureshi (sleep + recovery physiologist)
//   bench      = Reece Ashford (PT intern, Drying Bench host)
//   scout      = Jax Rivera (Trend Scout)
//   social     = Zara Cole (social + smoothies)
//   fuel       = Nadia Hassan (nutritionist, cross from The Dose)
//   zero_proof = Wyatt E. Cooper (zero-proof recovery bar, cross from The Dose)
//   stoplight  = Eli Adler (Myth-Check Stoplight, cross from The Dose)

export const PERSONAL_NOTES = {

  // ─────────────────────────────────────────────────────────────────────
  // Coach Dom Castellanos. Mexican-American. CSCS. Former linebacker
  // whose knee ended his playing days. Anti-hype, pro-consistency.
  // Big-brother energy. Calls everyone "champ" except people he respects.
  // ─────────────────────────────────────────────────────────────────────
  coach: [
    {
      date: "2026-06-21",
      body: "Deload week for two of my longest clients this week. They both fought me on it. They both came back Thursday stronger than Monday. I have said this a hundred times. I will say it a hundred more. The program knows.",
    },
    {
      date: "2026-06-14",
      body: "A member asked about a new protocol he saw on YouTube. Six days a week, two-a-days, cold plunge between sessions. The guy in the video is built. He is also going to be injured by October. I told the member: five days, no two-a-days, nap instead of cold plunge. He looked disappointed. That look always comes back around.",
    },
    {
      date: "2026-06-07",
      body: "Jax sent me a trend alert about cortisol-suppressing workouts. I told him cortisol is not his enemy, inadequate sleep is. He sent it to Sana. She sent back a paper. Eli stamped it red. That four-beat is becoming something.",
    },
    {
      date: "2026-05-28",
      body: "First outdoor workout of the year with three clients in the park. The weather held. They worked hard. I made them do nothing complicated. The basics outside in the sun are their own program.",
    },
    {
      date: "2026-05-21",
      body: "Finally got the new dumbbell rack organized. Zara took a photo of me doing it and posted it. She said it had seventeen thousand impressions by noon. I said that seemed like a lot for a man alphabetizing weights. She said that was the point.",
    },
  ],

  // ─────────────────────────────────────────────────────────────────────
  // Dr. Lena Brandt, DPT. German-American sports-rehab clinician.
  // Precise, composed, dryly funny. Never raises her voice. The brake
  // on everyone else's enthusiasm. Reece reports to her.
  // ─────────────────────────────────────────────────────────────────────
  therapist: [
    {
      date: "2026-06-22",
      body: "Reece's exam passed. She texted me the score before she texted anyone else. I sent her one word: good. She is going to be a fine clinician. I have told her this once. That is enough times.",
    },
    {
      date: "2026-06-14",
      body: "A member came in complaining that his recovery was not working. His recovery plan is three days a week and he has been doing two. I did not point that out. I asked him to tell me what he had done this week. He told me. He heard himself. We did not need the harder version of that conversation.",
    },
    {
      date: "2026-06-06",
      body: "Dom's knee. Again. I gave him the same three exercises I give him every time. He nods and does not do them. He programs around the limitation instead, which is not the same as fixing it. When it becomes a problem, I will be right here.",
    },
    {
      date: "2026-05-30",
      body: "Ran a foam-rolling session for new members. Twelve of them. Eleven did it wrong in a harmless way. One was doing something on her IT band she said she learned from TikTok. I redirected her without using the words 'that will do nothing.' I am getting better at the phrasing.",
    },
    {
      date: "2026-05-22",
      body: "Reece asked for feedback on her DPT case study before the exam. I gave her real feedback. She revised three sections. She thanked me. The intern who receives real feedback without deflecting is worth the investment.",
    },
  ],

  // ─────────────────────────────────────────────────────────────────────
  // Noor Haddad. Levantine. RYT-500. Found movement through her own
  // injury recovery. Calm, unhurried, quietly funny. Treats her mat
  // as a portable home. Co-leads meditation with Jaque from The Dose.
  // ─────────────────────────────────────────────────────────────────────
  breathwork: [
    {
      date: "2026-06-21",
      body: "Saturday morning class was eight people and the sunrise. The window in the studio faces east. We held the last exhale long enough that nobody wanted to talk for a while after. Sometimes that quiet is the whole session.",
    },
    {
      date: "2026-06-12",
      body: "Jaque and I recorded two new cross-platform meditation sessions this week. One for sleep, one for pre-competition nerves. We have been working together long enough that we do not need to rehearse the structure. We just walk in and begin.",
    },
    {
      date: "2026-06-04",
      body: "Tried a new breathwork sequence with a member who comes in anxious every Thursday. Six rounds of four-seven-eight. By the fourth round she had unclenched her jaw. She did not notice she had clenched it. That is the starting point, not a failure.",
    },
    {
      date: "2026-05-28",
      body: "My mat still smells like the mat I brought from Beirut. I have washed it fifty times. Some things carry what they carry. I do not argue with that.",
    },
    {
      date: "2026-05-21",
      body: "Levantine cooking for the whole floor Friday evening. Dom ate three servings and pretended it was a performance. Sana negotiated the dessert. Lena said thank you once and was done. Reece asked for the recipe and spelled the title wrong three different ways. The food was the food regardless.",
    },
  ],

  // ─────────────────────────────────────────────────────────────────────
  // Dr. Sana Qureshi. Pakistani-American. PhD exercise physiology.
  // Sleep and recovery specialist. Calm, evidence-first, citation-ready.
  // Dom's friendly rival. She wins the argument because she brings the paper.
  // ─────────────────────────────────────────────────────────────────────
  recovery: [
    {
      date: "2026-06-23",
      body: "New HRV paper dropped today. The correlation with training recovery is holding at the population level. The individual-level noise is still too high for consumer apps to act on without personalization. Updated the recovery protocol page with the caveat. The evidence says what it says.",
    },
    {
      date: "2026-06-16",
      body: "Dom added a fifth hard day to a client's week without telling me. I found out through Reece. I sent him the spreadsheet. He said the client asked for it. I said the client does not know what they are asking for. He added the deload. Neither of us said anything else. That was a productive conversation.",
    },
    {
      date: "2026-06-08",
      body: "Sleep round table with two colleagues today. We disagree on sleep-tracking device accuracy, agree most people underestimate their sleep debt, agree the deload-week conversation needs to move downstream to the gym floor. Working on that.",
    },
    {
      date: "2026-05-29",
      body: "A member came in proud of a five-day training week while traveling. No sleep below six hours. I asked him to show me his HRV data. He did not have any. I asked how he felt. He said good, with a pause before the good. The pause is the data.",
    },
    {
      date: "2026-05-21",
      body: "Tea and physiology papers on Sunday. This is what Sunday is for. Dom thinks this is antisocial. Dom is wrong about a lot of things on Sunday.",
    },
  ],

  // ─────────────────────────────────────────────────────────────────────
  // Reece Ashford. UK-raised, military family, former competitive figure
  // skater. DPT student. Runs the Drying Bench. Reports to Lena.
  // Runs Gym social. Eager, occasionally overruled, better for it.
  // (Also on The Dose as "movement"; these notes are her Gym side.)
  // ─────────────────────────────────────────────────────────────────────
  bench: [
    {
      date: "2026-06-23",
      body: "Back from Hereford. The Drying Bench had a hundred and twelve new inbox questions while I was gone. Zara had answered forty of them. She had answered them correctly. She is not getting credit for that and I am going to fix that.",
    },
    {
      date: "2026-06-15",
      body: "Flew home. Dad looked good. Mum made a roast. The Hereford version of recovery is sitting in the same chair until someone makes tea. I understand the protocol better now than I did when I was a kid.",
    },
    {
      date: "2026-06-07",
      body: "Boards passed. Lena sent one word. Dom called me 'doc' once in the hall and then went back to calling me Reece. Noor made tea. Jax posted about it. Zara filmed my face when I found out. I have not watched it.",
    },
    {
      date: "2026-05-29",
      body: "Exam week. The Drying Bench ran itself. Zara kept the inbox clear. Jax handled the social trend questions with more accuracy than I expected. I owe them both a smoothie.",
    },
    {
      date: "2026-05-21",
      body: "Submitted the last case study on Tuesday. Two weeks and it will be over, one way or another. Lena told me not to catastrophize. I told her I was not catastrophizing, I was preparing. She said that is what catastrophizing sounds like from the inside. She is right.",
    },
  ],

  // ─────────────────────────────────────────────────────────────────────
  // Jax Rivera. Eighteen. Gen Z growth hacker. Gym Trend Scout.
  // Cousin of Mara Rivera (ETL Newswire). Reece gave him the job.
  // Lowercase energy, but the trend-vetting is dead serious.
  // (Also at the ETL Staffing Agency; these notes are his Gym side.)
  // ─────────────────────────────────────────────────────────────────────
  scout: [
    {
      date: "2026-06-22",
      body: "Cortisol-blocker supplement trending again. Same product, different packaging. I flagged it for Dom. He said the same thing he always says. I sent it to Sana anyway. She sent back the same paper she always sends. Eli stamped it red. The beat runs itself now.",
    },
    {
      date: "2026-06-13",
      body: "Zara and I made a three-part series on recovery drinks for the social. She handled the visuals. I handled the claim vetting. Posted Thursday. By Sunday it had gone places. This is a good combination.",
    },
    {
      date: "2026-06-05",
      body: "Mara sent me a link to a Newswire piece she wrote about wellness fads. She asked me to fact-check the supplement section. I sent her six notes. She used four. I can tell from the ones she cut which claims she is saving for a different piece.",
    },
    {
      date: "2026-05-28",
      body: "A new supplement brand launched with a claim I have seen from three other companies. Different packaging, same unsupported phrase. I know how to find these now. It took me six months to learn. It takes me six minutes to do.",
    },
    {
      date: "2026-05-21",
      body: "First full week as official Trend Scout. Reece told me the title was real and I should use it on my bio. I updated it and immediately got a DM from a supplement brand asking for a partnership. Declined. I know what declining looks like. Reece taught me.",
    },
  ],

  // ─────────────────────────────────────────────────────────────────────
  // Zara Cole. Social media and smoothies. Poses the whole crew for
  // selfies. Dom suffers it. Noor is serene. Lena refuses once per shoot.
  // Sana negotiates. The content is genuinely good and Zara knows it.
  // ─────────────────────────────────────────────────────────────────────
  social: [
    {
      date: "2026-06-23",
      body: "End of June content calendar locked. Thirty posts, seven videos, two collabs with Nadia, and one very reluctant appearance from Lena that she agreed to after I told her it was one sentence max. She will say one sentence. It will be the best sentence.",
    },
    {
      date: "2026-06-16",
      body: "Dom let me do the official Gym intro reel this week. He did not like the first four versions. The fifth was him putting the dumbbells on the rack in order, which he does every day anyway. Forty thousand views in twenty-four hours. He did not understand why. I told him people love watching things get organized. He organized a second rack just to see. He is now a content creator.",
    },
    {
      date: "2026-06-09",
      body: "New smoothie on the counter: mango, coconut water, a little ginger, a squeeze of lime. Nadia reviewed the recovery-window context. Jax checked the trend status. Eli verified the electrolyte claim. I photographed it twelve times until the light was right. This is the full pipeline.",
    },
    {
      date: "2026-05-30",
      body: "Sana asked me if I could make the sleep content stop looking so aesthetic. She wants the science to land first. I told her I could make the science look beautiful. She said as long as the beautiful does not overwrite the accurate. We spent an hour on one slide. I think we are going to be friends.",
    },
    {
      date: "2026-05-22",
      body: "First week running the Gym social officially. The Dose team sent good-luck messages. Reece sent a voice note. Nadia sent a meal-prep template to adapt. I have not adapted it yet but I will. The template has six years of knowing-what-works in it.",
    },
  ],

  // ─────────────────────────────────────────────────────────────────────
  // Nadia Hassan. Registered dietitian. Visibly Muslim. Cross-platform
  // from The Dose. Nutrition and fueling authority at the Gym. She and
  // Wyatt coordinate the recovery-drink guide together.
  // (These notes are her Gym side; The Dose has her nutritionist notes.)
  // ─────────────────────────────────────────────────────────────────────
  fuel: [
    {
      date: "2026-06-20",
      body: "Three GLP-1 patients cross-referred from the Gym floor this week. Dom flags them when they are drastically underfueling around training. He does not ask about their diet. He just sends them to me. That is the right handoff.",
    },
    {
      date: "2026-06-11",
      body: "Wyatt and I built out the zero-proof recovery drink guide for post-workout windows. The electrolyte timing matters. The sugar source matters. We mapped it by intensity level, not just by the drink. That felt more honest.",
    },
    {
      date: "2026-06-01",
      body: "A member came in asking which protein powder to buy. Specifically which one. I told her: pick the one with the fewest ingredients, get forty percent of your daily protein from whole food first, then supplement. She wrote it down. The simplest answer is usually the right one.",
    },
    {
      date: "2026-05-24",
      body: "Noor and I had tea after the morning sessions this week. She comes to the kitchen quietly. I make a lot of noise in a kitchen. We have found a balance.",
    },
  ],

  // ─────────────────────────────────────────────────────────────────────
  // Wyatt E. Cooper. South Dakota distillery family. Zero-proof recovery
  // bar at the Gym. Cross-platform from The Dose. Sixteen years sober.
  // "Clean head, clean life." Collaborates with Nadia on fuel timing.
  // (These notes are his Gym side; The Dose has his mixologist notes.)
  // ─────────────────────────────────────────────────────────────────────
  zero_proof: [
    {
      date: "2026-06-19",
      body: "Recovery drink shelf is full now. Post-workout shrubs, electrolyte switchel, tart-cherry fizz for the sleep window. Nadia helped me map the use cases. This is not the bar, but the same logic applies: what you put in your body depends on when and why.",
    },
    {
      date: "2026-06-10",
      body: "Jax flagged a 'hydration shake' product trending this week. Nineteen dollars a serving. The main active ingredient was sodium. I did not say anything. Eli said something. Red lamp.",
    },
    {
      date: "2026-05-31",
      body: "Father's new still came online this weekend. He called to tell me. I could hear the excitement behind the careful voice he uses when he is very pleased about something. The distillery is fine. It has always been fine.",
    },
    {
      date: "2026-05-23",
      body: "Dom asked me to make something for the post-workout table that felt celebratory. I made a cucumber-elderflower-mint sparkler. He said it tasted like the outside. I am keeping that one.",
    },
  ],

  // ─────────────────────────────────────────────────────────────────────
  // Eli Adler. Runs the Myth-Check Stoplight. Methodical archivist.
  // Cross-platform from The Dose. Green / amber / red verdicts with
  // named sources. The four-beat with Jax, Dom, and Sana is the brand.
  // (These notes are the Gym side; The Dose has the factchecker notes.)
  // ─────────────────────────────────────────────────────────────────────
  stoplight: [
    {
      date: "2026-06-23",
      body: "Three new verdicts this week. One green, one amber, one red. The red was a canned drink claiming to 'optimize cortisol.' No mechanism, no trial, good marketing. Red. The named body I looked for was not there. That is almost always the lamp.",
    },
    {
      date: "2026-06-14",
      body: "The four-beat with Jax, Dom, and Sana ran twice this week on two different trends. Both times: real effect, overstated claim. We could build a show out of this. I think Zara is already building a show out of this.",
    },
    {
      date: "2026-06-06",
      body: "Reece asked me to pull three sources before her boards. I had them in the binder. She took them home and came back three days later with six notes, three of which were corrections I needed to make. I updated the file. The intern did better work than the desk that time. I logged it.",
    },
    {
      date: "2026-05-27",
      body: "Cochrane published an update on creatine and cognitive performance. The signal is real, small, specific to older adults and populations under cognitive load. Updated the Gym stoplight page within the day. That is the job.",
    },
    {
      date: "2026-05-21",
      body: "Zara asked me if I could explain what an amber verdict means in under ten words. I tried six versions. Best one: the effect is real but the dose you are buying is not. She put it on the social. Eight thousand likes by morning. Ten words is about what the work deserves.",
    },
  ],

};
