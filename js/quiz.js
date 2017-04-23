let allQuestions;

let index = 0;
let correctAnswers = 0;
const answers = [];

function getCorrectAnswers() {
  let totalCorrect = 0;
  for (let i = 0, len = answers.length; i < len; i += 1) {
    if (answers[i] === allQuestions[i].correctAnswer) {
      totalCorrect += 1;
    }
  }
  return totalCorrect;
}
function startQuiz() {
  /*$('startButton').css({ 'background-color': '#aa8f00',
    outline: 'none',
    'box-shadow': 'inset 0px 0px 4px #ccc' });*/

  $('.form-box').fadeOut(300, () => {
    $.getJSON('./data/questions.json', (data) => {
      $('.form-top h2').remove();
      $('.form-bottom button').remove();
      allQuestions = data;
      // Create a question, and four inputs for each possible answer
      let question = allQuestions[index];
      //let form = $('<form method="post" id="myForm"></form>');
      let form = $('.registration-form');
      $('.form-top').append(`<h2>${question.question}</h2>`);
     // form.append(`<h2>${question.question}</h2>`);
      const list = $('<ul class="quiz-list"></ul>');
      let answerValue = 0;
      question.choices.forEach((choice) => {
        list.append(`<li><input type="radio" name="answer" value=${answerValue} id="radio${answerValue + 1}"><label for=radio${answerValue + 1}>${choice}</label></li>`);
        answerValue += 1;
      });
      form.append(list);
      form.append('<div class="next"><button type="button" class="btn-primary">Next</button></div>');
      form.append('<div class="back"><button type="button" class="btn-primary">Back</button></div>');
      

      $('.form-bottom').on('click', '.next', () => {
        if (!$('input:radio').is(':checked')) {
          alert('Please choose an answer before moving on.');
        } else {
          $('.form-box').fadeOut(300, () => {
            const userAnswer = +$('input[name="answer"]:checked').val();
            answers.push(userAnswer);
            localStorage.setItem(`answer${index}`, userAnswer);
            if (index === allQuestions.length - 1) {
              correctAnswers = getCorrectAnswers();
              alert(`Congratulations for finishing the quiz. You got ${correctAnswers} questions right!`);
              window.location = 'index.html';
              return;
            }
            index += 1;
            question = allQuestions[index];
            form = $('body').find('.registration-form');
            $('.form-top').text(question.question);
            const quizItems = $('label');
            // eslint-disable-next-line func-names
            quizItems.each(function (i) {
              $(this).text(question.choices[i]);
            });
            if (localStorage.getItem(`answer${index}`)) {
              const nextAnswer = localStorage.getItem(`answer${index}`);
              $(`input[value=${nextAnswer}]`).prop('checked', true);
            } else {
              $(`input[value=${userAnswer}]`).prop('checked', false);
            }
          });
          $('.form-box').fadeIn(300);
        }
      });


      $(document).ready(() => {
        $('.form-bottom').on('click', '.back', () => {
          if (index === 0) {
            alert('This is the first question, cannot go further back.');
          } else {
            $('.form-box').fadeOut(300, () => {
              index -= 1;
              answers.pop();
              const userAnswer = localStorage.getItem(`answer${index}`);
              question = allQuestions[index];
              form = $('body').find('.registration-form');
              form.find('h2').text(question.question);
              const quizItems = $('label');
              // eslint-disable-next-line func-names
              quizItems.each(function (i) {
                $(this).text(question.choices[i]);
              });
              $(`input[value=${userAnswer}]`).prop('checked', true);
            });
            $('.form-box').fadeIn(300);
          }
        });
      });
    });
  });
  $('.form-box').fadeIn(300);
}


$(document).ready(() => {
  const userName = cookieUtil.readCookie('name');
  $('.form-top').append(`<h2>Hello ${userName}, click the button below to start the Quiz!</h2>`);
  $('.form-bottom').append('<div class="start"><button type="submit" class="btn">Start Quiz!</button></div>');
});

$(document).ready(() => {
  $('.form-bottom').on('click', '.start .btn', () => {
    startQuiz();
  });
});

/*
$(document).ready(() => {
  $('form').on('click', '#nextButton', () => {
    if (!$('input:radio').is(':checked')) {
      alert('Please choose an answer before moving on.');
    } else {
      $('form').fadeOut(300, () => {
        const userAnswer = +$('input[name="answer"]:checked').val();
        answers.push(userAnswer);
        localStorage.setItem(`answer${index}`, userAnswer);
        if (index === allQuestions.length - 1) {
          correctAnswers = getCorrectAnswers();
          alert(`Congratulations for finishing the quiz. You got ${correctAnswers} questions right!`);
          window.location = 'index.html';
          return;
        }
        index += 1;
        const question = allQuestions[index];
        const form = $('body').find('#myForm');
        form.find('h2').text(question.question);
        const quizItems = $('label');
        // eslint-disable-next-line func-names
        quizItems.each(function (i) {
          $(this).text(question.choices[i]);
        });
        if (localStorage.getItem(`answer${index}`)) {
          const nextAnswer = localStorage.getItem(`answer${index}`);
          $(`input[value=${nextAnswer}]`).prop('checked', true);
        } else {
          $(`input[value=${userAnswer}]`).prop('checked', false);
        }
      });
      $('form').fadeIn(300);
    }
  });
});

$(document).ready(() => {
  $('form').on('click', '#backButton', () => {
    if (index === 0) {
      alert('This is the first question, cannot go further back.');
    } else {
      $('form').fadeOut(300, () => {
        index -= 1;
        answers.pop();
        const userAnswer = localStorage.getItem(`answer${index}`);
        const question = allQuestions[index];
        const form = $('body').find('#myForm');
        form.find('h2').text(question.question);
        const quizItems = $('label');
        // eslint-disable-next-line func-names
        quizItems.each(function (i) {
          $(this).text(question.choices[i]);
        });
        $(`input[value=${userAnswer}]`).prop('checked', true);
      });
      $('form').fadeIn(300);
    }
  });
});
*/
