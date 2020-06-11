module.exports = [{
      plugin: require('../node_modules/gatsby-remark-images/gatsby-browser.js'),
      options: {"plugins":[],"maxWidth":1170,"quality":100},
    },{
      plugin: require('../node_modules/gatsby-plugin-canonical-urls/gatsby-browser.js'),
      options: {"plugins":[],"siteUrl":"https://gatsby-casper.netlify.com"},
    },{
      plugin: require('../node_modules/gatsby-plugin-google-analytics/gatsby-browser.js'),
      options: {"plugins":[],"trackingId":"UA-XXXX-Y","head":true,"anonymize":true,"respectDNT":true,"exclude":["/preview/**"],"sampleRate":100,"siteSpeedSampleRate":10},
    }]
