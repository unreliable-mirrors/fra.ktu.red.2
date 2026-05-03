import jsx from "texsaur";
import { getAvailableSignals, KTUComponent } from "fra.ktu.red-component";
import { AddSignalButtonComponent } from "./components/signals/add_signal_button";
import { SignalItemComponent } from "./components/signals/signal_item";
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
            <SignalItemComponent
              signal={signal}
              binding={`signals.${signal.name.replace("signal.", "")}`}
            />
          ))}
        </div>
      </div>
    );
  }

  onClick() {
    document.getElementById("signals-panel")?.classList.toggle("collapsed");
  }
}

export function SignalsPanelComponent(props: { binding?: string }): Element {
  return new SignalsPanel(props);
}
customElements.define("signals-panel", SignalsPanel);
