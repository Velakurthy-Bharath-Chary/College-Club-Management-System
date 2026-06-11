const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({

    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    club:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Club",
        required:true
    },

    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    }

},{
    timestamps:true
});

module.exports =
mongoose.model("Membership",membershipSchema);