const express=require('express');
const multer = require('multer');
const {UserRegister, login, update} = require('./Controller/UserReg');
const File=require('./Schema/FileuploadSchema')

const router=express.Router();

router.route('/signup').post(UserRegister);
router.route('/login').post(login);
router.route('/update/:id').put(update)


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage }).array('files', 5);
  
  router.post('/upload', (req, res) => {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
  
      const fileData = req.files.map((file) => {
        return {
          fileName: file.originalname,
          filePath: file.path,
        };
      });
  
      try {
        const newFile = new File({
          files: fileData,
        });
        await newFile.save();
        res.status(201).json({ message: 'Files uploaded and saved to database successfully' });
      } catch (err) {
        res.status(500).json({ error: 'Failed to save files to database' });
      }
    });
  });
  



module.exports=router;