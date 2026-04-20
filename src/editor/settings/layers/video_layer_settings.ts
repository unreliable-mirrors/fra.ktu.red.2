import { executeCommand } from "../../../ktu/helpers/commands_manager";
import { SetLayerFieldCommand } from "../../commands/layers/set_layer_field_command";
import { LoadFileCommand } from "../../commands/load_file_command";
import { ISetting } from "../isetting";

export const VIDEO_LAYER_SETTINGS: ISetting[] = [
  {
    field: "file",
    type: "file",
    onchange: (id: number, value: string | number | boolean) => {
      console.log("Loading file:", value);
      executeCommand(new LoadFileCommand("editorScene", id, value.toString()));
    },
  },
  {
    field: "panX",
    type: "float10",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(new SetLayerFieldCommand(id, "panX", value));
    },
  },
  {
    field: "panY",
    type: "float10",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(new SetLayerFieldCommand(id, "panY", value));
    },
  },
  {
    field: "scale",
    type: "float10",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(new SetLayerFieldCommand(id, "scale", value));
    },
  },
  {
    field: "vFlip",
    type: "boolean",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(new SetLayerFieldCommand(id, "vFlip", value));
    },
  },
  {
    field: "hFlip",
    type: "boolean",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(new SetLayerFieldCommand(id, "hFlip", value));
    },
  },
  {
    field: "timeFrom",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(new SetLayerFieldCommand(id, "timeFrom", value));
    },
  },
  {
    field: "timeLength",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(new SetLayerFieldCommand(id, "timeLength", value));
    },
  },
  {
    field: "speed",
    type: "float",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(new SetLayerFieldCommand(id, "speed", value));
    },
  },
];
