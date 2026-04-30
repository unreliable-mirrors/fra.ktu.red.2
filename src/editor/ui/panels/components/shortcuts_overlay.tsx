import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import {
  keyboardShortcuts,
  ShortcutEntry,
  isMacOS,
} from "../../../../ktu/helpers/keyboard_shortcuts";

function formatChord(s: ShortcutEntry): string {
  const parts: string[] = [];
  if (s.ctrl) parts.push(isMacOS() ? "Cmd" : "Ctrl");
  if (s.alt) parts.push(isMacOS() ? "Opt" : "Alt");
  if (s.shift) parts.push("Shift");

  const displayKey = s.key === " " ? "Space" : s.key.toUpperCase();
  parts.push(displayKey);

  return parts.join(" + ");
}

class ShortcutsOverlay extends KTUComponent {
  private visible = false;

  constructor() {
    super();
    keyboardShortcuts.register({
      key: "?",
      shift: true,
      action: () => this.toggle(),
      description: "Show Keyboard Shortcuts",
    });
  }

  render(): Element {
    return (
      <div class="shortcuts-overlay hidden" id="shortcuts-overlay">
        <div
          class="shortcuts-overlay-backdrop"
          onclick={() => this.hide()}
        ></div>
        <div
          class="shortcuts-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard Shortcuts"
        >
          <div class="shortcuts-modal-header">
            <h3>Keyboard Shortcuts</h3>
            <button
              class="shortcuts-close-btn"
              onclick={() => this.hide()}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div class="shortcuts-modal-body" id="shortcuts-list"></div>
          <div class="shortcuts-modal-footer">
            Press <kbd>Shift + ?</kbd> to toggle this panel
          </div>
        </div>
      </div>
    );
  }

  toggle() {
    this.visible ? this.hide() : this.show();
  }

  show() {
    this.visible = true;
    const overlay = this.querySelector(".shortcuts-overlay");
    overlay?.classList.remove("hidden");
    this.renderList();
  }

  hide() {
    this.visible = false;
    this.querySelector(".shortcuts-overlay")?.classList.add("hidden");
  }

  private renderList() {
    const container = this.querySelector("#shortcuts-list");
    if (!container) return;

    container.innerHTML = "";

    const shortcuts = keyboardShortcuts.getAll().filter((s) => s.description);

    for (const s of shortcuts) {
      const row = document.createElement("div");
      row.className = "shortcut-row";

      const desc = document.createElement("span");
      desc.className = "shortcut-description";
      desc.textContent = s.description!;

      const chord = document.createElement("kbd");
      chord.className = "shortcut-chord";
      chord.textContent = formatChord(s);

      row.appendChild(desc);
      row.appendChild(chord);
      container.appendChild(row);
    }
  }
}

export function ShortcutsOverlayComponent(): Element {
  return new ShortcutsOverlay();
}

customElements.define("shortcuts-overlay", ShortcutsOverlay);
