import type { NetworkData, Node, Link } from '../types/network';

/**
 * @function generateGlobalCouplingNetwork
 * @description 生成一个全局耦合网络（完全图）。
 * @param {number} numNodes - 节点数量。
 * @returns {NetworkData} 包含节点和边的网络数据。
 */
export function generateGlobalCouplingNetwork(numNodes: number): NetworkData {
  const nodes: Node[] = [];
  for (let i = 0; i < numNodes; i++) {
    nodes.push({ id: `node-${i}` });
  }

  const links: Link[] = [];
  for (let i = 0; i < numNodes; i++) {
    for (let j = i + 1; j < numNodes; j++) {
      links.push({ source: `node-${i}`, target: `node-${j}` });
    }
  }

  return { nodes, links };
}

/**
 * @function calculateAveragePathLength
 * @description 计算给定网络的平均路径长度。
 * @param {NetworkData} networkData - 网络数据，包含节点和边。
 * @returns {number} 平均路径长度。
 */
export function calculateAveragePathLength(networkData: NetworkData): number {
  const { nodes, links } = networkData;
  if (nodes.length === 0) return 0;
  if (nodes.length === 1) return 0; // 单个节点没有路径长度

  const adj: Map<string, string[]> = new Map();
  nodes.forEach(node => adj.set(node.id, []));
  links.forEach(link => {
    adj.get(link.source)?.push(link.target);
    adj.get(link.target)?.push(link.source);
  });

  let totalPathLength = 0;
  let reachablePairs = 0;

  for (const startNode of nodes) {
    const distances: Map<string, number> = new Map();
    const queue: string[] = [];

    nodes.forEach(node => distances.set(node.id, Infinity));
    distances.set(startNode.id, 0);
    queue.push(startNode.id);

    let head = 0;
    while (head < queue.length) {
      const u = queue[head++];
      const currentDist = distances.get(u)!;

      adj.get(u)?.forEach(v => {
        if (distances.get(v) === Infinity) {
          distances.set(v, currentDist + 1);
          queue.push(v);
        }
      });
    }

    for (const endNode of nodes) {
      if (startNode.id !== endNode.id) {
        const dist = distances.get(endNode.id)!;
        if (dist !== Infinity) {
          totalPathLength += dist;
          reachablePairs++;
        }
      }
    }
  }

  return reachablePairs > 0 ? totalPathLength / reachablePairs : 0;
}

/**
 * @function calculateClusteringCoefficient
 * @description 计算给定网络的平均聚类系数。
 * @param {NetworkData} networkData - 网络数据，包含节点和边。
 * @returns {number} 平均聚类系数。
 */
export function calculateClusteringCoefficient(networkData: NetworkData): number {
  const { nodes, links } = networkData;
  if (nodes.length === 0) return 0;

  const adj: Map<string, Set<string>> = new Map();
  nodes.forEach(node => adj.set(node.id, new Set()));
  links.forEach(link => {
    adj.get(link.source)?.add(link.target);
    adj.get(link.target)?.add(link.source);
  });

  let totalClusteringCoefficient = 0;

  for (const node of nodes) {
    const neighbors = Array.from(adj.get(node.id)!);
    const k = neighbors.length; // 节点的度

    if (k < 2) {
      // 度小于2的节点，局部聚类系数为0
      continue;
    }

    let numExistingEdgesBetweenNeighbors = 0;
    for (let i = 0; i < k; i++) {
      for (let j = i + 1; j < k; j++) {
        const neighbor1 = neighbors[i];
        const neighbor2 = neighbors[j];
        // 检查两个邻居之间是否存在边
        if (adj.get(neighbor1)?.has(neighbor2)) {
          numExistingEdgesBetweenNeighbors++;
        }
      }
    }
    // 计算局部聚类系数
    const Ci = (2 * numExistingEdgesBetweenNeighbors) / (k * (k - 1));
    totalClusteringCoefficient += Ci;
  }

  return totalClusteringCoefficient / nodes.length;
}