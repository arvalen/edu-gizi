import { NextResponse } from 'next/server';
import { getApiKeyStatus } from '../../services/spoonacular';

export async function GET() {
  try {
    const status = getApiKeyStatus();
    return NextResponse.json(status);
  } catch {
    return NextResponse.json(
      { error: 'Failed to get API key status' },
      { status: 500 }
    );
  }
} 