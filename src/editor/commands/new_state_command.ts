import { DataStore, getStartingName } from "fra.ktu.red-component";
import { ICommand } from "./icommand";
import { clearCommands } from "../../ktu/helpers/commands_manager";
import { SceneState } from "fra.ktu.red-component";

export class NewStateCommand implements ICommand {
  constructor() {}
  execute(): void {
    const state: SceneState = {
      name: getStartingName(),
      width: 603,
      height: 1072,
      duration: 5,
      layers: [],
      shaders: [],
      modulators: [],
      assets: {},
      counter: 0,
    };
    clearCommands();
    DataStore.getInstance().setStore("editorScene", state);
  }
  revert(): void {}
}
