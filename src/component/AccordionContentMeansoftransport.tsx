import * as React from 'react';
import { Component } from 'react';
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { trafficMode} from '../model/TrafficMode';

interface Props {
  modeOfTransport: trafficMode[];
}

class AccordionContentMeansOfTransport extends React.Component<Props, {}> {
 
    render() { 
        return ( 
            <div className="accordion-general">
            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
              <TextBoxComponent
                placeholder="Frachtführer"
                cssClass="e-filled"
                floatLabelType="Auto"
                disabled = {true}
              />
            </div>
            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
              <TextBoxComponent
                placeholder="Fahrzeug"
                cssClass="e-filled"
                floatLabelType="Auto"
              />
            </div>
            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
              <TextBoxComponent
                placeholder="Anhänger"
                cssClass="e-filled"
                floatLabelType="Auto"
                disabled= {true}
              />
            </div>
            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
              <TextBoxComponent
                placeholder="Plombe"
                cssClass="e-filled"
                floatLabelType="Auto"
              />
            </div>
          </div>
         );
    }
}
 
export default AccordionContentMeansOfTransport;