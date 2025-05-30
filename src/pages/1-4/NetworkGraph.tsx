import React, { useState, useEffect, useCallback } from "react";
import type { NetworkData } from "../../types/network";
import {
  calculateAveragePathLength,
  calculateClusteringCoefficient,
} from "../../utils/networkAlgorithms";
import { generateRandomNetwork } from "./networkGenerators";
import ExperimentLayout from "../../components/ExperimentLayout";
import { codeSnippet, introduction } from "./config";
import { 
  ParameterInput, 
  NetworkMetrics, 
  NetworkGraphDisplay 
} from "../../components/NetworkComponents";

// 类型定义
interface NetworkGraphProps {
  type: "random";
}

interface RandomNetworkParams {
  numNodes: number;
  probability: number;
}

// 默认参数
const DEFAULT_PARAMS: RandomNetworkParams = {
  numNodes: 50,
  probability: 0.1
};

// 参数配置
const PARAM_CONFIG: {
  id: keyof RandomNetworkParams;
  label: string;
  min: number;
  max: number;
  step?: number;
}[] = [
  {
    id: "numNodes",
    label: "节点数量",
    min: 2,
    max: 100
  },
  {
    id: "probability",
    label: "连接概率",
    min: 0,
    max: 1,
    step: 0.01
  }
];

/**
 * @function NetworkGraph
 * @description 实验1-4的入口组件，负责集成随机网络生成、计算和可视化。
 * @param {NetworkGraphProps} props - 组件属性。
 * @returns {JSX.Element} 渲染的网络图组件。
 */
const NetworkGraph: React.FC<NetworkGraphProps> = ({ type }) => {
  const [networkData, setNetworkData] = useState<NetworkData | null>(null);
  const [params, setParams] = useState<RandomNetworkParams>(DEFAULT_PARAMS);
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
    if (type === "random") {
      const data = generateRandomNetwork(params.numNodes, params.probability);
      setNetworkData(data);
      
      const avgPath = calculateAveragePathLength(data);
      const clusteringCoeff = calculateClusteringCoefficient(data);
      
      setMetrics({
        averagePathLength: avgPath,
        clusteringCoefficient: clusteringCoeff
      });
    }
  }, [type, params]);

  return (
    <ExperimentLayout
      title="实验1-4: 随机网络"
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
