# 实验5.3：传染病模型模拟（SIR）

## 实验目的
- 实现基于SIR模型的传染病传播模拟
- 理解传染病在网络中的传播机制
- 掌握网络动力学模拟方法
- 分析不同参数对疾病传播的影响

## 实验内容
### 1. 实验要求
- 实现SIR传染病传播模型
- 支持动态调整传播参数
- 展示网络的可视化图形
- 实时显示疾病传播状态
- 支持模拟的暂停和重置

### 2. 实验设计
#### 2.1 整体架构
- 前端使用React + TypeScript开发
- 采用组件化设计，将网络生成、状态更新和显示分离
- 使用Force-Directed Graph进行网络可视化
- 主要模块包括：
  - 网络生成模块
  - 状态更新模块
  - 可视化显示模块
  - 参数控制模块
  - 模拟控制模块

#### 2.2 核心算法
- SIR模型算法：
  - 易感者(S)：可能被感染的节点
  - 感染者(I)：已感染且可能传播疾病的节点
  - 恢复者(R)：已恢复且具有免疫力的节点
- 状态转换规则：
  - S→I：易感者与感染者接触时，以概率β被感染
  - I→R：感染者以概率γ恢复
- 网络生成算法：
  - 随机网络生成
  - 基于连接概率的边生成
  - 时间复杂度：O(n²)，其中n为节点数量

#### 2.3 数据结构
- 网络数据结构：
  ```typescript
  interface Node {
    id: string;
    state: 'S' | 'I' | 'R';  // 节点状态
  }

  interface Link {
    source: string;
    target: string;
  }

  interface Network {
    nodes: Node[];
    links: Link[];
  }

  interface SIRParameters {
    beta: number;    // 传播率
    gamma: number;   // 恢复率
    initialInfected: number;  // 初始感染人数
    totalNodes: number;      // 总节点数
    connectionProbability: number;  // 连接概率
  }
  ```

### 3. 实验实现
#### 3.1 关键代码
```typescript
// 更新网络状态
export function updateNetworkState(network: Network, params: SIRParameters): Network {
  const newNodes = [...network.nodes];
  
  // 处理感染过程
  const susceptibleNodes = newNodes.filter(node => node.state === 'S');
  const infectedNodes = newNodes.filter(node => node.state === 'I');
  
  for (const susceptible of susceptibleNodes) {
    const infectedNeighbors = findInfectedNeighbors(susceptible, infectedNodes, network);
    if (infectedNeighbors.length > 0 && Math.random() < params.beta) {
      susceptible.state = 'I';
    }
  }
  
  // 处理恢复过程
  for (const node of newNodes) {
    if (node.state === 'I' && Math.random() < params.gamma) {
      node.state = 'R';
    }
  }
  
  return { ...network, nodes: newNodes };
}
```

#### 3.2 实现细节
- 使用React Hooks管理组件状态
- 实现了参数动态调整功能
- 使用useEffect处理模拟更新
- 采用组件化设计提高代码复用性
- 实现了模拟的暂停和重置功能
- 使用颜色编码显示节点状态

### 4. 实验结果
#### 4.1 运行效果
![5-3 传染病模型模拟](./images/5-3.png)
- 支持100个节点的网络生成
- 实时显示节点状态变化
- 动态计算并显示各状态节点数量
- 支持调整传播率和恢复率

#### 4.2 结果分析
- 传染病传播特点：
  - 传播速度受β（传播率）影响
  - 恢复速度受γ（恢复率）影响
  - 网络结构影响传播范围
  - 最终达到稳定状态
- 关键发现：
  - 高传播率导致快速传播
  - 高恢复率限制传播范围
  - 网络密度影响传播效率
  - 初始感染人数影响传播速度

## 实验总结
### 1. 实验收获
- 掌握了SIR模型的实现方法
- 理解了传染病传播机制
- 学会了网络动力学模拟
- 提高了复杂系统建模能力

### 2. 改进方向
- 可以添加更多的传播模型（如SIS、SEIR等）
- 优化大规模网络的模拟性能
- 增加更多的网络结构选项
- 添加数据导出和分析功能
- 实现更复杂的传播规则

## 附录
### 部署链接
https://multi-agent-system-sigma.vercel.app/5-3
### 源代码链接
https://github.com/JacksonHe04/multi-agent-system/tree/main/src/pages/5-3
### 实验报告链接
https://jacksonhe.notion.site/mas-labs-5-3
