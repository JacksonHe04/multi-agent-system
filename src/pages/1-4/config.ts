export const codeSnippet = `/**
 * @function generateRandomNetwork
 * @description 生成随机网络的数据。
 * @param {number} numNodes - 网络中的节点数量。
 * @param {number} probability - 任意两个节点之间建立连接的概率。
 * @returns {NetworkData} 包含生成的节点和边的网络数据对象。
 */
export function generateRandomNetwork(numNodes: number, probability: number): NetworkData {
  const nodes: Node[] = [];
  for (let i = 0; i < numNodes; i++) {
    nodes.push({ id: \`node\${i}\` });
  }

  const links: Link[] = [];
  const existingLinks = new Set<string>();

  for (let i = 0; i < numNodes; i++) {
    for (let j = i + 1; j < numNodes; j++) {
      if (Math.random() < probability) {
        const sourceId = \`node\${i}\`;
        const targetId = \`node\${j}\`;
        const linkKey = \`\${sourceId}-\${targetId}\`;

        if (!existingLinks.has(linkKey)) {
          links.push({ source: sourceId, target: targetId });
          existingLinks.add(linkKey);
        }
      }
    }
  }

  return { nodes, links };
}`;

export const introduction = `
随机网络是一种基本的网络模型，其中任意两个节点之间以固定概率建立连接。这种网络具有较低的聚类系数和较短的平均路径长度，是研究复杂网络的重要基准模型。
`; 