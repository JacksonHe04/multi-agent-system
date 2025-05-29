import React from 'react';
import { ForceGraph2D } from 'react-force-graph'; // 假设使用 react-force-graph
import ExperimentLayout from '../../components/ExperimentLayout'; // 引入通用布局组件

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
  // 示例数据，实际应用中会根据 type 生成不同的网络结构
  const data = {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }],
    links: [
      { source: 'node1', target: 'node2' },
      { source: 'node2', target: 'node3' },
    ],
  };

  const title = `实验1-4: ${type} 网络图`;
  const introduction = (
    <p>这里是关于 ${type} 网络图的介绍。它展示了节点和它们之间的连接关系。</p>
  );
  const codeSnippet = `// 核心代码示例
import { ForceGraph2D } from 'react-force-graph';

const data = {
  nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }],
  links: [
    { source: 'node1', target: 'node2' },
    { source: 'node2', target: 'node3' },
  ],
};

return <ForceGraph2D graphData={data} />;`;

  const displayArea = <ForceGraph2D graphData={data} />;

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