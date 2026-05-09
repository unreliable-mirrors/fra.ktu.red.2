import { executeCommand } from "../../../ktu/helpers/commands_manager";
import { SetShaderFieldCommand } from "../../commands/shaders/set_shader_field_command";
import { ISetting } from "../isetting";

export const HSB_BLUR_SHADER_SETTINGS: ISetting[] = [
  {
    field: "hueRadius",
    type: "integer",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(
          id,
          "hueRadius",
          parseInt(value.toString()),
          owner,
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "saturationRadius",
    type: "integer",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(
          id,
          "saturationRadius",
          parseInt(value.toString()),
          owner,
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "lightnessRadius",
    type: "integer",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(
          id,
          "lightnessRadius",
          parseInt(value.toString()),
          owner,
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "ignoreAlpha",
    type: "boolean",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(id, "ignoreAlpha", value, owner),
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
