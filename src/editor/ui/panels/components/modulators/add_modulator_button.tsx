import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import { executeCommand } from "../../../../../ktu/helpers/commands_manager";
import { AddModulatorCommand } from "../../../../commands/modulators/add_modulator_command";

class AddModulatorButton extends KTUComponent {
  modulatorName: string;
  destinationLayerId?: number;

  constructor(modulatorName: string, destinationLayerId?: number) {
    super();
    this.modulatorName = modulatorName;
    this.destinationLayerId = destinationLayerId;
  }

  render(): Element {
    return (
      <button onclick={() => this.handleClick()}>{this.modulatorName}</button>
    );
  }

  handleClick() {
    executeCommand(new AddModulatorCommand(this.modulatorName));
  }
}

export function AddModulatorButtonComponent(
  modulatorName: string,
  destinationLayerId?: number,
): Element {
  return new AddModulatorButton(modulatorName, destinationLayerId);
}

customElements.define("add-modulator-button", AddModulatorButton);
