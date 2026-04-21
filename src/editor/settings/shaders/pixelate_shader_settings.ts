import { executeCommand } from "../../../ktu/helpers/commands_manager";
import { SetShaderFieldCommand } from "../../commands/shaders/set_shader_field_command";
import { ISetting } from "../isetting";

export const PIXELATE_SHADER_SETTINGS: ISetting[] = [
  {
    field: "pixelSize",
    type: "integer",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(new SetShaderFieldCommand(id, "pixelSize", value, owner));
    },
  },
];
