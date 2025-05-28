/**
 * Advanced MCP Client Core
 * 
 * Revolutionary Model Context Protocol Client with Intelligent Orchestration
 * and Massively Parallel Execution
 */

// Main client class
export { AdvancedMCPClient } from './client';

// Core components
export type { Governor, GovernorStatus } from './governor';
export { DefaultGovernor } from './governor';

export type { ParallelExecutor, ExecutionTask, ExecutionResult } from './executor';
export { DefaultParallelExecutor } from './executor';

export type { TaskScheduler, ScheduledTask, SchedulerStatus } from './scheduler';
export { DefaultTaskScheduler } from './scheduler';

// Types
export type * from './types';

// Utilities
export type { Logger } from './utils/logger';
export { ConsoleLogger, defaultLogger } from './utils/logger';
export type { PerformanceTracker } from './utils/performance';
export { DefaultPerformanceTracker, defaultPerformanceTracker } from './utils/performance';
export type { ContextManager } from './utils/context';
export { DefaultContextManager, defaultContextManager } from './utils/context';

// Version info
export const VERSION = '0.1.0';
export const BUILD = 'alpha';