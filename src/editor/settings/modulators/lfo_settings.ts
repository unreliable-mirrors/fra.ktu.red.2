import { executeCommand } from "../../../ktu/helpers/commands_manager";
import { SetModulatorFieldCommand } from "../../commands/modulators/set_modulator_field_command";
import { ISetting } from "../isetting";

export const LFO_SETTINGS: ISetting[] = [
  {
    field: "hz",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(new SetModulatorFieldCommand(id, "frequency", value));
    },
  },
  {
    field: "phase",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(new SetModulatorFieldCommand(id, "phase", value));
    },
  },
  {
    field: "factor",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(new SetModulatorFieldCommand(id, "factor", value));
    },
  },
  {
    field: "offset",
    type: "bigfloat",
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(new SetModulatorFieldCommand(id, "offset", value));
    },
  },
  {
    field: "waveform",
    type: "select",
    values: ["sine", "square", "triangle", "sawtooth"],
    onchange: (id: number, value: string | number | boolean) => {
      executeCommand(new SetModulatorFieldCommand(id, "waveform", value));
    },
  },
];
