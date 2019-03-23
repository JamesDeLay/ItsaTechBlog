const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-post-tsx": hot(preferDefault(require("/home/jim/Documents/BlogSite_2.0/src/templates/post.tsx"))),
  "component---src-templates-tags-tsx": hot(preferDefault(require("/home/jim/Documents/BlogSite_2.0/src/templates/tags.tsx"))),
  "component---src-templates-author-tsx": hot(preferDefault(require("/home/jim/Documents/BlogSite_2.0/src/templates/author.tsx"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/home/jim/Documents/BlogSite_2.0/.cache/dev-404-page.js"))),
  "component---src-pages-404-tsx": hot(preferDefault(require("/home/jim/Documents/BlogSite_2.0/src/pages/404.tsx"))),
  "component---src-pages-index-tsx": hot(preferDefault(require("/home/jim/Documents/BlogSite_2.0/src/pages/index.tsx")))
}

