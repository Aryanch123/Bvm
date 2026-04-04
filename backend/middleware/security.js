const parseMs = (value, fallback) => {
    if (!value) return fallback;
    const trimmed = String(value).trim().toLowerCase();
    if (/^\d+$/.test(trimmed)) return Number(trimmed);

    const match = trimmed.match(/^(\d+)(ms|s|m|h)$/);
    if (!match) return fallback;

    const amount = Number(match[1]);
    const unit = match[2];
    if (unit === 'ms') return amount;
    if (unit === 's') return amount * 1000;
    if (unit === 'm') return amount * 60 * 1000;
    if (unit === 'h') return amount * 60 * 60 * 1000;
    return fallback;
};

const createRateLimiter = ({ windowMs, maxRequests, message }) => {
    const hits = new Map();

    return (req, res, next) => {
        const now = Date.now();
        const forwardedFor = req.headers['x-forwarded-for'];
        const ip = typeof forwardedFor === 'string'
            ? forwardedFor.split(',')[0].trim()
            : req.ip || req.socket?.remoteAddress || 'unknown';

        const current = hits.get(ip);
        if (!current || current.resetAt <= now) {
            hits.set(ip, { count: 1, resetAt: now + windowMs });
            return next();
        }

        if (current.count >= maxRequests) {
            res.setHeader('Retry-After', Math.ceil((current.resetAt - now) / 1000));
            return res.status(429).json({ success: false, message });
        }

        current.count += 1;
        next();
    };
};

const setSecurityHeaders = (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    res.setHeader('X-DNS-Prefetch-Control', 'off');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

    if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }

    next();
};

const buildAllowedOrigins = () => {
    const origins = new Set();
    const primary = process.env.FRONTEND_URL;
    const extras = process.env.ADDITIONAL_ALLOWED_ORIGINS;

    if (primary) origins.add(primary.trim());
    if (extras) {
        extras.split(',').map((origin) => origin.trim()).filter(Boolean).forEach((origin) => origins.add(origin));
    }

    if (process.env.NODE_ENV !== 'production') {
        ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'].forEach((origin) => origins.add(origin));
    }

    return origins;
};

const isAllowedOrigin = (origin, allowedOrigins) => {
    if (!origin) return true;
    if (allowedOrigins.has(origin)) return true;
    return process.env.NODE_ENV !== 'production' && origin.endsWith('.trycloudflare.com');
};

module.exports = {
    buildAllowedOrigins,
    createRateLimiter,
    isAllowedOrigin,
    parseMs,
    setSecurityHeaders,
};
