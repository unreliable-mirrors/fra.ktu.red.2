import { DataStore, ModulatorState } from "fra.ktu.red-component";
import { ICommand } from "../icommand";

export class ToggleModulatorCommand implements ICommand {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
  execute(): void {
    const modulators: ModulatorState[] = DataStore.getInstance().getStore(
      "editorScene.modulators",
    );
    const modulator = modulators.find((mod) => mod.id === this.id);
    if (modulator) {
      modulator.running = !modulator.running;
      DataStore.getInstance().touch(`editorScene.modulators.!${this.id}`);
    }
  }
  revert(): void {
    const modulators: ModulatorState[] = DataStore.getInstance().getStore(
      "editorScene.modulators",
    );
    const modulator = modulators.find((mod) => mod.id === this.id);
    if (modulator) {
      modulator.running = !modulator.running;
      DataStore.getInstance().touch(`editorScene.modulators.!${this.id}`);
    }
  }
}
