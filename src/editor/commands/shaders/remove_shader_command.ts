import { DataStore, ShaderLayerState } from "fra.ktu.red-component";
import { ICommand } from "../icommand";

export class RemoveShaderCommand implements ICommand {
  state: ShaderLayerState;
  destinationLayerId?: number;

  constructor(state: ShaderLayerState, destinationLayerId?: number) {
    this.state = state;
    this.destinationLayerId = destinationLayerId;
  }

  execute() {
    let shaders: ShaderLayerState[];
    if (this.destinationLayerId !== undefined) {
      shaders = DataStore.getInstance().getStore(
        "editorScene.layers.!" + this.destinationLayerId + ".shaders",
      ) as ShaderLayerState[];
    } else {
      shaders = DataStore.getInstance().getStore(
        "editorScene.shaders",
      ) as ShaderLayerState[];
    }
    if (shaders && Array.isArray(shaders)) {
      const index = shaders.findIndex((s) => s.id === this.state.id);
      if (index !== -1) {
        shaders.splice(index, 1);
        if (this.destinationLayerId !== undefined) {
          DataStore.getInstance().touch(
            "editorScene.layers.!" + this.destinationLayerId,
          );
        } else {
          DataStore.getInstance().touch("editorScene.shaders");
        }
      }
    }
  }

  revert() {
    let shaders: ShaderLayerState[];
    if (this.destinationLayerId !== undefined) {
      shaders = DataStore.getInstance().getStore(
        "editorScene.layers.!" + this.destinationLayerId + ".shaders",
      ) as ShaderLayerState[];
    } else {
      shaders = DataStore.getInstance().getStore(
        "editorScene.shaders",
      ) as ShaderLayerState[];
    }
    if (shaders && Array.isArray(shaders)) {
      shaders.push(this.state);
      if (this.destinationLayerId !== undefined) {
        DataStore.getInstance().touch(
          "editorScene.layers.!" + this.destinationLayerId,
        );
      } else {
        DataStore.getInstance().touch("editorScene.shaders");
      }
    }
  }
}
