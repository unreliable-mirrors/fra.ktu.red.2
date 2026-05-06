import {
  BackgroundLayer,
  DataStore,
  DisplayLayerState,
  SceneState,
  VideoLayer,
} from "fra.ktu.red-component";
import { ICommand } from "../icommand";

export class AddLayerCommand implements ICommand {
  id!: number;
  oldId!: number;
  oldShaderId!: number;
  layerType: string;
  createdLayerState?: DisplayLayerState;

  constructor(layerType: string) {
    this.layerType = layerType;
  }

  execute(): void {
    const scene: SceneState = DataStore.getInstance().getStore("editorScene");
    let layerState: DisplayLayerState;

    if (!this.createdLayerState) {
      switch (this.layerType) {
        case "background":
          layerState = BackgroundLayer.getDefaultState("editorScene");
          break;
        case "video":
          layerState = VideoLayer.getDefaultState("editorScene");
          break;
        default:
          layerState = BackgroundLayer.getDefaultState("editorScene");
      }
      this.createdLayerState = layerState;
    } else {
      layerState = this.createdLayerState;
    }

    scene.layers.push(layerState);
    this.id = layerState.id;
    this.oldId = DataStore.getInstance().getStore("activeLayerId");
    this.oldShaderId = DataStore.getInstance().getStore("activeShaderId");

    DataStore.getInstance().setStore("activeLayerId", this.id);
    DataStore.getInstance().setStore("activeShaderId", null);
    DataStore.getInstance().touch("editorScene.layers");
    DataStore.getInstance().touch("editorScene.shaders");
  }

  revert(): void {
    const scene: SceneState = DataStore.getInstance().getStore("editorScene");
    scene.layers = scene.layers.filter((layer) => layer.id !== this.id);

    DataStore.getInstance().setStore("activeLayerId", this.oldId);
    DataStore.getInstance().setStore("activeShaderId", this.oldShaderId);
    DataStore.getInstance().touch("editorScene.layers");
    DataStore.getInstance().touch("editorScene.shaders");
  }
}
