export default function (req, res, next) {
  try {
    const url = req.originalUrl;
    if (!url.includes("auth")) return next();
    if (req.token) return next();
    res.status(401).json({ err: "The req is not authorizated" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
}
