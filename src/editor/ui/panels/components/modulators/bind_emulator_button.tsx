import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import { executeCommand } from "../../../../../ktu/helpers/commands_manager";
import { IModulator } from "fra.ktu.red-component/dist/modulators/imodulator";
import { SignalValue } from "fra.ktu.red-component/dist/helpers/signals";
import { AssignEmulatorCommand } from "../../../../commands/assign_emulator_command";

class BindEmulatorButton extends KTUComponent {
  signalName: string;

  constructor(props: { binding: string; signalName: string }) {
    super(props);
    this.signalName = props.signalName;
  }

  render(): Element {
    const modulators = this.bindingData["editorScene.modulators"] || [];
    const signalValue: SignalValue =
      this.bindingData["signals." + this.signalName] || {};
    return (
      <select
        onchange={(e) => {
          this.selectModulator(e);
        }}
      >
        <option value="">No Emulator</option>
        {modulators.map((modulator: IModulator) => {
          return (
            <option
              value={modulator.id}
              selected={signalValue.emulator === modulator.id}
            >
              {modulator.name}
            </option>
          );
        })}
      </select>
    );
  }

  selectModulator(e: Event) {
    let modulatorId: string | null = (e.target as HTMLSelectElement).value;
    if (modulatorId === "") {
      modulatorId = null;
    }
    executeCommand(
      new AssignEmulatorCommand(
        this.signalName.replace("signal.", ""),
        modulatorId,
      ),
    );
  }
}

export function BindEmulatorButtonComponent(props: {
  binding: string;
  signalName: string;
}): Element {
  return new BindEmulatorButton(props);
}

customElements.define("bind-emulator-button", BindEmulatorButton);
