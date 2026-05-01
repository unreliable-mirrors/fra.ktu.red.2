import jsx from "texsaur";
import { getAvailableSignals, KTUComponent } from "fra.ktu.red-component";
import { AddSignalButtonComponent } from "./components/signals/add_signal_button";

class SignalsPanel extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);
  }

  render(): Element {
    return (
      <div class="panel left">
        <h3>Signals</h3>
        {AddSignalButtonComponent()}
        <div class="signals-list">
          {getAvailableSignals("editorScene").map((signal) => (
            <div class="signal-item">{signal.name}</div>
          ))}
        </div>
      </div>
    );
  }
}

export function SignalsPanelComponent(props: { binding?: string }): Element {
  return new SignalsPanel(props);
}
customElements.define("signals-panel", SignalsPanel);
