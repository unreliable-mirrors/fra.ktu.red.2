import { DataStore } from "fra.ktu.red-component";
import { ICommand } from "./icommand";

export class AssignEmulatorCommand implements ICommand {
  modulatorId: string | null;
  signalName: string | null;

  constructor(signalName: string | null, modulatorId: string | null) {
    this.signalName = signalName;
    this.modulatorId = modulatorId;
  }

  execute() {
    DataStore.getInstance().setStore(
      "signals." + this.signalName + ".emulator",
      this.modulatorId,
    );
  }

  revert() {
    DataStore.getInstance().setStore(
      "signals." + this.signalName + ".emulator",
      undefined,
    );
  }
}
