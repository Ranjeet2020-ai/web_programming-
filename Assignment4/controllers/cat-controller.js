let cats = [];

const getCats = (req, res) => {
  res.json(cats);
};

const getCat = (req, res) => {
  const cat = cats.find(c => c.id === parseInt(req.params.id));
  if (cat) {
    res.json(cat);
  } else {
    res.status(404).json({ error: 'Cat not found' });
  }
};

const postCat = (req, res) => {
  console.log('Form data:', req.body);
  console.log('File data:', req.file);
  console.log('Thumbnail data:', req.thumbnail);

  try {
    const { title, user_id } = req.body;
    
    if (!title || !user_id) {
      return res.status(400).json({ error: 'Title and user_id are required' });
    }

    const newCat = {
      id: cats.length + 1,
      title: title,
      user_id: parseInt(user_id),
      filename: req.file ? req.file.filename : null,
      thumbnail: req.thumbnail ? req.thumbnail.filename : null,
      created_at: new Date().toISOString()
    };

    cats.push(newCat);
    
    res.status(201).json({ 
      message: 'Cat created successfully', 
      data: newCat 
    });
  } catch (error) {
    console.error('Error creating cat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const putCat = (req, res) => {
  res.json({ message: 'Update cat' });
};

const deleteCat = (req, res) => {
  res.status(204).send();
};

export { getCats, getCat, postCat, putCat, deleteCat };
