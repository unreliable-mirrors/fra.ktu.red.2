import { DataStore } from "fra.ktu.red-component";
import { ICommand } from "./icommand";

export class ExportSequenceCommand implements ICommand {
  constructor() {}
  execute(): void {
    DataStore.getInstance().setStore("playing", false);
    DataStore.getInstance().setStore("instances.editorScene.exporting", true);
    DataStore.getInstance().setStore("instances.editorScene.exportNext", true);
  }
  revert(): void {}
}
