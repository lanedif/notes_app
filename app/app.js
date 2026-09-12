// Find the dark-mode controls from index.html
const themeToggle = document.querySelector("#theme-toggle");
const darkModeStylesheet = document.querySelector("#dark-mode-stylesheet");

// Turn dark mode on or off
function setDarkMode(isDark) {
  darkModeStylesheet.disabled = !isDark;
  themeToggle.checked = isDark;

  // Remember the user's choice
  localStorage.setItem("darkMode", isDark);
}

// Load the saved theme choice
const savedDarkMode = localStorage.getItem("darkMode") === "true";

setDarkMode(savedDarkMode);

// Respond when the switch is clicked
themeToggle.addEventListener("change", () => {
  setDarkMode(themeToggle.checked);
});


// Load the action data
async function loadActions() {
  const container = document.querySelector("#actions-container");

  try {
    const response = await fetch("../data/actions.json");

    if (!response.ok) {
      throw new Error(`Could not load file: HTTP ${response.status}`);
    }

    const actions = await response.json();

    if (actions.length === 0) {
      container.innerHTML = "<p>No actions found.</p>";
      return;
    }

    container.innerHTML = actions.map(action => `
      <article class="action-card">
        <span class="status ${action.status}">
          ${action.status}
        </span>

        <h3>${action.text}</h3>
        <p class="source">Source: ${action.source}</p>
      </article>
    `).join("");
  } catch (error) {
    console.error("Unable to load actions:", error);

    container.innerHTML = `
      <p class="error">
        Unable to load actions: ${error.message}
      </p>
    `;
  }
}

// Start loading the actions
loadActions();
