const mockingoose = require('mockingoose');

const {userDetails} = require('../models/user');

describe('Testing User Model', () => {
  it('Enusre FindById Works', () => {
    const _doc = {
      _id: '007f137e810c19747de860da',
      username: 'test',
      password: 'test',
    };

    mockingoose(userDetails).toReturn(_doc, 'findOne');

    return userDetails.findById({ _id: '007f137e810c19747de860da' }).then(doc => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
    });
  });

  it('Enusre Update Works', () => {
    const _doc = {
      _id: '007f137e810c19747de860da',
      name: 'test',
      email: 'test',
    };

    mockingoose(userDetails).toReturn(_doc, 'update');

    return userDetails
      .update({ name: 'changed' }) // this won't really change anything
      .where({ _id: '007f137e810c19747de860da' })
      .then(doc => {
        expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
      });
  });
});