import { executeCommand } from "../../../ktu/helpers/commands_manager";
import { SetModulatorFieldCommand } from "../../commands/modulators/set_modulator_field_command";
import { ISetting } from "../isetting";

export const RANDOM_SETTINGS: ISetting[] = [
  {
    field: "hz",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(
        new SetModulatorFieldCommand(id, "hz", parseFloat(value.toString())),
      );
    },
    signalizable: true,
  },
  {
    field: "salt",
    type: "integer",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(
        new SetModulatorFieldCommand(id, "salt", parseInt(value.toString())),
      );
    },
    signalizable: false,
  },
  {
    field: "factor",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(
        new SetModulatorFieldCommand(
          id,
          "factor",
          parseFloat(value.toString()),
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "offset",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(
        new SetModulatorFieldCommand(
          id,
          "offset",
          parseFloat(value.toString()),
        ),
      );
    },
    signalizable: true,
  },
];
