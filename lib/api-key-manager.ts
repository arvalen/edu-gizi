class ApiKeyManager {
  private apiKeys: string[];
  private currentIndex: number = 0;
  private keyUsage: Map<string, number> = new Map();
  private keyLimits: Map<string, number> = new Map();
  private dailyResetTime: number = Date.now();

  constructor() {
    this.apiKeys = this.loadApiKeys();
    this.initializeKeyUsage();
  }

  private loadApiKeys(): string[] {
    const keys: string[] = [];
    
    const primaryKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
    if (primaryKey) keys.push(primaryKey);
    
    const additionalKeys = [
      process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY_2,
      process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY_3,
      process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY_4,
      process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY_5,
    ].filter(Boolean) as string[];
    
    keys.push(...additionalKeys);
    
    if (keys.length === 0) {
      throw new Error('No Spoonacular API keys found in environment variables');
    }
    
    return keys;
  }

  private initializeKeyUsage(): void {
    this.apiKeys.forEach(key => {
      this.keyUsage.set(key, 0);
      this.keyLimits.set(key, 150);
    });
  }

  private resetDailyUsage(): void {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    
    if (now - this.dailyResetTime >= oneDay) {
      this.keyUsage.clear();
      this.keyLimits.clear();
      this.initializeKeyUsage();
      this.dailyResetTime = now;
    }
  }

  private getNextAvailableKey(): string {
    this.resetDailyUsage();
    
    const maxAttempts = this.apiKeys.length;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const key = this.apiKeys[this.currentIndex];
      const usage = this.keyUsage.get(key) || 0;
      const limit = this.keyLimits.get(key) || 150;
      
      if (usage < limit) {
        this.keyUsage.set(key, usage + 1);
        return key;
      }
      
      this.currentIndex = (this.currentIndex + 1) % this.apiKeys.length;
      attempts++;
    }
    
    throw new Error('All API keys have reached their daily limit');
  }

  private markKeyAsExhausted(key: string, actualLimit?: number): void {
    if (actualLimit !== undefined) {
      this.keyLimits.set(key, actualLimit);
    }
    this.keyUsage.set(key, this.keyLimits.get(key) || 150);
  }

  public getApiKey(): string {
    return this.getNextAvailableKey();
  }

  public getApiKeyInfo(): {
    totalKeys: number;
    currentKeyIndex: number;
    keyUsage: Record<string, number>;
    keyLimits: Record<string, number>;
    availableKeys: number;
  } {
    this.resetDailyUsage();
    
    const availableKeys = Array.from(this.keyUsage.entries()).filter(([key, usage]) => {
      const limit = this.keyLimits.get(key) || 150;
      return usage < limit;
    }).length;
    
    return {
      totalKeys: this.apiKeys.length,
      currentKeyIndex: this.currentIndex,
      keyUsage: Object.fromEntries(this.keyUsage),
      keyLimits: Object.fromEntries(this.keyLimits),
      availableKeys
    };
  }

  public async makeRequest(url: string, options?: RequestInit): Promise<Response> {
    const maxRetries = this.apiKeys.length;
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const apiKey = this.getNextAvailableKey();
        const urlWithKey = url.includes('apiKey=') 
          ? url.replace(/apiKey=[^&]*/, `apiKey=${apiKey}`)
          : `${url}${url.includes('?') ? '&' : '?'}apiKey=${apiKey}`;
        
        const response = await fetch(urlWithKey, options);
        
        if (response.ok) {
          return response;
        }
        
        if (response.status === 402) {
          const currentKey = this.apiKeys[this.currentIndex];
          this.markKeyAsExhausted(currentKey);
          lastError = new Error(`API key ${attempt + 1} reached daily limit`);
          continue;
        }
        
        if (response.status >= 500) {
          lastError = new Error(`Server error (${response.status}) with API key ${attempt + 1}`);
          continue;
        }
        
        if (response.status === 429) {
          const currentKey = this.apiKeys[this.currentIndex];
          this.markKeyAsExhausted(currentKey);
          lastError = new Error(`Rate limit exceeded with API key ${attempt + 1}`);
          continue;
        }
        
        return response;
        
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Network error');
        continue;
      }
    }
    
    throw lastError || new Error('All API keys failed');
  }
}

export const apiKeyManager = new ApiKeyManager(); 