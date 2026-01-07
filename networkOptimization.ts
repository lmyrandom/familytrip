/**
 * Network Optimization and Error Handling
 * Handles connection issues, image loading failures, and network timeouts
 */

// Image loading with retry logic
export const loadImageWithRetry = (
  src: string,
  maxRetries: number = 3,
  timeout: number = 5000
): Promise<string> => {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const attemptLoad = () => {
      attempts++;
      const img = new Image();
      const timer = setTimeout(() => {
        img.src = '';
        if (attempts < maxRetries) {
          attemptLoad();
        } else {
          reject(new Error(`Failed to load image after ${maxRetries} attempts: ${src}`));
        }
      }, timeout);

      img.onload = () => {
        clearTimeout(timer);
        resolve(src);
      };

      img.onerror = () => {
        clearTimeout(timer);
        if (attempts < maxRetries) {
          attemptLoad();
        } else {
          reject(new Error(`Failed to load image: ${src}`));
        }
      };

      img.src = src;
    };

    attemptLoad();
  });
};

// Fetch with retry and timeout
export const fetchWithRetry = async (
  url: string,
  options: RequestInit = {},
  maxRetries: number = 3,
  timeout: number = 10000
): Promise<Response> => {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on client errors (4xx)
      if (error instanceof Error && error.message.includes('HTTP Error: 4')) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  throw lastError || new Error('Failed to fetch after retries');
};

// Network status monitoring
export class NetworkMonitor {
  private isOnline: boolean = navigator.onLine;
  private listeners: ((isOnline: boolean) => void)[] = [];

  constructor() {
    window.addEventListener('online', () => this.setOnline(true));
    window.addEventListener('offline', () => this.setOnline(false));
  }

  private setOnline(isOnline: boolean) {
    if (this.isOnline !== isOnline) {
      this.isOnline = isOnline;
      this.notifyListeners();
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.isOnline));
  }

  isConnected(): boolean {
    return this.isOnline;
  }

  subscribe(listener: (isOnline: boolean) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

// Singleton instance
export const networkMonitor = new NetworkMonitor();

// Fallback image for failed loads
export const getFallbackImage = (type: string = 'placeholder'): string => {
  const fallbacks: Record<string, string> = {
    placeholder: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="18" fill="%23999" text-anchor="middle" dy=".3em"%3E图片加载失败%3C/text%3E%3C/svg%3E',
    pyramid: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23d4a574" width="400" height="300"/%3E%3Cpolygon points="200,50 350,250 50,250" fill="%23a0826d"/%3E%3C/svg%3E'
  };
  return fallbacks[type] || fallbacks.placeholder;
};

// Cache management
export class ImageCache {
  private cache: Map<string, string> = new Map();
  private maxSize: number = 50;

  set(key: string, value: string) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  get(key: string): string | undefined {
    return this.cache.get(key);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  clear() {
    this.cache.clear();
  }
}

export const imageCache = new ImageCache();
