export default (a, b) => new Date(b.incurredAt || b.createdAt) - new Date(a.incurredAt || a.createdAt);
