import './style.css';
import { createGame } from './api.js';

const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

const html = ` <header>
<h1>Leaderboard</h1>
</header>

<main>
<section class="recent-scores">
    <div class="score-refresh">
        <h2>Recent scores</h2>
        <button>Refresh</button>
    </div>
   
    <ul class="actual-scores">
        <li>Name: 100</li>
        <li>Name: 20</li>
        <li>Name: 50</li>
        <li>Name: 78</li>
        <li>Name: 125</li>
        <li>Name: 77</li>
        <li>Name: 42</li>
    </ul>
</section>

<section class="form-section">
    <h2>Add your score</h2>
    <form action="#">
        <input type="text" name="name" id="name" placeholder="Your name">
        <input type="number" name="score" id="score" placeholder="Your score">
        <input type="submit" value="Submit">
      </form>
</section>
</main>
`;

document.body.innerHTML = html;
