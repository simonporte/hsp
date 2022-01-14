## HSP - Homelab StartPage

*A home page for your server, that can be used as a new tab page*

![screenshot](https://user-images.githubusercontent.com/32496803/147822597-230ea628-250f-4f52-9e2e-182a7dc0c07e.jpeg)

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
```

Please note:

- You can use only one category if you want
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

---

This project is a fork of [jeroenpardon/sui](https://github.com/jeroenpardon/sui), intended to fix its most obvious issues/limitations and add more features.

The readme will be updated to reflect the changes that are made or planned.

Please feel free to open an issue if you have any request or suggestion.

Pull Request are welcome but I would prefer that you open an issue first.

Main changes :

- Configuration files changed from JSON to YAML
- Icon of modal is top right instead of bottom left
- Theme is applied to modal
- Themes list is no longer hard-coded but set in a dedicated configuration file : `themes.yml`
- HTTPS is not forced, HTTP/HTTPS is set for each app URL
- Docker image use darkhttpd instead of busybox httpd
- Can have multiple categories for apps and bookmarks (optional)
- Can use your own image files instead of material design icons
- The prefix key for search shortcut is `!` (eg. !gh for GitHub)

Visual comparison:

Project|HSP|SUI
-|-|-
Startpage|![msedge_I5g2eORykU](https://user-images.githubusercontent.com/32496803/134809624-c21f29c8-c9f6-429c-b09b-7d02de9c7f32.png)|![msedge_xqXs2wrICG](https://user-images.githubusercontent.com/32496803/134809359-5baee52c-b57e-400f-9ecd-8344074a8909.png)
Modal|![msedge_lwmod45PFb](https://user-images.githubusercontent.com/32496803/134809371-e37075d1-0a8a-4be7-87a6-99b3a1e7f776.png)|![msedge_rrEsBrjewZ](https://user-images.githubusercontent.com/32496803/134809362-791d076f-d89c-46e7-b479-c8b8011184da.png)
Multiple categories|![msedge_RNRPBs6hzG](https://user-images.githubusercontent.com/32496803/135135100-aa87d629-f822-4545-808a-099a4c408274.png)|Feature not available
Custom icons|![msedge_2WCbZh0NCL](https://user-images.githubusercontent.com/79142547/135339255-a11ff772-3558-4e10-947d-1049eb3d1295.png)|Feature not available




YAML library used: [jeremyfa/yaml.js](https://github.com/jeremyfa/yaml.js)

---