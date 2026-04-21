import jsx from "texsaur";
import {
  getAvailableSignals,
  KTUComponent,
  LayerState,
  Signal,
} from "fra.ktu.red-component";
import { executeCommand } from "../../../../ktu/helpers/commands_manager";
import { ISetting } from "../../../settings/isetting";
import { AssignSignalCommand } from "../../../commands/modulators/assign_signal_command";

class BindModulatorButton extends KTUComponent {
  state: LayerState;
  setting: ISetting;
  owner: string;

  constructor(state: LayerState, setting: ISetting, owner: string) {
    super();
    this.setting = setting;
    this.state = state;
    this.owner = owner;
  }

  render(): Element {
    return (
      <select
        onchange={(e) => {
          this.selectSignal(e);
        }}
      >
        <option value="">No Modulator</option>
        {getAvailableSignals("editorScene").map((signal: Signal) => {
          return (
            <option
              value={signal.name}
              selected={
                this.state.signaledFields[this.setting.field] === signal.name
              }
            >
              {signal.name}
            </option>
          );
        })}
      </select>
    );
  }

  selectSignal(e: Event) {
    let signalName: string | null = (e.target as HTMLSelectElement).value;
    if (signalName === "") {
      signalName = null;
    }
    executeCommand(
      new AssignSignalCommand(
        this.state.id,
        this.setting.field,
        signalName,
        this.owner,
      ),
    );
  }
}

export function BindModulatorButtonComponent(props: {
  state: LayerState;
  setting: ISetting;
  owner: string;
}): Element {
  return new BindModulatorButton(props.state, props.setting, props.owner);
}

customElements.define("bind-modulator-button", BindModulatorButton);
