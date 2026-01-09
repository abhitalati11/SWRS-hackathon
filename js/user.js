const openBtn = document.getElementById("openDialog");
const closeBtn = document.getElementById("close");
const dialog = document.getElementById("dialog");
const wastes = document.querySelectorAll(".waste");

openBtn.addEventListener("click", () => {
    dialog.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    dialog.style.display = "none";
});

dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
        dialog.style.display = "none";
    }
});

wastes.forEach(waste => {
    waste.classList.remove("active");
    waste.addEventListener("click", () => {
        wastes.forEach(w => w.classList.remove("active"));
        waste.classList.add("active");
    });
});

// checking tupe of waste enterd  by user

const garbage = document.getElementById("garbage");
const plastic = document.getElementById("plastic");
const drainage = document.getElementById("drainage");
const others = document.getElementById("others");
let waste_type ;
let selected_area = document.getElementById("area").value; // initial value

document.getElementById("area").addEventListener("change", function() {
    selected_area = this.value; // update whenever selection changes
    console.log(selected_area);
});


garbage.onclick = function() {
waste_type = "Garbage";
}

plastic.onclick = function() {
waste_type = "plastic";
}

drainage.onclick = function() {
waste_type = "drainage";
}

others.onclick = function() {
waste_type = "others";
}


// for uplaod or down. on supabase

const form = document.getElementById("dialog");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
console.log("SUBMIT HANDLER TRIGGERED");


  const description = document.getElementById("comments").value;
  const imageFile = document.getElementById("photoIP").files[0];

  const fileName = `${Date.now()}-${imageFile.name}`;

  // 1. Upload image
  const { data: imageData, error: imageError } =
    await supabaseClient.storage
      .from("waste-reports")
      .upload(fileName, imageFile);

  if (imageError) {
    alert("Image upload failed");
    return;
  }

  const imageUrl =
    supabaseClient.storage
      .from("waste-reports")
      .getPublicUrl(fileName).data.publicUrl;

  // 2. Insert report
  const { error } = await supabaseClient
    .from("reports")
    .insert([
      { waste_type, description, selected_area ,img_url: imageUrl }
    ]);

  if (error) {
    alert("Report failed");
  } else {
    alert("Report submitted successfully");
    form.reset();
  }

  setTimeout(() => {
    dialog.style.display = "none";
  }, 999);
});


// for login

const login = document.getElementById("login");

login.onclick=()=>{
  window.open(`/login/login.html`);
}