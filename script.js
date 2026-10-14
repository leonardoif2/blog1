const notes = [...(window.NOTES || [])].sort(
  (a, b) => new Date(`${b.date}T12:00:00`) - new Date(`${a.date}T12:00:00`)
);

const dateFormatter = new Intl.DateTimeFormat("es-MX", {
  day: "2-digit",
  month: "long",
  year: "numeric"
});

const shortDateFormatter = new Intl.DateTimeFormat("es-MX", {
  day: "2-digit",
  month: "short"
});

function safeText(value) {
  const element = document.createElement("span");
  element.textContent = value ?? "";
  return element.innerHTML;
}

function parseDate(date) {
  return new Date(`${date}T12:00:00`);
}

function renderNotes() {
  const featured = document.querySelector("#featured-note");
  const grid = document.querySelector("#notes-grid");
  const count = document.querySelector("#note-count");
  const empty = document.querySelector("#empty-state");

  count.textContent = `${String(notes.length).padStart(2, "0")} ${notes.length === 1 ? "NOTA" : "NOTAS"}`;

  if (!notes.length) {
    featured.innerHTML = "<p>Todavía no hay notas. La primera puede empezar hoy.</p>";
    empty.hidden = false;
    return;
  }

  const [latest, ...archive] = notes;
  featured.innerHTML = `
    <div class="note-meta">
      HOY
      <span>${safeText(dateFormatter.format(parseDate(latest.date)))}</span>
    </div>
    <article class="featured-body">
      <h3>${safeText(latest.title)}</h3>
      <p class="note-text">${safeText(latest.text)}</p>
      ${latest.signature ? `<p class="note-signature">${safeText(latest.signature)}</p>` : ""}
    </article>
  `;

  grid.innerHTML = archive.map((note, index) => `
    <article class="note-card" style="--delay: ${index * 90}ms">
      <span class="number">${String(notes.length - index - 1).padStart(2, "0")}</span>
      <time datetime="${safeText(note.date)}">${safeText(shortDateFormatter.format(parseDate(note.date)))}</time>
      <h3>${safeText(note.title)}</h3>
      <p>${safeText(note.text)}</p>
    </article>
  `).join("");
}

renderNotes();
document.querySelector("#year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal, .note-card").forEach((element) => observer.observe(element));
