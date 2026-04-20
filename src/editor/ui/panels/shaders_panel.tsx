import jsx from "texsaur";
import { AVAILABLE_SHADERS, KTUComponent } from "fra.ktu.red-component";
import { AddShaderButtonComponent } from "./add_shader_button";
import { ShaderItemComponent } from "./shader_item";

class ShadersPanel extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);
  }

  render(): Element {
    return (
      <div class="panel right">
        <h3>Global Shaders</h3>
        <div>
          <div className="layerIcons">
            {AVAILABLE_SHADERS.map((layerType) =>
              AddShaderButtonComponent(layerType),
            )}
          </div>
          <div className="shadersList">
            {[...this.bindingData["editorScene.shaders"]]
              .reverse()
              .map((layer: any) => (
                <ShaderItemComponent
                  binding={`editorScene.shaders.!${layer.id}`}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export function ShadersPanelComponent(props: { binding?: string }): Element {
  return new ShadersPanel(props);
}
customElements.define("shaders-panel", ShadersPanel);
