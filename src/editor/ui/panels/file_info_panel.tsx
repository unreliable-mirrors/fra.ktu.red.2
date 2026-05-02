import jsx from "texsaur";
import { DataStore, KTUComponent } from "fra.ktu.red-component";
import { SceneState } from "fra.ktu.red-component";
import { PlaybackControlsComponent } from "./components/playback_controls";
import { executeCommand } from "../../../ktu/helpers/commands_manager";
import { ResizeCanvasCommand } from "../../commands/resize_canvas_command";
import { keyboardShortcuts } from "../../../ktu/helpers/keyboard_shortcuts";

class FileInfoPanel extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);

    keyboardShortcuts.register({
      key: "i",
      action: () => this.onClick(),
      description: "Show/Hide File Info Panel",
    });
  }

  render(): Element {
    return (
      <div class="panel left" id="file-info-panel">
        <h3 onclick={() => this.onClick()}>File Info (I)</h3>
        <div>
          <span>Name: </span>
          <input
            type="text"
            value={(this.bindingData["editorScene"] as SceneState).name}
            oninput={(e) => {
              this.onNameChange((e.target as HTMLInputElement).value);
            }}
          ></input>
        </div>
        <div>
          <span>Width: </span>
          <input
            type="text"
            value={(this.bindingData["editorScene"] as SceneState).width}
            oninput={(e) => {
              this.onWidthChange((e.target as HTMLInputElement).value);
            }}
          ></input>
        </div>
        <div>
          <span>Height: </span>
          <input
            type="text"
            value={(this.bindingData["editorScene"] as SceneState).height}
            oninput={(e) => {
              this.onHeightChange((e.target as HTMLInputElement).value);
            }}
          ></input>
        </div>
        <div>
          <span>Duration: </span>
          <input
            type="number"
            min="0.1"
            step="0.1"
            value={(this.bindingData["editorScene"] as SceneState).duration}
            oninput={(e) => {
              this.onDurationChange((e.target as HTMLInputElement).value);
            }}
          ></input>
        </div>
        <h3>Playback</h3>
        <PlaybackControlsComponent binding="instances.editorScene.playing" />
      </div>
    );
  }

  onClick() {
    document.getElementById("file-info-panel")?.classList.toggle("collapsed");
  }

  onNameChange(value: string) {
    DataStore.getInstance().setStore("editorScene.name", value);
  }

  onWidthChange(value: string) {
    executeCommand(
      new ResizeCanvasCommand(
        parseInt(value),
        DataStore.getInstance().getStore("editorScene.height"),
      ),
    );
  }

  onHeightChange(value: string) {
    executeCommand(
      new ResizeCanvasCommand(
        DataStore.getInstance().getStore("editorScene.width"),
        parseInt(value),
      ),
    );
  }

  onDurationChange(value: string) {
    DataStore.getInstance().setStore("editorScene.duration", parseFloat(value));
  }
}

export function FileInfoPanelComponent(props: { binding?: string }): Element {
  return new FileInfoPanel(props);
}
customElements.define("file-info-panel", FileInfoPanel);
