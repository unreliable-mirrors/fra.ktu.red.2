import jsx from "texsaur";
import { KTUComponent, LayerState } from "fra.ktu.red-component";
import { DataStore } from "fra.ktu.red-component";
import {
  IconClose,
  IconDown,
  IconDuplicate,
  IconHidden,
  IconUp,
  IconVisible,
} from "../../../ktu/helpers/icons";
import { RemoveLayerCommand } from "../../commands/layers/remove_layer_command";
import { executeCommand } from "../../../ktu/helpers/commands_manager";
import { DuplicateLayerCommand } from "../../commands/layers/duplicate_layer_command";
import { ToggleLayerCommand } from "../../commands/layers/toggle_layer_command";
import { MoveLayerDownCommand } from "../../commands/layers/move_layer_down_command";
import { MoveLayerUpCommand } from "../../commands/layers/move_layer_up_command";
import { SHADER_SETTINGS } from "../../settings/isetting";
import { resolveInputType } from "../input_resolver";
import { ActivateShaderCommand } from "../../commands/shaders/activate_shader_command";

class ShaderItem extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);
  }

  render(): Element {
    const state: LayerState = this.bindingData[this.bindingKeys[0]];
    //TODO: IMPLEMENT THIS PROPERLY
    const active =
      state.id === DataStore.getInstance().getStore("activeShaderId")
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
            <span onclick={(e) => this.handleUpClick(e)}>
              {DataStore.getInstance()
                .getStore("editorScene.shaders")
                .indexOf(state) +
                1 !=
              DataStore.getInstance().getStore("editorScene.shaders").length ? (
                IconUp()
              ) : (
                <></>
              )}
            </span>
            <span onclick={(e) => this.handleDownClick(e)}>
              {DataStore.getInstance()
                .getStore("editorScene.shaders")
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
        <div className="settings">
          {SHADER_SETTINGS[state.type].map((setting) => (
            <div>
              <span>{setting.field}: </span>
              {resolveInputType(state, setting)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  handleClick() {
    console.log("click");
    const state: LayerState = this.bindingData[this.bindingKeys[0]];
    executeCommand(new ActivateShaderCommand(state.id));
  }

  handleUpClick(e: Event) {
    const state: LayerState = this.bindingData[this.bindingKeys[0]];
    executeCommand(new MoveLayerUpCommand(state.id));
  }

  handleDownClick(e: Event) {
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

export function ShaderItemComponent(props: { binding?: string }): Element {
  return new ShaderItem(props);
}
customElements.define("shader-item", ShaderItem);
