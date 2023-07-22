<p align="center">
  <a href="https://nishantpainter.github.io/tiny-manager/" rel="noopener" target="_blank"><img width="600" src="https://nishantpainter.github.io/tiny-manager/readme_logo_cn.png" alt="Tiny Manager logo"></a></p>
</p>

#

<p align="center">
  一个简单的离线项目管理器，适合您的宠物项目。
</p>

<p align="center">
  <img width="650" src="https://nishantpainter.github.io/tiny-manager/description.gif" alt="Description GIF" style="border-radius:16px"></p>
</p>

[![Current Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://nishantpainter.github.io/tiny-manager) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange.svg?style=flat-square)](http://makeapullrequest.com) [![License](https://img.shields.io/github/license/day8/re-frame.svg)](https://github.com/nishantpainter/tiny-manager/blob/main/license.txt) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-blue.svg)](https://github.com/nishantpainter/tiny-manager/commits/master) [![GitHub issues](https://img.shields.io/github/issues/nishantpainter/tiny-manager)](https://github.com/nishantpainter/tiny-manager/issues)

[English](https://github.com/nishantpainter/tiny-manager/blob/master/README.md) - [Français](https://github.com/nishantpainter/tiny-manager/blob/master/README_FR.md) - [Español](https://github.com/nishantpainter/tiny-manager/blob/master/README_ES.md) - [Pусский](https://github.com/nishantpainter/tiny-manager/blob/master/README_RU.md) - [Deutsch](https://github.com/nishantpainter/tiny-manager/blob/master/README_DE.md) - [हिंदी](https://github.com/nishantpainter/tiny-manager/blob/master/README_IN.md) - [中文](https://github.com/nishantpainter/tiny-manager/blob/master/README_CN.md) - [日本語](https://github.com/nishantpainter/tiny-manager/blob/master/README_JP.md)

# 目录

- **[介绍](#介绍)**
- **[特征](#特征)**
- **[深色模式](#深色模式)**
- **[本土化](#本土化)**
- **[离线使用](#离线使用)**
- **[发展](#发展)**
- **[隐私](#隐私)**

## 介绍

Tiny Manager 是一款离线的第一个简单应用程序，可帮助您管理您的宠物项目。除了项目管理之外，它还允许使用待办事项和简单的记事本应用程序在一个地方进行日常管理。

## 特征

您可以使用 Tiny Manager 执行以下操作：

* 添加、编辑、保存注释
* 添加、编辑、删除待办事项
* 宠物项目管理
* 项目完成情况
* 过滤和排序
* 问题优先级设置
* 深色模式
* 本地化支持
* 离线能力
* 离线本地存储

## 深色模式

深色模式可帮助您快速将屏幕调暗（夜间使用时）。工具栏为您提供图标按钮，用作暗模式的开/关开关。

## 本土化

Tiny Manager 提供本地语言支持，包括：

- English
- Français
- Español
- Pусский
- Deutsch
- हिंदी
- 中文
- 日本語

## 离线使用

该应用程序已向 Service Worker 注册，并表现为渐进式 Web 应用程序 ([PWA](https://en.wikipedia.org/wiki/Progressive_web_application)). 对于离线使用，您可以在浏览器中访问应用程序时选择**添加到主页**选项，以将应用程序本地安装到您的移动设备。

## 发展

该应用程序是使用 create-react-app 搭建的 ([CRA](https://create-react-app.dev/docs/getting-started/)). 您可以克隆 [Tiny Manager](https://github.com/nishantpainter/tiny-manager) 用于定制开发的存储库.

要在您的计算机上本地运行该应用程序，您可以按照以下步骤操作：

- 使用 npm

```
1: git clone https://github.com/nishantpainter/tiny-manager.git
2: cd tiny-manager
3: npm install
4: npm run build
5: sudo npm install -g serve
6: serve -s build
```

- 使用 yarn

```
1: git clone https://github.com/nishantpainter/tiny-manager.git
2: cd tiny-manager
3: yarn install
4: yarn build
5: sudo npm install -g serve
6: serve -s build
```

## 隐私

该应用程序利用本地存储来保存您的工作数据，并且不会在任何类型的服务器上存储任何 Tiny Manager 数据。该应用程序使用 Google 分析来获取应用程序使用情况的概述。
