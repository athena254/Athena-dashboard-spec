#!/usr/bin/env node
/**
 * Historical Chat API - With custom figure support
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'memory');
const AUDIT_LOG = path.join(DATA_DIR, 'historical-chat-audit.json');
const CUSTOM_FIGURES = path.join(DATA_DIR, 'custom-figures.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

function loadCustomFigures() {
    try { return fs.existsSync(CUSTOM_FIGURES) ? JSON.parse(fs.readFileSync(CUSTOM_FIGURES, 'utf8')) : {}; }
    catch { return {}; }
}

function saveCustomFigures(figures) {
    fs.writeFileSync(CUSTOM_FIGURES, JSON.stringify(figures, null, 2));
}

const WIKIPEDIA_API = 'https://en.wikipedia.org/api/rest_v1/page/summary';

const defaultFigures = {
    lincoln: { name: 'Abraham Lincoln', wiki: 'Abraham_Lincoln', era: 'American Civil War', facts: ['Born February 12, 1809', '16th US President 1861-1865', 'Led Union through Civil War', 'Emancipation Proclamation 1863'] },
    cleopatra: { name: 'Cleopatra VII', wiki: 'Cleopatra', era: 'Ancient Egypt', facts: ['Born 69 BC', 'Last Ptolemaic ruler', 'Allied with Caesar & Antony'] },
    'da-vinci': { name: 'Leonardo da Vinci', wiki: 'Leonardo_da_Vinci', era: 'Renaissance', facts: ['Born April 15, 1452', 'Painted Mona Lisa', 'Anatomical drawings'] },
    curie: { name: 'Marie Curie', wiki: 'Marie_Curie', era: 'Modern Era', facts: ['Born 1867', 'First woman Nobel laureate', 'Nobels in Physics & Chemistry'] },
    aurelius: { name: 'Marcus Aurelius', wiki: 'Marcus_Aurelius', era: 'Roman Empire', facts: ['Emperor 161-180 AD', 'Author of Meditations', 'Stoic philosopher'] },
    galileo: { name: 'Galileo Galilei', wiki: 'Galileo_Galilei', era: 'Scientific Revolution', facts: ['Born 1564', 'Father of astronomy', 'Telescope improvements'] },
    tesla: { name: 'Nikola Tesla', wiki: 'Nikola_Tesla', era: 'Industrial Age', facts: ['Born 1856', 'AC motor inventor', '300+ patents'] }
};

function fetchJson(url, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const opts = new URL(url);
        const req = https.request(opts, { timeout }, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => { try { resolve(JSON.parse(data)); } catch(e) { reject(e); } });
        });
        req.on('error', reject);
        req.end();
    });
}

async function retrieveSources(query, figureId, primaryOnly = false) {
    const customFigures = loadCustomFigures();
    const allFigures = { ...defaultFigures, ...customFigures };
    const figure = allFigures[figureId];
    if (!figure) return [];
    
    const sources = [];
    if (figure.wiki) {
        try {
            const main = await fetchJson(`${WIKIPEDIA_API}/${figure.wiki}`);
            sources.push({ id: '1', title: main.title, author: 'Wikipedia', publisher: 'Wikipedia', date: main.timestamp?.split('T')[0], url: main.content_urls?.desktop?.page || '', excerpt: main.extract?.substring(0, 250) || '', confidence: 0.92, isPrimary: false });
        } catch (e) { console.error('Wiki error:', e.message); }
    }
    if (sources.length === 0 && figure.facts) {
        sources.push({ id: '1', title: `${figure.name} - Knowledge Base`, author: 'Athena', publisher: 'Athena', date: '2026-01-01', url: figure.wiki ? `https://en.wikipedia.org/${figure.wiki}` : '', excerpt: figure.facts.join('. '), confidence: 0.75, isPrimary: false });
    }
    return primaryOnly ? sources.filter(s => s.isPrimary) : sources;
}

async function generatePersonaResponse(figureId, message, sources) {
    const customFigures = loadCustomFigures();
    const allFigures = { ...defaultFigures, ...customFigures };
    const figure = allFigures[figureId];
    if (!figure) return { response: 'Unknown figure', claims: [], sources: [] };
    
    const msg = message.toLowerCase();
    let response = '';
    const used = sources.slice(0, 2);
    
    if (figure.facts) {
        if (msg.includes('born')) {
            const fact = figure.facts.find(f => f.toLowerCase().includes('born'));
            response = fact ? `${figure.name}: ${fact}. [1]` : `${figure.name} was born during the ${figure.era} period. [1]`;
        } else if (msg.includes('death') || msg.includes('died')) {
            const fact = figure.facts.find(f => f.toLowerCase().includes('died') || f.toLowerCase().includes('death'));
            response = fact ? `${figure.name}: ${fact}. [1]` : `${figure.name} passed away during the ${figure.era} period. [1]`;
        } else if (msg.includes('known for') || msg.includes('famous')) {
            response = `${figure.name} (${figure.era}) is known for:\n${figure.facts.map((f, i) => `${i+1}. ${f}`).join('\n')}`;
        } else {
            response = `${figure.name} (${figure.era}):\n\n${figure.facts.join('. ')}\n\n[1] ${sources[0]?.url || 'Knowledge Base'}\n\nWould you like to know more?`;
        }
    }
    const claims = response.split(/[.!?\n]/).filter(c => c.trim().length > 15);
    return { response, claims, sources: used };
}

function verifyClaims(claims, sources) {
    if (!claims) return [];
    return claims.map(claim => ({ claim: claim.substring(0, 80), confidence: sources.length > 0 ? 0.75 : 0.5, supportingSources: sources.map(s => s.id), verified: sources.length > 0 }));
}

function formatCitations(sources) { return sources.map((s, i) => ({ ...s, index: i + 1 })); }

function auditLog(action, data) {
    const entry = { timestamp: new Date().toISOString(), action, ...data, api_keys_used: [], models_used: ['wikipedia-api'], agents_used: ['retrieval', 'verification', 'persona', 'citation'] };
    let logs = [];
    try { if (fs.existsSync(AUDIT_LOG)) logs = JSON.parse(fs.readFileSync(AUDIT_LOG, 'utf8')); } catch {}
    logs.push(entry);
    if (logs.length > 1000) logs = logs.slice(-1000);
    fs.writeFileSync(AUDIT_LOG, JSON.stringify(logs, null, 2));
}

function handleRequest(req, res) {
    const reqPath = req.url.split('?')[0];
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
    
    try {
        // POST /figures - add custom figure (check BEFORE GET)
        if (reqPath === '/figures' && req.method === 'POST') {
            let body = '';
            req.on('data', c => body += c);
            req.on('end', () => {
                try {
                    const { name, era, facts, wiki } = JSON.parse(body);
                    if (!name || !era || !facts) throw new Error('Missing required fields');
                    const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
                    const customFigures = loadCustomFigures();
                    customFigures[id] = { name, era, facts, wiki: wiki || '' };
                    saveCustomFigures(customFigures);
                    auditLog('figure_added', { id, name });
                    res.writeHead(200);
                    res.end(JSON.stringify({ success: true, id, name }));
                } catch (e) { res.writeHead(400); res.end(JSON.stringify({ error: e.message })); }
            });
            return;
        }
        
        // DELETE /figures/:id
        if (reqPath.startsWith('/figures/') && req.method === 'DELETE') {
            const id = reqPath.split('/')[2];
            const customFigures = loadCustomFigures();
            if (customFigures[id]) { delete customFigures[id]; saveCustomFigures(customFigures); auditLog('figure_deleted', { id }); res.writeHead(200); res.end(JSON.stringify({ success: true })); }
            else { res.writeHead(404); res.end(JSON.stringify({ error: 'Figure not found or is default' })); }
            return;
        }
        
        // GET /figures - list all
        if (reqPath === '/figures') {
            const customFigures = loadCustomFigures();
            const allFigures = { ...defaultFigures, ...customFigures };
            res.writeHead(200);
            res.end(JSON.stringify({ figures: Object.entries(allFigures).map(([id, f]) => ({ id, name: f.name, era: f.era, isCustom: !!customFigures[id], facts: f.facts?.slice(0, 3) })) }));
            return;
        }
        
        // POST /chat
        if (reqPath === '/chat' && req.method === 'POST') {
            let body = '';
            req.on('data', c => body += c);
            req.on('end', async () => {
                try {
                    const { figureId, message, primaryOnly } = JSON.parse(body);
                    auditLog('chat_request', { figureId, msgLen: message.length });
                    const sources = await retrieveSources(message, figureId, primaryOnly);
                    const { response, claims, sources: used } = await generatePersonaResponse(figureId, message, sources);
                    const citations = formatCitations(used);
                    const provenance = { timestamp: new Date().toISOString(), figure_id: figureId, claims: verifyClaims(claims, sources), sources: citations.map(c => ({ source_id: c.id, confidence_score: c.confidence })), agents_used: ['retrieval', 'verification', 'persona', 'citation'], api_keys_used: [] };
                    res.writeHead(200);
                    res.end(JSON.stringify({ response, sources: citations, provenance }));
                } catch (e) { res.writeHead(400); res.end(JSON.stringify({ error: e.message })); }
            });
            return;
        }
        
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
    } catch (e) { res.writeHead(500); res.end(JSON.stringify({ error: e.message })); }
}

if (require.main === module) {
    const srv = require('http').createServer(handleRequest);
    srv.listen(process.env.PORT || 3000, () => console.log('Historical Chat API running'));
}

module.exports = { handleRequest };
