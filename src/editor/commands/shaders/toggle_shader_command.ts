import { DataStore, ShaderLayerState } from "fra.ktu.red-component";
import { ICommand } from "../icommand";

export class ToggleShaderCommand implements ICommand {
  id: number;
  owner: string;

  constructor(owner: string, id: number) {
    this.owner = owner;
    this.id = id;
  }

  execute() {
    const shaderState = DataStore.getInstance().getStore(
      this.owner + ".!" + this.id,
    ) as ShaderLayerState;

    if (shaderState) {
      shaderState.visible = !shaderState.visible;
      DataStore.getInstance().touch(this.owner + ".!" + this.id);
    }
  }

  revert() {
    this.execute();
  }
}
