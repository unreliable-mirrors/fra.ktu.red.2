import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";

const FRAME_RATE = 30;

class ExportProgressBar extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);
  }

  render(): Element {
    const format = this.bindingData["instances.editorScene.exportFormat"] as
      | "zip"
      | "mp4"
      | "gif"
      | undefined;
    const currentExportFrame =
      (this.bindingData[
        "instances.editorScene.currentExportFrame"
      ] as number) ?? 0;
    const elapsedTime =
      ((this.bindingData["instances.editorScene.elapsedTime"] as number) ?? 0) /
      1000;
    const duration = (this.bindingData["editorScene.duration"] as number) ?? 0;

    const totalFrames = Math.max(1, Math.round(duration * FRAME_RATE));

    const progressPercentRaw =
      format === "mp4"
        ? duration > 0
          ? (elapsedTime / duration) * 100
          : 0
        : (currentExportFrame / totalFrames) * 100;
    const progressPercent = Math.max(0, Math.min(100, progressPercentRaw));

    const progressText = `${progressPercent.toFixed(0)}%`;

    const subtitle =
      format === "mp4"
        ? `Recording video (${progressText})`
        : `Capturing frame ${Math.min(currentExportFrame, totalFrames)}/${totalFrames}`;

    return (
      <div>
        <div class="export-overlay-subtitle">{subtitle}</div>
        <div class="export-progress-track" aria-hidden="true">
          <div
            class="export-progress-fill"
            style={`width: ${progressPercent}%;`}
          ></div>
        </div>
        <div class="export-overlay-percent">{progressText}</div>
      </div>
    );
  }

  defaultBinding(): Record<string, any> {
    return {
      "instances.editorScene.currentExportFrame": 0,
      "instances.editorScene.exportFormat": "zip",
      "editorScene.duration": 0,
      elapsedTime: 0,
    };
  }
}

export function ExportProgressBarComponent(props: {
  binding?: string;
}): Element {
  return new ExportProgressBar(props);
}

customElements.define("export-progress-bar", ExportProgressBar);
