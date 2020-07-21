import * as chai from 'chai';
import app from '../src/app';
import 'mocha';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

describe('Test', () => {
  it('should return response on call of base url /', () => chai.request(app).get('/')
    .then((res) => {
      console.log(res.text);
      chai.expect(res.text).to.eql('Hello Node/Typescript starter!');
    }));
});
