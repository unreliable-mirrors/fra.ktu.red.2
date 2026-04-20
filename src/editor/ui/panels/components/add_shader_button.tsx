import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import { executeCommand } from "../../../../ktu/helpers/commands_manager";
import { AddShaderCommand } from "../../../commands/shaders/add_shader_command";

class AddShaderButton extends KTUComponent {
  shaderName: string;
  destinationLayerId?: number;

  constructor(shaderName: string, destinationLayerId?: number) {
    super();
    this.shaderName = shaderName;
    this.destinationLayerId = destinationLayerId;
  }

  render(): Element {
    return (
      <button onclick={() => this.handleClick()}>{this.shaderName}</button>
    );
  }

  handleClick() {
    executeCommand(
      new AddShaderCommand(this.shaderName, this.destinationLayerId),
    );
  }
}

export function AddShaderButtonComponent(
  shaderName: string,
  destinationLayerId?: number,
): Element {
  return new AddShaderButton(shaderName, destinationLayerId);
}

customElements.define("add-shader-button", AddShaderButton);
