import { executeCommand } from "../../../ktu/helpers/commands_manager";
import { SetShaderFieldCommand } from "../../commands/shaders/set_shader_field_command";
import { ISetting } from "../isetting";

export const CROSSES_SHADER_SETTINGS: ISetting[] = [
  {
    field: "gridSize",
    type: "integer",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(
          id,
          "gridSize",
          parseInt(value.toString()),
          owner,
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "crossSize",
    type: "integer",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(
          id,
          "crossSize",
          parseInt(value.toString()),
          owner,
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "lineThickness",
    type: "integer",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(
          id,
          "lineThickness",
          parseInt(value.toString()),
          owner,
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "variableCrossSize",
    type: "boolean",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(id, "variableCrossSize", value, owner),
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
  {
    field: "alphaDryWet",
    type: "float",
    onchange: (id: number, value: string | number | boolean, owner: string) => {
      executeCommand(
        new SetShaderFieldCommand(
          id,
          "alphaDryWet",
          parseFloat(value.toString()),
          owner,
        ),
      );
    },
    signalizable: true,
  },
];
