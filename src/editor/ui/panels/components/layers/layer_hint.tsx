import jsx from "texsaur";
import { DataStore, KTUComponent, LayerState } from "fra.ktu.red-component";
import { executeCommand } from "../../../../../ktu/helpers/commands_manager";
import { ActivateThingCommand } from "../../../../commands/activate_thing_command";

class LayerHint extends KTUComponent {
  layerId: number | null;

  constructor(layerId: number | null) {
    super();
    this.layerId = layerId;
  }

  render(): Element {
    const layers = DataStore.getInstance().getStore("editorScene.layers") as LayerState[];
    const layerName = layers.find((layer) => layer.id === this.layerId)?.name;
    return (
      <span onclick={() => this.handleClick()}>
        {layerName ?? "No Layer"}
      </span>
    );
  }

  handleClick() {
    if (this.layerId === null) {
      return;
    }
    executeCommand(new ActivateThingCommand(this.layerId!));
  }
}

export function LayerHintComponent(props: { layerId: number | null }): Element {
  return new LayerHint(props.layerId);
}

customElements.define("layer-hint", LayerHint);
