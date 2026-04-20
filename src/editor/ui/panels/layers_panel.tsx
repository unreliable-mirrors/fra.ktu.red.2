import jsx from "texsaur";
import { AVAILABLE_LAYERS, KTUComponent } from "fra.ktu.red-component";
import { AddLayerButtonComponent } from "./components/add_layer_button";
import { LayerItemComponent } from "./components/layer_item";

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
          <div className="layersList">
            {[...this.bindingData["editorScene.layers"]]
              .reverse()
              .map((layer: any) => (
                <LayerItemComponent
                  binding={`editorScene.layers.!${layer.id}`}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export function LayersPanelComponent(props: { binding?: string }): Element {
  return new LayersPanel(props);
}
customElements.define("layers-panel", LayersPanel);
