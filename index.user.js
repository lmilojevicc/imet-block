// ==UserScript==
// @name        Blokator mentora i Meti Retarda
// @run-at      document-idle
// @author      Top Dzi
// @namespace   Violentmonkey Scripts
// @match       https://imet.metropolitan.ac.rs/student/#/home
// @grant       none
// @version     1.1
// @description Digne ti se pritisak kada vidis mentora i Meti Bota na IMET-u? Top Dzi je dosao da ti pomogne!
// ==/UserScript==

function handleUrlChange() {
  if (
    window.location.href === "https://imet.metropolitan.ac.rs/student/#/home"
  ) {
    runScript();
  }
}

function runScript() {
  const intervalId = setInterval(() => {
    const botRetard = document.querySelector("#metiDialog");
    if (botRetard) {
      botRetard.remove();
    }

    const mentorElement = document.querySelector(".mentor-box p.full-name");
    if (mentorElement) {
      const mentor = mentorElement.textContent.toLowerCase();
      if (mentor.includes("nebojša gavrilović")) {
        const myNode = document.querySelector(".content.mentor");
        while (myNode.firstChild) {
          myNode.removeChild(myNode.lastChild);
        }
        const message = document.createElement("h2");
        message.textContent = "Bolje da ne znas ko ti je mentor";
        myNode.appendChild(message);
        const wrapper = document.querySelector(".mentor-box");
        wrapper.style.minHeight = "auto";
      }
    }
  }, 75);

  return () => clearInterval(intervalId);
}

let cleanup = null;

const observer = new MutationObserver(() => {
  if (cleanup) {
    cleanup();
  }
  cleanup = runScript();
});

observer.observe(document.querySelector("body"), {
  childList: true,
  subtree: true,
});

cleanup = runScript();

window.addEventListener("popstate", handleUrlChange);
window.addEventListener("hashchange", handleUrlChange);
