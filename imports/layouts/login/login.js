import './login.html';
import { gL } from '../../globalFunctions/globalFunctions.js';

Template.login.onRendered(function () {
    $(document).ready(function () {
        $('ul.tabs').tabs();
    });
});

Template.login.onCreated(function () {

});

Template.login.helpers({

});

Template.login.events({

    'keyup #emailaddress'(event, instance) {
        event.preventDefault();
        let checkEmail = Template.instance().find("#emailaddress").value;

        if (gL.validateEmail(checkEmail)) {
            flagEmail = 1;
            $("#idIconLEmail").css("color", "rgba(70, 255, 51, 0.51)");//green
        } else if (checkEmail == "") {
            $("#idIconLEmail").css("color", "");//white 
        } else {
            $("#idIconLEmail").css("color", "#e85e5e");//red        
        }
        return false;
    },

    'keyup #password'(event, instance) {
        let txtPassword = Template.instance().find("#password").value;
        returnMsg = gL.passwordCheckFn(txtPassword);

        if (returnMsg == "Password Ok") {
            flagPassword = 2;
            $("#idIconLPwd").css("color", "rgba(70, 255, 51, 0.51)");//green
        } else if (txtPassword == "") {
            $('#password').css('border-color', '');
            $("#idIconLPwd").css("color", "");
        } else {
            $("#idIconLPwd").css("color", "#e85e5e");//red
        }
        return false;
    },

    'click #btnLogin'(event, instance) {
        event.preventDefault();

        let email = Template.instance().find("#emailaddress").value,
            password = Template.instance().find("#password").value,
            emailValid = gL.validateEmail(email);

        if (email == "" || password == "") {
            Materialize.toast("Please fill all the fields", 2000, '#f44336 red');
        } else if (emailValid == false) {
            $("#idIconLEmail").css("color", "#e85e5e");//red
        } else {
            Meteor.loginWithPassword(email, password, function (error) {
                if (error) {
                    if (error.message == "User not found [403]") {
                        $("#idIconLEmail").css("color", "#e85e5e"); //red
                    } else if (error.message == "Incorrect password [403]") {
                        $("#idIconLPwd").css("color", "#e85e5e");//red
                    }
                } else {
                    localStorage.setItem('loginState', true);
                    FlowRouter.go('/adminUsers');
                }
            });
        }
    },

});