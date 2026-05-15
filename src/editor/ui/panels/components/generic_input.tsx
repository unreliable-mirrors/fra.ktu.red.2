import jsx from "texsaur";
import { ISetting } from "../../../settings/isetting";
import { KTUComponent, LayerState } from "fra.ktu.red-component";
import { BindModulatorButtonComponent } from "./modulators/bind_modulator_button";
import { SignalHintComponent } from "./modulators/signal_hint";
import { LayerHintComponent } from "./layers/layer_hint";
import { BindLayerButtonComponent } from "./layers/bind_layer_button";

class GenericInput extends KTUComponent {
  setting: ISetting;
  owner: string;

  constructor(props: { binding?: string; setting: ISetting; owner: string }) {
    super(props);
    this.setting = props.setting;
    this.owner = props.owner;
  }

  render(): Element {
    const state: LayerState = this.bindingData[this.bindingKeys[0]];
    switch (this.setting.type) {
      case "color":
        return (
          <input
            type="color"
            value={(state as any)[this.setting.field]}
            onchange={(e: Event) => {
              console.log(
                "Changing background color to:",
                (e.target as HTMLInputElement).value,
              );
              this.setting.onchange?.(
                state.id,
                (e.target as HTMLInputElement).value,
                this.owner,
              );
            }}
          />
        );
      case "file":
        return (
          <span>
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
                    this.loadFile(state, this.setting, this.owner);
                  }}
                />
              </fieldset>
            </form>
            <span>
              <label for="imageLoadInput" className="button">
                Load
              </label>
            </span>
          </span>
        );
      case "float":
        return (
          <span>
            {!state.signaledFields[this.setting.field] ? (
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={(state as any)[this.setting.field]}
                oninput={(e: Event) => {
                  this.setting.onchange?.(
                    state.id,
                    (e.target as HTMLInputElement).value,
                    this.owner,
                  );
                }}
              />
            ) : (
              <SignalHintComponent
                signalName={state.signaledFields[this.setting.field]!}
              />
            )}
            <BindModulatorButtonComponent
              state={state}
              setting={this.setting}
              owner={this.owner}
            />
          </span>
        );
      case "float10":
        return (
          <span>
            {!state.signaledFields[this.setting.field] ? (
              <input
                type="number"
                step="0.01"
                min="-10"
                max="10"
                value={(state as any)[this.setting.field]}
                oninput={(e: Event) => {
                  this.setting.onchange?.(
                    state.id,
                    (e.target as HTMLInputElement).value,
                    this.owner,
                  );
                }}
              />
            ) : (
              <SignalHintComponent
                signalName={state.signaledFields[this.setting.field]!}
              />
            )}
            <BindModulatorButtonComponent
              state={state}
              setting={this.setting}
              owner={this.owner}
            />
          </span>
        );
      case "boolean":
        return (
          <span>
            {!state.signaledFields[this.setting.field] ? (
              <input
                type="checkbox"
                checked={(state as any)[this.setting.field]}
                oninput={(e: Event) => {
                  this.setting.onchange?.(
                    state.id,
                    (e.target as HTMLInputElement).checked,
                    this.owner,
                  );
                }}
              />
            ) : (
              <SignalHintComponent
                signalName={state.signaledFields[this.setting.field]!}
              />
            )}
            <BindModulatorButtonComponent
              state={state}
              setting={this.setting}
              owner={this.owner}
            />
          </span>
        );
      case "bigfloat":
        return (
          <span>
            {!state.signaledFields[this.setting.field] ? (
              <input
                type="number"
                step="0.01"
                min="0"
                value={(state as any)[this.setting.field]}
                oninput={(e: Event) => {
                  this.setting.onchange?.(
                    state.id,
                    (e.target as HTMLInputElement).value,
                    this.owner,
                  );
                }}
              />
            ) : (
              <SignalHintComponent
                signalName={state.signaledFields[this.setting.field]!}
              />
            )}
            <BindModulatorButtonComponent
              state={state}
              setting={this.setting}
              owner={this.owner}
            />
          </span>
        );
      case "integer":
        return (
          <span>
            {!state.signaledFields[this.setting.field] ? (
              <input
                type="number"
                step="1"
                min="0"
                value={(state as any)[this.setting.field]}
                oninput={(e: Event) => {
                  this.setting.onchange?.(
                    state.id,
                    (e.target as HTMLInputElement).value,
                    this.owner,
                  );
                }}
              />
            ) : (
              <SignalHintComponent
                signalName={state.signaledFields[this.setting.field]!}
              />
            )}
            <BindModulatorButtonComponent
              state={state}
              setting={this.setting}
              owner={this.owner}
            />
          </span>
        );
      case "options":
        return (
          <span>
            {this.setting.values!.map((e) => (
              <button
                type="button"
                onclick={() => {
                  this.setting.onchange?.(state.id, e, this.owner);
                  this.reRender();
                }}
                className={
                  (state as any)[this.setting.field] === e ? "selected" : ""
                }
              >
                {e}
              </button>
            ))}
          </span>
        );
      case "signal-only":
        return (
          <span>
            {!state.signaledFields[this.setting.field] ? null : (
              <SignalHintComponent
                signalName={state.signaledFields[this.setting.field]!}
              />
            )}
            <BindModulatorButtonComponent
              state={state}
              setting={this.setting}
              owner={this.owner}
            />
          </span>
        );
      case "layer":
        return (
          <span>
            <LayerHintComponent layerId={(state as any)[this.setting.field]} />
            <BindLayerButtonComponent
              state={state}
              setting={this.setting}
              owner={this.owner}
            />
          </span>
        );
      default:
        return (
          <input
            type="text"
            value={(state as any)[this.setting.field]}
            oninput={(e: Event) =>
              this.setting.onchange?.(
                state.id,
                (e.target as HTMLInputElement).value,
                this.owner,
              )
            }
          />
        );
    }
  }
  loadFile(state: LayerState, setting: ISetting, owner: string) {
    let input: HTMLInputElement;
    let file, fr;

    console.log("ON LOAD FILE");

    input = document.getElementById("imageLoadInput") as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      //TODO: DEDUPLICATE THIS
      file = input.files[0];
      fr = new FileReader();
      fr.onload = (e) => {
        this.receivedText(e, state, setting, owner);
      };
      if (file.size < 104857600) {
        fr.readAsDataURL(file);
      } else {
        //TODO: Implement an alert system for this
        console.log("ERROR - No files larger than 100mb");
      }
      input.value = "";
    }
  }

  receivedText(
    e: ProgressEvent<FileReader>,
    state: LayerState,
    setting: ISetting,
    owner: string,
  ) {
    const payload: string = e.target!.result as string;
    console.log("RECEIVE", typeof e.target!.result, payload.length);
    setting.onchange?.(state.id, payload, owner);
  }
}

export function GenericInputComponent(props: {
  binding?: string;
  setting: ISetting;
  owner: string;
}): Element {
  return new GenericInput(props);
}
customElements.define("generic-input", GenericInput);
