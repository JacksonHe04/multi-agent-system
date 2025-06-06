# 实验1.1：全局耦合网络

## 实验目的
- 实现全局耦合网络（完全图）的生成和可视化
- 掌握网络拓扑特性的计算方法
- 理解全局耦合网络的结构特征和性质

## 实验内容
### 1. 实验要求
- 实现全局耦合网络的生成算法
- 展示网络的可视化图形
- 计算并展示网络的平均路径长度和聚类系数
- 支持动态调整节点数量

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
- 全局耦合网络生成算法：
  - 创建n个节点
  - 为每对不同的节点之间创建一条边
  - 时间复杂度：O(n²)，其中n为节点数量

#### 2.3 数据结构
- 网络数据结构：
  ```typescript
  interface NetworkData {
    nodes: Node[];
    links: Link[];
  }
  
  interface Node {
    id: string;
    size: number;
  }
  
  interface Link {
    source: string;
    target: string;
    value: number;
  }
  ```

### 3. 实验实现
#### 3.1 关键代码
```typescript
export function generateGlobalCouplingNetwork(params: GlobalCouplingNetworkParams): NetworkData {
  const { numNodes, nodeSize = 5, linkStrength = 1 } = params;
  
  const nodes: Node[] = [];
  for (let i = 0; i < numNodes; i++) {
    nodes.push({
      id: `node-${i}`,
      size: nodeSize
    });
  }

  const links: Link[] = [];
  for (let i = 0; i < numNodes; i++) {
    for (let j = i + 1; j < numNodes; j++) {
      links.push({
        source: `node-${i}`,
        target: `node-${j}`,
        value: linkStrength
      });
    }
  }

  return { nodes, links };
}
```

#### 3.2 实现细节
- 使用React Hooks管理组件状态
- 实现了参数动态调整功能
- 使用useEffect处理网络数据的更新
- 采用组件化设计提高代码复用性

### 4. 实验结果
#### 4.1 运行效果
![1-1 全局耦合网络](./images/1-1.png)
- 支持2-100个节点的网络生成
- 实时显示网络拓扑图
- 动态计算并显示网络指标

#### 4.2 结果分析
- 全局耦合网络的特点：
  - 平均路径长度为1（任意两点间距离为1）
  - 聚类系数为1（任意三个节点都形成三角形）
  - 具有最大的连通性和最小的平均路径长度

## 实验总结
### 1. 实验收获
- 掌握了网络生成算法的实现方法
- 理解了全局耦合网络的结构特征
- 学会了网络拓扑指标的计算方法
- 提高了React组件开发能力

### 2. 改进方向
- 可以添加更多的网络参数控制
- 优化大规模网络的可视化性能
- 增加网络动态演化的功能
- 添加更多的网络分析指标

## 附录
### 部署链接
https://multi-agent-system-sigma.vercel.app/1-1
### 源代码链接
https://github.com/JacksonHe04/multi-agent-system/tree/main/src/pages/1-1
### 实验报告链接
https://jacksonhe.notion.site/mas-labs-1-1
