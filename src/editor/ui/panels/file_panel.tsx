import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import { NewStateButtonComponent } from "./components/new_state_button";
import { SaveStateButtonComponent } from "./components/save_state_button";
import { ExportFrameButtonComponent } from "./components/export/export_frame_button";
import { ExportSequenceButtonComponent } from "./components/export/export_sequence_button";
import { ExportMp4ButtonComponent } from "./components/export/export_mp4_button";
import { ExportGifButtonComponent } from "./components/export/export_gif_button";
import { OpenStateButtonComponent } from "./components/open_state_button";

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
          <OpenStateButtonComponent />
          <SaveStateButtonComponent />
          <span class="separator"></span>
          <ExportFrameButtonComponent />
          <ExportSequenceButtonComponent />
          <ExportMp4ButtonComponent />
          <ExportGifButtonComponent />
          <span class="separator"></span>

          <div class="shortcuts-hint">
            Shortcuts: <kbd>Shift + ?</kbd>
          </div>
        </div>
      </div>
    );
  }
}

export function FilePanelComponent(): Element {
  return new FilePanel();
}
customElements.define("file-panel", FilePanel);
