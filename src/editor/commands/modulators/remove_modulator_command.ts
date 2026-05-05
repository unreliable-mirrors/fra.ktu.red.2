import { DataStore, ModulatorState } from "fra.ktu.red-component";
import { ICommand } from "../icommand";

export class RemoveModulatorCommand implements ICommand {
  state: ModulatorState;
  position!: number;
  constructor(state: ModulatorState) {
    this.state = state;
  }
  execute() {
    const modulators: ModulatorState[] = DataStore.getInstance().getStore(
      "editorScene.modulators",
    );
    this.position = modulators.findIndex(
      (modulator) => modulator.id === this.state.id,
    );
    modulators.splice(this.position, 1);
    DataStore.getInstance().touch("editorScene.modulators");
  }

  revert() {
    const modulators: ModulatorState[] = DataStore.getInstance().getStore(
      "editorScene.modulators",
    );
    console.log(
      "Reverting RemoveModulatorCommand, inserting at position",
      this.position,
      [...modulators],
    );
    modulators.splice(this.position, 0, this.state);
    console.log(
      "Reverting RemoveModulatorCommand, inserting at position",
      this.position,
      [...modulators],
    );
    DataStore.getInstance().touch("editorScene.modulators");
  }
}
