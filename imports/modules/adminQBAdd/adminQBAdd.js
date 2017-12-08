import './adminQBAdd.html';
import './adminQBAddSubscribe.js';
import { gL } from '../../globalFunctions/globalFunctions.js';
import ckeditor from 'ckeditor';
import { questionsCollection } from '../../collections/collection.js';

Template.adminQBAdd.onRendered(function () {

    //CKEDITOR begin//
    CKEDITOR.editorConfig = function (config) {
        config.language = 'es';
        config.uiColor = '#F7B42C';
        config.height = 300;
        config.toolbarCanCollapse = true;
    };
    CKEDITOR.replace('editor1');
    CKEDITOR.replace('editor2');
    CKEDITOR.replace('editor3');
    CKEDITOR.replace('editor4');
    CKEDITOR.replace('editor5');
    //CKEDITOR end//
});

Template.adminQBAdd.onCreated(function () {

});

Template.adminQBAdd.events({
    "click #btnSave"(event, instance) {
        let data1 = CKEDITOR.instances.editor1.document.getBody().getText(),
            data2 = CKEDITOR.instances.editor2.document.getBody().getText(),
            data3 = CKEDITOR.instances.editor3.document.getBody().getText(),
            data4 = CKEDITOR.instances.editor4.document.getBody().getText(),
            data5 = CKEDITOR.instances.editor5.document.getBody().getText(),
            correctAnswer = $("input:radio[name=answers]:checked").val(),
            qnsObj = {}, sequenceNo;

        if (data1 != "\n" && data2 != "\n" && data3 != "\n" && data4 != "\n" && data5 != "\n" && correctAnswer != undefined) {
            Meteor.call('questionsCollectionCount', function (error, questionsCollectionCount) {
                if (error) {
                    console.log(error);
                } else {
                    // console.log(questionsCollectionCount);
                    sequenceNo = questionsCollectionCount + 1;

                    qnsObj = {
                        question: data1,
                        answer1: data2,
                        answer2: data3,
                        answer3: data4,
                        answer4: data5,
                        correctAns: correctAnswer,
                        sequenceNo: sequenceNo,
                        createdAt: new Date(),
                        editedAt:0,
                        deleteFlag : 0
                    };

                    Meteor.call('addQuestionMethod',qnsObj,function (error){
                        if ( error ) {
                            console.log(error);
                        } else  {
                            Materialize.toast("Question added successfully", 3000, '#4caf50 green');
                            instance.find("#idQuestionAddForm").reset();
                            CKEDITOR.instances.editor1.setData('');
                            CKEDITOR.instances.editor2.setData('');
                            CKEDITOR.instances.editor3.setData('');
                            CKEDITOR.instances.editor4.setData('');
                            CKEDITOR.instances.editor5.setData('');
                        }
                    });
                }
            });

        } else {
            Materialize.toast("Please fill the mandatory fields", 2000, '#f44336 red');
        }
    }
});

Template.adminQBAdd.helpers({

});