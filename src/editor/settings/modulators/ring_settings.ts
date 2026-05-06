import { executeCommand } from "../../../ktu/helpers/commands_manager";
import { SetModulatorFieldCommand } from "../../commands/modulators/set_modulator_field_command";
import { ISetting } from "../isetting";

export const RING_SETTINGS: ISetting[] = [
  {
    field: "operation",
    type: "options",
    values: ["add", "subtract", "multiply", "divide"],
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(new SetModulatorFieldCommand(id, "operation", value));
    },
    signalizable: false,
  },
  {
    field: "valueA",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(
        new SetModulatorFieldCommand(
          id,
          "valueA",
          parseFloat(value.toString()),
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "valueB",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(
        new SetModulatorFieldCommand(
          id,
          "valueB",
          parseFloat(value.toString()),
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "aFactor",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(
        new SetModulatorFieldCommand(
          id,
          "aFactor",
          parseFloat(value.toString()),
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "bFactor",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(
        new SetModulatorFieldCommand(
          id,
          "bFactor",
          parseFloat(value.toString()),
        ),
      );
    },
    signalizable: true,
  },
];
