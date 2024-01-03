# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>

## Useful strapi yarn commands

- Generate local backup file for Strapi content

`yarn strapi export --no-encrypt -f backup`

- Generate middleware (or other files into your project)

`yarn strapi generate`

follow the questions: name your middleware and location.

- Srtapi console

`yarn strapi console`

Start the server and eval commands in your application in real time. It will cave you full view of all strapi project files and the locations. To find the middleware that you may create for example:

`strapi.middelwares`

[Find more in Strapi Docs](https://docs.strapi.io/dev-docs/cli)

## create a middleware to populate strapi query string

Using a long query string can be hard and to manage. so example of [interactive-query-builder](https://docs.strapi.io/dev-docs/api/rest/interactive-query-builder). Creating a middleware will gave you a short query but will all designed data you need to query form stapi. in our case in this project: `http://localhost:1337/api/landing-pages`

to create a middleware, follow the run `yarn strapi console` and create a new middleware, name it and define it location.

1- add the query string that you need to be populated and call it in the ctx:

    "use strict";

    const populate = {
      metadata: {
        populate: {
          metaImage: {
            populate: true,
            fields: ["name", "alternativeText", "url"],
          },
        },
      },
      blocks: {
        populate: {
          link: {
            populate: true,
          },
          image: {
            fields: ["name", "alternativeText", "url"],
          },
          card: {
            populate: {
              image: {
                fields: ["name", "alternativeText", "url"],
              },
            },
          },
        },
        plan: {
          populate: ["services", "link"],
        },
        form: {
          populate: ["input", "button"],
        },
      },
    };

    module.exports = (config, { strapi }) => {
      // Add your own logic here.
      return async (ctx, next) => {
        strapi.log.info("In landing-page-populate middleware.");
        ctx.query = {
          populate,
          ...ctx.query,
        };

        await next();
      };
    };

2- Add the middleware to the `createCoreRouter` in `src/api/landing-page/routes`

    const { createCoreRouter } = require("@strapi/strapi").factories;

    module.exports = createCoreRouter("api::landing-page.landing-page", {
      config: {
        find: {
          middlewares: ["global::landing-page-populate"],
        },
        findOne: {
          middlewares: ["global::landing-page-populate"],
        },
      },
    });

3- run `yarn develop`
