function date() {
  let currentDate = new Date();
  let dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  let date = currentDate.toLocaleDateString("en-GB", dateOptions);
  document.getElementById("header_date").innerHTML = date;
}

function greet() {
  let currentTime = new Date();
  let greet = Math.floor(currentTime.getHours() / 6);
  switch (greet) {
    case 0:
      document.getElementById("header_greet").innerHTML = "Good night!";
      break;
    case 1:
      document.getElementById("header_greet").innerHTML = "Good morning!";
      break;
    case 2:
      document.getElementById("header_greet").innerHTML = "Good afternoon!";
      break;
    case 3:
      document.getElementById("header_greet").innerHTML = "Good evening!";
      break;
  }
}

function loadFunctions() {
  date();  
  greet();
}

Handlebars.registerHelper('strip-protocol', function (url) {
    return url.replace(/.*[/]{2}/s,'')
})

Handlebars.registerHelper('isAsset', function (icon) {
    // The logic here is perhaps a bit too simplistic
    // Check the presence of a dot in icon name
    // so we know it is a .png, .jpg, .svg, etc.
    let match = icon.toString().match(/[.]/g);
    return match;
})

// Close modal if click outside
document.getElementById('modal').onclick = function(e) {
    if (!document.getElementById('modal-container').contains(e.target)){
        window.location = "#";
    }
}