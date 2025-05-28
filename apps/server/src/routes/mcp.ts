import { Router } from 'express';

export function mcpRoutes(governorService: any, taskManager: any) {
  const router = Router();

  router.get('/tools', (req, res) => {
    res.json({
      tools: [],
      message: 'MCP tools discovery - implementation pending'
    });
  });

  router.post('/execute', (req, res) => {
    res.json({
      executionId: 'mock-execution-id',
      message: 'MCP tool execution - implementation pending'
    });
  });

  return router;
}