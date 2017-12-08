import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { gL } from '../../globalFunctions/globalFunctions.js';
import { questionsCollection } from '../../collections/collection.js';

Meteor.methods({
    //edit button update questions
    'editQuestionMethod'(obj_id,editQuestionData){
        questionsCollection.update({ _id: obj_id},{$set:editQuestionData});
    },
});