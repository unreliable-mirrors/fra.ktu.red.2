import {
  AnaglyphShader,
  BlurShader,
  BnwShader,
  ChromaShader,
  CrossesShader,
  DataStore,
  DisplayLayerState,
  HLinesShader,
  HNoiseShader,
  HSBBlurShader,
  HueOffsetShader,
  HuePosterizeShader,
  LightSplitShader,
  MontecarloShader,
  NegativeShader,
  PosterizeShader,
  PixelateShader,
  RecolourShader,
  ScrambleShader,
  ShaderLayerState,
  VLinesShader,
} from "fra.ktu.red-component";
import { ICommand } from "../icommand";
import { touchThingsById } from "../../helpers/active_helper";

export class AddShaderCommand implements ICommand {
  historyLabel = "AddShaderCommand";
  id!: number;
  oldId!: number;
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
        case "blur":
          shaderState = BlurShader.getDefaultState("editorScene");
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
          break;
        case "hlines":
          shaderState = HLinesShader.getDefaultState("editorScene");
          break;
        case "hsb_blur":
          shaderState = HSBBlurShader.getDefaultState("editorScene");
          break;
        case "hue_offset":
          shaderState = HueOffsetShader.getDefaultState("editorScene");
          break;
        case "hue_posterize":
          shaderState = HuePosterizeShader.getDefaultState("editorScene");
          break;
        case "chroma":
          shaderState = ChromaShader.getDefaultState("editorScene");
          break;
        case "scramble":
          shaderState = ScrambleShader.getDefaultState("editorScene");
          break;
        case "negative":
          shaderState = NegativeShader.getDefaultState("editorScene");
          break;
        case "crosses":
          shaderState = CrossesShader.getDefaultState("editorScene");
          break;
        case "recolour":
          shaderState = RecolourShader.getDefaultState("editorScene");
          break;
        case "hnoise":
          shaderState = HNoiseShader.getDefaultState("editorScene");
          break;
        case "light_split":
          shaderState = LightSplitShader.getDefaultState("editorScene");
          break;
        case "posterize":
          shaderState = PosterizeShader.getDefaultState("editorScene");
          break;
        default:
          shaderState = PixelateShader.getDefaultState("editorScene");
      }
      this.createdShaderState = shaderState;
    } else {
      shaderState = this.createdShaderState;
    }

    this.id = shaderState.id;
    this.oldId = DataStore.getInstance().getStore("activeThingId");
    DataStore.getInstance().setStore("activeThingId", this.id);
    touchThingsById(this.oldId);

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
    DataStore.getInstance().setStore("activeThingId", this.oldId);
    touchThingsById(this.oldId);
  }
}
