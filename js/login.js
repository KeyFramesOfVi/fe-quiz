$.fn.exists = function () {
  return this.length !== 0;
};


$(document).ready(() => {
  $('.login-form').on('click', '.btn', () => {
    alert("Hello");
    const username = $('.form-name').val();
    const password = $('.form-password').val();
    const storageName = localStorage.getItem('username');
    const storagePassword = localStorage.getItem('password');
    alert(storageName);
    alert(storagePassword);
    if (username === storageName && password === storagePassword) {
      alert("Hello World");
      cookieUtil.init();
      cookieUtil.createCookie('name', storageName, 10);
      window.location = 'quiz.html';
    } else if (!$('.error-section .login-error').exists()) {
      $('.error-section').prepend('<div class="alert alert-danger login-error">Error: username or password is not correct.</div>');
    } else {
      $('.error-section .login-error').text('Error: username or password is not correct.');
    }
    return false;
  });
});
