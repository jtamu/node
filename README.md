# NODE（主にReact）の学習用リポジトリ

## 苦労した点
- localhost接続はすぐできたけど、外部からの接続でどハマリした。
  - Dockerを使ってるので、外部接続は必須。
  - たぶん２日分くらい費やした。
  - webpack-dev-serverのhost指定してなかったのが原因。
  - package.jsonに記載のcommandを修正。
  - そういや、Railsでも同じようなエラーでハマったことが・・・。
