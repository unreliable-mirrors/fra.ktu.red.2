import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";

class LayersPanel extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);
  }

  render(): Element {
    return (
      <div class="panel right">
        <h3>Layers/Tools</h3>
      </div>
    );
  }
}

export function LayersPanelComponent(props: { binding?: string }): Element {
  return new LayersPanel(props);
}
customElements.define("layers-panel", LayersPanel);
