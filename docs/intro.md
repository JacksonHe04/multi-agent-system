# 2025年《多智能体系统》实验报告

## 学生信息
- 姓名：何锦诚
- 学号：58122307
- 指导教师：王爽

## 实验环境
- 编程语言：TypeScript + React  
- 开发工具：
  - IDE：VSCode
  - 版本控制：Git
  - 部署：Vercel

## 实验项目说明
本项目是一个多智能体系统的实验项目，包含以下5个实验：

1. 1.1 - 实现全局耦合网络，展示网络图，并计算平均路径长度和聚类系数。
2. 1.2 - 实现最近邻耦合网络，展示网络图，并计算平均路径长度和聚类系数。
3. 1.3 - 实现星形网络，展示网络图，并计算平均路径长度和聚类系数。
4. 1.4 - 实现随机网络，展示网络图，并计算平均路径长度和聚类系数。
5. 5-3 - 实现一种传染病模型，并给出实例演示。

### 实验报告访问
本实验报告提供三种访问方式：

1. **当前文档**
   
   实验报告已包含在当前文档中，可以直接查看

2. **GitHub仓库**
   
   通过GitHub查看实验报告：
   - [实验一报告](https://github.com/JacksonHe04/multi-agent-system/tree/main/docs/experiment1.md)
   - [实验二报告](https://github.com/JacksonHe04/multi-agent-system/tree/main/docs/experiment2.md)
   - [实验三报告](https://github.com/JacksonHe04/multi-agent-system/tree/main/docs/experiment3.md)
   - [实验四报告](https://github.com/JacksonHe04/multi-agent-system/tree/main/docs/experiment4.md)
   - [实验五报告](https://github.com/JacksonHe04/multi-agent-system/tree/main/docs/experiment5.md)

3. **Notion平台**
   - 所有实验报告已通过Notion平台开源，可以通过以下链接访问：
   - Notion实验报告：[https://jacksonhe.notion.site/mas-labs](https://jacksonhe.notion.site/mas-labs)
   - 在Notion平台上查看可以获得更好的阅读体验和渲染效果

### 项目访问方式
本项目已开源并部署，可以通过以下两种方式访问：

1. **在线访问**（推荐）
   - 项目已通过 Vercel 部署，可以直接访问在线演示：
   - 网址：[https://multi-agent-system-sigma.vercel.app](https://multi-agent-system-sigma.vercel.app)
   - 无需安装任何环境，直接打开浏览器即可访问
   - 服务器在海外，请进行网络代理

2. **本地运行**
   - 源代码已开源至 GitHub：
      - 仓库地址：[https://github.com/JacksonHe04/multi-agent-system](https://github.com/JacksonHe04/multi-agent-system)
   - 如需在本地运行：
      - 无需克隆，因为我已经上传了完整的代码压缩包
      - 请按照下方"如何运行"部分的步骤操作

## 项目结构
```
multi-agent-system/
├── docs/                    # 文档目录
│   ├── intro.md            # 实验报告介绍
│   ├── experiment1.md      # 实验一报告
│   ├── experiment2.md      # 实验二报告
│   ├── experiment3.md      # 实验三报告
│   ├── experiment4.md      # 实验四报告
│   └── experiment5.md      # 实验五报告
├── src/                    # 源代码目录
│   ├── pages/              # 页面目录（包含）
│   │   ├── 1-1             # 实验 1.1
│   │   ├── 1-2             # 实验 1.2
│   │   ├── 1-3             # 实验 1.3
│   │   ├── 1-4             # 实验 1.4
│   │   ├── 5-3             # 实验 5-3
│   ├── components/         # 通用组件目录
│   ├── utils/              # 工具文件目录
│   ├── types               # 类型定义目录
│   ├── App.tsx             # 应用入口文件
│   ├── index.tsx           # 入口文件
│   ├── main.tsx            # 主入口文件
└── README.md              # 项目说明文件
```

## 如何运行
如果您想在本地运行项目，请按照以下步骤操作：

1. 克隆项目（这一步可以省略，因为我已经上传了完整的代码压缩包）
```bash
git clone https://github.com/JacksonHe04/multi-agent-system.git
cd multi-agent-system
```

2. 安装依赖
```bash
npm install
```

3. 运行项目
```bash
npm dev
```

## 注意事项
- 所有实验代码和报告都使用Git进行版本控制
- 实验报告使用Markdown格式编写

## 联系方式
如有问题，请联系：
- 邮箱：213222749@seu.edu.cn
- QQ：2466145536