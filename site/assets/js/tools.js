// Tool registry: add Tool identity, copy, and creative questions here.
export const tools = {
  world: {
    name: "World Builder",
    inputLabel: "Your world intention",
    showWritingTips: true,
    icon: "◎",
    description: "Give an idea a world.",
    title: "What world do you want to create?",
    intro:
      "A floating city, a neighborhood full of secrets, a civilization beneath the sea—or the inner world of a single idea. Start with what draws you in: who lives there, what makes it different, or how it feels. A few sentences are enough.",
    placeholder: "A place. A feeling. A possibility…",
    fields: [
      {
        id: "tone",
        label: "Feeling & tone",
        options: [
          "Let it emerge",
          "Curious & hopeful",
          "Quiet & mysterious",
          "Warm & whimsical",
          "Dark & uneasy",
        ],
      },
      {
        id: "scale",
        label: "World scale",
        options: ["Start small", "A place", "A region", "A whole world"],
      },
      {
        id: "essentials",
        label: "What must exist?",
        placeholder: "A rule, a place, a relationship…",
      },
    ],
    extra: [
      {
        id: "avoid",
        label: "Leave out",
        placeholder: "Anything that doesn’t belong…",
      },
      {
        id: "freedom",
        label: "Room for invention",
        options: [
          "Build on my idea",
          "Stay close to my words",
          "Surprise me within my boundaries",
        ],
      },
    ],
  },
  character: {
    name: "Character Builder",
    inputLabel: "Your character intention",
    showWritingTips: false,
    icon: "♙",
    description: "Give a story a voice.",
    title: "Who do you want to discover?",
    intro: "Begin with a voice, a desire, or someone you can almost see.",
    placeholder: "A voice. A longing. A contradiction…",
    fields: [
      {
        id: "role",
        label: "Role in the story",
        options: [
          "Let it emerge",
          "Protagonist",
          "Ally",
          "Antagonist",
          "Supporting character",
        ],
      },
      {
        id: "desire",
        label: "What do they want?",
        placeholder: "The thing they’re reaching for…",
      },
      {
        id: "tension",
        label: "What stands in their way?",
        placeholder: "A fear, a belief, a relationship…",
      },
    ],
    extra: [
      {
        id: "avoid",
        label: "Leave out",
        placeholder: "Tropes or themes to avoid…",
      },
      {
        id: "freedom",
        label: "Room for invention",
        options: [
          "Build on my idea",
          "Stay close to my words",
          "Surprise me within my boundaries",
        ],
      },
    ],
  },
};
