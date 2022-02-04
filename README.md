# Population Chart

都道府県別の総人口推移グラフを表示するアプリ


## Vercelで公開中

[Population Chart](https://population-chart-app.vercel.app/)


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

1. リポジトリのクローン
```
git clone https://github.com/nullworkbench/population-chart-app.git
```

2. パッケージのインストール
```
npm install
```

3. 環境変数

`.env.local`および`.env.test.local`名でプロジェクトルートへ下記情報を記述してください
```
NEXT_PUBLIC_RESAS_API_KEY=RESAS-APIのAPIキーを入力
```

5. 開発サーバー起動
```
npm run dev
```

5. テスト実行
```
npm run test
```
