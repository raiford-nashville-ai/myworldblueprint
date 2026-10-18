import { tools } from "./tools.js";
// Transient drafts, request cancellation, and the last exported snapshot; no persistence.
export const session = {
  drafts: Object.fromEntries(
    Object.keys(tools).map((key) => [key, { intention: "", values: {} }]),
  ),
  active: "world",
  generation: 0,
  lastResponse: null,
};
