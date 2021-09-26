## HSP - Homelab StartPage

This is a fork of [jeroenpardon/sui](https://github.com/jeroenpardon/sui), intended to fix its most obvious issues/limitations and add more features.

The readme will be updated to reflect the changes that are made or planned.

Please feel free to open an issue if you have any request or suggestion.

Pull Request are welcome but I would prefer that you open an issue first.

Main changes :

- Configuration files changed from JSON to YAML
- Icon of modal is top right instead of bottom left
- Theme is applied to modal
- Themes are no longer hard-coded but set in a dedicated configuration file : `themes.yml`

Visual comparison:

Project|Startpage|Modal
-|-|-
HSP|![msedge_I5g2eORykU](https://user-images.githubusercontent.com/32496803/134809624-c21f29c8-c9f6-429c-b09b-7d02de9c7f32.png)|![msedge_lwmod45PFb](https://user-images.githubusercontent.com/32496803/134809371-e37075d1-0a8a-4be7-87a6-99b3a1e7f776.png)
SUI|![msedge_xqXs2wrICG](https://user-images.githubusercontent.com/32496803/134809359-5baee52c-b57e-400f-9ecd-8344074a8909.png)|![msedge_rrEsBrjewZ](https://user-images.githubusercontent.com/32496803/134809362-791d076f-d89c-46e7-b479-c8b8011184da.png)




YAML library used: [jeremyfa/yaml.js](https://github.com/jeremyfa/yaml.js)

---

*a startpage for your server and / or new tab page*

![screenshot](https://i.imgur.com/J4d7Q3D.png)

[More screenshots](https://imgur.com/a/FDVRIyw)

### Deploy with Docker compose

#### Prerequisites:
 - Docker: [Linux](https://docs.docker.com/install/linux/docker-ce/debian/), [Mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac), [Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows)
 - [Docker-compose](https://docs.docker.com/compose/install/)

#### Install:

 - `git clone` this repository
 - Build and bring up with `docker-compose up -d`
 - The page should be available at  `http://localhost:4000`

To run at a different port open edit docker-compose.yml:

    ports:
          - 4000:80

### Customization

#### Changing color themes
 - Click the options button on the left bottom

#### Apps
Add your apps by editing apps.json:

    {
	    "apps" : [
		    {"name":"Name of app 1","url":"sub1.example.com","icon":"icon-name"},
		    {"name":"Name of app 2","url":"sub2.example.com","icon":"icon-name","target":"optionals"}
	    ]
    }

Please note:

 - No `http://` in the URL
 - No `,` at the end of the last app's line
 - Find the names  of icons to use at [Material Design Icons](https://materialdesignicons.com/)

#### Bookmarks
Add your bookmarks by editing links.json:

```
{
   "bookmarks":[
      {
         "category":"Category1",
         "links":[
            {
               "name":"Link1",
               "url":"http://example.com"
            },
            {
               "name":"Link2",
               "url":"http://example.com",
               "target":"optionals"
            }
         ]
      },
      {
         "category":"Category2",
         "links":[
            {
               "name":"Link1",
               "url":"http://example.com"
            },
            {
               "name":"Link2",
               "url":"http://example.com"
            }
         ]
      }
   ]
}
```
Add names for the categories you wish to define and add the bookmarks for each category.

Please note:

 - No `http://` in the URL
 - No `,` at the end of the last bookmark in a category and at the end of the last category


#### Color themes
These can be added or customized in the themer.js file. When changing the name of a theme or adding one, make sure to edit this section in index.html accordingly:

```
    <section  class="themes">
```

I might add a simpler way to edit themes at some point, but adding the current ones should be pretty straight forward.
