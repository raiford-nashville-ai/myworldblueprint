// Illustrative noncanonical response fixtures, never a live AI response.
export const responses = {
  world: {
    id: "demo.world.tideglass",
    name: "Tideglass",
    type: "World",
    kind: "MemoryHarbor",
    slogan: "What the sea remembers, the town must learn to carry.",
    intent:
      "Explore the cost of remembering and the relationships that preserve a community.",
    essence:
      "A coastal town where the returning tide carries memories its inhabitants once surrendered.",
    place: "The Salt Archive",
    placeDescription:
      "Beneath the lighthouse, glass vessels hold memories until someone is ready to receive them.",
    time: "The evening before the equinox",
    timeDescription:
      "The longest tide in a generation is approaching. A sealed vessel has begun to speak.",
    qualia:
      "Salt on the lips. Warm lamplight. The unease of recognizing a voice you cannot place.",
    entities: [
      {
        id: "demo.entity.keeper",
        name: "The Keeper",
        type: "Person",
        kind: "MemoryCustodian",
        slogan: "Someone must decide what returns.",
        intent: "Guard the exchange of memories.",
        essence: "Responsibility",
        detail:
          "Keeps the lighthouse lit but refuses to open one vessel bearing their own name.",
      },
      {
        id: "demo.entity.archive",
        name: "The Salt Archive",
        type: "Place",
        kind: "MemoryRepository",
        slogan: "Nothing forgotten is truly gone.",
        intent: "Shelter memories awaiting their owners.",
        essence: "Preservation",
        detail:
          "Its shelves descend below the waterline. The oldest vessels have no labels.",
      },
      {
        id: "demo.entity.tide",
        name: "The Returning Tide",
        type: "Process",
        kind: "MemoryExchange",
        slogan: "Every return asks for a leaving.",
        intent: "Carry surrendered memories to shore.",
        essence: "Exchange",
        detail:
          "A memory can be recovered only by surrendering another. It cannot be copied.",
      },
    ],
    triples: [
      ["demo.world.tideglass", "contains", "demo.entity.keeper"],
      ["demo.world.tideglass", "contains", "demo.entity.archive"],
      ["demo.world.tideglass", "contains", "demo.entity.tide"],
      ["demo.entity.keeper", "protects", "demo.entity.archive"],
      ["demo.entity.tide", "delivers_to", "demo.entity.archive"],
    ],
    rules: [
      "Every recovered memory requires another to be surrendered.",
      "The exchange changes personal memory, not established physical history.",
      "No entity’s inner world is expanded without a new blueprint.",
    ],
    questions: [
      "Why has a vessel begun speaking before the tide arrives?",
      "What memory would the Keeper sacrifice to open their own vessel?",
    ],
  },
  character: {
    id: "demo.character.storykeeper",
    name: "The Story Keeper",
    type: "Person",
    kind: "Archivist",
    slogan: "No story should disappear unheard.",
    intent: "Preserve forgotten stories without losing their own voice.",
    essence:
      "An archivist whose gift for listening has become a way to avoid being known.",
    place: "The Unfinished Library",
    placeDescription: "An archive of stories abandoned before their endings.",
    time: "The night a letter arrives",
    timeDescription:
      "For the first time, a story on the shelves addresses the Keeper by name.",
    qualia: "Paper dust, cold tea, the unexpected warmth of being remembered.",
    entities: [
      {
        id: "demo.entity.library",
        name: "The Library",
        type: "Place",
        kind: "StorySanctuary",
        slogan: "An ending can wait.",
        intent: "Shelter unfinished stories.",
        essence: "Patience",
        detail: "A sanctuary the Keeper has mistaken for the whole world.",
      },
      {
        id: "demo.entity.letter",
        name: "The Unsent Letter",
        type: "Object",
        kind: "Invitation",
        slogan: "A voice looking for its listener.",
        intent: "Invite the Keeper beyond the archive.",
        essence: "Possibility",
        detail: "Its final page remains blank.",
      },
    ],
    triples: [
      ["demo.character.storykeeper", "lives_in", "demo.entity.library"],
      ["demo.character.storykeeper", "receives", "demo.entity.letter"],
    ],
    rules: [
      "Listening is a learned practice, not supernatural mind-reading.",
      "The Keeper must choose whether to answer; the letter cannot compel them.",
    ],
    questions: [
      "Whose story has the Keeper refused to hear?",
      "What would they write on the final page?",
    ],
  },
};
