import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { gL } from '../../globalFunctions/globalFunctions.js';
import { questionsCollection } from '../../collections/collection.js';

Meteor.methods({
    //delete button update question
    'deleteQuestionMethod'(obj_id) {
        questionsCollection.update({ _id: obj_id }, { $set: { "deleteFlag": 1 } });
    },
});