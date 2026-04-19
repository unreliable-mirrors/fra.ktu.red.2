import { DataStore, LayerState } from "fra.ktu.red-component";
import { ICommand } from "../icommand";

export class MoveLayerDownCommand implements ICommand {
  oldPosition!: number;
  id: number;
  constructor(id: number) {
    this.id = id;
  }
  execute(): void {
    const layers: LayerState[] =
      DataStore.getInstance().getStore("editorScene.layers");
    const layer = layers.find((layer) => layer.id === this.id);
    if (layer) {
      this.oldPosition = layers.findIndex((layer) => layer.id === this.id);
      const newPosition = this.oldPosition - 1;
      if (newPosition >= 0) {
        layers.splice(this.oldPosition, 1);
        layers.splice(newPosition, 0, layer);
        DataStore.getInstance().touch("editorScene.layers");
      }
    }
  }

  revert(): void {
    const layers: LayerState[] =
      DataStore.getInstance().getStore("editorScene.layers");
    const layer = layers.find((layer) => layer.id === this.id);
    if (layer) {
      const currentPosition = layers.findIndex((layer) => layer.id === this.id);
      layers.splice(currentPosition, 1);
      layers.splice(this.oldPosition, 0, layer);
      DataStore.getInstance().touch("editorScene.layers");
    }
  }
}
