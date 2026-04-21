import jsx from "texsaur";
import { getAvailableSignals, KTUComponent } from "fra.ktu.red-component";

class SignalsPanel extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);
  }

  render(): Element {
    return (
      <div class="panel left">
        <h3>Signals</h3>
        <div>
          {getAvailableSignals("editorScene").map((signal) => (
            <div>{signal.name}</div>
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
