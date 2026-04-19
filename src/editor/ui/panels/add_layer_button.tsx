import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import { getIcon, IconPlus } from "../../../ktu/helpers/icons";
import { executeCommand } from "../../../ktu/helpers/commands_manager";
import { AddLayerCommand } from "../../commands/layers/add_layer_command";

class AddLayerButton extends KTUComponent {
  layerType: string;

  constructor(layerType: string) {
    super();
    this.layerType = layerType;
  }

  render(): Element {
    return (
      <button onclick={() => this.handleClick()}>
        {IconPlus()}
        {getIcon(this.layerType)}
      </button>
    );
  }

  handleClick() {
    executeCommand(new AddLayerCommand(this.layerType));
  }
}

export function AddLayerButtonComponent(layerType: string): Element {
  return new AddLayerButton(layerType);
}

customElements.define("add-layer-button", AddLayerButton);
