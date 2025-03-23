# HSP - Homelab StartPage

*A home page for your server, that can be used as a new tab page*

![screenshot](https://github.com/user-attachments/assets/0153f7d6-5d37-49e2-b3a2-cfd4d9978922)

[![Demo page](https://img.shields.io/badge/go%20to-demo%20page-blue)](https://simonporte.github.io/hsp/)
[![Download](https://img.shields.io/badge/download-latest%20version-brightgreen)](https://github.com/simonporte/hsp/archive/refs/heads/master.zip)

To apply a theme, click on the cog button on the top right corner.

## Set as new tab page

Install an extension such as [New Tab Redirect
](https://github.com/jimschubert/NewTab-Redirect) available in [Chrome Web Store](https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna?hl=en)

## Installation

### Docker-compose

 - Download `dockerfile` and `docker-compose.yml`
 - Build and bring up with `docker-compose up -d`
 - The page should be available at `http://localhost:4000`

To update, run `docker-compose build` then `docker-compose up -d`. It will fetch and apply the latest changes on GitHub.

To run at a different port from 4000 or change the assets directory location, edit `docker-compose.yml` (change left values):

```yaml
    ports:
      - 4000:80
    volumes:
      - ./assets:/www/assets
```

For development purposes, you can clone the git repository or download the [latest release zip file](https://github.com/simonporte/hsp/archive/refs/heads/master.zip). Then rename and replace `dockerfile.dev` to `dockerfile` and `docker-compose.dev.yml` to `docker-compose.yml`.

### Web server

You can use your own web server, just put the files as is and it should be good as long as you follow the directions below.

## Configuration

Default configuration files are present in `assets`. There are other example configuration files in `src`>`example-assets` that you can copy to replace the ones in `assets`.

If you use docker to run the page, the `entrypoint.sh` script copies configuration files from `src`>`example-assets`>`default` if they are missing in `assets`.

All the configuration files mentioned below are those in `assets` directory.

### Applications

Add your apps by editing your copy of `apps.yml`:

```yaml
apps:
  - category: "Applications"
    links:
      - name: "Bazarr"
        url: "http://subs.example.com"
        icon: "message-video"
        target: "_blank"
  - category: "Files"
    links:
      - name: "CloudCMD"
        icon: "cloudcmd.png"
        sublinks:
          - name: "CloudCMD 1"
            url: "http://files1.example.com"
          - name: "CloudCMD 2"
            url: "http://files2.example.com"
```

Please note:

- You can use only one category if you want
- Using sublinks instead of url will show a combobox
- Set `http://` or `https://` in the URL
- Images must be in `assets`>`icons`, just put the full name of the image with extension : e.g. `myimage.png`
- Instead, if you want to use an icon from the Material Design Icons library, find its name [here](https://materialdesignicons.com/)

### Bookmarks

Add your bookmarks by editing your copy of `links.yml`:

```yaml
bookmarks:
  - category: "Bookmarks"
    collections:
      - title: "Communicate"
        links:
          - name: "Discord"
            url: "https://discord.com"
          - name: "Gmail"
            url: "http://gmail.com"
          - name: "Slack"
            url: "https://slack.com/signin"
            target: "_blank"
```

Please note:

- You can use only one category if you want
- Set the title for each collection of bookmarks in a category
- Set `http://` or `https://` in the URL

### Greetings

To translate or change the greetings shown on top of the page, edit `greetings.yml`:

```yaml
greetings:
  - start: 0
    text: "Good night!"
  - start: 6
    text: "Good morning!"
  - start: 12
    text: "Good afternoon!"
  - start: 18
    text: "Good evening!"
```

Please note:

- Each greeting is shown from the time set until the next greeting time
- Il you want to have a period of time without greeting, or no greeting at all, add a greeting with an empty string text

## Themes

### Changing color themes

Click the cog button on the top right corner.

### Add your own themes

These can be added in the `themes.yml` file. When changing the values of a theme, you need to reapply it from the menu.

```yaml
themes:
  - id: "blackboard"
    name: "Blackboard"
    colors:
      background: "#1a1a1a"
      primary: "#fffdea"
      accent: "#5c5c5c"
```

### Custom styles

You can add your own CSS rules in `assets`>`styles.css`

## Search engines

This has to be set in two files.

To show the details in the modal's table, edit `search-engines.yml` file.

```yaml
search-engines:
    [...]
  - name: "GitHub"
    url: "https://github.com/search?q="
    prefix: "gh"
```

Then to make the search work, edit `/src/js/search.js`.

There is 3 values per serch engine :

- shortcut to type before search
- base url, this will be used when typing the shortcut without keyword after it
- end of URL with query parameters

Base and end of URL should be the same as in the `search-engines.yml` but splitted in two after the trailing slash of base URL.

See example below.

```javascript
let providers = [
    [...]
	['gh','https://github.com/','search?q='],
	[...]
];
```

## Logo

If you want to add a logo to the page, put a `logo.png` in `assets` folder.

## Third party library used:
- Icons: [Iconify](https://iconify.design/)
- Templating: [Handlebars](https://handlebarsjs.com/)
- YAML: [jeremyfa/yaml.js](https://github.com/jeremyfa/yaml.js)

## Main differences with the original project

This project is a fork of [jeroenpardon/sui](https://github.com/jeroenpardon/sui).

Main changes :

- Even though it is intended to be served by a web server, you can save the page from any browser to get a static copy while retaining most functionalities
- Configuration files changed from JSON to YAML
- Can have multiple categories for apps and bookmarks (optional)
- Can use your own image files instead of material design icons
- Can set multiple links for a single app (sublinks)
- Icon of modal is top right instead of bottom left
- Theme is applied to modal
- Multi-tabbed modal
- Themes list is no longer hard-coded but set in a dedicated configuration file : `themes.yml`
- HTTPS is not forced, HTTP/HTTPS is set for each app URL
- The prefix key for search shortcut is `!` (eg. !gh for GitHub)
- Docker image use darkhttpd instead of busybox httpd
