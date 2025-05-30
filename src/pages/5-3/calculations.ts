import type { Network, Node, SIRParameters, TimeSeriesData, Link } from './types';

// 网络状态类型
type NodeState = 'S' | 'I' | 'R';

// 网络统计信息接口
interface NetworkStats {
  totalNodes: number;
  totalLinks: number;
  averageConnections: number;
  initialInfected: number;
}

// 状态更新信息接口
interface StateUpdateInfo {
  susceptible: number;
  infected: number;
  recovered: number;
  newInfections: number;
  newRecoveries: number;
  beta: number;
  gamma: number;
  infectedNeighbors: number;
}

// 生成随机网络
export function generateRandomNetwork(params: SIRParameters): Network {
  validateNetworkParams(params);

  const nodes: Node[] = createNodes(params);
  const links: Link[] = createRandomLinks(nodes, params.connectionProbability);
  calculateNetworkStats(nodes, links, params);

  return { nodes, links };
}

// 验证网络参数
function validateNetworkParams(params: SIRParameters): void {
  if (params.totalNodes <= 0) throw new Error('总节点数必须大于0');
  if (params.initialInfected < 0 || params.initialInfected > params.totalNodes) {
    throw new Error('初始感染节点数必须在0到总节点数之间');
  }
  if (params.connectionProbability < 0 || params.connectionProbability > 1) {
    throw new Error('连接概率必须在0到1之间');
  }
}

// 创建节点
function createNodes(params: SIRParameters): Node[] {
  return Array.from({ length: params.totalNodes }, (_, i) => ({
    id: `node-${i}`,
    state: i < params.initialInfected ? 'I' : 'S'
  }));
}

// 创建随机连接
function createRandomLinks(nodes: Node[], connectionProbability: number): Link[] {
  const links: Link[] = [];

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const randomValue = Math.random();
      if (randomValue < connectionProbability) {
        links.push({
          source: nodes[i].id,
          target: nodes[j].id
        });
      }
    }
  }

  return links;
}

// 计算网络统计信息
function calculateNetworkStats(nodes: Node[], links: Link[], params: SIRParameters): NetworkStats {
  return {
    totalNodes: nodes.length,
    totalLinks: links.length,
    averageConnections: (links.length * 2) / nodes.length,
    initialInfected: params.initialInfected
  };
}

// 更新网络状态
export function updateNetworkState(network: Network, params: SIRParameters): Network {
  validateStateUpdateParams(params);

  const newNodes = [...network.nodes];
  processStateUpdate(newNodes, network, params);

  return { ...network, nodes: newNodes };
}

// 验证状态更新参数
function validateStateUpdateParams(params: SIRParameters): void {
  if (params.beta < 0 || params.beta > 1) throw new Error('传播率必须在0到1之间');
  if (params.gamma < 0 || params.gamma > 1) throw new Error('恢复率必须在0到1之间');
}

// 处理状态更新
function processStateUpdate(nodes: Node[], network: Network, params: SIRParameters): StateUpdateInfo {
  const infectedNodes = nodes.filter(node => node.state === 'I');
  const susceptibleNodes = nodes.filter(node => node.state === 'S');
  
  const newInfections = processInfections(susceptibleNodes, infectedNodes, network, params);
  const newRecoveries = processRecoveries(nodes, params);

  return {
    susceptible: nodes.filter(n => n.state === 'S').length,
    infected: nodes.filter(n => n.state === 'I').length,
    recovered: nodes.filter(n => n.state === 'R').length,
    newInfections,
    newRecoveries,
    beta: params.beta,
    gamma: params.gamma,
    infectedNeighbors: calculateInfectedNeighbors(infectedNodes, network)
  };
}

// 处理感染过程
function processInfections(
  susceptibleNodes: Node[],
  infectedNodes: Node[],
  network: Network,
  params: SIRParameters
): number {
  let newInfections = 0;
  
  const nodesToInfect: Node[] = [];

  for (const susceptible of susceptibleNodes) {
    const infectedNeighbors = findInfectedNeighbors(susceptible, infectedNodes, network);
    
    if (infectedNeighbors.length > 0) {
      for (const infectedId of infectedNeighbors) {
        const randomValue = Math.random();
        if (randomValue < params.beta) {
          nodesToInfect.push(susceptible);
          break;
        }
      }
    }
  }

  for (const node of nodesToInfect) {
    node.state = 'I';
    newInfections++;
  }

  return newInfections;
}

// 查找感染者邻居
function findInfectedNeighbors(
  node: Node,
  infectedNodes: Node[],
  network: Network
): string[] {
  const neighbors = network.links
    .filter(link => {
      const isConnected = link.source === node.id || link.target === node.id;
      const isInfected = infectedNodes.some(inf => 
        inf.id === (link.source === node.id ? link.target : link.source)
      );
      return isConnected && isInfected;
    })
    .map(link => link.source === node.id ? link.target : link.source);
  
  return neighbors;
}

// 处理恢复过程
function processRecoveries(nodes: Node[], params: SIRParameters): number {
  let newRecoveries = 0;

  for (const node of nodes) {
    if (node.state === 'I' && Math.random() < params.gamma) {
      node.state = 'R';
      newRecoveries++;
    }
  }

  return newRecoveries;
}

// 计算感染者邻居数
function calculateInfectedNeighbors(infectedNodes: Node[], network: Network): number {
  if (infectedNodes.length === 0) return 0;
  
  return network.links.filter(link => 
    infectedNodes.some(inf => inf.id === link.source || inf.id === link.target)
  ).length / infectedNodes.length;
}

// 计算时间序列数据
export function calculateTimeSeriesData(network: Network, simulationTime: number): TimeSeriesData {
  const counts = {
    susceptible: 0,
    infected: 0,
    recovered: 0
  };

  network.nodes.forEach(node => {
    counts[node.state.toLowerCase() as keyof typeof counts]++;
  });

  return {
    time: simulationTime,
    ...counts
  };
} 