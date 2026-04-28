import jsx from "texsaur";
import { DataStore, KTUComponent, SceneState } from "fra.ktu.red-component";

class OpenStateButton extends KTUComponent {
  constructor() {
    super();
  }

  render(): Element {
    return (
      <div>
        <div>
          <form
            className="hidden"
            id="openFile"
            name="openFile"
            enctype="multipart/form-data"
            method="post"
          >
            <fieldset>
              <input
                type="file"
                id="fileOpenInput"
                accept=".red"
                onchange={() => {
                  console.log("change");
                  this.loadFile();
                }}
              />
            </fieldset>
          </form>
          <label for="fileOpenInput" className="button">
            Open File
          </label>
        </div>
      </div>
    );
  }

  loadFile() {
    let input: HTMLInputElement;
    let file, fr;

    input = document.getElementById("fileOpenInput") as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = (e) => {
        this.receivedText(e);
      };
      fr.readAsText(file);
      input.value = "";
    }
  }

  receivedText(e: ProgressEvent<FileReader>) {
    const lines: string = e.target!.result as string;
    const payload = JSON.parse(lines) as SceneState;
    DataStore.getInstance().setStore("editorScene", payload);
  }

  handleClick() {
    document.getElementById("btnLoad")?.click();
  }
}

export function OpenStateButtonComponent(): Element {
  return new OpenStateButton();
}

customElements.define("open-state-button", OpenStateButton);
