import { DataStore, ModulatorState } from "fra.ktu.red-component";
import { ICommand } from "../icommand";
import { touchThingsById } from "../../helpers/active_helper";

export class RemoveModulatorCommand implements ICommand {
  historyLabel = "RemoveModulatorCommand";
  state: ModulatorState;
  oldThingId!: number;
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

    if (modulators.length > 0) {
      let nPosition = this.position;
      if (nPosition >= modulators.length) {
        nPosition = modulators.length - 1;
      }
      this.oldThingId = DataStore.getInstance().getStore("activeThingId");
      if (this.oldThingId === this.state.id) {
        DataStore.getInstance().setStore(
          "activeThingId",
          modulators[nPosition].id,
        );
        touchThingsById(modulators[nPosition].id);
      }
    } else {
      DataStore.getInstance().setStore("activeThingId", null);
    }

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
    if (this.oldThingId === this.state.id) {
      DataStore.getInstance().setStore("activeThingId", this.state.id);
    } else {
      touchThingsById(this.oldThingId);
    }

    DataStore.getInstance().touch("editorScene.modulators");
  }
}
