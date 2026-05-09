import { DataStore, ShaderLayerState } from "fra.ktu.red-component";
import { ICommand } from "../icommand";

export class MoveShaderDownCommand implements ICommand {
  historyLabel = "MoveShaderDownCommand";
  shaderId: number;
  destinationLayerId?: number;

  constructor(shaderId: number, destinationLayerId?: number) {
    this.shaderId = shaderId;
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
      const index = shaders.findIndex((s) => s.id === this.shaderId);
      if (index > 0) {
        const temp = shaders[index - 1];
        shaders[index - 1] = shaders[index];
        shaders[index] = temp;
        if (this.destinationLayerId !== undefined) {
          DataStore.getInstance().touch(
            "editorScene.layers.!" + this.destinationLayerId + ".shaders",
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
      const index = shaders.findIndex((s) => s.id === this.shaderId);
      if (index < shaders.length - 1) {
        const temp = shaders[index + 1];
        shaders[index + 1] = shaders[index];
        shaders[index] = temp;
        if (this.destinationLayerId !== undefined) {
          DataStore.getInstance().touch(
            "editorScene.layers.!" + this.destinationLayerId + ".shaders",
          );
        } else {
          DataStore.getInstance().touch("editorScene.shaders");
        }
      }
    }
  }
}
