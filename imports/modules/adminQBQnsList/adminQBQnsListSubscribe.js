
Template.adminQBQnsList.onCreated(function(){
    this.autorun(()=>{
        this.subscribe('questionsPublish')
        // this.subscribe('companyNamePublish',Meteor.userId()),
    });
});