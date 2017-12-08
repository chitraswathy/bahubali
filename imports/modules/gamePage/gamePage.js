import './gamePage.html';
import './gamePageSubscribe.js';
import { gL } from '../../globalFunctions/globalFunctions.js';
import { usersGameHistoryCollection } from '../../collections/collection.js';
import { questionsCollection } from '../../collections/collection.js';

let correctQnsCount = 0,
    wrongQnsCount = 0,
    correctAnsArray = [],
    wrongAnsArray = [];
var timerId;
var timeLeft;

Template.gamePage.onRendered(function () {
    this.autorun(() => {
        let userQnsSet = usersGameHistoryCollection.find({ _id: FlowRouter.getParam("userId"), userFinishedStatus: 0 }).fetch(),
            allQndId = [],
            j = 0;

        if (userQnsSet.length != 0) {
            // console.log(userQnsSet[0].qnsProvided)
            let qnsProvidedArray = userQnsSet[0].qnsProvided;
            qnsProvidedArray.forEach(function (collectionDocument) {
                allQndId.push(collectionDocument._id);
            });
            Session.set("allQnsIdSession", allQndId);
        }

        let allQnsIdArray = Session.get("allQnsIdSession");
        setTimeout(function () {
            console.log(allQnsIdArray.length);
            $("#" + allQnsIdArray[1]).hide();
            $("#" + allQnsIdArray[2]).hide();
            $("#" + allQnsIdArray[3]).hide();
            $("#" + allQnsIdArray[4]).hide();
            $("#" + allQnsIdArray[5]).hide();
            $("#" + allQnsIdArray[6]).hide();
            $("#" + allQnsIdArray[7]).hide();
            $("#" + allQnsIdArray[8]).hide();
            $("#" + allQnsIdArray[9]).hide();
            restartTimer();

        }, 100)
    });
});

Template.gamePage.onCreated(function () {

});

Template.gamePage.events({

    'click a[id^=idOpt1]'(event, instance) {
        let userChoosenAns = $(event.target).attr("data-id"),
            name = event.target.id.split("idOpt1").pop();

        Session.set("nameSession", name);
        Session.set("userChoosenAnsSession", userChoosenAns);
        Session.set("qnsUniqueId", event.target.id);
        console.log(name)
        $("a[id^=idOpt1]").css("background-color", "#53a93f");
        $("a[id^=idOpt2]").css("background-color", "#473391");
        $("a[id^=idOpt3]").css("background-color", "#473391");
        $("a[id^=idOpt4]").css("background-color", "#473391");
    },

    'click a[id^=idOpt2]'(event, instance) {
        let userChoosenAns = $(event.target).attr("data-id"),
            name = event.target.id.split("idOpt2").pop();

        Session.set("nameSession", name);
        Session.set("userChoosenAnsSession", userChoosenAns);
        Session.set("qnsUniqueId", event.target.id);
        console.log(name)
        $("a[id^=idOpt1]").css("background-color", "#473391");
        $("a[id^=idOpt2]").css("background-color", "#53a93f");
        $("a[id^=idOpt3]").css("background-color", "#473391");
        $("a[id^=idOpt4]").css("background-color", "#473391");
    },

    'click a[id^=idOpt3]'(event, instance) {
        let userChoosenAns = $(event.target).attr("data-id"),
            name = event.target.id.split("idOpt3").pop();

        Session.set("nameSession", name);
        Session.set("userChoosenAnsSession", userChoosenAns);
        Session.set("qnsUniqueId", event.target.id);
        console.log(name)
        $("a[id^=idOpt1]").css("background-color", "#473391");
        $("a[id^=idOpt2]").css("background-color", "#473391");
        $("a[id^=idOpt3]").css("background-color", "#53a93f");
        $("a[id^=idOpt4]").css("background-color", "#473391");
    },

    'click a[id^=idOpt4]'(event, instance) {
        let userChoosenAns = $(event.target).attr("data-id"),
            name = event.target.id.split("idOpt4").pop();

        Session.set("nameSession", name);
        Session.set("userChoosenAnsSession", userChoosenAns);
        Session.set("qnsUniqueId", event.target.id);
        console.log(name)
        $("a[id^=idOpt1]").css("background-color", "#473391");
        $("a[id^=idOpt2]").css("background-color", "#473391");
        $("a[id^=idOpt3]").css("background-color", "#473391");
        $("a[id^=idOpt4]").css("background-color", "#53a93f");
    },

    // 'change input[type=radio]'(event, instance) {
    //     let name = event.target.name,
    //         userChoosenAns = event.target.value;

    //     Session.set("nameSession", name);
    //     Session.set("userChoosenAnsSession", userChoosenAns);
    // },

    'click a[id^=btnGameSubmit]'(event, instance) {

        let btnFullId = event.target.id,
            btnId = btnFullId.split("btnGameSubmit").pop(),
            allQnsArr = Session.get("allQnsIdSession"),
            name = Session.get("nameSession"),
            userChoosenAns = Session.get("userChoosenAnsSession"),
            qnsUniqueId = Session.get("qnsUniqueId");

        Session.set('submitBtnId', btnFullId);
        console.log(userChoosenAns)

        if (userChoosenAns != undefined) {
            // console.log(btnId)
            // console.log(userChoosenAns)
            // console.log(allQnsArr)
            console.log(btnFullId)
            $("a").prop('disabled', true);
            let QnsId = name,
                correctAnswer = questionsCollection.find({ _id: QnsId }, { fields: { correctAns: 1, sequenceNo: 1 } }).fetch();

            let previousQnsindex = allQnsArr.indexOf(btnId),
                nextQnsindex = previousQnsindex + 1,
                nextQnsId = allQnsArr[nextQnsindex];

            // console.log(userChoosenAns)
            // console.log(correctAnswer[0].correctAns)

            if (correctAnswer[0].correctAns == userChoosenAns) {
                $("a[id^=" + qnsUniqueId + "]").css("background-color", "#00b6a5"); //green
                let getUserScore = $("#idUserScore").text(),
                    userScore = parseInt(getUserScore) + 10;
                $("#idUserScore").text(userScore);

                correctQnsCount++;
                correctAnsArray.push(correctAnswer[0].sequenceNo);
                console.log(correctAnsArray)
            } else if (correctAnswer[0].correctAns != userChoosenAns) {
                $("a[id^=" + qnsUniqueId + "]").css("background-color", "#e91e63"); //red
                wrongQnsCount++;
                wrongAnsArray.push(correctAnswer[0].sequenceNo);
                console.log(wrongAnsArray)
            }

            setTimeout(function () {
                $("#" + nextQnsId).show(1000);

                clearInterval(timerId);
                timerId = false;
                timeLeft = 0;
                document.getElementById("timer").innerHTML = '';
                restartTimer();

                let getQnsCount = $("#idQnsCount").text(),
                    showQnsCount = parseInt(getQnsCount) + 1;
                if (parseInt(getQnsCount) == 10) {
                    $("#idQnsCount").text(10);
                } else {
                    $("#idQnsCount").text(showQnsCount);
                }

                // console.log(previousQnsindex)
                // console.log(nextQnsindex)
                // console.log(allQnsArr[nextQnsindex])

                if (nextQnsindex > -1) {
                    allQnsArr.splice(nextQnsindex, 1);
                }

                $("#" + allQnsArr[0]).hide();
                $("#" + allQnsArr[1]).hide();
                $("#" + allQnsArr[2]).hide();
                $("#" + allQnsArr[3]).hide();
                $("#" + allQnsArr[4]).hide();
                $("#" + allQnsArr[5]).hide();
                $("#" + allQnsArr[6]).hide();
                $("#" + allQnsArr[7]).hide();
                $("#" + allQnsArr[8]).hide();

                console.log(nextQnsId)

                if (nextQnsId == undefined) {
                    console.log($("#idUserScore").text())
                    console.log(correctQnsCount)
                    console.log(wrongQnsCount)
                    console.log(correctAnsArray, wrongAnsArray)
                    Meteor.call('userQnsAnswerUpdateMethod', FlowRouter.getParam("userId"), correctQnsCount, wrongQnsCount, correctAnsArray, wrongAnsArray, $("#idUserScore").text(), function (error) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log("updated successfully");
                            FlowRouter.go('/successPage/' + FlowRouter.getParam("userId"));
                            clearInterval(timerId);
                            timerId = false;
                            timeLeft = 0;
                            document.getElementById("timer").innerHTML = '';
                        }
                    });
                }
                Session.set("userChoosenAnsSession", undefined);
                Session.set("nameSession", undefined);
                Session.set("qnsUniqueId", undefined);
                $("a[id^=idOpt1]").css("background-color", "#473391");
                $("a[id^=idOpt2]").css("background-color", "#473391");
                $("a[id^=idOpt3]").css("background-color", "#473391");
                $("a[id^=idOpt4]").css("background-color", "#473391");
            }, 2000);
        }
    }
});

Template.gamePage.helpers({
    qnsDisplay() {
        if (Template.instance().subscriptionsReady()) {
            let userQnsSet = usersGameHistoryCollection.find({ _id: FlowRouter.getParam("userId"), userFinishedStatus: 0 }).fetch(),
                qnsSetObj = {},
                qnsSetArray = [],
                allQndId = [],
                j = 0;

            if (userQnsSet.length != 0) {
                // console.log(userQnsSet[0].qnsProvided)
                let qnsProvidedArray = userQnsSet[0].qnsProvided;
                qnsProvidedArray.forEach(function (collectionDocument) {
                    j++;
                    // console.log(collectionDocument)
                    qnsSetObj = {
                        qnsId: collectionDocument._id,
                        qnsNo: j,
                        question: collectionDocument.question,
                        ans1: collectionDocument.answer1,
                        ans2: collectionDocument.answer2,
                        ans3: collectionDocument.answer3,
                        ans4: collectionDocument.answer4,
                        correctAns: collectionDocument.correctAns,
                        sequenceNo: collectionDocument.sequenceNo,
                        userName: userQnsSet[0].userName,
                        userEmail: userQnsSet[0].userEmail,
                        userOrg: userQnsSet[0].userOrg,
                        startTime: userQnsSet[0].startTime,
                        totalScore: userQnsSet[0].totalScore,
                        endTime: userQnsSet[0].endTime
                    };
                    allQndId.push(collectionDocument._id);
                    qnsSetArray.push(qnsSetObj);
                });
                console.log(qnsSetArray);
                return qnsSetArray;
            }
        }
    }
});


function restartTimer() {
    timeLeft = 30;
    var elem = document.getElementById('timer');
    clearInterval(timerId);
    timerId = false;
    $("a").prop('disabled', false);
    timerId = setInterval(countdown, 1000);

    function countdown() {
        if (timeLeft == -1) {
            clearTimeout(timerId);
        } else {
            elem.innerHTML = timeLeft;
            // console.log(elem.innerHTML)
            timeLeft--;
            if (elem.innerHTML == 0) {
                // var subId = Session.get("submitBtnId");
                // console.log(subId)
                $("a").prop('disabled', true);
                let allQnsArr = Session.get("allQnsIdSession"),
                    name = Session.get("nameSession"),
                    userChoosenAns = Session.get("userChoosenAnsSession"),
                    qnsUniqueId = Session.get("qnsUniqueId"), btnId;

                console.log(allQnsArr, name, userChoosenAns, qnsUniqueId)

                if (qnsUniqueId != undefined) {

                    if (qnsUniqueId.includes("idOpt1")) {
                        btnId = qnsUniqueId.split("idOpt1").pop();
                    } else if (qnsUniqueId.includes("idOpt2")) {
                        btnId = qnsUniqueId.split("idOpt2").pop();
                    } else if (qnsUniqueId.includes("idOpt3")) {
                        btnId = qnsUniqueId.split("idOpt3").pop();
                    } else if (qnsUniqueId.includes("idOpt4")) {
                        btnId = qnsUniqueId.split("idOpt4").pop();
                    }

                    if (userChoosenAns != undefined) {

                        let QnsId = name,
                            correctAnswer = questionsCollection.find({ _id: QnsId }, { fields: { correctAns: 1, sequenceNo: 1 } }).fetch();

                        let previousQnsindex = allQnsArr.indexOf(btnId),
                            nextQnsindex = previousQnsindex + 1,
                            nextQnsId = allQnsArr[nextQnsindex];

                        console.log(userChoosenAns, correctAnswer[0].correctAns, previousQnsindex, nextQnsindex, nextQnsId)

                        if (correctAnswer[0].correctAns == userChoosenAns) {
                            $("a[id^=" + qnsUniqueId + "]").css("background-color", "#6abf57"); //green
                            let getUserScore = $("#idUserScore").text(),
                                userScore = parseInt(getUserScore) + 10;
                            $("#idUserScore").text(userScore);

                            correctQnsCount++;
                            correctAnsArray.push(correctAnswer[0].sequenceNo);
                            console.log(correctAnsArray)
                        } else if (correctAnswer[0].correctAns != userChoosenAns) {
                            $("a[id^=" + qnsUniqueId + "]").css("background-color", "#e91e63"); //red
                            wrongQnsCount++;
                            wrongAnsArray.push(correctAnswer[0].sequenceNo);
                            console.log(wrongAnsArray)
                        }

                        setTimeout(function () {
                            $("#" + nextQnsId).show(1000);
                            let getQnsCount = $("#idQnsCount").text(),
                                showQnsCount = parseInt(getQnsCount) + 1;
                            $("#idQnsCount").text(showQnsCount);

                            if (nextQnsindex > -1) {
                                allQnsArr.splice(nextQnsindex, 1);
                            }

                            $("#" + allQnsArr[0]).hide();
                            $("#" + allQnsArr[1]).hide();
                            $("#" + allQnsArr[2]).hide();
                            $("#" + allQnsArr[3]).hide();
                            $("#" + allQnsArr[4]).hide();
                            $("#" + allQnsArr[5]).hide();
                            $("#" + allQnsArr[6]).hide();
                            $("#" + allQnsArr[7]).hide();
                            $("#" + allQnsArr[8]).hide();

                            console.log(nextQnsId)

                            if (nextQnsId == undefined) {
                                console.log($("#idUserScore").text())
                                console.log(correctQnsCount)
                                console.log(wrongQnsCount)
                                console.log(correctAnsArray, wrongAnsArray)
                                Meteor.call('userQnsAnswerUpdateMethod', FlowRouter.getParam("userId"), correctQnsCount, wrongQnsCount, correctAnsArray, wrongAnsArray, $("#idUserScore").text(), function (error) {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log("updated successfully");
                                        FlowRouter.go('/successPage/' + FlowRouter.getParam("userId"));
                                        clearInterval(timerId);
                                        timerId = false;
                                        timeLeft = 0;
                                        document.getElementById("timer").innerHTML = '';
                                    }
                                });
                            }
                            Session.set("userChoosenAnsSession", undefined);
                            Session.set("nameSession", undefined);
                            Session.set("qnsUniqueId", undefined);
                            $("a[id^=idOpt1]").css("background-color", "#473391");
                            $("a[id^=idOpt2]").css("background-color", "#473391");
                            $("a[id^=idOpt3]").css("background-color", "#473391");
                            $("a[id^=idOpt4]").css("background-color", "#473391");
                            restartTimer();
                        }, 2000);
                    }
                } else {
                    console.log("user not chosen any answer")

                    let userQnsSet = usersGameHistoryCollection.find({ _id: FlowRouter.getParam("userId"), userFinishedStatus: 0 }).fetch();

                    if (userQnsSet.length != 0) {
                        console.log(userQnsSet[0].qnsArray)
                        let qnsProvidedArray = userQnsSet[0].qnsArray,
                            previousQnsindex = parseInt($("#idQnsCount").text()) - 1,
                            nextQnsindex = previousQnsindex + 1,
                            nextQnsId = allQnsArr[nextQnsindex],
                            sequenceNo = qnsProvidedArray[previousQnsindex];

                        console.log(previousQnsindex, nextQnsindex, nextQnsId, sequenceNo)

                        wrongQnsCount++;
                        wrongAnsArray.push(sequenceNo);

                        setTimeout(function () {
                            $("#" + nextQnsId).show(1000);
                            let getQnsCount = $("#idQnsCount").text(),
                                showQnsCount = parseInt(getQnsCount) + 1;
                            $("#idQnsCount").text(showQnsCount);

                            if (nextQnsindex > -1) {
                                allQnsArr.splice(nextQnsindex, 1);
                            }

                            $("#" + allQnsArr[0]).hide();
                            $("#" + allQnsArr[1]).hide();
                            $("#" + allQnsArr[2]).hide();
                            $("#" + allQnsArr[3]).hide();
                            $("#" + allQnsArr[4]).hide();
                            $("#" + allQnsArr[5]).hide();
                            $("#" + allQnsArr[6]).hide();
                            $("#" + allQnsArr[7]).hide();
                            $("#" + allQnsArr[8]).hide();

                            console.log(nextQnsId)

                            if (nextQnsId == undefined) {
                                console.log($("#idUserScore").text())
                                console.log(correctQnsCount)
                                console.log(wrongQnsCount)
                                console.log(correctAnsArray, wrongAnsArray)
                                Meteor.call('userQnsAnswerUpdateMethod', FlowRouter.getParam("userId"), correctQnsCount, wrongQnsCount, correctAnsArray, wrongAnsArray, $("#idUserScore").text(), function (error) {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log("updated successfully");
                                        FlowRouter.go('/successPage/' + FlowRouter.getParam("userId"));
                                        clearInterval(timerId);
                                        timerId = false;
                                        timeLeft = 0;
                                        document.getElementById("timer").innerHTML = '';
                                    }
                                });
                            }
                            Session.set("userChoosenAnsSession", undefined);
                            Session.set("nameSession", undefined);
                            Session.set("qnsUniqueId", undefined);
                            $("a[id^=idOpt1]").css("background-color", "#473391");
                            $("a[id^=idOpt2]").css("background-color", "#473391");
                            $("a[id^=idOpt3]").css("background-color", "#473391");
                            $("a[id^=idOpt4]").css("background-color", "#473391");
                            restartTimer();
                        }, 2000);
                    }
                }
            }
        }
    }
}