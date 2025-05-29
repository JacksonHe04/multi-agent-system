export const codeSnippet = `/**
* @function generateGlobalCouplingNetwork
* @description 生成一个全局耦合网络（完全图）。
* @param {number} numNodes - 节点数量。
* @returns {NetworkData} 包含节点和边的网络数据。
*/
export function generateGlobalCouplingNetwork(numNodes: number): NetworkData {
 const nodes: Node[] = [];
 for (let i = 0; i < numNodes; i++) {
   nodes.push({ id: \`node-\${i}\` });
 }

 const links: Link[] = [];
 for (let i = 0; i < numNodes; i++) {
   for (let j = i + 1; j < numNodes; j++) {
     links.push({ source: \`node-\${i}\`, target: \`node-\${j}\` });
   }
 }

 return { nodes, links };
}
 `;

export const introduction = `
本实验展示了全局耦合网络（完全图）的结构及其拓扑特性。

在全局耦合网络中，任意两个不同的节点之间都存在一条边，这意味着网络中的所有节点都直接相连。

这种网络结构具有高度的连通性，通常用于模拟信息或影响可以迅速传播的系统。

通过计算网络的平均路径长度和聚类系数，我们可以量化其"小世界"特性和局部连接的紧密程度。
`;