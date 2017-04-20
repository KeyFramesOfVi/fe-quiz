$.fn.exists = function () {
  return this.length !== 0;
};
function checkPwd(str) {
  if (str.length < 6) {
    return ('is too short');
  } else if (str.length > 30) {
    return ('is too long');
  } else if (str.search(/\d/) == -1) {
    return ('does not have a number.');
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


$(document).ready(() => {
  $('.login-form').on('click', '.btn', () => {
    alert("Hello");
    const username = $('.form-name').val();
    const password = $('.form-password').val();
    const storageName = localStorage.getItem('username');
    const storagePassword = localStorage.getItem('password');
    if (username === storageName && password === storagePassword) {
      cookieUtil.init();
      cookieUtil.createCookie('name', storageName, 10);
      window.location = 'quiz.html';
    } else if (!$('.errorSection .login-error').exists()) {
      $('.errorSection').append('<div class="alert alert-danger login-error">Error: username or password is not correct.</p>');
    }
    return false;
  });
});
