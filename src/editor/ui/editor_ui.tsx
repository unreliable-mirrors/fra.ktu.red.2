import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import { LayersPanelComponent } from "./panels/layers_panel";
import { ShadersPanelComponent } from "./panels/shaders_panel";
import { FilePanelComponent } from "./panels/file_panel";
import { FileInfoPanelComponent } from "./panels/file_info_panel";

class EditorUI extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);
  }

  render(): Element {
    return (
      <div class="editor-ui">
        <div class="panel-container left-ui">
          <FilePanelComponent />
          <FileInfoPanelComponent binding="editorScene" />
        </div>
        <div class="panel-container right-ui">
          <LayersPanelComponent binding="editorScene.layers" />
          <ShadersPanelComponent binding="editorScene.shaders" />
        </div>
      </div>
    );
  }
}

export function EditorUIComponent(props: { binding?: string }): Element {
  return new EditorUI(props);
}

customElements.define("editor-ui", EditorUI);
