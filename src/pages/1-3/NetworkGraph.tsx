import React from 'react';
import { ForceGraph2D } from 'react-force-graph'; // 假设使用 react-force-graph
import ExperimentLayout from '../../components/ExperimentLayout'; // 引入通用布局组件
import { generateStarNetwork } from './networkGenerators';
import { calculateAveragePathLength, calculateClusteringCoefficient } from '../../utils/networkAlgorithms';
import type { NetworkData } from '../../types/network';

interface NetworkGraphProps {
  type: 'global-coupling' | 'nearest-neighbor' | 'star' | 'random';
}

/**
 * 网络图组件
 * 根据传入的类型展示不同的网络图。
 * @param {NetworkGraphProps} props - 组件的属性
 * @param {'global-coupling' | 'nearest-neighbor' | 'star' | 'random'} props.type - 网络图类型
 * @returns {JSX.Element}
 */
const NetworkGraph: React.FC<NetworkGraphProps> = ({ type }) => {
  const [networkData, setNetworkData] = React.useState<NetworkData>({
    nodes: [],
    links: [],
  });
  const [avgPathLength, setAvgPathLength] = React.useState<number>(0);
  const [clusteringCoefficient, setClusteringCoefficient] = React.useState<number>(0);

  React.useEffect(() => {
    let data: NetworkData = { nodes: [], links: [] };
    if (type === 'star') {
      // 假设星形网络有10个节点，您可以根据需要调整节点数量
      data = generateStarNetwork(10);
    } 
    // else if (type === 'global-coupling') {
    //   // TODO: 实现全局耦合网络生成逻辑
    //   // data = generateGlobalCouplingNetwork(numNodes);
    // } else if (type === 'nearest-neighbor') {
    //   // TODO: 实现最近邻耦合网络生成逻辑
    //   // data = generateNearestNeighborNetwork(numNodes);
    // } else if (type === 'random') {
    //   // TODO: 实现随机网络生成逻辑
    //   // data = generateRandomNetwork(numNodes);
    // }
    setNetworkData(data);

    // 计算并设置网络指标
    setAvgPathLength(calculateAveragePathLength(data));
    setClusteringCoefficient(calculateClusteringCoefficient(data));
  }, [type]);

  const title = `实验1-3: ${type} 网络图`;
  const introduction = (
    <div>
      <p>这里是关于 {type} 网络图的介绍。它展示了节点和它们之间的连接关系。</p>
      {type === 'star' && (
        <>
          <p>平均路径长度: {avgPathLength.toFixed(4)}</p>
          <p>聚类系数: {clusteringCoefficient.toFixed(4)}</p>
        </>
      )}
    </div>
  );
  const codeSnippet = `// 核心代码示例
// 创建中心节点
const centerNodeId = 'node0';
nodes.push({ id: centerNodeId });

// 创建叶子节点并连接到中心节点
for (let i = 1; i < numNodes; i++) {
  const leafNodeId = \`node\${i}\`;
  nodes.push({ id: leafNodeId });
  links.push({ source: centerNodeId, target: leafNodeId });
}`;

  const displayArea = <ForceGraph2D graphData={networkData} width={600} height={400} />; // 使用networkData

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