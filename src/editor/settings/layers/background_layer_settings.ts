import { executeCommand } from "../../../ktu/helpers/commands_manager";
import { SetLayerFieldCommand } from "../../commands/layers/set_layer_field_command";
import { ISetting } from "../isetting";

export const BACKGROUND_LAYER_SETTINGS: ISetting[] = [
  {
    field: "color",
    type: "color",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(new SetLayerFieldCommand(id, "color", value));
    },
  },
];
