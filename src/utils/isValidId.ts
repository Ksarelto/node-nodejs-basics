const isValidId = (id: string) => {
  if(id === undefined) return false;
  if(!id.match(/^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/g)) return false;
  return true;
}

export {
  isValidId
}