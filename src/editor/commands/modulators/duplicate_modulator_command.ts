import { DataStore, ModulatorState } from "fra.ktu.red-component";
import { ICommand } from "../icommand";

export class DuplicateModulatorCommand implements ICommand {
  historyLabel = "DuplicateModulatorCommand";
  id: number;
  newId!: number;

  constructor(id: number) {
    this.id = id;
  }

  execute(): void {
    const modulators: ModulatorState[] = DataStore.getInstance().getStore(
      "editorScene.modulators",
    );
    const modulatorToDuplicate = modulators.find(
      (modulator) => modulator.id === this.id,
    );
    const position = modulators.findIndex(
      (modulator) => modulator.id === this.id,
    );
    if (modulatorToDuplicate) {
      const duplicatedModulator = {
        ...modulatorToDuplicate,
        id: Math.floor(Math.random() * 1000000),
        name: modulatorToDuplicate.name + "_copy",
      };
      modulators.splice(position + 1, 0, duplicatedModulator);
      this.newId = duplicatedModulator.id;
      DataStore.getInstance().touch("editorScene.modulators");
    }
  }

  revert(): void {
    const modulators: ModulatorState[] = DataStore.getInstance().getStore(
      "editorScene.modulators",
    );
    const updatedModulators = modulators.filter(
      (modulator) => modulator.id !== this.newId,
    );
    DataStore.getInstance().setStore(
      "editorScene.modulators",
      updatedModulators,
    );
  }
}
