import chalk from 'chalk';
import { createSpinner } from 'ora';
import boxen from 'boxen';

export class TaskCommands {
  static async list() {
    const spinner = createSpinner('Fetching task list...').start();
    
    try {
      // Mock task data
      const tasks = [
        {
          id: 'T001',
          name: 'Weather Data Fetch',
          status: 'running',
          priority: 'high',
          progress: 75,
          eta: '30s',
          thread: 'thread-001'
        },
        {
          id: 'T002', 
          name: 'File Processing',
          status: 'running',
          priority: 'medium',
          progress: 45,
          eta: '1m 20s',
          thread: 'thread-002'
        },
        {
          id: 'T003',
          name: 'Database Sync',
          status: 'queued',
          priority: 'low',
          progress: 0,
          eta: 'pending',
          thread: null
        },
        {
          id: 'T004',
          name: 'Email Analysis',
          status: 'completed',
          priority: 'medium',
          progress: 100,
          eta: 'completed',
          thread: null
        }
      ];

      spinner.succeed('Task list retrieved');

      const getStatusColor = (status: string) => {
        switch (status) {
          case 'running': return chalk.yellow;
          case 'completed': return chalk.green;
          case 'queued': return chalk.blue;
          case 'failed': return chalk.red;
          default: return chalk.gray;
        }
      };

      const getPriorityColor = (priority: string) => {
        switch (priority) {
          case 'critical': return chalk.red;
          case 'high': return chalk.yellow;
          case 'medium': return chalk.blue;
          case 'low': return chalk.gray;
          default: return chalk.white;
        }
      };

      const taskDisplay = `
${chalk.bold.cyan('🎯 Task Management')}

${chalk.bold.yellow('Active & Queued Tasks:')}
${tasks.map(task => `
${chalk.bold('ID:')} ${chalk.cyan(task.id)}
${chalk.bold('Name:')} ${task.name}
${chalk.bold('Status:')} ${getStatusColor(task.status)(task.status.toUpperCase())}
${chalk.bold('Priority:')} ${getPriorityColor(task.priority)(task.priority.toUpperCase())}
${chalk.bold('Progress:')} ${task.progress}%
${chalk.bold('ETA:')} ${task.eta}
${chalk.bold('Thread:')} ${task.thread || 'Not assigned'}
`).join('\n')}
      `;

      console.log(boxen(taskDisplay, {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'cyan'
      }));

    } catch (error) {
      spinner.fail(`Failed to retrieve task list: ${error}`);
    }
  }

  static async setPriority(taskId: string, level: string) {
    const validLevels = ['critical', 'high', 'medium', 'low'];
    
    if (!validLevels.includes(level)) {
      console.error(chalk.red('Error:'), `Invalid priority level. Must be one of: ${validLevels.join(', ')}`);
      return;
    }

    const spinner = createSpinner(`Setting priority for task ${taskId} to ${level}...`).start();
    
    try {
      // Mock priority update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      spinner.succeed(`Task ${taskId} priority updated to ${level}`);
      
      console.log(boxen(`
${chalk.bold.green('✅ Priority Updated')}

${chalk.bold('Task ID:')} ${chalk.cyan(taskId)}
${chalk.bold('New Priority:')} ${chalk.yellow(level.toUpperCase())}
${chalk.bold('Updated:')} ${new Date().toLocaleTimeString()}

${chalk.gray('Note: Priority changes take effect immediately for queued tasks.')}
      `, {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green'
      }));

    } catch (error) {
      spinner.fail(`Failed to update priority: ${error}`);
    }
  }

  static async schedule() {
    const spinner = createSpinner('Loading scheduler interface...').start();
    
    try {
      // Mock schedule data
      const scheduledTasks = [
        {
          id: 'S001',
          name: 'Daily Backup',
          schedule: '0 2 * * *',
          nextRun: 'Tomorrow 2:00 AM',
          enabled: true
        },
        {
          id: 'S002',
          name: 'Weekly Report',
          schedule: '0 9 * * 1',
          nextRun: 'Monday 9:00 AM',
          enabled: true
        },
        {
          id: 'S003',
          name: 'Cache Cleanup',
          schedule: '*/30 * * * *',
          nextRun: 'In 15 minutes',
          enabled: false
        }
      ];

      spinner.succeed('Schedule loaded');

      const scheduleDisplay = `
${chalk.bold.cyan('⏰ Task Scheduler')}

${chalk.bold.yellow('Scheduled Tasks:')}
${scheduledTasks.map(task => `
${chalk.bold('ID:')} ${chalk.cyan(task.id)}
${chalk.bold('Name:')} ${task.name}
${chalk.bold('Schedule:')} ${task.schedule}
${chalk.bold('Next Run:')} ${task.nextRun}
${chalk.bold('Status:')} ${task.enabled ? chalk.green('ENABLED') : chalk.red('DISABLED')}
`).join('\n')}

${chalk.bold.yellow('Available Commands:')}
• ${chalk.cyan('mcp tasks schedule add')} - Add new scheduled task
• ${chalk.cyan('mcp tasks schedule remove <id>')} - Remove scheduled task
• ${chalk.cyan('mcp tasks schedule enable <id>')} - Enable scheduled task
• ${chalk.cyan('mcp tasks schedule disable <id>')} - Disable scheduled task
      `;

      console.log(boxen(scheduleDisplay, {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'blue'
      }));

    } catch (error) {
      spinner.fail(`Failed to load scheduler: ${error}`);
    }
  }
}