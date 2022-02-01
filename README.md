# Population Chart

都道府県別の総人口推移グラフを表示するアプリ


## 技術スタック

### 基本パッケージ
- [Next.js](https://nextjs.org/)（Reactフレームワーク）
- [axios](https://github.com/axios/axios)（APIを叩くためのHTTPモジュール）

### テストツール
- [Jest](https://jestjs.io/ja/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### 人口を取得するためのAPI
- [RESAS(地域経済分析システム) API](https://opendata.resas-portal.go.jp/)


## 実行方法

1. リポジトリのクローン（環境変数は別途ご用意ください）
```
git clone https://github.com/nullworkbench/population-chart-app.git
```
2. パッケージのインストール
```
npm install
```
3. 開発サーバー起動
```
npm run dev
```
4. テスト実行
```
npm run test
```
