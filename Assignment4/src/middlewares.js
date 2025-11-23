import sharp from 'sharp';
import path from 'path';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  try {
    const filePath = req.file.path;
    const fileExtension = path.extname(filePath);
    const baseName = path.basename(filePath, fileExtension);
    const thumbnailPath = path.join('uploads', baseName + '_thumb.png');

    console.log('Creating thumbnail from:', filePath);
    
    await sharp(filePath)
      .resize(160, 160, {
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy
      })
      .png()
      .toFile(thumbnailPath);

    console.log('Thumbnail created:', thumbnailPath);
    
    req.thumbnail = {
      filename: baseName + '_thumb.png',
      path: thumbnailPath
    };

    next();
  } catch (error) {
    console.error('Error creating thumbnail:', error);
    next(error);
  }
};

export { createThumbnail };
