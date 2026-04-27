import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import { executeCommand } from "../../../../../ktu/helpers/commands_manager";
import { ExportSequenceCommand } from "../../../../commands/export_sequence_command";

class ExportMp4Button extends KTUComponent {
  constructor() {
    super();
  }

  render(): Element {
    return (
      <div>
        <button onclick={() => this.handleClick()}>Export Video</button>
      </div>
    );
  }

  handleClick() {
    executeCommand(new ExportSequenceCommand("mp4"));
  }
}

export function ExportMp4ButtonComponent(): Element {
  return new ExportMp4Button();
}

customElements.define("export-mp4-button", ExportMp4Button);
