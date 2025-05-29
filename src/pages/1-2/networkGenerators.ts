import type { NetworkData, Node, Link } from '../../types/network';

/**
 * @function generateNearestNeighborNetwork
 * @description 生成最近邻耦合网络的数据。
 * @param {number} numNodes - 网络中的节点数量。
 * @param {number} k - 每个节点连接的最近邻居数量（通常为偶数）。
 * @returns {NetworkData} 包含生成的节点和边的网络数据对象。
 */
export function generateNearestNeighborNetwork(numNodes: number, k: number): NetworkData {
  if (k % 2 !== 0) {
    console.warn('k should be an even number for nearest-neighbor network.');
    // 可以选择抛出错误或自动调整 k
    k = k - 1; // 调整为最近的偶数
  }
  if (k >= numNodes) {
    console.warn('k should be less than numNodes for a meaningful nearest-neighbor network.');
    k = numNodes - 1; // 避免 k 过大导致所有节点都连接
  }

  const nodes: Node[] = [];
  for (let i = 0; i < numNodes; i++) {
    nodes.push({ id: `node${i}` });
  }

  const links: Link[] = [];
  const existingLinks = new Set<string>(); // 用于存储已存在的边，避免重复

  for (let i = 0; i < numNodes; i++) {
    for (let j = 1; j <= k / 2; j++) {
      // 连接右侧邻居
      const targetRight = (i + j) % numNodes;
      let sourceId = `node${i}`;
      let targetId = `node${targetRight}`;
      let linkKey = `${sourceId}-${targetId}`;
      let reverseLinkKey = `${targetId}-${sourceId}`;

      if (!existingLinks.has(linkKey) && !existingLinks.has(reverseLinkKey)) {
        links.push({ source: sourceId, target: targetId });
        existingLinks.add(linkKey);
      }

      // 连接左侧邻居
      const targetLeft = (i - j + numNodes) % numNodes;
      sourceId = `node${i}`;
      targetId = `node${targetLeft}`;
      linkKey = `${sourceId}-${targetId}`;
      reverseLinkKey = `${targetId}-${sourceId}`;

      if (!existingLinks.has(linkKey) && !existingLinks.has(reverseLinkKey)) {
        links.push({ source: sourceId, target: targetId });
        existingLinks.add(linkKey);
      }
    }
  }

  return { nodes, links };
}