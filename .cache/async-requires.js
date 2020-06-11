// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---cache-dev-404-page-js": () => import("./dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-404-tsx": () => import("./../src/pages/404.tsx" /* webpackChunkName: "component---src-pages-404-tsx" */),
  "component---src-pages-about-tsx": () => import("./../src/pages/about.tsx" /* webpackChunkName: "component---src-pages-about-tsx" */),
  "component---src-pages-index-tsx": () => import("./../src/pages/index.tsx" /* webpackChunkName: "component---src-pages-index-tsx" */),
  "component---src-templates-author-tsx": () => import("./../src/templates/author.tsx" /* webpackChunkName: "component---src-templates-author-tsx" */),
  "component---src-templates-post-tsx": () => import("./../src/templates/post.tsx" /* webpackChunkName: "component---src-templates-post-tsx" */),
  "component---src-templates-tags-tsx": () => import("./../src/templates/tags.tsx" /* webpackChunkName: "component---src-templates-tags-tsx" */)
}

