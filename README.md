<p align="center">
  <a href="https://nishantpainter.github.io/tiny-manager/" rel="noopener" target="_blank"><img width="600" src="https://nishantpainter.github.io/tiny-manager/readme_logo.png" alt="Tiny Manager logo"></a></p>
</p>

#

<p align="center">
  A simple offline project manager for your pet projects.
</p>

<p align="center">
  <img width="650" src="https://nishantpainter.github.io/tiny-manager/description.gif" alt="Description GIF" style="border-radius:16px"></p>
</p>

[![Current Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://nishantpainter.github.io/tiny-manager) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange.svg?style=flat-square)](http://makeapullrequest.com) [![License](https://img.shields.io/github/license/day8/re-frame.svg)](https://github.com/nishantpainter/tiny-manager/blob/main/license.txt) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-blue.svg)](https://github.com/nishantpainter/tiny-manager/commits/master) [![GitHub issues](https://img.shields.io/github/issues/nishantpainter/tiny-manager)](https://github.com/nishantpainter/tiny-manager/issues)

[English](https://github.com/nishantpainter/tiny-manager/blob/master/README.md) - [Français](https://github.com/nishantpainter/tiny-manager/blob/master/README_FR.md) - [Español](https://github.com/nishantpainter/tiny-manager/blob/master/README_ES.md) - [Pусский](https://github.com/nishantpainter/tiny-manager/blob/master/README_RU.md) - [Deutsch](https://github.com/nishantpainter/tiny-manager/blob/master/README_DE.md) - [हिंदी](https://github.com/nishantpainter/tiny-manager/blob/master/README_IN.md) - [中文](https://github.com/nishantpainter/tiny-manager/blob/master/README_CN.md) - [日本語](https://github.com/nishantpainter/tiny-manager/blob/master/README_JP.md)

# Table of Contents

- **[Introduction](#introduction)**
- **[Features](#features)**
- **[Dark Mode](#dark-mode)**
- **[Localization](#localization)**
- **[Offline Usage](#offline-usage)**
- **[Development](#development)**
- **[Privacy](#privacy)**

## Introduction

Tiny Manager is an offline first simple application that assists you in managing your pet projects. Along with project management it allows mundane management using todos and a simple notepad application, all at one place.

## Features

A few of the things you can do with Tiny Manager:

* Add, Edit, Save Notes
* Add, Edit, Delete Todos
* Pet Project management
* Project completion status
* Filtering and sorting
* Issues priority setting
* Dark Mode
* Localization Support
* Offline capable
* Offline local storage

## Dark Mode

Dark mode helps you quickly turn the screen to dark ( while using during night). Toolbar offers you icon button that serve as an on/off switch for dark mode.

## Localization

Tiny Manager offers local support for language including :

- English
- Français
- Español
- Pусский
- Deutsch
- हिंदी
- 中文
- 日本語

## Offline Usage

The application is registered with service workers and behaves as a progressive web application ([PWA](https://en.wikipedia.org/wiki/Progressive_web_application)). For offline usage you can select the **Add To Home** option, while accessing application in browser, to install the application locally to your mobile devices.

## Development

The application is scaffolded using create-react-app ([CRA](https://create-react-app.dev/docs/getting-started/)). You can clone the [Tiny Manager](https://github.com/nishantpainter/tiny-manager) repository for custom development.

To run the application locally on your machine you can follow the steps below :

- Using npm

```
1: git clone https://github.com/nishantpainter/tiny-manager.git
2: cd tiny-manager
3: npm install
4: npm run build
5: sudo npm install -g serve
6: serve -s build
```

- Using yarn

```
1: git clone https://github.com/nishantpainter/tiny-manager.git
2: cd tiny-manager
3: yarn install
4: yarn build
5: sudo npm install -g serve
6: serve -s build
```

## Privacy

The application makes use of local storage for persisting your work data and does not store any Tiny Manager data on any sort of server. The application uses Google analytics to get an overview of the application usage.
