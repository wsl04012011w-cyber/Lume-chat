import { createFileRoute } from "@tanstack/react-router";
import { isAllowedOllamaPath, normalizeTunnelUrl } from "@/lib/ollama";
import { assertSafeTunnelUrl } from "@/lib/ollama-guard";

type ProxyBody = {
  baseUrl?: string;
  path?: string;
  method?: string;
  body?: unknown;
};

export const Route = createFileRoute("/api/ollama")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: ProxyBody;
        try {
          payload = (await request.json()) as ProxyBody;
        } catch {
          return Response.json({ error: "Pedido inválido." }, { status: 400 });
        }

        const path = payload.path ?? "";
        if (!isAllowedOllamaPath(path)) {
          return Response.json({ error: "Caminho da API não permitido." }, { status: 400 });
        }

        let origin: string;
        try {
          origin = normalizeTunnelUrl(payload.baseUrl ?? "");
          assertSafeTunnelUrl(origin);
        } catch (err) {
          const message = err instanceof Error ? err.message : "URL inválida.";
          return Response.json({ error: message }, { status: 400 });
        }

        const method = (payload.method ?? (payload.body ? "POST" : "GET")).toUpperCase();
        const target = `${origin}${path}`;

        let upstream: Response;
        try {
          upstream = await fetch(target, {
            method,
            headers: payload.body ? { "Content-Type": "application/json" } : undefined,
            body: payload.body ? JSON.stringify(payload.body) : undefined,
          });
        } catch {
          return Response.json(
            {
              error:
                "Não foi possível alcançar o túnel. Confirme a URL e se o cloudflared ainda está aberto.",
            },
            { status: 502 },
          );
        }

        const contentType = upstream.headers.get("content-type") ?? "application/json";
        return new Response(upstream.body, {
          status: upstream.status,
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "no-cache, no-transform",
            "X-Accel-Buffering": "no",
          },
        });
      },
    },
  },
});
