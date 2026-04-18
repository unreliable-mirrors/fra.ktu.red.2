import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import { LayersPanelComponent } from "./panels/layers_panel";

class EditorUI extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);
  }

  render(): Element {
    return (
      <div class="editor-ui">
        <div class="panel-container top-right">
          <LayersPanelComponent binding="editorScene.layers" />
        </div>
      </div>
    );
  }
}

export function EditorUIComponent(props: { binding?: string }): Element {
  return new EditorUI(props);
}

customElements.define("editor-ui", EditorUI);
