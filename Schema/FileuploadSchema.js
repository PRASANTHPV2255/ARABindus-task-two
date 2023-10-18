const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  files: [
    {
      fileName: {
        type: String,
        required: true,
      },
      filePath: {
        type: String,
        required: true,
      },
    },
  ],
});

 const File= mongoose.model('File', fileSchema);
 module.exports=File;