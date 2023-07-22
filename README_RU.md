<p align="center">
  <a href="https://nishantpainter.github.io/tiny-manager/" rel="noopener" target="_blank"><img width="600" src="https://nishantpainter.github.io/tiny-manager/readme_logo_ru.png" alt="Tiny Manager logo"></a></p>
</p>

#

<p align="center">
  Простой автономный менеджер проектов для ваших любимых проектов.
</p>

<p align="center">
  <img width="650" src="https://nishantpainter.github.io/tiny-manager/description.gif" alt="Description GIF" style="border-radius:16px"></p>
</p>

[![Current Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://nishantpainter.github.io/tiny-manager) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange.svg?style=flat-square)](http://makeapullrequest.com) [![License](https://img.shields.io/github/license/day8/re-frame.svg)](https://github.com/nishantpainter/tiny-manager/blob/main/license.txt) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-blue.svg)](https://github.com/nishantpainter/tiny-manager/commits/master) [![GitHub issues](https://img.shields.io/github/issues/nishantpainter/tiny-manager)](https://github.com/nishantpainter/tiny-manager/issues)

[English](https://github.com/nishantpainter/tiny-manager/blob/master/README.md) - [Français](https://github.com/nishantpainter/tiny-manager/blob/master/README_FR.md) - [Español](https://github.com/nishantpainter/tiny-manager/blob/master/README_ES.md) - [Pусский](https://github.com/nishantpainter/tiny-manager/blob/master/README_RU.md) - [Deutsch](https://github.com/nishantpainter/tiny-manager/blob/master/README_DE.md) - [हिंदी](https://github.com/nishantpainter/tiny-manager/blob/master/README_IN.md) - [中文](https://github.com/nishantpainter/tiny-manager/blob/master/README_CN.md) - [日本語](https://github.com/nishantpainter/tiny-manager/blob/master/README_JP.md)

# Оглавление

- **[Введение](#введение)**
- **[Функции](#функции)**
- **[Темный режим](#темный-режим)**
- **[Локализация](#локализация)**
- **[Использование в автономном режиме](#использование-в-автономном-режиме)**
- **[Разработка](#разработка)**
- **[Конфиденциальность](#конфиденциальность)**

## Введение

Tiny Manager — это первое простое автономное приложение, которое помогает вам управлять вашими любимыми проектами. Наряду с управлением проектами он позволяет управлять рутинными задачами с помощью списка задач и простого приложения «Блокнот» — и все это в одном месте.

## Функции

Несколько вещей, которые вы можете сделать с Tiny Manager:

* Добавлять, редактировать, сохранять заметки
* Добавить, изменить, удалить Todos
* Управление домашними животными
* Статус завершения проекта
* Фильтрация и сортировка
* Проблемы с установкой приоритета
* Темный режим
* Поддержка локализации
* Автономный режим
* Оффлайн локальное хранилище

## Темный режим

Темный режим помогает быстро сделать экран темным (при использовании ночью). Панель инструментов предлагает вам кнопку со значком, которая служит переключателем для темного режима.

## Локализация

Tiny Manager предлагает локальную поддержку языка, включая:

- English
- Français
- Español
- Pусский
- Deutsch
- हिंदी
- 中文
- 日本語

## Использование в автономном режиме

Приложение зарегистрировано сервис-воркерами и ведет себя как прогрессивное веб-приложение. ([PWA](https://en.wikipedia.org/wiki/Progressive_web_application)). Для автономного использования вы можете выбрать опцию **Добавить на главную** при доступе к приложению в браузере, чтобы установить приложение локально на свои мобильные устройства.

## Разработка

Приложение создается с помощью create-реагировать-приложение ([CRA](https://create-react-app.dev/docs/getting-started/)). Вы можете клонировать [Tiny Manager](https://github.com/nishantpainter/tiny-manager) репозиторий для пользовательской разработки.

Чтобы запустить приложение локально на вашем компьютере, вы можете выполнить следующие шаги:

- С использованием npm

```
1: git clone https://github.com/nishantpainter/tiny-manager.git
2: cd tiny-manager
3: npm install
4: npm run build
5: sudo npm install -g serve
6: serve -s build
```

- С использованием yarn

```
1: git clone https://github.com/nishantpainter/tiny-manager.git
2: cd tiny-manager
3: yarn install
4: yarn build
5: sudo npm install -g serve
6: serve -s build
```

## конфиденциальность

Приложение использует локальное хранилище для сохранения ваших рабочих данных и не хранит данные Tiny Manager на каком-либо сервере. Приложение использует аналитику Google, чтобы получить обзор использования приложения.