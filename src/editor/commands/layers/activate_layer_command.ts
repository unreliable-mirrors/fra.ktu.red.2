import { DataStore } from "fra.ktu.red-component";
import { ICommand } from "../icommand";

export class ActivateLayerCommand implements ICommand {
  id: number;
  oldId!: number;
  constructor(id: number) {
    this.id = id;
  }
  execute(): void {
    this.oldId = DataStore.getInstance().getStore("activeLayerId");
    if (this.oldId === this.id) {
      return;
    }
    DataStore.getInstance().setStore("activeLayerId", this.id);
    DataStore.getInstance().touch("editorScene.layers.!" + this.id);
    DataStore.getInstance().touch("editorScene.layers.!" + this.oldId);
  }
  revert(): void {
    if (this.oldId === this.id) {
      return;
    }
    DataStore.getInstance().setStore("activeLayerId", this.oldId);
    DataStore.getInstance().touch("editorScene.layers.!" + this.id);
    DataStore.getInstance().touch("editorScene.layers.!" + this.oldId);
  }
}
