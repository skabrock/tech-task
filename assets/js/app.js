import { initialState, testState, testNode } from './data';
import TreeView from './tree-view';

let tree = new TreeView(document.getElementById('root'), initialState);

// event listeners

document.getElementById('set-state-1').addEventListener("click", e => {
  tree.update(initialState);
});

document.getElementById('set-state-2').addEventListener("click", e => {
  tree.update(testState);
});

document.getElementById('get-state').addEventListener("click", e => {
  alert(JSON.stringify(tree.getData()));
});

document.getElementById('update-node').addEventListener("click", e => {
  tree.updateNode(11, testNode);
});