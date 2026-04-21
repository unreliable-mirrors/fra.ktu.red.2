import jsx from "texsaur";
import { DataStore, KTUComponent } from "fra.ktu.red-component";
import {
  IconClose,
  IconDuplicate,
  IconPause,
  IconPlay,
} from "../../../../ktu/helpers/icons";
import { RemoveLayerCommand } from "../../../commands/layers/remove_layer_command";
import { executeCommand } from "../../../../ktu/helpers/commands_manager";
import { DuplicateLayerCommand } from "../../../commands/layers/duplicate_layer_command";
import { ToggleLayerCommand } from "../../../commands/layers/toggle_layer_command";
import { MODULATOR_SETTINGS } from "../../../settings/isetting";
import { resolveInputType } from "../../input_resolver";
import { ModulatorState } from "fra.ktu.red-component";
import { LineChart } from "chartist";
import { IModulator } from "fra.ktu.red-component/dist/modulators/imodulator";
import { ActivateModulatorCommand } from "../../../commands/modulators/activate_modulator_command";

class ModulatorItem extends KTUComponent {
  valueRenderer?: Element;
  chart?: LineChart;

  constructor(props: { binding?: string }) {
    super(props);
    const state: ModulatorState = this.bindingData[this.bindingKeys[0]];
    const modulator = (
      DataStore.getInstance().getStore(
        "instances.editorScene.modulators",
      ) as IModulator[]
    ).find((modulator) => modulator.id === state.id)!;

    modulator.hook = () => {
      if (this.valueRenderer) {
        this.valueRenderer.innerHTML = modulator.value.toFixed(2);
        this.chart?.update(
          { series: [modulator.valueLog] },
          {
            axisX: { showLabel: false, showGrid: false },
            axisY: {
              high: Math.ceil(Math.max(...modulator.valueLog)),
              low: Math.floor(Math.min(...modulator.valueLog)),
              showGrid: false,
            },
          },
        );
      }
    };
  }

  render(): Element {
    const state: ModulatorState = this.bindingData[this.bindingKeys[0]];
    const modulator = (
      DataStore.getInstance().getStore(
        "instances.editorScene.modulators",
      ) as IModulator[]
    ).find((modulator) => modulator.id === state.id)!;
    const active =
      state.id === DataStore.getInstance().getStore("activeModulatorId")
        ? "active"
        : "";

    this.valueRenderer = <div>{modulator.getValue()}</div>;
    return (
      <div className={`modulatorItem ${active}`}>
        <div className="header">
          <div
            className="title"
            onclick={() => {
              this.handleClick();
            }}
          >
            {state.name}
          </div>
          <span onclick={() => this.handleVisibleClick()}>
            {state.running ? IconPause() : IconPlay()}
          </span>
          <div className="icons">
            <span onclick={() => this.handleDuplicateClick()}>
              {IconDuplicate()}
            </span>
            <span onclick={() => this.handleCloseClick()}>{IconClose()}</span>
          </div>
        </div>
        {this.valueRenderer}
        {active === "active" ? (
          <>
            <div className="chartContainer" id={`chart_${state.id}`}></div>
            <div className="settings">
              {MODULATOR_SETTINGS[state.type].map((setting) => (
                <div>
                  <span>{setting.field}: </span>
                  {resolveInputType(state, setting, "editorScene.modulators")}
                </div>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }

  afterRender() {
    const state: ModulatorState = this.bindingData[this.bindingKeys[0]];
    const modulator = (
      DataStore.getInstance().getStore(
        "instances.editorScene.modulators",
      ) as IModulator[]
    ).find((modulator) => modulator.id === state.id)!;
    const active =
      state.id === DataStore.getInstance().getStore("activeModulatorId")
        ? "active"
        : "";
    if (active === "active") {
      this.chart = new LineChart(
        `#chart_${state.id}`,
        {
          series: [modulator.valueLog],
        },
        {
          axisX: { showLabel: false, showGrid: false },
          axisY: {
            high: Math.max(...modulator.valueLog),
            low: Math.min(...modulator.valueLog),
            showGrid: false,
          },
        },
      );
    }
  }

  handleClick() {
    console.log("click");
    const state: ModulatorState = this.bindingData[this.bindingKeys[0]];
    executeCommand(new ActivateModulatorCommand(state.id));
  }

  handleVisibleClick() {
    const state: ModulatorState = this.bindingData[this.bindingKeys[0]];
    executeCommand(new ToggleLayerCommand(state.id));
  }

  handleDuplicateClick() {
    const state: ModulatorState = this.bindingData[this.bindingKeys[0]];
    executeCommand(new DuplicateLayerCommand(state.id));
  }

  handleCloseClick() {
    const state: ModulatorState = this.bindingData[this.bindingKeys[0]];
    executeCommand(new RemoveLayerCommand(state));
  }
}

export function ModulatorItemComponent(props: { binding?: string }): Element {
  return new ModulatorItem(props);
}
customElements.define("modulator-item", ModulatorItem);
