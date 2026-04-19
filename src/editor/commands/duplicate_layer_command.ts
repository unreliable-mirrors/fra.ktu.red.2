import { DataStore, LayerState } from "fra.ktu.red-component";
import { ICommand } from "./icommand";

export class DuplicateLayerCommand implements ICommand {
  newId!: number;
  id: number;
  constructor(id: number) {
    this.id = id;
  }

  execute(): void {
    const layers: LayerState[] =
      DataStore.getInstance().getStore("editorScene.layers");
    const layerToDuplicate = layers.find((layer) => layer.id === this.id);
    const position = layers.findIndex((layer) => layer.id === this.id);
    if (layerToDuplicate) {
      const duplicatedLayer = {
        ...layerToDuplicate,
        id: Math.floor(Math.random() * 1000000),
        name: layerToDuplicate.name + "_copy",
      };
      layers.splice(position + 1, 0, duplicatedLayer);
      this.newId = duplicatedLayer.id;
      DataStore.getInstance().touch("editorScene.layers");
    }
  }

  revert(): void {
    const layers: LayerState[] =
      DataStore.getInstance().getStore("editorScene.layers");
    const updatedLayers = layers.filter((layer) => layer.id !== this.newId);
    DataStore.getInstance().setStore("editorScene.layers", updatedLayers);
  }
}
