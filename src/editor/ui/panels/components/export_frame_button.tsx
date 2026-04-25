import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import { executeCommand } from "../../../../ktu/helpers/commands_manager";
import { ExportFrameCommand } from "../../../commands/export_frame_command";

class ExportFrameButton extends KTUComponent {
  constructor() {
    super();
  }

  render(): Element {
    return (
      <div>
        <button onclick={() => this.handleClick()}>Export Frame</button>
      </div>
    );
  }

  handleClick() {
    executeCommand(new ExportFrameCommand());
  }
}

export function ExportFrameButtonComponent(): Element {
  return new ExportFrameButton();
}

customElements.define("export-frame-button", ExportFrameButton);
