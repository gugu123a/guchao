> **关于本 README**：本仓库的 README 由咕咕（[gugu123a](https://github.com/gugu123a)）授权 Claude 代笔整理。

# 咕巢

一个个人 AI 聊天 Web App，fork 自 [chatnest](https://github.com/ugui3u/chatnest)。在保留原版功能的基础上，**加入了本地记忆检索**——用 ChromaDB 向量检索 + jieba / BM25 关键词检索，从你自己写在本地文件里的笔记和记忆中找相关片段，让 AI 能「记得」你。

> 第一次搞开源项目，可能有很多小 bug，欢迎反馈。

## 与上游的差异

- **本地记忆检索**：`full-stack/memory_search_service` 从本地的 `CLAUDE.md`、`profile.json`、`memories/` 中检索相关内容，不需要额外 API key，向量数据库由用户在本机生成
- **一键脚本**：`run-with-memory.sh` 等启动脚本（见 `full-stack/`）
- **品牌素材**：Anthropic 风格字体 / 图标已就位（见仓库根目录）

## 重要：占位符版本

因版权原因，本公开仓库不包含专有 logo、专有字体、私人 prompt、`.env`、数据库、上传文件、记忆库或日志。logo / 字体请使用你自己拥有或已获授权的素材替换，操作方式见 `full-stack/BRANDING.md` 或 `frontend-demo/BRANDING.md`。

由于前端显示与后端存在太多联动（如思考链显示），所以前端和后端放在一起发布，请根据需要选用。

## 你应该选哪个？

- 只想看界面或改 UI：打开 `frontend-demo/`
- 想跑完整功能：打开 `full-stack/`

`frontend-demo/` 是纯前端演示版，使用假数据，不需要后端或 API key。

`full-stack/` 是前端 + 后端完整功能版，包含模型切换、流式回复、工具状态、思考 / 工具摘要、上传、对话历史、记忆接口、资料与偏好设置。

## 快速开始：只看前端

```bash
cd frontend-demo
python3 -m http.server 8080
```

然后打开 http://127.0.0.1:8080/，或直接双击 `frontend-demo/index.html`。

## 快速开始：完整功能

```bash
cd full-stack
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp env.example .env
```

生成一个 `CHAT_SECRET`：

```bash
python3 - <<'PY'
import secrets
print(secrets.token_urlsafe(32))
PY
```

把生成的值填进 `.env`，同时设置 `CHAT_PASSWORD`，然后启动：

```bash
./run.sh
```

打开 http://127.0.0.1:8787/。

如果要同时启用本地记忆检索，用：

```bash
./run-with-memory.sh
```

记忆检索默认读取用户自己创建的 `CLAUDE.md`、`profile.json` 和 `memories/`，并在本地生成 ChromaDB 索引。公开仓库不包含任何真实记忆数据、向量数据库或索引状态。

## 致谢

感谢糖糖老师的记忆系统以及 xixicc186 老师！也感谢上游 chatnest 的作者 [ugui3u](https://github.com/ugui3u)。

## 许可证

非商用使用。允许非商业复制、修改和再发布；禁止商业使用；署名不强制。
