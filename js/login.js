var cookieUtil = {
  init: function(){
    this.enabled = this.cookiesEnabled() ? "Enabled" : "Disabled";
  },
  createCookie: function(name,value,days){
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else {
      var expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
    alert(document.cookie);
  },
  readCookie: function(name){
    var search = name + "=";
    var ca = document.cookie.split(";");
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];      
      while (c.charAt(0) == " "){
        c = c.substring(1,c.length);
      }
      if (c.indexOf(search) == 0){
        return c.substring(search.length,c.length);
      }
    }
    return null;    
  },
  deleteCookie: function(name){
    this.createCookie(name,"",-1);
  },
  deleteAllCookies: function(){
    if (document.cookie.length > 0) {
      var cs = document.cookie.split(";");
      for (var i = 0; i<cs.length; i++){
        var c = cs[i].split("=");
        var cname = c[0];
        this.deleteCookie(cname);
      }   
    } else {
      return false;
    }     
  },
  cookiesEnabled: function(){
    this.createCookie("test", "test");
    var test = this.readCookie("test");
    if (test == "test") {
      this.deleteCookie("test");
      return true;
    } else {
      return false;
    }
  }
}

function checkPwd(str) {
  if (str.length < 6) {
    return ('too_short');
  } else if (str.length > 30) {
    return ('too_long');
  } else if (str.search(/\d/) == -1) {
    return ('no_num');
  } else if (str.search(/[a-zA-Z]/) == -1) {
    return ('no_letter');
  } else if (str.search(/[^a-zA-Z0-9\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\_\\+]/) != -1) {
    return ('bad_char');
  }
  return ('ok');
}

function checkUserName(str) {
  if (str.length < 6) {
    return ('too_short');
  } else if (str.length > 20) {
    return ('too_long');
  } else if (str.search(/[^a-zA-Z0-9\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\_\\+]/) != -1) {
    return ('bad_char');
  }
  return ('ok');
}
$(document).ready(() => {
  $('#registerForm').on('click', '#registerBtn', () => {
    const username = $('#name').val();
    const password = $('#pw').val();
    alert(checkPwd(password));
    alert(checkUserName(username));
    cookieUtil.init();
    cookieUtil.createCookie('name', username);
    alert(cookieUtil.readCookie('name'));
  });
});
