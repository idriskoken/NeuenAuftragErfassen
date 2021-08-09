export type commodity = {
  commodityID: number,
  commodityName: string
}
export function createEmptyCommodity(){
  return {
    commodityID: -1,
    commodityName: ''
  }
}