import jsx from "texsaur";
import { DataStore, KTUComponent } from "fra.ktu.red-component";
import { SceneState } from "fra.ktu.red-component";

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
      </div>
    );
  }

  onNameChange(value: string) {
    DataStore.getInstance().setStore("editorScene.name", value);
  }
}

export function FileInfoPanelComponent(props: { binding?: string }): Element {
  return new FileInfoPanel(props);
}
customElements.define("file-info-panel", FileInfoPanel);
