import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { gL } from '../../globalFunctions/globalFunctions.js';
import { questionsCollection } from '../../collections/collection.js';

Meteor.methods({

    questionsCollectionCount() {
        return questionsCollection.find({deleteFlag:0}).count();
    },

    addQuestionMethod(qnsData){
        questionsCollection.insert(qnsData);
    }
});