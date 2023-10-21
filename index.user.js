// ==UserScript==
// @name        Blokator Nebojse i Meti Retarda
// @run-at      document-idle
// @author      Top Dzi
// @namespace   Violentmonkey Scripts
// @match       https://imet.metropolitan.ac.rs/student/#/home
// @grant       none
// @version     1.0
// @description Digne ti se pritisak kada vidis Nebojsu i Meti Bota na IMET-u? Top Dzi je dosao da ti pomogne!
// ==/UserScript==

let runCount = 0;
const intervalId = setInterval(() => {
  const botRetard = document.querySelector('#metiDialog');
  if (botRetard) {
    botRetard.remove();
  }

  const mentor = document
    .querySelector('.mentor-box p.full-name')
    .textContent.toLowerCase();

  if (mentor.includes('nebojša gavrilović')) {
    const myNode = document.querySelector('.content.mentor');
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
    const message = document.createElement('h2');
    message.textContent = 'Bolje da ne znas ko ti je mentor';
    myNode.appendChild(message);
    const wrapper = document.querySelector('.mentor-box');
    wrapper.style.minHeight = 'auto';
  }

  runCount++;
  if (runCount >= 5) {
    clearInterval(intervalId);
  }
}, 75);
