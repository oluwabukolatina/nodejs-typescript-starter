import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import app from '../src/app';

chai.use(chaiHttp);

describe('Hello API Request', () => {
  it('should return response on call', () => chai
    .request(app)
    .get('/')
    .then((res) => {
      console.log(res.text);
      chai.expect(res.text).to.eql('Hello Node/Typescript starter!');
    }));
});
