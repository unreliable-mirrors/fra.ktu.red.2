import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import {
  canRedo,
  canUndo,
  redoCommand,
  undoCommand,
} from "../../../ktu/helpers/commands_manager";
import { HistoryItemComponent } from "./components/history_item";
import { keyboardShortcuts } from "../../../ktu/helpers/keyboard_shortcuts";

class HistoryPanel extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);

    keyboardShortcuts.register({
      key: "z",
      ctrl: true,
      action: () => this.undo(),
      description: "Undo",
    });

    keyboardShortcuts.register({
      key: "y",
      ctrl: true,
      action: () => this.redo(),
      description: "Redo",
    });

    keyboardShortcuts.register({
      key: "h",
      action: () => this.onClick(),
      description: "Show/Hide History Panel",
    });
  }

  render(): Element {
    console.log(
      "Rendering HistoryPanel with commandsQueue:",
      this.bindingData["commandsQueue"],
      this.bindingData["redoQueue"],
    );
    return (
      <div class="panel left" id="history-panel">
        <h3 onclick={() => this.onClick()}>History (H)</h3>
        <div class="history-controls">
          <button
            class={canUndo() ? "enabled" : "disabled"}
            onclick={() => this.undo()}
          >
            Undo
          </button>
          <button
            class={canRedo() ? "enabled" : "disabled"}
            onclick={() => this.redo()}
          >
            Redo
          </button>
        </div>
        <div class="history-list">
          {[...this.bindingData["redoQueue"]].map(
            (_command: any, index: number) => (
              <HistoryItemComponent
                binding={`redoQueue.#${index}`}
                type="redo"
              />
            ),
          )}
          {[...this.bindingData["commandsQueue"]]
            .map((_command: any, index: number) => (
              <HistoryItemComponent
                binding={`commandsQueue.#${index}`}
                type="undo"
              />
            ))
            .reverse()}
        </div>
      </div>
    );
  }

  defaultBinding(): Record<string, any> {
    return {
      commandsQueue: [],
      redoQueue: [],
    };
  }

  onClick() {
    document.getElementById("history-panel")?.classList.toggle("collapsed");
  }

  undo() {
    if (canUndo()) {
      undoCommand();
    }
  }

  redo() {
    if (canRedo()) {
      redoCommand();
    }
  }
}

export function HistoryPanelComponent(props: { binding?: string }): Element {
  return new HistoryPanel(props);
}
customElements.define("history-panel", HistoryPanel);
