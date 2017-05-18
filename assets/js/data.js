const initialState = [{
  id: 1,
  name: 'Node 1',
  isChecked: false,
  childs: [{
    id: 11,
    name: 'Node 1.1',
    isChecked: true,
  }]
}, {
  id: 2,
  name: 'Node 2',
  isChecked: false,
  childs: [{
    id: 21,
    name: 'Node 2.1',
    isChecked: true,
    childs: [{
      id: 211,
      name: 'Node 2.1.1',
      isChecked: true,
    }]
  }, {
    id: 22,
    name: 'Node 2.2',
    isChecked: true,
    childs: [{
      id: 221,
      name: 'Node 2.2.1',
      isChecked: true,
    }]
  }]
}];

const testState = [{
  id: 1,
  name: 'Node 1 test',
  isChecked: false,
  childs: [{
    id: 11,
    name: 'Node 1.1',
    isChecked: true,
  }]
}, {
  id: 2,
  name: 'Node 2',
  isChecked: false,
  childs: [{
    id: 21,
    name: 'Node 2.1',
    isChecked: true,
    childs: [{
      id: 211,
      name: 'Node 2.1.1',
      isChecked: true,
    }]
  }, {
    id: 22,
    name: 'Node 2.2',
    isChecked: true,
    childs: [{
      id: 221,
      name: 'Node 2.2.1',
      isChecked: true,
    }]
  }]
}, {
  id: 3,
  name: 'Node 3',
  isChecked: false,
}];

const testNode = {
  id: 11,
  name: 'Node 1.1',
  isChecked: false,
}

export { initialState, testState, testNode };