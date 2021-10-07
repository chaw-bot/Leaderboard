import './style.css';

const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net';

// create new game
async function getID() {
  const response = await fetch(
    `${baseUrl}/api/games/`,
    {
      method: 'POST',
      body: JSON.stringify({
        name: 'Formula 1',
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  );

  const id = await response.json();
  return id;
}

getID().then((id) => {
  localStorage.setItem('Game-ID', JSON.stringify(id));
});

async function getScores() {
  const list = document.querySelector('.score-board');

  list.innerHTML = '';

  const response = await fetch(
    `${baseUrl}/api/games/nBQCymqMWMPxm9purHyt/scores`,
  );
  const scores = await response.json();
  return scores;
}

const refresh = document.querySelector('.refresh');
refresh.addEventListener('click', () => {
  getScores().then((scores) => {
    const user = scores.result;
    user.forEach((user) => {
      const list = document.querySelector('.score-board');
      const person = document.createElement('li');
      person.className = 'score';
      person.innerHTML = `${user.user}  :  ${user.score}`;
      list.appendChild(person);
    });
  });
});

async function addScore(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const scores = await response.json();
  return scores;
}

const submitBtn = document.querySelector('.submit');

submitBtn.addEventListener('click', (e) => {
  const InputName = document.getElementById('names');
  const InputScore = document.getElementById('scores');

  const name = InputName.value;
  const score = InputScore.value;

  addScore(`${baseUrl}/api/games/nBQCymqMWMPxm9purHyt/scores`,
    { user: name, score });

  InputName.value = '';
  InputScore.value = '';
  e.preventDefault();
});

window.onload = getScores();