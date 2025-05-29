/**
 * @interface Node
 * @description 定义网络中的节点结构。
 * @property {string} id - 节点的唯一标识符。
 */
export interface Node {
  id: string;
}

/**
 * @interface Link
 * @description 定义网络中的链接（边）结构。
 * @property {string} source - 链接的源节点ID。
 * @property {string} target - 链接的目标节点ID。
 */
export interface Link {
  source: string;
  target: string;
}

/**
 * @interface NetworkData
 * @description 定义整个网络的数据结构，包含节点和链接。
 * @property {Node[]} nodes - 网络中的节点数组。
 * @property {Link[]} links - 网络中的链接数组。
 */
export interface NetworkData {
  nodes: Node[];
  links: Link[];
}