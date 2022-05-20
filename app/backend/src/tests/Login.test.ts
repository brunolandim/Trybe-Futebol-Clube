import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse: Response;

describe('teste da rota /login', () => {

  before(async() => {
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
