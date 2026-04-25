import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import { NewStateButtonComponent } from "./components/new_state_button";
import { SaveStateButtonComponent } from "./components/save_state_button";
import { ExportFrameButtonComponent } from "./components/export_frame_button";

class FilePanel extends KTUComponent {
  constructor() {
    super();
  }

  render(): Element {
    return (
      <div class="panel left">
        <h3>Open/Save</h3>
        <div>
          <NewStateButtonComponent />
          <SaveStateButtonComponent />
          <span class="separator"></span>
          <ExportFrameButtonComponent />
        </div>
      </div>
    );
  }
}

export function FilePanelComponent(): Element {
  return new FilePanel();
}
customElements.define("file-panel", FilePanel);
