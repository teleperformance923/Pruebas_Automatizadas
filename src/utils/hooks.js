import fs from 'fs';
import path from 'path';

export const withScreenshotAlways = (driverRef) => {
  afterEach(async function () {
    try {
      const driver = typeof driverRef === 'function' ? driverRef() : driverRef;
      const dir = path.join(process.cwd(), 'screenshots');
      if (!fs.existsSync(dir)) fs.mkdirSync(dir);
      const safe = this.currentTest?.title?.replace(/\s+/g, '_').replace(/[^\w\-\.]/g, '' ) || 'test';
      const file = path.join(dir, `${Date.now()}_${safe}.png`);
      const image = await driver.takeScreenshot();
      fs.writeFileSync(file, image, 'base64');
      console.log('📸 Captura guardada:', file);
    } catch (e) {
      console.warn('No se pudo guardar captura:', e?.message || e);
    }
  });
};
