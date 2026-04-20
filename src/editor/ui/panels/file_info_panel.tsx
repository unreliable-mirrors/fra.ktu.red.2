import jsx from "texsaur";
import { DataStore, KTUComponent } from "fra.ktu.red-component";
import { SceneState } from "fra.ktu.red-component";
import { PlaybackControlsComponent } from "./components/playback_controls";

class FileInfoPanel extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);
  }

  render(): Element {
    return (
      <div class="panel left">
        <h3>File Info</h3>
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
        <PlaybackControlsComponent binding="playing" />
      </div>
    );
  }

  onNameChange(value: string) {
    DataStore.getInstance().setStore("editorScene.name", value);
  }

  onDurationChange(value: string) {
    DataStore.getInstance().setStore("editorScene.duration", parseFloat(value));
  }
}

export function FileInfoPanelComponent(props: { binding?: string }): Element {
  return new FileInfoPanel(props);
}
customElements.define("file-info-panel", FileInfoPanel);
