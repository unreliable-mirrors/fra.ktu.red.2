import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";
import { ExportProgressBarComponent } from "./export_progress_bar";

class ExportOverlay extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);
  }

  render(): Element {
    const isExporting =
      this.bindingData["instances.editorScene.exporting"] === true;

    if (!isExporting) {
      return <div class="export-overlay hidden"></div>;
    }

    return (
      <div class="export-overlay" role="dialog" aria-modal="true">
        <div class="export-overlay-content">
          <div class="export-overlay-title">Exporting scene...</div>

          <ExportProgressBarComponent binding="instances.editorScene.currentExportFrame,instances.editorScene.exportFormat,editorScene.duration,instances.editorScene.elapsedTime" />
        </div>
      </div>
    );
  }

  defaultBinding(): Record<string, any> {
    return {
      "instances.editorScene.exporting": false,
    };
  }
}

export function ExportOverlayComponent(props: { binding?: string }): Element {
  return new ExportOverlay(props);
}

customElements.define("export-overlay", ExportOverlay);
