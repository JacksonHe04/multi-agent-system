import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import NetworkGraph11 from './pages/1-1/NetworkGraph';
import NetworkGraph12 from './pages/1-2/NetworkGraph';
import NetworkGraph13 from './pages/1-3/NetworkGraph';
import NetworkGraph14 from './pages/1-4/NetworkGraph';
import EpidemicModel from './pages/5-3/index';
import NavigationBar from './components/NavigationBar'; // 引入 NavigationBar 组件

function App() {
  return (
    <>
      <NavigationBar /> {/* 在 Routes 外部渲染导航栏 */}
      <Routes>
        {/* 实验选题1-1到1-4：网络图可视化 */}
        <Route path="/1-1" element={<NetworkGraph11 type="global-coupling" />} />
        <Route path="/1-2" element={<NetworkGraph12 type="nearest-neighbor" />} />
        <Route path="/1-3" element={<NetworkGraph13 type="star" />} />
        <Route path="/1-4" element={<NetworkGraph14 type="random" />} />

        {/* 实验选题5-3: 传染病模型 */}
        <Route path="/5-3" element={<EpidemicModel />} />

        {/* 默认路由，可以指向一个主页或者重定向到某个实验 */}
        <Route path="/" element={<HomePage />} />

      </Routes>
    </>
  )
}

export default App
