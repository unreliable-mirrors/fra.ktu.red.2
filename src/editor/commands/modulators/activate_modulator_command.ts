import { DataStore } from "fra.ktu.red-component";
import { ICommand } from "../icommand";

export class ActivateModulatorCommand implements ICommand {
  id: number;
  oldId!: number;
  constructor(id: number) {
    this.id = id;
  }
  execute(): void {
    this.oldId = DataStore.getInstance().getStore("activeModulatorId");
    if (this.oldId === this.id) {
      return;
    }
    DataStore.getInstance().setStore("activeModulatorId", this.id);
    DataStore.getInstance().touch("editorScene.modulators.!" + this.id);
    DataStore.getInstance().touch("editorScene.modulators.!" + this.oldId);
  }
  revert(): void {
    if (this.oldId === this.id) {
      return;
    }
    DataStore.getInstance().setStore("activeModulatorId", this.oldId);
    DataStore.getInstance().touch("editorScene.modulators.!" + this.id);
    DataStore.getInstance().touch("editorScene.modulators.!" + this.oldId);
  }
}
