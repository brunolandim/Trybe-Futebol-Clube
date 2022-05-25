import * as sinon from 'sinon';
import * as chai from 'chai';
const {expect} = chai;

import Matches from '../database/models/Matches';
import MatchesService from '../service/matchesService'

import {Match} from '../interfaces/interfacesParaTeste/InterfaceMatch'

describe('Testa a class MatchesService',()=>{
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
    const mockInProgres:Match[] =[
        {
          "id": 1,
          "homeTeam": 16,
          "homeTeamGoals": 1,
          "awayTeam": 8,
          "awayTeamGoals": 1,
          "inProgress": true,
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
    const mockInProgresFalse:Match[] = [
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
          "inProgress": false,
          "teamHome": {
            "teamName": "São Paulo"
          },
          "teamAway": {
            "teamName": "Internacional"
          }
        }
      ]
    describe('getMachers',()=>{
        beforeEach(async ()=>{
            sinon.stub(Matches, 'findAll').resolves(
                mockResult as Matches[]
            )
        })
        after(()=>{
            (Matches.findAll as sinon.SinonStub).restore()
        })
    
        it('Testa o médodo getMatches retorna um objeto com as propriedades esperadas',async() => {
            const service = new MatchesService()
            const result = await service.getMachers()
            
            expect(result).to.been.equal(mockResult);
        })
    })
    describe('inProgress',()=>{
        beforeEach(async ()=>{
            sinon.stub(Matches, 'findAll').resolves(
                mockInProgres as Matches[]
            )
        })
        after(()=>{
            (Matches.findAll as sinon.SinonStub).restore()
        })
    
        it('testa se o método retorno o objeto com o valor "true" na chave inProgress',async()=>{
            const service = new MatchesService()
            const result = await service.inProgressMatch()
            
            expect(result).to.been.equal(mockInProgres);
        })
    })
    describe('InProgressMatchFalse',()=>{
        beforeEach(async ()=>{
            sinon.stub(Matches, 'findAll').resolves(
                mockInProgresFalse as Matches[]
            )
        })
        after(()=>{
            (Matches.findAll as sinon.SinonStub).restore()
        })
    
        it('testa se o método retorno o objeto com o valor "false" na chave inProgress',async()=>{
            const service = new MatchesService()
            const result = await service.InProgressMatchFalse()
            
            expect(result).to.been.equal(mockInProgresFalse);
        })
    })
    
})