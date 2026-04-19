import { LayerState } from "fra.ktu.red-component";
import { ICommand } from "../icommand";
import { DataStore } from "fra.ktu.red-component";

export class ToggleLayerCommand implements ICommand {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
  execute(): void {
    const layers: LayerState[] =
      DataStore.getInstance().getStore("editorScene.layers");
    const layer = layers.find((layer) => layer.id === this.id);
    if (layer) {
      layer.visible = !layer.visible;
      DataStore.getInstance().touch(`editorScene.layers.!${this.id}`);
    }
  }
  revert(): void {
    const layers: LayerState[] =
      DataStore.getInstance().getStore("editorScene.layers");
    const layer = layers.find((layer) => layer.id === this.id);
    if (layer) {
      layer.visible = !layer.visible;
      DataStore.getInstance().touch(`editorScene.layers.!${this.id}`);
    }
  }
}
