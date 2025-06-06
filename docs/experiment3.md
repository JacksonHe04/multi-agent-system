# 实验1.3：星形网络

## 实验目的
- 实现星形网络的生成和可视化
- 理解中心化网络的结构特征
- 掌握网络拓扑特性的计算方法
- 分析星形网络的优缺点

## 实验内容
### 1. 实验要求
- 实现星形网络的生成算法
- 支持动态调整节点数量
- 展示网络的可视化图形
- 计算并展示网络的平均路径长度和聚类系数

### 2. 实验设计
#### 2.1 整体架构
- 前端使用React + TypeScript开发
- 采用组件化设计，将网络生成、计算和显示分离
- 使用Force-Directed Graph进行网络可视化
- 主要模块包括：
  - 网络生成模块
  - 网络计算模块
  - 可视化显示模块
  - 参数控制模块

#### 2.2 核心算法
- 星形网络生成算法：
  - 创建一个中心节点
  - 创建n-1个叶子节点
  - 将所有叶子节点连接到中心节点
  - 时间复杂度：O(n)，其中n为节点数量

#### 2.3 数据结构
- 网络数据结构：
  ```typescript
  interface NetworkData {
    nodes: Node[];
    links: Link[];
  }
  
  interface Node {
    id: string;
  }
  
  interface Link {
    source: string;
    target: string;
  }
  ```

### 3. 实验实现
#### 3.1 关键代码
```typescript
export function generateStarNetwork(numNodes: number): NetworkData {
  if (numNodes < 2) {
    console.warn("星形网络至少需要2个节点（1个中心节点，1个叶子节点）。");
    return { nodes: [], links: [] };
  }

  const nodes: Node[] = [];
  const links: Link[] = [];

  // 创建中心节点
  const centerNodeId = 'node0';
  nodes.push({ id: centerNodeId });

  // 创建叶子节点并连接到中心节点
  for (let i = 1; i < numNodes; i++) {
    const leafNodeId = `node${i}`;
    nodes.push({ id: leafNodeId });
    links.push({ source: centerNodeId, target: leafNodeId });
  }

  return { nodes, links };
}
```

#### 3.2 实现细节
- 使用React Hooks管理组件状态
- 实现了参数动态调整功能
- 使用useEffect处理网络数据的更新
- 采用组件化设计提高代码复用性
- 添加了节点数量验证

### 4. 实验结果
#### 4.1 运行效果
![1-3 星形网络](./images/1-3.png)
- 支持2-50个节点的网络生成
- 实时显示网络拓扑图
- 动态计算并显示网络指标

#### 4.2 结果分析
- 星形网络的特点：
  - 中心节点具有最高的度（n-1）
  - 叶子节点的度都为1
  - 平均路径长度为2（任意两个叶子节点之间需要经过中心节点）
  - 聚类系数为0（叶子节点之间没有连接）
  - 具有最短的平均路径长度
  - 中心节点成为单点故障风险

## 实验总结
### 1. 实验收获
- 掌握了中心化网络的生成算法
- 理解了星形网络的结构特征
- 学会了网络拓扑指标的计算方法
- 提高了网络可视化开发能力

### 2. 改进方向
- 可以添加更多的网络参数控制
- 优化大规模网络的可视化性能
- 增加网络动态演化的功能
- 添加更多的网络分析指标
- 实现中心节点的负载分析

## 附录
### 部署链接
https://multi-agent-system-sigma.vercel.app/1-3
### 源代码链接
https://github.com/JacksonHe04/multi-agent-system/tree/main/src/pages/1-3
### 实验报告链接
https://jacksonhe.notion.site/mas-labs-1-3
