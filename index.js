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

// Default data structure
const DEFAULT_DATA = {
  version: '2.0.0',
  projects: {
    inbox: {
      id: 'inbox',
      name: 'Inbox',
      description: 'General todos not assigned to any project',
      color: 'gray',
      createdAt: new Date().toISOString(),
      todos: []
    }
  },
  settings: {
    currentProject: 'inbox',
    showProjects: true
  }
};

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
    fs.writeFileSync(TODO_FILE, JSON.stringify(DEFAULT_DATA, null, 2));
  }
}

// Read data from file (migrates old format if needed)
function readTodos() {
  initDataFile();
  const data = fs.readFileSync(TODO_FILE, 'utf8');
  const parsed = JSON.parse(data);
  
  // Migrate old format to new format
  if (Array.isArray(parsed)) {
    const migratedData = {
      ...DEFAULT_DATA,
      projects: {
        ...DEFAULT_DATA.projects,
        inbox: {
          ...DEFAULT_DATA.projects.inbox,
          todos: parsed
        }
      }
    };
    writeTodos(migratedData);
    return migratedData;
  }
  
  // Ensure structure is complete
  if (!parsed.projects) parsed.projects = DEFAULT_DATA.projects;
  if (!parsed.settings) parsed.settings = DEFAULT_DATA.settings;
  if (!parsed.projects.inbox) parsed.projects.inbox = DEFAULT_DATA.projects.inbox;
  
  return parsed;
}

// Write data to file
function writeTodos(data) {
  fs.writeFileSync(TODO_FILE, JSON.stringify(data, null, 2));
}

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Generate human-friendly project ID from name
function generateProjectId(name, existingProjects = {}) {
  // Convert to lowercase, replace spaces and special chars with hyphens
  let baseId = name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
  
  // If the ID already exists, append a number
  let finalId = baseId;
  let counter = 1;
  
  while (existingProjects[finalId]) {
    finalId = `${baseId}-${counter}`;
    counter++;
  }
  
  return finalId;
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
  console.log();
  
  // Clean subtitle without box
  console.log('  ' + gradients.sunset('✨ Beautiful Terminal Todo Manager ✨'));
  console.log('  ' + chalk.gray('Made with ') + chalk.red('♥') + chalk.gray(' by Fadli Wilihandarwo'));
  console.log();
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
function addTodo(task, options = {}) {
  const spinner = ora(gradients.info('Adding your todo...')).start();
  
  setTimeout(() => {
    const data = readTodos();
    const targetProject = options.project || data.settings.currentProject || 'inbox';
    
    if (!data.projects[targetProject]) {
      spinner.fail(chalk.red('Project not found!'));
      return;
    }
    
    const newTodo = {
      id: generateId(),
      task: task,
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 'medium'
    };
    
    data.projects[targetProject].todos.push(newTodo);
    writeTodos(data);
    
    spinner.succeed();
    
    const projectName = data.projects[targetProject].name;
    console.log();
    console.log('  ' + gradients.success(`${icons.add} Successfully added to ${projectName}!`));
    console.log('  ' + chalk.white(`"${task}"`));
    console.log();
  }, 1000);
}

// List todos from current project with beautiful table
function listTodos() {
  showHeader();
  
  const data = readTodos();
  const currentProject = data.projects[data.settings.currentProject];
  const todos = currentProject.todos;
  
  // Show current project info - clean and minimal
  console.log('  ' + gradients.ocean(`📂 Current Project: ${currentProject.name}`));
  console.log('  ' + chalk.gray(`${todos.length} tasks total`));
  console.log();
  
  if (todos.length === 0) {
    console.log('  ' + gradients.warning(`${icons.star} No todos in this project yet!`));
    console.log('  ' + chalk.gray('Start your productive journey:'));
    console.log('  ' + gradients.info('todoterm add "Your first task"'));
    console.log();
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
    colWidths: [15, 45, 20]
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
  console.log();
  
  // Show statistics - clean and minimal
  const completed = todos.filter(t => t.completed).length;
  const pending = todos.length - completed;
  
  console.log('  ' + gradients.info(`${icons.rocket} Statistics`));
  console.log('  ' + chalk.white(`Total: ${todos.length} │ `) + chalk.green(`Completed: ${completed} │ `) + chalk.yellow(`Pending: ${pending}`));
  console.log();
  
  // Show contextual command hints
  console.log('  ' + chalk.dim('💡 Quick commands:'));
  console.log('  ' + chalk.dim('   todoterm add "task"     - Add new todo'));
  if (todos.length > 0) {
    console.log('  ' + chalk.dim('   todoterm done <num>     - Mark todo as done'));
    console.log('  ' + chalk.dim('   todoterm rm <num>      - Remove todo'));
  }
  console.log('  ' + chalk.dim('   todoterm projects      - View all projects'));
  console.log('  ' + chalk.dim('   todoterm ps <project>  - Switch project'));
  console.log();
  console.log('  ' + chalk.dim('ℹ️  Type "todoterm" for interactive menu or "todoterm --help" for all commands'));
  console.log();
}

// Mark todo as done with celebration
function markDone(index) {
  const data = readTodos();
  const currentProject = data.projects[data.settings.currentProject];
  const todos = currentProject.todos;
  const todoIndex = parseInt(index) - 1;
  
  if (todoIndex < 0 || todoIndex >= todos.length) {
    console.log();
    console.log('  ' + chalk.red(`${icons.remove} Invalid todo number!`));
    console.log('  ' + chalk.gray(`Please use a number between 1 and ${todos.length}`));
    console.log();
    return;
  }
  
  const task = todos[todoIndex].task;
  
  const spinner = ora(gradients.success('Marking as complete...')).start();
  
  setTimeout(() => {
    currentProject.todos[todoIndex].completed = true;
    currentProject.todos[todoIndex].completedAt = new Date().toISOString();
    writeTodos(data);
    
    spinner.succeed();
    
    // Celebration message - clean and minimal
    console.log();
    console.log('  ' + gradients.success(`${icons.success} Awesome! Task completed!`));
    console.log('  ' + chalk.white(`"${task}"`));
    console.log('  ' + gradients.purple(`${icons.fire} You're on fire! Keep going! ${icons.fire}`));
    console.log();
  }, 800);
}

// Remove a todo with confirmation
async function removeTodo(index) {
  const data = readTodos();
  const currentProject = data.projects[data.settings.currentProject];
  const todos = currentProject.todos;
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
      currentProject.todos.splice(todoIndex, 1);
      writeTodos(data);
      
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
  const data = readTodos();
  const currentProject = data.projects[data.settings.currentProject];
  const todos = currentProject.todos;
  
  if (todos.length === 0) {
    const emptyBox = boxen(
      gradients.info(`${icons.star} Nothing to clear!\n`) +
      chalk.gray(`${currentProject.name} is already empty.`),
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
      message: gradients.warning(`${icons.clear} Are you sure you want to clear ALL ${todos.length} todos from ${currentProject.name}? This cannot be undone!`),
      default: false
    }
  ]);
  
  if (confirmed) {
    const spinner = ora(gradients.warning('Clearing all todos...')).start();
    
    setTimeout(() => {
      currentProject.todos = [];
      writeTodos(data);
      
      spinner.succeed();
      
      const clearBox = boxen(
        gradients.sunset(`${icons.clear} All todos cleared from ${currentProject.name}!\n`) +
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

// Project management functions
function addProject(name) {
  const data = readTodos() || DEFAULT_DATA;
  const id = generateProjectId(name, data.projects);

  data.projects[id] = {
    id,
    name,
    description: '',
    color: 'gray',
    createdAt: new Date().toISOString(),
    todos: []
  };

  writeTodos(data);
  
  console.log();
  console.log('  ' + gradients.success(`${icons.add} Project Created!`));
  console.log('  ' + chalk.white(`"${name}"`));
  console.log('  ' + chalk.gray(`ID: ${id}`));
  console.log();
}

function removeProject(id) {
  const data = readTodos() || DEFAULT_DATA;

  if (id === 'inbox' || !data.projects[id]) {
    console.log(chalk.red(`${icons.remove} Cannot remove inbox or non-existent project!`));
    return;
  }

  const projectName = data.projects[id].name;
  delete data.projects[id];
  
  // If current project was deleted, switch to inbox
  if (data.settings.currentProject === id) {
    data.settings.currentProject = 'inbox';
  }
  
  writeTodos(data);
  console.log(gradients.success(`${icons.remove} Project '${projectName}' removed successfully!`));
}

function switchProject(id) {
  const data = readTodos() || DEFAULT_DATA;

  if (!data.projects[id]) {
    console.log(chalk.red(`${icons.remove} Project not found!`));
    return;
  }

  data.settings.currentProject = id;
  writeTodos(data);
  console.log(gradients.success(`${icons.star} Switched to project '${data.projects[id].name}'!`));
}

function listProjects() {
  const data = readTodos() || DEFAULT_DATA;
  
  console.clear();
  showHeader();
  
  const table = new Table({
    head: [
      gradients.purple('ID'),
      gradients.ocean('Project Name'),
      gradients.sunset('Tasks'),
      gradients.info('Current')
    ],
    style: {
      head: [],
      border: ['cyan']
    }
  });
  
  Object.values(data.projects).forEach(project => {
    const isCurrent = data.settings.currentProject === project.id;
    const currentMark = isCurrent ? chalk.green('★') : ' ';
    
    table.push([
      chalk.cyan(project.id),
      project.name,
      chalk.gray(project.todos.length + ' tasks'),
      currentMark
    ]);
  });
  
  console.log(table.toString());
  console.log();
  
  // Show contextual command hints for project management
  console.log('  ' + chalk.dim('💡 Quick commands:'));
  console.log('  ' + chalk.dim('   todoterm pa "name"       - Add new project'));
  console.log('  ' + chalk.dim('   todoterm ps <project>    - Switch to project'));
  console.log('  ' + chalk.dim('   todoterm pr <project>    - Remove project'));
  console.log('  ' + chalk.dim('   todoterm list            - View current project todos'));
  console.log();
  console.log('  ' + chalk.dim('ℹ️  Type "todoterm" for interactive menu or "todoterm --help" for all commands'));
  console.log();
}

// CLI setup
program
  .name('todoterm')
  .description('Beautiful CLI todo list manager with project support')
  .version('2.0.0');

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

// Project management commands
program
  .command('project-add')
  .alias('pa')
  .description('Add a new project')
  .argument('<name>', 'Project name')
  .action(addProject);

program
  .command('project-remove')
  .alias('pr')
  .description('Remove a project')
  .argument('<id>', 'Project ID')
  .action(removeProject);

program
  .command('project-switch')
  .alias('ps')
  .description('Switch to a different project')
  .argument('<id>', 'Project ID')
  .action(switchProject);

program
  .command('projects')
  .alias('pl')
  .description('List all projects')
  .action(listProjects);

// Interactive mode for better UX
async function interactiveMode() {
  showHeader();
  
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: gradients.primary('What would you like to do?'),
      loop: false,
      choices: [
        { name: `[>]  View todos`, value: 'list' },
        { name: `[+]  Add new todo`, value: 'add' },
        { name: `[✓]  Mark todo as done`, value: 'done' },
        { name: `[-]  Remove a todo`, value: 'remove' },
        { name: `[×]  Clear all todos`, value: 'clear' },
        new inquirer.Separator('--- Project Management ---'),
        { name: `[*]  View all projects`, value: 'projects' },
        { name: `[#]  Add new project`, value: 'project-add' },
        { name: `[~]  Switch project`, value: 'project-switch' },
        { name: `[!]  Remove project`, value: 'project-remove' },
        new inquirer.Separator('--- ---'),
        { name: `[.]  Exit`, value: 'exit' }
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
    case 'projects':
      listProjects();
      break;
    case 'project-add':
      const { projectName } = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: gradients.ocean('Enter project name:'),
          validate: input => input.length > 0 || 'Please enter a project name'
        }
      ]);
      addProject(projectName);
      break;
    case 'project-switch':
      const data = readTodos();
      const projectChoices = Object.values(data.projects).map(project => ({
        name: `${project.name} (${project.id})`,
        value: project.id
      }));
      const { projectId } = await inquirer.prompt([
        {
          type: 'list',
          name: 'projectId',
          message: gradients.purple('Switch to which project?'),
          choices: projectChoices
        }
      ]);
      switchProject(projectId);
      break;
    case 'project-remove':
      const dataForRemove = readTodos();
      const removableProjects = Object.values(dataForRemove.projects)
        .filter(project => project.id !== 'inbox')
        .map(project => ({
          name: `${project.name} (${project.id})`,
          value: project.id
        }));
      
      if (removableProjects.length === 0) {
        console.log(gradients.warning('\nNo projects to remove (Inbox cannot be removed)!'));
        break;
      }
      
      const { removeProjectId } = await inquirer.prompt([
        {
          type: 'list',
          name: 'removeProjectId',
          message: gradients.sunset('Which project to remove?'),
          choices: removableProjects
        }
      ]);
      removeProject(removeProjectId);
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
