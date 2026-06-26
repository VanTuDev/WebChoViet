import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'data/sites');
const DB_FILE  = path.resolve(process.cwd(), 'data/db.json');

// ── helpers ───────────────────────────────────────────────────────────────────

async function ensureInit() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DB_FILE);
  } catch {
    await fs.writeFile(DB_FILE, JSON.stringify({ sites: [] }, null, 2), 'utf-8');
  }
}

async function readDB(): Promise<{ sites: Record<string, unknown>[] }> {
  try {
    return JSON.parse(await fs.readFile(DB_FILE, 'utf-8'));
  } catch {
    return { sites: [] };
  }
}

async function writeDB(db: { sites: Record<string, unknown>[] }) {
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
}

let ready = false;

// ── Express Application factory ────────────────────────────────────────────────
// Must use express() (Application), NOT express.Router(), so that res.json() is
// properly augmented before our handlers run.

export function createApiApp(): express.Application {
  const app = express();

  app.use(express.json({ limit: '50mb' }));

  // Lazy-init data directory on first request
  app.use(async (_req, _res, next) => {
    if (!ready) { await ensureInit(); ready = true; }
    next();
  });

  // GET /sites — list all
  app.get('/sites', async (_req, res) => {
    try {
      const db = await readDB();
      res.json(db.sites);
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  });

  // GET /sites/by-slug/:slug — load published site (public)
  app.get('/sites/by-slug/:slug', async (req, res) => {
    try {
      const db = await readDB();
      const site = db.sites.find(s => (s as any).slug === req.params.slug);
      if (!site) return res.status(404).json({ error: 'Not found' });
      res.json(site);
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  });

  // GET /sites/:id — load by id
  app.get('/sites/:id', async (req, res) => {
    try {
      const db = await readDB();
      const site = db.sites.find(s => (s as any).id === req.params.id);
      if (!site) return res.status(404).json({ error: 'Not found' });
      res.json(site);
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  });

  // POST /sites — upsert
  app.post('/sites', async (req, res) => {
    try {
      const site = req.body as Record<string, unknown>;
      const db = await readDB();
      const idx = db.sites.findIndex(s => (s as any).id === site.id);
      if (idx >= 0) {
        db.sites[idx] = site;
      } else {
        db.sites.unshift(site);
      }
      await writeDB(db);
      await fs.writeFile(
        path.join(DATA_DIR, `${site.slug}.json`),
        JSON.stringify(site, null, 2),
        'utf-8',
      );
      res.json(site);
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  });

  // DELETE /sites/:id
  app.delete('/sites/:id', async (req, res) => {
    try {
      const db = await readDB();
      const site = db.sites.find(s => (s as any).id === req.params.id);
      db.sites = db.sites.filter(s => (s as any).id !== req.params.id);
      await writeDB(db);
      if (site) {
        try { await fs.unlink(path.join(DATA_DIR, `${(site as any).slug}.json`)); } catch { /* ignore */ }
      }
      res.json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  });

  // GET /slug-exists/:slug?excludeId=xxx
  app.get('/slug-exists/:slug', async (req, res) => {
    try {
      const db = await readDB();
      const excludeId = req.query.excludeId as string | undefined;
      const match = db.sites.find(s => (s as any).slug === req.params.slug);
      res.json({ exists: !!match && (match as any).id !== excludeId });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  });

  return app;
}
