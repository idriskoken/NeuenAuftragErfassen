export type trafficMode = {
  id : number;
  name: string;
}
export function createEmptyTrafficMode(){
  return {
    id: -1,
    name: ''
  }
}