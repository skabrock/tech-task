import createNode from './node-creator';
import deepReplaceById from './deep-replace-by-id';

export default class TreeView {
  constructor(container, state) {
    this.state = state;
    this.container = container;
    this.render();
  }

  render() {
    this.container.innerHTML = "";
    this.container.appendChild(createNode(this.state, this.updateNode.bind(this)));
  }

  getData () {
    return this.state;
  }

  update (state) {
    this.state = state;
    window.localStorage['TreeView'] = JSON.stringify(state);
    this.render();
  }

  updateNode (id, node) {
    this.update(deepReplaceById(this.state, id, node))
    this.render();
  }
}
