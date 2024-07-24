const partsCounts = {
  head: 1,
  eyebrows: 1,
  eyes: 1,
  mouth: 1,
  nose: 1,
  bottom: 2,
  top: 1,
  shoes: 1,
};

const selectedParts = {
  head: 1,
  eyebrows: 1,
  eyes: 1,
  mouth: 1,
  nose: 1,
  bottom: 1,
  top: 1,
  shoes: 1,
};

function saveImage() {
  const canvas = document.getElementById("avatarCanvas");
  const context = canvas.getContext("2d");
  const images = document.querySelectorAll(".avatar img");

  const width = 600;
  const height = 600;

  canvas.width = 600;
  canvas.height = 600;

  images.forEach((img) => {
    context.drawImage(img, 0, 0, width, height);
  });

  const link = document.createElement("a");
  link.download = "my corset-free avatar.png";
  link.href = canvas.toDataURL();
  link.click();
}

function loadParts(category) {
  const partsDiv = document.getElementById("parts");

  while (partsDiv.firstChild) {
    partsDiv.removeChild(partsDiv.firstChild);
  }

  for (let index = 0; index < partsCounts[category]; index++) {
    const img = document.createElement("img");

    img.src = `images/game/${category}/${category}${index + 1}.png`;
    img.alt = `${category} ${index + 1}`;
    img.setAttribute("data-part-id", index + 1);

    if (selectedParts[category] == index + 1) {
      img.classList.add("selected");
    }

    partsDiv.appendChild(img);
  }

  document.querySelectorAll("#parts img").forEach((item) => {
    item.addEventListener("click", function () {
      const part = document.querySelector(
        `#avatar img[data-value="${category}"]`
      );

      part.src = `images/game/${category}/${category}${this.getAttribute(
        "data-part-id"
      )}.png`;
      selectedParts[category] = this.getAttribute("data-part-id");

      document
        .querySelector("#parts img.selected")
        ?.classList.remove("selected");

      this.classList.add("selected");
    });
  });
}

function initPartCategoryButtons() {
  document.querySelectorAll("#partCategories li").forEach((item) => {
    item.addEventListener("click", function () {
      document
        .querySelector("#partCategories li.selected")
        .classList.remove("selected");

      this.classList.add("selected");

      loadParts(this.getAttribute("data-part"));
    });
  });
}

initPartCategoryButtons();

loadParts("head");
