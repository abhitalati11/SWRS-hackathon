const listEl = document.getElementById("complaints-list");
const filterButtons = document.querySelectorAll(".chip");

let allReports = [];

// 🔹 Fetch reports
async function fetchReports() {
  const { data, error } = await supabaseClient
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch error:", error);
    return;
  }

  allReports = data;
  renderReports("all");
}

// 🔹 Render reports
function renderReports(filter) {
  listEl.innerHTML = "";

  let filtered = allReports;

  if (filter !== "all") {
    filtered = allReports.filter(r => r.status === filter);
  }

  if (filtered.length === 0) {
    listEl.innerHTML = "<p>No complaints found</p>";
    return;
  }

  filtered.forEach(reports => {
    const imageUrl = supabaseClient.storage
      .from("waste-reports")
      .getPublicUrl(reports.img_url).data.publicUrl;

    const card = document.createElement("div");
    card.className = "complaint-card";

    card.innerHTML = `
      <img src="${imageUrl}" alt="complaint image">
      <div class="info">
        <h4>${reports.selected_area}</h4>
        <p>${reports.description || "No description"}</p>
        <span class="status ${reports.status}">
          ${reports.status.toUpperCase()}
        </span>
      </div>
    `;

    listEl.appendChild(card);
  });
}

// 🔹 Filter buttons
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    renderReports(filter);
  });
});

// 🔹 Init
fetchReports();

setInterval(() => {
  fetchReports();
  console.log("check done");
}, 10000);