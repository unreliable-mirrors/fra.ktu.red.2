import { DataStore } from "fra.ktu.red-component";
import { ICommand } from "../icommand";

export class ActivateLayerCommand implements ICommand {
  id: number;
  oldId!: number;
  oldShaderId!: number;
  undoable?: boolean | undefined = false;
  constructor(id: number) {
    this.id = id;
  }
  execute(): void {
    this.oldId = DataStore.getInstance().getStore("activeLayerId");
    this.oldShaderId = DataStore.getInstance().getStore("activeShaderId");
    if (this.oldId === this.id) {
      return;
    }
    DataStore.getInstance().setStore("activeLayerId", this.id);
    DataStore.getInstance().setStore("activeShaderId", null);
    DataStore.getInstance().touch("editorScene.layers.!" + this.id);
    DataStore.getInstance().touch("editorScene.layers.!" + this.oldId);
    DataStore.getInstance().touch("editorScene.shaders");
  }
  revert(): void {
    if (this.oldId === this.id) {
      return;
    }
    DataStore.getInstance().setStore("activeLayerId", this.oldId);
    DataStore.getInstance().setStore("activeShaderId", this.oldShaderId);
    DataStore.getInstance().touch("editorScene.layers.!" + this.id);
    DataStore.getInstance().touch("editorScene.layers.!" + this.oldId);
    DataStore.getInstance().touch("editorScene.shaders");
  }
}
