import {
  DataStore,
  SceneState,
  RedViewerComponent,
} from "fra.ktu.red-component";
import { EditorUIComponent } from "./ui/editor_ui";
import { executeCommand } from "../ktu/helpers/commands_manager";
import { NewStateCommand } from "./commands/new_state_command";

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
  }
}
