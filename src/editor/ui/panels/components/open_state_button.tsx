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
          <button
            className="button"
            type="button"
            onclick={() => this.handleClick()}
          >
            Open File
          </button>

          <div class="confirm-modal-overlay hidden">
            <div
              class="confirm-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="open-file-modal-title"
            >
              <h3 id="open-file-modal-title">Open File</h3>
              <p>
                Opening a file will discard any unsaved changes in the current
                scene.
              </p>
              <div class="confirm-modal-actions">
                <button onclick={() => this.hideConfirmModal()}>Cancel</button>
                <button onclick={() => this.confirmOpenFile()}>Continue</button>
              </div>
            </div>
          </div>
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
    this.showConfirmModal();
  }

  showConfirmModal() {
    this.querySelector(".confirm-modal-overlay")?.classList.remove("hidden");
  }

  hideConfirmModal() {
    this.querySelector(".confirm-modal-overlay")?.classList.add("hidden");
  }

  confirmOpenFile() {
    this.hideConfirmModal();
    document.getElementById("fileOpenInput")?.click();
  }
}

export function OpenStateButtonComponent(): Element {
  return new OpenStateButton();
}

customElements.define("open-state-button", OpenStateButton);
