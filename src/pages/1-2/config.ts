export const codeSnippet = `/**
 * @function generateNearestNeighborNetwork
 * @description 生成最近邻耦合网络的数据。
 * @param {number} numNodes - 网络中的节点数量。
 * @param {number} k - 每个节点连接的最近邻居数量（通常为偶数）。
 * @returns {NetworkData} 包含生成的节点和边的网络数据对象。
 */
export function generateNearestNeighborNetwork(numNodes: number, k: number): NetworkData {
  const nodes: Node[] = [];
  for (let i = 0; i < numNodes; i++) {
    nodes.push({ id: \`node\${i}\` });
  }

  const links: Link[] = [];
  const existingLinks = new Set<string>();

  for (let i = 0; i < numNodes; i++) {
    for (let j = 1; j <= k / 2; j++) {
      // 连接右侧邻居
      const targetRight = (i + j) % numNodes;
      let sourceId = \`node\${i}\`;
      let targetId = \`node\${targetRight}\`;
      let linkKey = \`\${sourceId}-\${targetId}\`;
      let reverseLinkKey = \`\${targetId}-\${sourceId}\`;

      if (!existingLinks.has(linkKey) && !existingLinks.has(reverseLinkKey)) {
        links.push({ source: sourceId, target: targetId });
        existingLinks.add(linkKey);
      }

      // 连接左侧邻居
      const targetLeft = (i - j + numNodes) % numNodes;
      sourceId = \`node\${i}\`;
      targetId = \`node\${targetLeft}\`;
      linkKey = \`\${sourceId}-\${targetId}\`;
      reverseLinkKey = \`\${targetId}-\${sourceId}\`;

      if (!existingLinks.has(linkKey) && !existingLinks.has(reverseLinkKey)) {
        links.push({ source: sourceId, target: targetId });
        existingLinks.add(linkKey);
      }
    }
  }

  return { nodes, links };
}`;

export const introduction = `
最近邻耦合网络是一种规则网络，每个节点连接其最近的K个邻居。这种网络具有较高的聚类系数和较长的平均路径长度。
`;
