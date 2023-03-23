# willkuerlich/Botlike

## What is Botlike

Botlike a bot with openai and a custom image server (Automatic1111) integration and basic functionality and some nice goodies, this repo is meant for direct usage (npm package coming soon) with minimal configuration or as a base project to extend from.

## Installation

configure .env file, make a copy of .env.example

```bash
  npm run build

  npm run start
```

Scan the qr code with via whatsapp client on your phone.

Telegram uses a token which you can set in the .env file.

## Usage

## API

## Road map

### TODO (pre release)

#### Current

- [ ] PNPM + MONOREPO (> update GH actions)
- [x] ESLINT/PRETTIER (+ monorepo settings)
- [x] TEST CHANGESETS WORKFLOW
- [X] Move WA module + Mongo into own package
- [X] Setup Base Adapter for Telegram
- [X] Integrate TG module
- [ ] Integrate Discord module
- [X] Add development mode
- [X] Add test suite (vitest)
- [ ] Write basic tests
- [ ] Write docs
- [ ] List licenses of sub packages

#### Next planned features

- [ ] HMR dev-server (WebUI?)
- [x] commands/API
- [x] commands/CLI-like
- [ ] Setup a designated control server (express based?) with main logic => use supabase
  - should be able to just load the current runtime code (fallback for GH server - should still be possible)
  - openapi access
  - account management
  - downtime control (restart + fallbackserver)
- [ ] Basic server stats + data persistance

#### Page

- [ ] Create Roadmap + page
- [ ] Test redirect services
- [ ] Account system (Supabase?)

#### Nice to have

- [ ] I18n text caching and saving in i18n dir under a designated key
- [ ] Public GH repo shenanigans
- [ ] IndexedDBShim working - <https://github.com/indexeddbshim/IndexedDBShim> + <https://gist.github.com/mcornella/96c53dcea327ed3d243951ad96a277d5>

##### OAI goodies and ideas

- [ ] Screenshots of wa&bot + usage/installation
- [ ] Memes
- [ ] Page generator => + saving of them? (needs to be rate limited!)

## Contribution

## Related

## TODO

```text
// LINK THIS TEXT in help:
// https://help.openai.com/en/articles/6827058-why-doesn-t-chatgpt-know-about-x

// SPEECH TO TEXT:
// https://www.speechtexter.com/
// https://speechnotes.co/

```
