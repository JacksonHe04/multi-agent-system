import React from 'react';

interface ExperimentLayoutProps {
  title: string;
  introduction: string;
  codeSnippet: string;
  displayArea: React.ReactNode;
  /**
   * @property {React.ReactNode} inputParametersArea - 用于输入参数的区域，内容由父组件提供。
   */
  inputParametersArea?: React.ReactNode;
  /**
   * @property {React.ReactNode} metricsArea - 用于展示网络指标的区域。
   */
  metricsArea?: React.ReactNode;
}

/**
 * 通用实验布局组件
 * 负责渲染所有实验页面的通用结构，包括标题、介绍、核心代码和展示区域。
 * @param {ExperimentLayoutProps} props - 组件的属性
 * @param {string} props.title - 页面标题
 * @param {string} props.introduction - 实验介绍文本
 * @param {string} props.codeSnippet - 核心代码片段字符串
 * @param {React.ReactNode} props.displayArea - 实验的核心展示内容（如网络图、模拟器）
 * @param {React.ReactNode} [props.inputParametersArea] - 用于输入参数的区域，内容由父组件提供。
 * @returns {JSX.Element}
 */
const ExperimentLayout: React.FC<ExperimentLayoutProps> = ({
  title,
  introduction,
  codeSnippet,
  displayArea,
  inputParametersArea,
  metricsArea, // 解构新增属性
}) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">{title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">介绍</h2>
            <div className="bg-gray-100 p-4 rounded-md">{introduction}</div>
          </div>

          {inputParametersArea && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">参数设置</h2>
              <div className="bg-white p-4 rounded-md shadow-md">{inputParametersArea}</div>
            </div>
          )}

          {metricsArea && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">计算结果</h2>
              <div className="bg-white p-4 rounded-md shadow-md">{metricsArea}</div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">核心代码</h2>
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-auto">
              <code>{codeSnippet}</code>
            </pre>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">展示区域</h2>
            <div className="bg-white p-4 rounded-md shadow-md">{displayArea}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperimentLayout;