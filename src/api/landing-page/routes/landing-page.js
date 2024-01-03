"use strict";

/**
 * landing-page router
 */

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
