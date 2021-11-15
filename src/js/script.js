function date() {
  // Date format is based on browser default locale
  let currentDate = new Date();
  let locale = new Intl.DateTimeFormat().resolvedOptions();
  let date = new Intl.DateTimeFormat(locale, { dateStyle: 'full'}).format(currentDate);
  document.getElementById("header_date").innerHTML = date;
}


Handlebars.registerHelper('print_greeting', function (greetings) {
    // Performance-wise, this is not really suitable for frequent real time updates
    let currentTime = new Date();
    let currentHour = Math.floor(currentTime.getHours());

    let match = greetings.sort().reverse().find( ({start}) => start <= currentHour );
    if (match === undefined) { // If less than lowest start value
        return greetings[0].text // Use highest start value (0 in reverse order)
    }
    else {
        // Return the lowest possible value that match with current hour
        return match.text
    }
})


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