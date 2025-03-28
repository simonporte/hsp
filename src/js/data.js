function fetchAndRender (name) {
    fetch('assets/' + name + '.yml')
    // fetch(name + '.json')
        // .then(response => response.json())
        .then(response => response.text())
        .then(rawyaml => YAML.parse(rawyaml))
        .then(data => {
            const mysource = document.getElementById(name + '-template').innerHTML;
            const mytemplate = Handlebars.compile(mysource);
            const myresult = mytemplate(data);
            document.getElementById(name).innerHTML = myresult;
        });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndRender('apps');
    fetchAndRender('bookmarks');
    fetchAndRender('greetings');
    fetchAndRender('search-engines');
    fetchAndRender('themes');
    date();
});
