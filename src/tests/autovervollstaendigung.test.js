const f = require('./function.js');

describe('Test Autovervollständigung Firma Daten Funktion', () =>{
  it('Firma name wird automatisch ausgefüllt', () =>{
    const a = f.filterCompanyInfos('name');
    expect(a).toBe('ABC');
  })
  it('Firma Matchcode wird automatisch ausgefüllt', () =>{
    const b = f.filterCompanyInfos('Matchcode');
    expect(b).toBe(1235);
  })
  it('Firma street wird automatisch ausgefüllt', () =>{
    const c = f.filterCompanyInfos('street');
    expect(c).toBe('abc');
  })
  it('Firma Hausnr wird automatisch ausgefüllt', () =>{
    const d = f.filterCompanyInfos('Hausnummer');
    expect(d).toBe(235);
  })
  it('Firma PLZ wird automatisch ausgefüllt', () =>{
    const e = f.filterCompanyInfos('PLZ');
    expect(e).toBe(4177);
  })
  it('Firma Ort wird automatisch ausgefüllt', () =>{
    const m = f.filterCompanyInfos('Ort');
    expect(m).toBe('Leipzig');
  })
  it('Firma Land wird automatisch ausgefüllt', () =>{
    const g = f.filterCompanyInfos('Land');
    expect(g).toBe('Deutchland');
  })
})
describe('Test Autovervollständigung Ansprechpartner Daten Funktion', () =>{
  it('Ansprechpartner name wird automatisch ausgefüllt', () =>{
    const h = f.filterContactPerson('contactperson');
    expect(h).toBe('Ansprechpartner');
  })
  it('Ansprechpartner E-Mail wird automatisch ausgefüllt', () =>{
    const i = f.filterContactPerson('E-Mail');
    expect(i).toBe('ansprechpartner@abc.de');
  })
  it('Ansprechpartner Telefon wird automatisch ausgefüllt', () =>{
    const j = f.filterContactPerson('Telefon');
    expect(j).toBe(123456789);
  })
  it('Ansprechpartner Fax wird automatisch ausgefüllt', () =>{
    const k = f.filterContactPerson('Fax');
    expect(k).toBe(123456);
  })
})