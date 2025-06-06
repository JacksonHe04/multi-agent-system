import React, { useState, useEffect, useCallback } from 'react';
import type { Network, SIRParameters } from './types';
import { generateRandomNetwork, updateNetworkState } from './calculations';
import ExperimentLayout from '../../components/ExperimentLayout';
import { ParameterInput, NetworkGraphDisplay } from '../../components/NetworkComponents';
import { introduction, defaultParams, paramConfig } from './config';

// 状态统计组件
const StatusMetrics: React.FC<{ network: Network; simulationTime: number }> = ({ network, simulationTime }) => (
  <div>
    <div className="text-center mb-4">
      <div className="text-blue-500 font-bold">模拟时间</div>
      <div>{simulationTime}</div>
    </div>
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
  const [network, setNetwork] = useState<Network>(() => generateRandomNetwork(params));
  const [isRunning, setIsRunning] = useState(false);
  const [simulationTime, setSimulationTime] = useState(0);

  // 重置模拟
  const resetSimulation = useCallback(() => {
    setNetwork(generateRandomNetwork(params));
    setSimulationTime(0);
    setIsRunning(false);
  }, [params]);

  // 处理参数变化
  const handleParamChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams(prev => {
      const newParams = {
        ...prev,
        [name]: Number(value)
      };
      // 当参数改变时重新生成网络
      setNetwork(generateRandomNetwork(newParams));
      return newParams;
    });
  }, []);

  // 更新网络状态
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setNetwork(prev => updateNetworkState(prev, params));
      setSimulationTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, params]);

  // 节点颜色映射
  const getNodeColor = useCallback((node: { id: string; [key: string]: unknown }) => {
    const state = node.state as 'S' | 'I' | 'R';
    switch (state) {
      case 'S': return '#4CAF50';  // 绿色 - 易感
      case 'I': return '#F44336';  // 红色 - 感染
      case 'R': return '#9E9E9E';  // 灰色 - 恢复
      default: return '#000000';
    }
  }, []);

  // 节点标签
  const getNodeLabel = useCallback((node: { id: string; [key: string]: unknown }) => {
    const state = node.state as 'S' | 'I' | 'R';
    return `节点 ${node.id}: ${state}`;
  }, []);

  return (
    <ExperimentLayout
      title="实验5-3: 传染病模型模拟（SIR）"
      introduction={introduction}
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
      metricsArea={<StatusMetrics network={network} simulationTime={simulationTime} />}
      displayArea={
        <NetworkGraphDisplay
          networkData={{
            nodes: network.nodes.map(node => ({ ...node })),
            links: network.links.map(link => ({ ...link }))
          }}
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
