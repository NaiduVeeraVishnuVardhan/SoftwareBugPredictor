const mockingoose = require('mockingoose');
const resultModel = require('../models/result');

describe('Testing Results Model', () => {
    it('Enusre FindById Works', () => {
        const _doc = {
            _id: '60b33d866594d707192a6116',
            date: "1995-12-16T16:24:00.000Z",
            ownerId: '007f137e810c19747de860da',
            name: 'Test Result'
        };

        mockingoose(resultModel).toReturn(_doc, 'findOne');

        return resultModel.findById({ _id: '60b33d866594d707192a6116' }).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });
    });

    it('Enusre Update Works', () => {
        const _doc = {
            _id: '60b33d866594d707192a6116',
            date: "1995-12-16T16:24:00.000Z",
            ownerId: '007f137e810c19747de860da',
            name: 'Test Result'
        };

        mockingoose(resultModel).toReturn(_doc, 'update');

        return resultModel
            .update({ name: 'changed' }) // this won't really change anything
            .where({ _id: '60b33d866594d707192a6116' })
            .then(doc => {
                expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
            });
    });
});