import type { SIRParameters } from './types';

// 默认参数配置
export const defaultParams: SIRParameters = {
  beta: 0.5,           // 传播率
  gamma: 0.05,           // 恢复率
  initialInfected: 3,  // 初始感染人数
  totalNodes: 100,     // 总节点数
  connectionProbability: 0.1  // 连接概率
};

// 参数配置项
export const paramConfig = [
  {
    id: 'beta' as keyof SIRParameters,
    label: '传播率 (β)',
    min: 0,
    max: 1,
    step: 0.1,
    description: '疾病传播的概率'
  },
  {
    id: 'gamma' as keyof SIRParameters,
    label: '恢复率 (γ)',
    min: 0,
    max: 1,
    step: 0.1,
    description: '感染者恢复的概率'
  },
  {
    id: 'initialInfected' as keyof SIRParameters,
    label: '初始感染人数',
    min: 1,
    max: defaultParams.totalNodes,
    step: 1,
    description: '模拟开始时的感染者数量'
  },
  {
    id: 'connectionProbability' as keyof SIRParameters,
    label: '连接概率',
    min: 0,
    max: 1,
    step: 0.1,
    description: '网络中节点之间建立连接的概率'
  }
];

export const codeSnippet = `// 核心模拟逻辑
const updateNetworkState = (network: Network, params: SIRParameters) => {
  // 更新每个节点的状态
  network.nodes.forEach(node => {
    if (node.state === 'I') {
      // 感染者有概率恢复
      if (Math.random() < params.gamma) {
        node.state = 'R';
      }
    } else if (node.state === 'S') {
      // 易感者可能被感染
      const infectedNeighbors = node.neighbors.filter(n => n.state === 'I');
      if (infectedNeighbors.length > 0 && Math.random() < params.beta) {
        node.state = 'I';
      }
    }
  });
  return network;
};`;

export const introduction = `这是一个基于 SIR（易感-感染-恢复）模型的传染病传播模拟。通过调整传播率、恢复率等参数，可以观察疾病在网络中的传播过程。`;