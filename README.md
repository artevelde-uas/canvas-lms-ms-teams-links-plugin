# Canvas LMS Better Left Menu Plug-in

Plugin for the [Canvas LMS theme app](https://www.npmjs.com/package/@artevelde-uas/canvas-lms-app) that
opens MS Teams links diectly in the Teams desktop app.

[![](https://img.shields.io/npm/v/@artevelde-uas/canvas-lms-ms-teams-links-plugin.svg)](https://www.npmjs.com/package/@artevelde-uas/canvas-lms-ms-teams-links-plugin)
[![](https://img.shields.io/github/license/artevelde-uas/canvas-lms-ms-teams-links-plugin.svg)](https://spdx.org/licenses/ISC)
[![](https://img.shields.io/npm/dt/@artevelde-uas/canvas-lms-ms-teams-links-plugin.svg)](https://www.npmjs.com/package/@artevelde-uas/canvas-lms-ms-teams-links-plugin)

## Installation

Using NPM:

    npm install @artevelde-uas/canvas-lms-ms-teams-links-plugin

Using Yarn:

    yarn add @artevelde-uas/canvas-lms-ms-teams-links-plugin

## Usage

Just import the plug-in and add it to the Canvas app:

```javascript
import { run, addPlugin } from '@artevelde-uas/canvas-lms-app';
import msTeamsLinkPopupPlugin from '@artevelde-uas/canvas-lms-ms-teams-links-plugin';

addPlugin(msTeamsLinkPopupPlugin);

run();
```
