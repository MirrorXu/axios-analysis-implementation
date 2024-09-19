# axios 的源码分析与实现 （使用TypeScript）
## 介绍
- 本项目参考的axios，实现了axios在web端的大部分的设计思路和能力。
- 使用了@vue/cli为项目脚手架搭建开发调试环境。 
- 项目中的axios在`scr/axios` 目录下，自己实现。并没有通过npm安装。
- 通体axios的功能分析和实现，将
    - 选项合并策略
    - `axios.get`、`axios.post`等方法语法糖实现，最终调用 `axios.request`
    - 链式调用
    - 拦截器
    - 错误处理
    - 配置化实现
    - 取消功能
    - 内置的一些能力
        - xsrf防御
        - withCredentials的实现
        - 上传下载进度监控
    - ...


## axios源码模块介绍
[axios源码目录](https://github.com/MirrorXu/axios-analysis-implementation/tree/main/src/axios)

```bash
├── readme.md  
├── index.ts   # 模块到处（入口）
├── types
│   └── index.ts
├── axios.ts   # axios对象
├── defaults.ts # 默认配置
├── cancel   # 取消网络请求
│   ├── Cancel.ts
│   └── CancelToken.ts
├── core   ## 核心
│   ├── Axios.ts 
│   ├── InterceptorManager.ts ## 拦截器
│   ├── transform.ts  # 数据转化
│   ├── mergeConfig.ts ## 合并配置
│   ├── dispatchRequest.ts ## 派发
│   └── xhr.ts # XMLHttpRequest 对象包装
├── helpers  # 工具函数
│   ├── cookie.ts
│   ├── data.ts
│   ├── error.ts
│   ├── headers.ts
│   ├── url.ts
│   └── utils.ts
└── test  # 测试例子
    ├── auth.ts
    ├── baseURL.ts
    ├── cancel.ts
    ├── common.ts
    ├── index.ts
    ├── paramsSeriallizer.ts
    ├── progress_upload_download.ts
    ├── request.ts
    ├── unit
    ├── validateStatus.ts
    ├── withCredentials.ts
    └── xsrf.ts

```
