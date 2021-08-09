const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mssql/msnodesqlv8');
const { Client } = require("pg");

app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*'); // to enable calls from every domain 
//   res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE'); // allowed actiosn
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 

//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200); // to deal with chrome sending an extra options request
//   }

//   next(); // call next middlewer in line
// });

const dbConfig = {
    server: 'LAPTOP-E6OURCST\\SQLEXPRESS',
    database: 'TWPRO_GDP_Solution_TEST',
    user: 'LAPTOP-E6OURCST\\idris',
    driver: "msnodesqlv8",
    options: {
      trustedConnection: true
    }
};

const conn = new sql.ConnectionPool(dbConfig, err => {
    if(err){ throw err; }
    console.log('Connected successfully!! ');

});
var client = new Client({
  user: "LAPTOP-E6OURCST\\idris",
  password: "",
  database: "TWPRO_GDP_Solution_TEST",
  port: 5432,
  host: "LAPTOP-E6OURCST\\SQLEXPRESS",
  ssl: true
});
client.connect(function () {
  console.log("connected");
});
app.post('/addinfos', (req, res) => {

  const { 
    orderID ,referenceNumber ,trafficMode ,customer, customerContactPerson, sender, sendingDateStart,
    sendingDateEnd, senderContactPerson, receiver, receivingDateStart, receivingDateEnd, receiverContactPerson, freeText, 
    markierung, numberOfItems, containerType, commodityGroup,  gewicht, cubicMeter, transportationGoodId, item
   } = req.body;
  const INSERT_QUERY = `INSERT INTO [dbo].[XCUSTOMERORDER] ([OBJECTID], [CUSTOMER_OBJECTID], [CUSTOMERCONTACTPERSON_OBJECTID], [PICKUPADDRESS_OBJECTID], [PICKUPTIME],[PICKUPTIME2], [PICKUPADDRESSCONTACTPERSON_OBJECTID],[DELIVERYADDRESS_OBJECTID], [DELIVERYTIME], [DELIVERYTIME2], [DELIVERYADDRESSCONTACTPERSON_OBJECTID],[TRAFFICMODE_OBJECTID]  ,[REFERENCENUMBER],[FREETEXT] ,[TIMESTAMPCREATE] ,[TIMESTAMPEDIT],[USERCREATE],[USEREDIT] ) VALUES ('${orderID}' , '${customer}' ,'${customerContactPerson}', '${sender}', '${sendingDateStart}','${sendingDateEnd}', '${senderContactPerson}','${receiver}', '${receivingDateStart}','${receivingDateEnd}', '${receiverContactPerson}','${trafficMode}' ,'${referenceNumber}', '${freeText}',  SYSDATETIME(),SYSDATETIME(),'IDK','IDK')
  `;
  const INSERT_QTRANSPORTATIONGOOD = `INSERT INTO [dbo].[XTRANSPORTATIONGOOD] ([TRANSPORTORDER_OBJECTID], [COMMODITYGROUP_OBJECTID], [CONTAINERTYPE_OBJECTID], [MARK], [QUANTITY], [VOLUME], [NETWEIGHT], [OBJECTID],[DANGEROUSGOOD], [TIMESTAMPCREATE], [TIMESTAMPEDIT], [USERCREATE],[USEREDIT]) VALUES ('${orderID}', '${commodityGroup}','${containerType}','${markierung}','${numberOfItems}','${cubicMeter}','${gewicht}', '${transportationGoodId}','${item}', SYSDATETIME(), SYSDATETIME(), 'IDK', 'IDK')`;

  client.connect(function () {client.query("begin").then((res) => {
		// next, insert some data into the pets table
		return client.query(INSERT_QUERY)
	}).then((res) => {
		// next, insert some data into the food table
		return client.query(INSERT_QTRANSPORTATIONGOOD)
	}).then((res) => {
		// once that's done, run the commit statement to
		// complete the transaction
		return client.query("commit")
	}).then((res) => {
		// if the transaction completes successfully
		// log a confirmation statement
		console.log("transaction completed")
	})
	.catch((err) => {
		// incase there are any errors encountered
		// rollback the transaction
		console.error("error while querying:", err)
		return client.query("rollback")
	})
	.catch((err) => {
		// incase there is an error when rolling back, log it
		console.error("error while rolling back transaction:", err)
	})
  })})


const GETAUFTRAG_GEBER = "select  com.OBJECTID as id, com.ADDRESS_OBJECTID as addressId, com.REFERENCENUMBER as referenceNumber, com.NAME as name, com.MATCHCODE as matchCode, addr.STREET1 as street ,addr.HOUSENUMBER as hausNr, plc.NAME as place, plc.ZIPCODE as postalCode, l.NAME as country from XCOMPANY com join XADDRESS addr on addr.OBJECTID = com.ADDRESS_OBJECTID join XPLACE plc on plc.OBJECTID = addr.PLACE_OBJECTID join XLAND l on l.OBJECTID = plc.LAND_OBJECTID"
app.get('/', (req,res) => {
  conn.connect().then(function(){
    const request = new sql.Request(conn);
    request.query(GETAUFTRAG_GEBER, (err, result) => {
      if(err) { return res.send(err); }
      else { return res.send(result)}
    })
  })
})
const GETCONTAINERTYPE = "select trans.CONTAINERTYPE_OBJECTID as containerTypeId,con.SHORTNAME as name,con.EXTERIORHEIGHT as exteriorHeight, con.EXTERIORLENGTH as exteriorLength, con.EXTERIORWIDTH as exteriorWidth from XTRANSPORTATIONGOOD trans join XCONTAINERTYPE con on con.OBJECTID = trans.CONTAINERTYPE_OBJECTID"
app.get('/containerType', (req,res) => {
  conn.connect().then(function(){
    req = new sql.Request(conn);
    req.query(GETCONTAINERTYPE).then(response => {
      if (response.recordset == null || response.recordset.length < 1) throw new Error('No object id for new customer order generated');

      res.send(response);
      conn.close()
    }).catch(function(err){
      console.log(err);
      conn.close();
    })
  })
})
const GETWARE= "select OBJECTID as commodityGroupId,DESCRIPTIOND as commodityGroup from XCOMMODITYGROUP"
app.get('/commodityGroup', (req,res) => {
  conn.connect().then(function(){
    req = new sql.Request(conn);
    req.query(GETWARE).then(response => {
      if (response.recordset == null || response.recordset.length < 1) throw new Error('No object id for new customer order generated');

      res.send(response);
      conn.close()
    }).catch(function(err){
      console.log(err);
      conn.close();
    })
  })
})
const GETCONTACTPERSON= "select con.OBJECTID as id, con.NAME as name, con.PHONENUMBER as telephone, con.EMAILADDRESS as mail, con.FAXNUMBER as fax from XCONTACTPERSON con"
app.get('/contactPerson', (req,res) => {
  conn.connect().then(function(){
    req = new sql.Request(conn);
    req.query(GETCONTACTPERSON).then(response => {
      if (response.recordset == null || response.recordset.length < 1) throw new Error('No object id for new customer order generated');

      res.send(response);
      conn.close()
    }).catch(function(err){
      console.log(err);
      conn.close();
    })
  })
})
const GETTRAFFICMODE= "select OBJECTID as id, NAME as name from XTRAFFICMODE"
app.get('/trafficmode', (req,res) => {
  conn.connect().then(function(){
    req = new sql.Request(conn);
    req.query(GETTRAFFICMODE).then(response => {
      if (response.recordset == null || response.recordset.length < 1) throw new Error('No object id for new customer order generated');

      res.send(response);
      conn.close()
    }).catch(function(err){
      console.log(err);
      conn.close();
    })
  })
})
app.get('/customerobjectid', (req, res) => {
  conn.connect().then(function(){
    req = new sql.Request(conn);
    req.query('SELECT NEXT VALUE FOR XOBJECTIDCOUNTER')
      .then(response => {
        if (response.recordset == null || response.recordset.length < 1) throw new Error('No object id for new customer order generated');
        response.data = Object.values(response.recordset[0])[0];
        res.send(response);
        conn.close()
      }).catch(function(err){
        console.log(err);
        conn.close();
      })
  })
})

app.post('/add', (req, res) => {

  const { 
    orderID ,referenceNumber ,trafficMode ,customer, customerContactPerson, sender, sendingDateStart,
    sendingDateEnd, senderContactPerson, receiver, receivingDateStart, receivingDateEnd, receiverContactPerson, freeText, 
    markierung, numberOfItems, containerType, commodityGroup,  gewicht, cubicMeter, transportationGoodId, item
   } = req.body;
  const INSERT_QUERY = `INSERT INTO [dbo].[XCUSTOMERORDER] ([OBJECTID], [CUSTOMER_OBJECTID], [CUSTOMERCONTACTPERSON_OBJECTID], [PICKUPADDRESS_OBJECTID], [PICKUPTIME],[PICKUPTIME2], [PICKUPADDRESSCONTACTPERSON_OBJECTID],[DELIVERYADDRESS_OBJECTID], [DELIVERYTIME], [DELIVERYTIME2], [DELIVERYADDRESSCONTACTPERSON_OBJECTID],[TRAFFICMODE_OBJECTID]  ,[REFERENCENUMBER],[FREETEXT] ,[TIMESTAMPCREATE] ,[TIMESTAMPEDIT],[USERCREATE],[USEREDIT] ) VALUES ('${orderID}' , '${customer}' ,'${customerContactPerson}', '${sender}', '${sendingDateStart}','${sendingDateEnd}', '${senderContactPerson}','${receiver}', '${receivingDateStart}','${receivingDateEnd}', '${receiverContactPerson}','${trafficMode}' ,'${referenceNumber}', '${freeText}',  SYSDATETIME(),SYSDATETIME(),'IDK','IDK')
  `;
  conn.connect().then(() => {
    const request = new sql.Request(conn);
    request.query(INSERT_QUERY, (err,results) => {
      if(err) { return res.send(err); }
      else { return res.send('Successfully added new Order.')}
    })
  })
})

app.post('/addtransportationgood', (req, res) => {
  const { 
    orderID , markierung, numberOfItems, containerType, commodityGroup,  gewicht, cubicMeter, transportationGoodId, item
   } = req.body;

  const INSERT_QTRANSPORTATIONGOOD = `INSERT INTO [dbo].[XTRANSPORTATIONGOOD] ([TRANSPORTORDER_OBJECTID], [COMMODITYGROUP_OBJECTID], [CONTAINERTYPE_OBJECTID], [MARK], [QUANTITY], [VOLUME], [NETWEIGHT], [OBJECTID],[DANGEROUSGOOD], [TIMESTAMPCREATE], [TIMESTAMPEDIT], [USERCREATE],[USEREDIT]) VALUES ('${orderID}', '${commodityGroup}','${containerType}','${markierung}','${numberOfItems}','${cubicMeter}','${gewicht}', '${transportationGoodId}','${item}', SYSDATETIME(), SYSDATETIME(), 'IDK', 'IDK')`;

  conn.connect().then(() => {
    const request = new sql.Request(conn);
    request.query(INSERT_QTRANSPORTATIONGOOD, (err,results) => {
      if(err) { return res.send(err); }
      else { return res.send('Successfully added TransportationGood.')}
    })
  })
})

app.post('/test', (req, res) => {

  const { FREETEXT,orderID ,contracter ,sender,receiver,referenceNumber, } = req.body;
  let INSERT_QUERY = `INSERT INTO [dbo].[XCUSTOMERORDER] ([OBJECTID], [CUSTOMER_OBJECTID],[REFERENCENUMBER],[FREETEXT] ,[TIMESTAMPCREATE] ,[TIMESTAMPEDIT],[USERCREATE],[USEREDIT] ) VALUES ('${orderID}' , '${contracter}' ,'${referenceNumber}', '${FREETEXT}',  SYSDATETIME(),SYSDATETIME(),'IDK','IDK')`;
  conn.connect().then(pool => {
    return pool.query(INSERT_QUERY);
  }).then(result => {
    return res.send('Successfully added product');
  }).catch(error => {
    return res.send(error);
  });
})
// app.delete('/delete/:Empno', (req, res) => {
//   const {Empno } = req.params;
//   const DELETE_QUERY = `DELETE FROM emp WHERE Empno = ${Empno}`;

//   conn.connect().then(() => {
//     const request = new sql.Request(conn);
//     request.query(DELETE_QUERY, err => {
//       if(err) { return res.send(err); }
//       else { return res.send('Successfully deleted!');}
//     })
//   })
// })

const PORT = 5000;
const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`));

module.exports = server;