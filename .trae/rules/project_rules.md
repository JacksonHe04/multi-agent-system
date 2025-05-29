# 项目开发规范与约定

## 1. 项目目标

本项目旨在通过交互式Web界面，可视化展示多智能体系统中的核心概念和模型。主要包括以下实验选题的实现与展示：

*   **实验选题1-1到1-4：网络图可视化**
    *   1-1 全局耦合网络
    *   1-2 最近邻耦合网络
    *   1-3 星形网络
    *   1-4 随机网络
*   **实验选题5-3: 传染病模型**
    *   5-3 传染病模型（如SIR模型）

## 2. 技术栈

*   **前端框架：** React 18+
*   **语言：** TypeScript 4.x+
*   **包管理：** pnpm
*   **构建工具：** Vite
*   **状态管理：** React Context API / useState
*   **图表/可视化库：**
    *   网络图：`react-force-graph` 或 `vis-network` (通过 `react-vis-network`)
    *   曲线图：`react-chartjs-2` (基于 `Chart.js`) 或 `Recharts`
*   **样式：** Tailwind CSS

## 4. 代码规范

### 4.1 命名约定

*   **组件：** 使用PascalCase (大驼峰命名法)，例如 `NetworkGraph`, `InfectionModelSimulator`。
*   **文件：** 使用PascalCase，与组件名保持一致，例如 `NetworkGraph.tsx`。
*   **函数/变量：** 使用camelCase (小驼峰命名法)，例如 `calculateAveragePathLength`, `nodeData`。
*   **常量：** 使用SCREAMING_SNAKE_CASE (全大写下划线命名法)，例如 `MAX_NODES`。

### 4.3 ESLint

*   使用ESLint进行代码质量检查，遵循React和TypeScript的最佳实践。
*   配置 `.eslintrc.js` 文件以统一规则。

### 4.4 类型定义

*   所有函数参数、返回值和复杂数据结构都应明确定义TypeScript类型。
*   为组件的props和state定义接口或类型。

### 4.5 注释

*   **函数/组件注释：** 所有公共函数和React组件都应包含JSDoc风格的注释，说明其功能、参数、返回值和使用示例。
*   **复杂逻辑注释：** 对于复杂或不直观的代码逻辑，应添加行内注释解释。

### 4.6 目录结构 (建议)

```
src/
├── components/       # 可复用UI组件
├── pages/            # 页面组件 (对应不同的实验选题)
├── utils/            # 工具函数、算法实现 (如网络生成算法、模型计算)
├── types/            # 全局类型定义
├── assets/           # 静态资源 (图片、CSS等)
├── App.tsx           # 主应用组件
├── main.tsx          # 入口文件
└── index.css         # 全局样式
```

## 6. 性能优化

*   合理使用React的`memo`、`useCallback`、`useMemo`等Hook进行性能优化。
*   避免不必要的组件渲染。