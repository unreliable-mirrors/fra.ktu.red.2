import jsx from "texsaur";
import { ISetting } from "../settings/isetting";
import { LayerState } from "fra.ktu.red-component";

export const resolveInputType = (
  state: LayerState,
  setting: ISetting,
): Element => {
  switch (setting.type) {
    case "color":
      return (
        <input
          type="color"
          value={(state as any)[setting.field]}
          onChange={(e: Event) =>
            setting.onchange?.(state.id, (e.target as HTMLInputElement).value)
          }
        />
      );
    case "file":
      return (
        <>
          <form
            className="hidden"
            id="imageFile"
            name="imageFile"
            enctype="multipart/form-data"
            method="post"
          >
            <fieldset>
              <input
                type="file"
                id="imageLoadInput"
                accept="image/*,video/*"
                onchange={() => {
                  loadFile(state, setting);
                }}
              />
            </fieldset>
          </form>
          <span>
            <label for="imageLoadInput" className="button">
              Load
            </label>
          </span>
        </>
      );
    case "float":
      return (
        <input
          type="number"
          step="0.01"
          min="0"
          max="1"
          value={(state as any)[setting.field]}
          oninput={(e: Event) => {
            setting.onchange?.(state.id, (e.target as HTMLInputElement).value);
          }}
        />
      );
    case "float10":
      return (
        <input
          type="number"
          step="0.01"
          min="-10"
          max="10"
          value={(state as any)[setting.field]}
          oninput={(e: Event) => {
            setting.onchange?.(state.id, (e.target as HTMLInputElement).value);
          }}
        />
      );
    case "boolean":
      return (
        <input
          type="checkbox"
          checked={(state as any)[setting.field]}
          oninput={(e: Event) => {
            setting.onchange?.(
              state.id,
              (e.target as HTMLInputElement).checked,
            );
          }}
        />
      );
    case "bigfloat":
      return (
        <input
          type="number"
          step="0.01"
          min="0"
          value={(state as any)[setting.field]}
          oninput={(e: Event) => {
            setting.onchange?.(state.id, (e.target as HTMLInputElement).value);
          }}
        />
      );
    case "integer":
      return (
        <input
          type="number"
          step="1"
          min="0"
          value={(state as any)[setting.field]}
          oninput={(e: Event) => {
            setting.onchange?.(state.id, (e.target as HTMLInputElement).value);
          }}
        />
      );
    default:
      return (
        <input
          type="text"
          value={(state as any)[setting.field]}
          oninput={(e: Event) =>
            setting.onchange?.(state.id, (e.target as HTMLInputElement).value)
          }
        />
      );
  }
};

const loadFile = (state: LayerState, setting: ISetting) => {
  let input: HTMLInputElement;
  let file, fr;

  console.log("ON LOAD FILE");

  input = document.getElementById("imageLoadInput") as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    //TODO: DEDUPLICATE THIS
    file = input.files[0];
    fr = new FileReader();
    fr.onload = (e) => {
      receivedText(e, state, setting);
    };
    if (file.size < 104857600) {
      fr.readAsDataURL(file);
    } else {
      //TODO: Implement an alert system for this
      console.log("ERROR - No files larger than 100mb");
    }
    input.value = "";
  }
};

const receivedText = (
  e: ProgressEvent<FileReader>,
  state: LayerState,
  setting: ISetting,
) => {
  const payload: string = e.target!.result as string;
  console.log("RECEIVE", typeof e.target!.result, payload.length);
  setting.onchange?.(state.id, payload);
};
