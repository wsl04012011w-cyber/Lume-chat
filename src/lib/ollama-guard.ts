const BLOCKED_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1", "[::1]"]);

function isPrivateHostname(hostname: string) {
  const host = hostname.replace(/^\[|\]$/g, "").toLowerCase();
  if (BLOCKED_HOSTS.has(host)) return true;
  if (host.endsWith(".local") || host.endsWith(".internal") || host.endsWith(".localhost")) {
    return true;
  }
  const ipv4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    const a = Number(ipv4[1]);
    const b = Number(ipv4[2]);
    if (a === 0 || a === 10 || a === 127) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
  }
  if (host === "metadata.google.internal" || host.startsWith("fd") || host.startsWith("fe80")) {
    return true;
  }
  return false;
}

export function assertSafeTunnelUrl(raw: string): URL {
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error("URL do túnel inválida.");
  }
  if (parsed.protocol !== "https:") {
    throw new Error("A URL do túnel precisa ser HTTPS (Cloudflare).");
  }
  if (isPrivateHostname(parsed.hostname)) {
    throw new Error("URL recusada: anfitrião privado ou local.");
  }
  return parsed;
}
