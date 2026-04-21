import { executeCommand } from "../../../ktu/helpers/commands_manager";
import { SetModulatorFieldCommand } from "../../commands/modulators/set_modulator_field_command";
import { ISetting } from "../isetting";

export const LFO_SETTINGS: ISetting[] = [
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
    field: "phase",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(
        new SetModulatorFieldCommand(id, "phase", parseFloat(value.toString())),
      );
    },
    signalizable: true,
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
  {
    field: "waveform",
    type: "select",
    values: ["sine", "square", "triangle", "sawtooth"],
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(new SetModulatorFieldCommand(id, "waveform", value));
    },
    signalizable: false,
  },
];
