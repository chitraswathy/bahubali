import './userFrontPage.html';
import './userFrontPageSubscribe.js';
import { gL } from '../../globalFunctions/globalFunctions.js';
import { questionsCollection } from '../../collections/collection.js';
import { usersGameHistoryCollection } from '../../collections/collection.js';

let flagUserName, flagUserEmail;

Template.userFrontPage.onRendered(function () {
    $("a").prop('disabled', true);
    $("a").css('background-color','#cfd8dc');
});

Template.userFrontPage.onCreated(function () {

});

Template.userFrontPage.events({

    'keypress #username'(event) {
        gL.inputOnlyCharacters(event);
    },

    'keyup #username'(event, instance) {
        event.preventDefault();
        let userName = Template.instance().find("#username").value,
            returnMsg = gL.userNameMinLengthCheck(userName);

        if (returnMsg == 1) {
            // $("#idIconUser").css("color", "rgba(70, 255, 51, 0.51)");//green
            flagUserName = 1
            $("a").prop('disabled', false);
            $("a").css('background-color','#008cff');
        } else if (userName == "") {
            flagUserName = 0
            // $("#idIconUser").css("color", "");//white 
            $("a").prop('disabled', true);
            $("a").css('background-color','#cfd8dc');
        } else {
            flagUserName = 0
            // $("#idIconUser").css("color", "#e85e5e");//red   
            $("a").prop('disabled', true);   
            $("a").css('background-color','#cfd8dc');  
        }
        return false;
    },

    'keyup #emailAddress'(event, instance) {
        event.preventDefault();
        let checkEmail = Template.instance().find("#emailAddress").value;

        if (gL.validateEmail(checkEmail)) {
            flagUserEmail = 2;
            $("a").prop('disabled', false);//green
            $("a").css('background-color','#008cff');
        } else if (checkEmail == "") {
            flagUserEmail = 0
            $("a").prop('disabled', true);//white 
            $("a").css('background-color','#cfd8dc');
        } else {
            flagUserEmail = 0;
            $("a").prop('disabled', true);//red     
            $("a").css('background-color','#cfd8dc');   
        }
        return false;
    },

    'click #btnStartGame'(event, instance) {
        let userName = Template.instance().find("#username").value,
            userEmail = Template.instance().find("#emailAddress").value,
            userOrg = Template.instance().find("#idOrg").value,
            qnsArray = [],
            tenQnsArray = [],
            collectionTenQns = [],
            userRecordObj = {};

        console.log(flagUserName)
        console.log(flagUserEmail)
        if (userName != "" && userEmail != "" && flagUserEmail == 2) {
            Meteor.call('questionsCollectionCount', function (error, count) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(count);
                    let userEmailCount = usersGameHistoryCollection.find({ "userEmail": userEmail }).count();
                    console.log(userEmailCount)
                    if (userEmailCount == 0) {
                        let originalArray = _.range(1, count + 1);
                        let usersAllocatedArray = _.sample(originalArray, 10);

                        usersAllocatedArray.forEach(function (record) {
                            console.log(record)
                            let qnsRecord = questionsCollection.find({ sequenceNo: record }).fetch();
                            collectionTenQns.push(qnsRecord[0])
                        });

                        userRecordObj = {
                            userName: userName,
                            userEmail: userEmail,
                            userOrg: userOrg,
                            startTime: new Date(),
                            endTime: 0,
                            totalScore: "0/10",
                            qnsArray: usersAllocatedArray,
                            qnsProvided: collectionTenQns,
                            qnsAnsweredRight: [],
                            qnsAnsweredWrong: [],
                            rightAttemptCount: 0,
                            wrongAttemptCount: 0,
                            userFinishedStatus: 0
                        }

                        console.log(userRecordObj)

                        Meteor.call('usersGameHistoryMethod', userRecordObj, function (error, userId) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log("users 10 qns inserted");
                                console.log(userId)
                                FlowRouter.go('/qnsPage/' + userId);
                            }
                        });
                    } else {
                        Materialize.toast("User already registered and played the game! Sorry!", 4000, '#f44336 red');
                    }
                }
            });
        } else {
            Materialize.toast("Please fill the fields", 2000, '#f44336 red');
        }
    }
});

Template.userFrontPage.helpers({

});