<p align="center">
  <a href="https://nishantpainter.github.io/tiny-manager/" rel="noopener" target="_blank"><img width="600" src="https://nishantpainter.github.io/tiny-manager/readme_logo_in.png" alt="Tiny Manager logo"></a></p>
</p>

#

<p align="center">
  आपके पसंदीदा प्रोजेक्ट के लिए एक सरल ऑफ़लाइन प्रोजेक्ट प्रबंधक।
</p>

<p align="center">
  <img width="650" src="https://nishantpainter.github.io/tiny-manager/description.gif" alt="Description GIF" style="border-radius:16px"></p>
</p>

[![Current Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://nishantpainter.github.io/tiny-manager) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange.svg?style=flat-square)](http://makeapullrequest.com) [![License](https://img.shields.io/github/license/day8/re-frame.svg)](https://github.com/nishantpainter/tiny-manager/blob/main/license.txt) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-blue.svg)](https://github.com/nishantpainter/tiny-manager/commits/master) [![GitHub issues](https://img.shields.io/github/issues/nishantpainter/tiny-manager)](https://github.com/nishantpainter/tiny-manager/issues)

[English](https://github.com/nishantpainter/tiny-manager/blob/master/README.md) - [Français](https://github.com/nishantpainter/tiny-manager/blob/master/README_FR.md) - [Español](https://github.com/nishantpainter/tiny-manager/blob/master/README_ES.md) - [Pусский](https://github.com/nishantpainter/tiny-manager/blob/master/README_RU.md) - [Deutsch](https://github.com/nishantpainter/tiny-manager/blob/master/README_DE.md) - [हिंदी](https://github.com/nishantpainter/tiny-manager/blob/master/README_IN.md) - [中文](https://github.com/nishantpainter/tiny-manager/blob/master/README_CN.md) - [日本語](https://github.com/nishantpainter/tiny-manager/blob/master/README_JP.md)

# विषयसूची

- **[परिचय](#परिचय)**
- **[विशेषताएँ](#विशेषताएँ)**
- **[डार्क मोड](#डार्क-मोड)**
- **[स्थानीयकरण](#स्थानीयकरण)**
- **[ऑफ़लाइन उपयोग](#ऑफ़लाइन-उपयोग)**
- **[विकास](#विकास)**
- **[गोपनीयता](#गोपनीयता)**

## परिचय

Tiny Manager एक ऑफ़लाइन पहला सरल एप्लिकेशन है जो आपकी पसंदीदा परियोजनाओं को प्रबंधित करने में आपकी सहायता करता है। परियोजना प्रबंधन के साथ-साथ यह एक ही स्थान पर कार्य और एक साधारण नोटपैड एप्लिकेशन का उपयोग करके सांसारिक प्रबंधन की अनुमति देता है।

## विशेषताएँ

कुछ चीजें जो आप Tiny Manager के साथ कर सकते हैं:

* नोट्स जोड़ें, संपादित करें, सहेजें
* टोडो जोड़ें, संपादित करें, हटाएं
* पालतू परियोजना प्रबंधन
* परियोजना पूर्ण होने की स्थिति
* फ़िल्टरिंग और सॉर्टिंग
* प्राथमिकता सेटिंग जारी करता है
* डार्क मोड
* स्थानीयकरण समर्थन
* ऑफ़लाइन सक्षम
* ऑफ़लाइन स्थानीय भंडारण

## डार्क मोड

डार्क मोड आपको स्क्रीन को जल्दी से डार्क करने में मदद करता है (रात के दौरान उपयोग करते समय)। टूलबार आपको आइकन बटन प्रदान करता है जो डार्क मोड के लिए ऑन/ऑफ स्विच के रूप में काम करता है।
## स्थानीयकरण

Tiny Manager भाषा के लिए स्थानीय समर्थन प्रदान करता है जिसमें शामिल हैं:

- English
- Français
- Español
- Pусский
- Deutsch
- हिंदी
- 中文
- 日本語

## ऑफ़लाइन-उपयोग

एप्लिकेशन सेवा कर्मियों के साथ पंजीकृत है और एक प्रगतिशील वेब एप्लिकेशन के रूप में व्यवहार करता है ([PWA](https://en.wikipedia.org/wiki/Progressive_web_application)). ऑफ़लाइन उपयोग के लिए आप अपने मोबाइल उपकरणों पर स्थानीय रूप से एप्लिकेशन इंस्टॉल करने के लिए ब्राउज़र में एप्लिकेशन एक्सेस करते समय **होम में जोड़ें** विकल्प का चयन कर सकते हैं।

## विकास

एप्लिकेशन को create-react-app का उपयोग करके तैयार किया गया है ([CRA](https://create-react-app.dev/docs/getting-started/)). आप क्लोन कर सकते हैं [Tiny Manager](https://github.com/nishantpainter/tiny-manager) कस्टम विकास के लिए भंडार।

अपनी मशीन पर एप्लिकेशन को स्थानीय रूप से चलाने के लिए आप नीचे दिए गए चरणों का पालन कर सकते हैं:

- npm का उपयोग करना

```
1: git clone https://github.com/nishantpainter/tiny-manager.git
2: cd tiny-manager
3: npm install
4: npm run build
5: sudo npm install -g serve
6: serve -s build
```

- yarn का उपयोग करना

```
1: git clone https://github.com/nishantpainter/tiny-manager.git
2: cd tiny-manager
3: yarn install
4: yarn build
5: sudo npm install -g serve
6: serve -s build
```

## गोपनीयता

एप्लिकेशन आपके कार्य डेटा को बनाए रखने के लिए स्थानीय भंडारण का उपयोग करता है और किसी भी प्रकार के सर्वर पर किसी भी Tiny Manager डेटा को संग्रहीत नहीं करता है। एप्लिकेशन उपयोग का अवलोकन प्राप्त करने के लिए एप्लिकेशन Google एनालिटिक्स का उपयोग करता है।
