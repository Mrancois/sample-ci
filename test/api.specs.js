var request = require('supertest');
var api = require('../index');

describe('API', function() {
  /*
  describe('GET /', function() {
    it('should return Hello World', function() {
      return request(api)
      .get('/')
      .send()
      .expect('Hello world');
    });
  });
  */
  describe('Contacts', function() {
    it('GET /contacts should return the of registered contacts', function() {
      return request(api)
      .get('/contacts')
      .send()
      .expect(200);
    });

    it('GET /contacts/:name should return the of registered contacts with the same name', function() {
      return request(api)
      .get('/contacts/foo')
      .send()
      .expect(200)
      .expect(function(res, err) {
        return res.body instanceof Array
      });
    });

    it('POST /contacts should create a new contact', function() {
      return request(api)
      .post('/contacts')
      .send({
        contact : {
          name: 'toto'
        }
      })
      .expect(200);
    });

    it('PUT /contacts/:name should update all contacts with the same name', function(){
      return request(api)
      .put('/contacts/foo/bar')
      .send()
      .expect(200);
    });

    it('DELETE /contacts/:name should remove all contacts with the same name', function(){
      return request(api)
      .delete('/contacts/foo')
      .send()
      .expect(200);
    });



  });


});
