import {
  DataStore,
  PixelateShader,
  ShaderLayerState,
} from "fra.ktu.red-component";
import { ICommand } from "../icommand";

export class AddShaderCommand implements ICommand {
  id!: number;
  shaderType: string;
  constructor(shaderType: string) {
    this.shaderType = shaderType;
  }
  execute(): void {
    const shaders: ShaderLayerState[] = DataStore.getInstance().getStore(
      "editorScene.shaders",
    );
    let shaderState: ShaderLayerState;
    switch (this.shaderType) {
      case "pixelate":
        shaderState = PixelateShader.getDefaultState();
        break;
      default:
        shaderState = PixelateShader.getDefaultState();
    }
    shaders.push(shaderState);
    this.id = shaderState.id;
    DataStore.getInstance().touch("editorScene.shaders");
  }
  revert(): void {
    const shaders: ShaderLayerState[] = DataStore.getInstance().getStore(
      "editorScene.shaders",
    );
    const index = shaders.findIndex((shader) => shader.id === this.id);
    if (index !== -1) {
      shaders.splice(index, 1);
      DataStore.getInstance().touch("editorScene.shaders");
    }
  }
}
