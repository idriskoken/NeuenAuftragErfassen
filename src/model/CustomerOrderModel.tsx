import { CompanyType, createEmptyCompany } from './CompanyModel';

export type CustomerOrderType = {
  customerReference: string;
  contractingAuthority: CompanyType;
  comments?: string;
  deliveryEndDateTime?: string;
  deliveryStartDateTime?: string;
  fixDelivery?: boolean;
  fixPickup?: boolean;
  goodsName?: string;
  id: number;
  meansOfTransport?: string;
  receiver: CompanyType;
  receiverName?: string;
  sender: CompanyType;
  senderName?: string;
  pickupStartDateTime?: string;
  pickupEndDateTime?: string;
  status: string;
  transportationMode?: string;
  transportationGood?: string;
};

export function createEmptyCustomerOrder(): CustomerOrderType {
  return {
    customerReference: '',
    contractingAuthority: createEmptyCompany(),
    comments: '',
    deliveryEndDateTime: '',
    deliveryStartDateTime: '',
    fixPickup: false,
    fixDelivery: false,
    goodsName: '',
    id: -1,
    meansOfTransport: '',
    receiver: createEmptyCompany(),
    receiverName: '',
    sender: createEmptyCompany(),
    senderName: '',
    pickupStartDateTime: '',
    pickupEndDateTime: '',
    status: 'New',
    transportationMode: '',
    transportationGood: '',
  };
}
