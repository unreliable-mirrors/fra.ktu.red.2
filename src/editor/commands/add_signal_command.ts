import { DataStore, SceneState } from "fra.ktu.red-component";
import { ICommand } from "./icommand";

export class AddSignalCommand implements ICommand {
  signalName: string;

  constructor(signalName: string) {
    this.signalName = signalName;
  }

  execute() {
    const scene = DataStore.getInstance().getStore("editorScene") as SceneState;
    if (scene && Array.isArray(scene.signals)) {
      scene.signals.push(this.signalName);
      DataStore.getInstance().touch("editorScene.signals");
    }
  }

  revert() {
    const scene = DataStore.getInstance().getStore("editorScene") as SceneState;
    if (scene && Array.isArray(scene.signals)) {
      const index = scene.signals.indexOf(this.signalName);
      if (index !== -1) {
        scene.signals.splice(index, 1);
        DataStore.getInstance().touch("editorScene.signals");
      }
    }
  }
}
