function checkPwd(str) {
  if (str.length < 6) {
    return ('is too short');
  } else if (str.length > 30) {
    return ('is too long');
  } else if (str.search(/\d/) == -1) {
    return ('does not have a number. ');
  } else if (str.search(/[a-zA-Z]/) == -1) {
    return ('does not have letters.');
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

$.fn.exists = function () {
  return this.length !== 0;
};

$(document).ready(() => {
  $('#registerForm').on('click', '#registerBtn', () => {
    let checkFlag = true;
    const name = $('#name').val();
    const pwd = $('#pw').val();
    alert(cookieUtil);
    cookieUtil.init();
    cookieUtil.createCookie('name', 'Victor', 10);
    alert(cookieUtil.readCookie('name'));
    if (name.length === 0 || pwd.length === 0) {
      return false;
    }
    const nameCheck = checkUserName(name);
    const pwdCheck = checkPwd(pwd);
    if (nameCheck !== 'ok') {
      if ($('.errorSection #nameError').exists()) {
        $('.errorSection #nameError').text(`Error: username ${nameCheck}`);
      } else {
        $('.errorSection').prepend(`<p class="error" id="nameError">Error: username ${nameCheck}.</p>`);
      }
      checkFlag = false;
    }
    if (pwdCheck !== 'ok') {
      if ($('.errorSection #pwdError').exists()) {
        $('.errorSection #pwdError').text(`Error: password ${pwdCheck}`);
      } else {
        $('.errorSection').append(`<p class="error" id="pwdError">Error: password ${pwdCheck}.</p>`);
      }
      checkFlag = false;
    }
    if (checkFlag) {
      alert('Successfully created account.');
      localStorage.setItem('username', name);
      localStorage.setItem('password', pwd);
      return true;
    }
    return false;
  });
});

$(document).ready(() => {
  $('#loginForm').on('click', '#loginBtn', () => {
    const username = $('#userName').val();
    const password = $('#userPw').val();
    const storageName = localStorage.getItem('username');
    const storagePassword = localStorage.getItem('password');
    if (username === storageName && password === storagePassword) {
      window.location = 'quiz.html';
    } else if (!$('.errorSection p').exists()) {
      $('.errorSection').append('<p class="error">Error: username or password is not correct.</p>');
    }
    return false;
  });
});
