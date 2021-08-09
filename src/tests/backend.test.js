
const request = require('supertest');
let server;
describe('Alle infos mit der GET Methode von der Datenbank', () => {
  beforeEach(() => { server = require('../backend/server');})
  afterEach(() => { server.close(); });

    it('Es soll Company Infos von der Datenbank abgerufen werden.', async () => {
      const res = await request(server).get('/');
      expect(res.status).toBe(200);
    })
    it('Es oll eine Auftragnummer von der Datenbank abgerufen werden.', async () => {
      const res = await request(server).get('/customerobjectid');
      expect(res.status).toBe(200);
    })
    it('Es soll transportart von der Datenbank abgerufen werden.', async () => {
      const res = await request(server).get('/trafficmode');
      expect(res.status).toBe(200);
    })
    it('Es soll contactPerson von der Datenbank abgerufen werden.', async () => {
    const res = await request(server).get('/contactPerson');
    expect(res.status).toBe(200);
    })
    it('Es soll contactPerson von der Datenbank abgerufen werden.', async () => {
    const res = await request(server).get('/containerType');
    expect(res.status).toBe(200);
    })

    it('Es soll contactPerson von der Datenbank abgerufen werden.', async () => {
    const res = await request(server).get('/commodityGroup');
    expect(res.status).toBe(200);
    })
    it('Es soll contactPerson von der Datenbank abgerufen werden.', async () => {
    const res = await request(server).get('/commodityGroup');
    expect(res.status).toBe(200);
    })
    it('Es soll die Daten in der Datenbank gespeichert werden.', async () => {
      const res = await request(server).post('/addtransportationgood');
      expect(res.status).toBe(200);
      })
    it('Es soll die Daten in der Datenbank gespeichert werden.', async () => {
      const res = await request(server).post('/addinfos');
      expect(res.status).toBe(200);
      })
});