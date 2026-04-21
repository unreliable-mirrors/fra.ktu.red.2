import { BACKGROUND_LAYER_SETTINGS } from "./layers/background_layer_settings";
import { VIDEO_LAYER_SETTINGS } from "./layers/video_layer_settings";
import { LFO_SETTINGS } from "./modulators/lfo_settings";
import { PIXELATE_SHADER_SETTINGS } from "./shaders/pixelate_shader_settings";

export interface ISetting {
  field: string;
  type: string;
  values?: string[];
  onchange: (
    id: number,
    value: string | boolean | number,
    owner: string,
  ) => void;
}

export const LAYER_SETTINGS: { [key: string]: ISetting[] } = {
  background: BACKGROUND_LAYER_SETTINGS,
  video: VIDEO_LAYER_SETTINGS,
};

export const SHADER_SETTINGS: { [key: string]: ISetting[] } = {
  pixelate: PIXELATE_SHADER_SETTINGS,
};

export const MODULATOR_SETTINGS: { [key: string]: ISetting[] } = {
  lfo: LFO_SETTINGS,
};
