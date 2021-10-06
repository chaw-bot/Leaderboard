import "./style.css";

// create new game
if (localStorage.getItem("Game-ID") === null) {
  async function getID() {
    const response = await fetch(
      "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/",
      {
        method: "POST",
        body: JSON.stringify({
          name: "Formula 1",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    const id = await response.json();
    return id;
  }

  getID().then((id) => {
    localStorage.setItem("Game-ID", JSON.stringify(id));
  });
}

async function getScores() {
  const list = document.querySelector(".score-board");

  list.innerHTML = "";

  const response = await fetch(
    "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/jM1sByj470X5lUptQV2M/scores"
  );
  const scores = await response.json();
  return scores;
}

const refresh = document.querySelector('.refresh');
refresh.addEventListener('click', () => {
  getScores().then(scores => {
    const user = scores.result;
    user.forEach(user => {
      const list = document.querySelector(".score-board");
      const person = document.createElement('li');
      person.className = 'score';
      person.innerHTML = `${user.user}  :  ${user.score}`;
      list.appendChild(person)
    });
  });
});

async function addScore(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const scores = await response.json();
  return scores;
}

const submitBtn = document.querySelector(".submit");

submitBtn.addEventListener("click", (e) => {
  const InputName = document.getElementById('names');
  const InputScore = document.getElementById('scores');

  let name = InputName.value;
  let score = InputScore.value;

  addScore(
    "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/jM1sByj470X5lUptQV2M/scores",
    { user: name, score: score }
  ).then((data) => { data; });

  InputName.value = '';
  InputScore.value = '';
  e.preventDefault();
});

window.onload = getScores();