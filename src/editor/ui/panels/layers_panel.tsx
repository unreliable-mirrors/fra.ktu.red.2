import jsx from "texsaur";
import { AVAILABLE_LAYERS, KTUComponent } from "fra.ktu.red-component";
import { AddLayerButtonComponent } from "./components/layers/add_layer_button";
import { LayerItemComponent } from "./components/layers/layer_item";
import { keyboardShortcuts } from "../../../ktu/helpers/keyboard_shortcuts";

class LayersPanel extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);

    keyboardShortcuts.register({
      key: "l",
      action: () => this.onClick(),
      description: "Show/Hide Layers Panel",
    });
  }

  render(): Element {
    return (
      <div class="panel right" id="layers-panel">
        <h3 onclick={() => this.onClick()}>Layers/Tools (L)</h3>
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
                  binding={`editorScene.layers.!${layer.id},editorScene.layers.!${layer.id}.shaders`}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }

  onClick() {
    document.getElementById("layers-panel")?.classList.toggle("collapsed");
  }
}

export function LayersPanelComponent(props: { binding?: string }): Element {
  return new LayersPanel(props);
}
customElements.define("layers-panel", LayersPanel);
