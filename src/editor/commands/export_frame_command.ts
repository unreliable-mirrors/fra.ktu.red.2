import { saveBase64Frame } from "fra.ktu.red-component";
import { ICommand } from "./icommand";

export class ExportFrameCommand implements ICommand {
  constructor() {}
  execute(): void {
    saveBase64Frame("editorScene");
  }
  revert(): void {}
}
