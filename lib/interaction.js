document.addEventListener("DOMContentLoaded", () => {
  $l("form.text-display").first().addEventListener("submit", (event) => {
    event.preventDefault();
    const text = $l("form.text-display input.text").first().value;
    $l("p.text-display").html(text);
  });
  $l("form.clear-display").first().addEventListener("submit", (event) => {
    event.preventDefault();
    $l("p.text-display").empty();
  });
  $l("form.append-tail").first().addEventListener("submit", (event) => {
    event.preventDefault();
    $l("p.donkey").append("<p class='tail'>tail</p>");
  });
  $l("form.remove-tails").first().addEventListener("submit", (event) => {
    event.preventDefault();
    $l("p.tail").remove();
  });
  $l("form.add-class").first().addEventListener("submit", (event) => {
    event.preventDefault();
    const face = $l("img.class-face");
    face.addClass("classy");
    face.attr('src','./assets/images/classface.png');
  });
  $l("form.remove-class").first().addEventListener("submit", (event) => {
    event.preventDefault();
    const face = $l("img.class-face");
    face.removeClass("classy");
    face.attr('src','./assets/images/noclassface.png');
  });
});
