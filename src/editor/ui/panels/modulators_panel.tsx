import jsx from "texsaur";
import { AVAILABLE_MODULATORS, KTUComponent } from "fra.ktu.red-component";
import { AddModulatorButtonComponent } from "./components/add_modulator_button";
import { ModulatorItemComponent } from "./components/modulator_item";

class ModulatorsPanel extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);
  }

  render(): Element {
    return (
      <div class="panel right">
        <h3>Modulators</h3>
        <div>
          <div className="layerIcons">
            {AVAILABLE_MODULATORS.map((layerType) =>
              AddModulatorButtonComponent(layerType),
            )}
          </div>
          <div className="shadersList">
            {[...this.bindingData["instances.editorScene.modulators"]]
              .reverse()
              .map((modulator: any) => (
                <ModulatorItemComponent
                  binding={`editorScene.modulators.!${modulator.id}`}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }

  defaultBinding(): Record<string, any> {
    return {
      "instances.editorScene.modulators": [],
    };
  }
}

export function ModulatorsPanelComponent(props: { binding?: string }): Element {
  return new ModulatorsPanel(props);
}
customElements.define("modulators-panel", ModulatorsPanel);
