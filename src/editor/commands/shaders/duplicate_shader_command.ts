import { DataStore, ShaderLayerState } from "fra.ktu.red-component";
import { ICommand } from "../icommand";

export class DuplicateShaderCommand implements ICommand {
  historyLabel = "DuplicateShaderCommand";
  id: number;
  newId!: number;
  destinationLayerId?: number;

  constructor(id: number, destinationLayerId?: number) {
    this.id = id;
    this.destinationLayerId = destinationLayerId;
  }

  execute() {
    let shaders: ShaderLayerState[];
    let state: ShaderLayerState;
    if (this.destinationLayerId !== undefined) {
      shaders = DataStore.getInstance().getStore(
        "editorScene.layers.!" + this.destinationLayerId + ".shaders",
      ) as ShaderLayerState[];
    } else {
      shaders = DataStore.getInstance().getStore(
        "editorScene.shaders",
      ) as ShaderLayerState[];
    }
    state = shaders.find((s) => s.id === this.id) as ShaderLayerState;
    if (shaders && Array.isArray(shaders) && state) {
      const duplicatedState = {
        ...state,
        id: Math.floor(Math.random() * 1000000),
        name: state.name + "_copy",
      };
      shaders.push(duplicatedState);
      this.newId = duplicatedState.id;
      if (this.destinationLayerId !== undefined) {
        DataStore.getInstance().touch(
          "editorScene.layers.!" + this.destinationLayerId,
        );
      } else {
        DataStore.getInstance().touch("editorScene.shaders");
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
      const index = shaders.findIndex((s) => s.id === this.newId);
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
}
