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

// ══════════════════════════════════════════════════════════════════════════════
// ANALYTICS ENDPOINTS — CẦN BUILD THÊM VÀO createApiApp() Ở TRÊN
// ══════════════════════════════════════════════════════════════════════════════
//
// Cấu trúc file: data/analytics/[slug].json
// {
//   "slug": "my-coffee",
//   "daily": {
//     "2026-06-26": {
//       "views": 45,
//       "uniqueVisitors": 32,
//       "sessionIds": ["uuid1", "uuid2"],   ← dedup để đếm unique
//       "clicks": 12,
//       "totalSessions": 30,
//       "totalTimeSeconds": 2610,
//       "devices": { "mobile": 24, "tablet": 4, "desktop": 4 }
//     }
//   },
//   "interactions": {
//     "phone": 136,
//     "social-fb": 68,
//     "map": 51
//   }
// }
//
// ── POST /analytics/track ─────────────────────────────────────────────────────
// Body: TrackEvent (xem src/services/analyticsService.ts)
//
// app.post('/analytics/track', async (req, res) => {
//   const { slug, type, sessionId, data } = req.body;
//   const file = path.resolve(cwd, `data/analytics/${slug}.json`);
//   await fs.mkdir(path.resolve(cwd, 'data/analytics'), { recursive: true });
//
//   let db = { slug, daily: {}, interactions: {} };
//   try { db = JSON.parse(await fs.readFile(file, 'utf-8')); } catch { }
//
//   const today = new Date().toISOString().slice(0, 10);
//   if (!db.daily[today]) {
//     db.daily[today] = {
//       views: 0, uniqueVisitors: 0, sessionIds: [],
//       clicks: 0, totalSessions: 0, totalTimeSeconds: 0,
//       devices: { mobile: 0, tablet: 0, desktop: 0 },
//     };
//   }
//   const day = db.daily[today];
//
//   if (type === 'pageview') {
//     day.views++;
//     if (!day.sessionIds.includes(sessionId)) {
//       day.sessionIds.push(sessionId);
//       day.uniqueVisitors = day.sessionIds.length;
//     }
//     const dt = data?.deviceType ?? 'desktop';
//     day.devices[dt] = (day.devices[dt] ?? 0) + 1;
//   }
//   if (type === 'click') {
//     day.clicks++;
//     const label = data?.element ?? 'unknown';
//     db.interactions[label] = (db.interactions[label] ?? 0) + 1;
//   }
//   if (type === 'session_end') {
//     day.totalSessions++;
//     day.totalTimeSeconds += data?.durationSeconds ?? 0;
//   }
//
//   await fs.writeFile(file, JSON.stringify(db, null, 2), 'utf-8');
//   res.json({ ok: true });
// });
//
// ── GET /analytics/:slug?days=7 ───────────────────────────────────────────────
// Trả về SlugAnalytics (xem src/services/analyticsService.ts)
//
// app.get('/analytics/:slug', async (req, res) => {
//   const { slug } = req.params;
//   const days = Number(req.query.days ?? 7);
//   const file = path.resolve(cwd, `data/analytics/${slug}.json`);
//
//   let db = { slug, daily: {}, interactions: {} };
//   try { db = JSON.parse(await fs.readFile(file, 'utf-8')); } catch { }
//
//   // Tạo mảng N ngày gần nhất (kể cả ngày không có data → 0)
//   const dailyArr = [];
//   const today = new Date();
//   for (let i = days - 1; i >= 0; i--) {
//     const d = new Date(today);
//     d.setDate(d.getDate() - i);
//     const dateStr = d.toISOString().slice(0, 10);
//     const rec = db.daily[dateStr];
//     dailyArr.push({
//       date: dateStr,
//       views: rec?.views ?? 0,
//       uniqueVisitors: rec?.uniqueVisitors ?? 0,
//       clicks: rec?.clicks ?? 0,
//       avgTimeSeconds: rec?.totalSessions
//         ? Math.round(rec.totalTimeSeconds / rec.totalSessions)
//         : 0,
//     });
//   }
//
//   // Tổng hợp
//   const total = dailyArr.reduce((acc, d) => ({
//     views: acc.views + d.views,
//     uniqueVisitors: acc.uniqueVisitors + d.uniqueVisitors,
//     clicks: acc.clicks + d.clicks,
//   }), { views: 0, uniqueVisitors: 0, clicks: 0 });
//   const avgTimeSeconds = Math.round(
//     dailyArr.reduce((s, d) => s + d.avgTimeSeconds, 0) / (dailyArr.length || 1)
//   );
//
//   // Top interactions
//   const topInteractions = Object.entries(db.interactions)
//     .sort(([, a], [, b]) => b - a)
//     .slice(0, 5)
//     .map(([element, count]) => ({ element, label: element, count }));
//
//   // Device breakdown (% từ tất cả daily)
//   const allDays = Object.values(db.daily);
//   const devTotals = allDays.reduce(
//     (acc, d) => ({
//       mobile: acc.mobile + (d.devices?.mobile ?? 0),
//       tablet: acc.tablet + (d.devices?.tablet ?? 0),
//       desktop: acc.desktop + (d.devices?.desktop ?? 0),
//     }),
//     { mobile: 0, tablet: 0, desktop: 0 }
//   );
//   const devTotal = devTotals.mobile + devTotals.tablet + devTotals.desktop || 1;
//   const deviceBreakdown = {
//     mobile: Math.round((devTotals.mobile / devTotal) * 100),
//     tablet: Math.round((devTotals.tablet / devTotal) * 100),
//     desktop: Math.round((devTotals.desktop / devTotal) * 100),
//   };
//
//   res.json({ slug, total: { ...total, avgTimeSeconds }, daily: dailyArr, topInteractions, deviceBreakdown });
// });
// ══════════════════════════════════════════════════════════════════════════════
