module.exports = {
  //此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true,
  //指定eslint继承的模板
  extends: ["plugin:vue/essential", "@vue/standard"],
  //此项指定环境的全局变量，下面的配置指定为浏览器环境
  env: {
    browser: true
  },
  // 此项是用来提供插件的，插件名称省略了eslint-plugin-，下面这个配置是用来规范html的
  plugins: ["vue"],
  //指定javaScript语言类型和风格
  parserOptions: {
    parser: "babel-eslint"
  },
  //规则https://www.wenjiangs.com/docs/eslint，vue规则：https://eslint.vuejs.org/rules/
  // 主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
  // "off" -> 0 关闭规则
  // "warn" -> 1 开启警告规则
  // "error" -> 2 开启错误规则
  rules: {
    // 使用 === 替代 == allow-null允许null和undefined== [2, "allow-null"]
    eqeqeq: 0,
    // 双峰驼命名格式
    camelcase: 0,
    //要求或者禁止Yoda条件
    yoda: 2,
    // 行尾不使用分号
    semi: 0,
    //强制一致地使用反引号、双引号或单引号。
    quotes: 2,
    //强制函数中的变量在一起声明或分开声明
    "one-var": 2,
    // 禁用 console
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    // 强制 generator 函数中 * 号周围使用一致的空格
    "generator-star-spacing": "off",
    // 禁用 debugger
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // 禁止对象字面量中出现重复的 key
    "no-dupe-keys": 2,
    // 函数参数不能重复
    "no-dupe-args": 2,
    // 禁止重复的函数声明
    "no-func-assign": 2,
    // 禁止重复的 case 标签
    "no-duplicate-case": 2,
    // 禁用未声明的变量
    "no-undef": 1,
    //禁止出现多个空格
    "no-multi-spaces": 2,
    // 不允许标签与变量同名
    "no-label-var": 2,
    //禁止tab
    "no-tabs": 1,
    // 禁止 var 声明 与外层作用域的变量同名
    "no-shadow": 0,
    // 禁止 if 语句中有 return 之后有 else
    "no-else-return": 0,
    // 禁止出现空函数.如果一个函数包含了一条注释，它将不会被认为有问题。
    "no-empty-function": 1,
    // 禁止出现未使用过的变量
    "no-unused-vars": 1,
    //禁止在返回语句中赋值
    "no-return-assign": 0,
    // 禁用行尾空格
    "no-trailing-spaces": 2,
    // 禁止修改 const 声明的变量
    "no-const-assign": 2,
    // 禁止类成员中出现重复的名称
    "no-dupe-class-members": 2,
    //禁止使用alert confirm promp
    "no-alert": process.env.NODE_ENV === "production" ? "error" : "off",
    //禁止多余的冒号
    "no-extra-semi": 2,
    //禁止在条件中使用常量表达式
    "no-constant-condition": 2,
    //空行最多不能超过2行
    "no-multiple-empty-lines": [1, { max: 2 }],
    //禁止无用的表达式
    "no-unused-expressions": 1,
    //禁用不必要的嵌套块
    "no-lone-blocks": 2,
    //不允许使用逗号操作符
    "no-sequences": 2,
    //禁止不规则的空白
    "no-irregular-whitespace": 2,
    //函数括号前的空格
    "space-before-function-paren": 0,
    //处理回调错误
    "handle-callback-err": 1,
    //首选承诺拒绝错误
    "prefer-promise-reject-errors": 0,
    //要求或禁止在注释前有空白 (space 或 tab)
    "spaced-comment": 1,
    //强制关键字周围空格的一致性
    "keyword-spacing": 1,
    //强制在花括号中使用一致的空格
    "object-curly-spacing": 1,
    // 控制逗号前后的空格
    "comma-spacing": [
      2,
      {
        before: false,
        after: true
      }
    ],
    // 要求或禁止 var 声明语句后有一行空行
    "newline-after-var": 0,
    //强制使用一致的缩进
    indent: 0,
    // html 内 缩进
    "vue/html-indent": 0,
    // 插值两端必须留一个空格
    "vue/mustache-interpolation-spacing": 0,
    //强制每行的最大属性数
    "vue/max-attributes-per-line": 0,
    //vue/属性顺序
    "vue/attributes-order": 0,
    // 强制要求在对象字面量的属性中键和值之间使用一致的间距 "var obj = { "foo": 42 };"
    "key-spacing": 0,
    // 禁止末尾逗号
    "comma-dangle": 0,
    // 强制在块之前使用一致的空格 "function a() {}"
    "space-before-blocks": 0,
    // 要求操作符周围有空格 "a ? b : c"
    "space-infix-ops": 2,
    // "() => {};" // 强制箭头函数前后使用一致的空格
    "arrow-spacing": 2,
    //插值中强制统一间距
    //强制组件中的属性顺序
    "vue/order-in-components": 0,
    //不允许字段名称重复
    "vue/no-dupe-keys": 2,
    //多次引用同个包
    "import/no-duplicates": 2,
    //执行有效v-for指令
    "vue/valid-v-for": 2,
    //V-bind:key使用v-for指令要求
    "vue/require-v-for-key": 2,
    //不允许解析错误<template>
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    //强制执行自闭式
    "vue/html-self-closing": "off",
    //不允许计算属性中的副作用
    "vue/no-side-effects-in-computed-properties": 0,
    //禁止 v-for 指令或范围属性的未使用变量定义
    "vue/no-unused-vars": 1,
    //执行有效v-model指令
    "vue/valid-v-model": 2,
    //强制执行有效的模板根
    "vue/valid-template-root": 2
  }
};

