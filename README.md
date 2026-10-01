# ty — TypeScript 多智能体项目

用于练习公司的开发、测试、上线流程。当前阶段是工程初始化，已提供最小 HTTP 服务与 CI 配置，多智能体业务功能尚未实现。

## 本地开发

使用 Node.js 22（基准版本记录在 .nvmrc）和 npm。在仓库目录打开终端：

```powershell
npm ci
Copy-Item .env.example .env
npm run dev
```

浏览器访问 http://127.0.0.1:3000/health，预期得到：

```json
{ "status": "ok", "environment": "development" }
```

第一次复制配置即可；已有 .env 时不要覆盖。按 Ctrl+C 停止服务。

## 日常命令

| 命令           | 用途                                 |
| -------------- | ------------------------------------ |
| npm run dev    | 开发模式，修改代码后自动重启         |
| npm run check  | 类型、代码风格、格式、测试及构建检查 |
| npm run format | 自动整理文件格式                     |
| npm run build  | 编译到 dist                          |
| npm start      | 运行编译后的服务，需先构建           |

## 项目结构

- src/：服务入口、配置读取和健康检查。
- tests/：健康检查与无效环境配置测试。
- .github/workflows/ci.yml：GitHub Actions 自动检查。
- .env.example：可提交的配置样例；真实 .env 被 Git 忽略。
- AGENTS.md：项目协作规则。
- docs/environments.md：开发、测试、生产的隔离与后续部署步骤。

## GitHub 流程

工程变更在分支开发，推送后提 PR。CI 配置会在 main、chore/feat/fix 分支的推送，以及目标为 main 的 PR 上运行。

当前尚未推送或验证 GitHub CI；测试、生产服务也尚未部署。下一步先完成工程初始化 PR，再创建实际运行环境。
