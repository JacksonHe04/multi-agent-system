import React, { useState, useEffect, useCallback } from "react";
import type { NetworkData } from "../../types/network";
import { generateNearestNeighborNetwork } from "./networkGenerators";
import {
  calculateAveragePathLength,
  calculateClusteringCoefficient,
} from "../../utils/networkAlgorithms";
import ExperimentLayout from "../../components/ExperimentLayout";
import { codeSnippet, introduction } from "./config";
import { 
  ParameterInput, 
  NetworkMetrics, 
  NetworkGraphDisplay 
} from "../../components/NetworkComponents";

// 网络类型定义
type NetworkType = "global-coupling" | "nearest-neighbor" | "star" | "random";

// 组件属性接口
interface NetworkGraphProps {
  type: NetworkType;
}

// 网络参数接口
interface NearestNeighborParams {
  numNodes: number;
  k: number;
}

// 默认参数
const DEFAULT_PARAMS: NearestNeighborParams = {
  numNodes: 10,
  k: 4
};

// 参数配置
const PARAM_CONFIG = [
  {
    id: "numNodes" as const,
    label: "节点数量",
    min: 2,
    max: 100
  },
  {
    id: "k" as const,
    label: "最近邻连接数",
    min: 2,
    max: 20,
    step: 2
  }
];

/**
 * 网络图组件
 * 根据传入的类型展示不同的网络图。
 * @param {NetworkGraphProps} props - 组件的属性
 * @returns {JSX.Element}
 */
const NetworkGraph: React.FC<NetworkGraphProps> = ({ type }) => {
  const [networkData, setNetworkData] = useState<NetworkData | null>(null);
  const [params, setParams] = useState<NearestNeighborParams>(DEFAULT_PARAMS);
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
    const { numNodes, k } = params;
    const data = generateNearestNeighborNetwork(numNodes, k);
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
      title={`实验1-2: 最近邻耦合网络 (N=${params.numNodes}, K=${params.k})`}
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
