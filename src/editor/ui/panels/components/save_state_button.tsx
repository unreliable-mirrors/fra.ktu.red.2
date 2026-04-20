import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import { executeCommand } from "../../../../ktu/helpers/commands_manager";
import { SaveStateCommand } from "../../../commands/save_state_command";

class SaveStateButton extends KTUComponent {
  constructor() {
    super();
  }

  render(): Element {
    return (
      <div>
        <button onclick={() => this.handleClick()}>Save File</button>
      </div>
    );
  }

  handleClick() {
    executeCommand(new SaveStateCommand());
  }
}

export function SaveStateButtonComponent(): Element {
  return new SaveStateButton();
}

customElements.define("save-state-button", SaveStateButton);
