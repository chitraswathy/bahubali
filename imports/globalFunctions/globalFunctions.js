// var moment = require('moment-timezone');
// moment.tz.setDefault("Asia/Kolkata");

export const gL = {

  // Validating the password has 1UC, 1LC, 1Digit, length is b/w 6 to 10
  passwordCheckFn(str){
    // if ( checkPassword.search(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/))
    if (str.search(/[A-Z]/) == -1) {
        return("No uppercase in password");
    } else if(str.search(/[a-z]/) == -1) {
        return("No lowercase in password");
    }else if (str.search(/\d/) == -1) {
        return("No number in password");
    }else if(str.length < 6) {
        return("Password is too short");
    }else if (str.length > 10) {
        return("Password is too long");
    }
    return("Password Ok");
  },

  // Validating email is in correct format
  validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },

  // Input field to accept only numbers and dot
  inputNumber(evt) {
    let theEvent,key,regex;          
    theEvent    =     evt || window.event;
    key         =     theEvent.keyCode || theEvent.which;
    key         =     String.fromCharCode( key );
    regex       =     /[0-9]|\./; 

    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) 
        theEvent.preventDefault();
    }
  },

  // Input field to accept only numbers
  inputOnlyNumber(evt) {
    let theEvent,key,regex;          
    theEvent    =     evt || window.event;
    key         =     theEvent.keyCode || theEvent.which;
    key         =     String.fromCharCode( key );
    regex       =     /[0-9]/; 

    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) 
        theEvent.preventDefault();
    }
  },

  // Allow only lower case and upper case to input field
  inputOnlyCharacters(evt) {
    let theEvent,key,regex;          
    theEvent    =     evt || window.event;
    key         =     theEvent.keyCode || theEvent.which;
    key         =     String.fromCharCode( key );
    regex       =     /[a-zA-Z0-9_ ]/; 

    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) 
        theEvent.preventDefault();
    }
  },

  //user name min length check
  userNameMinLengthCheck(str){
    // if ( checkPassword.search(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/))
    if(str.length < 6) {
        return 0;
    }
    return 1;
  },

  //return array with start and end range
  arrayRange(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  },

  getUnique(qnsArray,count) {
    // Make a copy of the array
    var tmp = qnsArray.slice(qnsArray);
    var ret = [];
    
    for (var i = 0; i < count; i++) {
      var index = Math.floor(Math.random() * tmp.length);
      var removed = tmp.splice(index, 1);
      // Since we are only removing one element
      ret.push(removed[0]);
    }
    return ret;  
  },
  
  // To convert the string into number
  numberConversion(number) {
    let result  = number * 1;
    return result;
  },

  // Time Format Setting
  timeFormat(hour,minute,format){
    let timeFormat = '';      
    if(hour!='' && minute!='' && format!=''){      
      timeFormat = hour + ':' + minute + ':' + format;
    } 
    return timeFormat;
  },

  // Empty field validation
  emptyFieldValidation(data){       
    let i;   
    for(i=0; i < data.length; i++){        
      if($('#'+data[i]).val()=='' || $('#'+data[i]).val()==null ) {  
          return i
      }      
    };       
  },

  // Sleep
  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  },

  // Random number generation with 16 characters
  randomKey16(){
    let length = 16,
        chars  = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        result = '';
    for (let i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  },

  // Random number generation with 8 characters
  randomKey8(){
    let length = 8,
        chars  = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        result = '';
    for (let i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  },

  //format number length to 6 digit
  formatNumberLength(num) {
    var length = 6;
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
  },

  //append slash with start and end of the return_text (convert path into valid path)
  convertToValidPath(filePath){
    if(filePath.startsWith('/')){
        if( filePath.endsWith('/') ) {
            return filePath;
        } else {
            filePath = filePath.concat('/');
            return filePath;
        }
    } else {
        filePath = '/'.concat(filePath);
        if(filePath.endsWith('/') ) {
            return filePath;
        } else {
            filePath = filePath.concat('/');
            return filePath;
        }
    }
  },

  currentDateValidation(startDate){
    
      var endDate = new Date();            
      endDate = endDate.toISOString().split('T')[0];
  
      let yr1   =   parseInt(startDate.substring(0, 4)),
          mon1  =   parseInt(startDate.substring(5,7)),
          dt1   =   parseInt(startDate.substring(8,10)),
          yr2   =   parseInt(endDate.substring(0,4)),
          mon2  =   parseInt(endDate.substring(5,7)),
          dt2   =   parseInt(endDate.substring(8,10)),      
          date1,date2;
  
      mon1  =   mon1 - 1;
      mon2  =   mon2 - 1;
  
      date1 = new Date(yr1, mon1, dt1);
      date2 = new Date(yr2, mon2, dt2);
  
      if (date2 < date1) {
        return 2;
      } else  {
        return 1;
      }
  },

  // Checking the currency value does not has more than one decimal value and only has numbers
  checkDecimalCurrency(val){
    if(isNaN(val)) {
      val = val.replace(/[^0-9\.]/g,'');
      if(val.split('.').length>2) 
        val =val.replace(/\.+$/,"");             
    }
    return val;
  },

  //Format currency value
  formatCurrency(currency) {
    let result = currency.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");      
    return result;
  },

  //Accept only number from 1 to 100
  allowNumberWith1To100(num){
    var input=parseInt(num);
    if(input<0 || input>100)
      return 0;
  },

  validateFloatKeyPress(el, evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    var number = el.value.split('.');
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    //just one dot
    if(number.length>1 && charCode == 46){
         return false;
    }

    //thanks: http://javascript.nwbox.com/cursor_position/
    function getSelectionStart(o) {
      if (o.createTextRange) {
        var r = document.selection.createRange().duplicate()
        r.moveEnd('character', o.value.length)
        if (r.text == '') return o.value.length
        return o.value.lastIndexOf(r.text)
      } else return o.selectionStart
    }

    //get the carat position
    var caratPos = getSelectionStart(el);
    var dotPos = el.value.indexOf(".");
    if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
        return false;
    }
    return true;
  },

  //User Inactivity Logout
   sessionLogout(){
  
      //Session Logout start
      var IDLE_TIMEOUT        = 900; //seconds
      var _idleSecondsTimer   = null;
      var _idleSecondsCounter = 0;

      $(document).click(function () {
          _idleSecondsCounter = 0;
      });

      $(document).mousemove(function () {
          _idleSecondsCounter = 0;
      });

      $(document).keypress(function () {
          _idleSecondsCounter = 0;
      });

      _idleSecondsTimer = window.setInterval(CheckIdleTime, 1000);

      function CheckIdleTime() {
      
      _idleSecondsCounter++;
      // console.log("_idleSecondsCounter = "+_idleSecondsCounter+"  "+"IDLE_TIMEOUT = "+IDLE_TIMEOUT);
      if (_idleSecondsCounter >= IDLE_TIMEOUT) {
        // console.log("Timeout");
        var confirmValue = confirm("Inactivity detected!Are sure you want to logout!!!");
        if (confirmValue == true) {
          clearInterval(_idleSecondsTimer);
          clearInterval(secInterval);
          localStorage.setItem('loginState',null);
          $('.modal-overlay').css('display','none')
          Meteor.logout(function () {
            console.log("logged out")
        }, 100);
        FlowRouter.go('/');  
        } else {
          _idleSecondsCounter = 0;
          // console.log("Button click _idleSecondsCounter = " +_idleSecondsCounter);
          localStorage.setItem('loginState',true);
          }
        }
        }
        
        let secInterval = setInterval(function () {
            var getLogoutSession = localStorage.getItem('loginState');
            // console.log("Session state = "+getLogoutSession);
            if (getLogoutSession == 'null') {
                  clearInterval(_idleSecondsTimer);
                  clearInterval(secInterval);                  
                  localStorage.setItem('loginState',null);
                  $('.modal-overlay').css('display','none')
                  Meteor.logout(function () {
                    console.log("logged out")
                }, 100);
                FlowRouter.go('/');   
            }//session logout end
          })
        }, 

    changePosition(){
      let menuStatus = localStorage.getItem('menuState');
      if(menuStatus == 'verticalSidenav'){
        $("#position_change").removeClass("right");
        $("#position_change").addClass("right1");  
        console.log("verticalSidenav");
      }
      else if(menuStatus=='horizontalSidenav'){
         $("#position_change").removeClass("right1");
        $("#position_change").addClass("right");
        console.log("horizontalSidenav"); 
      }
      
    },

    //mobile push notification send method using raix push package
    userNotification(text,title,userId){
      var badge = 1
      Push.send({
          from: 'Stock Rabbit',
          title: title,
          text: text,
          badge: 0,
          sound: 'sound',
          payload: {
              title: title,
             // historyId: result
          },
          query: {
              userId: userId //this will send to a specific Meteor.user()._id
          },
          gcm: {
              // gcm specific overwrites
              style: 'inbox',
              summaryText: '%n% notifications',
              sound: 'sound'
              // sound: 'note'
          }
      });
    },
    
    //Date Unix functions ..
    // unixStartDay(params) {
    //   return moment(params).startOf('day').unix()
    // },
    // unixEndDay(params) {
    //   return moment(params).endOf('day').unix()
    // },
    // unixStartMonth(params) {
    //   return moment(params).startOf('month').unix()
    // },
    // unixEndMonth(params) {
    //   return moment(params).endOf('month').unix()
    // },
    // unixStartWeek(params) {
    //   return moment(params).startOf('week').unix()
    // },
    // unixEndWeek(params) {
    //   return moment(params).endOf('week').unix()
    // },
    // utcFullDate() {
    //   return moment().toString();
    // },
    // getDay(params) {
    //   return moment(params).get('date');
    // },
    // getMonth(params) {
    //   return moment(params).get('month');  //month starts to end( 0 to 11 )
    // },
    // getyear(params) {
    //   return moment(params).get('year');
    // },
    // dateString(params){
    //   return moment(params).toString();
    // },
    // dateWithFormat(params){
    //   return moment(params).format('YYYY_MM_DD__HH_mm:ss');
    // },    
    //End - date functions

    formatdate2str(x, y) { //format date from dd-mmm-yyyy to yyyy-mm-dd
      var z = {
          M: x.getMonth() + 1,
          d: x.getDate(),
          h: x.getHours(),
          m: x.getMinutes(),
          s: x.getSeconds()
      };
      y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
          return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
      });
  
      return y.replace(/(y+)/g, function(v) {
          return x.getFullYear().toString().slice(-v.length)
      });
  }
}