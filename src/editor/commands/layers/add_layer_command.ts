import {
  BackgroundLayer,
  DataStore,
  LayerState,
  SceneState,
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
    let layerState: LayerState;
    layerState = BackgroundLayer.getDefaultState();

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
