import './headerLayout.html';
import './headerLayoutSubscribe.js';

Template.headerLayout.onRendered(function () {
    $(document).ready(function () {
        $(".button-collapse").sideNav({
            closeOnClick: true,
            draggable: true, 
        });
        $('.collapsible').collapsible();
        $(".dropdown-button").dropdown({hover:true});
    })
    $( "#click" ).click(function() {
        $('.collapsible-body').toggleClass('active');
    });
});

Template.headerLayout.onCreated(function () {

});

Template.headerLayout.events({
    'click #idSignOut'(event, instance) {
        $('#logoutPopup').openModal({dismissible:false});                
    },

    'click #logoutOkStatus'(events,instance){
        localStorage.setItem('loginState', null)
        $('.lean-overlay').css('display','none')
        Meteor.logout(function () {
            FlowRouter.go('/adminLogin'); 
            console.log("LoggedOut");
        });    
    },

    'click #logoutCancelStatus'(event,instance){
        $('#logoutPopup').closeModal();
    }
});

Template.headerLayout.helpers({

});