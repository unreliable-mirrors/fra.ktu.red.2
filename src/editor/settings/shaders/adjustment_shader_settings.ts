import { executeCommand } from "../../../ktu/helpers/commands_manager";
import { SetShaderFieldCommand } from "../../commands/shaders/set_shader_field_command";
import { ISetting } from "../isetting";

export const ADJUSTMENT_SHADER_SETTINGS: ISetting[] = [
  {
    field: "gamma",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(
          id,
          "gamma",
          parseFloat(value.toString()),
          owner,
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "contrast",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(
          id,
          "contrast",
          parseFloat(value.toString()),
          owner,
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "saturation",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(
          id,
          "saturation",
          parseFloat(value.toString()),
          owner,
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "brightness",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(
          id,
          "brightness",
          parseFloat(value.toString()),
          owner,
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "red",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(
          id,
          "red",
          parseFloat(value.toString()),
          owner,
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "green",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(
          id,
          "green",
          parseFloat(value.toString()),
          owner,
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "blue",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(
          id,
          "blue",
          parseFloat(value.toString()),
          owner,
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "alpha",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(
          id,
          "alpha",
          parseFloat(value.toString()),
          owner,
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "redDryWet",
    type: "bigfloat",
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
    type: "bigfloat",
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
    type: "bigfloat",
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
