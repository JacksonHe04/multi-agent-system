import React, { useState, useEffect } from "react";
import { ForceGraph2D } from "react-force-graph";
import type { NetworkData } from "../../types/network";
import {
  calculateAveragePathLength,
  calculateClusteringCoefficient,
} from "../../utils/networkAlgorithms";
import { generateGlobalCouplingNetwork } from "./globalCouplingNetwork";
import ExperimentLayout from "../../components/ExperimentLayout";

interface NetworkGraphProps {
  type: "global-coupling";
}

/**
 * @function NetworkGraph
 * @description 实验1-1的入口组件，负责集成网络生成、计算和可视化。
 * @param {NetworkGraphProps} props - 组件属性。
 * @param {'global-coupling'} props.type - 明确指定为全局耦合网络类型。
 * @returns {JSX.Element} 渲染的网络图组件。
 */
const NetworkGraph: React.FC<NetworkGraphProps> = ({ type }) => {
  const [networkData, setNetworkData] = useState<NetworkData | null>(null);
  const [averagePathLength, setAveragePathLength] = useState<number | null>(
    null
  );
  const [clusteringCoefficient, setClusteringCoefficient] = useState<
    number | null
  >(null);

  // 节点数量，可以根据需要调整
  const numNodes = 50;

  useEffect(() => {
    if (type === "global-coupling") {
      const data = generateGlobalCouplingNetwork(numNodes);
      setNetworkData(data);
    }
  }, [type, numNodes]);

  useEffect(() => {
    if (networkData) {
      const avgPath = calculateAveragePathLength(networkData);
      setAveragePathLength(avgPath);

      const clusteringCoeff = calculateClusteringCoefficient(networkData);
      setClusteringCoefficient(clusteringCoeff);
    }
  }, [networkData]);

  const introduction = (
    <>
      <p>
        本实验展示了<b>全局耦合网络（完全图）</b>的结构及其拓扑特性。
      </p>
      <p>
        在全局耦合网络中，任意两个不同的节点之间都存在一条边，这意味着网络中的所有节点都直接相连。
      </p>
      <p>
        这种网络结构具有高度的连通性，通常用于模拟信息或影响可以迅速传播的系统。
      </p>
      <p>
        通过计算网络的平均路径长度和聚类系数，我们可以量化其“小世界”特性和局部连接的紧密程度。
      </p>
      <ul>
        <li>
          <b>平均路径长度：</b>{" "}
          {averagePathLength !== null
            ? averagePathLength.toFixed(4)
            : "计算中..."}
        </li>
        <li>
          <b>聚类系数：</b>{" "}
          {clusteringCoefficient !== null
            ? clusteringCoefficient.toFixed(4)
            : "计算中..."}
        </li>
      </ul>
    </>
  );

  const codeSnippet = `/**
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

  return (
    <ExperimentLayout
      title="实验1-1：全局耦合网络"
      introduction={introduction}
      codeSnippet={codeSnippet}
      displayArea={
        networkData ? (
          <ForceGraph2D
            graphData={networkData}
            nodeLabel="id"
            linkDirectionalArrowLength={3}
            linkDirectionalArrowRelPos={1}
            linkCurvature={0.1}
            nodeAutoColorBy="id"
            width={600} // 将宽度设置为 undefined，使其自适应父容器
            height={600}
          />
        ) : (
          <div>加载网络数据...</div>
        )
      }
    />
  );
};

export default NetworkGraph;
