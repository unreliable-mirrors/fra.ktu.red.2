import {
  DataStore,
  EventDispatcher,
  ShaderLayerState,
} from "fra.ktu.red-component";
import { ICommand } from "../icommand";

export class SetShaderFieldCommand implements ICommand {
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
    const shaders: ShaderLayerState[] = DataStore.getInstance().getStore(
      "editorScene.shaders",
    );
    const shader = shaders.find((shader) => shader.id === this.id);
    if (shader) {
      this.oldValue = (shader as any)[this.field];
      (shader as any)[this.field] = this.value;
      if (this.field === "visible") {
        DataStore.getInstance().touch(`editorScene.shaders.!${this.id}`);
      } else {
        EventDispatcher.getInstance().dispatchEvent(
          "editorScene.shaders.!" + this.id,
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
    const shaders: ShaderLayerState[] = DataStore.getInstance().getStore(
      "editorScene.shaders",
    );
    const shader = shaders.find((shader) => shader.id === this.id);
    if (shader) {
      (shader as any)[this.field] = this.oldValue;
      if (this.field === "visible") {
        DataStore.getInstance().touch(`editorScene.shaders.!${this.id}`);
      } else {
        EventDispatcher.getInstance().dispatchEvent(
          "editorScene.shaders.!" + this.id,
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
