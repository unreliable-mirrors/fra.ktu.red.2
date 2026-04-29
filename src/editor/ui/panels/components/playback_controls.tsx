import jsx from "texsaur";
import { DataStore, KTUComponent } from "fra.ktu.red-component";
import {
  IconPause,
  IconPlay,
  IconSkipNext,
  IconSkipPrevious,
  IconStop,
} from "../../../../ktu/helpers/icons";
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
            id="skip-previous"
            class={`skip-previous-button ${this.bindingData["playing"] ? "disabled" : ""}`}
            onclick={() => {
              DataStore.getInstance().setStore(
                "elapsedTime",
                DataStore.getInstance().getStore("elapsedTime") - 1000 / 30,
              );
            }}
          >
            {IconSkipPrevious()}
          </button>
          <button
            id="play-pause"
            class="play-pause-button"
            onclick={() => this.handleClick()}
          >
            {this.bindingData["playing"] ? IconPause() : IconPlay()}
          </button>
          <button
            id="stop"
            class="stop-button"
            onclick={() => {
              DataStore.getInstance().setStore("playing", false);
              DataStore.getInstance().setStore("elapsedTime", 0);
            }}
          >
            {IconStop()}
          </button>
          <button
            id="skip-next"
            class={`skip-next-button ${this.bindingData["playing"] ? "disabled" : ""}`}
            onclick={() => {
              DataStore.getInstance().setStore(
                "elapsedTime",
                DataStore.getInstance().getStore("elapsedTime") + 1000 / 30,
              );
            }}
          >
            {IconSkipNext()}
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
