// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-templates-post-tsx": () => import("/home/jim/Documents/BlogSite_2.0/src/templates/post.tsx" /* webpackChunkName: "component---src-templates-post-tsx" */),
  "component---src-templates-tags-tsx": () => import("/home/jim/Documents/BlogSite_2.0/src/templates/tags.tsx" /* webpackChunkName: "component---src-templates-tags-tsx" */),
  "component---src-templates-author-tsx": () => import("/home/jim/Documents/BlogSite_2.0/src/templates/author.tsx" /* webpackChunkName: "component---src-templates-author-tsx" */),
  "component---cache-dev-404-page-js": () => import("/home/jim/Documents/BlogSite_2.0/.cache/dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-404-tsx": () => import("/home/jim/Documents/BlogSite_2.0/src/pages/404.tsx" /* webpackChunkName: "component---src-pages-404-tsx" */),
  "component---src-pages-index-tsx": () => import("/home/jim/Documents/BlogSite_2.0/src/pages/index.tsx" /* webpackChunkName: "component---src-pages-index-tsx" */)
}

exports.data = () => import(/* webpackChunkName: "pages-manifest" */ "/home/jim/Documents/BlogSite_2.0/.cache/data.json")

