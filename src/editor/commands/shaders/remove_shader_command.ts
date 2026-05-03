import { DataStore, ShaderLayerState } from "fra.ktu.red-component";
import { ICommand } from "../icommand";

export class RemoveShaderCommand implements ICommand {
  state: ShaderLayerState;
  owner: string;

  constructor(state: ShaderLayerState, owner: string) {
    this.state = state;
    this.owner = owner;
  }

  execute() {
    const shaders = DataStore.getInstance().getStore(
      this.owner,
    ) as ShaderLayerState[];
    console.log(
      "Removing shader with id:",
      this.state.id,
      "from owner:",
      this.owner,
      "with shaders:",
      shaders,
    );
    if (shaders && Array.isArray(shaders)) {
      const index = shaders.findIndex((s) => s.id === this.state.id);
      if (index !== -1) {
        shaders.splice(index, 1);
        DataStore.getInstance().touch(this.owner);
      }
    }
  }

  revert() {
    const shaders = DataStore.getInstance().getStore(
      this.owner + ".shaders",
    ) as ShaderLayerState[];
    if (shaders && Array.isArray(shaders)) {
      shaders.push(this.state);
      DataStore.getInstance().touch(this.owner);
    }
  }
}
