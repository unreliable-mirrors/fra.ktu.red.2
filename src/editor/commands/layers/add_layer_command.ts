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
  layerType: string;

  constructor(layerType: string) {
    this.layerType = layerType;
  }

  execute(): void {
    const scene: SceneState = DataStore.getInstance().getStore("editorScene");
    let layerState: DisplayLayerState;
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

    scene.layers.push(layerState);
    this.id = layerState.id;
    this.oldId = DataStore.getInstance().getStore("activeLayerId");

    DataStore.getInstance().setStore("activeLayerId", this.id);
    DataStore.getInstance().touch("editorScene.layers");
  }

  revert(): void {
    const scene: SceneState = DataStore.getInstance().getStore("editorScene");
    scene.layers = scene.layers.filter((layer) => layer.id !== this.id);

    DataStore.getInstance().setStore("activeLayerId", this.oldId);
    DataStore.getInstance().touch("editorScene.layers");
  }
}
