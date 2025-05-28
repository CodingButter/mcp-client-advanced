/**
 * Context management utilities for shared state
 */

export interface ContextManager {
  set(key: string, value: any): void;
  get(key: string): any;
  has(key: string): boolean;
  delete(key: string): boolean;
  clear(): void;
  getAll(): Record<string, any>;
}

export class DefaultContextManager implements ContextManager {
  private context = new Map<string, any>();

  set(key: string, value: any): void {
    this.context.set(key, value);
  }

  get(key: string): any {
    return this.context.get(key);
  }

  has(key: string): boolean {
    return this.context.has(key);
  }

  delete(key: string): boolean {
    return this.context.delete(key);
  }

  clear(): void {
    this.context.clear();
  }

  getAll(): Record<string, any> {
    return Object.fromEntries(this.context);
  }
}

export const defaultContextManager = new DefaultContextManager();