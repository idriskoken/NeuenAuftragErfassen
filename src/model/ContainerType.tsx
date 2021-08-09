export  type ContainerType = {
  containerTypeId: number,
  name: string,
  exteriorHeight: number,
  exteriorLength: number,
  exteriorWidth: number,
}
export function createEmptyContainerType(){
  return {
    containerTypeId: -1,
    name: '',
    exteriorHeight: 0,
    exteriorLength: 0,
    exteriorWidth: 0,
  }
}