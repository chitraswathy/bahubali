import './successPage.html';
import './successPageSubscribe.js';
import { gL } from '../../globalFunctions/globalFunctions.js';
import { usersGameHistoryCollection }   from '../../collections/collection.js';

Template.successPage.onRendered(function () {

});

Template.successPage.onCreated(function () {

});

Template.successPage.events({
    'click #btnCommit'(event,instance){
        FlowRouter.go('/playGame');
    }
});

Template.successPage.helpers({
    finalScoreDisplay() {
        if (Template.instance().subscriptionsReady()) {
            let score = usersGameHistoryCollection.find({_id:FlowRouter.getParam("userId"),userFinishedStatus:1},{fields:{totalScore:1}}).fetch();            
            return score[0].totalScore;
        }
    }
});