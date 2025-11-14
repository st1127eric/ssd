# 🐍 貪食蛇遊戲

一個使用 HTML5 Canvas 和 JavaScript 開發的經典貪食蛇遊戲。

## 🎮 遊戲特色

- 🕹️ 流暢的遊戲操作
- 📊 計分系統與最高分記錄
- ⏸️ 暫停/繼續功能
- 📱 響應式設計，支援各種螢幕尺寸
- 💾 使用 localStorage 保存最高分

## 🚀 快速開始

### 線上遊玩

訪問 GitHub Pages：（待部署後填入）

### 本地運行

1. 下載或 clone 此專案：
```bash
git clone <repository-url>
cd ssd
```

2. 使用任何 HTTP 伺服器開啟 `index.html`，例如：
```bash
python3 -m http.server 8000
```

3. 在瀏覽器中打開 `http://localhost:8000`

## 🎯 遊戲規則

- 使用 **方向鍵** 控制蛇的移動方向
- 吃到 🍎 食物可以增加分數（+10 分）並延長蛇的長度
- 撞到牆壁或自己的身體會結束遊戲
- 挑戰你的最高分！

## 📁 檔案結構

```
/
├── index.html      # 主頁面
├── style.css       # 樣式表
├── game.js         # 遊戲邏輯
├── spec.md         # 規格文件
├── tasks.md        # 任務清單
└── README.md       # 說明文件
```

## 🛠️ 技術棧

- HTML5 Canvas API
- CSS3
- Vanilla JavaScript (無框架)

## 📝 開發資訊

### 遊戲參數

- 遊戲區域：20x20 格（400x400 像素）
- 格子大小：20 像素
- 遊戲速度：150 毫秒/格
- 初始蛇長：3 格

### 瀏覽器支援

支援所有現代瀏覽器：
- Chrome / Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)

## 📄 授權

MIT License