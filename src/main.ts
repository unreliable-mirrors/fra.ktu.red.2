import { RedViewerComponent } from "fra.ktu.red-component";
import { FrakturedEditor } from "./editor/fraktured_editor";

window.addEventListener("DOMContentLoaded", () => {
  new FrakturedEditor(
    document.getElementById("canvasContainer")!,
    document.getElementById("uiContainer")!,
  );
});

export default { RedViewerComponent };
