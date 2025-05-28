import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from './config';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { governorRoutes } from './routes/governor';
import { systemRoutes } from './routes/system';
import { taskRoutes } from './routes/tasks';
import { mcpRoutes } from './routes/mcp';
import { GovernorService } from './services/GovernorService';
import { TaskManager } from './services/TaskManager';
import { WebSocketManager } from './services/WebSocketManager';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Initialize core services
const governorService = new GovernorService();
const taskManager = new TaskManager(governorService);
const wsManager = new WebSocketManager(io, governorService, taskManager);

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));

// General middleware
app.use(compression());
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '0.1.0',
    governor: governorService.getStatus(),
    tasks: taskManager.getStatus()
  });
});

// API Routes
app.use('/api/governor', governorRoutes(governorService));
app.use('/api/system', systemRoutes(taskManager));
app.use('/api/tasks', taskRoutes(taskManager));
app.use('/api/mcp', mcpRoutes(governorService, taskManager));

// WebSocket connection handling
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);
  wsManager.handleConnection(socket);
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  
  server.close(() => {
    logger.info('HTTP server closed');
    taskManager.shutdown();
    governorService.shutdown();
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully...');
  
  server.close(() => {
    logger.info('HTTP server closed');
    taskManager.shutdown();
    governorService.shutdown();
    process.exit(0);
  });
});

const PORT = config.port;

server.listen(PORT, () => {
  logger.info(`🚀 Advanced MCP Server running on port ${PORT}`);
  logger.info(`🧠 Governor Service initialized`);
  logger.info(`⚡ Task Manager ready for parallel execution`);
  logger.info(`🔌 WebSocket connections enabled`);
  logger.info(`📊 Health endpoint: http://localhost:${PORT}/health`);
  
  // Initialize Governor with startup context
  governorService.initialize({
    environment: process.env.NODE_ENV || 'development',
    capabilities: ['parallel-execution', 'intelligent-orchestration', 'real-time-monitoring'],
    maxConcurrentTasks: config.maxConcurrentTasks,
    optimizationMode: 'balanced'
  });
});

export { app, server, io };