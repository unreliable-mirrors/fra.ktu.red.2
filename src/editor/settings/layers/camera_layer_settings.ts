import { executeCommand } from "../../../ktu/helpers/commands_manager";
import { SetLayerFieldCommand } from "../../commands/layers/set_layer_field_command";
import { ISetting } from "../isetting";

export const CAMERA_LAYER_SETTINGS: ISetting[] = [
  {
    field: "panX",
    type: "float10",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(
        new SetLayerFieldCommand(id, "panX", parseFloat(value as string)),
      );
    },
    signalizable: true,
  },
  {
    field: "panY",
    type: "float10",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(
        new SetLayerFieldCommand(id, "panY", parseFloat(value as string)),
      );
    },
    signalizable: true,
  },
  {
    field: "scale",
    type: "float10",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(
        new SetLayerFieldCommand(id, "scale", parseFloat(value as string)),
      );
    },
    signalizable: true,
  },
  {
    field: "vFlip",
    type: "boolean",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(new SetLayerFieldCommand(id, "vFlip", value));
    },
    signalizable: true,
  },
  {
    field: "hFlip",
    type: "boolean",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(new SetLayerFieldCommand(id, "hFlip", value));
    },
    signalizable: true,
  },
];
