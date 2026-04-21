import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";

class SignalHint extends KTUComponent {
  signalName: string;

  constructor(signalName: string) {
    super();
    this.signalName = signalName;
  }

  render(): Element {
    return <span>{this.signalName}</span>;
  }

  handleClick() {}
}

export function SignalHintComponent(props: { signalName: string }): Element {
  return new SignalHint(props.signalName);
}

customElements.define("signal-hint", SignalHint);
