# Lume

Chat frontend para **Ollama** via Cloudflare Tunnel (ex.: Kaggle).

- Streaming de respostas
- Manager de modelos (listar, pull, apagar, descarregar da VRAM)
- Modo demonstração
- UI em português

## Desenvolvimento

```bash
npm install
npm run dev
```

Abre em `http://localhost:8080`.

## Deploy (Vercel)

1. Importa este repositório na Vercel
2. Framework: **TanStack Start** ou **Vite**
3. Build: `npm run build`
4. Env opcional: `VITE_AUTH_ENABLED=false`

## Uso

1. No Kaggle, sobe Ollama + cloudflared
2. No Lume → Definições → cola a URL HTTPS do túnel
3. Testa a ligação e faz pull de modelos se preciso
