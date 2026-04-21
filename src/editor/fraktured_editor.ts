import {
  DataStore,
  SceneState,
  RedViewerComponent,
} from "fra.ktu.red-component";
import { EditorUIComponent } from "./ui/editor_ui";
import { executeCommand } from "../ktu/helpers/commands_manager";
import { NewStateCommand } from "./commands/new_state_command";
import { EventDispatcher } from "fra.ktu.red-component";

export class FrakturedEditor {
  canvasContainer: HTMLElement;
  uiContainer: HTMLElement;
  public constructor(canvasContainer: HTMLElement, uiContainer: HTMLElement) {
    this.canvasContainer = canvasContainer;
    this.uiContainer = uiContainer;
    executeCommand(new NewStateCommand());

    const state = DataStore.getInstance().getStore("editorScene") as SceneState;
    this.canvasContainer.style.width = state.width + "px";
    this.canvasContainer.style.height = state.height + "px";

    this.canvasContainer.appendChild(
      RedViewerComponent({
        sceneState: "editorScene",
        resizeTo: canvasContainer,
      }),
    );
    this.uiContainer.appendChild(EditorUIComponent({}));

    EventDispatcher.getInstance().addEventListener(
      "editorScene.width",
      "update",
      () => {
        const state = DataStore.getInstance().getStore(
          "editorScene",
        ) as SceneState;
        this.canvasContainer.style.width = state.width + "px";
        const application = DataStore.getInstance().getStore("application");
        application.resize();
        DataStore.getInstance().touchIds("editorScene");
      },
    );

    EventDispatcher.getInstance().addEventListener(
      "editorScene.height",
      "update",
      () => {
        const state = DataStore.getInstance().getStore(
          "editorScene",
        ) as SceneState;
        this.canvasContainer.style.height = state.height + "px";
        const application = DataStore.getInstance().getStore("application");
        application.resize();
        DataStore.getInstance().touchIds("editorScene");
      },
    );
  }
}
