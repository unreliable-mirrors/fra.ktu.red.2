import { DataStore, LayerState } from "fra.ktu.red-component";
import { ICommand } from "../icommand";
import { touchThingsById } from "../../helpers/active_helper";

export class RemoveLayerCommand implements ICommand {
  historyLabel = "RemoveLayerCommand";
  state: LayerState;
  oldThingId!: number;
  position!: number;
  constructor(state: LayerState) {
    this.state = state;
  }

  execute(): void {
    const layers: LayerState[] =
      DataStore.getInstance().getStore("editorScene.layers");
    this.position = layers.findIndex((layer) => layer.id === this.state.id);
    const updatedLayers = layers.filter((layer) => layer.id !== this.state.id);
    if (updatedLayers.length > 0) {
      let nPosition = this.position;
      if (nPosition >= updatedLayers.length) {
        nPosition = updatedLayers.length - 1;
      }
      this.oldThingId = DataStore.getInstance().getStore("activeThingId");
      if (this.oldThingId === this.state.id) {
        DataStore.getInstance().setStore(
          "activeThingId",
          updatedLayers[nPosition].id,
        );
        touchThingsById(updatedLayers[nPosition].id);
      }
    } else {
      DataStore.getInstance().setStore("activeThingId", null);
    }
    DataStore.getInstance().setStore("editorScene.layers", updatedLayers);
  }

  revert(): void {
    const layers: LayerState[] =
      DataStore.getInstance().getStore("editorScene.layers");
    const updatedLayers = [...layers];
    updatedLayers.splice(this.position, 0, this.state);
    if (this.oldThingId === this.state.id) {
      DataStore.getInstance().setStore("activeThingId", this.state.id);
    } else {
      touchThingsById(this.oldThingId);
    }
    DataStore.getInstance().setStore("editorScene.layers", updatedLayers);
  }
}
