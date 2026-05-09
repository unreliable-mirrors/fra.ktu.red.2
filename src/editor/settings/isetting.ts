import { BACKGROUND_LAYER_SETTINGS } from "./layers/background_layer_settings";
import { VIDEO_LAYER_SETTINGS } from "./layers/video_layer_settings";
import { COMPRESSOR_SETTINGS } from "./modulators/compressor_settings";
import { LFO_SETTINGS } from "./modulators/lfo_settings";
import { RANDOM_SETTINGS } from "./modulators/random_settings";
import { RING_SETTINGS } from "./modulators/ring_settings";
import { ANAGLYPH_SHADER_SETTINGS } from "./shaders/anaglyph_shader_settings";
import { BLUR_SHADER_SETTINGS } from "./shaders/blur_shader_settings";
import { BNW_SHADER_SETTINGS } from "./shaders/bnw_shader_settings";
import { CHROMA_SHADER_SETTINGS } from "./shaders/chroma_shader_settings";
import { CROSSES_SHADER_SETTINGS } from "./shaders/crosses_shader_settings";
import { HLINES_SHADER_SETTINGS } from "./shaders/hlines_shader_settings";
import { HNOISE_SHADER_SETTINGS } from "./shaders/hnoise_shader_settings";
import { LIGHT_SPLIT_SHADER_SETTINGS } from "./shaders/light_split_shader_settings";
import { MONTECARLO_SHADER_SETTINGS } from "./shaders/montecarlo_shader_settings";
import { NEGATIVE_SHADER_SETTINGS } from "./shaders/negative_shader_settings";
import { PIXELATE_SHADER_SETTINGS } from "./shaders/pixelate_shader_settings";
import { POSTERIZE_SHADER_SETTINGS } from "./shaders/posterize_shader_settings";
import { RECOLOUR_SHADER_SETTINGS } from "./shaders/recolour_shader_settings";
import { SCRAMBLE_SHADER_SETTINGS } from "./shaders/scramble_shader_settings";
import { VLINES_SHADER_SETTINGS } from "./shaders/vlines_shader_settings";

export interface ISetting {
  field: string;
  type: string;
  values?: string[];
  onchange: (
    id: number,
    value: string | boolean | number,
    owner: string,
  ) => void;
  signalizable: boolean;
}

export const LAYER_SETTINGS: { [key: string]: ISetting[] } = {
  background: BACKGROUND_LAYER_SETTINGS,
  video: VIDEO_LAYER_SETTINGS,
};

export const SHADER_SETTINGS: { [key: string]: ISetting[] } = {
  pixelate: PIXELATE_SHADER_SETTINGS,
  blur: BLUR_SHADER_SETTINGS,
  bnw: BNW_SHADER_SETTINGS,
  montecarlo: MONTECARLO_SHADER_SETTINGS,
  anaglyph: ANAGLYPH_SHADER_SETTINGS,
  vlines: VLINES_SHADER_SETTINGS,
  hlines: HLINES_SHADER_SETTINGS,
  chroma: CHROMA_SHADER_SETTINGS,
  scramble: SCRAMBLE_SHADER_SETTINGS,
  negative: NEGATIVE_SHADER_SETTINGS,
  crosses: CROSSES_SHADER_SETTINGS,
  recolour: RECOLOUR_SHADER_SETTINGS,
  hnoise: HNOISE_SHADER_SETTINGS,
  light_split: LIGHT_SPLIT_SHADER_SETTINGS,
  posterize: POSTERIZE_SHADER_SETTINGS,
};

export const MODULATOR_SETTINGS: { [key: string]: ISetting[] } = {
  lfo: LFO_SETTINGS,
  random: RANDOM_SETTINGS,
  ring: RING_SETTINGS,
  compressor: COMPRESSOR_SETTINGS,
};
