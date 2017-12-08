import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { gL } from '../../globalFunctions/globalFunctions.js';
import { usersGameHistoryCollection } from '../../collections/collection.js';

Meteor.methods({
    usersGameHistoryMethod(userQnsData){
        
        let id = usersGameHistoryCollection.insert(userQnsData);
        return id;
    }
});
