import { $, element } from "./dom.js";
function section(label) {
  const node = element("section", "sheet-section");
  node.append(element("span", "sheet-label", label));
  return node;
}
export function renderBlueprint(d) {
  const sheet = $("blueprint-sheet");
  sheet.replaceChildren();
  const meta = element("div", "sheet-meta");
  meta.append(
    element("span", "", d.type.toUpperCase() + " BLUEPRINT / STUDY 01"),
    element("span", "draft-stamp", "SPECULATIVE DRAFT"),
  );
  const title = element("h2", "", d.name);
  title.id = "blueprint-name";
  title.tabIndex = -1;
  sheet.append(
    meta,
    title,
    element("div", "sheet-slogan", d.slogan),
    element("p", "sheet-essence", d.essence),
  );
  const identity = section("01 / The enduring seed"),
    columns = element("div", "sheet-columns");
  [
    ["Intent", d.intent],
    ["Identity", d.type + " · " + d.kind + " · " + d.id],
  ].forEach(([name, value]) => {
    const fact = element("div", "sheet-fact");
    fact.append(element("b", "", name), element("p", "", value));
    columns.append(fact);
  });
  identity.append(columns);
  sheet.append(identity);
  const context = section("02 / A place, a moment, a feeling"),
    places = element("div", "sheet-columns");
  [
    [d.place, d.placeDescription],
    [d.time, d.timeDescription],
  ].forEach(([name, value]) => {
    const fact = element("div", "sheet-fact");
    fact.append(element("b", "", name), element("p", "", value));
    places.append(fact);
  });
  context.append(places, element("p", "sheet-essence", d.qualia));
  sheet.append(context);
  const beings = section("03 / Seeds of inner worlds"),
    cards = element("div", "entity-cards");
  d.entities.forEach((e) => {
    const card = element("details", "entity-card");
    card.append(
      element("summary", "", e.name),
      element("small", "", e.type + " / " + e.kind),
      element("p", "", e.detail),
      element("p", "", "Slogan: " + e.slogan),
      element("p", "", "Intent: " + e.intent),
      element("p", "", "Essence: " + e.essence),
      element("small", "", "Inner world: unexpanded"),
    );
    cards.append(card);
  });
  beings.append(cards);
  sheet.append(beings);
  const mesh = section("04 / The living mesh");
  const names = Object.fromEntries([
    [d.id, d.name],
    ...d.entities.map((e) => [e.id, e.name]),
  ]);
  d.triples.forEach((t) => {
    const row = element("div", "mesh-triple");
    row.append(
      element("span", "", names[t[0]]),
      element("span", "", t[1] + " →"),
      element("span", "", names[t[2]]),
    );
    mesh.append(row);
  });
  sheet.append(mesh);
  const laws = section("05 / What must remain true"),
    list = element("ul");
  d.rules.forEach((rule) => list.append(element("li", "", rule)));
  laws.append(list);
  sheet.append(laws);
  const possibilities = section("06 / Unopened doors"),
    questions = element("ul");
  d.questions.forEach((q) => questions.append(element("li", "", q)));
  possibilities.append(questions);
  sheet.append(
    possibilities,
    element("div", "sheet-close", "A complete seed. Not a finished world."),
  );
  const foot = element("div", "sheet-footer");
  foot.append(
    element("span", "", "ILLUSTRATIVE FIXTURE / NONCANONICAL"),
    element("span", "", "VERSION 0.1 · INNER WORLDS UNEXPANDED"),
  );
  sheet.append(foot);
}
