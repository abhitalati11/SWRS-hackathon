const container = document.getElementById("reportsContainer");

// 🔹 Fetch data from Supabase
async function loadReports() {
  const { data, error } = await supabaseClient
    .from("reports")
    .select(" description, waste_type, location , img_url : ");

  if (error) {
    console.error(error);
    return;
  }

  renderReports(data);
}

// 🔹 Render cards dynamically
function renderReports(reports) {
  container.innerHTML = "";

  reports.forEach(report => {
    const card = document.createElement("div");
    card.className = "card";

    let upvotes = 0; // local only

    card.innerHTML = `
      <h3>${report.waste_type}</h3>
      <p>${report.description}</p>
      <div class="meta">📍 ${report.location}</div>
      <button class="upvote-btn">⬆ Upvote (<span>0</span>)</button>
    `;

    const btn = card.querySelector(".upvote-btn");
    const countSpan = btn.querySelector("span");

    btn.addEventListener("click", () => {
      upvotes++;
      countSpan.textContent = upvotes;
    });

    container.appendChild(card);
  });
}

// 🔹 Initial call
loadReports();