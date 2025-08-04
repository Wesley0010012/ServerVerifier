# 🚀 Server Verifier

A modular and extensible server monitoring system that performs health checks such as CPU, memory, disk, and network usage — sending notifications through customizable channels like Console or Discord.

---

## 🌟 Features

- 🔍 Independent monitoring modules (CPU, Memory, Storage, etc.)
- 📢 Pluggable notification system (Console, Discord, easily extendable)
- ✅ Automatic environment variable validation by type
- ⚙️ Compatible with PM2 for easy production deployment
- 🧱 Clean architecture following the `StandardAction` interface pattern

---

## 📂 Project Structure

```
src/
├── domain/
│   └── protocols/
│       └── standard-action.ts
├── infra/
│   └── standard-actions/
│       ├── monitors/            # Monitoring modules
│       └── message-notifiers/   # Notifiers (Console, Discord)
├── config/
│   └── environment/             # Environment specs and validation
├── utils/
│   └── env-validation.ts
├── main.ts                      # Entry point
deploy/
└── pm2/
    └── ecosystem.config.js
.env.example
package.json
```

---

## ⚙️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Setup your environment variables

```bash
cp .env.example .env
```

Edit `.env` with your configuration.

---

### 3. Build the project

```bash
npm run build
```

### 4. Run the app

Using PM2:

```bash
pm2 start deploy/pm2/ecosystem.config.js
```

Or directly:

```bash
node dist/main.js
```

---

## 📝 Environment Variables

The `.env` file controls which monitors and notifiers run, thresholds, intervals, and other configs.

| Variable                          | Description                         | Example                          |
|----------------------------------|-----------------------------------|---------------------------------|
| `STORAGE_CHECK`                  | Enable storage monitor             | `true`                          |
| `CPU_CHECK`                     | Enable CPU monitor                 | `true`                          |
| `MEMORY_CHECK`                  | Enable memory monitor              | `true`                          |
| `DISCORD_MESSAGE_NOTIFIER`      | Enable Discord notifier            | `true`                          |
| `DISCORD_CONNECTION_URL`        | Discord webhook URL                | `https://discord.com/api/...`   |
| `DISCORD_CONNECTION_TOKEN`      | Discord bot token                  | `your_token_here`               |
| `CPU_PERCENTAGE_LIMIT`           | CPU usage threshold (%)            | `90`                           |
| `CPU_PERCENTAGE_NOTIFICATION_INTERVAL` | Notification interval (ms)   | `30000`                        |

*See `.env.example` for the full list.*

---

## 🚀 Deployment

This project includes a ready-to-use PM2 ecosystem config for easy deployment and management.

```bash
npm run deploy:build     # Compile project
npm run deploy:start     # Start with PM2
```

---

## 🔧 Extending the System

Add your own monitors or notifiers by implementing the `StandardAction` interface. The system is fully modular and designed for easy extension.

---

## 🛠 Tech Stack

- Node.js
- TypeScript
- PM2
- Discord API (Webhook / Bot)

---

## 📄 License

MIT

---

> *"Dreams never die, only the dreamer"*  
> **— 302**