const createNode = data => {
  let root_el = document.createElement("div"),
      label_el = document.createElement("label"),
      checkbox_el = document.createElement("input"),
      text_node = document.createTextNode(data.name);
  label_el.htmlFor = data.id;
  checkbox_el.type = 'checkbox';
  checkbox_el.id = data.id;
  checkbox_el.checked = data.isChecked;
  label_el.appendChild(text_node);
  root_el.appendChild(label_el);
  root_el.appendChild(checkbox_el);
  return root_el;
}

const createNodeList = data => {
  let root_el = document.createElement("div");
  for(var i = 0; i < data.length; i++) {
    const element = createNode(data[i]);
    const children = data[i].childs;
    if (children && children.length) {
      element.appendChild(createNodeList(children))
    }
    root_el.appendChild(element);
  }
  return root_el;
}

export default createNodeList;