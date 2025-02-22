import { TWord } from "../ts/appTypes";

const DEFAULT_WORDS: TWord[] = [
  {
    id: "agitated",
    topics: ["emotions"],
    concept: "agitated",
    definition: "physically disturbed or set in motion",
    example:
      "My daughter always responds to me in a negative way, angrily shrugging her shoulders with an agitated reply, as if I should know that.Washington Post (Apr 22, 2016)",
  },
  {
    id: "astonished",
    topics: ["emotions"],
    concept: "astonished",
    definition: "filled with the emotional impact of overwhelming surprise",
    example:
      "I just saw it go up, and I was astonished that it didn’t come back down again.New York Times (Apr 28, 2016)",
  },
  {
    id: "blase",
    topics: ["emotions"],
    concept: "blase",
    definition: "nonchalantly unconcerned",
    example:
      "Compliance adviser Gould said that while some bankers were genuinely frightened, others were blase, viewing this as simply another set of rules from regulators.Reuters (Mar 6, 2016)",
  },
  {
    id: "cocky",
    topics: ["emotions"],
    concept: "cocky",
    definition: "overly self-confident or self-assertive",
    example: '"I bet I got a higher score than you did," Claire says, her voice cocky.Out of My Mind',
  },
  {
    id: "despondent",
    topics: ["emotions"],
    concept: "despondent",
    definition: "without or almost without hope",
    example:
      "At times he sounded almost despondent, questioning not just the ugly turn the presidential campaign has taken but the future of the American political system.New York Times (May 29, 1457)",
  },
  {
    id: "disgust",
    topics: ["emotions"],
    concept: "disgust",
    definition: "strong feelings of dislike",
    example:
      "Despite polls showing increasing public disgust with Albany, significant proposals to address corruption have gone nowhere.Washington Times (May 3, 2016)",
  },
  {
    id: "discombobulated",
    topics: ["emotions"],
    concept: "discombobulated",
    definition: "having self-possession upset; thrown into confusion",
    example:
      "One former staff member I spoke with, who developed an ulcer while working there, called The Huffington Post ‘‘a jury-rigged, discombobulated chaos machine.’’New York Times (Jun 30, 2015)",
  },
  {
    id: "dubious",
    topics: ["emotions"],
    concept: "dubious",
    definition: "fraught with uncertainty or doubt",
    example:
      "Mrs. Clinton agreed to explore the proposal but was dubious that it would go anywhere.New York Times (May 2, 2016)",
  },
  {
    id: "elation",
    topics: ["emotions"],
    concept: "elation",
    definition: "a feeling of joy and pride",
    example:
      "If anything, I better understand the elation they feel when they welcome a child into the world.Washington Post (Feb 26, 2016)",
  },
  {
    id: "embarrassment",
    topics: ["emotions"],
    concept: "embarrassment",
    definition: "the shame felt when inadequacy or guilt is made public",
    example:
      "The sophomore said he regrets his actions and the embarrassment he caused his family and his team.Washington Times (May 6, 2016)",
  },
  {
    id: "enamored",
    topics: ["emotions"],
    concept: "enamored",
    definition: "marked by foolish or unreasoning fondness",
    example:
      "Was there ever a male performer more enamored with ruffles — or lace or velvet — than Prince?Washington Post (Apr 21, 2016)",
  },
  {
    id: "enraged",
    topics: ["emotions"],
    concept: "enraged",
    definition: "marked by extreme anger",
    example:
      'The American military presence on Saudi soil enraged Islamic radicals, who decried the Sauds’ decision to allow "infidel" Western forces into Islam’s birthplace.The Guardian (Apr 22, 2016)',
  },
  {
    id: "enthusiasm",
    topics: ["emotions"],
    concept: "enthusiasm",
    definition: "a feeling of excitement",
    example:
      "Encouragement and enthusiasm are critical for nurturing early interest and maintaining later interest in science, technology, engineering and math.US News (May 9, 2016)",
  },
  {
    id: "exultation",
    topics: ["emotions"],
    concept: "exultation",
    definition: "the utterance of sounds expressing great joy",
    example:
      "Out of the water, they laughed in exultation and triumph while Roger snapped pictures.Washington Post (Nov 3, 2015)",
  },
  {
    id: "festive",
    topics: ["emotions"],
    concept: "festive",
    definition: "offering fun and gaiety",
    example:
      "On New Year’s Eve, my husband and I made a special effort to create a festive table for our small dinner group.Washington Post (Apr 8, 2016)",
  },
  {
    id: "fury",
    topics: ["emotions"],
    concept: "fury",
    definition: "a feeling of intense anger",
    example:
      "A universe of fury seemed to spin inside Mark, an impossible feeling that he knew couldn’t last, couldn’t be contained.The Kill Order (Maze Runner, Book Four; Origin)",
  },
  {
    id: "gleeful",
    topics: ["emotions"],
    concept: "gleeful",
    definition: "full of high-spirited delight",
    example:
      "As a team, they delivered epic, angular rock songs that jumped genres and eras with gleeful abandon.Los Angeles Times (Jan 24, 2016)",
  },
  {
    id: "grief",
    topics: ["emotions"],
    concept: "grief",
    definition: "intense sorrow caused by loss of a loved one",
    example:
      "Without warning something would trigger my grief and my heart was ripped open again.The Guardian (May 8, 2016)",
  },
  {
    id: "hopeful",
    topics: ["emotions"],
    concept: "hopeful",
    definition: "having or manifesting optimism",
    example:
      "We were hopeful this year would be the year in which anti-bullying legislation reached the finish line.Washington Times (May 9, 2016)",
  },
  {
    id: "hostile",
    topics: ["emotions"],
    concept: "hostile",
    definition: "characterized by enmity or ill will",
    example:
      "But disputes over division of property and one spouse’s resentment over being left can prolong hostile feelings for more than a decade.",
  },
  {
    id: "indifferent",
    topics: ["emotions"],
    concept: "indifferent",
    definition: "marked by a lack of interest",
    example:
      "The universe seems neither benign nor hostile, merely indifferent to the concerns of such puny creatures as we",
  },
  {
    id: "indignant",
    topics: ["emotions"],
    concept: "indignant",
    definition: "angered at something unjust or wrong",
    example: "Find out if you're righteously indignant but actually in the wrong",
  },
  {
    id: "irritated",
    topics: ["emotions"],
    concept: "irritated",
    definition: "aroused to impatience or anger",
    example:
      'Irritated at her grilling, he snapped, "At what point are we playing husband and wife here, and at what point lawyers?"',
  },
  {
    id: "jubilant",
    topics: ["emotions"],
    concept: "jubilant",
    definition: "full of high-spirited delight",
    example: "Jubilant supporters said it was the best day of their lives as they left the King Power stadium",
  },
  {
    id: "lachrymose",
    topics: ["emotions"],
    concept: "lachrymose",
    definition: "showing sorrow",
    example:
      'The lachrymose British drama "Lilting" pivots on the prickly relationship between two people who are mourning a third.New York Times (Sep 25, 2014)',
  },
  {
    id: "listless",
    topics: ["emotions"],
    concept: "listless",
    definition: "lacking zest or vivacity",
    example:
      "An animal sits listless and unresponsive, holding tight to the bars of the cage as her normal twin sister crawls all over her.Nature (Apr 19, 2016)",
  },
  {
    id: "livid",
    topics: ["emotions"],
    concept: "livid",
    definition: "furiously angry",
    example:
      "My parents would be livid if they found out I’d had this conversation and might end contact with me altogether.Slate (Mar 28, 2016)",
  },
  {
    id: "melancholy",
    topics: ["emotions"],
    concept: "melancholy",
    definition: "a constitutional tendency to be gloomy and depressed",
    example:
      'Later that evening, Moyers found him in a " melancholy mood," and asked him "what was troubling him."Salon (Apr 30, 2016)',
  },
  {
    id: "nervous",
    topics: ["emotions"],
    concept: "nervous",
    definition: "causing or fraught with or showing anxiety",
    example:
      "Mark takes a quick look around and sees that the others are fidgety and nervous.The Kill Order (Maze Runner, Book Four; Origin)",
  },
  {
    id: "nonchalant",
    topics: ["emotions"],
    concept: "nonchalant",
    definition: "marked by casual unconcern or indifference",
    example:
      "Some will walk into the testing room nonchalant and relaxed; others will be so nervous they couldn’t finish breakfast.Washington Times (May 4, 2016)",
  },
  {
    id: "nonplussed",
    topics: ["emotions"],
    concept: "nonplussed",
    definition: "filled with bewilderment",
    example:
      "He seemed nonplussed that anyone would think he was at fault for the incident.The Guardian (Dec 31, 2015)",
  },
  {
    id: "panic",
    topics: ["emotions"],
    concept: "panic",
    definition: "an overwhelming feeling of fear and anxiety",
    example:
      "The roar frightened the horses to such an extent that some galloped off in panic, dragging the ploughs in different directions, and others collapsed.Cosmos",
  },
  {
    id: "pensive",
    topics: ["emotions"],
    concept: "pensive",
    definition: "deeply or seriously thoughtful",
    example:
      "Clinton seems more pensive now than in 2008 – attempting to apply a heightened authenticity and level of reflection.Salon (Jun 23, 2015)",
  },
  {
    id: "perplexed",
    topics: ["emotions"],
    concept: "perplexed",
    definition: "full of difficulty or confusion or bewilderment",
    example:
      "Foreign visitors were especially perplexed by the apparent absence of scientific ambition at the lab.Big Science",
  },
  {
    id: "quizzical",
    topics: ["emotions"],
    concept: "quizzical",
    definition: "perplexed",
    example:
      'And in case that leaves the people you’ve stumped with only a quizzical look on their faces, you can add, "You know, iron-overload disease."Washington Post (Sep 2, 2013)',
  },
  {
    id: "rage",
    topics: ["emotions"],
    concept: "rage",
    definition: "a feeling of intense anger",
    example:
      "I'm not sure if the red haze clouding my vision is because of the pain from my leg or my rage at her presence.Legend",
  },
  {
    id: "repugnance",
    topics: ["emotions"],
    concept: "repugnance",
    definition: "intense aversion",
    example:
      "His small blue eyes shone with repugnance, a look of such unreasoning contempt for my skin that it filled me with despair.Black Like Me",
  },
  {
    id: "scared",
    topics: ["emotions"],
    concept: "scared",
    definition: "made afraid",
    example:
      "I was a bit scared about speaking up about it in case there was a negative backlash, she said.BBC (May 11, 2016)",
  },
  {
    id: "serene",
    topics: ["emotions"],
    concept: "serene",
    definition: "not agitated",
    example:
      "She seems remarkably serene for a person who regularly inhabits the darkest places an actress can visit.Los Angeles Times (Apr 6, 2016)",
  },
  {
    id: "skeptical",
    topics: ["emotions"],
    concept: "skeptical",
    definition: "marked by or given to doubt",
    example:
      '"I was initially quite skeptical that such particles could be preserved in 2.7-billion-year-old rocks, but the evidence looks convincing," she wrote in an email.National Geographic (May 11, 2016)',
  },
  {
    id: "sorrow",
    topics: ["emotions"],
    concept: "sorrow",
    definition: "an emotion of great sadness associated with loss",
    example:
      "The grim scenery seemed to reflect the sorrow and fear that had overtaken my family.The Guardian (May 8, 2016)",
  },
  {
    id: "stressed",
    topics: ["emotions"],
    concept: "stressed",
    definition: "suffering severe physical strain",
    example:
      "She said she was stressed out, grinding her teeth, overweight, and smoking way too much.Seattle Times (May 4, 2016)",
  },
  {
    id: "sulky",
    topics: ["emotions"],
    concept: "sulky",
    definition: "sullen or moody",
    example:
      "During the visit, Chadwick continued to show his sulky side, treating the American so rudely that his colleagues and friends were forced to make excuses.Big Science",
  },
  {
    id: "surprise",
    topics: ["emotions"],
    concept: "surprise",
    definition: "come upon or take unawares",
    example: 'With a look of surprise and anxiety on his face he asked the Lady Nii, "Where are you to take me?"Cosmos',
  },
  {
    id: "timid",
    topics: ["emotions"],
    concept: "timid",
    definition: "showing fear and lack of courage",
    example:
      "Compared to those who defiantly confronted soldiers and police, I was timid and afraid, yet the deed was defining for me.The New Yorker (May 2, 2016)",
  },
  {
    id: "triumph",
    topics: ["emotions"],
    concept: "triumph",
    definition: "a successful ending of a struggle or contest",
    example:
      "The research was successful, a triumph, as was much of the rest of his life, of reason over superstition.Cosmos",
  },
  {
    id: "umbrage",
    topics: ["emotions"],
    concept: "umbrage",
    definition: "a feeling of anger caused by being offended",
    example:
      "Expect both candidates to take umbrage at the others’ tone — even while replacing their own gloves with brass knuckles.MSNBC (Apr 14, 2016)",
  },
  {
    id: "vain",
    topics: ["emotions"],
    concept: "vain",
    definition: "having an exaggerated sense of self-importance",
    example:
      '"I’m probably the least vain person you’ll meet, but in the looks department, I think God has been good to me."New York Times (Apr 29, 2016)',
  },
  {
    id: "weary",
    topics: ["emotions"],
    concept: "weary",
    definition: "physically and mentally fatigued",
    example:
      "Voters weary of the taunts and insults of the 2016 primary season may pine for a White House campaign about issues.New York Times (May 10, 2016)",
  },
  {
    id: "wrath",
    topics: ["emotions"],
    concept: "wrath",
    definition: "intense anger",
    example:
      "Melissa McCarthy regularly uses her seemingly sweet mien as comedic cover for her ability to unleash monologues of endless and often violently profane  wrath.",
  },
  {
    id: "corporal",
    topics: ["corp"],
    concept: "corporal",
    definition: "affecting the body as opposed to the mind or spirit",
  },
  {
    id: "corporate",
    topics: ["corp"],
    concept: "corporate",
    definition: "of or belonging to a business firm",
  },
  {
    id: "corporation",
    topics: ["corp"],
    concept: "corporation",
    definition: "a business firm recognized by law as a single body",
  },
  {
    id: "corporeal",
    topics: ["corp"],
    concept: "corporeal",
    definition: "having material or physical form or substance",
  },
  {
    id: "corps",
    topics: ["corp"],
    concept: "corps",
    definition: "an army unit usually consisting of two or more divisions",
  },
  {
    id: "corpse",
    topics: ["corp"],
    concept: "corpse",
    definition: "the dead body of a human being",
  },
  {
    id: "corpulent",
    topics: ["corp"],
    concept: "corpulent",
    definition: "excessively fat",
  },
  {
    id: "corpus",
    topics: ["corp"],
    concept: "corpus",
    definition: "a collection of writings",
  },
  {
    id: "corpuscle",
    topics: ["corp"],
    concept: "corpuscle",
    definition: "an unattached cell such as a red or white blood cell",
  },
  {
    id: "habeas corpus",
    topics: ["corp"],
    concept: "habeas corpus",
    definition: "a writ ordering a prisoner to be brought before a judge",
  },
  {
    id: "incorporate",
    topics: ["corp"],
    concept: "incorporate",
    definition: "make into a whole or make part of a whole",
  },
];

export default DEFAULT_WORDS;
