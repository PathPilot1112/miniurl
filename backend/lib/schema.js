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
            type:Number
        }

    },
    {
        timestamps:true
    }
)

export default mongoose.model('miniurl',minischema)
