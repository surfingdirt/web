# What this is

This is the open source social network React application that Surfing Dirt uses at
[https://beta.surfingdirt.com](https://beta.surfingdirt.com).

The goal is to start with a given, concrete application (Surfing Dirt) and evolve that into
a white-label social network.

# How to build and run

After running `npm install`, run `npm run build` in order to generate the Webpack bundles.
Finally, run `npm run start` in order to get a server at `http://localhost:3033`.

The server needs a Graphql backend whose address can be configured in `config/index.js`.

Specify a NODE_ENV environment variable when running the server in order to pick which
config set to use. 

# License

This project is licenced under the MIT license

# Acknowledgements

<a href="https://www.browserstack.com" target="_blank">
    <img src="https://raw.githubusercontent.com/surfingdirt/web/master/Browserstack-logo%402x.png" alt="Browserstack" width="300" height="65">
</a>

Thanks to [BrowserStack](https://www.browserstack.com/) for the Open Source program they run which helps small teams
(such as this one) test their open source apps (such as this one) across a variety of devices!

We are also using some SVGs from the [Twemoji project](https://twemoji.twitter.com/).