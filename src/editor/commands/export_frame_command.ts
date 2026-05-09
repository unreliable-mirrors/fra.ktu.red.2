import { exportFrame } from "../helpers/export_manager";
import { ICommand } from "./icommand";

export class ExportFrameCommand implements ICommand {
  historyLabel = "ExportFrameCommand";
  constructor() {}
  execute(): void {
    void exportFrame("editorScene");
  }
  revert(): void {}
}
