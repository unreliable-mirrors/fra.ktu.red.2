import jsx from "texsaur";
import { KTUComponent, LayerState } from "fra.ktu.red-component";
import { DataStore } from "fra.ktu.red-component";
import {
  IconClose,
  IconDown,
  IconDuplicate,
  IconHidden,
  IconUp,
  IconVisible,
} from "../../../ktu/helpers/icons";

class LayerItem extends KTUComponent {
  constructor(props: { binding?: string }) {
    super(props);
  }

  render(): Element {
    const state: LayerState = this.bindingData[this.bindingKeys[0]];
    //TODO: IMPLEMENT THIS PROPERLY
    const active = false;
    return (
      <div className={`layerItem ${active}`}>
        <div className="header">
          <div
            className="title"
            onclick={() => {
              this.handleClick();
            }}
          >
            {state.name}
          </div>
          <div className="icons">
            <span onclick={(e) => this.handleUpClick(e)}>
              {DataStore.getInstance()
                .getStore("editorScene.layers")
                .indexOf(state) +
                1 !=
              DataStore.getInstance().getStore("editorScene.layers").length ? (
                IconUp()
              ) : (
                <></>
              )}
            </span>
            <span onclick={(e) => this.handleDownClick(e)}>
              {DataStore.getInstance()
                .getStore("editorScene.layers")
                .indexOf(state) != 0 ? (
                IconDown()
              ) : (
                <></>
              )}
            </span>
            <span onclick={() => this.handleVisibleClick()}>
              {state.visible ? IconVisible() : IconHidden()}
            </span>
            <span onclick={() => this.handleDuplicateClick()}>
              {IconDuplicate()}
            </span>
            <span onclick={() => this.handleCloseClick()}>{IconClose()}</span>
          </div>
        </div>
      </div>
    );
  }

  handleClick() {
    //DataStore.getInstance().setStore("editorActiveLayer", this.layer);
  }

  handleUpClick(e: Event) {}

  handleDownClick(e: Event) {}

  handleVisibleClick() {}

  handleDuplicateClick() {}

  handleCloseClick() {}
}

export function LayerItemComponent(props: { binding?: string }): Element {
  return new LayerItem(props);
}
customElements.define("layer-item", LayerItem);
