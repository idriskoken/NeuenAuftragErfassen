export type ContactPersonType = {
  id: number
  name: string;
  mail: string;
  telephone: string;
  fax: string;
};

export function createEmptyContactPerson(): ContactPersonType {
  return {
    id: -1,
    name: '',
    mail: '',
    telephone: '',
    fax: '',
  };
}
