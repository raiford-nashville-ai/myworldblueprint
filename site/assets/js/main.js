import { $, element } from "./dom.js";
import { emerge } from "./motion.js";
import { initTheme } from "./theme.js";
import { tools } from "./tools.js";
import { session } from "./state.js";
import { responses } from "./fixtures.js";
import { renderBlueprint } from "./blueprint.js";
initTheme();
function stale() {
  session.generation++;
  $("generate").disabled = false;
  if (!$("result").hidden) {
    $("status").textContent =
      "Intention changed. The blueprint below reflects the previous brief; unfold again to update the snapshot.";
  } else {
    $("status").textContent = "";
  }
}
function renderFields(fields, container) {
  container.replaceChildren();
  fields.forEach((field) => {
    const wrap = document.createElement("div"),
      label = document.createElement("label"),
      input = document.createElement(field.options ? "select" : "textarea");
    wrap.className = "field";
    input.id = "direction-" + field.id;
    label.htmlFor = input.id;
    label.textContent = field.label;
    if (field.options) {
      field.options.forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        input.append(option);
      });
    } else {
      input.placeholder = field.placeholder;
      input.maxLength = 2000;
    }
    input.value =
      session.drafts[session.active].values[field.id] ??
      (field.options ? field.options[0] : "");
    input.addEventListener("input", () => {
      session.drafts[session.active].values[field.id] = input.value;
      stale();
    });
    wrap.append(label, input);
    container.append(wrap);
  });
}
function selectTool(key) {
  session.drafts[session.active].intention = $("intention").value;
  session.active = key;
  const tool = tools[key];
  $("title").textContent = tool.title;
  $("intro").textContent = tool.intro;
  $("world-tips").hidden = !tool.showWritingTips;
  $("location").textContent = "THE WORKSHOP / " + tool.name.toUpperCase();
  $("intention").placeholder = tool.placeholder;
  $("intention").value = session.drafts[key].intention;
  $("intention").setAttribute("aria-label", tool.inputLabel);
  document
    .querySelectorAll("[data-tool]")
    .forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.tool === key)),
    );
  renderFields(tool.fields, $("direction-fields"));
  renderFields(tool.extra, $("extra-fields"));
  $("result").hidden = true;
  $("status").textContent = "";
  session.generation++;
  $("generate").disabled = false;
  document.querySelector("main").classList.remove("blueprint-mode");
}
Object.entries(tools).forEach(([key, tool]) => {
  const button = document.createElement("button");
  button.className = "nav-tool";
  button.dataset.tool = key;
  const icon = document.createElement("span"),
    copy = document.createElement("span"),
    label = document.createElement("span"),
    description = document.createElement("span");
  icon.className = "nav-tool-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = tool.icon;
  copy.className = "nav-tool-copy";
  label.className = "nav-tool-name";
  label.textContent = tool.name;
  description.className = "nav-tool-description";
  description.textContent = tool.description;
  copy.append(label, description);
  button.append(icon, copy);
  button.onclick = async () => {
    const mobile = matchMedia("(max-width:600px)").matches;
    await emerge(() => {
      selectTool(key);
      if (mobile) {
        $("sidebar").classList.remove("open");
        $("menu").setAttribute("aria-expanded", "false");
      }
    });
    if (mobile) $("menu").focus({ preventScroll: true });
  };
  $("tools").append(button);
});
$("menu").onclick = () => {
  const open = $("sidebar").classList.toggle("open");
  $("menu").setAttribute("aria-expanded", String(open));
};
$("intention").oninput = () => {
  session.drafts[session.active].intention = $("intention").value;
  stale();
};
$("expand-intention").onclick = async () => {
  await emerge(() =>
    document.querySelector("main").classList.remove("blueprint-mode"),
  );
  $("intention").focus({ preventScroll: true });
};
$("export-blueprint").onclick = () => {
  if (!session.lastResponse) return;
  const url = URL.createObjectURL(
      new Blob([JSON.stringify(session.lastResponse, null, 2)], {
        type: "application/json",
      }),
    ),
    a = document.createElement("a");
  a.href = url;
  a.download = "blueprint-demo.json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  $("status").textContent =
    "Sample export requested. No canonical blueprint was committed.";
};
$("brief-form").onsubmit = async (e) => {
  e.preventDefault();
  const intention = $("intention").value.trim();
  if (!intention) {
    $("status").textContent = "Start with a few words.";
    $("intention").focus();
    return;
  }
  const token = ++session.generation,
    key = session.active,
    brief = { intention, direction: {} };
  [...tools[key].fields, ...tools[key].extra].forEach((field) => {
    const value =
      session.drafts[key].values[field.id] ??
      (field.options ? field.options[0] : "");
    if (value.trim()) brief.direction[field.label] = value;
  });
  $("generate").disabled = true;
  $("status").textContent =
    "Unfolding a simulated response… No network request is being made.";
  await new Promise((resolve) => setTimeout(resolve, 650));
  if (token !== session.generation) return;
  await emerge(() => {
    if (token !== session.generation) return;
    const response = responses[key];
    session.lastResponse = {
      provenance:
        "Local illustrative fixture, not AI-generated from input; noncanonical.",
      submittedBrief: brief,
      blueprint: response,
    };
    renderBlueprint(response);
    $("brief-intention").textContent = brief.intention;
    $("brief-details").replaceChildren();
    Object.entries(brief.direction).forEach(([label, value]) => {
      $("brief-details").append(
        element("dt", "", label),
        element("dd", "", value),
      );
    });
    $("result").hidden = false;
    $("generate").disabled = false;
    document.querySelector("main").classList.add("blueprint-mode");
    $("world-tips").open = false;
    $("status").textContent =
      "Blueprint View · simulated example. Edit your intention above at any time.";
  });
  if (token === session.generation)
    $("blueprint-name").focus({ preventScroll: true });
};
selectTool(session.active);
