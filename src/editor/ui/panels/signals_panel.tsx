import jsx from "texsaur";
import { getAvailableSignals, KTUComponent } from "fra.ktu.red-component";
import { AddSignalButtonComponent } from "./components/signals/add_signal_button";
import { IconClose } from "../../../ktu/helpers/icons";
import { executeCommand } from "../../../ktu/helpers/commands_manager";
import { RemoveSignalCommand } from "../../commands/remove_signal_command";
import { keyboardShortcuts } from "../../../ktu/helpers/keyboard_shortcuts";

class SignalsPanel extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);

    keyboardShortcuts.register({
      key: "d",
      action: () => this.onClick(),
      description: "Show/Hide Signals Panel",
    });
  }

  render(): Element {
    return (
      <div class="panel left" id="signals-panel">
        <h3 onclick={() => this.onClick()}>Signals (D)</h3>
        {AddSignalButtonComponent()}
        <div class="signals-list">
          {getAvailableSignals("editorScene").map((signal) => (
            <div class="signalItem">
              <div class="title">{signal.name}</div>
              <div class="icons">
                {signal.name.startsWith("signal.") ? (
                  <span
                    onclick={() =>
                      this.handleCloseClick(signal.name.replace("signal.", ""))
                    }
                  >
                    {IconClose()}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  handleCloseClick(signalName: string) {
    executeCommand(new RemoveSignalCommand(signalName));
  }

  onClick() {
    document.getElementById("signals-panel")?.classList.toggle("collapsed");
  }
}

export function SignalsPanelComponent(props: { binding?: string }): Element {
  return new SignalsPanel(props);
}
customElements.define("signals-panel", SignalsPanel);
