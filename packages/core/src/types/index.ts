/**
 * Core type definitions for the Advanced MCP Client
 */

export interface MCPTask {
  id: string;
  type: 'tool_call' | 'llm_request' | 'file_operation' | 'network_request' | 'computation';
  name: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dependencies: string[];
  estimatedDuration?: number;
  timeout?: number;
  retryConfig?: RetryConfig;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  result?: unknown;
  error?: TaskError;
}

export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';
export type TaskStatus = 'pending' | 'queued' | 'running' | 'completed' | 'failed' | 'cancelled' | 'retrying';

export interface TaskError {
  code: string;
  message: string;
  stack?: string;
  retryable: boolean;
  timestamp: Date;
}

export interface RetryConfig {
  maxAttempts: number;
  backoffStrategy: 'exponential' | 'linear' | 'fixed';
  baseDelay: number;
  maxDelay: number;
  jitter: boolean;
}

export interface GovernorState {
  mode: 'active' | 'passive' | 'maintenance';
  currentGoal?: string;
  strategy: OptimizationStrategy;
  performance: PerformanceMetrics;
  decisions: GovernorDecision[];
  context: ConversationContext;
}

export interface OptimizationStrategy {
  name: string;
  focus: 'speed' | 'accuracy' | 'resource-efficiency' | 'balanced';
  parameters: Record<string, unknown>;
}

export interface PerformanceMetrics {
  tasksCompleted: number;
  averageExecutionTime: number;
  successRate: number;
  resourceUtilization: ResourceUtilization;
  optimizationImpact: number;
  lastUpdated: Date;
}

export interface ResourceUtilization {
  cpu: number;
  memory: number;
  network: number;
  activeThreads: number;
  queuedTasks: number;
}

export interface GovernorDecision {
  id: string;
  timestamp: Date;
  type: 'prioritization' | 'resource_allocation' | 'strategy_adjustment' | 'error_recovery';
  rationale: string;
  impact: 'high' | 'medium' | 'low';
  outcome?: 'successful' | 'failed' | 'partial';
}

export interface ConversationContext {
  goal: string;
  userIntent: string;
  constraints: string[];
  preferences: UserPreferences;
  environment: EnvironmentContext;
}

export interface UserPreferences {
  prioritizeSpeed: boolean;
  allowParallelExecution: boolean;
  maxConcurrentTasks: number;
  timeoutThreshold: number;
  verboseLogging: boolean;
}

export interface EnvironmentContext {
  systemLoad: number;
  networkLatency: number;
  availableMemory: number;
  diskSpace: number;
  activeConnections: number;
}

export interface ExecutionPlan {
  id: string;
  tasks: MCPTask[];
  executionOrder: ExecutionNode[];
  estimatedCompletion: number;
  parallelPaths: number;
  criticalPath: string[];
  resourceRequirements: ResourceRequirements;
}

export interface ExecutionNode {
  taskId: string;
  level: number;
  canExecuteInParallel: string[];
  mustWaitFor: string[];
}

export interface ResourceRequirements {
  minThreads: number;
  maxThreads: number;
  memoryMB: number;
  networkBandwidth?: number;
  diskIO?: number;
}

export interface ThreadPoolConfig {
  minSize: number;
  maxSize: number;
  keepAliveTime: number;
  queueCapacity: number;
  rejectionPolicy: 'abort' | 'caller-runs' | 'discard' | 'discard-oldest';
}

export interface MCPTool {
  name: string;
  description: string;
  inputSchema: unknown;
  outputSchema: unknown;
  handler: ToolHandler;
  metadata?: ToolMetadata;
}

export interface ToolMetadata {
  category: string;
  estimatedDuration: number;
  resourceIntensive: boolean;
  cacheable: boolean;
  parallelSafe: boolean;
}

export type ToolHandler = (input: unknown, context: ToolContext) => Promise<unknown>;

export interface ToolContext {
  taskId: string;
  userId?: string;
  sessionId?: string;
  timeout: number;
  abortSignal: AbortSignal;
  logger: Logger;
}

export interface Logger {
  debug(message: string, meta?: object): void;
  info(message: string, meta?: object): void;
  warn(message: string, meta?: object): void;
  error(message: string, meta?: object): void;
}

export interface MCPClientConfig {
  governor: GovernorConfig;
  executor: ExecutorConfig;
  scheduler: SchedulerConfig;
  logging: LoggingConfig;
}

export interface GovernorConfig {
  enabled: boolean;
  optimizationInterval: number;
  decisionHistoryLimit: number;
  adaptiveStrategy: boolean;
}

export interface ExecutorConfig {
  threadPool: ThreadPoolConfig;
  defaultTimeout: number;
  retryDefaults: RetryConfig;
  parallelismThreshold: number;
}

export interface SchedulerConfig {
  maxQueueSize: number;
  priorityLevels: number;
  batchProcessing: boolean;
  dynamicPrioritization: boolean;
}

export interface LoggingConfig {
  level: 'debug' | 'info' | 'warn' | 'error';
  format: 'json' | 'text';
  destinations: string[];
}

// Event types for the event-driven architecture
export interface MCPEvent {
  type: string;
  timestamp: Date;
  source: string;
  data: unknown;
}

export interface TaskEvent extends MCPEvent {
  type: 'task_created' | 'task_started' | 'task_completed' | 'task_failed' | 'task_cancelled';
  data: {
    taskId: string;
    task: MCPTask;
    result?: unknown;
    error?: TaskError;
  };
}

export interface GovernorEvent extends MCPEvent {
  type: 'decision_made' | 'strategy_changed' | 'optimization_applied' | 'performance_updated';
  data: {
    decision?: GovernorDecision;
    strategy?: OptimizationStrategy;
    metrics?: PerformanceMetrics;
  };
}

export interface SystemEvent extends MCPEvent {
  type: 'resource_threshold' | 'performance_alert' | 'health_check' | 'shutdown_initiated';
  data: {
    metrics?: ResourceUtilization;
    threshold?: number;
    alert?: string;
  };
}