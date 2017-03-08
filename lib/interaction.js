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
});
