import jsx from "texsaur";
import {
  AVAILABLE_MODULATORS,
  DataStore,
  KTUComponent,
} from "fra.ktu.red-component";
import { AddModulatorButtonComponent } from "./components/modulators/add_modulator_button";
import { ModulatorItemComponent } from "./components/modulators/modulator_item";
import { keyboardShortcuts } from "../../../ktu/helpers/keyboard_shortcuts";

class ModulatorsPanel extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);

    keyboardShortcuts.register({
      key: "m",
      action: () => this.onClick(),
      description: "Show/Hide Modulators Panel",
    });
  }

  render(): Element {
    return (
      <div class="panel right" id="modulators-panel">
        <h3 onclick={() => this.onClick()}>Modulators (M)</h3>
        <div>
          <div className="layerIcons">
            {AVAILABLE_MODULATORS.map((layerType) =>
              AddModulatorButtonComponent(layerType),
            )}
          </div>
          <div className="modulatorsList">
            {[...DataStore.getInstance().getStore("editorScene.modulators")]
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

  onClick() {
    document.getElementById("modulators-panel")?.classList.toggle("collapsed");
  }
}

export function ModulatorsPanelComponent(props: { binding?: string }): Element {
  return new ModulatorsPanel(props);
}
customElements.define("modulators-panel", ModulatorsPanel);
