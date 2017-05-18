export default function deepReplaceById (state, id, obj) {
  return state.map( item => {
    if ( item.id === id) {
      return obj;
    } else if (item.childs && item.childs.length) {
      return {
        id: item.id,
        name: item.name,
        isChecked: item.isChecked,
        childs: deepReplaceById(item.childs, id, obj)
      };
    }
    return item;
  })
}