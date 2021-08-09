import * as React from 'react';
import { Component } from 'react';
import Axios from 'axios';
import config from '../services/config.json';
import {AutoCompleteComponent} from "@syncfusion/ej2-react-dropdowns";
import { TextBoxComponent, NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { companyModel } from '../model/model';
import {CompanyType, createEmptyCompany} from '../model/CompanyModel'
import {ContainerType, createEmptyContainerType} from '../model/ContainerType';
import {commodityGroup,createEmptyCommodityGroup} from '../model/CommodityGroup';
import {commodity,createEmptyCommodity} from '../model/Commodity';

interface Props {
  containerType: ContainerType[];commodity: commodityGroup[]
}
interface State {
  getfilteredTransportGoods: ContainerType
  commodity: commodity[]
} 
var filteredData:ContainerType;
var markierung: string;
var numberOfItem: number;
var item: string;
var gewicht: number;
var lademeter: number;
var commodityItem: commodityGroup;
var cubicMeter: number;  

export function getTransportGoods() {
  return {filteredData, markierung, numberOfItem, item, gewicht, lademeter, commodityItem, cubicMeter};
}
 
class AccordionContentTransportGoods extends React.Component<Props, State> {
  
  constructor(props:Props) {
    super(props);
    this.state = {
     getfilteredTransportGoods: createEmptyContainerType(),
     commodity: []
    }
    this.onSelect = this.onSelect.bind(this);
  }
 
   filterCompanyInfos = (placeHolder: string) =>{
     const companyInfo = this.state.getfilteredTransportGoods;
      if(companyInfo!== createEmptyContainerType()) {
          switch (placeHolder){
            case 'name':
              return companyInfo.name;
            case 'exteriorHeight':
              return companyInfo.exteriorHeight;
            case 'exteriorLength':
              return companyInfo.exteriorLength;
            case 'exteriorWidth':
              return companyInfo.exteriorWidth;
          }
      }
      else return ;
    }
    onGewicht = (event: any) : number => {
      gewicht = event.value;
      return event.value;

    }
    onLademeter = () : number=> {
      const lademeterr = this.state.getfilteredTransportGoods.exteriorLength*this.state.getfilteredTransportGoods.exteriorWidth;
      lademeter = lademeterr;
      return lademeterr;
    }
    onCubicMeter = () : number => {
      const volume = this.state.getfilteredTransportGoods.exteriorLength*this.state.getfilteredTransportGoods.exteriorWidth*this.state.getfilteredTransportGoods.exteriorHeight
      cubicMeter = volume;
      return volume;
    }
    changeMarkierung = (event: any) : string => {
      markierung = event.value;
      return event.value;
    }
    changeItem = (event: any) : string => {
      item = event.value;
      return event.value;
    }
    changeNumberOfItems = (event: any) : string => {
      numberOfItem = event.value;
      return event.value;
    }
    async onSelect(event: any) {
      this.setState({getfilteredTransportGoods : event.itemData})
      filteredData = this.state.getfilteredTransportGoods;
      console.log(filteredData)

      // const resp = await Axios.get(config.apiEndpoint + `/item/'${this.state.getfilteredTransportGoods.containerTypeId}'`);
      // this.setState({commodity: resp.data.recordset});
      // console.log(this.state.commodity)
     }
     onSelectCommodityGroup = (event: any) => {
      commodityItem = event.itemData; 
      return event.itemData;
     }
    render() { 
        return ( 
            <div className="accordion-general">
            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 allcolumns">
              <div className="each-and-everyitem">
                <TextBoxComponent
                  id="Markierung"
                  placeholder="Markierung"
                  cssClass="e-filled"
                  change={this.changeMarkierung}
                />
              </div>
              <div className="each-and-everyitem">
              <TextBoxComponent
                  id="Artikel"
                  placeholder="Artikel"
                  floatLabelType="Auto"
                  cssClass="e-filled"
                  change={this.changeItem}
                />
              </div>
            </div>
            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 allcolumns">
              <div className="each-and-everyitem">
              <NumericTextBoxComponent
                  id="Anzahl"
                  format='###.##'
                  placeholder="Anzahl"
                  cssClass="e-filled"
                  floatLabelType="Auto"
                  change={this.changeNumberOfItems}
                />
              </div>
              <div className="hausnummer-plz each-and-everyitem">
              <NumericTextBoxComponent
                  id="Gewicht"
                  placeholder="Gewicht"
                  floatLabelType="Auto"
                  cssClass="e-filled"
                  change={this.onGewicht}
                  
                />
                <NumericTextBoxComponent
                  id="Lademeter"
                  placeholder="Lademeter"
                  floatLabelType="Auto"
                  cssClass="e-filled"
                  value={this.onLademeter()}
                />
              </div>
            </div>
            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 allcolumns">
              <div className="each-and-everyitem">
                <AutoCompleteComponent
                  id="Verpackung"
                  dataSource={this.props.containerType}
                  sortOrder="Ascending"
                  fields={{ value: "name" }}
                  autofill={true}
                  placeholder="Verpackung"
                  suggestionCount={5}
                  filterType="StartsWith"
                  select={this.onSelect}
                  value={this.filterCompanyInfos('name')} 
                />
              </div>
              <div className="hausnummer-plz each-and-everyitem">
              <NumericTextBoxComponent
                  id="Kubicmeter"
                  placeholder="Kubicmeter"
                  floatLabelType="Auto"
                  cssClass="e-filled"
                  value={this.onCubicMeter()}
                />
                <AutoCompleteComponent
                  id="exteriorLength"
                  dataSource={this.props.containerType}
                  sortOrder="Ascending"
                  fields={{ value: "exteriorLength" }}
                  autofill={true}
                  placeholder="Länge in meter"
                  floatLabelType="Auto"
                  suggestionCount={5}
                  filterType="StartsWith"
                  select={this.onSelect}
                  value={this.filterCompanyInfos('exteriorLength')} 
                />
              </div>
            </div>
            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 allcolumns">
              <div className="each-and-everyitem">
                <AutoCompleteComponent
                  id="Warengruppe"
                  dataSource={this.props.commodity}
                  fields={{ value: "commodityGroup" }}
                  sortOrder="Ascending"
                  autofill={true}
                  placeholder="Warengruppe"
                  suggestionCount={5}
                  filterType="StartsWith"
                  select={this.onSelectCommodityGroup}
                />
              </div>
              <div className="hausnummer-plz each-and-everyitem">
                <AutoCompleteComponent
                  id="exteriorWidth"
                  dataSource={this.props.containerType}
                  sortOrder="Ascending"
                  fields={{ value: "exteriorWidth" }}
                  autofill={true}
                  placeholder="Breite in meter"
                  floatLabelType="Auto"
                  suggestionCount={5}
                  filterType="StartsWith"
                  select={this.onSelect}
                  value={this.filterCompanyInfos('exteriorWidth')} 
                />
                <AutoCompleteComponent
                  id="exteriorHeight"
                  dataSource={this.props.containerType}
                  sortOrder="Ascending"
                  fields={{ value: "exteriorHeight" }}
                  autofill={true}
                  placeholder="Höhe in meter"
                  floatLabelType="Auto"
                  suggestionCount={5}
                  filterType="StartsWith"
                  select={this.onSelect}
                  value={this.filterCompanyInfos('exteriorHeight')} 
                />
              </div>
            </div>
          </div>
         );
    }
}
 
export default AccordionContentTransportGoods;