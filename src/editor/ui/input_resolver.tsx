import jsx from "texsaur";
import { ISetting } from "../settings/isetting";
import { LayerState } from "fra.ktu.red-component";
import { BindModulatorButtonComponent } from "./panels/components/modulators/bind_modulator_button";
import { SignalHintComponent } from "./panels/components/modulators/signal_hint";

export const resolveInputType = (
  state: LayerState,
  setting: ISetting,
  owner: string,
): Element => {
  switch (setting.type) {
    case "color":
      return (
        <input
          type="color"
          value={(state as any)[setting.field]}
          onchange={(e: Event) => {
            console.log(
              "Changing background color to:",
              (e.target as HTMLInputElement).value,
            );
            setting.onchange?.(
              state.id,
              (e.target as HTMLInputElement).value,
              owner,
            );
          }}
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
                  loadFile(state, setting, owner);
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
        <>
          {!state.signaledFields[setting.field] ? (
            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={(state as any)[setting.field]}
              oninput={(e: Event) => {
                setting.onchange?.(
                  state.id,
                  (e.target as HTMLInputElement).value,
                  owner,
                );
              }}
            />
          ) : (
            <SignalHintComponent
              signalName={state.signaledFields[setting.field]!}
            />
          )}
          <BindModulatorButtonComponent
            state={state}
            setting={setting}
            owner={owner}
          />
        </>
      );
    case "float10":
      return (
        <>
          {!state.signaledFields[setting.field] ? (
            <input
              type="number"
              step="0.01"
              min="-10"
              max="10"
              value={(state as any)[setting.field]}
              oninput={(e: Event) => {
                setting.onchange?.(
                  state.id,
                  (e.target as HTMLInputElement).value,
                  owner,
                );
              }}
            />
          ) : (
            <SignalHintComponent
              signalName={state.signaledFields[setting.field]!}
            />
          )}
          <BindModulatorButtonComponent
            state={state}
            setting={setting}
            owner={owner}
          />
        </>
      );
    case "boolean":
      return (
        <>
          {!state.signaledFields[setting.field] ? (
            <input
              type="checkbox"
              checked={(state as any)[setting.field]}
              oninput={(e: Event) => {
                setting.onchange?.(
                  state.id,
                  (e.target as HTMLInputElement).checked,
                  owner,
                );
              }}
            />
          ) : (
            <SignalHintComponent
              signalName={state.signaledFields[setting.field]!}
            />
          )}
          <BindModulatorButtonComponent
            state={state}
            setting={setting}
            owner={owner}
          />
        </>
      );
    case "bigfloat":
      return (
        <>
          {!state.signaledFields[setting.field] ? (
            <input
              type="number"
              step="0.01"
              min="0"
              value={(state as any)[setting.field]}
              oninput={(e: Event) => {
                setting.onchange?.(
                  state.id,
                  (e.target as HTMLInputElement).value,
                  owner,
                );
              }}
            />
          ) : (
            <SignalHintComponent
              signalName={state.signaledFields[setting.field]!}
            />
          )}
          <BindModulatorButtonComponent
            state={state}
            setting={setting}
            owner={owner}
          />
        </>
      );
    case "integer":
      return (
        <>
          {!state.signaledFields[setting.field] ? (
            <input
              type="number"
              step="1"
              min="0"
              value={(state as any)[setting.field]}
              oninput={(e: Event) => {
                setting.onchange?.(
                  state.id,
                  (e.target as HTMLInputElement).value,
                  owner,
                );
              }}
            />
          ) : (
            <SignalHintComponent
              signalName={state.signaledFields[setting.field]!}
            />
          )}
          <BindModulatorButtonComponent
            state={state}
            setting={setting}
            owner={owner}
          />
        </>
      );
    case "options":
      console.log(
        "VALUES",
        setting.values,
        setting.field,
        state,
        (state as any)[setting.field],
      );
      return (
        <>
          {setting.values!.map((e) => (
            <button
              onclick={() => setting.onchange?.(state.id, e, owner)}
              className={(state as any)[setting.field] === e ? "selected" : ""}
            >
              {e}
            </button>
          ))}
        </>
      );

    default:
      return (
        <input
          type="text"
          value={(state as any)[setting.field]}
          oninput={(e: Event) =>
            setting.onchange?.(
              state.id,
              (e.target as HTMLInputElement).value,
              owner,
            )
          }
        />
      );
  }
};

const loadFile = (state: LayerState, setting: ISetting, owner: string) => {
  let input: HTMLInputElement;
  let file, fr;

  console.log("ON LOAD FILE");

  input = document.getElementById("imageLoadInput") as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    //TODO: DEDUPLICATE THIS
    file = input.files[0];
    fr = new FileReader();
    fr.onload = (e) => {
      receivedText(e, state, setting, owner);
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
  owner: string,
) => {
  const payload: string = e.target!.result as string;
  console.log("RECEIVE", typeof e.target!.result, payload.length);
  setting.onchange?.(state.id, payload, owner);
};
