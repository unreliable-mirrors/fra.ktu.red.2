import { DataStore, LayerState } from "fra.ktu.red-component";
import { ICommand } from "./icommand";

export class RemoveLayerCommand implements ICommand {
  state: LayerState;
  position!: number;
  constructor(state: LayerState) {
    this.state = state;
  }

  execute(): void {
    const layers: LayerState[] =
      DataStore.getInstance().getStore("editorScene.layers");
    this.position = layers.findIndex((layer) => layer.id === this.state.id);
    const updatedLayers = layers.filter((layer) => layer.id !== this.state.id);
    DataStore.getInstance().setStore("editorScene.layers", updatedLayers);
  }

  revert(): void {
    const layers: LayerState[] =
      DataStore.getInstance().getStore("editorScene.layers");
    const updatedLayers = [...layers];
    updatedLayers.splice(this.position, 0, this.state);
    DataStore.getInstance().setStore("editorScene.layers", updatedLayers);
  }
}
