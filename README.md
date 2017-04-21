# webpack-demo
## 学习webpack


## 参考：
    * https://medium.com/@dabit3/beginner-s-guide-to-webpack-b1f1a3638460
    * https://segmentfault.com/a/1190000006670084


### webpack-dev-server: 

    configuration.output.path: The provided value "./dist" is not an absolute path!

    解决：path.join 
    path: path.join(__dirname, "list”)

    安装版本1的webpack:
    npm i webpack@1 webpack-dev-server@1 --save-dev

    http://www.cnblogs.com/le0zh/p/5619350.html
    安装eslint:
    npm i eslint eslint-loader —save-dev
    npm i babel-eslint —save-dev
    npm --save-dev install eslint-plugin-react

### 扩展ESLint规则:
    npm --save-dev install eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y
    { 
      parser: "babel-eslint",
      extends: "airbnb",
      rules: { 
        "max-len": [1, 120, 2, { ignoreComments: true }],
        "prop-types": [2] 
      }
    }

### 去除console.log, debug:

    https://segmentfault.com/a/1190000006932131

    ```
    npm install --save-dev strip-loader

    webpack-build.config.js配置strip-loader
    var WebpackStrip = require('strip-loader');
    var devConfig = require('./webpack.config’);

    devConfig.entry = {
      app: [
            './src/app.js',
            "./src/global.js", ]
    }

    var stripLoader = {
        test: [/\.js$/, /\.es6$/],
        exclude: /node_modules/,
        loader: WebpackStrip.loader('console.log', 'debug')
    };
    devConfig.module.loaders.push(stripLoader);
    module.exports = devConfig;
    ```

    设置webpack执行的配置文件

    ```
    webpack --config webpack-build.config.js -p
    ```

    这个命令执行完之后，bundle.js就按照build中的的配置对代码进行了一系列合作。

    -p 会执行压缩

说明: webpack --config 用于设置使用哪个配置文件做操作。


### 使用React.js:

    ```
    npm install react react-dom —save
    ```

### PropTyeps:

    https://segmentfault.com/a/1190000007814801

    * eslint Component should be written as a pure function ：
    ...
    "react/prefer-stateless-function": [<enabled>, { "ignorePureComponents": <ignorePureComponents> }]
    ...
    * enabled: for enabling the rule. 0=off, 1=warn, 2=error. Defaults to 0.
    * ignorePureComponents: optional boolean set to true to ignore components extending from React.PureComponent (default to false).

### eslint 'document' is not defined :

    http://stackoverflow.com/questions/41858052/solving-linter-error-no-undef-for-document

 1. Set the environment as browser in your file:
    ```
    /* eslint-env browser */ 加个注释
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App’;

    ReactDOM.render(
      <App />,
      document
    .getElementById('root'),
    );
   ```
### Add it as a global in the file itself:

    ```
    /* global document */
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App’;

    ReactDOM.render(
      <App />,
      document
    .getElementById('root'),
    );
    ```

### JSX not allowed in files with extension '.js’:

    https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md

    The set of allowed extensions is configurable. By default '.jsx' is allowed. If you wanted to allow both '.jsx' and '.js', the configuration would be:

    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    }

### Accessing PropTypes via the main React package is deprecated. Use the prop-types package from npm instead:
    In react 15.5, instead of accessing PropTypes from the main React object, install the prop-types package and import them from there:
    https://www.npmjs.com/package/prop-types

    import PropTypes from 'prop-types'; // ES6 
    var PropTypes = require('prop-types'); // ES5 with npm 

### render(): Rendering components directly into document.body is discouraged:

    https://github.com/b52/electron-es6-react/issues/7

    eactDOM.render(<Main />, document.body);

    results in a chromium warning

    warning.js:36 Warning: render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.

    The better solution:

    Change the rendering call to

    ReactDOM.render(<Main />, document.getElementById('react_container'));

    and add the following between the tags of the index.html file:

    <div id="react_container"></div>

### 创建github仓库：

    git init // 初始化本地git仓库
    git remote add origin https://github.com/QETHAN/webpack-demo.git // 关联到github仓库

    git 出现warning: CRLF will be replaced by LF :

    我想这应该是下载一个从windows里到处的项目时遇上的。前些天发现了这个问题。在git commit时无法提交，提示warning: LF will be replaced by CRLF…..。

    相关的问题在 stackoverflow上也有提及。产生这个问题的原因是，windows、Linux和Mac在处理文件换行时的标示符是不一致的。windows使用CRLF作为结束符，而Linux和Mac使用LF作为结束符。

    同时呢，Git 有两种模式来对待换行符，你可以通过下面这行代码查看你的git配置。

  $ git config core.autocrlf

    如果显示为true，则每一次当你git commit时，如果存在文本文件，那么git会自动帮你将末尾的换行符改为CRLF，省去了烦心的转换工作。

    如果显示为false，则git不会对换行符进行修改，保持原本的内容。

    所以呢，作为Linux和Mac开发者，这个配置应当为false，而windows开发者，则应当设置为true。

    $ git config --global core.autocrlf  false

    引用资料：

    http://stackoverflow.com/questions/1967370/git-replacing-lf-with-crlf

