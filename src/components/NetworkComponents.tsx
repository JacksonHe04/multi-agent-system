import React from 'react';
import { ForceGraph2D } from 'react-force-graph';
import type { NetworkData } from '../types/network';

// 通用参数输入组件
export interface ParameterInputProps<T> {
  params: T;
  onParamChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  paramConfig: Array<{
    id: keyof T;
    label: string;
    min: number;
    max: number;
    step?: number;
    unit?: string;
    description?: string;
  }>;
}

export const ParameterInput = <T extends { [K in keyof T]: number }>({ 
  params, 
  onParamChange,
  paramConfig 
}: ParameterInputProps<T>) => (
  <div className="space-y-6 p-4 bg-white rounded-lg shadow-sm">
    {paramConfig.map(({ id, label, min, max, step, unit, description }) => (
      <div key={String(id)} className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor={String(id)} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <span className="text-xs text-gray-500">
            {min} - {max}{unit ? ` ${unit}` : ''}
          </span>
        </div>
        {description && (
          <p className="text-xs text-gray-500 mb-1">{description}</p>
        )}
        <div className="flex items-center space-x-2">
          <input
            type="range"
            id={`${String(id)}-range`}
            name={String(id)}
            value={params[id]}
            onChange={onParamChange}
            min={min}
            max={max}
            step={step || 1}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="relative w-24">
            <input
              type="number"
              id={String(id)}
              name={String(id)}
              value={params[id]}
              onChange={onParamChange}
              min={min}
              max={max}
              step={step || 1}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pr-8"
            />
            {unit && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                {unit}
              </span>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
);

// 通用网络指标显示组件
export interface NetworkMetricsProps {
  metrics: {
    averagePathLength: number | null;
    clusteringCoefficient: number | null;
  };
}

export const NetworkMetrics: React.FC<NetworkMetricsProps> = ({ metrics }) => (
  <ul className="space-y-2">
    <li>
      <b>平均路径长度：</b>{" "}
      {metrics.averagePathLength !== null
        ? metrics.averagePathLength.toFixed(4)
        : "计算中..."}
    </li>
    <li>
      <b>聚类系数：</b>{" "}
      {metrics.clusteringCoefficient !== null
        ? metrics.clusteringCoefficient.toFixed(4)
        : "计算中..."}
    </li>
  </ul>
);

// 通用 ForceGraph2D 配置
export const defaultForceGraphConfig = {
  nodeLabel: "id",
  linkDirectionalArrowLength: 3,
  linkDirectionalArrowRelPos: 1,
  linkCurvature: 0.1,
  nodeAutoColorBy: "id",
  width: 600,
  height: 600,
};

// 通用网络图组件
export interface NetworkGraphDisplayProps {
  networkData: NetworkData | null;
}

export const NetworkGraphDisplay: React.FC<NetworkGraphDisplayProps> = ({ networkData }) => {
  if (!networkData) {
    return <div>加载网络数据...</div>;
  }

  return (
    <ForceGraph2D
      graphData={networkData}
      {...defaultForceGraphConfig}
    />
  );
}; 