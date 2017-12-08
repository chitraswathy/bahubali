import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { gL } from '../../globalFunctions/globalFunctions.js';
import { usersGameHistoryCollection } from '../../collections/collection.js';

Meteor.methods({
    userQnsAnswerUpdateMethod(obj_id, correctQnsCount, wrongQnsCount, correctAnsArray, wrongAnsArray, userTotalScore) {
        usersGameHistoryCollection.update({ _id: obj_id }, {
            $set: {
                rightAttemptCount: correctQnsCount,
                wrongAttemptCount: wrongQnsCount,
                qnsAnsweredRight: correctAnsArray,
                qnsAnsweredWrong: wrongAnsArray,
                totalScore: userTotalScore,
                userFinishedStatus : 1
            }
        });
    }
});

