# TodoTerm 📝

✨ **The most beautiful CLI todo list manager with project management for your terminal!** ✨

> Stand out from ordinary todo CLIs with stunning ASCII art, gradient colors, smooth animations, powerful project management, and an intuitive interface that makes productivity a joy!

![TodoTerm Demo](https://via.placeholder.com/800x400/1a1a2e/00d2d3?text=TodoTerm+Beautiful+CLI)

## 🆕 **What's New in v2.0**

🎉 **Major Update!** TodoTerm now includes powerful project management capabilities:

- 📂 **Project Organization** - Create separate projects for different areas of your life
- 🏷️ **Smart Project IDs** - Human-readable IDs like `website-development` instead of random strings
- 📱 **Contextual Help** - See relevant commands based on what you're viewing
- 🎮 **Enhanced Interactive Menu** - Perfect alignment with ASCII symbols (no more emoji alignment issues!)
- 🎨 **Cleaner Design** - Minimalist approach with less visual clutter
- 💡 **Smart Command Discovery** - Always know what you can do next

## 🎨 **What Makes TodoTerm Special?**

### 🌟 **Visual Excellence**
- 🎭 **ASCII Art Header** - Stunning figlet typography that commands attention
- 🌈 **Gradient Colors** - Beautiful color transitions throughout the interface
- 🎨 **Clean Minimalist Design** - Less clutter, more focus on your tasks
- 📊 **Beautiful Tables** - Clean, professional task display with perfect alignment
- ✨ **Loading Animations** - Smooth spinners for all actions
- 🎉 **Celebration Effects** - Motivational feedback when completing tasks
- 💎 **Premium Feel** - Every interaction feels polished and professional

### 🚀 **Core Functionality**
- ✅ **Interactive Mode** - Menu-driven interface with symbol-based navigation
- ✅ **Smart Confirmations** - Prevent accidental data loss
- ✅ **Task Statistics** - Track your productivity at a glance
- ✅ **Persistent Storage** - Auto-saved in `~/.todoterm.json`
- ✅ **Cross-platform** - Works on Mac, Linux, Windows
- ✅ **Zero Dependencies** on external databases
- ✅ **Lightning Fast** - Optimized performance

### 📂 **Project Management (NEW!)**
- 🏗️ **Multiple Projects** - Organize todos into separate projects
- 📥 **Smart Inbox** - Default project for general todos
- 🔄 **Easy Project Switching** - Switch between projects seamlessly
- 🏷️ **Human-Friendly IDs** - Project IDs like `website-development` instead of random strings
- 📋 **Project Overview** - See all projects and their task counts at a glance
- 🎯 **Context Awareness** - Always know which project you're working in

### 💡 **User Experience Improvements (NEW!)**
- 🔍 **Contextual Help** - Relevant commands shown based on current screen
- 🎮 **Enhanced Interactive Menu** - Perfect alignment with ASCII symbols
- 📱 **Smart Command Discovery** - Never wonder what commands are available
- 🚫 **No Infinite Scrolling** - Clean, predictable menu navigation

## 📦 Installation

### 🎉 From npm (Live Now!)
```bash
npm install -g todoterm
```

> 🚀 **TodoTerm is now available on npm!** Install it globally with a single command and start organizing your tasks beautifully.

### From source
```bash
git clone https://github.com/wilihandarwo/todoterm.git
cd todoterm
npm install
npm link
```

## 🎮 Usage

### 🎮 **Interactive Mode** (Recommended)

The most beautiful way to use TodoTerm:

```bash
# Launch the gorgeous interactive interface
todoterm

# Alternative commands
todoterm interactive
todoterm i
```

### ⌨️ **Command Line Interface**

For power users who prefer direct commands:

```bash
# 📋 View todos with beautiful ASCII header and table
todoterm list
todoterm ls

# ✨ Add a new todo with smooth animation
todoterm add "Buy groceries"
todoterm a "Call mom"

# 🎉 Mark todo as done with celebration animation
todoterm done 1
todoterm d 2

# 🗑️ Remove a todo (with smart confirmation)
todoterm remove 1
todoterm rm 2

# 🧹 Clear all todos (with dramatic confirmation)
todoterm clear

# 📂 PROJECT MANAGEMENT (NEW!)
# View all projects with beautiful table
todoterm projects
todoterm pl

# ➕ Add a new project with human-friendly ID
todoterm project-add "Website Development"
todoterm pa "Mobile App"

# 🔄 Switch to a different project
todoterm project-switch website-development
todoterm ps mobile-app

# 🗑️ Remove a project (with confirmation)
todoterm project-remove website-development
todoterm pr mobile-app

# ❓ Show help
todoterm --help
```

## 📂 **Project Management Workflow**

### Getting Started with Projects

```bash
# 1. View your current projects (starts with "Inbox")
todoterm projects

# 2. Create a new project for your work
todoterm pa "Website Redesign"

# 3. Switch to your new project
todoterm ps website-redesign

# 4. Add todos to the current project
todoterm add "Design homepage mockup"
todoterm add "Implement responsive layout"
todoterm add "Optimize for mobile"

# 5. View todos in current project
todoterm list

# 6. Switch between projects as needed
todoterm ps inbox              # Back to inbox
todoterm ps website-redesign   # Back to your project
```

### 💡 **Contextual Help System**

TodoTerm shows you relevant commands based on what you're viewing:

**When viewing todos:**
```
💡 Quick commands:
   todoterm add "task"     - Add new todo
   todoterm done <num>     - Mark todo as done
   todoterm rm <num>      - Remove todo
   todoterm projects      - View all projects
   todoterm ps <project>  - Switch project

ℹ️  Type "todoterm" for interactive menu or "todoterm --help" for all commands
```

**When viewing projects:**
```
💡 Quick commands:
   todoterm pa "name"       - Add new project
   todoterm ps <project>    - Switch to project
   todoterm pr <project>    - Remove project
   todoterm list            - View current project todos

ℹ️  Type "todoterm" for interactive menu or "todoterm --help" for all commands
```

## 🍼 **Visual Examples**

### 🎭 Beautiful ASCII Header:
```
███████╭ ██████╭ ██████╭  ██████╭ ████████╭███████╭██████╭ ███╭   ███╭
╚══█══╝██═══██╭██══██╭██═══██╭╚══██══╝██════╝██══██╭████╭ ████╭
   ██╯   ██╯   ██╯██╯  ██╯██╯   ██╯   ██╯   █████╭  ██████═╝██═████═██╭
   ██╯   ██╯   ██╯██╯  ██╯██╯   ██╯   ██╯   ██══╝  ██══██╭██╯╚██═╝██╭
   ██╯   ╚██████═╝██████═╝╚██████═╝   ██╯   ███████╭██╯  ██╭██╯ ╚═╝ ██╭
   ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝

  ✨ Beautiful Terminal Todo Manager ✨
  Made with ♥ by Fadli Wilihandarwo
```

### 📊 Clean Task Display with Project Context:
```
  📂 Current Project: Website Development
  3 tasks total

┌───────────────┬─────────────────────────────────────────────┬────────────────────┐
│ Status        │ Task                                        │ Created            │
├───────────────┼─────────────────────────────────────────────┼────────────────────┤
│ 1. ✓ Done     │ Design homepage mockup                      │ Jun 25             │
│ 2. ○ Pending  │ Implement responsive layout                 │ Jun 25             │
│ 3. ○ Pending  │ Optimize for mobile                         │ Jun 25             │
└───────────────┴─────────────────────────────────────────────┴────────────────────┘

  🚀 Statistics
  Total: 3 │ Completed: 1 │ Pending: 2

  💡 Quick commands:
     todoterm add "task"     - Add new todo
     todoterm done <num>     - Mark todo as done
     todoterm rm <num>      - Remove todo
     todoterm projects      - View all projects
     todoterm ps <project>  - Switch project

  ℹ️  Type "todoterm" for interactive menu or "todoterm --help" for all commands
```

### 🎉 Celebration Animations:
```bash
$ todoterm add "Learn Node.js"
✔ Adding your todo...
   ╭───────────────────────────────────────╮
   │                                       │
   │   ✨ Successfully added!              │
   │   "Learn Node.js"                     │
   │                                       │
   ╰───────────────────────────────────────╯

$ todoterm done 1
✔ Marking as complete...
   ╭─────────────────────────────────────────────╮
   │                                             │
   │   🎉 Awesome! Task completed!              │
   │   "Learn Node.js"                          │
   │   🔥 You're on fire! Keep going! 🔥        │
   │                                             │
   ╰─────────────────────────────────────────────╯
```

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/wilihandarwo/todoterm.git
cd todoterm

# Install dependencies
npm install

# Test locally
node index.js

# Link globally for testing
npm link
```

## 🚀 Publishing

### To npm
1. Create npm account: https://www.npmjs.com/signup
2. Login: `npm login`
3. Publish: `npm publish`

### To Homebrew
1. Publish to npm first
2. Create a Homebrew formula (tap)
3. Or submit to homebrew-core

## 🎨 **Technical Stack**

- **Node.js** - Runtime environment
- **Commander.js** - Command-line interface framework
- **Chalk** - Terminal colors and styling
- **Boxen** - Beautiful bordered boxes
- **Gradient-string** - Stunning color gradients
- **Figlet** - ASCII art text
- **CLI-table3** - Professional table formatting
- **Ora** - Elegant loading spinners
- **Inquirer** - Interactive command-line prompts

## 📄 License

MIT © Fadli Wilihandarwo

## 🤝 Contributing

We'd love your help to make TodoTerm even more beautiful!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 💖 **Why Choose TodoTerm?**

Unlike other boring CLI todo apps, TodoTerm transforms your terminal into a **beautiful, engaging workspace** that actually makes you *want* to be productive. Every interaction is designed to delight, motivate, and inspire you to get things done.

---

**✨ Experience the difference. Try TodoTerm today! ✨**
