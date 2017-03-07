$(document).ready(() => {
  $('#sectTwo').on('click', '#startButton', () => {
    alert('Hi');
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

$(document).ready(() => {
  $('#header').on('click', 'p', () => {
    window.location = 'login.html';
  });
});
