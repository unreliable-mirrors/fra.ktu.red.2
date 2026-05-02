import jsx from "texsaur";
import { CATEGORIZED_SHADERS, KTUComponent } from "fra.ktu.red-component";
import { AddShaderButtonComponent } from "./components/shaders/add_shader_button";
import { ShaderItemComponent } from "./components/shaders/shader_item";
import { keyboardShortcuts } from "../../../ktu/helpers/keyboard_shortcuts";

class ShadersPanel extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);

    keyboardShortcuts.register({
      key: "s",
      action: () => this.onClick(),
      description: "Show/Hide Shaders Panel",
    });
  }

  render(): Element {
    return (
      <div class="panel right" id="shaders-panel">
        <h3 onclick={() => this.onClick()}>Global Shaders (S)</h3>
        <div>
          <div className="layerIcons">
            {Object.keys(CATEGORIZED_SHADERS).map((category) => (
              <div>
                <span>{category}</span>
                {CATEGORIZED_SHADERS[category].map((shaderType) => (
                  <AddShaderButtonComponent shaderType={shaderType} />
                ))}
              </div>
            ))}
          </div>
          <div className="shadersList">
            {[...this.bindingData["editorScene.shaders"]]
              .reverse()
              .map((layer: any) => (
                <ShaderItemComponent
                  binding={`editorScene.shaders.!${layer.id}`}
                  owner="editorScene.shaders"
                />
              ))}
          </div>
        </div>
      </div>
    );
  }

  onClick() {
    document.getElementById("shaders-panel")?.classList.toggle("collapsed");
  }
}

export function ShadersPanelComponent(props: { binding?: string }): Element {
  return new ShadersPanel(props);
}
customElements.define("shaders-panel", ShadersPanel);
