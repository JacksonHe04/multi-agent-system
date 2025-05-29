import React from 'react';
import reactLogo from '/src/assets/react.svg'
import viteLogo from '/vite.svg'

/**
 * @function HomePage
 * @description 应用程序的主页组件，用于展示多智能体系统可视化的欢迎信息。
 * @returns {JSX.Element} 渲染主页内容。
 */
const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center">
      <div className="flex items-center space-x-4 mb-8">
        <img src={viteLogo} className="logo vite" alt="Vite Logo" />
        <img src={reactLogo} className="logo react" alt="React Logo" />
      </div>
      <h1 className="text-4xl font-bold mb-4">多智能体系统实验 Web 展示</h1>
      <p className="text-lg">58122307 何锦诚</p>
    </div>
  );
};

export default HomePage;