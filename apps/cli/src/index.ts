#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { createSpinner } from 'ora';
import boxen from 'boxen';
import packageJson from '../package.json';
import { GovernorCommands } from './commands/governor';
import { SystemCommands } from './commands/system';
import { TaskCommands } from './commands/tasks';
import { ConfigCommands } from './commands/config';

const program = new Command();

// ASCII Art Banner
const banner = chalk.cyan(`
   _____ _            _____ _______ _____     _____ _ _            _   
  |  __ \\ |          |  __ \\__   __|  __ \\   / ____| (_)          | |  
  | |__) | |          | |__) | | |  | |  | | | |    | |_  ___ _ __ | |_ 
  |  _  /| |_________ |  ___/  | |  | |  | | | |    | | |/ _ \\ '_ \\| __|
  | | \\ \\| |_______| | |      | |  | |__| | | |____| | |  __/ | | | |_ 
  |_|  \\_\\_|          |_|      |_|  |_____/   \\_____|_|_|\\___|_| |_|\\__|
                                                                       
  ${chalk.bold('Advanced MCP Client')} - ${chalk.green('Warp Speed AI Tool Execution')}
  ${chalk.gray('Intelligent Orchestration • Parallel Processing • Real-time Monitoring')}
`);

console.log(boxen(banner, {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  borderColor: 'cyan'
}));

program
  .name('mcp')
  .description('Advanced MCP Client - Revolutionary parallel tool execution')
  .version(packageJson.version)
  .option('-v, --verbose', 'Enable verbose output')
  .option('--config <path>', 'Path to configuration file')
  .hook('preAction', (thisCommand) => {
    const options = thisCommand.opts();
    if (options.verbose) {
      console.log(chalk.gray(`[DEBUG] Running command: ${thisCommand.name()}`));
    }
  });

// Governor Commands - Central Intelligence
const governorCmd = program
  .command('governor')
  .alias('gov')
  .description('🧠 Central Governor - Intelligent orchestration and decision engine');

governorCmd
  .command('status')
  .description('Show Governor status, decision history, and current strategy')
  .action(GovernorCommands.status);

governorCmd
  .command('context')
  .description('View Governor\'s understanding of current conversation context and goals')
  .action(GovernorCommands.context);

governorCmd
  .command('optimize')
  .description('Trigger Governor optimization analysis and get performance suggestions')
  .action(GovernorCommands.optimize);

// System Commands - Infrastructure
const systemCmd = program
  .command('system')
  .alias('sys')
  .description('📊 System monitoring and control');

systemCmd
  .command('status')
  .description('Comprehensive system state and active task overview')
  .action(SystemCommands.status);

systemCmd
  .command('threads')
  .description('Detailed thread pool status and worker allocation')
  .action(SystemCommands.threads);

systemCmd
  .command('performance')
  .description('Real-time metrics and optimization recommendations')
  .action(SystemCommands.performance);

// Task Commands - Execution Control
const taskCmd = program
  .command('tasks')
  .alias('task')
  .description('🎯 Task management and execution control');

taskCmd
  .command('list')
  .description('List all active and queued tasks')
  .action(TaskCommands.list);

taskCmd
  .command('priority <taskId> <level>')
  .description('Modify task priority (high|medium|low)')
  .action(TaskCommands.setPriority);

taskCmd
  .command('schedule')
  .description('Create, modify, and manage time-based task execution')
  .action(TaskCommands.schedule);

// Configuration Commands
const configCmd = program
  .command('config')
  .description('⚙️ Configuration management');

configCmd
  .command('show')
  .description('Display current configuration')
  .action(ConfigCommands.show);

configCmd
  .command('set <key> <value>')
  .description('Set configuration value')
  .action(ConfigCommands.set);

// Interactive Dashboard Command
program
  .command('dashboard')
  .alias('dash')
  .description('🎨 Launch interactive terminal dashboard')
  .action(async () => {
    const spinner = createSpinner('Loading dashboard...').start();
    
    try {
      // Dynamic import to avoid loading heavy UI dependencies unless needed
      const { startDashboard } = await import('./ui/dashboard');
      spinner.succeed('Dashboard loaded');
      await startDashboard();
    } catch (error) {
      spinner.fail(`Failed to load dashboard: ${error}`);
      process.exit(1);
    }
  });

// Quick execution command
program
  .command('exec <tools...>')
  .description('🚀 Execute MCP tools with parallel processing')
  .option('-p, --parallel', 'Force parallel execution (default: auto-detect)')
  .option('-s, --sequential', 'Force sequential execution')
  .option('--timeout <ms>', 'Execution timeout in milliseconds', '30000')
  .action(async (tools, options) => {
    const spinner = createSpinner(`Executing ${tools.length} tools...`).start();
    
    try {
      const { executeTools } = await import('./core/executor');
      const results = await executeTools(tools, options);
      
      spinner.succeed(`Executed ${tools.length} tools successfully`);
      console.log(JSON.stringify(results, null, 2));
    } catch (error) {
      spinner.fail(`Execution failed: ${error}`);
      process.exit(1);
    }
  });

// Error handling
program.exitOverride();

try {
  program.parse();
} catch (error) {
  console.error(chalk.red('Error:'), error.message);
  process.exit(1);
}

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}