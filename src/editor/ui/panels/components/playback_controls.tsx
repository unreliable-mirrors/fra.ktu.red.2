import jsx from "texsaur";
import { DataStore, KTUComponent } from "fra.ktu.red-component";
import { IconPause, IconPlay } from "../../../../ktu/helpers/icons";
import { TimeRendererComponent } from "./time_renderer";

class PlaybackControls extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);
  }

  render(): Element {
    return (
      <div>
        <div class="controls">
          <button
            id="play-pause"
            class="play-pause-button"
            onclick={() => this.handleClick()}
          >
            {this.bindingData["playing"] ? IconPause() : IconPlay()}
          </button>
          <TimeRendererComponent binding="elapsedTime" />
        </div>
      </div>
    );
  }

  handleClick() {
    DataStore.getInstance().setStore("playing", !this.bindingData["playing"]);
  }
}

export function PlaybackControlsComponent(props: {
  binding?: string;
}): Element {
  return new PlaybackControls(props);
}

customElements.define("playback-controls", PlaybackControls);
