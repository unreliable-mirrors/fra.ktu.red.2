import jsx from "texsaur";
import { KTUComponent } from "fra.ktu.red-component";

class LayerItem extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);
  }

  render(): Element {
    console.log("Rendering LayerItem with binding:", this.bindingData);
    return (
      <div class="layer-item">
        <span>Layer Name</span>
        <button>Delete</button>
      </div>
    );
  }
}

export function LayerItemComponent(props: { binding?: string }): Element {
  return new LayerItem(props);
}
customElements.define("layer-item", LayerItem);
