# Plink

Plink links emails, documents and websites by time, place and
person. It helps people easily gather the materials they need for
their day. The It is similar to Google now, but with more granular
information focused specifically on daily office work.

Currently, it functions as a Google Chrome plugin that enhances Gmail
to improve person based search.

## Development

This project includes two things: A website and a Chrome plugin. They are
tied together by the need for the Chrome plugin to host some code on
the website to ease deployment. By hosting plugin code on the website, we can
deploy updates to the plugin instantly by deploying the website.

The code for these two apps is setup as an
[Ezel](https://github.com/artsy/ezel) project. In practice, the
Ezel setup means that shared components are stored in ./components
and app specific code in the ./apps folders.

### Website Development

The [website](https://www.plink.nyc) functions as a marketing site for
Plink. It is a static site deployed via [gulp](http://gulpjs.com/) to
Amazon [S3](http://aws.amazon.com/s3/) and
[Cloudfront](https://aws.amazon.com/cloudfront/).

To get started:
- `$ npm -g install gulp`
- `$ npm install`
- Run the server with `$ gulp server`
- In a new tab, run `$ gulp watch`

./dest contains generated assets

### Plugin Development

The Google Chrome plugin has a production and development
version. The development plugin references code shipped with the
plugin wheras the production plugin references remote assets.

The easiest way to develop locally is to Install the
[Chrome Apps & Extensions Developer Tool](https://chrome.google.com/webstore/detail/chrome-apps-extensions-de/ohmmkhmmmpcnpikjeljgnaoabkaalbgc). It
will allow you to install dev and production versions of the plugin by
dropping their folder (`./dist/plugins/chrome-dev`) into the tool.

## Deployment

### Website Deployment

To deploy, create an `aws.json` file like so
```json
{
  "key": "key",
  "secret": "secret",
  "bucket": "www.url.com",
  "region": "us-east-1"
}
```

Deploy by running `gulp deploy`. Deploy will:

1. freshly compile all assets and html files to ./dest
1. compile the chrome plugin assets to ./plugin (separate builds for prod and dev)
1. upload assets, images and html to s3

### Plugin Deployment

TODO!

## TODO

- Gulp should run tests
- auto-deploy on commit via Travis
