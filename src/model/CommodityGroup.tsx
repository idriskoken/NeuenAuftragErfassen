export type commodityGroup = {
  commodityGroupId: number,
  commodityGroup: string
}
export function createEmptyCommodityGroup(){
  return {
    commodityGroupId: -1,
    commodityGroup: ''
  }
}