import { DataStore, LayerState } from "fra.ktu.red-component";
import { ICommand } from "../icommand";

export class AssignSignalCommand implements ICommand {
  id: number;
  field: string;
  signalName: string | null;
  oldSignalName!: string | null;
  owner: string;
  constructor(
    id: number,
    field: string,
    signalName: string | null,
    owner: string,
  ) {
    this.id = id;
    this.field = field;
    this.signalName = signalName;
    this.owner = owner;
  }
  execute(): void {
    const state: LayerState = DataStore.getInstance().getStore(
      this.owner + ".!" + this.id,
    );
    const currentSignal = state.signaledFields[this.field];
    this.oldSignalName = currentSignal;
    if (this.oldSignalName === this.signalName) {
      return;
    }
    console.log("ASSIGNING SIGNAL", this.signalName, "TO", this.field, state);
    if (this.signalName) {
      state.signaledFields[this.field] = this.signalName;
    } else {
      delete state.signaledFields[this.field];
    }
    DataStore.getInstance().touch(this.owner + ".!" + this.id);
  }
  revert(): void {
    const state: LayerState = DataStore.getInstance().getStore(
      this.owner + ".!" + this.id,
    );
    if (this.oldSignalName === this.signalName) {
      return;
    }
    if (this.oldSignalName) {
      state.signaledFields[this.field] = this.oldSignalName;
    } else {
      delete state.signaledFields[this.field];
    }
    DataStore.getInstance().touch(this.owner + ".!" + this.id);
  }
}
