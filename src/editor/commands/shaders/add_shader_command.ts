import {
  AnaglyphShader,
  BnwShader,
  DataStore,
  DisplayLayerState,
  HLinesShader,
  MontecarloShader,
  PixelateShader,
  ShaderLayerState,
  VLinesShader,
} from "fra.ktu.red-component";
import { ICommand } from "../icommand";

export class AddShaderCommand implements ICommand {
  id!: number;
  shaderType: string;
  destinationLayerId?: number;
  createdShaderState?: ShaderLayerState;
  constructor(shaderType: string, destinationLayerId?: number) {
    this.shaderType = shaderType;
    this.destinationLayerId = destinationLayerId;
  }
  execute(): void {
    let shaderState: ShaderLayerState;
    if (!this.createdShaderState) {
      switch (this.shaderType) {
        case "pixelate":
          shaderState = PixelateShader.getDefaultState("editorScene");
          break;
        case "bnw":
          shaderState = BnwShader.getDefaultState("editorScene");
          break;
        case "montecarlo":
          shaderState = MontecarloShader.getDefaultState("editorScene");
          break;
        case "anaglyph":
          shaderState = AnaglyphShader.getDefaultState("editorScene");
          break;
        case "vlines":
          shaderState = VLinesShader.getDefaultState("editorScene");
          shaderState.type = "vlines";
          break;
        case "hlines":
          shaderState = HLinesShader.getDefaultState("editorScene");
          shaderState.type = "hlines";
          break;
        default:
          shaderState = PixelateShader.getDefaultState("editorScene");
      }
      this.createdShaderState = shaderState;
    } else {
      shaderState = this.createdShaderState;
    }

    if (this.destinationLayerId !== undefined) {
      const layer = (
        DataStore.getInstance().getStore(
          "editorScene.layers",
        ) as DisplayLayerState[]
      ).find((layer) => layer.id === this.destinationLayerId);
      if (layer) {
        layer.shaders.push(shaderState);
        console.log("SHADERS", layer.shaders);
        DataStore.getInstance().touch("editorScene.layers.!" + layer.id);
      }
    } else {
      const shaders: ShaderLayerState[] = DataStore.getInstance().getStore(
        "editorScene.shaders",
      );

      shaders.push(shaderState);
      DataStore.getInstance().touch("editorScene.shaders");
    }
    this.id = shaderState.id;
  }
  revert(): void {
    if (this.destinationLayerId !== undefined) {
      const layer = (
        DataStore.getInstance().getStore(
          "editorScene.layers",
        ) as DisplayLayerState[]
      ).find((layer) => layer.id === this.destinationLayerId);
      if (layer) {
        const index = layer.shaders.findIndex(
          (shader) => shader.id === this.id,
        );
        if (index !== -1) {
          layer.shaders.splice(index, 1);
          DataStore.getInstance().touch("editorScene.layers.!" + layer.id);
        }
      }
    } else {
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
}
