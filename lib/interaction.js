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
    const circuitswitch = $l("img.circuitswitch");
    const room = $l("div.DOMain-on-off");
    if ( !lightswitch.first().className.includes("connected")) {
      lightswitch.addClass("connected");
      circuitswitch.attr('src', './assets/images/closed-switch.png');
      lightswitch.on("click", () => {
        if (light.first().className.includes("off")) {
          light.attr('src','./assets/images/lightbulb-on.png');
        } else {
          light.attr('src','./assets/images/lightbulb-off.png');
        }
        light.toggleClass("off");
        room.toggleClass("lights-on");
      });
    }
  });
  $l("form.off").first().addEventListener("submit", (event) => {
    event.preventDefault();
    const circuitswitch = $l("img.circuitswitch");
    circuitswitch.attr('src', './assets/images/open-switch.png');
    const lightswitch = $l("img.lightswitch");
    lightswitch.off("click");
    lightswitch.removeClass("connected");
    lightswitch.on("click", () => {
      lightswitch.toggleClass("toggled");
    });
  });
}

const fetchSearchGiphys = searchTerm => (
  $l.ajax({
    method: 'GET',
    url: `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&limit=1`
  })
);

function ajaxDisplay() {
  $l("form.ajax").first().addEventListener("submit", (event) => {
    event.preventDefault();
    const searchTerm = $l("form.ajax input.query").first().value;
    fetchSearchGiphys(searchTerm).then(data => {
      if (data[0]) {
        $l("img.giphy").attr("src", data[0].images.fixed_height.url);
      }
    });
  });
}

function modalDisplay() {
  const modal = document.getElementById('about');
  modal.style.display = "none";
  $l("div.about-DOMain").click( function() {
    modal.style.display = "block";
  });
  const span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
    modal.style.display = "none";
  };
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  changeTextDisplay();
  appendRemoveDisplay();
  classDisplay();

  $l("img.lightswitch").on("click", () => {
    $l("img.lightswitch").toggleClass("toggled");
  });
  onOffDisplay();
  ajaxDisplay();
  modalDisplay();
});
