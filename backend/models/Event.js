const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    date:{
        type:Date,
        required:true
    },

    club:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Club"
    }

},{
    timestamps:true
});

module.exports =
mongoose.model("Event",eventSchema);