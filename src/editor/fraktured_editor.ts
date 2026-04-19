import {
  DataStore,
  SceneState,
  RedViewerComponent,
  BackgroundLayer,
} from "fra.ktu.red-component";
import { EditorUIComponent } from "./ui/editor_ui";

export class FrakturedEditor {
  canvasContainer: HTMLElement;
  uiContainer: HTMLElement;
  public constructor(canvasContainer: HTMLElement, uiContainer: HTMLElement) {
    this.canvasContainer = canvasContainer;
    this.uiContainer = uiContainer;
    const state = this.buildDefaultSceneState();
    DataStore.getInstance().setStore("editorScene", state);

    this.canvasContainer.style.width = state.width + "px";
    this.canvasContainer.style.height = state.height + "px";

    this.canvasContainer.appendChild(
      RedViewerComponent({
        sceneState: "editorScene",
        resizeTo: canvasContainer,
      }),
    );
    this.uiContainer.appendChild(EditorUIComponent({}));
  }

  buildDefaultSceneState(): SceneState {
    return {
      width: 603,
      height: 1072,
      layers: [BackgroundLayer.getDefaultState()],
    };
  }
}
