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
  $('.registration-form').on('click', '.btn', () => {
    let checkFlag = true;
    const name = $('.form-name').val();
    const pwd = $('.form-password').val();
    if (name.length === 0 || pwd.length === 0) {
      return false;
    }
    const nameCheck = checkUserName(name);
    const pwdCheck = checkPwd(pwd);
    if (nameCheck !== 'ok') {
      if ($('.error-section .name-error').exists()) {
        $('.error-section .name-error').text(`Error: username ${nameCheck}`);
      } else {
        $('.error-section').prepend(`<div class="alert alert-danger name-error">Error: username ${nameCheck}.</div>`);
      }
      checkFlag = false;
    } else{
      if ($('.error-section .name-error').exists()) {
        $('.error-section .name-error').remove();
      }
    }
    if (pwdCheck !== 'ok') {
      if ($('.error-section .pwd-error').exists()) {
        $('.error-section .pwd-error').text(`Error: password ${pwdCheck}`);
      } else {
        $('.error-section').append(`<div class="alert alert-danger pwd-error">Error: password ${pwdCheck}.</div>`);
      }
      checkFlag = false;
    } else{
      if ($('.error-section .pwd-error').exists()) {
        $('.error-section .pwd-error').remove();
      }
    }
    if (checkFlag) {
      alert('Successfully created account.');
      localStorage.setItem('username', name);
      localStorage.setItem('password', pwd);
      alert('Successfully added to localStorage');
      window.location = 'login.html';
    }
    return false;
  });
});
