export interface Node {
  id: string;
  state: 'S' | 'I' | 'R';  // Susceptible, Infected, Recovered
  x?: number;
  y?: number;
}

export interface Link {
  source: string;
  target: string;
}

export interface Network {
  nodes: Node[];
  links: Link[];
}

export interface SIRParameters {
  beta: number;    // 传播率
  gamma: number;   // 恢复率
  initialInfected: number;  // 初始感染人数
  totalNodes: number;      // 总节点数
  connectionProbability: number;  // 连接概率
}

export interface TimeSeriesData {
  time: number;
  susceptible: number;
  infected: number;
  recovered: number;
} 