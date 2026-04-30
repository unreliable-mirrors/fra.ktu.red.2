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
import { keyboardShortcuts } from "../../../../ktu/helpers/keyboard_shortcuts";

class PlaybackControls extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);
    keyboardShortcuts.register({
      key: " ",
      action: () => this.handlePause(),
      description: "Toggle Play/Pause",
    });
    keyboardShortcuts.register({
      key: ",",
      action: () => this.handleBack(),
      description: "Step Back",
    });
    keyboardShortcuts.register({
      key: ".",
      action: () => this.handleForward(),
      description: "Step Forward",
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    keyboardShortcuts.unregister({
      key: " ",
    });
    keyboardShortcuts.unregister({
      key: ",",
    });
    keyboardShortcuts.unregister({
      key: ".",
    });
  }

  render(): Element {
    return (
      <div>
        <div class="controls">
          <button
            id="skip-previous"
            class={`skip-previous-button ${this.bindingData["playing"] ? "disabled" : ""}`}
            onclick={() => {
              this.handleBack();
            }}
          >
            {IconSkipPrevious()}
          </button>
          <button
            id="play-pause"
            class="play-pause-button"
            onclick={() => this.handlePause()}
          >
            {this.bindingData["playing"] ? IconPause() : IconPlay()}
          </button>
          <button
            id="stop"
            class="stop-button"
            onclick={() => {
              this.handleStop();
            }}
          >
            {IconStop()}
          </button>
          <button
            id="skip-next"
            class={`skip-next-button ${this.bindingData["playing"] ? "disabled" : ""}`}
            onclick={() => {
              this.handleForward();
            }}
          >
            {IconSkipNext()}
          </button>
          <TimeRendererComponent binding="elapsedTime" />
        </div>
      </div>
    );
  }

  handlePause() {
    DataStore.getInstance().setStore("playing", !this.bindingData["playing"]);
  }
  handleBack() {
    if (this.bindingData["playing"]) return;
    DataStore.getInstance().setStore(
      "elapsedTime",
      DataStore.getInstance().getStore("elapsedTime") - 1000 / 30,
    );
  }
  handleForward() {
    if (this.bindingData["playing"]) return;
    DataStore.getInstance().setStore(
      "elapsedTime",
      DataStore.getInstance().getStore("elapsedTime") + 1000 / 30,
    );
  }
  handleStop() {
    DataStore.getInstance().setStore("playing", false);
    DataStore.getInstance().setStore("elapsedTime", 0);
  }
}

export function PlaybackControlsComponent(props: {
  binding?: string;
}): Element {
  return new PlaybackControls(props);
}

customElements.define("playback-controls", PlaybackControls);
