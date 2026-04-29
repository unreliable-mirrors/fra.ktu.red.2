import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import { executeCommand } from "../../../../ktu/helpers/commands_manager";
import { NewStateCommand } from "../../../commands/new_state_command";
import { keyboardShortcuts } from "../../../../ktu/helpers/keyboard_shortcuts";

class NewStateButton extends KTUComponent {
  constructor() {
    super();
    keyboardShortcuts.register({
      key: "n",
      ctrl: true,
      action: () => this.showConfirmModal(),
      description: "New File",
    });
  }

  render(): Element {
    return (
      <div>
        <button onclick={() => this.handleClick()}>New File</button>

        <div class="confirm-modal-overlay hidden">
          <div
            class="confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-file-modal-title"
          >
            <h3 id="new-file-modal-title">Create New File</h3>
            <p>
              Starting a new file will discard any unsaved changes in the
              current scene.
            </p>
            <div class="confirm-modal-actions">
              <button onclick={() => this.hideConfirmModal()}>Cancel</button>
              <button onclick={() => this.confirmCreateNewFile()}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleClick() {
    this.showConfirmModal();
  }

  showConfirmModal() {
    this.querySelector(".confirm-modal-overlay")?.classList.remove("hidden");
  }

  hideConfirmModal() {
    this.querySelector(".confirm-modal-overlay")?.classList.add("hidden");
  }

  confirmCreateNewFile() {
    this.hideConfirmModal();
    executeCommand(new NewStateCommand());
  }
}

export function NewStateButtonComponent(): Element {
  return new NewStateButton();
}

customElements.define("new-state-button", NewStateButton);
