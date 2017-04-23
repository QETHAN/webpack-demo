# webpack-demo
## 学习webpack


## 参考：
  * https://medium.com/@dabit3/beginner-s-guide-to-webpack-b1f1a3638460
  * https://segmentfault.com/a/1190000006670084


### webpack-dev-server: 

  configuration.output.path: The provided value "./dist" is not an absolute path!

  解决：path.join 
  ```
  path: path.join(__dirname, "list”)
  ```
  
  安装版本1的webpack:
  ```
  npm i webpack@1 webpack-dev-server@1 --save-dev
  ```
  
  http://www.cnblogs.com/le0zh/p/5619350.html
  
  安装eslint:
  ```
  npm i eslint eslint-loader —save-dev
  npm i babel-eslint —save-dev
  npm --save-dev install eslint-plugin-react
  ```
  
### 扩展ESLint规则:
  ```
  npm --save-dev install eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y
  { 
    parser: "babel-eslint",
    extends: "airbnb",
    rules: { 
      "max-len": [1, 120, 2, { ignoreComments: true }],
      "prop-types": [2] 
    }
  }
  ```

### 上线环境中，去除console.log, debug:

  https://segmentfault.com/a/1190000006932131

  ```
  npm install --save-dev strip-loader

  // webpack-build.config.js配置strip-loader
  var WebpackStrip = require('strip-loader');
  var devConfig = require('./webpack.config’);

  devConfig.entry = {
    app: [
          './src/app.js',
          './src/global.js', 
         ]
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

  -p 会执行压缩，This command is short for webpack --optimize-minimize.

 说明: webpack --config 用于设置使用哪个配置文件做操作。


### 使用React.js:

  ```
  npm install react react-dom —save
  ```

### PropTyeps:

  https://segmentfault.com/a/1190000007814801

### eslint Component should be written as a pure function ：
  ```
  "react/prefer-stateless-function": [<enabled>, { "ignorePureComponents": <ignorePureComponents> }]
  ```
  enabled: for enabling the rule. 0=off, 1=warn, 2=error. Defaults to 0.

  ignorePureComponents: optional boolean set to true to ignore components extending from React.PureComponent (default to false).

 
### eslint 'document' is not defined :
http://stackoverflow.com/questions/41858052/solving-linter-error-no-undef-for-document

### Set the environment as browser in your file:
  ```
  /* eslint-env browser */ 加个注释
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './App’;

  ReactDOM.render(
   <App />,
   document.getElementById('root'),
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
   document.getElementById('root'),
  );
  ```

### JSX not allowed in files with extension '.js’:

  https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md

  The set of allowed extensions is configurable. By default '.jsx' is allowed. If you wanted to allow both '.jsx' and '.js', the configuration would be:
  ```
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  }
  ```

### Accessing PropTypes via the main React package is deprecated. Use the prop-types package from npm instead:
  In react 15.5, instead of accessing PropTypes from the main React object, install the prop-types package and import them from there:
  https://www.npmjs.com/package/prop-types
  ```
  import PropTypes from 'prop-types'; // ES6 
  var PropTypes = require('prop-types'); // ES5 with npm 
  ```
### render(): Rendering components directly into document.body is discouraged:

  https://github.com/b52/electron-es6-react/issues/7
  ```
  eactDOM.render(<Main />, document.body);
  ```
  results in a chromium warning

  warning.js:36 Warning: render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.

  The better solution:

  Change the rendering call to
  ```
  ReactDOM.render(<Main />, document.getElementById('react_container'));
  ```
  and add the following between the tags of the index.html file:
  ```
  <div id="react_container"></div>
  ```
### 创建github仓库：
  ```
  git init // 初始化本地git仓库
  git remote add origin https://github.com/QETHAN/webpack-demo.git // 关联到github仓库
  ```
  
  git 出现warning: CRLF will be replaced by LF :

  我想这应该是下载一个从windows里到处的项目时遇上的。前些天发现了这个问题。在git commit时无法提交，提示warning: LF will be replaced by CRLF…..。

  相关的问题在 stackoverflow上也有提及。产生这个问题的原因是，windows、Linux和Mac在处理文件换行时的标示符是不一致的。windows使用CRLF作为结束符，而Linux和Mac使用LF作为结束符。

  同时呢，Git 有两种模式来对待换行符，你可以通过下面这行代码查看你的git配置。
  ```
  $ git config core.autocrlf
  ```
  如果显示为true，则每一次当你git commit时，如果存在文本文件，那么git会自动帮你将末尾的换行符改为CRLF，省去了烦心的转换工作。

  如果显示为false，则git不会对换行符进行修改，保持原本的内容。

  所以呢，作为Linux和Mac开发者，这个配置应当为false，而windows开发者，则应当设置为true。
  ```
  $ git config --global core.autocrlf  false
  ```
  引用资料：

  http://stackoverflow.com/questions/1967370/git-replacing-lf-with-crlf
  
  
### jquery, jquery插件:

  #### externals 配置项

  当我们想在项目中require一些其他的类库或者API，而又不想让这些类库的源码被构建到运行时文件中。例如 React、jQuery 等文件我们想使用 CDN 的引用，不想把他们打包进输出文件。就可以通过配置 externals 参数来配置：

  ```
  module.exports = {
    externals: {
      jQuery: true
    }
  };
  ```

  然后在页面里引入<script src="//cdn/jquery.min.js"></script>
  这样 jQuery 就不用打包了，直接指向 windows.jQuery 就好
  

  #### imports-loader

  用于向一个模块的作用域内注入变量。
  举个栗子，比如我们需要使用bootstrap.js，这个文件虽然依赖jQuery但其内部没有require('jquery')，这导致文件内的jQuery对象不可识别，所以模块化调用bootstrap.js时就会报错jQuery is not defined`。使用 imports-loader 的话：

  ```
  require('imports?jQuery=jquery!bootstrap/dist/js/bootstrap');
  ```

  imports-loader 会在 bootstrap 的源码前面，注入如下代码:


  ```
  /* IMPORTS FROM imports-loader */
  var jQuery = require("jquery");
  ```


  #### exports-loader

  用于向一个模块中提供导出模块功能。功能与imports-loader类似，但他是在文件的最后添加一行。
  举个栗子，比如file.js中没有调用export导出模块，或者没有define定义模块，因此无法模块化调用它。可以使用 exports-loader：

  ```
  require("exports?file,parse=helpers.parse!./file.js");
  ```

  他会在./file.js文件的最后添加如下代码：

  ```
  /* EXPORTS FROM exports-loader */
  exports["file"] = (file);
  exports["parse"] = (helpers.parse);
  ```

  #### expose-loader

  这个 loader 是将某个对象暴露成一个全局变量。
  举个栗子，比如把jQuery对象暴露成全局变量。这样，那些bootstrap.js之类的文件就都能访问这个变量了。

  ```
  module: {
    loaders: [
      { 
        test: require.resolve("jquery"), 
        loader: "expose?$!expose?jQuery" 
      },
    ]
  }
  ```
  
  ```
  https://github.com/webpack-contrib/imports-loader
  {
    test: require.resolve('jquery'),
    loader: "imports?$=jquery&jQuery=jquery&this=>window"
  },
  {
    test: require.resolve('./src/vendor/jq-plugin-a.js'),
    loader: "imports?$=jquery&jQuery=jquery&this=>window"
  },
  ```

  使用jquery插件时候，eslint loader提前执行，会提示一些错误，这时候可以使用注释屏蔽掉：
  
  http://eslint.cn/docs/user-guide/configuring

  ```
  /* eslint-disable */
  ```

  只用eslint校验自己写的代码


### html-webpack-plugin:

  https://github.com/jantimon/html-webpack-plugin
  
  ```
  npm install html-webpack-plugin --save-dev
  ```

  filename: 'tpl/index.html'

  这个设置会在`dist`目录里生成`tpl/index.html`
  
  名字中包含目录斜杠，会自动生成目录


### Extract Text Plugin

  * https://github.com/webpack-contrib/extract-text-webpack-plugin
  * https://github.com/webpack-contrib/extract-text-webpack-plugin/blob/webpack-1/README.md
  
  ``` 
  // for webpack 1
  npm install --save-dev extract-text-webpack-plugin@1.0.1
  
  var ExtractTextPlugin = require("extract-text-webpack-plugin");

  module.exports = {
    module: {
      loaders: [
        { 
          test: /\.css$/, 
          loader: ExtractTextPlugin.extract("style-loader", "css-loader") 
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin("styles.css")
    ]
  }
  ```

### 处理图片，url-loader：

  ```
  npm i url-loader --save-dev

  {
    // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
    // 如下配置，将小于8192byte的图片转成base64码
    test: /\.(png|jpg|gif)$/,
    loader: 'url-loader?limit=8192&name=./static/img/[hash].[ext]',
  }
  ```

  html-withimg-loader

  https://github.com/webplus/blog/issues/6

  
### 图片文件目录：
 
 https://github.com/webpack-contrib/file-loader
  
  ```
  {
    test: /\.(png|jpe?g|gif)$/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=8192&publicPath=/&name=image/[name][hash:8].[ext]',
  },
  ```

### 模块资源对应目录：

  ```
  entry: { 
    'hello/hello': './src/hello/index.js',
    'index/index': './src/index/index.js'
  },
  ```
  
  entry名字中包含目录斜杠，会自动创建对应子目录

### 抽取公共css:


