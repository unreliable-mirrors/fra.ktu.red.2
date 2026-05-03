import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import { NewStateButtonComponent } from "./components/new_state_button";
import { SaveStateButtonComponent } from "./components/save_state_button";
import { ExportFrameButtonComponent } from "./components/export/export_frame_button";
import { ExportSequenceButtonComponent } from "./components/export/export_sequence_button";
import { ExportMp4ButtonComponent } from "./components/export/export_mp4_button";
import { ExportGifButtonComponent } from "./components/export/export_gif_button";
import { OpenStateButtonComponent } from "./components/open_state_button";
import { keyboardShortcuts } from "../../../ktu/helpers/keyboard_shortcuts";

class FilePanel extends KTUComponent {
  constructor() {
    super();
    keyboardShortcuts.register({
      key: "f",
      action: () => this.onClick(),
      description: "Show/Hide File Panel",
    });
  }

  render(): Element {
    return (
      <div class="panel left" id="file-panel">
        <h3 onclick={() => this.onClick()}>Open/Save (F)</h3>
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

  onClick() {
    document.getElementById("file-panel")?.classList.toggle("collapsed");
  }
}

export function FilePanelComponent(): Element {
  return new FilePanel();
}
customElements.define("file-panel", FilePanel);
