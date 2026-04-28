import { DataStore } from "fra.ktu.red-component";
import { ICommand } from "../icommand";

export class ActivateShaderCommand implements ICommand {
  id: number;
  owner: string;
  oldId!: number;
  undoable?: boolean | undefined = false;
  constructor(id: number, owner: string) {
    this.id = id;
    this.owner = owner;
  }
  execute(): void {
    this.oldId = DataStore.getInstance().getStore("activeShaderId");
    if (this.oldId === this.id) {
      return;
    }
    DataStore.getInstance().setStore("activeShaderId", this.id);
    if (this.owner.includes(".!")) {
      DataStore.getInstance().touch(this.owner.split(".!")[0]);
    } else {
      DataStore.getInstance().touch("editorScene.shaders.!" + this.id);
    }
    DataStore.getInstance().touch("editorScene.shaders.!" + this.oldId);
  }
  revert(): void {
    if (this.oldId === this.id) {
      return;
    }
    DataStore.getInstance().setStore("activeShaderId", this.oldId);
    if (this.owner.includes(".!")) {
      DataStore.getInstance().touch(this.owner.split(".!")[0]);
    } else {
      DataStore.getInstance().touch("editorScene.shaders.!" + this.id);
    }
    DataStore.getInstance().touch("editorScene.shaders.!" + this.oldId);
  }
}
