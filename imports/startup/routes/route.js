import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';


// Routes Control for Admin user
adminRoutes = FlowRouter.group({
  name: 'admin',
  triggersEnter: [function (context, redirect) {
    let loginStatus = localStorage.getItem('loginState');
    if (loginStatus == 'true' &&  Meteor.userId()) {
      
    } else {
      FlowRouter.go('/adminLogin');
    }
  }]
});

FlowRouter.route('/adminLogin', {
  action: function () {
    BlazeLayout.render('applicationLayout',{
      content: 'login'     
    });
  },

  triggersEnter: [function (context, redirect) {
    let loginStatus = localStorage.getItem('loginState');
    if (loginStatus == 'true' && (Meteor.loggingIn() || Meteor.userId())) {
        redirect('/adminFrontPage');
    } else {
    }
  }]
});

adminRoutes.route('/adminFrontPage', {
  action: function () {
    BlazeLayout.render('applicationLayout',{
      content: 'adminFrontPage',
      headerLayout: 'headerLayout'
    });
  }
});

adminRoutes.route('/adminQBAdd', {
  action: function () {
    BlazeLayout.render('applicationLayout',{
      content: 'adminQBAdd',
      headerLayout: 'headerLayout'
    });
  }
});

adminRoutes.route('/adminQBEdit/:id', {
  action: function () {
    BlazeLayout.render('applicationLayout',{
      content: 'adminQBEdit',
      headerLayout: 'headerLayout'
    });
  }
});

adminRoutes.route('/adminQBQnsList', {
  action: function () {
    BlazeLayout.render('applicationLayout',{
      content: 'adminQBQnsList',
      headerLayout: 'headerLayout'
    });
  }
});

adminRoutes.route('/adminUsers', {
  action: function () {
    BlazeLayout.render('applicationLayout',{
      content: 'adminUsers',
      headerLayout: 'headerLayout'
    });
  }
});

FlowRouter.route('/qnsPage/:userId', {
  action: function () {
    BlazeLayout.render('applicationLayout',{
      content: 'gamePage'
    });
  }
});

//Front page
FlowRouter.route('/playGame', {
  action: function () {
    BlazeLayout.render('applicationLayout',{
      content: 'userFrontPage'
    });
  }
});

FlowRouter.route('/successPage/:userId', {
  action: function () {
    BlazeLayout.render('applicationLayout',{
      content: 'successPage'
    });
  }
});