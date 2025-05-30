import React, { useState, useEffect, useCallback } from 'react';
import type { Network, SIRParameters, TimeSeriesData, Node } from './types';
import { generateRandomNetwork, updateNetworkState, calculateTimeSeriesData } from './calculations';
import ExperimentLayout from '../../components/ExperimentLayout';
import { ParameterInput, NetworkGraphDisplay } from '../../components/NetworkComponents';
import { introduction, codeSnippet, defaultParams, paramConfig } from './config';

// 状态统计组件
const StatusMetrics: React.FC<{ network: Network }> = ({ network }) => (
  <div className="grid grid-cols-3 gap-4">
    <div className="text-center">
      <div className="text-green-500 font-bold">易感者</div>
      <div>{network.nodes.filter(n => n.state === 'S').length}</div>
    </div>
    <div className="text-center">
      <div className="text-red-500 font-bold">感染者</div>
      <div>{network.nodes.filter(n => n.state === 'I').length}</div>
    </div>
    <div className="text-center">
      <div className="text-gray-500 font-bold">恢复者</div>
      <div>{network.nodes.filter(n => n.state === 'R').length}</div>
    </div>
  </div>
);

// 控制按钮组件
const ControlButtons: React.FC<{
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
}> = ({ isRunning, onToggle, onReset }) => (
  <div className="flex gap-2 mt-4">
    <button
      onClick={onToggle}
      className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
    >
      {isRunning ? '暂停' : '开始'}
    </button>
    <button
      onClick={onReset}
      className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
    >
      重置
    </button>
  </div>
);

// 主组件
const EpidemicModel: React.FC = () => {
  // 状态管理
  const [params, setParams] = useState<SIRParameters>(defaultParams);
  const [network, setNetwork] = useState<Network>(generateRandomNetwork(defaultParams));
  const [timeSeries, setTimeSeries] = useState<TimeSeriesData[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [simulationTime, setSimulationTime] = useState(0);

  // 更新网络状态
  const updateSimulation = useCallback(() => {
    if (!isRunning) return;

    setNetwork(prevNetwork => {
      const newNetwork = updateNetworkState(prevNetwork, params);
      const newTimeSeries = calculateTimeSeriesData(newNetwork, simulationTime);
      setTimeSeries(prev => [...prev, newTimeSeries]);
      setSimulationTime(prev => prev + 1);
      return newNetwork;
    });
  }, [isRunning, params, simulationTime]);

  // 重置模拟
  const resetSimulation = useCallback(() => {
    setNetwork(generateRandomNetwork(params));
    setTimeSeries([]);
    setSimulationTime(0);
  }, [params]);

  // 更新参数
  const handleParamChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: parseFloat(value) }));
  }, []);

  // 自动更新
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(updateSimulation, 1000);
    return () => clearInterval(interval);
  }, [isRunning, updateSimulation]);

  // 节点颜色映射
  const getNodeColor = useCallback((node: Node) => {
    switch (node.state) {
      case 'S': return '#4CAF50';  // 绿色 - 易感
      case 'I': return '#F44336';  // 红色 - 感染
      case 'R': return '#9E9E9E';  // 灰色 - 恢复
      default: return '#000000';
    }
  }, []);

  // 节点标签
  const getNodeLabel = useCallback((node: Node) => `节点 ${node.id}: ${node.state}`, []);

  return (
    <ExperimentLayout
      title="实验5-3: 传染病模型模拟（SIR）"
      introduction={introduction}
      codeSnippet={codeSnippet}
      inputParametersArea={
        <>
          <ParameterInput
            params={params}
            onParamChange={handleParamChange}
            paramConfig={paramConfig}
          />
          <ControlButtons
            isRunning={isRunning}
            onToggle={() => setIsRunning(!isRunning)}
            onReset={resetSimulation}
          />
        </>
      }
      metricsArea={<StatusMetrics network={network} />}
      displayArea={
        <NetworkGraphDisplay
          networkData={network}
          nodeColor={getNodeColor}
          nodeLabel={getNodeLabel}
          width={600}
          height={600}
        />
      }
    />
  );
};

export default EpidemicModel;
