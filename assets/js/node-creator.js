const createNode = (data, onUpdateNode) => {
  let root_el = document.createElement("div"),
      label_el = document.createElement("label"),
      checkbox_el = document.createElement("input"),
      text_node = document.createTextNode(data.name);
  label_el.htmlFor = data.id;
  checkbox_el.type = 'checkbox';
  checkbox_el.id = data.id;
  checkbox_el.checked = data.isChecked;
  checkbox_el.onchange = (e) => {
    onUpdateNode(data.id, {
      id: data.id,
      name: data.name,
      isChecked: e.target.checked,
      childs: data.childs,
    });
  }
  label_el.appendChild(text_node);
  root_el.appendChild(label_el);
  root_el.appendChild(checkbox_el);
  return root_el;
}

const createNodeList = (data, onUpdateNode) => {
  let root_el = document.createElement("div");
  for(var i = 0; i < data.length; i++) {
    const element = createNode(data[i], onUpdateNode);
    const children = data[i].childs;
    if (children && children.length) {
      element.appendChild(createNodeList(children, onUpdateNode))
    }
    root_el.appendChild(element);
  }
  return root_el;
}

export default createNodeList;