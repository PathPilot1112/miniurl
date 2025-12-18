import mongoose from "mongoose";


const minischema = new mongoose.Schema(
    {
        originalurl:{type:String,
            required:true
        },
        shortcode:{
            type:String,
            unique:true

        },
        clicks:{
            type:Number,
            default:0
        },
        qrCode:{
            type:String
        },
       

    },
    {
        timestamps:true
    }
)

export default mongoose.model('miniurl',minischema)
