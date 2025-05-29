import React, { useState, useEffect, useCallback } from 'react';
import type { NetworkData } from '../../types/network';
import { generateStarNetwork } from './networkGenerators';
import { calculateAveragePathLength, calculateClusteringCoefficient } from '../../utils/networkAlgorithms';
import ExperimentLayout from '../../components/ExperimentLayout';
import { 
  ParameterInput, 
  NetworkMetrics, 
  NetworkGraphDisplay 
} from '../../components/NetworkComponents';
import { codeSnippet, introduction } from './config';

interface NetworkGraphProps {
  type: 'star';
}

interface StarNetworkParams {
  numNodes: number;
}

// 默认参数
const DEFAULT_PARAMS: StarNetworkParams = {
  numNodes: 10
};

// 参数配置
const PARAM_CONFIG = [
  {
    id: "numNodes" as const,
    label: "节点数量",
    min: 2,
    max: 50
  }
];

/**
 * 网络图组件
 * 根据传入的类型展示不同的网络图。
 * @param {NetworkGraphProps} props - 组件的属性
 * @returns {JSX.Element}
 */
const NetworkGraph: React.FC<NetworkGraphProps> = () => {
  const [networkData, setNetworkData] = useState<NetworkData | null>(null);
  const [params, setParams] = useState<StarNetworkParams>(DEFAULT_PARAMS);
  const [metrics, setMetrics] = useState({
    averagePathLength: null as number | null,
    clusteringCoefficient: null as number | null
  });

  // 处理参数变化
  const handleParamChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  }, []);

  // 更新网络数据和指标
  useEffect(() => {
    const { numNodes } = params;
    const data = generateStarNetwork(numNodes);
    setNetworkData(data);
    
    const avgPath = calculateAveragePathLength(data);
    const clusteringCoeff = calculateClusteringCoefficient(data);
    
    setMetrics({
      averagePathLength: avgPath,
      clusteringCoefficient: clusteringCoeff
    });
  }, [params]);

  return (
    <ExperimentLayout
      title={`实验1-3: 星形网络 (N=${params.numNodes})`}
      introduction={introduction}
      codeSnippet={codeSnippet}
      inputParametersArea={
        <ParameterInput 
          params={params} 
          onParamChange={handleParamChange}
          paramConfig={PARAM_CONFIG}
        />
      }
      metricsArea={<NetworkMetrics metrics={metrics} />}
      displayArea={<NetworkGraphDisplay networkData={networkData} />}
    />
  );
};

export default NetworkGraph;