import * as sinon from 'sinon';
import * as chai from 'chai';
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const { expect } = chai;

import UserService from '../service/userService';
import Users from '../database/models/Users';

const mockToken = 'umToken'

describe('Testando classe UserSerice',()=>{
    describe('Testando método login',() => {
        const invalidPass = 'senha_errada'
        const invalidEmail = 'umemail@errado.com'
        beforeEach(()=>{
            sinon.stub(Users,'findOne').resolves()
        })
        after(()=>{
            (Users.findOne as sinon.SinonStub).restore()
        })
        it('Caso usuário passado não exista ou dados estejam incorretos',async()=> {
            const service = new UserService();
            const invalidLogin = await service.login(invalidPass,invalidEmail);

            expect(invalidLogin).to.deep.equal({})
        })
    })
    describe('Caso todos os dados sejam passados corretamente',()=>{
        const validEmail = 'admin@admin.com'
        const validPass = 'secret_admin'
        


        const mockUser:any = {
            user:{
                id: 1,
                username: 'Admin',
                role: 'admin',
                password: 'secret_admin',
                email: 'admin@admin.com',
            }
        }
        const mockResult: any = {
            user: {
                id: mockUser.id,
                username: mockUser.username,
                role: mockUser.role,
                email: mockUser.email,
            },
            token: mockToken,
          };


        beforeEach(()=> {
            sinon.stub(Users,'findOne').resolves(mockUser)

            sinon.stub(bcryptjs, 'compareSync').returns(true);

            sinon.stub(jwt, 'sign').returns(mockToken);
        })

        after(() => {
            (Users.findOne as sinon.SinonStub).restore();
            (bcryptjs.compareSync as sinon.SinonStub).restore();
            (jwt.sign as sinon.SinonStub).restore();
          });
    
        it('Retorna um Objeto com todas as propriedades esperadas',async () =>{
            const service = new UserService();
            const result = await service.login(validPass,validEmail);

            expect(result).to.deep.equal(mockResult)
        })
    })
})
describe('Testa método de validateToken',()=>{
    const invalidToken = 'umtokenválido'
    beforeEach(()=>{
        sinon.stub(jwt,'verify').returns(false);
    })
    after(() =>{
        (jwt.verify as sinon.SinonStub).restore();
    })
    it('Retorna um objeto vazio',() => {
        const service = new UserService();
        const token = service.validateToken(invalidToken);

        expect(token).to.deep.equal({})
    })
})