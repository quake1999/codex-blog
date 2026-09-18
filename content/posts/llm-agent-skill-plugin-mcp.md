---
title: 从大模型到 Agent：一文理解 Skill、插件与 MCP
category: 技术
date: 2026-09-17
readTime: 10 分钟
excerpt: 用一套清晰的层次关系，理解大模型、智能体、Skill、插件和 MCP，以及国内外有代表性的产品与厂商。
tone: blue
mark: AI
---

大模型、Agent、Skill、插件、MCP 经常出现在同一段产品介绍里，却不处在同一个层级。理解它们最简单的方法，是先记住一句话：

> 大模型负责思考，Agent 负责行动，Skill 沉淀做法，插件打包能力，MCP 负责连接。

## 大模型：提供语言与推理能力

大语言模型（LLM）通过大量数据训练，能够理解和生成文本、代码、图像等内容。它擅长回答问题、总结资料和进行推理，但模型本身通常不会直接操作文件、发送邮件或部署网站。

可以把大模型理解为系统的“脑”。它决定应该说什么、下一步应该做什么，却需要工具和运行环境才能影响外部世界。

常见模型系列包括 OpenAI 的 GPT、Anthropic 的 Claude、Google 的 Gemini，以及 Meta 的 Llama。不同模型在推理、编程、多模态、成本和开放程度上各有取舍。

## Agent：围绕目标持续行动

Agent（智能体）是在大模型之外加入工具、记忆、任务规划和反馈循环的执行系统。它不只是回答一次问题，而是可以反复执行以下过程：

- 理解目标并拆分任务；
- 选择搜索、代码、浏览器或业务系统等工具；
- 执行动作并读取结果；
- 根据反馈修正方案；
- 完成任务，或在高风险步骤前请求人工确认。

因此，同一个大模型放入不同的 Agent 系统，实际能力可能完全不同。真正影响体验的，不只有模型参数，还有上下文管理、工具质量、权限边界和验证机制。

## Skill：把经验变成可复用的方法

Skill 通常是一组面向特定任务的说明、脚本和资源。例如，“创建并检查 PDF”“按照团队规范审查 React 代码”“发布 Vercel 项目”，都可以封装成 Skill。

它更像给智能体准备的工作手册：告诉它什么时候使用、按什么步骤执行、应该检查什么。OpenAI Codex 和 Anthropic Claude 都在使用类似概念；具体文件格式可能不同，但目标都是让智能体稳定复用专业流程。

Skill 一般不会单独提供外部系统访问权限。它主要解决的是“怎样把事情做好”。

## 插件：将一组能力打包安装

“插件”是产品层面的打包与分发形式，含义会随平台变化。一个插件可能包含：

- 一个或多个 Skill；
- 外部应用连接；
- MCP 服务器；
- 提示词、工作流和界面组件。

因此，插件比 Skill 更像一个安装包。Skill 关注具体做法，插件关注如何把相关能力组合起来并交付给用户。需要注意，“插件”不是跨平台统一标准，阅读产品文档时应确认它在该平台中的准确含义。

## MCP：让模型用统一方式连接工具

MCP 的全称是 Model Context Protocol。它规定 AI 应用如何发现和调用外部工具、读取资源及交换上下文。

传统做法是每个 AI 产品分别对接 GitHub、数据库或企业系统；MCP 则希望提供一种通用接口。一个服务只要实现 MCP Server，支持 MCP 的客户端就能通过统一方式连接它。

MCP 最初由 Anthropic 在 2024 年发布，后来捐赠给 Linux Foundation 旗下的 Agentic AI Foundation。如今 OpenAI、Microsoft、Google 等产品和平台都已支持或接入 MCP。

MCP 解决的是“如何连接”，并不自动保证工具安全。身份认证、权限范围、用户确认和日志审计仍然需要由具体产品负责。

## 把这些概念放在一起

一套实际系统大致可以这样理解：

- **大模型**：分析需求并决定下一步；
- **Agent**：维护任务状态并组织多步执行；
- **Skill**：提供完成特定任务的标准流程；
- **插件**：把 Skill、应用和连接能力组合安装；
- **MCP**：把 Agent 与外部工具或数据源连接起来；
- **工具**：真正执行搜索、写文件、调用 API 等动作。

以“更新并发布一篇博客”为例：大模型理解修改要求，Agent 安排编辑、检查和发布步骤，写作 Skill 提供文章规范，GitHub 插件提供相关能力，MCP 或 API 连接外部服务，最后由 Git 和 Vercel 完成实际发布。

## 国际厂商与产品

以下产品用于帮助理解行业生态，并非市场排名或完整名单。

### OpenAI

代表产品包括 ChatGPT、Codex 和面向开发者的 Agents API。ChatGPT 偏向通用工作助手，Codex 聚焦软件开发与长任务执行；Skill 用于沉淀团队规范，插件可以组合应用、Skill 与工作流。OpenAI 的 Agent 平台也支持 MCP 和自定义工具。

### Anthropic

代表产品包括 Claude、Claude Code 和 Claude Agent SDK。Anthropic 提出了 MCP，并推出 Agent Skills，用文件夹组织说明、脚本和资源。Claude Code 是面向终端和代码库的开发智能体。

### Google

代表产品包括 Gemini、Vertex AI 与开源的 Agent Development Kit（ADK）。ADK 用于构建和编排多智能体应用，可配合 Gemini、Vertex AI，也支持其他模型和 MCP 工具。

### Microsoft

代表产品包括 Microsoft 365 Copilot、GitHub Copilot、Copilot Studio 和 Microsoft Foundry。Copilot Studio 面向企业以图形化方式创建、发布和治理智能体，并支持把 MCP Server 添加为工具。

### Amazon Web Services

AWS 通过 Amazon Bedrock 提供多模型平台，并以 Bedrock AgentCore 支持智能体运行、工具调用、安全和可观测性。原 Bedrock Agents Classic 已进入维护阶段，不再面向新客户开放。

### Meta 与开源生态

Meta 的 Llama 是有代表性的开放权重模型系列，可由开发者自行部署或通过云平台使用。在模型之上，LangChain Inc. 提供 LangChain、LangGraph 和 LangSmith，分别覆盖 Agent 开发、流程编排以及跟踪评估。

## 中国厂商与产品

### 阿里巴巴

- **大模型**：通义千问（Qwen），覆盖通用、多模态和代码模型。
- **Agent 产品**：Qwen Code 是面向开发者的编程智能体；阿里云百炼（Model Studio）提供智能体应用、知识库 RAG、插件和工作流能力，可将应用发布为 API，或接入钉钉等渠道。

### 百度

- **大模型**：文心大模型（ERNIE），覆盖语言、多模态和深度思考等模型。
- **Agent 产品**：百度智能云千帆 AppBuilder（AI 原生应用工作台），用于构建知识助手、业务 Agent 和多智能体应用，并提供知识库、工具调用及 Assistants API。

### 字节跳动

- **大模型**：豆包大模型，覆盖语言、视觉理解、图像与视频生成等能力，并通过火山引擎向企业和开发者提供服务。
- **Agent 产品**：扣子（Coze），用于创建和发布智能体、Skill、插件、工作流及应用，并支持通过 API 接入其他产品。

### DeepSeek

- **大模型**：DeepSeek 系列模型，重点覆盖推理、代码和通用任务，并提供 Web、App 与 API 服务。
- **Agent 产品**：DeepSeek Harness，面向工具调用与长任务执行，目前仍处于开发者预览和快速演进阶段。

### 腾讯

- **大模型**：腾讯混元（Tencent Hunyuan），包括语言与多模态模型；Hy3 强化了推理、代码和 Agent 能力。
- **Agent 产品**：腾讯元器面向智能体创建与分发；腾讯云智能体开发平台（Tencent Cloud ADP）面向企业构建 RAG、工作流和多智能体应用。腾讯还提供 WorkBuddy 通用工作智能体和 CodeBuddy 编程智能体。

## 如何选择

如果只是写作、总结或问答，直接使用大模型产品通常已经足够。需要稳定调用工具并完成多步任务时，再考虑 Agent。

需要让智能体遵循固定流程，可以引入 Skill；需要安装一整套面向某种角色或业务的能力，可以选择插件；需要同时连接多个工具，并希望降低平台绑定，则可以重点关注 MCP。

不要为了追逐概念而增加复杂度。一个可靠的 Agent 系统，往往不是拥有最多工具的系统，而是目标明确、权限克制、过程可观察、结果可验证的系统。

## 延伸阅读

- [OpenAI：Codex](https://openai.com/codex/)
- [Anthropic：Model Context Protocol](https://www.anthropic.com/news/model-context-protocol)
- [Anthropic：Agent Skills](https://www.anthropic.com/research/skills)
- [Google：Agent Development Kit](https://developers.googleblog.com/agent-development-kit-easy-to-build-multi-agent-applications/)
- [Microsoft：Copilot Studio](https://learn.microsoft.com/microsoft-copilot-studio)
- [LangChain：LangGraph](https://docs.langchain.com/oss/python/langgraph/overview)
- [阿里云百炼：智能体应用](https://help.aliyun.com/zh/model-studio/single-agent-application)
- [百度智能云：千帆 AI 原生应用工作台](https://cloud.baidu.com/product/ai-apaas)
- [扣子：开发平台 API 介绍](https://docs.coze.cn/developer_guides_coze_api_overview)
- [DeepSeek：官方产品与模型](https://www.deepseek.com/)
- [腾讯：混元 Hy3 与 Agent 产品](https://www.tencent.com/zh-cn/tencent-hunyuan-officially-releases-hy3-advancing-agent-capabilities-and-deeper-product-integration/)
- [腾讯云：智能体开发平台 ADP](https://cloud.tencent.com/document/product/1759/104193)

## 总结

这些概念并不是相互竞争的产品名称，而是智能体技术栈中的不同层次。大模型提供基础智能，Agent 把智能组织成行动，Skill 和插件沉淀并分发能力，MCP 则让这些能力更容易连接真实世界。

当它们被合理组合时，AI 才会从“会回答问题”走向“能够可靠完成任务”。
