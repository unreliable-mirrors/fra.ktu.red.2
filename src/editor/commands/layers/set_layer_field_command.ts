import { LayerState } from "fra.ktu.red-component";
import { ICommand } from "../icommand";
import { DataStore } from "fra.ktu.red-component";

export class SetLayerFieldCommand implements ICommand {
  id: number;
  field: string;
  value: string;
  oldValue!: string;

  constructor(id: number, field: string, value: string) {
    this.id = id;
    this.field = field;
    this.value = value;
  }
  execute(): void {
    const layers: LayerState[] =
      DataStore.getInstance().getStore("editorScene.layers");
    const layer = layers.find((layer) => layer.id === this.id);
    if (layer) {
      this.oldValue = (layer as any)[this.field];
      (layer as any)[this.field] = this.value;
      DataStore.getInstance().touch(`editorScene.layers.!${this.id}`);
    }
  }
  revert(): void {
    const layers: LayerState[] =
      DataStore.getInstance().getStore("editorScene.layers");
    const layer = layers.find((layer) => layer.id === this.id);
    if (layer) {
      (layer as any)[this.field] = this.oldValue;
      DataStore.getInstance().touch(`editorScene.layers.!${this.id}`);
    }
  }
}
