import { DataStore, getStartingName } from "fra.ktu.red-component";
import { ICommand } from "./icommand";
import { clearCommands, clearRedo } from "../../ktu/helpers/commands_manager";
import { SceneState } from "fra.ktu.red-component";

export class NewStateCommand implements ICommand {
  undoable?: boolean | undefined = false;
  constructor() {}
  execute(): void {
    const state: SceneState = {
      name: getStartingName(),
      width: 604,
      height: 1072,
      duration: 5,
      layers: [],
      shaders: [],
      modulators: [],
      assets: {},
      counter: 0,
    };
    clearCommands();
    clearRedo();
    DataStore.getInstance().setStore("editorScene", state);
  }
  revert(): void {}
}
