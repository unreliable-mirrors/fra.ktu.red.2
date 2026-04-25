import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import { executeCommand } from "../../../../ktu/helpers/commands_manager";
import { ExportSequenceCommand } from "../../../commands/export_sequence_command";

class ExportSequenceButton extends KTUComponent {
  constructor() {
    super();
  }

  render(): Element {
    return (
      <div>
        <button onclick={() => this.handleClick()}>Export Sequence</button>
      </div>
    );
  }

  handleClick() {
    executeCommand(new ExportSequenceCommand());
  }
}

export function ExportSequenceButtonComponent(): Element {
  return new ExportSequenceButton();
}

customElements.define("export-sequence-button", ExportSequenceButton);
