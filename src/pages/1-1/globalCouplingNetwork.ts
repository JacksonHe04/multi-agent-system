import type { NetworkData, Node, Link } from '../../types/network';

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