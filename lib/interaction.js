function changeTextDisplay() {
  $l("form.text-display").first().addEventListener("submit", (event) => {
    event.preventDefault();
    const text = $l("form.text-display input.text").first().value;
    $l("p.text-display").html(text);
  });
  $l("form.clear-display").first().addEventListener("submit", (event) => {
    event.preventDefault();
    $l("p.text-display").empty();
  });
}

function appendRemoveDisplay() {
  $l("form.append-tail").first().addEventListener("submit", (event) => {
    event.preventDefault();
    $l("p.donkey").append("<p class='tail'>tail</p>");
  });
  $l("form.remove-tails").first().addEventListener("submit", (event) => {
    event.preventDefault();
    $l("p.tail").remove();
  });
}

function classDisplay() {
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
}

function onOffDisplay() {
  $l("form.on").first().addEventListener("submit", (event) => {
    event.preventDefault();
    const lightswitch = $l("img.lightswitch");
    const light = $l("img.light");
    if ( !lightswitch.first().className.includes("connected")) {
      lightswitch.addClass("connected");
      lightswitch.on("click", () => {
        if (light.first().className.includes("off")) {
          light.attr('src','./assets/images/lightbulb-on.png');
        } else {
          light.attr('src','./assets/images/lightbulb-off.png');
        }
        light.toggleClass("off");
      });
    }
  });
  $l("form.off").first().addEventListener("submit", (event) => {
    event.preventDefault();
    const lightswitch = $l("img.lightswitch");
    lightswitch.off("click");
    lightswitch.removeClass("connected");
    lightswitch.on("click", () => {
      lightswitch.toggleClass("toggled");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  changeTextDisplay();
  appendRemoveDisplay();
  classDisplay();

  $l("img.lightswitch").on("click", () => {
    $l("img.lightswitch").toggleClass("toggled");
  });
  onOffDisplay();
});
