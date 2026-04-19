import { cacheAsset, DataStore } from "fra.ktu.red-component";
import { ICommand } from "./icommand";

export class LoadFileCommand implements ICommand {
  sceneStateId: string;
  id: number;
  file: string;
  oldHash!: string;
  constructor(sceneStateId: string, id: number, file: string) {
    this.sceneStateId = sceneStateId;
    this.id = id;
    this.file = file;
  }
  execute(): void {
    if (this.file.startsWith("data:")) {
      console.log("STARTS WITH DATA");
      const hash = cacheAsset(this.sceneStateId, this.file);

      const state = DataStore.getInstance().getStore(
        this.sceneStateId + ".layers.!" + this.id,
      );
      this.oldHash = state.imageHash;
      state.imageHash = hash;
      DataStore.getInstance().touch(this.sceneStateId + ".layers.!" + this.id);
    }
  }
  revert(): void {
    const state = DataStore.getInstance().getStore(
      this.sceneStateId + ".layers.!" + this.id,
    );
    state.imageHash = this.oldHash;
    DataStore.getInstance().touch(this.sceneStateId + ".layers.!" + this.id);
  }
}
