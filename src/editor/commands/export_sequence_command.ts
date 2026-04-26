import { DataStore } from "fra.ktu.red-component";
import { ICommand } from "./icommand";

export class ExportSequenceCommand implements ICommand {
  format: string;
  constructor(format: string) {
    this.format = format;
  }
  execute(): void {
    DataStore.getInstance().setStore("playing", false);
    DataStore.getInstance().setStore("instances.editorScene.exporting", true);
    DataStore.getInstance().setStore("instances.editorScene.exportNext", true);
    DataStore.getInstance().setStore(
      "instances.editorScene.exportFormat",
      this.format,
    );
  }
  revert(): void {}
}
