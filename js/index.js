$(document).ready(function () {
  $('#sectTwo').on('click', '#startButton', function () {
    $('#startButton').css({ 'background-color': '#aa8f00',
      outline: 'none',
      'box-shadow': 'inset 0px 0px 4px #ccc' });
    if (cookieUtil.readCookie('name')) {
      window.location = 'quiz.html';
    } else {
      window.location = 'login.html';
    }
  });
});

$(document).ready(function () {
  $('#header').on('click', 'p', function () {
    alert('Hi');
    if (window.location) {
      window.location = 'login.html';
    }
    document.location = 'login.html';
  });
});