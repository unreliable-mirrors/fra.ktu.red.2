import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";

class TimeRenderer extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);
  }

  render(): Element {
    return (
      <span class="time">
        {(this.bindingData["instances.editorScene.elapsedTime"] / 1000).toFixed(
          2,
        )}
        s
      </span>
    );
  }
}

export function TimeRendererComponent(props: { binding?: string }): Element {
  return new TimeRenderer(props);
}

customElements.define("time-renderer", TimeRenderer);
