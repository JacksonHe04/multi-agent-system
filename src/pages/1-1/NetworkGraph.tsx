import React, { useState, useEffect, useCallback } from "react";
import type { NetworkData } from "../../types/network";
import {
  calculateAveragePathLength,
  calculateClusteringCoefficient,
} from "../../utils/networkAlgorithms";
import { generateGlobalCouplingNetwork } from "./globalCouplingNetwork";
import ExperimentLayout from "../../components/ExperimentLayout";
import { codeSnippet, introduction } from "./config";
import { 
  ParameterInput, 
  NetworkMetrics, 
  NetworkGraphDisplay 
} from "../../components/NetworkComponents";

// 类型定义
interface NetworkGraphProps {
  type: "global-coupling";
}

interface GlobalCouplingNetworkParams {
  numNodes: number;
}

// 默认参数
const DEFAULT_PARAMS: GlobalCouplingNetworkParams = {
  numNodes: 50
};

// 参数配置
const PARAM_CONFIG = [
  {
    id: "numNodes",
    label: "节点数量",
    min: 2,
    max: 100
  }
];

/**
 * @function NetworkGraph
 * @description 实验1-1的入口组件，负责集成网络生成、计算和可视化。
 * @param {NetworkGraphProps} props - 组件属性。
 * @returns {JSX.Element} 渲染的网络图组件。
 */
const NetworkGraph: React.FC<NetworkGraphProps> = ({ type }) => {
  const [networkData, setNetworkData] = useState<NetworkData | null>(null);
  const [params, setParams] = useState<GlobalCouplingNetworkParams>(DEFAULT_PARAMS);
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
    if (type === "global-coupling") {
      const data = generateGlobalCouplingNetwork(params);
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
      title="实验1-1：全局耦合网络"
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
