/*

  const allQuestions = [
  {
    question: 'During Chapter 9, when do you fight the "Mysterious Man"?',
    choices: ['9-5', '8-5', '9-4', '9-3'],
    correctAnswer: 2,
  },
  {
    question: 'Choose the character that was NOT part of the same banner as the other 3.',
    choices: ['Lyn', 'Robin', 'Takumi', 'Camilla'],
    correctAnswer: 1,
  },
  {
    question: 'Which character is NOT part of the new cast of heroes first introduced in Fire Emblem Heroes" story?',
    choices: ['Alphonse', 'Sharena', 'Anna', 'Veronica'],
    correctAnswer: 2,
  },
  {
    question: 'Which of these characters in FE: Heroes is NOT part of the "Red" weapon triangle?',
    choices: ['Lyn', 'Tharja', 'Sanaki', 'Linde'],
    correctAnswer: 3,
  },
  {
    question: 'How many Arena matches can you win in a row before the total score is added up?',
    choices: [4, 5, 6, 7],
    correctAnswer: 3,
  },
];
*/

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

$(document).ready(() => {
  $.getJSON('../data/questions.json', (data) => {
    allQuestions = data;
  });
  // Create a question, and four inputs for each possible answer
  const question = allQuestions[index];
  const form = $('<form method="post" id="myForm"></form>');
  form.append(`<h2>${question.question}</h2>`);
  const list = $('<ul class="quizList"></ul>');
  let answerValue = 0;
  question.choices.forEach((choice) => {
    list.append(`<li><input type="radio" name="answer" value=${answerValue}><label>${choice}</label></li>`);
    answerValue += 1;
  });
  form.append(list);
  form.append('<button class="button" id="nextButton" type="button">Next</button>');
  form.append('<button class="button" id="backButton" type="button">Back</button>');
  $('#sectThree').append(form);
});

$(document).ready(() => {
  $('#myForm').on('click', '#nextButton', () => {
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
        /* eslint-disable-next-line func-names */
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
  $('#myForm').on('click', '#backButton', () => {
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
        /* eslint-disable-next-line func-names */
        quizItems.each(function (i) {
          $(this).text(question.choices[i]);
        });
        $(`input[value=${userAnswer}]`).prop('checked', true);
      });
      $('form').fadeIn(300);
    }
  });
});

$('window').on('unload', () => {
  const i = 4;
  while (i > 0) {
    localStorage.removeItem(`answer${i}`);
  }
});
