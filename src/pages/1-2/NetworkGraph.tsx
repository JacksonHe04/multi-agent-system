import React, { useState, useEffect } from "react";
import { ForceGraph2D } from "react-force-graph";
import ExperimentLayout from "../../components/ExperimentLayout";
import type { NetworkData } from "../../types/network";
import { generateNearestNeighborNetwork } from "./networkGenerators";
import {
  calculateAveragePathLength,
  calculateClusteringCoefficient,
} from "../../utils/networkAlgorithms";

interface NetworkGraphProps {
  type: "global-coupling" | "nearest-neighbor" | "star" | "random";
}

/**
 * 网络图组件
 * 根据传入的类型展示不同的网络图。
 * @param {NetworkGraphProps} props - 组件的属性
 * @param {'global-coupling' | 'nearest-neighbor' | 'star' | 'random'} props.type - 网络图类型
 * @returns {JSX.Element}
 */
const NetworkGraph: React.FC<NetworkGraphProps> = ({ type }) => {
  const [networkData, setNetworkData] = useState<NetworkData>({
    nodes: [],
    links: [],
  });
  const [avgPathLength, setAvgPathLength] = useState<number>(0);
  const [clusteringCoefficient, setClusteringCoefficient] = useState<number>(0);

  useEffect(() => {
    let data: NetworkData = { nodes: [], links: [] };
    let currentTitle = `实验1-2: ${type} 网络图`;
    let currentIntroduction = (
      <p>这里是关于 ${type} 网络图的介绍。它展示了节点和它们之间的连接关系。</p>
    );
    let currentCodeSnippet = `// 核心代码示例\nimport { ForceGraph2D } from 'react-force-graph';\n\nconst data = {\n  nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }],\n  links: [\n    { source: 'node1', target: 'node2' },\n    { source: 'node2', target: 'node3' },\n  ],\n};\n\nreturn <ForceGraph2D graphData={data} />;`;

    if (type === "nearest-neighbor") {
      const numNodes = 50; // 示例参数，可根据需要调整
      const k = 4; // 示例参数，可根据需要调整
      data = generateNearestNeighborNetwork(numNodes, k);
      const calculatedAvgPathLength = calculateAveragePathLength(data);
      const calculatedClusteringCoefficient =
        calculateClusteringCoefficient(data);

      setNetworkData(data);
      setAvgPathLength(calculatedAvgPathLength);
      setClusteringCoefficient(calculatedClusteringCoefficient);

      currentTitle = `实验1-2: 最近邻耦合网络 (N=${numNodes}, K=${k})`;
      currentIntroduction = (
        <div>
          <p>
            最近邻耦合网络是一种规则网络，每个节点连接其最近的K个邻居。这种网络具有较高的聚类系数和较长的平均路径长度。
          </p>
          <p>平均路径长度: {calculatedAvgPathLength.toFixed(4)}</p>
          <p>聚类系数: {calculatedClusteringCoefficient.toFixed(4)}</p>
        </div>
      );
      currentCodeSnippet = `/**\n * @function generateNearestNeighborNetwork\n * @description 生成最近邻耦合网络的数据。\n * @param {number} numNodes - 网络中的节点数量。\n * @param {number} k - 每个节点连接的最近邻居数量（通常为偶数）。\n * @returns {NetworkData} 包含生成的节点和边的网络数据对象。\n */\nexport function generateNearestNeighborNetwork(numNodes: number, k: number): NetworkData {\n  // ... existing code ...\n\n  const nodes: Node[] = [];\n  for (let i = 0; i < numNodes; i++) {\n    nodes.push({ id: \`node\${i}\` });\n  }\n\n  const links: Link[] = [];\n  const existingLinks = new Set<string>(); // 用于存储已存在的边，避免重复\n\n  for (let i = 0; i < numNodes; i++) {\n    for (let j = 1; j <= k / 2; j++) {\n      // 连接右侧邻居\n      const targetRight = (i + j) % numNodes;\n      let sourceId = \`node\${i}\`;\n      let targetId = \`node\${targetRight}\`;\n      let linkKey = \`\${sourceId}-\${targetId}\`;\n      let reverseLinkKey = \`\${targetId}-\${sourceId}\`;\n
      if (!existingLinks.has(linkKey) && !existingLinks.has(reverseLinkKey)) {\n        links.push({ source: sourceId, target: targetId });\n        existingLinks.add(linkKey);\n      }\n
      // 连接左侧邻居\n      const targetLeft = (i - j + numNodes) % numNodes;\n      sourceId = \`node\${i}\`;\n      targetId = \`node\${targetLeft}\`;\n      linkKey = \`\${sourceId}-\${targetId}\`;\n      reverseLinkKey = \`\${targetId}-\${sourceId}\`;\n
      if (!existingLinks.has(linkKey) && !existingLinks.has(reverseLinkKey)) {\n        links.push({ source: sourceId, target: targetId });\n        existingLinks.add(linkKey);\n      }\n    }\n  }\n
  return { nodes, links };\n}\n`;
    } else {
      // 默认或示例数据
      data = {
        nodes: [{ id: "node1" }, { id: "node2" }, { id: "node3" }],
        links: [
          { source: "node1", target: "node2" },
          { source: "node2", target: "node3" },
        ],
      };
      setNetworkData(data);
      setAvgPathLength(0);
      setClusteringCoefficient(0);
    }

    // 更新 ExperimentLayout 的 props
    setTitle(currentTitle);
    setIntroduction(currentIntroduction);
    setCodeSnippet(currentCodeSnippet);
  }, [type]);

  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState<React.ReactNode>(<p></p>);
  const [codeSnippet, setCodeSnippet] = useState("");

  const displayArea = (
    <>
      <ForceGraph2D graphData={networkData} width={600} height={600} />
      {type === "nearest-neighbor" && (
        <div>
          <p>平均路径长度: {avgPathLength.toFixed(4)}</p>
          <p>聚类系数: {clusteringCoefficient.toFixed(4)}</p>
        </div>
      )}
    </>
  );

  return (
    <ExperimentLayout
      title={title}
      introduction={introduction}
      codeSnippet={codeSnippet}
      displayArea={displayArea}
    />
  );
};

export default NetworkGraph;
