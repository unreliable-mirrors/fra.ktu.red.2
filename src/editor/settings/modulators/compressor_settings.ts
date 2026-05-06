import { executeCommand } from "../../../ktu/helpers/commands_manager";
import { SetModulatorFieldCommand } from "../../commands/modulators/set_modulator_field_command";
import { ISetting } from "../isetting";

export const COMPRESSOR_SETTINGS: ISetting[] = [
  {
    field: "signal",
    type: "signal-only",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(
        new SetModulatorFieldCommand(
          id,
          "signal",
          parseFloat(value.toString()),
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "cutoff",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(
        new SetModulatorFieldCommand(
          id,
          "cutoff",
          parseFloat(value.toString()),
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "highCompress",
    type: "boolean",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(new SetModulatorFieldCommand(id, "highCompress", value));
    },
    signalizable: false,
  },
  {
    field: "highValue",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(
        new SetModulatorFieldCommand(
          id,
          "highValue",
          parseFloat(value.toString()),
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "lowCompress",
    type: "boolean",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(new SetModulatorFieldCommand(id, "lowCompress", value));
    },
    signalizable: false,
  },
  {
    field: "lowValue",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(
        new SetModulatorFieldCommand(
          id,
          "lowValue",
          parseFloat(value.toString()),
        ),
      );
    },
    signalizable: true,
  },
  {
    field: "dryWet",
    type: "float",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(
        new SetModulatorFieldCommand(
          id,
          "dryWet",
          parseFloat(value.toString()),
        ),
      );
    },
    signalizable: true,
  },
];
