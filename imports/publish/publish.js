import { Meteor }                       from 'meteor/meteor';
import { Mongo }                        from 'meteor/mongo';
import { questionsCollection }          from '../collections/collection.js';
import { usersGameHistoryCollection }   from '../collections/collection.js';

Meteor.publish('questionsPublish',()=>{ 
    return questionsCollection.find({});
});

Meteor.publish('qnsEditPublish',(qnsRecordId)=>{
    return questionsCollection.find({_id:qnsRecordId});
});

Meteor.publish('userQuestionSetPublish',(userId)=>{
    return usersGameHistoryCollection.find({_id:userId});
});

Meteor.publish('allUserQuestionSetPublish',()=>{
    return usersGameHistoryCollection.find({});
});