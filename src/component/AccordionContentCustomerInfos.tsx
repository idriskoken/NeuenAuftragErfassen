import * as React from 'react';
import { Component } from 'react';
import {AutoCompleteComponent} from "@syncfusion/ej2-react-dropdowns";
import {CompanyType, createEmptyCompany} from '../model/CompanyModel';
import {ContactPersonType, createEmptyContactPerson} from '../model/ContactPersonModel'

interface Props {
  getCustomer:  CompanyType[]; contactPerson: ContactPersonType[]
}
interface State {
  filteredCompanyInfos: CompanyType;
  filteredContactPerson: ContactPersonType
}
var filteredData:CompanyType;
var filteredContactPers: ContactPersonType; 

export function getCustomerInfos() {
  return {filteredData, filteredContactPers};
}

export default class AccordionContentCustomerInfos extends React.Component<Props, State> {
  
  constructor(props: Props) {
    super(props);
    this.state = {
      filteredCompanyInfos : createEmptyCompany(),
      filteredContactPerson: createEmptyContactPerson(),
    }
  }
   filterCompanyInfos = (placeHolder: string) =>{
    const companyInfo = this.state.filteredCompanyInfos;
     if(companyInfo!== createEmptyCompany()) {
         switch (placeHolder){
           case 'name':
             return companyInfo.name;
           case 'street':
             return companyInfo.street;
           case 'Matchcode':
             return companyInfo.matchCode;
           case 'Hausnummer':
             return companyInfo.houseNr;
           case 'PLZ':
             return companyInfo.postalCode;
           case 'Ort':
             return companyInfo.place;
           case 'Land':
             return companyInfo.country;
         } 
     }else return ;
   }
   filterContactPerson = (placeHolder: string) =>{
    const contactPerson = this.state.filteredContactPerson;
     if(contactPerson!== createEmptyContactPerson()) {
         switch (placeHolder){
           case 'contactperson':
             return contactPerson.name;
           case 'E-Mail':
             return contactPerson.mail;
           case 'Telefon':
             return contactPerson.telephone;
           case 'Fax':
             return contactPerson.fax;
         } 
     }else return ;
   }

   onSelect(event: any): void {
    this.setState({filteredCompanyInfos : event.itemData})
    filteredData = this.state.filteredCompanyInfos;
    console.log(filteredData)
   }
   onSelect2(event: any): void {
    this.setState({filteredContactPerson : event.itemData})
    filteredContactPers = this.state.filteredContactPerson;
    console.log(filteredData)
   }
   render() { 
       return ( 
           <div className="accordion-general">
           <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 allcolumns">
             <div className="each-and-everyitem">
               <AutoCompleteComponent
                 id="name"
                 sortOrder="Ascending"
                 dataSource = {this.props.getCustomer}
                 fields={{ value: "name" }}
                 autofill={true}
                 placeholder="Name"
                 suggestionCount={5}
                 filterType="StartsWith"
                 value = {this.filterCompanyInfos('name')}
                 select = {this.onSelect.bind(this)}
               />
             </div>
             <div className="each-and-everyitem">
               <AutoCompleteComponent
                 id="street"
                 dataSource={this.props.getCustomer}
                 sortOrder="Ascending"
                 fields={{ value: "street" }}
                 autofill={true}
                 placeholder="Straße"
                 suggestionCount={5}
                 filterType="StartsWith"
                 value = {this.filterCompanyInfos('street')}
                 select = {this.onSelect.bind(this)}
               />
             </div>
             <div className="each-and-everyitem">
               <AutoCompleteComponent
                 id="contactpersonName"
                 dataSource={this.props.contactPerson}
                 sortOrder="Ascending"
                 fields={{ value: "name" }}
                 autofill={true}
                 placeholder="Name Ansprechpartner"
                 suggestionCount={5}
                 filterType="StartsWith"
                 value = {this.filterContactPerson('contactperson')}
                 select = {this.onSelect2.bind(this)}
               />
             </div>
           </div>
           <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 allcolumns">
             <div className="each-and-everyitem">
               <AutoCompleteComponent
                 id="Match Code"
                 dataSource={this.props.getCustomer}
                 sortOrder="Ascending"
                 fields={{ value: "matchCode" }}
                 autofill={true}
                 placeholder="Match Code"
                 suggestionCount={5}
                 filterType="StartsWith"
                 value = {this.filterCompanyInfos('Matchcode')}
                 select = {this.onSelect.bind(this)}
               />
             </div>
             <div className="hausnummer-plz each-and-everyitem">
               <AutoCompleteComponent
                 id="hausNumber"
                 dataSource={this.props.getCustomer}
                 sortOrder="Ascending"
                 fields={{ value: "hausNr" }}
                 autofill={true}
                 placeholder="Hausnummer"
                 suggestionCount={5}
                 filterType="StartsWith"
                 value = {this.filterCompanyInfos('Hausnummer')}
                 select = {this.onSelect.bind(this)}
               />
               <AutoCompleteComponent
                 id="postalCode"
                 dataSource={this.props.getCustomer}
                 sortOrder="Ascending"
                 fields={{ value: "postalCode" }}
                 autofill={true}
                 placeholder="PLZ"
                 suggestionCount={5}
                 filterType="StartsWith"
                 value = {this.filterCompanyInfos('PLZ')}
                 select = {this.onSelect.bind(this)}
               />
             </div>
             <div className="each-and-everyitem">
               <AutoCompleteComponent
                 id="eMail"
                 dataSource={this.props.contactPerson}
                 sortOrder="Ascending"
                 fields={{ value: "mail" }}
                 autofill={true}
                 placeholder="E-Mail Ansprechpartner"
                 suggestionCount={5}
                 filterType="StartsWith"
                 value = {this.filterContactPerson('E-Mail')}
                 select = {this.onSelect2.bind(this)}
               />
             </div>
           </div>
           <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 allcolumns">
             <div className="each-and-everyitem">
               <AutoCompleteComponent
                 id="place"
                 dataSource={this.props.getCustomer}
                 sortOrder="Ascending"
                 fields={{ value: "place" }}
                 autofill={true}
                 placeholder="Ort"
                 suggestionCount={5}
                 filterType="StartsWith"
                 value = {this.filterCompanyInfos('Ort')}
                 select = {this.onSelect.bind(this)}
               />
             </div>
             <div className="each-and-everyitem">
               <AutoCompleteComponent
                 id="telephone"
                 dataSource={this.props.contactPerson}
                 sortOrder="Ascending"
                 fields={{ value: "telephone" }}
                 autofill={true}
                 placeholder="Telefon Ansprechpartner"
                 suggestionCount={5}
                 filterType="StartsWith"
                 value = {this.filterContactPerson('Telefon')}
                 select = {this.onSelect2.bind(this)}
               />
             </div>
           </div>
           <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 allcolumns">
             <div className="each-and-everyitem">
               <AutoCompleteComponent
                 id="country"
                 dataSource={this.props.getCustomer}
                 sortOrder="Ascending"
                 fields={{ value: "country" }}
                 autofill={true}
                 placeholder="Land"
                 suggestionCount={5}
                 filterType="StartsWith"
                 value = {this.filterCompanyInfos('Land')}
                 select = {this.onSelect.bind(this)}
               />
             </div>
             <div className="each-and-everyitem">
               <AutoCompleteComponent
                 id="fax"
                 dataSource={this.props.contactPerson}
                 sortOrder="Ascending"
                 fields={{ value: "fax" }}
                 autofill={true}
                 placeholder="Fax Ansprechpartner"
                 suggestionCount={5}
                 filterType="StartsWith"
                 value = {this.filterContactPerson('Fax')}
                 select = {this.onSelect2.bind(this)}
               />
             </div>
           </div>
         </div>
        );
   }
}

 