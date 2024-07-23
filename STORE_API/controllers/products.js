

const Product = require('../model/modelProducts')


const getAllProductsStatic = async(req,res)=>{
   // throw new Error('Testing async errors')

//    const products = await Product.find({featured: true})
//     const search ="ab"
//    const products = await Product.find({ $regex: search, $options: 'i'})
//    const products = await Product.find({ $regex: search, $options: 'i'})
 //  const products = await Product.find({}).sort('-name price') //sorting name and price, negative sign for z-a and desc to asc
//   const products = await Product.find({}).select('name price') 
  const products = await Product.find({price: {$gt: 30}}).sort('price').select('name price').limit(10).skip(4) //skips the documents by number present in skip()
    res.status(200).json({products, nbHits: products.length})
}
const getAllProducts = async(req,res)=>{
    //console.log(req.query)
    const {featured, company, name, sort, fields, numericFilters} = req.query

    const queryObject = {}

    if(featured){
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = { $regex: name, $options: 'i'} //$options: i means case insensitive
    }
    if(numericFilters){
        //console.log(numericFilters)  //price>40,rating>=4
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;

        let filters = numericFilters.replace(regEx, (match)=>`-${operatorMap[match]}-`)
        //console.log(filters)  //price-$gt-40,rating-$gte-4
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item)=>{
            const [field, operator, value] = item.split('-')
            console.log(field, operator, value)
            if(options.includes(field)){
                // { [operator] : Number(value) }: This creates an object with a dynamic key (the value of operator) and assigns it the numeric value of value. The square brackets [ ] are used for computed property names in JavaScript, allowing the key to be set dynamically.
                queryObject[field] = { [operator] : Number(value)}
                
            }
        })
    }

    console.log(queryObject)
    let result =  Product.find(queryObject) // no await because to sort we need to chain the .sort() on a query object but with await .find() is sending the list of documents found
    //we cannot add sort() to a list of documents, we need to add it to a query object only so await shoould be removed
    //console.log("r::",result)
    if(sort){
       const sortList = sort.split(',').join(' ') // when user sends sort=name,price but syntax should be sort('name price') and not sort('name,price')
       result = result.sort(sortList)
    }
    else{
        result = result.sort('createdAt') //when user doesnt send sort value, sort it by date of insertion
    }
    //show only the selected fields
    if(fields){
        const fieldsList = fields.split(',').join(' ') 
        result = result.select(fieldsList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1) * limit

    result = result.skip(skip).limit(limit)


    const products = await result // at last await for the query object to change into a list of docments that match the find filter and that are sorted as per the sort value
    //console.log(products)
    res.status(200).json({products, nbHits: products.length})
}

module.exports = {getAllProductsStatic, getAllProducts}