import jsx from "texsaur";
import {
  CATEGORIZED_SHADERS,
  DisplayLayerState,
  KTUComponent,
  LayerState,
} from "fra.ktu.red-component";
import { DataStore } from "fra.ktu.red-component";
import {
  IconClose,
  IconDown,
  IconDuplicate,
  IconHidden,
  IconUp,
  IconVisible,
} from "../../../../../ktu/helpers/icons";
import { RemoveLayerCommand } from "../../../../commands/layers/remove_layer_command";
import { executeCommand } from "../../../../../ktu/helpers/commands_manager";
import { DuplicateLayerCommand } from "../../../../commands/layers/duplicate_layer_command";
import { ToggleLayerCommand } from "../../../../commands/layers/toggle_layer_command";
import { MoveLayerDownCommand } from "../../../../commands/layers/move_layer_down_command";
import { MoveLayerUpCommand } from "../../../../commands/layers/move_layer_up_command";
import { ActivateLayerCommand } from "../../../../commands/layers/activate_layer_command";
import { LAYER_SETTINGS } from "../../../../settings/isetting";
import { resolveInputType } from "../../../input_resolver";
import { AddShaderButtonComponent } from "../shaders/add_shader_button";
import { ShaderItemComponent } from "../shaders/shader_item";

class LayerItem extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);
  }

  render(): Element {
    const state: DisplayLayerState = this.bindingData[this.bindingKeys[0]];
    //TODO: IMPLEMENT THIS PROPERLY
    const active =
      state.id === DataStore.getInstance().getStore("activeLayerId")
        ? "active"
        : "";
    return (
      <div className={`layerItem ${active}`}>
        <div className="header">
          <div
            className="title"
            onclick={() => {
              this.handleClick();
            }}
          >
            {state.name}
          </div>
          <div className="icons">
            <span onclick={() => this.handleUpClick()}>
              {DataStore.getInstance()
                .getStore("editorScene.layers")
                .indexOf(state) +
                1 !=
              DataStore.getInstance().getStore("editorScene.layers").length ? (
                IconUp()
              ) : (
                <></>
              )}
            </span>
            <span onclick={() => this.handleDownClick()}>
              {DataStore.getInstance()
                .getStore("editorScene.layers")
                .indexOf(state) != 0 ? (
                IconDown()
              ) : (
                <></>
              )}
            </span>
            <span onclick={() => this.handleVisibleClick()}>
              {state.visible ? IconVisible() : IconHidden()}
            </span>
            <span onclick={() => this.handleDuplicateClick()}>
              {IconDuplicate()}
            </span>
            <span onclick={() => this.handleCloseClick()}>{IconClose()}</span>
          </div>
        </div>
        {active === "active" ? (
          <>
            <div className="settings">
              {LAYER_SETTINGS[state.type].map((setting) => (
                <div>
                  <span>{setting.field}: </span>
                  {resolveInputType(state, setting, "editorScene.layers")}
                </div>
              ))}
            </div>
            <h4>Shaders</h4>
            {Object.keys(CATEGORIZED_SHADERS).map((category) => (
              <div>
                <span>{category}</span>
                {CATEGORIZED_SHADERS[category].map((shaderType) => (
                  <AddShaderButtonComponent
                    shaderType={shaderType}
                    destinationLayerId={state.id}
                  />
                ))}
              </div>
            ))}
            <div className="shadersList">
              {[...state.shaders].reverse().map((layer: any) => (
                <ShaderItemComponent
                  binding={`editorScene.layers.!${state.id}.shaders.!${layer.id}`}
                  owner={`editorScene.layers.!${state.id}.shaders`}
                />
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }

  handleClick() {
    const state: LayerState = this.bindingData[this.bindingKeys[0]];
    executeCommand(new ActivateLayerCommand(state.id));
  }

  handleUpClick() {
    const state: LayerState = this.bindingData[this.bindingKeys[0]];
    executeCommand(new MoveLayerUpCommand(state.id));
  }

  handleDownClick() {
    const state: LayerState = this.bindingData[this.bindingKeys[0]];
    executeCommand(new MoveLayerDownCommand(state.id));
  }

  handleVisibleClick() {
    const state: LayerState = this.bindingData[this.bindingKeys[0]];
    executeCommand(new ToggleLayerCommand(state.id));
  }

  handleDuplicateClick() {
    const state: LayerState = this.bindingData[this.bindingKeys[0]];
    executeCommand(new DuplicateLayerCommand(state.id));
  }

  handleCloseClick() {
    const state: LayerState = this.bindingData[this.bindingKeys[0]];
    executeCommand(new RemoveLayerCommand(state));
  }
}

export function LayerItemComponent(props: { binding?: string }): Element {
  return new LayerItem(props);
}
customElements.define("layer-item", LayerItem);
