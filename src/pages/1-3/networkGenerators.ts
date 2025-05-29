import type { Node, Link, NetworkData } from '../../types/network';

/**
 * @function generateStarNetwork
 * @description 生成一个星形网络的数据。星形网络由一个中心节点和若干个叶子节点组成，所有叶子节点都只与中心节点相连。
 * @param {number} numNodes - 网络中的总节点数。至少为2（1个中心节点，1个叶子节点）。
 * @returns {NetworkData} 星形网络的数据，包含节点和链接。
 */
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