
Template.successPage.onCreated(function(){
    this.autorun(()=>{
        this.subscribe('userQuestionSetPublish',FlowRouter.getParam("userId"))
        // this.subscribe('companyNamePublish',Meteor.userId()),
    });
});