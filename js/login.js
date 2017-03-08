function checkPwd(str) {
  if (str.length < 6) {
    return ('is too short');
  } else if (str.length > 30) {
    return ('is too long');
  } else if (str.search(/\d/) == -1) {
    return ('does not have a number. ');
  } else if (str.search(/[a-zA-Z]/) == -1) {
    return ('does not have varters.');
  } else if (str.search(/[^a-zA-Z0-9\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\_\\+]/) != -1) {
    return ('uses improper characters.');
  }
  return ('ok');
}

function checkUserName(str) {
  if (str.length < 6) {
    return ('is too short');
  } else if (str.length > 20) {
    return ('is too long');
  } else if (str.search(/[^a-zA-Z0-9\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\_\\+]/) != -1) {
    return ('uses improper characters.');
  }
  return ('ok');
}

function hasStorage(){
    try{
        localStorage.setItem('test', '7');
        if(localStorage.getItem('test')=== '7'){
            localStorage.removeItem('test');
            return true;
        }
    }
    catch(er){}
    return false;
}

$.fn.exists = function () {
  return this.length !== 0;
};

$(document).ready(function () {
  $('#registerForm').on('click', '#registerBtn', function () {
    var checkFlag = true;
    var name = $('#name').val();
    var pwd = $('#pw').val();
    if (name.length === 0 || pwd.length === 0) {
      return false;
    }
    var nameCheck = checkUserName(name);
    var pwdCheck = checkPwd(pwd);
    if (nameCheck !== 'ok') {
      if ($('.errorSection #nameError').exists()) {
        $('.errorSection #nameError').text('Error: username ' + nameCheck + '.');
      } else {
        $('.errorSection').prepend('<p class="error" id="nameError">Error: username ' +  nameCheck + '.</p>');
      }
      checkFlag = false;
    }
    if (pwdCheck !== 'ok') {
      if ($('.errorSection #pwdError').exists()) {
        $('.errorSection #pwdError').text('Error: password ' + pwdCheck + '.');
      } else {
        $('.errorSection').append('<p class="error" id="pwdError">Error: password ' + pwdCheck + '.</p>');
      }
      checkFlag = false;
    }
    if (checkFlag) {
      alert('Successfully created account.');
      alert(hasStorage());
      localStorage.setItem('username', name);
      localStorage.setItem('password', pwd);
      return true;
    }
    return false;
  });
});


$(document).ready(function () {
  $('#loginForm').on('click', '#loginBtn', function () {
    var username = $('#userName').val();
    var password = $('#userPw').val();
    var storageName = localStorage.getItem('username');
    alert(localStorage.getItem('username'));
    alert(localStorage.getItem('password'));
    var storagePassword = localStorage.getItem('password');
    if (username === storageName && password === storagePassword) {
      cookieUtil.init();
      cookieUtil.createCookie('name', storageName, 10);
      window.location = 'quiz.html';
    } else if (!$('.errorSection p').exists()) {
      $('.errorSection').append('<p class="error">Error: username or password is not correct.</p>');
    }
    return false;
  });
});
