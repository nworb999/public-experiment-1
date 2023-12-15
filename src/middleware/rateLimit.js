export function rateLimit(options) {
  const requests = new Map();

  return (req, res, next) => {
    const { limit, windowMs } = options;
    const key = req.ip;
    const currentRequest = requests.get(key) || {
      count: 0,
      startTime: Date.now(),
    };

    if (Date.now() - currentRequest.startTime > windowMs) {
      currentRequest.count = 1;
      currentRequest.startTime = Date.now();
    } else {
      currentRequest.count++;
    }

    if (currentRequest.count > limit) {
      return res.status(429).send("Rate limit exceeded. Try again later.");
    }

    requests.set(key, currentRequest);
    next();
  };
}
