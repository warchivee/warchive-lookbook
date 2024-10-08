const partsCounts = {
  eyebrows: 10,
  eyes: 10,
  nose: 10,
  mouth: 10,
  head: 12,
  top: 12,
  bottom: 12,
  shoes: 12,
  accessories: 9,
};

const selectedParts = {
  eyebrows: 1,
  eyes: 1,
  nose: 1,
  mouth: 1,
  head: 1,
  top: 1,
  bottom: 1,
  shoes: 1,
  accessories: 1,
};

function saveImage() {
  const canvas = document.getElementById("avatarCanvas");
  const context = canvas.getContext("2d");
  const images = document.querySelectorAll(".avatar img");

  const width = 600;
  const height = 600;
  const padding = 10;
  const footerHeight = 90;

  canvas.width = width;
  canvas.height = height + footerHeight;

  images.forEach((img) => {
    context.drawImage(img, 0, 0, width, height);
  });
  
  const logoImage = new Image();
  logoImage.src = '/images/game/nmc_logo_txt.png';
  logoImage.onload = () => {
    const logoWidth = 197;
    const logoHeight = 25;
    const logoX = (canvas.width - logoWidth) / 2;
    const logoY = height + padding;
    context.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight);

    const text = "nomore-corset.womynarchive.com";
    context.font = "20px Arial";
    context.fillStyle = "#000000";
    const textX = (canvas.width - context.measureText(text).width) / 2;
    const textY = logoY + logoHeight + padding * 3;
    context.fillText(text, textX, textY);

    const link = document.createElement("a");
    link.download = "my_corset-free_avatar.png";
    link.href = canvas.toDataURL();
    link.click();
  };
}

function loadParts(category) {
  const partsDiv = document.getElementById("parts");

  while (partsDiv.firstChild) {
    partsDiv.removeChild(partsDiv.firstChild);
  }

  for (let index = 0; index < partsCounts[category]; index++) {
    const img = document.createElement("img");

    img.src = `images/game/${category}/thumbnail/${index + 1}.png`;
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

      part.src = `images/game/${category}/parts/${this.getAttribute(
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

loadParts("eyebrows");
