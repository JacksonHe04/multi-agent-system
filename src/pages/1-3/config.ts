export const codeSnippet = `/**
 * @function generateStarNetwork
 * @description 生成一个星形网络。
 * @param {number} numNodes - 节点数量。
 * @returns {NetworkData} 包含节点和边的网络数据。
 */
export function generateStarNetwork(numNodes: number): NetworkData {
  const nodes = [];
  const links = [];
  
  // 创建中心节点
  const centerNodeId = 'node0';
  nodes.push({ id: centerNodeId });
  
  // 创建叶子节点并连接到中心节点
  for (let i = 1; i < numNodes; i++) {
    const leafNodeId = \`node\${i}\`;
    nodes.push({ id: leafNodeId });
    links.push({ source: centerNodeId, target: leafNodeId });
  }
  
  return { nodes, links };
}`;

export const introduction = `星形网络是一种特殊的网络结构，其中有一个中心节点，其他所有节点都只与中心节点相连。

这种网络结构具有以下特点：
1. 中心节点具有最高的度（连接数）
2. 其他节点（叶子节点）的度都为1
3. 平均路径长度较短
4. 聚类系数为0（因为叶子节点之间没有连接）

通过调整节点数量，我们可以观察网络拓扑特性的变化，特别是中心节点的负载和网络的整体效率。`; 