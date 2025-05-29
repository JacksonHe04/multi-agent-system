import type { NetworkData, Node, Link } from '../../types/network';

interface GlobalCouplingNetworkParams {
  numNodes: number;
  nodeSize?: number;
  linkStrength?: number;
}

/**
 * @function generateGlobalCouplingNetwork
 * @description 生成一个全局耦合网络（完全图）。
 * @param {GlobalCouplingNetworkParams} params - 网络参数
 * @param {number} params.numNodes - 节点数量
 * @param {number} [params.nodeSize=5] - 节点大小
 * @param {number} [params.linkStrength=1] - 连接强度
 * @returns {NetworkData} 包含节点和边的网络数据。
 */
export function generateGlobalCouplingNetwork(params: GlobalCouplingNetworkParams): NetworkData {
  const { numNodes, nodeSize = 5, linkStrength = 1 } = params;
  
  const nodes: Node[] = [];
  for (let i = 0; i < numNodes; i++) {
    nodes.push({
      id: `node-${i}`,
      size: nodeSize
    });
  }

  const links: Link[] = [];
  for (let i = 0; i < numNodes; i++) {
    for (let j = i + 1; j < numNodes; j++) {
      links.push({
        source: `node-${i}`,
        target: `node-${j}`,
        value: linkStrength
      });
    }
  }

  return { nodes, links };
}