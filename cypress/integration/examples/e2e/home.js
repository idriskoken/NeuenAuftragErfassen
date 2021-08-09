import { createYield } from "typescript"

/// <reference types="Cypress" />
describe('Neuer Auftrag erfassung durchführen', () => {

  it("Rendern ohne Absturz", () => {
    cy.visit("/");
  });
  it("neuen erfassen button anzeigen", () => {
    cy.get('[class="e-control e-btn e-lib"]').should('be.visible');
  });
  it("Neuen erfassen button betätigen und Popup anzeigen", () => {
    cy.get('[class="e-control e-btn e-lib"]').click();
    cy.get('[id="targetElement"]').should('be.visible');
  });
  it("Öffne Accordion Stammdaten", () => {
    cy.get('[class="e-dlg-content"]').should('be.visible');
    cy.get('[class="e-control e-accordion e-lib e-acrdn-root e-keyboard"]').should('be.visible');
    cy.contains('Stammdaten', { timeout: 60000 }).click();
    cy.get('[class="e-acrdn-panel"]').should('be.visible');
  });
  it("Öffne Accordion Auftraggeber", () => {
    cy.contains('Auftraggeber', { timeout: 10000 }).click();
    cy.get('[class="e-acrdn-panel"]').should('be.visible');
  });
  it("Öffne Accordion Abholadresse", () => {
    cy.contains('Abholadresse', { timeout: 10000 }).click();
    cy.get('[class="e-acrdn-panel"]').should('be.visible');
  });
  it("Öffne Accordion Lieferadresse", () => {
    cy.contains('Lieferadresse', { timeout: 10000 }).click();
    cy.get('[class="e-acrdn-panel"]').should('be.visible');
  });
  it("Öffne Accordion Transportgut", () => {
    cy.contains('Transportgut').click();
    cy.get('[class="e-acrdn-panel"]').should('be.visible');
  });
  it("Öffne Accordion Bemerkungen", () => {
    cy.contains('Bemerkungen').click();
    cy.get('[class="e-acrdn-panel"]').should('be.visible');
  });
  it('Reference Number eingeben', () => {
    cy.get('[name="Referenz-Nr"]').type('123456');
  });
  it('TrafficMode eingeben', () => {
    cy.get('[class="e-control e-combobox e-lib e-keyboard"]', {timeout: 10000}).type('Plane');
    cy.get('[class="e-control e-combobox e-lib e-keyboard"]', {timeout: 10000}).should('have.length', 1);
  });
  it('Auftrgageber eingeben', () => {
    const auftraggeber = {
      name: "Uniklinik",
      str : "Am Markt 10",
      PLZ: 10557,
      city: "Berlin",
      country:"Deutschland", 
      contactperson: {
        name:"Lars Hennig",
        email:"",
        tel:"03425-880667",
        fax:"03425-880699",
      }
    }
    cy.get('[id="name"]', {timeout: 10000}).type(auftraggeber.name);
    cy.get('[id="street"]', {timeout: 10000}).type(auftraggeber.str);
    cy.get('[id="contactpersonName"]', {timeout: 10000}).type(auftraggeber.contactperson.name);
    cy.get('[id="postalCode"]', {timeout: 10000}).type(auftraggeber.PLZ);
    cy.get('[id="place"]', {timeout: 10000}).type(auftraggeber.city);
    cy.get('[id="telephone"]', {timeout: 10000}).type(auftraggeber.contactperson.tel);
    cy.get('[id="country"]', {timeout: 10000}).type(auftraggeber.country);
    cy.get('[id="fax"]', {timeout: 10000}).type(auftraggeber.contactperson.fax);
    
    cy.get('[id="name"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="street"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="contactpersonName"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="postalCode"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="place"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="telephone"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="country"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="fax"]', {timeout: 10000}).should('have.length', 1);
  });
  it('Abholadresse eingeben', () => {
    const auftraggeber = {
      name: "Uniklinik",
      str : "Am Markt 10",
      PLZ: 10557,
      city: "Berlin",
      country:"Deutschland", 
      contactperson: {
        name:"Lars Hennig",
        email:"",
        tel:"03425-880667",
        fax:"03425-880699",
      }
    }
    cy.get('[id="sname"]', {timeout: 10000}).type(auftraggeber.name);
    cy.get('[id="sstreet"]', {timeout: 10000}).type(auftraggeber.str);
    cy.get('[id="scontactpersonName"]', {timeout: 10000}).type(auftraggeber.contactperson.name);
    cy.get('[id="spostalCode"]', {timeout: 10000}).type(auftraggeber.PLZ);
    cy.get('[id="splace"]', {timeout: 10000}).type(auftraggeber.city);
    cy.get('[id="stelephone"]', {timeout: 10000}).type(auftraggeber.contactperson.tel);
    cy.get('[id="scountry"]', {timeout: 10000}).type(auftraggeber.country);
    cy.get('[id="sfax"]', {timeout: 10000}).type(auftraggeber.contactperson.fax);
    
    cy.get('[id="sname"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="sstreet"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="scontactpersonName"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="spostalCode"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="splace"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="stelephone"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="scountry"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="sfax"]', {timeout: 10000}).should('have.length', 1);
  });
  it('Lieferadresse eingeben', () => {
    const auftraggeber = {
      name: "Uniklinik",
      str : "Am Markt 10",
      PLZ: 10557,
      city: "Berlin",
      country:"Deutschland", 
      contactperson: {
        name:"Lars Hennig",
        email:"",
        tel:"03425-880667",
        fax:"03425-880699",
      }
    }
    cy.get('[id="rname"]', {timeout: 10000}).type(auftraggeber.name);
    cy.get('[id="rstreet"]', {timeout: 10000}).type(auftraggeber.str, {force: true});
    cy.get('[id="rcontactpersonName"]', {timeout: 10000}).type(auftraggeber.contactperson.name, {force: true});
    cy.get('[id="rpostalCode"]', {timeout: 10000}).type(auftraggeber.PLZ, {force: true});
    cy.get('[id="rplace"]', {timeout: 10000}).type(auftraggeber.city, {force: true});
    cy.get('[id="rtelephone"]', {timeout: 10000}).type(auftraggeber.contactperson.tel, {force: true});
    cy.get('[id="rcountry"]', {timeout: 10000}).type(auftraggeber.country, {force: true});
    cy.get('[id="rfax"]', {timeout: 10000}).type(auftraggeber.contactperson.fax, {force: true});
    
    cy.get('[id="rname"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="rstreet"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="rcontactpersonName"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="rpostalCode"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="rplace"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="rtelephone"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="rcountry"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="rfax"]', {timeout: 10000}).should('have.length', 1);
  });
  it('Transportgut eingeben', () => {
    const transportgut = {
      markierung: "Test 1",
      anzahl: 10,
      verpackung: "EU",
      warengruppe: "Glaswaren",
      artikel: "flasche",
      gewicht: 10,
      lademeter: 0.96,
      kubicmeter: 0.00,
      lange: 1.2,
      breite: 0.8,
      hohe: 0
    }
    cy.get('[id="Markierung"]', {timeout: 10000}).type(transportgut.markierung);
    cy.get('[id="Anzahl"]', {timeout: 10000}).type(transportgut.anzahl, {force: true});
    cy.get('[id="Verpackung"]', {timeout: 10000}).type(transportgut.verpackung, {force: true});
    cy.get('[id="Warengruppe"]', {timeout: 10000}).type(transportgut.warengruppe, {force: true});
    cy.get('[id="Artikel"]', {timeout: 10000}).type(transportgut.artikel, {force: true});
    cy.get('[id="Gewicht"]', {timeout: 10000}).type(transportgut.gewicht, {force: true});
    cy.get('[id="Lademeter"]', {timeout: 10000}).type(transportgut.lademeter, {force: true});
    cy.get('[id="Kubicmeter"]', {timeout: 10000}).type(transportgut.kubicmeter, {force: true});
    cy.get('[id="exteriorLength"]', {timeout: 10000}).type(transportgut.lange, {force: true});
    cy.get('[id="exteriorWidth"]', {timeout: 10000}).type(transportgut.breite, {force: true});
    cy.get('[id="exteriorHeight"]', {timeout: 10000}).type(transportgut.hohe, {force: true});

    cy.get('[id="Markierung"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="Anzahl"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="Verpackung"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="Warengruppe"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="Artikel"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="Gewicht"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="Lademeter"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="Kubicmeter"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="exteriorLength"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="exteriorWidth"]', {timeout: 10000}).should('have.length', 1);
    cy.get('[id="exteriorHeight"]', {timeout: 10000}).should('have.length', 1);
  });
  it('Bemerkungen eingeben', () => {
    cy.get('[class="e-input-group e-control-wrapper e-multi-line-input"]').type('This a Test....');
  });
  it("Auftrag abschlissen button anzeigen", () => {
    cy.get('[class="e-control e-btn e-lib"]').should('be.visible');
  });
  it("Auftrag abschlissen button anzeigen", () => {
    cy.get('[class="e-control e-btn e-lib"]').should('be.visible');
  });
})