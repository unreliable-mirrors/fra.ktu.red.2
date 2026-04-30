import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import { executeCommand } from "../../../../ktu/helpers/commands_manager";
import { keyboardShortcuts } from "../../../../ktu/helpers/keyboard_shortcuts";
import { SaveStateCommand } from "../../../commands/save_state_command";

class SaveStateButton extends KTUComponent {
  constructor() {
    super();
    keyboardShortcuts.register({
      key: "s",
      ctrl: true,
      action: () => this.handleClick(),
      description: "Save File",
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    keyboardShortcuts.unregister({
      key: "s",
      ctrl: true,
    });
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
