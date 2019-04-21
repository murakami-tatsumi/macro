# 村上のコンフルエンスマクロ集

## 1. pageview.js
### 概要
コンフルエンスのページ上に指定IDの文書内容を表示します。

### 使用方法

    <div id="文書ID" edit="true/false" box="true/false"></div>
    <script src="https://cdn.jsdelivr.net/gh/murakami-tatsumi/macro@master/pageview.js" type="text/javascript></script>

※必ずdivとscriptのペアをセットで指定してください。
| divの属性 | 属性値の意味 |
----|---- 
| id | 内容を表示したい文書のid（ページurlの最後の数字） |
| edit | true:「編集」ボタンを追加　false:ボタンを付けない |
| box | true:文書内容を枠で囲む　false:枠を付けない |
