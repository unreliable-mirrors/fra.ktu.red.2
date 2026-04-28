import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import { executeCommand } from "../../../../../ktu/helpers/commands_manager";
import { ExportSequenceCommand } from "../../../../commands/export_sequence_command";

class ExportGifButton extends KTUComponent {
  constructor() {
    super();
  }

  render(): Element {
    return (
      <div>
        <button onclick={() => this.handleClick()}>Export GIF</button>
      </div>
    );
  }

  handleClick() {
    executeCommand(new ExportSequenceCommand("gif"));
  }
}

export function ExportGifButtonComponent(): Element {
  return new ExportGifButton();
}

customElements.define("export-gif-button", ExportGifButton);
