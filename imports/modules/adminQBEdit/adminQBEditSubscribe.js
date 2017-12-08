import { questionsCollection } from '../../collections/collection.js';

Template.adminQBEdit.onCreated(function () {

    this.autorun(function () {
        let qnsData = questionsCollection.find({}).fetch();

        console.log(qnsData)
        if (qnsData != "" && qnsData.length == 1) {
           
            console.log(qnsData)
            setTimeout(function(){ 
                CKEDITOR.instances.editorE1.setData(qnsData[0].question);
                CKEDITOR.instances.editorE2.setData(qnsData[0].answer1);
                CKEDITOR.instances.editorE3.setData(qnsData[0].answer2);
                CKEDITOR.instances.editorE4.setData(qnsData[0].answer3);
                CKEDITOR.instances.editorE5.setData(qnsData[0].answer4);                
            }, 2000);
            
            let correctAns = qnsData[0].correctAns;
            // console.log(correctAns);
            if(correctAns.includes(1))
                $('#idAnswerOne').attr('checked', true);
            if(correctAns.includes(2))
                $('#idAnswerTwo').attr('checked', true);
            if(correctAns.includes(3))
                $('#idAnswerThree').attr('checked', true);
            if(correctAns.includes(4))
                $('#idAnswerFour').attr('checked', true);

        }
    });

    this.autorun(() => {
        this.subscribe('qnsEditPublish', FlowRouter.getParam("id"))
        // this.subscribe('companyNamePublish',Meteor.userId()),
    });
});