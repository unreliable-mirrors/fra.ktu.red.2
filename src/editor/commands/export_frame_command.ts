import { exportFrame } from "../helpers/export_manager";
import { ICommand } from "./icommand";

export class ExportFrameCommand implements ICommand {
  constructor() {}
  execute(): void {
    void exportFrame("editorScene");
  }
  revert(): void {}
}
