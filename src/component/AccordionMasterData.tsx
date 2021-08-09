import * as React from 'react';
import { Component } from 'react';
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import {
    ComboBoxComponent,
  } from "@syncfusion/ej2-react-dropdowns";
  import { trafficMode, createEmptyTrafficMode } from '../model/TrafficMode'

interface Props {
  trafficMode: trafficMode[] ; currentOrderId: any;
}
var referenceNum: any;
var trafficMod: string;
export function getMasterData() {
  return {referenceNum, trafficMod};
}
class AccordionMasterData extends React.Component<Props, {}> {
  onChange = (event: any) => {
    referenceNum = event.value;
  }
  selectTrafficMode = (event: any) => {
    trafficMod = event.item.id;
    console.log(trafficMod);
  }
    render() { 
      console.log('render Stammdaten: ' + this.props.currentOrderId);
        return ( 
            <div className="accordion-general">
            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
              <TextBoxComponent
                placeholder="Auftrags-ID"
                cssClass="e-filled"
                floatLabelType="Auto"
                disabled={true}
                value= {this.props.currentOrderId} 
              />
            </div>
            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
              <TextBoxComponent
                placeholder="Status"
                cssClass="e-filled"
                floatLabelType="Auto"
                disabled={true}
              />
            </div>
            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
              <TextBoxComponent
                placeholder="Referenz-Nr"
                cssClass="e-filled"
                floatLabelType="Auto"
                change={this.onChange}
                name='Referenz-Nr'
              />
            </div>
            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6" >
              <ComboBoxComponent
                dataSource={this.props.trafficMode}
                fields={{value: "name" }}
                placeholder="Transportart"
                cssClass="e-filled"
                floatLabelType="Auto"
                name="Transportart"
                select={this.selectTrafficMode}
              />
            </div>
          </div> 
         );
    }
}
 
export default AccordionMasterData;