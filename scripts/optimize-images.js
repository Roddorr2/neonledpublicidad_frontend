const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Carpetas a procesar, con su ancho máximo objetivo.
// Ajusta los anchos según el tamaño real en pantalla de cada uso.
const TARGETS = [
  { dir: 'productosPrincipal', width: 800 },   // tarjetas de producto
  { dir: 'productosIndividuales', width: 1000 },
  { dir: 'image-home', width: 900 },           // capturas de celular en slider/mockups
  { dir: 'header_footer', width: 64 },         // iconos redes sociales
  { dir: 'home', width: 900 },
  { dir: 'productos', width: 800 },
  { dir: 'testimonials', width: 400 },
  { dir: 'nosotros', width: 900 },
];

const QUALITY = 78;
const VALID_EXT = /\.(webp|jpg|jpeg|png)$/i;

async function optimizeFile(filePath, maxWidth) {
  const before = fs.statSync(filePath).size;
  const buffer = await fs.promises.readFile(filePath);

  const outBuffer = await sharp(buffer)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer();

  // Sobreescribe en el mismo lugar. Si el original no era .webp,
  // cambia la extensión (y hay que actualizar el código que lo referencia).
  const outPath = filePath.replace(VALID_EXT, '.webp');
  await fs.promises.writeFile(outPath, outBuffer);

  // Si cambiamos la extensión (ej. .png -> .webp), borra el original.
  if (outPath !== filePath) {
    await fs.promises.unlink(filePath);
  }

  const after = fs.statSync(outPath).size;
  const savedPct = (((before - after) / before) * 100).toFixed(1);
  console.log(
    `${path.relative(PUBLIC_DIR, outPath)}: ${(before / 1024).toFixed(1)} KiB -> ${(after / 1024).toFixed(1)} KiB (-${savedPct}%)`
  );
}

async function walk(dir, maxWidth) {
  if (!fs.existsSync(dir)) {
    console.log(`Carpeta no encontrada, se omite: ${dir}`);
    return;
  }
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, maxWidth); // procesa subcarpetas también
    } else if (VALID_EXT.test(entry.name)) {
      await optimizeFile(full, maxWidth);
    }
  }
}

(async () => {
  for (const { dir, width } of TARGETS) {
    await walk(path.join(PUBLIC_DIR, dir), width);
  }
})();