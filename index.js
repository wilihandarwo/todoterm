#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const os = require('os');
const boxen = require('boxen');
const gradient = require('gradient-string');
const figlet = require('figlet');
const Table = require('cli-table3');
const ora = require('ora');
const inquirer = require('inquirer');

const program = new Command();

// Data file path
const TODO_FILE = path.join(os.homedir(), '.todoterm.json');

// Beautiful gradient themes
const gradients = {
  primary: gradient(['#ff6b6b', '#4ecdc4']),
  success: gradient(['#00b894', '#00cec9']),
  warning: gradient(['#fdcb6e', '#e17055']),
  info: gradient(['#74b9ff', '#0984e3']),
  purple: gradient(['#a29bfe', '#6c5ce7']),
  ocean: gradient(['#00cec9', '#55efc4']),
  sunset: gradient(['#fd79a8', '#fdcb6e'])
};

// Beautiful icons and symbols
const icons = {
  todo: '○',
  done: '✓',
  add: '✨',
  remove: '🗑️',
  clear: '🧹',
  list: '📋',
  success: '🎉',
  rocket: '🚀',
  star: '⭐',
  fire: '🔥',
  heart: '💖'
};

// Initialize data file if it doesn't exist
function initDataFile() {
  if (!fs.existsSync(TODO_FILE)) {
    fs.writeFileSync(TODO_FILE, JSON.stringify([], null, 2));
  }
}

// Read todos from file
function readTodos() {
  initDataFile();
  const data = fs.readFileSync(TODO_FILE, 'utf8');
  return JSON.parse(data);
}

// Write todos to file
function writeTodos(todos) {
  fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
}

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Show beautiful header
function showHeader() {
  console.clear();
  
  // ASCII art title
  const title = figlet.textSync('TodoTerm', {
    font: 'ANSI Shadow',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  });
  
  console.log(gradients.primary(title));
  
  const subtitle = boxen(
    gradients.sunset('✨ Beautiful Terminal Todo Manager ✨\n') +
    chalk.gray('Made with ') + chalk.red('♥') + chalk.gray(' by Fadli Wilihandarwo'),
    {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'cyan',
      backgroundColor: '#1a1a2e'
    }
  );
  
  console.log(subtitle);
}

// Show loading animation
function showLoading(text) {
  const spinner = ora({
    text: gradients.info(text),
    spinner: 'dots12'
  }).start();
  
  setTimeout(() => {
    spinner.succeed(gradients.success('Done!'));
  }, 800);
}

// Add a new todo with beautiful animation
function addTodo(task) {
  const spinner = ora(gradients.info('Adding your todo...')).start();
  
  setTimeout(() => {
    const todos = readTodos();
    const newTodo = {
      id: generateId(),
      task: task,
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 'medium'
    };
    
    todos.push(newTodo);
    writeTodos(todos);
    
    spinner.succeed();
    
    const successBox = boxen(
      gradients.success(`${icons.add} Successfully added!\n`) +
      chalk.white(`"${task}"`),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green',
        backgroundColor: '#0f3460'
      }
    );
    
    console.log(successBox);
  }, 1000);
}

// List all todos with beautiful table
function listTodos() {
  showHeader();
  
  const todos = readTodos();
  
  if (todos.length === 0) {
    const emptyBox = boxen(
      gradients.warning(`${icons.star} No todos yet!\n`) +
      chalk.gray('Start your productive journey:\n') +
      gradients.info('todoterm add "Your first task"'),
      {
        padding: 2,
        margin: 1,
        borderStyle: 'double',
        borderColor: 'yellow',
        backgroundColor: '#2d3436'
      }
    );
    console.log(emptyBox);
    return;
  }
  
  // Create beautiful table
  const table = new Table({
    head: [
      gradients.purple('Status'),
      gradients.ocean('Task'),
      gradients.sunset('Created')
    ],
    style: {
      head: [],
      border: ['cyan']
    },
    colWidths: [10, 50, 20]
  });
  
  todos.forEach((todo, index) => {
    const status = todo.completed 
      ? chalk.green(`${icons.done} Done`) 
      : chalk.yellow(`${icons.todo} Pending`);
    
    const task = todo.completed 
      ? chalk.strikethrough.gray(todo.task)
      : gradients.primary(todo.task);
    
    const date = new Date(todo.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    
    table.push([
      `${chalk.dim((index + 1) + '.')} ${status}`,
      task,
      chalk.gray(date)
    ]);
  });
  
  console.log(table.toString());
  
  // Show statistics
  const completed = todos.filter(t => t.completed).length;
  const pending = todos.length - completed;
  
  const statsBox = boxen(
    gradients.info(`${icons.rocket} Statistics\n`) +
    chalk.white(`Total: ${todos.length} │ `) +
    chalk.green(`Completed: ${completed} │ `) +
    chalk.yellow(`Pending: ${pending}`),
    {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'blue',
      backgroundColor: '#2d3436'
    }
  );
  
  console.log(statsBox);
}

// Mark todo as done with celebration
function markDone(index) {
  const todos = readTodos();
  const todoIndex = parseInt(index) - 1;
  
  if (todoIndex < 0 || todoIndex >= todos.length) {
    const errorBox = boxen(
      chalk.red(`${icons.remove} Invalid todo number!\n`) +
      chalk.gray(`Please use a number between 1 and ${todos.length}`),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'red'
      }
    );
    console.log(errorBox);
    return;
  }
  
  const task = todos[todoIndex].task;
  
  const spinner = ora(gradients.success('Marking as complete...')).start();
  
  setTimeout(() => {
    todos[todoIndex].completed = true;
    todos[todoIndex].completedAt = new Date().toISOString();
    writeTodos(todos);
    
    spinner.succeed();
    
    // Celebration animation
    const celebrationBox = boxen(
      gradients.success(`${icons.success} Awesome! Task completed!\n`) +
      chalk.white(`"${task}"\n`) +
      gradients.purple(`${icons.fire} You're on fire! Keep going! ${icons.fire}`),
      {
        padding: 2,
        margin: 1,
        borderStyle: 'double',
        borderColor: 'green',
        backgroundColor: '#0f3460'
      }
    );
    
    console.log(celebrationBox);
  }, 800);
}

// Remove a todo with confirmation
async function removeTodo(index) {
  const todos = readTodos();
  const todoIndex = parseInt(index) - 1;
  
  if (todoIndex < 0 || todoIndex >= todos.length) {
    const errorBox = boxen(
      chalk.red(`${icons.remove} Invalid todo number!\n`) +
      chalk.gray(`Please use a number between 1 and ${todos.length}`),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'red'
      }
    );
    console.log(errorBox);
    return;
  }
  
  const task = todos[todoIndex].task;
  
  const { confirmed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmed',
      message: gradients.warning(`Are you sure you want to remove "${task}"?`),
      default: false
    }
  ]);
  
  if (confirmed) {
    const spinner = ora(gradients.warning('Removing todo...')).start();
    
    setTimeout(() => {
      todos.splice(todoIndex, 1);
      writeTodos(todos);
      
      spinner.succeed();
      
      const removeBox = boxen(
        gradients.warning(`${icons.remove} Todo removed\n`) +
        chalk.gray(`"${task}"`),
        {
          padding: 1,
          margin: 1,
          borderStyle: 'round',
          borderColor: 'yellow'
        }
      );
      
      console.log(removeBox);
    }, 600);
  } else {
    console.log(gradients.info('\n✨ Todo kept safely!'));
  }
}

// Clear all todos with dramatic confirmation
async function clearTodos() {
  const todos = readTodos();
  
  if (todos.length === 0) {
    const emptyBox = boxen(
      gradients.info(`${icons.star} Nothing to clear!\n`) +
      chalk.gray('Your todo list is already empty.'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'blue'
      }
    );
    console.log(emptyBox);
    return;
  }
  
  const { confirmed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmed',
      message: gradients.warning(`${icons.clear} Are you sure you want to clear ALL ${todos.length} todos? This cannot be undone!`),
      default: false
    }
  ]);
  
  if (confirmed) {
    const spinner = ora(gradients.warning('Clearing all todos...')).start();
    
    setTimeout(() => {
      writeTodos([]);
      
      spinner.succeed();
      
      const clearBox = boxen(
        gradients.sunset(`${icons.clear} All todos cleared!\n`) +
        chalk.gray('Ready for a fresh start!'),
        {
          padding: 2,
          margin: 1,
          borderStyle: 'double',
          borderColor: 'yellow',
          backgroundColor: '#2d3436'
        }
      );
      
      console.log(clearBox);
    }, 1000);
  } else {
    console.log(gradients.success('\n✨ Your todos are safe!'));
  }
}

// CLI setup
program
  .name('todoterm')
  .description('Simple CLI todo list manager')
  .version('1.0.0');

program
  .command('add')
  .alias('a')
  .description('Add a new todo')
  .argument('<task>', 'Task description')
  .action(addTodo);

program
  .command('list')
  .alias('ls')
  .description('List all todos')
  .action(listTodos);

program
  .command('done')
  .alias('d')
  .description('Mark a todo as done')
  .argument('<number>', 'Todo number')
  .action(markDone);

program
  .command('remove')
  .alias('rm')
  .description('Remove a todo')
  .argument('<number>', 'Todo number')
  .action(async (number) => await removeTodo(number));

program
  .command('clear')
  .description('Clear all todos')
  .action(async () => await clearTodos());

program
  .command('interactive')
  .alias('i')
  .description('Run in interactive mode')
  .action(async () => await interactiveMode());

// Interactive mode for better UX
async function interactiveMode() {
  showHeader();
  
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: gradients.primary('What would you like to do?'),
      choices: [
        { name: `${icons.list} View todos`, value: 'list' },
        { name: `${icons.add} Add new todo`, value: 'add' },
        { name: `${icons.done} Mark todo as done`, value: 'done' },
        { name: `${icons.remove} Remove a todo`, value: 'remove' },
        { name: `${icons.clear} Clear all todos`, value: 'clear' },
        { name: `${icons.rocket} Exit`, value: 'exit' }
      ]
    }
  ]);
  
  switch (action) {
    case 'list':
      listTodos();
      break;
    case 'add':
      const { task } = await inquirer.prompt([
        {
          type: 'input',
          name: 'task',
          message: gradients.ocean('Enter your todo:'),
          validate: input => input.length > 0 || 'Please enter a task'
        }
      ]);
      addTodo(task);
      break;
    case 'done':
      const todos = readTodos();
      if (todos.length === 0) {
        console.log(gradients.warning('\nNo todos to mark as done!'));
        break;
      }
      const { todoIndex } = await inquirer.prompt([
        {
          type: 'list',
          name: 'todoIndex',
          message: gradients.purple('Which todo to mark as done?'),
          choices: todos.map((todo, i) => ({
            name: `${i + 1}. ${todo.task}`,
            value: i + 1
          }))
        }
      ]);
      markDone(todoIndex);
      break;
    case 'remove':
      const todosList = readTodos();
      if (todosList.length === 0) {
        console.log(gradients.warning('\nNo todos to remove!'));
        break;
      }
      const { removeIndex } = await inquirer.prompt([
        {
          type: 'list',
          name: 'removeIndex',
          message: gradients.sunset('Which todo to remove?'),
          choices: todosList.map((todo, i) => ({
            name: `${i + 1}. ${todo.task}`,
            value: i + 1
          }))
        }
      ]);
      await removeTodo(removeIndex);
      break;
    case 'clear':
      await clearTodos();
      break;
    case 'exit':
      console.log(gradients.success('\n✨ Thank you for using TodoTerm! ✨'));
      process.exit(0);
  }
}

// Default action (show list or interactive mode)
if (process.argv.length === 2) {
  // Check if we should run interactive mode
  const args = process.argv.slice(2);
  if (args.length === 0) {
    // No arguments, show interactive mode
    interactiveMode();
  }
} else {
  program.parse();
}
