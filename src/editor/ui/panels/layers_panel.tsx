import jsx from "texsaur";
import { AVAILABLE_LAYERS, KTUComponent } from "fra.ktu.red-component";
import { AddLayerButtonComponent } from "./add_layer_button";

class LayersPanel extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);
  }

  render(): Element {
    return (
      <div class="panel right">
        <h3>Layers/Tools</h3>
        <div>
          <div className="layerIcons">
            {AVAILABLE_LAYERS.map((layerType) =>
              AddLayerButtonComponent(layerType),
            )}
          </div>
          <div className="layersList"></div>
        </div>
      </div>
    );
  }
}

export function LayersPanelComponent(props: { binding?: string }): Element {
  return new LayersPanel(props);
}
customElements.define("layers-panel", LayersPanel);
