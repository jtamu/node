# NODE（主にReact）の学習用リポジトリ

## 苦労した点
- localhost接続はすぐできたけど、外部からの接続でどハマリした。
  - Dockerを使ってるので、外部接続は必須。
  - たぶん２日分くらい費やした。
  - webpack-dev-serverのhost指定してなかったのが原因。
  - package.jsonに記載のcommandを修正。
  - そういや、Railsでも同じようなエラーでハマったことが・・・。

## 各種パッケージについて

### Babel
- ES6(最新のJavaScript)に対応していないブラウザでもES6を扱えるように、現状のJavaScriptに変換するツール。
- ReactのJSX記法からJavaScriptへの変換も行う。
- プラグインが多数あり、どのプラグインを組み込むかはpresetsで指定する。

### ESLint
- JSの文法チェック

### cssloader, style-loader
- CSSファイルを読み込んでwebpackが作成するoutputに埋め込む。

### webpack
- 各種ファイルを読み込んでoutputを生成する。
- webpack.config.js
  - entry:
    - アプリ起動時に動作すべきJSのエントリポイント。複数ファイルを指定することもできる。
  - output:
    - 出力されるファイル名とパスを指定。
  - devServer:
    - webpack-dev-serverの設定を書く。
  - devtool:
    - JSの変換前後のマッピングを作成する。
  - rules:
    - testの正規表現にマッチしたファイル名のファイルはloaderに指定したloaderが処理する。


## 学んだこと
- npm initでpackage.jsonが作られる
- npm installでpackage.jsonに記載のパッケージをインストールできる
- npmでインストールしたパッケージはnode_modules配下に置かれる
- 実行ファイルはnode_modules/.bin配下に置かれる
- node_modules/.binにPATHを通さなくても、package.jsonに記載すれば実行できる
  - "scripts"に記載したコマンドは、`npm run $command`で実行できる
  - ただし、scriptsのstartに記載したものだけは特別に`npm start`で実行できる
