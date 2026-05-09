import { DataStore, ShaderLayerState } from "fra.ktu.red-component";
import { ICommand } from "../icommand";
import { touchThingsById } from "../../helpers/active_helper";

export class RemoveShaderCommand implements ICommand {
  historyLabel = "RemoveShaderCommand";
  state: ShaderLayerState;
  oldThingId!: number;
  destinationLayerId?: number;
  position!: number;

  constructor(state: ShaderLayerState, destinationLayerId?: number) {
    this.state = state;
    this.destinationLayerId = destinationLayerId;
  }

  execute() {
    let shaders: ShaderLayerState[];
    if (this.destinationLayerId !== undefined) {
      shaders = DataStore.getInstance().getStore(
        "editorScene.layers.!" + this.destinationLayerId + ".shaders",
      ) as ShaderLayerState[];
    } else {
      shaders = DataStore.getInstance().getStore(
        "editorScene.shaders",
      ) as ShaderLayerState[];
    }
    if (shaders && Array.isArray(shaders)) {
      const index = shaders.findIndex((s) => s.id === this.state.id);
      if (index !== -1) {
        this.position = index;
        shaders.splice(index, 1);

        if (shaders.length > 0) {
          let nPosition = this.position;
          if (nPosition >= shaders.length) {
            nPosition = shaders.length - 1;
          }
          this.oldThingId = DataStore.getInstance().getStore("activeThingId");
          if (this.oldThingId === this.state.id) {
            DataStore.getInstance().setStore(
              "activeThingId",
              shaders[nPosition].id,
            );
            touchThingsById(shaders[nPosition].id);
          }
        } else {
          DataStore.getInstance().setStore(
            "activeThingId",
            this.destinationLayerId,
          );
        }

        if (this.destinationLayerId !== undefined) {
          DataStore.getInstance().touch(
            "editorScene.layers.!" + this.destinationLayerId,
          );
        } else {
          DataStore.getInstance().touch("editorScene.shaders");
        }
      }
    }
  }

  revert() {
    let shaders: ShaderLayerState[];
    if (this.destinationLayerId !== undefined) {
      shaders = DataStore.getInstance().getStore(
        "editorScene.layers.!" + this.destinationLayerId + ".shaders",
      ) as ShaderLayerState[];
    } else {
      shaders = DataStore.getInstance().getStore(
        "editorScene.shaders",
      ) as ShaderLayerState[];
    }
    if (shaders && Array.isArray(shaders)) {
      shaders.splice(this.position, 0, this.state);
      if (this.oldThingId === this.state.id) {
        DataStore.getInstance().setStore("activeThingId", this.state.id);
      } else {
        touchThingsById(this.oldThingId);
      }
      if (this.destinationLayerId !== undefined) {
        DataStore.getInstance().touch(
          "editorScene.layers.!" + this.destinationLayerId,
        );
      } else {
        DataStore.getInstance().touch("editorScene.shaders");
      }
    }
  }
}
