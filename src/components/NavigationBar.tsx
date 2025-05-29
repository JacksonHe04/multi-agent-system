import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * @function NavigationBar
 * @description 这是一个可复用的导航栏组件，用于展示多智能体系统实验的各个页面链接。
 *              它接收一个标题属性，并根据预定义的路由生成导航链接。
 * @param {NavigationBarProps} { title } - 导航栏组件的属性。
 * @returns {JSX.Element} 渲染的导航栏组件。
 */
const NavigationBar: React.FC = () => {
  const location = useLocation();
  const navLinks = [
    { path: '/', name: '主页' },
    { path: '/1-1', name: '实验1-1: 全局耦合网络' },
    { path: '/1-2', name: '实验1-2: 最近邻耦合网络' },
    { path: '/1-3', name: '实验1-3: 星形网络' },
    { path: '/1-4', name: '实验1-4: 随机网络' },
    { path: '/5-3', name: '实验5-3: 传染病模型' },
  ];

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-center items-center">
        
        <ul className="flex space-x-4">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`
                  text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                  ${location.pathname === link.path ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'}
                `}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;