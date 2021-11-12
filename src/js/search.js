var sindex = 0;
var cycle = false;

function start() {
    var query = getParameterByName('q');
    if (query) search(query.replaceAll("+", "%2B"));

    document.getElementById('keywords').focus();

    window.setInterval(function () {
        updatetime();
    }, 200);
}

function handleKeyPress(e) {
    var key = e.keyCode || e.which;
    var text = document.getElementById("keywords").value.replaceAll("+", "%2B");
    var option = text.substr(1, text.indexOf(' ') - 1) || text.substr(1);
    var subtext = text.substr(2 + option.length);
    if (key == 13) { // Search functions
        search(text);
    }
    if (key == 9) { // Tab Completion Functions
        e.preventDefault();
        e.stopPropagation();
        if (text[0] === ';') {
            switch (option) {
                case 't':
                    var streamers = ['admiralbahroo', 'moonmoon_ow', 'witwix'];
                    if (!subtext || cycle) {
                        cycle = true;
                        if (sindex > streamers.length - 1) sindex = 0;
                        document.getElementById("keywords").value = ';t ' + streamers[sindex++];
                        return;
                    }
                    for (var streamer of streamers) {
                        if (subtext === streamer.substr(0, subtext.length)) {
                            document.getElementById("keywords").value = ';t ' + streamer;
                            return;
                        }
                    }
                    break;
            }
        }
    }
    // if(key == 32){ //Space to go to search
        // document.getElementById("keywords").focus();
    // }
    sindex = 0;
    cycle = false;
}

let providers = [
	['at' ,'https://alternativeto.net/'     ,'browse/search?q='],
	['am' ,'https://www.allmusic.com/'      ,'search/all/'],
	['di' ,'https://www.discogs.com/'       ,'search/?q='],
	['d'  ,'https://duckduckgo.com/'        ,'?q='],
	['g'  ,'https://www.google.com/'        ,'search?q='], //this one is the default if no shortcut is used
	['gh' ,'https://github.com/'            ,'search?q='],
	['i'  ,'https://www.imdb.com/'          ,'find?q='],
	['m'  ,'https://www.themoviedb.org/'    ,'search?query='],
	['o'  ,'https://www.opensubtitles.org/' ,'?MovieName='],
	['r'  ,'https://www.reddit.com/'        ,'search?q='],
	['q'  ,'https://www.qwant.com/'         ,'?q='],
	['so' ,'https://soundcloud.com/'        ,'search?q='],
	['s'  ,'https://open.spotify.com/'      ,'search/results/'],
	['t'  ,'https://trakt.tv/'              ,'search?query='],
	['tv' ,'https://www.thetvdb.com/'       ,'search?query='],
	['y'  ,'https://www.youtube.com/'       ,'results?search_query=']
];

function search(text) {
    var option = text.substr(1, text.indexOf(' ') - 1) || text.substr(1);
    var subtext = text.substr(2 + option.length);
    if (text[0] === '!') { // Type !shortcut
        if (text.indexOf(' ') > -1) { // Then a space
			providers.forEach(p => {
				if (option == p[0]) {
					window.location = p[1] + p[2] + subtext; // do a search
				}
			});
        } else { // or nothing
            var option = text.substr(1);
			providers.forEach(p => {
				if (option == p[0]) {
					window.location = p[1] + subtext; // open the site root url
				}
			});
        }
    } else if (validURL(text)) {
        if (containsProtocol(text))
            window.location = text;
        else
            window.location = "https://" + text;
    } else {
        window.location = "https://www.google.com/search?q=" + text;
    }
}

// Source: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

function containsProtocol(str) {
    var pattern = new RegExp('^(https?:\\/\\/){1}.*', 'i');
    return !!pattern.test(str);
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
