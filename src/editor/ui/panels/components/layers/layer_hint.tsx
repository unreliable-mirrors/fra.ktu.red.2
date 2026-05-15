import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";

class LayerHint extends KTUComponent {
  layerId: string;

  constructor(layerId: string) {
    super();
    this.layerId = layerId;
  }

  render(): Element {
    return <span>{this.layerId}</span>;
  }

  handleClick() {}
}

export function LayerHintComponent(props: { layerId: string }): Element {
  return new LayerHint(props.layerId);
}

customElements.define("layer-hint", LayerHint);
