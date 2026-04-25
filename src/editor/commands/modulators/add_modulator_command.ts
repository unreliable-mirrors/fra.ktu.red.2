import {
  DataStore,
  LfoModulator,
  ModulatorState,
  RandomModulator,
} from "fra.ktu.red-component";
import { ICommand } from "../icommand";
import { SceneState } from "fra.ktu.red-component";

export class AddModulatorCommand implements ICommand {
  id!: number;
  modulatorType: string;
  constructor(modulatorType: string) {
    this.modulatorType = modulatorType;
  }
  execute(): void {
    const scene: SceneState = DataStore.getInstance().getStore("editorScene");
    let modulatorState: ModulatorState;
    switch (this.modulatorType) {
      case "lfo":
        modulatorState = LfoModulator.getDefaultState("editorScene");
        break;
      case "random":
        modulatorState = RandomModulator.getDefaultState("editorScene");
        break;
      default:
        modulatorState = LfoModulator.getDefaultState("editorScene");
    }

    scene.modulators.push(modulatorState);
    this.id = modulatorState.id;

    DataStore.getInstance().touch("editorScene.modulators");
  }
  revert(): void {
    const scene: SceneState = DataStore.getInstance().getStore("editorScene");
    scene.modulators = scene.modulators.filter(
      (modulator) => modulator.id !== this.id,
    );
    DataStore.getInstance().touch("editorScene.modulators");
  }
}
