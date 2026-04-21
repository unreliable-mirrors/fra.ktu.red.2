import { DataStore } from "fra.ktu.red-component";
import { ICommand } from "./icommand";

export class ResizeCanvasCommand implements ICommand {
  width: number;
  height: number;
  oldWidth!: number;
  oldHeight!: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  execute(): void {
    this.oldWidth = DataStore.getInstance().getStore("editorScene.width");
    this.oldHeight = DataStore.getInstance().getStore("editorScene.height");
    DataStore.getInstance().setStore("editorScene.width", this.width);
    DataStore.getInstance().setStore("editorScene.height", this.height);
  }
  revert(): void {
    DataStore.getInstance().setStore("editorScene.width", this.oldWidth);
    DataStore.getInstance().setStore("editorScene.height", this.oldHeight);
  }
}
