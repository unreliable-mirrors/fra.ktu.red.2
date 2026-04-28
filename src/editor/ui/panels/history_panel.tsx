import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import {
  canRedo,
  canUndo,
  redoCommand,
  undoCommand,
} from "../../../ktu/helpers/commands_manager";
import { HistoryItemComponent } from "./components/history_item";

class HistoryPanel extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);
  }

  render(): Element {
    console.log(
      "Rendering HistoryPanel with commandsQueue:",
      this.bindingData["commandsQueue"],
      this.bindingData["redoQueue"],
    );
    return (
      <div class="panel left">
        <h3>History</h3>
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
