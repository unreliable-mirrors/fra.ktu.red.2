import { DataStore } from "fra.ktu.red-component";
import { ICommand } from "../icommand";

export class ActivateShaderCommand implements ICommand {
  id: number;
  oldId!: number;
  constructor(id: number) {
    this.id = id;
  }
  execute(): void {
    this.oldId = DataStore.getInstance().getStore("activeShaderId");
    if (this.oldId === this.id) {
      return;
    }
    DataStore.getInstance().setStore("activeShaderId", this.id);
    DataStore.getInstance().touch("editorScene.shaders.!" + this.id);
    DataStore.getInstance().touch("editorScene.shaders.!" + this.oldId);
  }
  revert(): void {
    if (this.oldId === this.id) {
      return;
    }
    DataStore.getInstance().setStore("activeShaderId", this.oldId);
    DataStore.getInstance().touch("editorScene.shaders.!" + this.id);
    DataStore.getInstance().touch("editorScene.shaders.!" + this.oldId);
  }
}
