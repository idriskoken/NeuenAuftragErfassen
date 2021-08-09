import React, { Component } from "react";
import Axios from 'axios';
import {
  ButtonComponent,
} from "@syncfusion/ej2-react-buttons";
import {
  DialogComponent,
  ButtonPropsModel,
} from "@syncfusion/ej2-react-popups";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
  AccordionComponent,
  AccordionItemsDirective,
  AccordionItemDirective,
} from "@syncfusion/ej2-react-navigations";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import "./CustomerOrderOverview.css";
import {companyModel, employeeModel, /*orderModel, createEmptyOrder*/} from '../model/model';
import config from '../services/config.json';
import {CompanyType, createEmptyCompany} from '../model/CompanyModel'
import { servicesVersion } from "typescript";
import { CustomerOrderType, createEmptyCustomerOrder} from '../model/CustomerOrderModel'
import AccordionContentCustomerInfos, { getCustomerInfos} from './AccordionContentCustomerInfos';
import {getMasterData} from './AccordionMasterData';
import AccordionSender, {getSender} from './AccordionSender';
import AccordionMasterData from './AccordionMasterData';
import AccordionContentMeansOfTransport from './AccordionContentMeansoftransport';
import AccordionContentTransportGoods, {getTransportGoods} from './AccordionContentTranportGoods';
import {ContainerType, createEmptyContainerType} from '../model/ContainerType';
import {commodityGroup, createEmptyCommodityGroup} from '../model/CommodityGroup'
import {ContactPersonType, createEmptyContactPerson} from '../model/ContactPersonModel'
import { trafficMode, createEmptyTrafficMode } from '../model/TrafficMode'
import AccordionReceiver, {getReceiver} from "./AccordionReceiver";


interface State {
  hideDialog: boolean;
  trafficMode: trafficMode[];
  getCustomer: CompanyType[];
  currentOrder: CustomerOrderType ;
  currentOrderId: number;
  transportationGoodId: number;
  freeText: string
  containerType: ContainerType[];
  commodityGroup: commodityGroup[];
  customercontactperson: ContactPersonType[];
  filteredSenderCompany: CompanyType;
  filteredReceiverCompany: CompanyType;
  filteredSenderContactPerson: ContactPersonType;
  filteredReceiverContactPerson: ContactPersonType;
  senderPickupStart: Date;
  senderPickupEnd: Date;
  receiverPickupStart: Date;
  receiverPickupEnd: Date;
}
class CustomerOrderOverview extends Component<{}, State> {
  buttons: ButtonPropsModel[];
  accInstance: AccordionComponent | null = new AccordionComponent('');
  constructor(props: {}) {
    super(props);
    this.state = {
      hideDialog: false,
      trafficMode: [],
      getCustomer:[],
      currentOrder: createEmptyCustomerOrder(),
      currentOrderId: 0,
      transportationGoodId: 0,
      freeText: '',
      containerType: [],
      commodityGroup: [],
      customercontactperson: [],
      filteredSenderCompany: createEmptyCompany(),
      filteredReceiverCompany: createEmptyCompany(),
      filteredSenderContactPerson: createEmptyContactPerson(),
      filteredReceiverContactPerson: createEmptyContactPerson(),
      senderPickupStart: new Date(),
      senderPickupEnd: new Date(),
      receiverPickupStart: new Date(),
      receiverPickupEnd: new Date(),

    };
    
    this.buttons = [
      {
        click:() => this.setState({hideDialog: false}),
        buttonModel: {
          content: "Auftrag verwerfen",
          isPrimary: false,
        },
      },
      {
        click:this.orderSave,
        buttonModel: {
          content: "Auftrag abschließen",
          isPrimary: true,
        },
      },
    ];
    this.onClickShowOrderDetails = this.onClickShowOrderDetails.bind(this);
  }
  
  async componentDidMount () {
    
    const response = await Axios.get(config.apiEndpoint);
    console.log('mount vorher: ' + this.state.getCustomer.length);
    console.log(response.data.recordset);
    this.setState({getCustomer: response.data.recordset});
    
    const res = await Axios.get(config.apiEndpoint + '/containerType');
    this.setState({containerType: res.data.recordset});
    console.log(this.state.containerType)

    const resp = await Axios.get(config.apiEndpoint + '/commodityGroup');
    this.setState({commodityGroup: resp.data.recordset});
    console.log(this.state.commodityGroup)
    
    const respo = await Axios.get(config.apiEndpoint + '/contactPerson');
    this.setState({customercontactperson: respo.data.recordset});
    console.log(this.state.customercontactperson)

    const respon = await Axios.get(config.apiEndpoint + '/trafficmode');
    this.setState({trafficMode: respon.data.recordset});
    console.log(this.state.trafficMode)

    this.accInstance?.refresh();
  }
  // handlePost = async () => {
  //   const obj = JSON.stringify({
  //     FREETEXT : 'test von IDK !!!',
  //     orderID : this.state.currentOrderId
  //     // Empno: 105,
  //     // Ename: 'Jale',
  //     // Salary: 4500,
  //     // Department: 'Marketing',
  //   })
  //   try{
  //     await Axios.post(config.apiEndpoint + '/add', obj ,{headers:{"Content-Type" : "application/json"}});
  //     // const employee = [employee1, ...this.state.employee];
  //     // this.setState({employee});
  //   }catch(err){throw err;};

  // }
  // handleDelete = async (emp: employeeModel) => {
  //   // const originalEmployee = this.state.employee;
  //   // const employee = this.state.employee.filter(e => e.Empno !== emp.Empno);
  //   // this.setState({employee});
  //   try{
  //     await Axios.delete(config.apiEndpoint + '/delete/'+emp.Empno);
  //     alert('deleted')
  //   }catch(ex) {
  //     if(ex.response && ex.response.status === 404)
  //       alert("This employee has already been deleted.");
  //     // this.setState({employee: originalEmployee});
  //   };
  // }
  dlgButtonClick(): void {
    this.setState({hideDialog: false});
  }
  dialogClose(): void {
    this.setState({ hideDialog: false });
    
  }
  dialogOpen(): void {
  }
  orderSave = async () => {
    
    const obj = JSON.stringify({
      orderID : this.state.currentOrderId,
      transportationGoodId: this.state.transportationGoodId,
      referenceNumber: getMasterData().referenceNum,
      trafficMode: getMasterData().trafficMod,
      customer : getCustomerInfos().filteredData.id,
      customerContactPerson: getCustomerInfos().filteredContactPers.id,
      sender : getSender().sender.addressId,
      sendingDateStart: getSender().dateStart,
      sendingDateEnd: getSender().dateEnd,
      senderContactPerson: getSender().filteredContactPers.id,
      receiver: getReceiver().receiver.addressId,
      receivingDateStart: getReceiver().dateStart,
      receivingDateEnd: getReceiver().dateEnd,
      receiverContactPerson: getReceiver().filteredContactPers.id,
      markierung: getTransportGoods().markierung,
      numberOfItems: getTransportGoods().numberOfItem,
      containerType: getTransportGoods().filteredData.containerTypeId,
      commodityGroup:getTransportGoods().commodityItem.commodityGroupId,
      item: getTransportGoods().item,
      gewicht:getTransportGoods().gewicht,
      ladeMeter: getTransportGoods().lademeter,
      cubicMeter:getTransportGoods().cubicMeter,
      freeText: this.state.freeText,
    })
    if(getMasterData().trafficMod!="" && getCustomerInfos().filteredData.name !="" && getCustomerInfos().filteredData.name !="" 
      && getSender().sender.name!="" && getSender().dateStart!=null && getSender().dateEnd!=null && getReceiver().receiver.name!="" 
      && getReceiver().dateStart!=null && getReceiver().dateEnd!=null && getTransportGoods().filteredData.containerTypeId != null
      && getTransportGoods().commodityItem.commodityGroupId!= null && getTransportGoods().item!= null && getTransportGoods().gewicht !=null
      && getTransportGoods().lademeter != null)
      {
        try{
        await Axios.post(config.apiEndpoint + '/addinfos', obj ,{headers:{"Content-Type" : "application/json"}});
        await Axios.post(config.apiEndpoint + '/addtransportationgood', obj ,{headers:{"Content-Type" : "application/json"}})

        alert("Die Daten erfolgreich gespeichert.");
        this.setState({hideDialog: false})
        }catch(err){throw err;};
      }
    else{ alert("Bitte füllen Sie erforderliche Pflichtfelder aus!!!")}
  }
  
  async onClickShowOrderDetails() {
    const newOrder = createEmptyCustomerOrder();
    this.setState({currentOrder: newOrder});
    this.setState({ hideDialog: true });
    const response = await Axios.get(config.apiEndpoint + '/customerobjectid')
    this.setState({currentOrderId: response.data.data})
    const respon = await Axios.get(config.apiEndpoint + '/customerobjectid')
    this.setState({transportationGoodId: respon.data.data})
    console.log(this.state.currentOrderId)
    console.log(this.state.transportationGoodId)
    this.accInstance?.refresh();
  }
  
  dialogHeader = () : JSX.Element => {
    return (
      <div className="dialog-header">
        Neuen Auftrag erfassen
        {/* <ButtonComponent cssClass="e-info">Drucken</ButtonComponent> */}
      </div>
    );
  };
  changeRemarks = (event: any) => {
    this.setState({freeText: event.value }) ;
  }
  accordionContentMasterData = () : JSX.Element => {
    return (
      <AccordionMasterData trafficMode={this.state.trafficMode} currentOrderId={this.state.currentOrderId} />
    );
  };
  accordionContentCustomerInfos = () : JSX.Element => {
    return (
      <AccordionContentCustomerInfos 
        getCustomer={this.state.getCustomer} contactPerson={this.state.customercontactperson} />
    );
  };
  accordionSenderAdresse = (startTime : string, endTime : string) : JSX.Element => {
    return (
      <AccordionSender
        companyInfos={this.state.getCustomer} 
        deliveryStart={startTime} 
        deliveryEnd={endTime}
        contactPerson={this.state.customercontactperson}
        />
    );
  };
  accordionPickupAdresse = (startTime : string, endTime : string) : JSX.Element => {
    return (
      <AccordionReceiver
        companyInfos={this.state.getCustomer} 
        deliveryStart={startTime} 
        deliveryEnd={endTime}
        contactPerson={this.state.customercontactperson}
        />
    );
  };
  accordionContentMeansOfTransport = () : JSX.Element => {
    return (
      <AccordionContentMeansOfTransport modeOfTransport={this.state.trafficMode} />
    );
  };
  accordionContentTransportGoods = () : JSX.Element => {
    return (
      <AccordionContentTransportGoods containerType={this.state.containerType} commodity={this.state.commodityGroup} />
    );
  };
  accordionContentRemarks = () : JSX.Element => {
    return (
      <div className="accordion-general">
        <TextBoxComponent 
        multiline={true} 
        placeholder=""
        change={this.changeRemarks}
         />
      </div>
    );
  };
  
tabContent = () : JSX.Element => {
    return (
      <AccordionComponent enablePersistence={true} ref={acc => this.accInstance = acc} >
        <AccordionItemsDirective>
          <AccordionItemDirective
            header="Stammdaten"
            expanded={true}
            content={this.accordionContentMasterData}
          />
          <AccordionItemDirective
            header="Auftraggeber"
            expanded={true}
            content={this.accordionContentCustomerInfos}
          />
          <AccordionItemDirective
            header="Abholadresse"
            expanded={true}
            content={() => this.accordionSenderAdresse('Abhol von', 'Abhol bis')}
          />
          <AccordionItemDirective
            header="Lieferadresse"
            expanded={true}
            content={() => this.accordionPickupAdresse('Liefer von', 'Liefer bis')}
          />
          {/* <AccordionItemDirective
            header="Transportmittel"
            expanded={true}
            content={this.accordionContentMeansOfTransport}
          /> */}
          <AccordionItemDirective
            header="Transportgut"
            expanded={true}
            content={this.accordionContentTransportGoods}
          />
          <AccordionItemDirective
            header="Bemerkungen"
            expanded={true}
            content={this.accordionContentRemarks}
          />
        </AccordionItemsDirective>
      </AccordionComponent>
    );
  };
  render(): JSX.Element {
    return (
      <div className="control-pane">
        <div
          id="targetElement"
          className="control-section col-lg-12 defaultDialog dialog-target"
        >
          <ButtonComponent
            iconCss="e-btn-sb-icon e34a"
            iconPosition="Right"
            onClick={this.onClickShowOrderDetails}
          >
            {" "}
            Neuen Auftrag erfassen
          </ButtonComponent>
          <DialogComponent
            id="defaultdialog"
            showCloseIcon={true}
            visible={this.state.hideDialog}
            width={"70%"}
            target={"#targetElement"}
            header={this.dialogHeader}
            enableResize={true}
            isModal={true}
            buttons={this.buttons}
            open={this.dialogOpen.bind(this)}
            close={this.dialogClose.bind(this) || this.dlgButtonClick.bind(this)}
            content = {this.tabContent}
            closeOnEscape = {true}
          >
          </DialogComponent>
        </div>
      </div>
    );
  }
}

export default CustomerOrderOverview;
