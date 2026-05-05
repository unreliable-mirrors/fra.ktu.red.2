import jsx from "texsaur";
import {
  KTUComponent,
  LayerState,
  ShaderLayerState,
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
import { executeCommand } from "../../../../../ktu/helpers/commands_manager";
import { ToggleShaderCommand } from "../../../../commands/shaders/toggle_shader_command";
import { SHADER_SETTINGS } from "../../../../settings/isetting";
import { ActivateShaderCommand } from "../../../../commands/shaders/activate_shader_command";
import { RemoveShaderCommand } from "../../../../commands/shaders/remove_shader_command";
import { DuplicateShaderCommand } from "../../../../commands/shaders/duplicate_shader_command";
import { GenericInputComponent } from "../generic_input";
import { MoveShaderUpCommand } from "../../../../commands/modulators/move_shader_up_command";
import { MoveShaderDownCommand } from "../../../../commands/modulators/move_shader_down_command";

class ShaderItem extends KTUComponent {
  owner: string;
  parentLayerId?: number;
  constructor(props: {
    binding?: string;
    owner: string;
    parentLayerId?: number;
  }) {
    super(props);
    this.owner = props.owner;
    this.parentLayerId = props.parentLayerId;
  }

  render(): Element {
    const state: LayerState = this.bindingData[this.bindingKeys[0]];
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
            <span onclick={() => this.handleUpClick()}>
              {DataStore.getInstance().getStore(this.owner).indexOf(state) +
                1 !=
              DataStore.getInstance().getStore(this.owner).length ? (
                IconUp()
              ) : (
                <></>
              )}
            </span>
            <span onclick={() => this.handleDownClick()}>
              {DataStore.getInstance().getStore(this.owner).indexOf(state) !=
              0 ? (
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
              {SHADER_SETTINGS[state.type].map((setting) => (
                <div>
                  <span>{setting.field}: </span>
                  <GenericInputComponent
                    binding={`${this.owner}.!${state.id},editorScene.modulators,editorScene.signals`}
                    setting={setting}
                    owner={this.owner}
                  />
                </div>
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
    console.log("click");
    const state: LayerState = this.bindingData[this.bindingKeys[0]];
    executeCommand(new ActivateShaderCommand(state.id, this.owner));
  }

  handleUpClick() {
    const state: LayerState = this.bindingData[this.bindingKeys[0]];
    executeCommand(new MoveShaderUpCommand(state.id, this.parentLayerId));
  }

  handleDownClick() {
    const state: LayerState = this.bindingData[this.bindingKeys[0]];
    executeCommand(new MoveShaderDownCommand(state.id, this.parentLayerId));
  }

  handleVisibleClick() {
    const state: ShaderLayerState = this.bindingData[this.bindingKeys[0]];
    executeCommand(new ToggleShaderCommand(this.owner, state.id));
  }

  handleDuplicateClick() {
    const state: ShaderLayerState = this.bindingData[this.bindingKeys[0]];
    executeCommand(new DuplicateShaderCommand(state.id, this.parentLayerId));
  }

  handleCloseClick() {
    const state: ShaderLayerState = this.bindingData[this.bindingKeys[0]];
    executeCommand(new RemoveShaderCommand(state, this.parentLayerId));
  }
}

export function ShaderItemComponent(props: {
  binding?: string;
  owner: string;
  parentLayerId?: number;
}): Element {
  return new ShaderItem(props);
}
customElements.define("shader-item", ShaderItem);
