import { LayerState } from "fra.ktu.red-component";
import { ICommand } from "../icommand";
import { DataStore } from "fra.ktu.red-component";
import { EventDispatcher } from "fra.ktu.red-component";

export class SetLayerFieldCommand implements ICommand {
  id: number;
  field: string;
  value: string | boolean | number;
  oldValue!: string | boolean | number;

  constructor(id: number, field: string, value: string | boolean | number) {
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
      if (this.field === "visible") {
        DataStore.getInstance().touch(`editorScene.layers.!${this.id}`);
      } else {
        EventDispatcher.getInstance().dispatchEvent(
          "editorScene.layers.!" + this.id,
          "change",
          {
            field: this.field,
            value: this.value,
          },
        );
      }
    }
  }
  revert(): void {
    const layers: LayerState[] =
      DataStore.getInstance().getStore("editorScene.layers");
    const layer = layers.find((layer) => layer.id === this.id);
    if (layer) {
      (layer as any)[this.field] = this.oldValue;
      if (this.field === "visible") {
        DataStore.getInstance().touch(`editorScene.layers.!${this.id}`);
      } else {
        EventDispatcher.getInstance().dispatchEvent(
          "editorScene.layers.!" + this.id,
          "change",
          {
            field: this.field,
            value: this.oldValue,
          },
        );
      }
    }
  }
}
