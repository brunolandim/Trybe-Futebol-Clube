import * as sinon from 'sinon';
import * as chai from 'chai';
const jwt = require('jsonwebtoken');
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';
import Matches from '../database/models/Matches';
import { Match } from '../interfaces/interfacesParaTeste/InterfaceMatch';

chai.use(chaiHttp);

const { expect } = chai;
const mockToken = 'umtokenqualquer'

let chaiHttpResponse: Response;

describe('teste da rota /login', () => {

  beforeEach(async() => {
    sinon.stub(Users,'findOne').resolves({
      id:2,
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
    } as Users)
  })
  after(() => {
    (Users.findOne as sinon.SinonStub).restore();
  })
  it('retorna um objeto user com as propriedades esperadas ', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email:'user@user.com',
      password:'secret_user',
    })
    expect(chaiHttpResponse.body.user).to.have.a.property('id');
    expect(chaiHttpResponse.body.user).to.have.a.property('username');
    expect(chaiHttpResponse.body.user).to.have.a.property('role');
    expect(chaiHttpResponse.body.user).to.have.a.property('email');
    expect(chaiHttpResponse.body).to.have.a.property('token');
  });
});
describe('teste da rota /matches ',()=>{
  const mockResult:Match[] = [
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 41,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Internacional"
      }
    }
  ]
  beforeEach(async() => {
    sinon.stub(Matches,'findAll').resolves(mockResult as Matches[])
    sinon.stub(jwt,'verify').returns(true)
  })
  after(() => {
    (Matches.findAll as sinon.SinonStub).restore();
    (jwt.verify as sinon.SinonStub).restore();
  })
  it('retorna um objeto user com as propriedades esperadas ', async () => {
    chaiHttpResponse = await chai.request(app).post('/matches').set({Authorization:mockToken}).send({
      homeTeam: 1,
      awayTeam: 2,
      homeTeamGoals: 1,
      awayTeamGoals: 1,
      inProgress: true,
    })

    expect(chaiHttpResponse.body).to.have.a.property('homeTeam');
    expect(chaiHttpResponse.body).to.have.a.property('awayTeam');
    expect(chaiHttpResponse.body).to.have.a.property('homeTeamGoals');
    expect(chaiHttpResponse.body).to.have.a.property('awayTeamGoals');
    expect(chaiHttpResponse.body).to.have.a.property('inProgress');
  });
})
