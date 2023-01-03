const axios = require('axios')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const Item =  require('../models/itemModel')

const url = 'https://www.billabong.com/mens-tshirts/'
const itemsArr = []
async function getScrapedData(){
    console.log("-------------------")
    axios(url).then(response =>{
        const html =  response.data
        const $ =  cheerio.load(html)

        $('.producttileinner' ,html).each(function(){
            const tempTitle = $(this).find('img').attr('aria-labelledby')
            const tempPrice = $(this).find('.salesprice').text()
            const imgSrc1 = $(this).find('img').attr('src')
            const imgSrc2 = imgSrc1.replace("frt" ,"bck")


            const price =  tempPrice.replace(/\n/g, '').replace("$","").trim()
            const title = tempTitle.replace('View Product ','')
            if(title !== "" && price !== "" && imgSrc1 !== ""){
                itemsArr.push({
                    title,
                    price,
                    imgSrc1,
                    imgSrc2
                })
            }
        })   
        itemsArr.forEach(item => {
            postItem(item)
        });

        async function postItem(item){
            mongoose.connect(process.env.MONGO_URI)
            const myItem = new Item({
                title:item.title,
                price:item.price,
                imgPath1:item.imgSrc1,
                imgPath2:item.imgSrc2,
                scrippedSiteName:'BILLABONG',
                brand:'BILLABONG',
                date:Date.now()
            })
            await myItem.save()
        }
    });  
} 
module.exports = getScrapedData