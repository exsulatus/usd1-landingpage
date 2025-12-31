export async function copyToClipboard(text: string) {
  if (typeof navigator === "undefined") return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}


