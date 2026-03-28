/**
 * In-memory URI/metadata cache with LRU eviction. Do not store binary blobs in Redux — keep
 * entries here and only persist references in the store.
 */
export interface FileCacheEntry {
  uri: string;
  metadata: Record<string, string>;
  lastAccess: number;
}

export class LruFileCache {
  private readonly maxEntries: number;
  private readonly map = new Map<string, FileCacheEntry>();

  constructor(maxEntries: number) {
    this.maxEntries = Math.max(1, maxEntries);
  }

  get(key: string): FileCacheEntry | undefined {
    const entry = this.map.get(key);
    if (!entry) return undefined;
    entry.lastAccess = Date.now();
    this.map.set(key, entry);
    return entry;
  }

  set(key: string, uri: string, metadata: Record<string, string> = {}): void {
    if (this.map.size >= this.maxEntries && !this.map.has(key)) {
      this.evictLru();
    }
    this.map.set(key, { uri, metadata, lastAccess: Date.now() });
  }

  delete(key: string): void {
    this.map.delete(key);
  }

  clear(): void {
    this.map.clear();
  }

  private evictLru(): void {
    let oldestKey: string | undefined;
    let oldest = Infinity;
    for (const [key, entry] of this.map) {
      if (entry.lastAccess < oldest) {
        oldest = entry.lastAccess;
        oldestKey = key;
      }
    }
    if (oldestKey !== undefined) {
      this.map.delete(oldestKey);
    }
  }
}
