import { DataStore } from "fra.ktu.red-component";
import { ICommand } from "./icommand";
import { downloadContent } from "../../ktu/helpers/download_helper";

export class SaveStateCommand implements ICommand {
  constructor() {}
  execute(): void {
    const state = DataStore.getInstance().getStore("editorScene");
    const jsonStr = JSON.stringify(state);
    const filename = state.name + ".red";

    const content =
      "data:text/plain;charset=utf-8," + encodeURIComponent(jsonStr);
    downloadContent(filename, content);
  }
  revert(): void {
    // No need to do anything here, as the state is automatically saved after each command execution.
  }
}
