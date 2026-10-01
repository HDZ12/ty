# 项目协作规则

- 本项目使用 TypeScript、Node.js 22 和 npm。
- 代码放在 src，自动化测试放在 tests，工程说明放在 docs。
- 修改前阅读 README；提交前执行 npm run check。
- 使用功能分支和 PR，避免直接向 main 推送业务修改。
- 提交 package-lock.json，不提交 node_modules、dist 或真实 .env 文件。
- 测试不调用收费模型或真实业务系统；接入模型后通过模拟接口测试。
- 开发、测试、生产使用同一份代码，通过独立配置和资源隔离。
- 发布说明应写清验证结果；未验证的云端 CI 或部署不能声称成功。
