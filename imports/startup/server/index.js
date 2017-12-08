import {Meteor} from 'meteor/meteor';
import '../../publish/publish.js';
import '../../modules/adminFrontPage/adminFrontPageMethods.js';
import '../../modules/adminQBAdd/adminQBAddMethods.js';
import '../../modules/adminQBEdit/adminQBEditMethods.js';
import '../../modules/adminQBQnsList/adminQBQnsListMethods.js';
import '../../modules/adminUsers/adminUsersMethods.js';
import '../../modules/gamePage/gamePageMethods.js';
import '../../modules/userFrontPage/userFrontPageMethods.js';
import '../../modules/successPage/successPageMethods.js';
import '../../layouts/headerLayout/headerLayoutMethods.js';

Meteor.startup(() => {
    process.env.MAIL_URL = 'smtp://developerpowerofn@gmail.com:logical2@smtp.gmail.com:587';        
    var rootURL = process.env.ROOT_URL;
    // if(rootURL.includes("7005") == true)
    //     Meteor.absoluteUrl.defaultOptions.rootUrl = "http://stock-test.ngpdemo.co.uk";
});