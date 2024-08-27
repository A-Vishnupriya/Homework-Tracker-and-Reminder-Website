const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://priyaalwal123:5SXE0tSAd5y05UJR@tasktracker.cpfkdtv.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log(`connection successful`);
}).catch((e)=>{
    console.log(e);

    // 5SXE0tSAd5y05UJR
})