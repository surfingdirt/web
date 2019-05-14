import fs from 'fs';
import path from 'path';

export const assetsRoute = '*.(js|css|html|ico|png|jpg|jpeg|gif)';

// Use gzipped assets for JS, CSS & HTML
// noinspection JSUnresolvedFunction
const Assets = (rootDir) => {
  return (req, res, next) => {
    const gzipName = `${req.url}.gz`;
    const gzipPath = path.join(rootDir, 'dist', gzipName);
    // Check that zipped asset exists
    if (fs.existsSync(gzipPath)) {
      const ext = req.url.match(/[^.]+$/)[0];
      switch (ext) {
        case 'css':
          res.set('Content-Type', 'text/css');
          break;
        case 'js':
          res.set('Content-Type', 'application/js');
          break;
        case 'png':
          res.set('Content-Type', 'image/png');
          break;
        case 'jpg':
        case 'jpeg':
          res.set('Content-Type', 'image/jpeg');
          break;
        case 'gif':
          res.set('Content-Type', 'image/gif');
          break;
        case 'ico':
        default:
          break;
      }
      req.url = gzipName;
      res.set('Content-Encoding', 'gzip');
    }
    next();
  };
};

export default Assets;
