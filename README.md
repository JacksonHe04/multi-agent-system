 # 多智能体系统 (Multi-Agent System)

这是一个基于 React 和 TypeScript 构建的多智能体系统可视化项目。该项目使用现代化的前端技术栈，提供了一个交互式的界面来展示和分析多智能体系统的行为。

## 技术栈

- React 19
- TypeScript
- Vite
- TailwindCSS
- React Force Graph
- A-Frame (用于 3D 可视化)

## 功能特点

- 交互式多智能体系统可视化
- 3D 场景渲染
- 实时数据更新
- 响应式设计

### 网络模型展示

本项目使用 React Force Graph 实现了多种经典网络模型的可视化展示，每种模型都支持参数自定义和实时计算网络指标：

1. **全局耦合网络**
   - 展示完全连接的网络结构
   - 实时计算平均路径长度和聚类系数
   - 支持节点数量自定义

2. **最近邻耦合网络**
   - 展示规则环形网络结构
   - 支持邻居数量参数调整
   - 实时计算网络指标

3. **星形网络**
   - 展示中心辐射型网络结构
   - 支持中心节点和外围节点数量调整
   - 实时计算网络指标

4. **随机网络**
   - 基于 Erdős-Rényi 模型
   - 支持连接概率参数调整
   - 实时计算网络指标

### 传染病模型

- 实现基于 SIR 模型的传染病传播模拟
- 支持自定义传播率、恢复率等参数
- 实时可视化传播过程
- 提供传播趋势分析

### 交互式参数控制

通过 `NetworkComponents.tsx` 提供的参数控制面板，用户可以：

- 实时调整网络参数
- 自定义节点数量
- 修改连接概率
- 调整网络结构参数
- 所有参数修改都会即时反映在网络可视化中

### 可视化技术

本项目使用 React Force Graph 实现网络可视化，具有以下特点：

- 支持力导向布局算法
- 交互式节点拖拽
- 自适应布局调整
- 支持缩放和平移
- 节点和边的动态样式
- 实时数据更新

## 开始使用

### 环境要求

- Node.js (推荐 v18 或更高版本)
- pnpm 包管理器

### 安装

1. 克隆项目
```bash
git clone [项目地址]
cd multi-agent-system
```

2. 安装依赖
```bash
pnpm install
```

3. 启动开发服务器
```bash
pnpm dev
```

4. 构建生产版本
```bash
pnpm build
```

## 项目结构

```
multi-agent-system/
├── src/                # 源代码目录
│   ├── components/     # React 组件
│   ├── pages/         # 页面组件
│   ├── utils/         # 工具函数
│   ├── types/         # TypeScript 类型定义
│   └── assets/        # 静态资源
├── public/            # 公共资源
└── dist/              # 构建输出目录
```

## 开发指南

- 使用 `pnpm dev` 启动开发服务器
- 使用 `pnpm lint` 运行代码检查
- 使用 `pnpm build` 构建生产版本
- 使用 `pnpm preview` 预览生产构建

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

[MIT License](LICENSE)