/**
 * Performance monitoring utilities
 */

export interface PerformanceTracker {
  start(label: string): void;
  end(label: string): number;
  getMetrics(): Record<string, number>;
}

export class DefaultPerformanceTracker implements PerformanceTracker {
  private timers = new Map<string, number>();
  private metrics = new Map<string, number>();

  start(label: string): void {
    this.timers.set(label, performance.now());
  }

  end(label: string): number {
    const start = this.timers.get(label);
    if (!start) {
      throw new Error(`No timer found for label: ${label}`);
    }

    const duration = performance.now() - start;
    this.metrics.set(label, duration);
    this.timers.delete(label);
    
    return duration;
  }

  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }
}

export const defaultPerformanceTracker = new DefaultPerformanceTracker();