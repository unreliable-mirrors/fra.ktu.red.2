import {
  DataStore,
  SceneState,
  RedViewerComponent,
  DisplayLayerState,
} from "fra.ktu.red-component";
import { EditorUIComponent } from "./ui/editor_ui";
import { executeCommand } from "../ktu/helpers/commands_manager";
import { NewStateCommand } from "./commands/new_state_command";
import { EventDispatcher } from "fra.ktu.red-component";
import { AddLayerCommand } from "./commands/layers/add_layer_command";
import { LoadFileCommand } from "./commands/load_file_command";

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

    document.addEventListener("paste", async (e: ClipboardEvent) => {
      if (e.clipboardData) {
        for (const file of e.clipboardData.files) {
          if (
            file.type.indexOf("image/") === 0 ||
            file.type.indexOf("video/") === 0
          ) {
            const fr: FileReader = new FileReader();
            fr.onload = (e) => {
              const payload: string = e.target!.result as string;
              console.log("PASTE", payload);
              executeCommand(new AddLayerCommand("video"));
              const layers = DataStore.getInstance().getStore(
                "editorScene.layers",
              ) as DisplayLayerState[];
              const state = layers[layers.length - 1];
              executeCommand(
                new LoadFileCommand("editorScene", state.id, payload),
              );
            };
            if (file.size < 104857600) {
              fr.readAsDataURL(file);
            } else {
              //TODO: Implement an alert system for this
              console.log("ERROR - No files larger than 100mb");
            }
          }
        }
      }
    });
  }
}
