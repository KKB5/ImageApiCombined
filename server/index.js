const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express();
const mycon = require("mysql");

app.use(cors({
    origin: "*",
    credentials: false,
}))




const c = mycon.createConnection({
    host : "localhost",
    // port : 3312,
    user:"root",
    password:"",
    database:"image_api_cache",
});

c.connect(function(err){
    if(err){console.log(err);}
    else{console.log("Database Connected")}
})







const port = 4000

app.get('/images',async (req, res) => {
    // console.log(req)
    const a = req.query
    // console.log(a)
    const query = a.search
    const page = parseInt(a.setpage)
    var found = false

    

    try {

        const getval = (rows) => {
            output = rows;
            console.log(output);

            if(output==1){
                sqldata()
            }
            else{
                searchweb()
            }}

        try{
            c.query("select exists(select * from cache where query=?) as result",[query],(err,result)=>{
                let q =result[0].result
                getval(q)

             });
        }catch (err) {
            console.log("in cat =======>>>", err)
        }

       const sqldata = () =>{ c.query("select data from cache where query=?",[query],(err,result)=>{
            if(err){
                let s = {'status':'error'}
                console.log(err)
            }
            else{
                let s = {'status':'retrived'}
                var da=result[0].data
                var dat=JSON.parse(da)
                console.log(dat)
                res.send(dat)
            }
         }); 
        }


    async function searchweb(){
        const { data: unsplash } = await axios.get(`https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=30&client_id=Cn_bqRB0s8DHvHeLfs_uogIx4N44q_ieLN0tWmG_TB8`)
        const { data:wallhaven } =  await axios.get(` https://wallhaven.cc/api/v1/search?/jXFgk89QABnG6xeFQdVILDqEgUKQJ4Sm&q=${query}&page=${page}`)
        // const { data: pixel } = await axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=30&page=${page}`, {
        //     headers: {
        //         'Authorization': '563492ad6f917000010000017f16b51dd9804727b5ed8be011a08538',
        //     }
        // })

        // const { data: pixarbay } = await axios.get(` https://pixabay.com/api/?key=30253799-9a850c07eb3513db3ee8b2c57&q=${query}&image_type=photo&pretty=true&page=${page}&per_page=30`)
        var data1 = {unsplash,wallhaven}
        let data = JSON.stringify(data1)
        {console.log(data)}
    
        c.query("insert into cache(query,data)values(?,?)", [query, data], (err, result) => {
            if (err) {
                let s = { 'status': 'error' }
                console.log(err)
            }
            else {
                let s = { 'status': 'inserted' }

                console.log(s)
            }
        })
    


        
        // console.log({pixel,unsplash,pixarbay,wallhaven});

        res.send({
            // pixel,
            unsplash,
            // pixarbay,
            wallhaven,
            // websearch,
            // Bing
        })
    }
        
        

    } catch (err) {
        console.log("in get =======>>>", err)
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

































// app.get('/images',async (req, res) => {
//     // console.log(req)
//     const a = req.query
//     // console.log(a)
//     const query = a.search
//     const page = parseInt(a.setpage)
//     var found = false
//     try {
//        function found(){

//         try{
//             c.query("select * from cache where query=?",[query],(err,result)=>{
//                 let q =result[0].query

//                 console.log(q)

                // if(q==query){
                //     // var found = true
                //     c.query("select data from cache where query=?",[query],(err,result)=>{
                //         if(err){
                //             let s = {'status':'error'}
                //             console.log(err)
                //         }
                //         else{
                //             let s = {'status':'retrived'}
                //             var da=result[0].data
                //             var dat=JSON.parse(da)
                //             console.log(dat)
                //             res.send(dat)
                //         }
                //      }); 
                     
//                 }
//                 else{
//                     var found = false
//                 }
//              });
//         }catch (err) {
//             console.log("in cat =======>>>", err)
//         }
//         return false
//        }
//        var fou = found()
//        console.log(fou)

        
        
        
//         if(fou==true){


//             const { data: unsplash } = await axios.get(`https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=30&client_id=Cn_bqRB0s8DHvHeLfs_uogIx4N44q_ieLN0tWmG_TB8`)
//             var data1 = {unsplash}
//             let data = JSON.stringify(data1)
//             // c.query("insert into cache(query,data)values(?,?)",[query,data],(err,result)=>{
//             //     if(err){
//             //         let s = {'status':'error'}
//             //         console.log(err)
//             //     }
//             //     else{
//             //         let s = {'status':'inserted'}
//             //         console.log(s)
//             //     }
//             //     })

//             res.send({
//             // pixel,
//             unsplash,
//             // pixarbay,
//             // wallhaven,
//             // websearch,
//             // Bing
//         })

//         }
        
//     //     const { data: pixel } = await axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=30&page=${page}`, {
//     //         headers: {
//     //             'Authorization': '563492ad6f917000010000017f16b51dd9804727b5ed8be011a08538',
//     //         }
//     //     })

//     //     const { data: pixarbay } = await axios.get(` https://pixabay.com/api/?key=30253799-9a850c07eb3513db3ee8b2c57&q=${query}&image_type=photo&pretty=true&page=${page}&per_page=30`)

//     //     const { data:wallhaven } =  await axios.get(` https://wallhaven.cc/api/v1/search?/jXFgk89QABnG6xeFQdVILDqEgUKQJ4Sm&q=${query}&page=${page}`)
        
//     //     const { data:websearch } = await axios.get(`https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=${query}&pageNumber=${page}&pageSize=20`,{ headers: {
//     //         'X-RapidAPI-Key': '535ff34ad2msh5d9b6a6eabddb9cp140b1ajsn925068082df2',
//     //         'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
//     // }})

//     // const { data:Bing } = await axios.get(`https://bing-image-search1.p.rapidapi.com/images/search?q=${query}&count=20&offset=${page-1}`,
//     // { headers: {
//     //         'X-RapidAPI-Key': '535ff34ad2msh5d9b6a6eabddb9cp140b1ajsn925068082df2',
//     //         'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com'
//     // }})
       

//     // var data1 = {unsplash}
//     // let data = JSON.stringify(data1)

//     // {console.log(data)}
    
//     // c.query("insert into cache(query,data)values(?,?)",[query,data],(err,result)=>{
//     //     if(err){
//     //         let s = {'status':'error'}
//     //         console.log(err)
//     //     }
//     //     else{
//     //         let s = {'status':'inserted'}


//     //         console.log(s)
//     //     }
//     // })
    


        
//     //     console.log({pixel,unsplash,pixarbay,wallhaven});

//     //     res.send({
//     //         // pixel,
//     //         unsplash,
//     //         // pixarbay,
//     //         // wallhaven,
//     //         // websearch,
//     //         // Bing
//     //     })

//     } catch (err) {
//         console.log("in get =======>>>", err)
//     }

// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })




























