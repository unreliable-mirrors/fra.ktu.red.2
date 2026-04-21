import {
  DataStore,
  EventDispatcher,
  ModulatorState,
} from "fra.ktu.red-component";
import { ICommand } from "../icommand";

export class SetModulatorFieldCommand implements ICommand {
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
    const modulators: ModulatorState[] = DataStore.getInstance().getStore(
      "editorScene.modulators",
    );
    const modulator = modulators.find((modulator) => modulator.id === this.id);
    if (modulator) {
      this.oldValue = (modulator as any)[this.field];
      (modulator as any)[this.field] = this.value;
      if (this.field === "visible") {
        DataStore.getInstance().touch(`editorScene.modulators.!${this.id}`);
      } else {
        EventDispatcher.getInstance().dispatchEvent(
          "editorScene.modulators.!" + this.id,
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
    const modulators: ModulatorState[] = DataStore.getInstance().getStore(
      "editorScene.modulators",
    );
    const modulator = modulators.find((modulator) => modulator.id === this.id);
    if (modulator) {
      (modulator as any)[this.field] = this.oldValue;
      if (this.field === "visible") {
        DataStore.getInstance().touch(`editorScene.modulators.!${this.id}`);
      } else {
        EventDispatcher.getInstance().dispatchEvent(
          "editorScene.modulators.!" + this.id,
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
