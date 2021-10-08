import './style.css';
import { createGame, createScores, fetchScore } from './api.js';

const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

const html = ` <header>
<h1>Leaderboard</h1>
</header>

<main>
<section class="recent-scores">
    <div class="score-refresh">
        <h2>Recent scores</h2>
        <button id="refresh">Refresh</button>
    </div>
   
    <ul class="actual-scores">
    </ul>
</section>

<section class="form-section">
    <h2>Add your score</h2>
    <form action="#">
        <input type="text" name="name" id="name" placeholder="Your name">
        <input type="number" name="score" id="score" placeholder="Your score">
        <input type="submit" id="submit" value="Submit">
      </form>
</section>
</main>
`;

document.body.innerHTML = html;

const gameIdFromStorage = () => {
  const localStorageID = localStorage.getItem('ID')
    ? JSON.parse(localStorage.getItem('ID'))
    : null;
  return localStorageID;
};

const saveGameLs = () => {
  const data = {
    name: 'my new game',
  };
  if (!gameIdFromStorage()) {
    window.addEventListener('load', async () => {
      const { result } = await createGame(`${baseURL}games`, data);
      const gameID = result.substr(14, 20);
      localStorage.setItem('ID', JSON.stringify(gameID));
    });
  }
};

const newScore = () => {
  const data = {
    user: '',
    score: '',
  };
  const userInputField = document.getElementById('name');
  const scoreInputField = document.getElementById('score');
  const submitButton = document.getElementById('submit');

  userInputField.addEventListener('change', (e) => {
    data.user = e.target.value;
  });
  scoreInputField.addEventListener('change', (e) => {
    data.score = e.target.value;
  });

  submitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const url = `${baseURL}games/${gameIdFromStorage()}/scores/`;
    await createScores(url, data);
    userInputField.value = '';
    scoreInputField.value = '';
    window.location.reload();
  });
};

const getScores = async () => {
  const ulTag = document.querySelector('.actual-scores');
  const liTag = document.createElement('li');
  const smallTag1 = document.createElement('small');
  const smallTag2 = document.createElement('small');
  const url = `${baseURL}games/${gameIdFromStorage()}/scores/`;
  const { result } = await fetchScore(url);
  result.sort((a, b) => b.score - a.score);
  result.forEach((item) => {
    smallTag1.textContent = `${item.user}: `;
    smallTag2.textContent = item.score;
    liTag.appendChild(smallTag1);
    liTag.appendChild(smallTag2);
    ulTag.appendChild(liTag.cloneNode(true));
  });
};

const refresh = document.querySelector('#refresh');
refresh.addEventListener('click', () => {
  window.location.reload();
});

getScores();
saveGameLs();
newScore();
