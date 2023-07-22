<p align="center">
  <a href="https://nishantpainter.github.io/tiny-manager/" rel="noopener" target="_blank"><img width="600" src="https://nishantpainter.github.io/tiny-manager/readme_logo.png" alt="Tiny Manager logo"></a></p>
</p>

#

<p align="center">
  あなたの大切なプロジェクトのためのシンプルなオフラインプロジェクトマネージャー。
</p>

<p align="center">
  <img width="650" src="https://nishantpainter.github.io/tiny-manager/description.gif" alt="Description GIF" style="border-radius:16px"></p>
</p>

[![Current Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://nishantpainter.github.io/tiny-manager) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange.svg?style=flat-square)](http://makeapullrequest.com) [![License](https://img.shields.io/github/license/day8/re-frame.svg)](https://github.com/nishantpainter/tiny-manager/blob/main/license.txt) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-blue.svg)](https://github.com/nishantpainter/tiny-manager/commits/master) [![GitHub issues](https://img.shields.io/github/issues/nishantpainter/tiny-manager)](https://github.com/nishantpainter/tiny-manager/issues)

[English](https://github.com/nishantpainter/tiny-manager/blob/master/README.md) - [Français](https://github.com/nishantpainter/tiny-manager/blob/master/README_FR.md) - [Español](https://github.com/nishantpainter/tiny-manager/blob/master/README_ES.md) - [Pусский](https://github.com/nishantpainter/tiny-manager/blob/master/README_RU.md) - [Deutsch](https://github.com/nishantpainter/tiny-manager/blob/master/README_DE.md) - [हिंदी](https://github.com/nishantpainter/tiny-manager/blob/master/README_IN.md) - [中文](https://github.com/nishantpainter/tiny-manager/blob/master/README_CN.md) - [日本語](https://github.com/nishantpainter/tiny-manager/blob/master/README_JP.md)

# 目次

- **[序章](#序章)**
- **[特徴](#特徴)**
- **[ダークモード](#ダークモード)**
- **[ローカリゼーション](#ローカリゼーション)**
- **[オフラインでの使用](#オフラインでの使用)**
- **[発達](#発達)**
- **[プライバシー](#プライバシー)**

## 序章

Tiny Manager は、ペット プロジェクトの管理を支援する、オフライン初のシンプルなアプリケーションです。プロジェクト管理に加えて、Todo とシンプルなメモ帳アプリケーションを使用した日常的な管理をすべて 1 か所で行うことができます。

## 特徴

Tiny Manager でできることのいくつかは次のとおりです。

* メモの追加、編集、保存
* Todoの追加、編集、削除
* ペットプロジェクト管理
※プロジェクトの完了状況
* フィルタリングと並べ替え
* 優先順位の設定を発行します
* ダークモード
* ローカリゼーションのサポート
* オフライン対応
* オフラインのローカルストレージ

## ダークモード

ダーク モードを使用すると、(夜間の使用中に) 画面をすばやく暗くすることができます。ツールバーには、ダーク モードのオン/オフ スイッチとして機能するアイコン ボタンが表示されます。

## ローカリゼーション

Tiny Manager は、次のような言語のローカル サポートを提供します。

- English
- Français
- Español
- Pусский
- Deutsch
- हिंदी
- 中文
- 日本語

## オフラインでの使用

アプリケーションは Service Worker に登録され、プログレッシブ Web アプリケーションとして動作します。 ([PWA](https://en.wikipedia.org/wiki/Progressive_web_application)). オフラインで使用する場合は、ブラウザでアプリケーションにアクセスしているときに **ホームに追加** オプションを選択して、アプリケーションをモバイル デバイスにローカルにインストールできます。

## 発達

アプリケーションは create-react-app を使用してスキャフォールディングされます ([CRA](https://create-react-app.dev/docs/getting-started/)). クローンを作成できます [Tiny Manager](https://github.com/nishantpainter/tiny-manager) カスタム開発用のリポジトリ.

アプリケーションをマシン上でローカルに実行するには、次の手順に従います。

- 使用する npm

```
1: git clone https://github.com/nishantpainter/tiny-manager.git
2: cd tiny-manager
3: npm install
4: npm run build
5: sudo npm install -g serve
6: serve -s build
```

- 使用する yarn

```
1: git clone https://github.com/nishantpainter/tiny-manager.git
2: cd tiny-manager
3: yarn install
4: yarn build
5: sudo npm install -g serve
6: serve -s build
```

## プライバシー

このアプリケーションは、作業データを永続化するためにローカル ストレージを利用し、いかなる種類のサーバーにも Tiny Manager データを保存しません。アプリケーションは Google アナリティクスを使用して、アプリケーションの使用状況の概要を取得します。
