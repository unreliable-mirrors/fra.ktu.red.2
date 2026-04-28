import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import { ICommand } from "../../../commands/icommand";
import { redoCommand } from "../../../../ktu/helpers/commands_manager";
import { undoCommand } from "../../../../ktu/helpers/commands_manager";

class HistoryItem extends KTUComponent {
  type?: "undo" | "redo";
  constructor(props: { binding?: string; type?: "undo" | "redo" }) {
    super(props);
    this.type = props.type;
  }

  render(): Element {
    const state: ICommand = this.bindingData[this.bindingKeys[0]];
    return (
      <div
        onclick={() => this.handleClick()}
        class={`history-item ${this.type}`}
      >
        {state.constructor.name.replace("Command", "")}
      </div>
    );
  }

  handleClick() {
    console.log(
      "History item clicked:",
      this.bindingData[this.bindingKeys[0]],
      "type:",
      this.type,
    );
    if (this.type === "undo") {
      undoCommand(this.bindingData[this.bindingKeys[0]]);
    } else if (this.type === "redo") {
      redoCommand(this.bindingData[this.bindingKeys[0]]);
    }
  }
}

export function HistoryItemComponent(props: {
  binding?: string;
  type?: "undo" | "redo";
}): Element {
  return new HistoryItem(props);
}
customElements.define("history-item", HistoryItem);
