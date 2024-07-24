const fancyboxAttrName = "data-fancybox";

function wrap(el) {
  const wrappingElement = document.createElement("a");
  wrappingElement.href = el.src;
  wrappingElement.setAttribute(fancyboxAttrName, "gallery");
  el.parentElement.insertBefore(wrappingElement, el);
  wrappingElement.appendChild(el);
}

document.querySelectorAll(".gallery img").forEach((el) => {
  wrap(el);
});

Fancybox.bind('[data-fancybox="gallery"]', {
  Toolbar: {
    display: {
      left: ["infobar"],
      right: ["close"],
    },
  },
});
