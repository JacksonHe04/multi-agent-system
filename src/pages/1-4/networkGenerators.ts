import type { NetworkData, Node, Link } from '../../types/network';

/**
 * @function generateRandomNetwork
 * @description 生成随机网络的数据。
 * @param {number} numNodes - 网络中的节点数量。
 * @param {number} probability - 任意两个节点之间建立连接的概率。
 * @returns {NetworkData} 包含生成的节点和边的网络数据对象。
 */
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