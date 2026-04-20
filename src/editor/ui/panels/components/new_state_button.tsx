import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import { executeCommand } from "../../../../ktu/helpers/commands_manager";
import { NewStateCommand } from "../../../commands/new_state_command";

class NewStateButton extends KTUComponent {
  constructor() {
    super();
  }

  render(): Element {
    return (
      <div>
        <button onclick={() => this.handleClick()}>New File</button>
      </div>
    );
  }

  handleClick() {
    executeCommand(new NewStateCommand());
  }
}

export function NewStateButtonComponent(): Element {
  return new NewStateButton();
}

customElements.define("new-state-button", NewStateButton);
