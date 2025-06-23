import { NextRequest, NextResponse } from 'next/server';
import { apiKeyManager } from '../../../lib/api-key-manager';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';
  const offset = searchParams.get('offset') || '0';
  const number = searchParams.get('number') || '20';

  const url = `https://api.spoonacular.com/food/ingredients/search?query=${encodeURIComponent(query)}&number=${number}&offset=${offset}&metaInformation=true`;

  try {
    const response = await apiKeyManager.makeRequest(url);
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch ingredients data' },
      { status: 500 }
    );
  }
} 