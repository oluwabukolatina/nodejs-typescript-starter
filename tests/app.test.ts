import * as chai from 'chai';
import app from '../src/app';

import 'mocha';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

describe('Hello API Request', () => {
  it('should return hello on call', async () => chai
    .request(app)
    .get('/')
    .then((res) => {
      chai.expect(res.text).to.eql('hello');
    }));
});
