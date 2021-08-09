
export type CompanyType = {
  country: string;
  houseNr: string;
  id: number;
  addressId: number;
  matchCode: string;
  name: string;
  place: string;
  postalCode: string;
  referenceNumber: number;
  street: string;
  
};

export function createEmptyCompany(): CompanyType {
  return {
    country: '',
    houseNr: '',
    id: -1,
    addressId: -1,
    matchCode: '',
    name: '',
    place: '',
    postalCode: '',
    referenceNumber: -1,
    street: '',
  };
}