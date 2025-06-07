function search() {
  const inputPanel = document.getElementById("input");
  const movieName = inputPanel.value.trim();
  const errorElement = document.getElementById("error");
  const poster = document.getElementById("poster");

  errorElement.textContent = "";
  poster.src = "";
  poster.alt = "Movie Poster";
  document.querySelectorAll(".details-table td").forEach((td) => (td.textContent = "N/A"));

  if (!movieName) {
    errorElement.textContent = "Please enter a movie title.";
    return;
  }

  fetch(`/api/movie?title=${encodeURIComponent(movieName)}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response === "False") {
        throw new Error(data.Error || "Movie not found");
      }

      poster.src = data.Poster || "";
      poster.alt = data.Title || "No Poster";

      document.getElementById("title").textContent = data.Title || "N/A";
      document.getElementById("year").textContent = data.Year || "N/A";
      document.getElementById("actor").textContent = data.Actors || "N/A";
      document.getElementById("awards").textContent = data.Awards || "N/A";
      document.getElementById("country").textContent = data.Country || "N/A";
      document.getElementById("writer").textContent = data.Writer || "N/A";
      document.getElementById("director").textContent = data.Director || "N/A";
      document.getElementById("genre").textContent = data.Genre || "N/A";
      document.getElementById("language").textContent = data.Language || "N/A";
    })
    .catch((err) => {
      errorElement.textContent = err.message;
    });
}
