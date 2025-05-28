/**
 * Advanced MCP Client - Main Client Class
 * 
 * The primary interface for the revolutionary MCP client that combines
 * intelligent governance, parallel execution, and advanced scheduling.
 */

import { DefaultGovernor, type Governor } from './governor';
import { DefaultParallelExecutor, type ParallelExecutor } from './executor';
import { DefaultTaskScheduler, type TaskScheduler } from './scheduler';
import type { MCPClientConfig } from './types';

export class AdvancedMCPClient {
  private governor: Governor;
  private executor: ParallelExecutor;
  private scheduler: TaskScheduler;
  private isInitialized = false;

  constructor(config?: Partial<MCPClientConfig>) {
    this.governor = new DefaultGovernor();
    this.executor = new DefaultParallelExecutor();
    this.scheduler = new DefaultTaskScheduler();
  }

  async initialize(config?: Partial<MCPClientConfig>): Promise<void> {
    if (this.isInitialized) {
      throw new Error('Client is already initialized');
    }

    console.log('🚀 Initializing Advanced MCP Client...');

    // Initialize components with default configs
    await this.governor.initialize({
      optimizationInterval: 30000,
      adaptiveStrategy: true,
      decisionHistoryLimit: 100
    });

    await this.executor.initialize({
      maxConcurrentTasks: 16,
      defaultTimeout: 30000,
      parallelismThreshold: 2
    });

    await this.scheduler.initialize({
      maxQueueSize: 1000,
      priorityLevels: 4,
      batchProcessing: true,
      dynamicPrioritization: true
    });

    this.isInitialized = true;
    console.log('✅ Advanced MCP Client initialized successfully');
  }

  async shutdown(): Promise<void> {
    if (!this.isInitialized) {
      return;
    }

    console.log('🔄 Shutting down Advanced MCP Client...');

    await this.scheduler.shutdown();
    await this.executor.shutdown();
    await this.governor.shutdown();

    this.isInitialized = false;
    console.log('✅ Advanced MCP Client shutdown complete');
  }

  getGovernor(): Governor {
    return this.governor;
  }

  getExecutor(): ParallelExecutor {
    return this.executor;
  }

  getScheduler(): TaskScheduler {
    return this.scheduler;
  }

  isReady(): boolean {
    return this.isInitialized;
  }
}