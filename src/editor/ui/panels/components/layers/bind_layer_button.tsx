import jsx from "texsaur";
import { DataStore, KTUComponent, LayerState } from "fra.ktu.red-component";
import { executeCommand } from "../../../../../ktu/helpers/commands_manager";
import { ISetting } from "../../../../settings/isetting";
import { SetLayerFieldCommand } from "../../../../commands/layers/set_layer_field_command";
import { SetShaderFieldCommand } from "../../../../commands/shaders/set_shader_field_command";

class BindLayerButton extends KTUComponent {
  state: LayerState;
  setting: ISetting;
  owner: string;

  constructor(state: LayerState, setting: ISetting, owner: string) {
    super();
    this.setting = setting;
    this.state = state;
    this.owner = owner;
  }

  render(): Element {
    return (
      <select
        onchange={(e) => {
          this.selectLayer(e);
        }}
      >
        <option value="">No Layer</option>
        {DataStore.getInstance()
          .getStore("editorScene.layers")
          .map((layer: LayerState) => {
            return (
              <option
                value={layer.id}
                selected={
                  this.state.signaledFields[this.setting.field] == layer.id + ""
                }
              >
                {layer.name}
              </option>
            );
          })}
      </select>
    );
  }

  selectLayer(e: Event) {
    let value: string | null = (e.target as HTMLSelectElement).value;
    console.log("value", value);
    let layerId: number | null = null;
    if (value !== "") {
      layerId = parseInt(value);
    }
    console.log("value", value, layerId);
    executeCommand(
      new SetShaderFieldCommand(
        this.state.id,
        this.setting.field,
        layerId!,
        this.owner,
      ),
    );
    DataStore.getInstance().touch(`${this.owner}.!${this.state.id}`);
  }
}

export function BindLayerButtonComponent(props: {
  state: LayerState;
  setting: ISetting;
  owner: string;
}): Element {
  return new BindLayerButton(props.state, props.setting, props.owner);
}

customElements.define("bind-layer-button", BindLayerButton);
