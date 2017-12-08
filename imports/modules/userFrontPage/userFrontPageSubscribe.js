
Template.userFrontPage.onCreated(function(){
    this.autorun(()=>{
        this.subscribe('questionsPublish'),
        this.subscribe('allUserQuestionSetPublish'),
        this.subscribe('remainingQnsPublish')        
        // this.subscribe('companyNamePublish',Meteor.userId()),
    });
});