import { Mongo }         from 'meteor/mongo';
import { Meteor }        from 'meteor/meteor';

export const questionsCollection            = new Meteor.Collection("Questions");
export const usersGameHistoryCollection     = new Meteor.Collection("usersGameHistory");