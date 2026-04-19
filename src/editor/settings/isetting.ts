import { BACKGROUND_LAYER_SETTINGS } from "./background_layer_settings";

export interface ISetting {
  field: string;
  type: string;
  values?: string[];
  onchange: (id: number, value: string) => void;
}

export const LAYER_SETTINGS: { [key: string]: ISetting[] } = {
  background: BACKGROUND_LAYER_SETTINGS,
};
