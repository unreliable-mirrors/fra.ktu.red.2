import { executeCommand } from "../../../ktu/helpers/commands_manager";
import { SetShaderFieldCommand } from "../../commands/shaders/set_shader_field_command";
import { ISetting } from "../isetting";

export const PALETTE_RECOLOUR_SHADER_SETTINGS: ISetting[] = [
  {
    field: "color1",
    type: "color",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(new SetShaderFieldCommand(id, "color1", value, owner));
    },
    signalizable: false,
  },
  {
    field: "color2",
    type: "color",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(new SetShaderFieldCommand(id, "color2", value, owner));
    },
    signalizable: false,
  },
  {
    field: "color3",
    type: "color",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(new SetShaderFieldCommand(id, "color3", value, owner));
    },
    signalizable: false,
  },
  {
    field: "color4",
    type: "color",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(new SetShaderFieldCommand(id, "color4", value, owner));
    },
    signalizable: false,
  },
  {
    field: "color5",
    type: "color",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(new SetShaderFieldCommand(id, "color5", value, owner));
    },
    signalizable: false,
  },
  {
    field: "onlyHue",
    type: "boolean",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(new SetShaderFieldCommand(id, "onlyHue", value, owner));
    },
    signalizable: true,
  },
  {
    field: "onlySaturation",
    type: "boolean",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(id, "onlySaturation", value, owner),
      );
    },
    signalizable: true,
  },
  {
    field: "onlyLightness",
    type: "boolean",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(id, "onlyLightness", value, owner),
      );
    },
    signalizable: true,
  },
  {
    field: "redDryWet",
    type: "float",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(
          id,
          "redDryWet",
          parseFloat(value.toString()),
          owner,
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "greenDryWet",
    type: "float",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(
          id,
          "greenDryWet",
          parseFloat(value.toString()),
          owner,
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "blueDryWet",
    type: "float",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(
          id,
          "blueDryWet",
          parseFloat(value.toString()),
          owner,
        ),
      );
    },
    signalizable: true,
  },
];
