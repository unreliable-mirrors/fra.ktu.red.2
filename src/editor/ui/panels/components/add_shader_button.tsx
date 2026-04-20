import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import { executeCommand } from "../../../../ktu/helpers/commands_manager";
import { AddShaderCommand } from "../../../commands/shaders/add_shader_command";

class AddShaderButton extends KTUComponent {
  shaderName: string;

  constructor(shaderName: string) {
    super();
    this.shaderName = shaderName;
  }

  render(): Element {
    return (
      <button onclick={() => this.handleClick()}>{this.shaderName}</button>
    );
  }

  handleClick() {
    executeCommand(new AddShaderCommand(this.shaderName));
  }
}

export function AddShaderButtonComponent(shaderName: string): Element {
  return new AddShaderButton(shaderName);
}

customElements.define("add-shader-button", AddShaderButton);
