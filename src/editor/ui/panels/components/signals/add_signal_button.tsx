import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import { executeCommand } from "../../../../../ktu/helpers/commands_manager";
import { AddSignalCommand } from "../../../../commands/add_signal_command";

class AddSignalButton extends KTUComponent {
  constructor() {
    super();
  }

  render(): Element {
    return (
      <input
        type="text"
        placeholder="+ Add signal"
        onkeyup={(e) => this.handleKeyUp(e)}
        class="signal-input"
      />
    );
  }

  handleKeyUp(e: KeyboardEvent) {
    if (e.key === "Enter") {
      const input = this.querySelector(".signal-input") as HTMLInputElement;
      const value = this.resolveSignalName(input?.value);
      if (value) {
        this.submitSignal(value);
        if (input) {
          input.value = "";
        }
      }
    }
  }

  private resolveSignalName(rawValue: unknown): string {
    if (typeof rawValue === "string") {
      return rawValue.trim();
    }

    if (rawValue && typeof rawValue === "object" && "value" in rawValue) {
      const nestedValue = (rawValue as { value: unknown }).value;
      return typeof nestedValue === "string"
        ? nestedValue.trim()
        : String(nestedValue ?? "").trim();
    }

    return String(rawValue ?? "").trim();
  }

  private submitSignal(signalName: string) {
    const normalizedName = this.resolveSignalName(signalName);
    if (!normalizedName) {
      return;
    }

    executeCommand(new AddSignalCommand(normalizedName));
  }
}

export function AddSignalButtonComponent(): Element {
  return new AddSignalButton();
}

customElements.define("add-signal-button", AddSignalButton);
