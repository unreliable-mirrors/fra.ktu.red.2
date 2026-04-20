import { executeCommand } from "../../../ktu/helpers/commands_manager";
import { SetShaderFieldCommand } from "../../commands/shaders/set_shader_field_command";

export const PIXELATE_SHADER_SETTINGS = [
  {
    field: "pixelSize",
    type: "integer",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(new SetShaderFieldCommand(id, "pixelSize", value));
    },
  },
];
