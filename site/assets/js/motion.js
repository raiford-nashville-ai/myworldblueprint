/* One serialized transition boundary. AI: put ALL structural state mutations inside
   update(), not before calling emerge(). Keep text-entry synchronous and responsive.
   Inert prevents double-submission/edits during snapshots; finally always restores it.
   A rejected native animation must not replay update(): it may already have committed. */
let emergenceQueue = Promise.resolve();
export function emerge(update) {
  const run = async () => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      update();
      return;
    }
    const surface = document.querySelector(".studio");
    surface.inert = true;
    try {
      if (typeof document.startViewTransition === "function") {
        let applied = false;
        const transition = document.startViewTransition(() => {
          applied = true;
          update();
        });
        try {
          await transition.finished;
        } catch {
          if (!applied) await transition.updateCallbackDone;
        }
      } else if (typeof surface.animate === "function") {
        const styles = getComputedStyle(document.documentElement),
          duration =
            parseFloat(styles.getPropertyValue("--emergence-phase")) || 200,
          easing =
            styles.getPropertyValue("--emergence-ease").trim() || "ease-in-out";
        const out = surface.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration,
          easing,
          fill: "forwards",
        });
        try {
          await out.finished;
          update();
          const incoming = surface.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration,
            easing,
            fill: "forwards",
          });
          try {
            await incoming.finished;
          } finally {
            incoming.cancel();
          }
        } finally {
          out.cancel();
        }
      } else {
        update();
      }
    } finally {
      surface.inert = false;
    }
  };
  const next = emergenceQueue.then(run);
  emergenceQueue = next.catch((error) =>
    console.error("Emergence transition failed:", error),
  );
  return next;
}
