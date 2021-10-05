import './style.css';

const populateUl = () => {
  const list = document.querySelector('.score-board');
  list.insertAdjacentHTML('beforeend', `
                              <li class="score">Name : 100</li>
                              <li class="score">Name : 20</li>
                              <li class="score">Name : 50</li>
                              <li class="score">Name : 78</li>
                              <li class="score">Name : 125</li>
                              <li class="score">Name : 77</li>
                              <li class="score">Name : 42</li>
                            `);
};

window.onload = populateUl();