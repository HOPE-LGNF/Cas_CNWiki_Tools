# Cas_CNWiki_Tools

为[未知伤亡中文维基](https://casualtiesunknown.huijiwiki.com/)提供的一些编辑辅助小工具。

> 注：本项目部分代码由 AI 辅助生成，其著作权状态依据现行法律可能存在不确定性。

在线使用：[GitHub Pages](https://hope-lgnf.github.io/Cas_CNWiki_Tools/)

## 工具列表

| 工具 | 用途 |
|---|---|
| CN-ID Finder | 加载游戏语言文件（JSON），中文与 id 双向互查；支持屏蔽 `dsc` 描述键、展示同值多 id 的歧义提示 |
| CN-ID Replacer | 批量把维基文本中的 `{{类别\|中文名}}` 替换为 `{{类别\|id=xxx}}`；同值多 id 时会标注歧义 |
| Wiki Page Finder | 按命名空间拉取维基全部页面标题，实时筛选、预览、导出 JSON |
| Template Text Spawner | 拼装 `{{模板名\|参数1\|参数2\|...}}` 模板文本 |

## 语言文件从哪来

Finder 与 Replacer 需要游戏的中文语言文件（JSON，形如 `{"main": {...}, "layer": {...}, "other": {...}, "buildings": {...}}`，值为中文、键为 id）。可从游戏安装目录或社区维护的语言文件仓库获取，本站不托管该文件。

## 本地开发

纯静态页面，无构建、无依赖：

```bash
# 任意静态服务器均可，例如：
python -m http.server 8000
# 然后访问 http://localhost:8000/
```

注意：直接双击打开 `index.html`（`file://` 协议）时部分浏览器会拦截 `tools.json` 的 fetch，建议通过本地 HTTP 服务访问。

## 目录结构

```
index.html      # 工具索引页（读取 tools.json 动态渲染）
tools.json      # 工具注册表：新增工具在此登记
src/            # 各工具单文件页面
src/common.js   # 共享工具函数（转义/高亮/剪贴板）
```

## License

[MIT](LICENSE)
