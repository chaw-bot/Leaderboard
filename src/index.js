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