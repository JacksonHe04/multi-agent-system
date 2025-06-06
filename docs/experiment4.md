# 实验1.4：随机网络

## 实验目的
- 实现随机网络的生成和可视化
- 理解随机网络的结构特征
- 掌握网络拓扑特性的计算方法
- 分析连接概率对网络特性的影响

## 实验内容
### 1. 实验要求
- 实现随机网络的生成算法
- 支持动态调整节点数量和连接概率
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
- 随机网络生成算法：
  - 创建n个节点
  - 对每对不同的节点，以概率p建立连接
  - 使用Set数据结构避免重复边
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
  }
  
  interface Link {
    source: string;
    target: string;
  }
  ```

### 3. 实验实现
#### 3.1 关键代码
```typescript
export function generateRandomNetwork(numNodes: number, probability: number): NetworkData {
  // 参数验证
  if (probability < 0 || probability > 1) {
    console.warn('Probability should be between 0 and 1.');
    probability = Math.max(0, Math.min(1, probability));
  }

  const nodes: Node[] = [];
  for (let i = 0; i < numNodes; i++) {
    nodes.push({ id: `node${i}` });
  }

  const links: Link[] = [];
  const existingLinks = new Set<string>();

  // 遍历所有可能的节点对
  for (let i = 0; i < numNodes; i++) {
    for (let j = i + 1; j < numNodes; j++) {
      // 根据概率决定是否建立连接
      if (Math.random() < probability) {
        const sourceId = `node${i}`;
        const targetId = `node${j}`;
        const linkKey = `${sourceId}-${targetId}`;

        if (!existingLinks.has(linkKey)) {
          links.push({ source: sourceId, target: targetId });
          existingLinks.add(linkKey);
        }
      }
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
- 添加了参数验证和边界处理

### 4. 实验结果
#### 4.1 运行效果
![1-4 随机网络](./images/1-4.png)
- 支持2-100个节点的网络生成
- 支持0-1的连接概率调整
- 实时显示网络拓扑图
- 动态计算并显示网络指标

#### 4.2 结果分析
- 随机网络的特点：
  - 连接概率影响网络密度
  - 聚类系数较低
  - 平均路径长度较短
  - 度分布近似泊松分布
- 关键发现：
  - 高连接概率导致网络更密集
  - 低连接概率可能导致网络不连通
  - 网络特性随参数变化而变化

## 实验总结
### 1. 实验收获
- 掌握了随机网络的生成算法
- 理解了随机网络的结构特征
- 学会了网络拓扑指标的计算方法
- 提高了网络可视化开发能力

### 2. 改进方向
- 可以添加更多的网络参数控制
- 优化大规模网络的可视化性能
- 增加网络动态演化的功能
- 添加更多的网络分析指标
- 实现度分布的可视化

## 附录
### 部署链接
https://multi-agent-system-sigma.vercel.app/1-4
### 源代码链接
https://github.com/JacksonHe04/multi-agent-system/tree/main/src/pages/1-4
### 实验报告链接
https://jacksonhe.notion.site/mas-labs-1-4
