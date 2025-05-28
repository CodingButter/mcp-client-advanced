import { Router } from 'express';

export function systemRoutes(taskManager: any) {
  const router = Router();

  router.get('/status', (req, res) => {
    res.json({
      status: 'healthy',
      message: 'System routes - implementation pending'
    });
  });

  router.get('/threads', (req, res) => {
    res.json({
      threads: 'Thread info - implementation pending'
    });
  });

  router.get('/performance', (req, res) => {
    res.json({
      performance: 'Performance metrics - implementation pending'
    });
  });

  return router;
}