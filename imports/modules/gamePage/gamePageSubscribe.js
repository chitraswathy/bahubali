import { usersGameHistoryCollection } from '../../collections/collection.js';

Template.gamePage.onCreated(function(){
    this.autorun(()=>{
        this.subscribe('questionsPublish')
        this.subscribe('userQuestionSetPublish',FlowRouter.getParam("userId"))
    });
    // this.autorun(()=>{
    //     let userQnsSet = usersGameHistoryCollection.find({_id:FlowRouter.getParam("userId")}).fetch();
    //     if (userQnsSet != ""){
    //         console.log(userQnsSet)
    //     }
    // });
});