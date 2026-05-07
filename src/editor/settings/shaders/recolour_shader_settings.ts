import { executeCommand } from "../../../ktu/helpers/commands_manager";
import { SetShaderFieldCommand } from "../../commands/shaders/set_shader_field_command";
import { ISetting } from "../isetting";

export const RECOLOUR_SHADER_SETTINGS: ISetting[] = [
  {
    field: "fromColor",
    type: "color",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(new SetShaderFieldCommand(id, "fromColor", value, owner));
    },
    signalizable: false,
  },
  {
    field: "toColor",
    type: "color",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(new SetShaderFieldCommand(id, "toColor", value, owner));
    },
    signalizable: false,
  },
  {
    field: "threshold",
    type: "float",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(
          id,
          "threshold",
          parseFloat(value.toString()),
          owner,
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "not",
    type: "boolean",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(new SetShaderFieldCommand(id, "not", value, owner));
    },
    signalizable: true,
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
