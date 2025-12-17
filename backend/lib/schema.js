import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

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

export const miniModel = mongoose.model('miniurl',minischema)
