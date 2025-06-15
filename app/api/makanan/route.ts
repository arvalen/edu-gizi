import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';
  const offset = searchParams.get('offset') || '0';
  const number = searchParams.get('number') || '20';

  const url = `https://api.spoonacular.com/food/ingredients/search?apiKey=${apiKey}&query=${encodeURIComponent(query)}&number=${number}&offset=${offset}&metaInformation=true`;

  const response = await fetch(url);
  const data = await response.json();
  return NextResponse.json(data);
} 