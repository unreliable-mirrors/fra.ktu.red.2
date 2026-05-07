import {
  CompressorModulator,
  DataStore,
  LfoModulator,
  ModulatorState,
  RandomModulator,
  RingModulator,
} from "fra.ktu.red-component";
import { ICommand } from "../icommand";
import { SceneState } from "fra.ktu.red-component";
import { touchThingsById } from "../../helpers/active_helper";

export class AddModulatorCommand implements ICommand {
  id!: number;
  oldId!: number;
  modulatorType: string;
  createdModulatorState?: ModulatorState;
  constructor(modulatorType: string) {
    this.modulatorType = modulatorType;
  }
  execute(): void {
    const scene: SceneState = DataStore.getInstance().getStore("editorScene");
    let modulatorState: ModulatorState;
    if (!this.createdModulatorState) {
      switch (this.modulatorType) {
        case "lfo":
          modulatorState = LfoModulator.getDefaultState("editorScene");
          break;
        case "random":
          modulatorState = RandomModulator.getDefaultState("editorScene");
          break;
        case "ring":
          modulatorState = RingModulator.getDefaultState("editorScene");
          modulatorState.type = "ring";
          break;
        case "compressor":
          modulatorState = CompressorModulator.getDefaultState("editorScene");
          modulatorState.type = "compressor";
          break;
        default:
          modulatorState = LfoModulator.getDefaultState("editorScene");
      }
      this.createdModulatorState = modulatorState;
    } else {
      modulatorState = this.createdModulatorState;
    }

    scene.modulators.push(modulatorState);
    this.id = modulatorState.id;
    this.oldId = DataStore.getInstance().getStore("activeThingId");
    DataStore.getInstance().setStore("activeThingId", this.id);
    touchThingsById(this.oldId);
    DataStore.getInstance().touch("editorScene.modulators");
  }
  revert(): void {
    const scene: SceneState = DataStore.getInstance().getStore("editorScene");
    scene.modulators = scene.modulators.filter(
      (modulator) => modulator.id !== this.id,
    );
    DataStore.getInstance().setStore("activeThingId", this.oldId);
    touchThingsById(this.oldId);
    DataStore.getInstance().touch("editorScene.modulators");
  }
}
