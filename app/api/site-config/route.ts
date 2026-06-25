import { NextRequest, NextResponse } from 'next/server';
import type { SiteConfig } from '@/src/types';
import { getSiteConfigs, saveSiteConfig, deleteSiteConfig } from '@/lib/db';

/**
 * GET /api/site-config
 * Query params: 
 *   - id: get specific site by ID
 *   - slug: get specific site by slug
 *   - (none): list all sites
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    const db = await getSiteConfigs();

    if (id) {
      const site = db.find(c => c.id === id) || null;
      return NextResponse.json(site);
    }

    if (slug) {
      const site = db.find(c => c.slug === slug) || null;
      return NextResponse.json(site);
    }

    return NextResponse.json(db);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * POST /api/site-config
 * Inserts or updates a site configuration
 */
export async function POST(request: NextRequest) {
  try {
    const config = (await request.json()) as SiteConfig;
    if (!config || !config.id) {
      return NextResponse.json({ error: 'Invalid configuration data' }, { status: 400 });
    }

    const saved = await saveSiteConfig(config);
    return NextResponse.json(saved);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * DELETE /api/site-config?id=...
 * Deletes a site configuration by ID
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing site ID' }, { status: 400 });
    }

    const success = await deleteSiteConfig(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
