
const {model, Schema} = require('mongoose');
const slugify = require('slugify')
const DOCUMENT_NAME ='Product'
const COLLECTION_NAME = 'products'

const product_options_schema ={
    thumb:String,
    k:String,
    v:String,
    price:String,
    quantity:String
}

const productSchema = new Schema({
    product_name:{type:String, required:true},
    product_thumb:{type:String, required:true},
    product_description:String,
    product_slug:String,
    product_price:{type:String,required:true},
    product_quantity:{type:String,required:true},
    product_type:{type:String,required:true, enum:['Electronics','Clothing','Furniture']},
    product_shop:{type:Schema.Types.ObjectId, ref:'Shop'},
    product_attributes:{type:Schema.Types.Mixed, required:true},
    product_options:[product_options_schema],
    // more 

    product_ratingAverage:{
        type:Number,
        default:4.5,
        min:[1,'Rating must be above 1.0'],
        max:[5,'Rating must be above 5.0'],
        set:(val) =>Math.round(val *10) /10
    },
    product_variation:{type:Array, default:[]},
    isDraft:{type:Boolean,default:true,index:true,select:false},
    isPublished:{type:Boolean,default:false,index:true,select:false},
},{
    collection: COLLECTION_NAME,
    timestamps:true,
})



// Document middleware: runs before .save() and .create()...
productSchema.pre('save',function(next){
    this.product_slug = slugify(this.product_name, {lower:true})
    next()
})


const clothingSchema = new Schema({
    brand:{type:String,require:true},
    size:String,
    material:String,
    gender:{type:String,required:true, enum:['Male','Female','Unisex']},
    product_shop:{type:Schema.Types.ObjectId, ref:'Shop'},
},{
    collection:'clothes',
    timestamps:true
})

const electronicSchema = new Schema({
    manufacturer:{type:String,require:true},
    model:String,
    color:String,
    display_size:String,
    connectivity:String,
    battery_capacity:String,
    storage_capacity:String,
    product_shop:{type:Schema.Types.ObjectId, ref:'Shop'},
},{
    collection:'electronics',
    timestamps:true
})
const furnitureSchema = new Schema({
    brand:{type:String,require:true},
    size:String,
    material:String,
    brand:String,
    style:String,
    weight:Number,
    product_shop:{type:Schema.Types.ObjectId, ref:'Shop'},
},{
    collection:'furniture',
    timestamps:true
})
module.exports ={
    product: model(DOCUMENT_NAME,productSchema),
    electronic:model('Electronics',electronicSchema),
    clothing:model('Clothing',clothingSchema),
    furniture:model('Furniture',furnitureSchema)
};

