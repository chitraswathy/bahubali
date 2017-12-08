import './adminQBEdit.html';
import './adminQBEditSubscribe.js';
import { gL } from '../../globalFunctions/globalFunctions.js';
import ckeditor from 'ckeditor';
import { questionsCollection } from '../../collections/collection.js';

Template.adminQBEdit.onRendered(function () {
    //CKEDITOR begin//
    CKEDITOR.editorConfig = function (config) {
        config.language = 'es';
        config.uiColor = '#F7B42C';
        config.height = 300;
        config.toolbarCanCollapse = true;
    };
    CKEDITOR.replace('editorE1');
    CKEDITOR.replace('editorE2');
    CKEDITOR.replace('editorE3');
    CKEDITOR.replace('editorE4');
    CKEDITOR.replace('editorE5');
    //CKEDITOR end//
});

Template.adminQBEdit.onCreated(function () {

});

Template.adminQBEdit.events({
    "click #btnCancel"(event,instance){
        FlowRouter.go('/adminQBQnsList');
    },

    "click #btnUpdate"(event, instance) {
        let data1 = CKEDITOR.instances.editorE1.document.getBody().getText(),
            data2 = CKEDITOR.instances.editorE2.document.getBody().getText(),
            data3 = CKEDITOR.instances.editorE3.document.getBody().getText(),
            data4 = CKEDITOR.instances.editorE4.document.getBody().getText(),
            data5 = CKEDITOR.instances.editorE5.document.getBody().getText(),
            correctAnswer = $("input:radio[name=answers]:checked").val(),
            qnsObj = {}, sequenceNo;

        if (data1 != "\n" && data2 != "\n" && data3 != "\n" && data4 != "\n" && data5 != "\n" && correctAnswer != undefined) {
            let editData = questionsCollection.find({_id:FlowRouter.getParam("id")}).fetch();

            qnsObj = {
                question: data1,
                answer1: data2,
                answer2: data3,
                answer3: data4,
                answer4: data5,
                correctAns: correctAnswer,
                createdAt: editData[0].createdAt,
                editedAt : new Date(),
                deleteFlag : editData[0].deleteFlag
            };

            // console.log(qnsObj)
            // console.log(editData[0]._id)

            Meteor.call('editQuestionMethod', editData[0]._id, qnsObj, function (error) {
                if (error) {
                    console.log(error);
                } else {
                    Materialize.toast("Question updated successfully", 3000, '#4caf50 green');
                    // instance.find("#idQuestionEditForm").reset();
                    // CKEDITOR.instances.editorE1.setData('');
                    // CKEDITOR.instances.editorE2.setData('');
                    // CKEDITOR.instances.editorE3.setData('');
                    // CKEDITOR.instances.editorE4.setData('');
                    // CKEDITOR.instances.editorE5.setData('');
                    // setTimeout(function(){ 
                        FlowRouter.go('/adminQBQnsList');
                    // }, 2000);
                }
            });

        } else {
            Materialize.toast("Please fill mandatory the fields", 2000, '#f44336 red');
        }
    }
});

Template.adminQBEdit.helpers({

});