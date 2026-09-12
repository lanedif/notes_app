async function loadActions() {
  const container = document.querySelector("#actions-container");

  try {
    const response = await fetch("data/actions.json");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
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
    console.error(error);
    container.innerHTML = `
      <p class="error">
        Unable to load actions.
      </p>
    `;
  }
}

loadActions();
