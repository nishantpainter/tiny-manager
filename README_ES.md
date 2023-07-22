<p align="center">
  <a href="https://nishantpainter.github.io/tiny-manager/" rel="noopener" target="_blank"><img width="600" src="https://nishantpainter.github.io/tiny-manager/readme_logo_es.png" alt="Tiny Manager logo"></a></p>
</p>

#

<p align="center">
  Un simple administrador de proyectos fuera de línea para sus proyectos favoritos.
</p>

<p align="center">
  <img width="650" src="https://nishantpainter.github.io/tiny-manager/description.gif" alt="Description GIF" style="border-radius:16px"></p>
</p>

[![Current Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://nishantpainter.github.io/tiny-manager) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange.svg?style=flat-square)](http://makeapullrequest.com) [![License](https://img.shields.io/github/license/day8/re-frame.svg)](https://github.com/nishantpainter/tiny-manager/blob/main/license.txt) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-blue.svg)](https://github.com/nishantpainter/tiny-manager/commits/master) [![GitHub issues](https://img.shields.io/github/issues/nishantpainter/tiny-manager)](https://github.com/nishantpainter/tiny-manager/issues)

[English](https://github.com/nishantpainter/tiny-manager/blob/master/README.md) - [Français](https://github.com/nishantpainter/tiny-manager/blob/master/README_FR.md) - [Español](https://github.com/nishantpainter/tiny-manager/blob/master/README_ES.md) - [Pусский](https://github.com/nishantpainter/tiny-manager/blob/master/README_RU.md) - [Deutsch](https://github.com/nishantpainter/tiny-manager/blob/master/README_DE.md) - [हिंदी](https://github.com/nishantpainter/tiny-manager/blob/master/README_IN.md) - [中文](https://github.com/nishantpainter/tiny-manager/blob/master/README_CN.md) - [日本語](https://github.com/nishantpainter/tiny-manager/blob/master/README_JP.md)

# Tabla de contenido

- **[Introducción](#introducción)**
- **[Características](#características)**
- **[Modo oscuro](#modo-oscuro)**
- **[Localización](#localización)**
- **[Uso fuera de línea](#uso-fuera-de-línea)**
- **[Desarrollo](#desarrollo)**
- **[Privacidad](#privacidad)**

## Introducción

Tiny Manager es una primera aplicación simple fuera de línea que lo ayuda a administrar sus proyectos favoritos. Junto con la gestión de proyectos, permite la gestión mundana utilizando todos y una aplicación de bloc de notas simple, todo en un solo lugar.

## Características

Algunas de las cosas que puede hacer con Tiny Manager:

* Agregar, editar, guardar notas
* Agregar, editar, eliminar todos
* Gestión de proyectos de mascotas
* Estado de finalización del proyecto
* Filtrado y clasificación
* Establecimiento de prioridades de problemas
* Modo oscuro
* Soporte de localización
* Capacidad sin conexión
* Almacenamiento local sin conexión

## Modo oscuro

El modo oscuro lo ayuda a oscurecer rápidamente la pantalla (mientras se usa durante la noche). La barra de herramientas le ofrece un botón de icono que sirve como interruptor de encendido/apagado para el modo oscuro.

## Localización

Tiny Manager ofrece soporte local para idiomas que incluyen:

- English
- Français
- Español
- Pусский
- Deutsch
- हिंदी
- 中文
- 日本語

## Uso fuera de línea

La aplicación está registrada con los trabajadores del servicio y se comporta como una aplicación web progresiva ([PWA](https://en.wikipedia.org/wiki/Progressive_web_application)). Para el uso sin conexión, puede seleccionar la opción **Agregar a Inicio**, mientras accede a la aplicación en el navegador, para instalar la aplicación localmente en sus dispositivos móviles.

## Desarrollo

La aplicación está estructurada usando create-react-app ([CRA](https://create-react-app.dev/docs/getting-started/)). Puedes clonar el [Tiny Manager](https://github.com/nishantpainter/tiny-manager) repositorio para desarrollo personalizado.

Para ejecutar la aplicación localmente en su máquina, puede seguir los pasos a continuación:

- Usando npm

```
1: git clone https://github.com/nishantpainter/tiny-manager.git
2: cd tiny-manager
3: npm install
4: npm run build
5: sudo npm install -g serve
6: serve -s build
```

- Usando yarn

```
1: git clone https://github.com/nishantpainter/tiny-manager.git
2: cd tiny-manager
3: yarn install
4: yarn build
5: sudo npm install -g serve
6: serve -s build
```

## Privacidad

La aplicación utiliza el almacenamiento local para conservar los datos de su trabajo y no almacena ningún dato de Tiny Manager en ningún tipo de servidor. La aplicación utiliza Google Analytics para obtener una visión general del uso de la aplicación.