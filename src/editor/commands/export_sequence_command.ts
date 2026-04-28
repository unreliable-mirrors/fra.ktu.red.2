import { exportSequence } from "../helpers/export_manager";
import { ICommand } from "./icommand";

export class ExportSequenceCommand implements ICommand {
  format: string;
  constructor(format: string) {
    this.format = format;
  }
  execute(): void {
    if (
      this.format === "zip" ||
      this.format === "mp4" ||
      this.format === "gif"
    ) {
      void exportSequence("editorScene", this.format);
    }
  }
  revert(): void {}
}
