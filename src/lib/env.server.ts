export function env(key: string): string | undefined {
  const v = process.env[key]?.trim();
  return v || undefined;
}

/**
 * Workspace preview vs deployed app. The deployer writes GROK_PROJECT_ID on
 * every publish; the sandbox preview never has it.
 */
export function isWorkspacePreview(): boolean {
  return !env("GROK_PROJECT_ID");
}
