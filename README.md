# TodoTerm 📝

✨ **The most beautiful CLI todo list manager for your terminal!** ✨

> Stand out from ordinary todo CLIs with stunning ASCII art, gradient colors, smooth animations, and an interactive interface that makes productivity a joy!

![TodoTerm Demo](https://via.placeholder.com/800x400/1a1a2e/00d2d3?text=TodoTerm+Beautiful+CLI)

## 🎨 **What Makes TodoTerm Special?**

### 🌟 **Visual Excellence**
- 🎭 **ASCII Art Header** - Stunning figlet typography that commands attention
- 🌈 **Gradient Colors** - Beautiful color transitions throughout the interface
- 📦 **Bordered Boxes** - Elegant framed content for better readability
- 📊 **Beautiful Tables** - Clean, professional task display with colors
- ✨ **Loading Animations** - Smooth spinners for all actions
- 🎉 **Celebration Effects** - Motivational feedback when completing tasks
- 💎 **Premium Feel** - Every interaction feels polished and professional

### 🚀 **Functionality**
- ✅ **Interactive Mode** - Menu-driven interface for ease of use
- ✅ **Smart Confirmations** - Prevent accidental data loss
- ✅ **Task Statistics** - Track your productivity at a glance
- ✅ **Persistent Storage** - Auto-saved in `~/.todoterm.json`
- ✅ **Cross-platform** - Works on Mac, Linux, Windows
- ✅ **Zero Dependencies** on external databases
- ✅ **Lightning Fast** - Optimized performance

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

# ❓ Show help
todoterm --help
```

## 🎬 **Visual Examples**

### 🎭 Beautiful ASCII Header:
```
████████╗ ██████╗ ██████╗  ██████╗ ████████╗███████╗██████╗ ███╗   ███╗
╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗╚══██╔══╝██╔════╝██╔══██╗████╗ ████║
   ██║   ██║   ██║██║  ██║██║   ██║   ██║   █████╗  ██████╔╝██╔████╔██║
   ██║   ██║   ██║██║  ██║██║   ██║   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║
   ██║   ╚██████╔╝██████╔╝╚██████╔╝   ██║   ███████╗██║  ██║██║ ╚═╝ ██║
   ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝

   ╭───────────────────────────────────────────╮
   │                                           │
   │   ✨ Beautiful Terminal Todo Manager ✨   │
   │   Made with ♥ by Fadli Wilihandarwo       │
   │                                           │
   ╰───────────────────────────────────────────╯
```

### 📊 Elegant Task Table:
```
┌──────────┬──────────────────────────────────────────────────┬────────────────────┐
│ Status   │ Task                                             │ Created            │
├──────────┼──────────────────────────────────────────────────┼────────────────────┤
│ 1. ✓ Done│ Learn Node.js                                    │ Jun 25             │
│ 2. ○ Pend│ Build amazing CLI app                            │ Jun 25             │
└──────────┴──────────────────────────────────────────────────┴────────────────────┘

   ╭──────────────────────────────────────────╮
   │                                          │
   │   🚀 Statistics                          │
   │   Total: 2 │ Completed: 1 │ Pending: 1   │
   │                                          │
   ╰──────────────────────────────────────────╯
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
