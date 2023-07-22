<p align="center">
  <a href="https://nishantpainter.github.io/tiny-manager/" rel="noopener" target="_blank"><img width="600" src="https://nishantpainter.github.io/tiny-manager/readme_logo.png" alt="Tiny Manager logo"></a></p>
</p>

#

<p align="center">
  Un gestionnaire de projet hors ligne simple pour vos projets favoris.
</p>

<p align="center">
  <img width="650" src="https://nishantpainter.github.io/tiny-manager/description.gif" alt="Description GIF" style="border-radius:16px"></p>
</p>

[![Current Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://nishantpainter.github.io/tiny-manager) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange.svg?style=flat-square)](http://makeapullrequest.com) [![License](https://img.shields.io/github/license/day8/re-frame.svg)](https://github.com/nishantpainter/tiny-manager/blob/main/license.txt) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-blue.svg)](https://github.com/nishantpainter/tiny-manager/commits/master) [![GitHub issues](https://img.shields.io/github/issues/nishantpainter/tiny-manager)](https://github.com/nishantpainter/tiny-manager/issues)

[English](https://github.com/nishantpainter/tiny-manager/blob/master/README.md) - [Français](https://github.com/nishantpainter/tiny-manager/blob/master/README_FR.md) - [Español](https://github.com/nishantpainter/tiny-manager/blob/master/README_ES.md) - [Pусский](https://github.com/nishantpainter/tiny-manager/blob/master/README_RU.md) - [Deutsch](https://github.com/nishantpainter/tiny-manager/blob/master/README_DE.md) - [हिंदी](https://github.com/nishantpainter/tiny-manager/blob/master/README_IN.md) - [中文](https://github.com/nishantpainter/tiny-manager/blob/master/README_CN.md) - [日本語](https://github.com/nishantpainter/tiny-manager/blob/master/README_JP.md)

# Table des matières

- **[Introduction](#introduction)**
- **[Caractéristiques](#caractéristiques)**
- **[Mode sombre](#mode-sombre)**
- **[Localisation](#localisation)**
- **[Utilisation hors ligne](#utilisation-hors-ligne)**
- **[Développement](#développement)**
- **[Confidentialité](#confidentialité)**

## Introduction

Tiny Manager est une première application simple hors ligne qui vous aide à gérer vos projets favoris. Parallèlement à la gestion de projet, il permet une gestion banale à l'aide de tâches et d'une simple application de bloc-notes, le tout au même endroit.

## Caractéristiques

A few of the things you can do with Tiny Manager:

* Ajouter, modifier, enregistrer des notes
* Ajouter, modifier, supprimer des tâches
* Gestion de projets pour animaux de compagnie
* Statut d'achèvement du projet
* Filtrage et tri
* Établit la priorité des problèmes
* Mode sombre
* Prise en charge de la localisation
* Capable hors ligne
* Stockage local hors ligne

## Mode sombre

Le mode sombre vous aide à rendre rapidement l'écran sombre (lors de l'utilisation pendant la nuit). La barre d'outils vous offre un bouton d'icône qui sert d'interrupteur marche/arrêt pour le mode sombre.

## Localisation

Tiny Manager offre un support local pour la langue, notamment :

- English
- Français
- Español
- Pусский
- Deutsch
- हिंदी
- 中文
- 日本語

## Utilisation hors ligne

L'application est enregistrée auprès des service workers et se comporte comme une application web progressive ([PWA](https://en.wikipedia.org/wiki/Progressive_web_application)). Pour une utilisation hors ligne, vous pouvez sélectionner l'option ** Ajouter à la maison **, tout en accédant à l'application dans le navigateur, pour installer l'application localement sur vos appareils mobiles.

## Développement

L'application est échafaudée à l'aide de create-react-app ([CRA](https://create-react-app.dev/docs/getting-started/)). Vous pouvez cloner le [Tiny Manager](https://github.com/nishantpainter/tiny-manager) référentiel pour le développement personnalisé.

Pour exécuter l'application localement sur votre machine vous pouvez suivre les étapes ci-dessous :

- Utiliser npm

```
1: git clone https://github.com/nishantpainter/tiny-manager.git
2: cd tiny-manager
3: npm install
4: npm run build
5: sudo npm install -g serve
6: serve -s build
```

- Utiliser yarn

```
1: git clone https://github.com/nishantpainter/tiny-manager.git
2: cd tiny-manager
3: yarn install
4: yarn build
5: sudo npm install -g serve
6: serve -s build
```

## Confidentialité

L'application utilise le stockage local pour conserver vos données de travail et ne stocke aucune donnée Tiny Manager sur aucun type de serveur. L'application utilise Google Analytics pour obtenir un aperçu de l'utilisation de l'application.