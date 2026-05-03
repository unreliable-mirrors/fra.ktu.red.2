import jsx from "texsaur";
import { KTUComponent, Signal } from "fra.ktu.red-component";
import { IconClose } from "../../../../../ktu/helpers/icons";
import { executeCommand } from "../../../../../ktu/helpers/commands_manager";
import { RemoveSignalCommand } from "../../../../commands/remove_signal_command";
import { BindEmulatorButtonComponent } from "../modulators/bind_emulator_button";

class SignalItem extends KTUComponent {
  signal: Signal;
  constructor(props: { binding?: string; signal: Signal }) {
    super(props);
    this.signal = props.signal;
  }

  render(): Element {
    return (
      <div class="signalItem">
        <div class="title">{this.signal.name}</div>
        <div class="icons">
          {this.signal.name.startsWith("signal.") ? (
            <>
              <BindEmulatorButtonComponent
                binding={
                  "signals." + this.signal.name + ",editorScene.modulators"
                }
                signalName={this.signal.name}
              />
              <span
                onclick={() =>
                  this.handleCloseClick(this.signal.name.replace("signal.", ""))
                }
              >
                {IconClose()}
              </span>
            </>
          ) : null}
        </div>
      </div>
    );
  }

  handleCloseClick(signalName: string) {
    executeCommand(new RemoveSignalCommand(signalName));
  }
}

export function SignalItemComponent(props: {
  binding?: string;
  signal: Signal;
}): Element {
  return new SignalItem(props);
}

customElements.define("signal-item", SignalItem);
