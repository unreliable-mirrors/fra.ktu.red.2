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
    DataStore.getInstance().setStore(
      "editorScene",
      this.buildDefaultSceneState(),
    );

    this.canvasContainer.style.width =
      this.buildDefaultSceneState().width + "px";
    this.canvasContainer.style.height =
      this.buildDefaultSceneState().height + "px";

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
