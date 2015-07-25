# Commands

## `gelato new`

Full syntax: `gelato new <url-or-path> [rootPath]`

Create new brunch project. Options:

* `url-or-path`: (required) skeleton (path or
git / github repo address of project), contents of which will be copied to new dir.
* `rootPath`: name of project directory that would be created. Default: '.'.

`.git` directory is automatically removed when copying.

Short-cut: `gelato n`.

## `gelato build`

Full syntax: `gelato build`

Build a brunch project. Options:

* `-e SETTING, --env SETTING`: apply settings from `config.overrides[SETTING]`
* `-P, --production`: run optimize/minify plugins during compilation, disable source maps and auto-reload; same as `-e production` and settings can be modified in `config.overrides.production`

Short-cut: `gelato b`.

## `gelato update`

Full syntax: `gelato update`

Force project to update with latest Gelato core.

Short-cut: `gelato u`.

## `gelato watch`

Full syntax: `gelato watch`

Watch brunch directory and rebuild if something changed. Options:

* all the same options available in `gelato build`, plus:
* `-s, --server`: run a simple http server that would serve `public` dir in `/` and `test` dir in `/test/`
* `-p PORT, --port PORT`: if a `server` option was specified, define on which port the server would run

Short-cut: `gelato w`.