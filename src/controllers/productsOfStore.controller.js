/**
 * Created by Jamshaid
 */


//import mongoose and models
var mongoose = require('mongoose')

var config = require('dotenv').config()
//var notificationCtrl = require("./notifications.controller")

//Lodash for data manipulation
const _ = require('lodash')

//bluebird for promises
const promise = require('bluebird')

//async for async tasks
var async = require('async')

const productsOfStoreHelper = require('../helpers/productsOfStore.helper')
const Store = mongoose.model('stores')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createProductsOfStore = async (req, res) => {
    console.log('createProductsOfStore')
    try {
        var productsOfStoreData = req.body
        var role = req.token_decoded.r
        productsOfStoreData.addedby = req.token_decoded.d
        var result
        /* let allproducts = [
            {
              "nameofProduct": "Hemp Webbing Belt ",
              "category": "Clothing",
              "subCategory": "Men",
              "section": "Accessories",
              "productLink": "https://rawganique.com/collections/hemp-belts/products/hemp-webbing-belt-pascal",
              "titleofProduct": "PASCAL 100% Hemp Webbing Belt",
              "price": "21",
              "currency" : "Pond",
              "description": "No-frills, simple, pure 100% organically grown hemp webbing belt. Bronze-style metal buckle and rivet (nickel made to look like aged bronze). 1.25\" width. Plastic-free. 23\" - 44\" waist sizes\n100% Hemp Webbing Belt\nThe perfect eco-friendly, 100% organic hemp belt, 21 years in the making. Made in-house in Europe from start to finish. Featuring iron fittings, styled with bronze finish. As pure as a belt can be. Animal-free. Biodegradable.  \n\nStyle: Hemp webbing belt\n\nMaterial: 100% organic European hemp. The metal fittings & grommets are made of iron with bronze effect finish.\n\nSizes: 1.25\" wide. Up to 33\", 38\", 44\" waist\n\nColor: Natural (unbleached, dye-free), Black (low-impact, biodegradable fiber-reactive eco-dyed)\n\nWhere is it made? Made at Rawganique Atelier in Europe\n\nFeatures:\n\nVery strong hemp webbing\nIron grommets with bronze effect finish\nSweatshop-free. Vegan. Leather-free.\nAll of our products are free from forever chemicals like PFAS\nBiodegradable. Completely natural & fully sustainable. \nCare: Spot clean with gentle soap & brushing. Dry fully after it gets wet.",
              "variations": "Yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/rg-084-3.jpg?v=1599200593",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/rg-084-4.jpg?v=1628570323",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/rg-084-5.jpg?v=1628570323",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/pascal-black-20201003-_Z6N3916-2.jpg?v=1628570323",
              "pictureLink5": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/rg-084-2.jpg?v=1628566280"
            },
            {
              "nameofProduct": "Organic Cotton Knit Unisex Gloves ",
              "category": "Clothing",
              "subCategory": "Men",
              "section": "Accessories",
              "productLink": "https://rawganique.com/collections/organic-gloves/products/100-organic-cotton-knit-gloves-haydn-elastic-free",
              "titleofProduct": "HAYDN 100% Organic Cotton Gloves (Elastic-Free)(Polyester-Free)",
              "price": "84",
              "currency" : "Pond",
              "description": "Highest demand item. World's first and only 100% organic cotton gloves, the purest in the world. For extra warmth, layer inside a larger sized Alaska 100% organic cotton fleece mittens. Special 100% organic cotton gloves. Plastic-free, PVC-free, synthetic-free, elastic-free all organic cotton gloves for year-round wear. Soft and pure. Unisex S - XXL. Made from start to finish by Rawganique for true purity.\nElastic-Free 100% Organic Cotton Knit Gloves\nThese all-natural knit gloves are not only elastic-free, latex-free, polyester-free, PVC-free but specifically designed for folks who cannot stand chemicals or synthetics of any kind. These soft & cozy 100% organic cotton gloves are great for gardening or just keeping your hands warm on breezy days. They are the thickest 100% organic cotton gloves you will find, if you can find any other organic cotton gloves at all. World's first and only elastic-free and chemical-free 100% organic cotton gloves - the purest on Earth. 100% organic cotton gloves won't ever be as warm as wool or some synthetic chemical fibers, but many of our customers have survived pretty frigid winters around the world. Customers also use our gloves as liners inside bigger gloves to have a pure layer that touches their skin.\n\nWith this most recent production, we won�t be able to produce more these special elastic-free 100% organic cotton knit gloves, due to COVID & other unforeseen circumstances. While we explore new ways to make these popular all-natural gloves, many sizes/colors may run out of stock. We apologize for the inconvenience.\n\nStyle: Unisex polyester-free, plastic-free, PVC-free, synthetic-free 100% organic cotton knit gloves\n\nFabric: 100% organic cotton knit\n\nSizes: Unisex S - XXL\n\nSizing: Palm = circumference around the palm; Length = from tip of longest finger to cuff\n\nSmall: Palm - 7.5�; Length - 9.5�\nMedium: Palm - 8�; Length - 10�\nLarge: Palm - 8.5�; Length - 10.25�\nXL: Palm - 10�; Length - 10.5�\nXXL: Palm - 10.5�; Length - 10.5�\n\nColor: Natural, (unbleached, dye-free), Black, Starry Night, Sage (low-impact, biodegradable fiber-reactive eco-dyed)\n\nWhere is it made? Made at Rawganique Atelier in Europe\n\nFeatures:\n\nHypoallergenic\nBreathable\nSweatshop-free. Vegan.\nAll of our products are free from forever chemicals like PFAS\nChemical-free. GMO-free. Pesticide-free. Dioxin-free. Formaldehyde-free. Bleach-free. Super pure!!!\nBiodegradable. Completely natural and fully sustainable.\nCare: Machine wash using mild biodegradable detergent. Lay flat to dry. If you must, tumble dry on low/gentle cycle; remove before dry.\n\nHow do you keep your hands warm in the winter without wool or polyester or chemicals or synthetic or microfiber micro plastics? Warm vegan organic gloves and mittens.",
              "variations": "Yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/haydn-oc-gloves-20181217D810_DSC9990-8b.jpg?v=1638304516",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/PB_RAWGANIQUE_09-11-2020.jpg?v=1640987127",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/haydn-gloves-_Z6N3719-2.jpg?v=1640987045",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/alaska-fleece-mittens-0K8A0912-2_51efe82d-98d5-4652-8f4b-fb08ad6affeb.jpg?v=1640987045",
              "pictureLink5": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/RGAC-1945-12.jpg?v=1640987045"
            },
            {
              "nameofProduct": "Iron Forge Hemp Canvas Jacket ",
              "category": "Clothing",
              "subCategory": "Men",
              "section": "Coats/Jackets",
              "productLink": "https://eu.patagonia.com/gb/en/product/mens-iron-forge-hemp-canvas-ranch-work-jacket/27805.html",
              "titleofProduct": "Men's Iron Forge Hemp� Canvas Ranch Jacket",
              "price": "200",
              "currency" : "Pond",
              "description": "To accommodate a wide range of movement and layering, our Workwear styles have a generous cut. The pants fit true to waist size but are roomy through the legs. The jackets are bigger than most of our styles�especially around the shoulders and back. Folks who have a leaner build or don't wear multiple layers might want to order one size smaller than usual.",
              "variations": "yes",
              "pictureLink1": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwe9e8e479/images/hi-res/27805_COI.jpg?sw=1436&sh=1436&sfrm=png&q=95&bgcolor=f5f5f5",
              "pictureLink2": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwf22be722/images/hi-res/27805_COI_TM1.jpg?sw=628&sh=628&sfrm=png&q=95&bgcolor=f5f5f5",
              "pictureLink3": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw70bf221a/images/hi-res/27805_COI_TM2.jpg?sw=628&sh=628&sfrm=png&q=95&bgcolor=f5f5f5",
              "pictureLink4": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw6c280472/images/hi-res/27805_COI_TM3.jpg?sw=628&sh=628&sfrm=png&q=95&bgcolor=f5f5f5",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Explorer V2 for men ",
              "category": "Clothing",
              "subCategory": "Men",
              "section": "Footwear",
              "productLink": "https://www.8000kicks.com/products/explorer-v2-for-men-beige-and-green",
              "titleofProduct": "Explorer V2 for Men Beige and Green",
              "price": "107",
              "currency" : "Pond",
              "description": "The Explorer is the first-ever model of hemp shoes developed by 8000Kicks. It was designed and engineered in Portugal to achieve the most sustainable, durable and comfortable sneaker ever built. Minimalist, yet stylish enough to fit every occasion, indoors or outdoors.\n\nPRODUCT DETAILS\n\n?? Only 240g | 0.50lb\n?? Durable Hemp fibers;\n?? Waterproof (PFC Free)\n?? World's 1st Hemp Insoles;\n?? Algae Bloom soles;\n? 100% vegan;\n?? Versatile design;",
              "variations": "Yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0209/7371/5505/products/260A9042_800x.jpg?v=1643973966",
              "pictureLink2": "",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Alex Redwood Shoe ",
              "category": "Clothing",
              "subCategory": "Men",
              "section": "Footwear",
              "productLink": "https://rackleshoes.com/collections/mens-sustainable-shoes/products/alex-redwood-mens",
              "titleofProduct": "Alex Redwood Men's",
              "price": "85",
              "currency" : "Pond",
              "description": "Look good, feel good and do good in sustainable, eco-friendly footwear from Rackle. The ALEX is made with a 100% sustainable hemp upper and Eco-Pure�, a foam midsole/outsole unit that promotes bio-degradation. Designed for an everyday wear, with plush cushioning, they weigh in at a super lightweight 6 ounces. Featuring Rackle�s proprietary Plexus Arch� technology, that stimulates the foot, providing recovery benefits and comfort as you move though the day. You�ll feel so good, you might forget you have them on.\n\nThe 100% sustainable hemp upper is made of high grade hemp and provides year-round comfort and support thanks to the plants natural benefits: cool in the summer and warm in the winter; anti-microbial; lightweight; water-resistant; UV-resistant; and extremely durable.\n\nOur shoes soles are made of EcoPure� and incorporate Rackle�s proprietary PLEXUS ARCH� design. EcoPure� foam promotes bio-degradation � it begins to break down after 1 year in active enclosed landfill conditions. The PLEXUS ARCH� with its raised ribbed arch design stimulates the foot where veins in the arch area meet (plexus) during forward motion (e.g. walking, etc.). PLEXUS ARCH� technology offers recovery and comfort for people on the go.\n\nAmazingly comfortable, extremely lightweight, 100% sustainable - everything you need in your shoes, and nothing you don�t.\n\nTHE BREAKDOWN:\n\nUPPER - 100% Kulshan knit hemp: sustainable & biodegradable. Hemps natural benefits - cool in the summer and warm in the winter; anti-microbial; lightweight; water-resistant; UV-resistant; and extremely durable. The upper is lined with organic cotton certified by both OCS 3.0 and GOTS 6.0.\n\nOUTSOLE - made of Eco-Pure� foam and contains Rackle�s proprietary PLEXUS ARCH� design.\nEcoPure� foam - promotes bio-degradation and breaks down in biologically active landfill conditions.*\n\nPLEXUS ARCH� - raised ribbed arch design stimulates the foot where veins in the arch area meet (plexus) during forward motion (e.g. walking, etc.). PLEXUS ARCH� technology offers recovery and comfort for people on the go.\n\nLACES - a combination of hemp and 100% recycled material. Each pair of shoes is shipped with two sets of different colored shoe laces (solid and checkered).\n\nWEIGHT - 6 oz.\n\nWIDTH - Alex widths are a �medium� fit.\n\nSize Chart\n\nFree shipping and returns within the USA. Rackle shoes are produced with a full circle of product life approach. We ship our footwear in a recycled/recyclable mailer that is a shoebox all in one",
              "variations": "Yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0297/6196/2119/products/redwood-seed1-a_fb508090-c667-4643-94fe-9040a34db158_1024x1024@2x.jpg?v=1642102015",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0297/6196/2119/products/redwood-seed1-b_371935c0-b0dc-46cc-b950-c0aa23737ebe_1024x1024@2x.jpg?v=1642102015",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0297/6196/2119/products/RedwoodSpin_1024x1024@2x.gif?v=1642102015",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/0297/6196/2119/products/redwood-seed-m_1024x1024@2x.jpg?v=1663175030",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Waterproof Hemp Shoes",
              "category": "Clothing",
              "subCategory": "Men",
              "section": "Footwear",
              "productLink": "https://www.kickstarter.com/projects/dopekicks/dopekicks-the-1st-waterproof-hemp-shoes",
              "titleofProduct": "8000Kicks - The 1st waterproof hemp shoes",
              "price": "211",
              "currency" : "Pond",
              "description": "Presenting the world's 1st eco-friendly shoes made from hemp, that are also waterproof. The shoes you will explore with for a lifetime. We are now called 8000Kicks !",
              "variations": "Yes",
              "pictureLink1": "https://ksr-ugc.imgix.net/assets/025/121/443/7899f0ae541e4796a7f5bee023456302_original.png?ixlib=rb-4.0.2&crop=faces&w=1552&h=873&fit=crop&v=1557769029&auto=format&frame=1&q=92&s=5c4bf876fd2836678b548c2b25fd7609",
              "pictureLink2": "https://ksr-ugc.imgix.net/assets/025/175/063/1fe1a4617558b4a247b0684cbd26e625_original.gif?ixlib=rb-4.0.2&w=680&fit=max&v=1558103525&gif-q=50&q=92&s=14530a6909493e944cd28e3016cb52a2",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Hemp Moccasins Shoes ",
              "category": "Clothing",
              "subCategory": "Men",
              "section": "Footwear",
              "productLink": "https://rawganique.com/collections/footwear/products/unisex-hemp-moccasins-docklands",
              "titleofProduct": "DOCKLANDS Handmade Hemp Moccasins (Unisex) (Natural Rubber Sole)",
              "price": "119",
              "currency" : "Pond",
              "description": "Handmade organic hemp moccasins casual shoes. Featuring hand-cut 100% natural rubber soles. Use our 100% natural wax to waterproof. Because we use low-impact biodegradable dyes, colors like brown vary from batch to batch, from darker brown to lighter brown with brick tones.\nHandmade Hemp Moccasins - Natural Rubber Soles\nHandmade Leather-free Hemp Moccasins from organically grown European hemp. Featuring hand-cut natural rubber soles. These practical and handsome & classic unisex hemp shoes - moccasins are breathable and comfortable to wear from get-go. Sustainably made from start to finish at Rawganique Atelier in Europe.\n\nStyle: Unisex Hemp Moccasins\n\nFiber: 100% European hemp\n\nSizes: Euro 36 - 46 (US Womens 7 - 11 | US Men's 7 - 13.5). \n\nColor: Natural (unbleached & dye-free), Black, Brown (low-impact, biodegradable fiber-reactive eco-dye)\n\nWhere is it made? Made at Rawganique Atelier in Europe\n\nFeatures:\n\nVegan. Leather-free. 100% natural plant-fiber canvas.\nBreathable\nFootbed lining and shoe upper is 100% hemp\nHemp fiber wicks away moisture keeping feet dry\nSweatshop-free. Hand-made by longterm shoe artisans in Europe.\nBiodegradable. Eco-friendly.\n100% hemp shoe laces\nNatural is unbleached, dye-free\nBlack and brown low-impact, biodegradable eco-dyes\nElastic-free\nAll of our products are free from forever chemicals like PFAS\nNo dispersed dyes\n100% natural rubber soles\nNot waterproof. Many customers have reported success with applying natural oils and waxes to our hemp shoes and bags to make them water-repellent.\nCare: Not machine washable. Spot clean with wet brush as needed. Let dry naturally after every use or cleaning. Dark colors may transmit to socks when wet or moist.\n\nTo waterproof & stain-proof your Rawganique shoes, use our 100% natural wax.",
              "variations": "Yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/docklands-natural-20201206-_Z6N8061-8.jpg?v=1607319278",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/docklands-black-20201206-_Z6N8157-8.jpg?v=1607319278",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/docklands-natural-20201206-_Z6N8075-8.jpg?v=1607319278",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/rgft-264mdnr-2.jpg?v=1607319278",
              "pictureLink5": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/docklands-natural-20201206-_Z6N8061-8.jpg?v=1607319278"
            },
            {
              "nameofProduct": "14oz Hemp Blue Denim Jeans",
              "category": "Clothing",
              "subCategory": "Men",
              "section": "Pants",
              "productLink": "https://spoke-london.com/products/rinse-wash-14oz-hemp-denim?utm_source=u&utm_medium=cpc&utm_campaign=12627603529&utm_term=&utm_content=5099460764",
              "titleofProduct": "HEMP DENIM",
              "price": "159",
              "currency" : "Pond",
              "description": "Soft, sustainable and high-stretch - this is the most relaxed 14oz denim we�ve ever cut. \n\nIt's a smart, wearable indigo blue - but with a richness and texture that's often missing from new denim.\n\nAnd the more we worked with it, the more there was to love.\n\nHemp makes up 20% of the 14oz weave. It's naturally soft, resilient and breathable. It uses less water than cotton, almost no fertilizer, and improves the health of the soil it's grown in.\n\nIt has been blended here with cotton for strength, and a hint of Dupont elastane, for comfort and stretch.\n\nOur stuntman Freddie is 6'1\", seen here in a 32\" waist, Build A, finished to a 32\" leg.   \n\nOur Hemp Denim are made with 77% Cotton, 20% Hemp, 2% Elastomultiester and 1% Elastane. ",
              "variations": "Yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0207/9406/products/Hemp-Denim-Rinse-Model-Front-2000x2000px.jpg?v=1643980895",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0207/9406/products/Hemp-Denim-Rinse-Model-Front-Closeup-2000x2000px.jpg?v=1643980895",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0207/9406/products/Hemp-Denim-Rinse-Model-Back-2000x2000px.jpg?v=1643980895",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/0207/9406/products/Hemp-Denim-Rinse-Model-Sitting-2000x2000px.jpg?v=1643980895",
              "pictureLink5": "https://cdn.shopify.com/s/files/1/0207/9406/products/Hemp-Denim-Rinse-Model-Pocket-Front-2000x2000px.jpg?v=1643980895"
            },
            {
              "nameofProduct": "Hemp Trousers ",
              "category": "Clothing",
              "subCategory": "Men",
              "section": "Pants",
              "productLink": "https://www.superdry.com/products?product_id=4059837&source=googleshopping&locale=en-GB&nst=0&gclsrc=aw.ds&gclid=Cj0KCQjwtrSLBhCLARIsACh6RmgZFxbJpiURvWJt9vpO3fzW2S4v-QRNuv9w7XqrlPHkNzLN7FV82gMaAtXCEALw_wcB",
              "titleofProduct": "Limited Edition Hemp Trousers",
              "price": "70",
              "currency" : "Pond",
              "description": "Looking for trousers that are stylish and sustainable? Look no further with our Limited Edition Hemp Trousers, made using 100% Hemp.\n\nLimited Edition\nBelt loops\nZip and clasp fastening\nFour pockets\n100% Hemp\nHemp is one of the fastest growing plants and doesn�t need much water, energy, pesticides or fertilisers. It is very good for the soil and can be grown in the same place for several years - without exhausting the soil. ",
              "variations": "yes",
              "pictureLink1": "https://image1.superdry.com/static/images/optimised/zoom/upload9223368955665745496.jpg",
              "pictureLink2": "https://image1.superdry.com/static/images/optimised/zoom/upload9223368955665745494.jpg",
              "pictureLink3": "https://image1.superdry.com/static/images/optimised/zoom/upload9223368955665745490.jpg",
              "pictureLink4": "https://image1.superdry.com/static/images/optimised/zoom/upload9223368955665745493.jpg",
              "pictureLink5": "https://image1.superdry.com/static/images/optimised/zoom/upload9223368955665745492.jpg"
            },
            {
              "nameofProduct": "Mission Ridge Pants ",
              "category": "Clothing",
              "subCategory": "Men",
              "section": "Pants",
              "productLink": "https://www.toadandco.com/products/mission-ridge-pant-beetle-vintage-wash?variant=32689379770416",
              "titleofProduct": "Mission Ridge Pant",
              "price": "75",
              "currency" : "Pond",
              "description": "Beetle Vintage Wash",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0253/4801/4128/products/T2441411-Beetle_Vintage_Wash_1458x1800.jpg?v=1626739732",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0253/4801/4128/products/T2441411-Beetle_Vintage_Wash-2-A_1458x1800.jpg?v=1626739732",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0253/4801/4128/products/T2441411-Tabac_Vintage_Wash_1458x1800.jpg?v=1627427890",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/0253/4801/4128/products/T2441411-Tabac_Vintage_Wash-2-A_1458x1800.jpg?v=1627427890",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Organic Denim Relaxed Jeans",
              "category": "Clothing",
              "subCategory": "Men",
              "section": "Pants",
              "productLink": "https://afends.com/collections/mens-new-arrivals/products/afends-mens-ninety-twos-organic-denim-relaxed-fit-jean-washed-black",
              "titleofProduct": "NINETY TWOS- ORGANIC DENIM RELAXED JEAN - WASHED BLACK\nOrganic Denim Relaxed Jean",
              "price": "78",
              "currency" : "Pond",
              "description": "These denim jeans are straight out of the 90s. Offering a mid-rise, relaxed leg fit, the Ninety Twos are by far our best-selling men's shape. Cut from sustainable organic cotton denim in our vintage washed black shade, these midweight jeans will continue to define your everyday collection.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0497/8277/products/M220452-WBL_0041_900x.jpg?v=1660274449",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0497/8277/products/AfendsMensPablo-HempDenimBaggyJeans-WornBlue1111_900x.jpg?v=1660274449",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0497/8277/products/AfendsMensNinetyTwos-OrganicDenimRelaxedJean-WashedBlack3111_900x.jpg?v=1660274449",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/0497/8277/products/M220452-WBL_0043_900x.jpg?v=1660274449",
              "pictureLink5": "https://cdn.shopify.com/s/files/1/0497/8277/products/M220452-WBL_0047_900x.jpg?v=1660274449"
            },
            {
              "nameofProduct": "Blue Hemp Shirt ",
              "category": "Clothing",
              "subCategory": "Men",
              "section": "Shirts",
              "productLink": "https://www.babbleandhemp.com/collections/shirts/products/petrol-blue-hemp-shirt",
              "titleofProduct": "Petrol Blue Hemp Shirt",
              "price": "75",
              "currency" : "Pond",
              "description": "Named in jest to the American oil barons who played a massive role in hemp's demise in the 20th century. Concerned that the potential of hemp oil may reduce future demand for petrol - they lobbied for it to be illegal to grow because of hemp's links to the cannabis plant.\n\nOur classic hemp shirt is the perfect shirt for a light, relaxed look. It can be worn throughout the year thanks to the hollowness of hemp fibres meaning it breathes well in summer, and insulates in winter.\n\n100% hemp\nSoftens with each wash\nWill crumple lightly (not as much as linen)\nElegant placket and a classic collar for a versatile look\n100% biodegradable fabric\nArrives gift-wrapped",
              "variations": "Yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0063/7589/9218/products/Petrolcorrect1_31de20ed-ad91-4b57-8dd1-23e0e96de15c_3000x.jpg?v=1634752445",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0063/7589/9218/products/Petrolcorrect1_31de20ed-ad91-4b57-8dd1-23e0e96de15c_3000x.jpg?v=1634752445",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0063/7589/9218/products/petrolhempshirtcloseup_3000x.jpg?v=1633793571",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "White Andros Hemp Shirt ",
              "category": "Clothing",
              "subCategory": "Men",
              "section": "Shirts",
              "productLink": "https://lovebrand.com/products/andros-hemp-shirt-white",
              "titleofProduct": "WHITE ANDROS HEMP SHIRT",
              "price": "145",
              "currency" : "Pond",
              "description": "Light and breathable with four times the strength of cotton. The Andros explorer shirt is the ultimate shirt on safari or for navigating life�s adventures. Made from 100% organic hemp with pleated double chest pockets and finished with our signature corozo nut buttons.",
              "variations": "Yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/1593/5263/products/Andros-White-Hemp-Shirt-Love-Brand_4c1cb5b9-4167-4e49-bcff-0b82a482f692_1800x1800.jpg?v=1632828612",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/1593/5263/products/White-Andors-Hemp-Fabric_1800x1800.jpg?v=1633086344",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/1593/5263/products/Andros-White-Hemp-Shirt-Love-Brand_1800x1800.jpg?v=1632828425",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/1593/5263/products/Andros-White-Hemp-Shirt-Love-Brand-1_1800x1800.jpg?v=1632828709",
              "pictureLink5": "https://cdn.shopify.com/s/files/1/1593/5263/products/Andros-White-Hemp-Shirt-Love-Brand-2_b85ffa67-a137-4f6c-8108-d566b3f7f8a9_1800x1800.jpg?v=1632828617"
            },
            {
              "nameofProduct": "100%Hemp Sweater ",
              "category": "Clothing",
              "subCategory": "Men",
              "section": "Shirts",
              "productLink": "https://www.bewusst-wear.com/product-page/hanf-pullover-1",
              "titleofProduct": "100% Hanf Pullover CHARCOAL GREY",
              "price": "125",
              "currency" : "Pond",
              "description": "Stoffe aus 100% Hanf nehmen keine Ger�che an und bleiben stets hygienisch, da der Sauerstoffgehalt der Hanffasern so hoch ist, dass sich keine anaerobe Bakterien ansiedeln k�nnen.\n?\n\nReine Hanfstoffe aus Langfasern sind ideal f�r Unterw�sche und Kleidung mit Hautkontakt. \n?\n\nHanfstoffe k�hlen und sch�tzen die Haut im Sommer (UV-Schutz: 95%). Durch die temperaturausgleichende Eigenschaft der Faser ist Hanf-Kleidung f�r alle Jahreszeiten ideal.\n?\n\nDie Feuchtigkeit wird sehr schnell ausgetauscht und l�sst das Hanf-Shirt beim Sport immer luftig auf der Haut liegen.\n?\n\nDas \"feinelektrische Spannungsniveau\" der Hanffaser entspricht dem der menschlichen K�rperoberfl�che und bewirkt eine Entspannung f�r die Haut.",
              "variations": "Yes",
              "pictureLink1": "https://static.wixstatic.com/media/1a74ec_0757ad9d57e642efb3904028a27c76db~mv2.jpeg/v1/fill/w_373,h_560,al_c,q_85,usm_0.66_1.00_0.01/1a74ec_0757ad9d57e642efb3904028a27c76db~mv2.webp",
              "pictureLink2": "https://static.wixstatic.com/media/1a74ec_9e20ebec925546d9b426d8040588979a~mv2.jpg/v1/fill/w_690,h_460,al_c,q_85,usm_0.66_1.00_0.01/1a74ec_9e20ebec925546d9b426d8040588979a~mv2.webp",
              "pictureLink3": "https://static.wixstatic.com/media/1a74ec_78849cc7779d43fb9b85590930b22ab1~mv2.jpeg/v1/fill/w_690,h_465,al_c,q_85,usm_0.66_1.00_0.01/1a74ec_78849cc7779d43fb9b85590930b22ab1~mv2.webp",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Stay Warm Long sleeve ",
              "category": "Clothing",
              "subCategory": "Men",
              "section": "Sleepwear",
              "productLink": "https://dagsmejan.com/collections/men-dagsmejan/products/stay-warm-sleep-long-sleeve-men",
              "titleofProduct": "SLEEP LONG SLEEVE TOP MEN",
              "price": "85",
              "currency" : "Pond",
              "description": "Ultra-light, breathable merino wool pajamas top keeps you comfortably warm without ever overheating. 4x more breathable than cotton and with exceptional moisture management you can sleep deeper and longer with merino sleepwear. Experience the luxurious sleep comfort of nature's finest performance fibres.",
              "variations": "Yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/1604/6077/products/StayWarm-Men-DarkGreyLongSleeve-Catalogue-Focus_800x.jpg?v=1661156307",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/1604/6077/products/StayWarm-Men-DarkGreyLongSleeveWinterNightPants-Catalogue-FullBody_800x.jpg?v=1661156307",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/1604/6077/products/StayWarm-Men-DarkGreyLongSleeve-Catalogue-SideView_800x.jpg?v=1661156307",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/1604/6077/products/StayWarm-Men-DarkGreyLongSleeve-Catalogue-BackView_800x.jpg?v=1661156307",
              "pictureLink5": "https://cdn.shopify.com/s/files/1/1604/6077/products/Longsleevebluemelange_800x.jpg?v=1661156307"
            },
            {
              "nameofProduct": "Stay Warm Sleep Pants ",
              "category": "Clothing",
              "subCategory": "Men",
              "section": "Sleepwear",
              "productLink": "https://dagsmejan.com/collections/men-dagsmejan/products/stay-warm-sleep-pants-men",
              "titleofProduct": "SLEEP PANTS CUFF MEN",
              "price": "85",
              "currency" : "Pond",
              "description": "Sleep easy knowing this high-tech mix of Tencel from eucalyptus and the finest Merino wool provide the most natural climate regulating system you can imagine. Experience optimal night comfort with merino pyjamas from Dagsmejan.",
              "variations": "Yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/1604/6077/products/StayWarm-Men-DarkGreyLongSleeve-Catalogue-Focus_800x.jpg?v=1661156307",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/1604/6077/products/StayWarm-Men-DarkGreyLongSleeveWinterNightPants-Catalogue-FullBody_800x.jpg?v=1661156307",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/1604/6077/products/StayWarm-Men-DarkGreyLongSleeve-Catalogue-SideView_800x.jpg?v=1661156307",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/1604/6077/products/StayWarm-Men-DarkGreyLongSleeve-Catalogue-BackView_800x.jpg?v=1661156307",
              "pictureLink5": "https://cdn.shopify.com/s/files/1/1604/6077/products/Longsleevebluemelange_800x.jpg?v=1661156307"
            },
            {
              "nameofProduct": "Balance Sleep Gift Set ",
              "category": "Clothing",
              "subCategory": "Men",
              "section": "Sleepwear",
              "productLink": "https://dagsmejan.com/collections/men-dagsmejan/products/the-favorites-balance-men",
              "titleofProduct": "GIFT SET SHORT",
              "price": "192",
              "currency" : "Pond",
              "description": "Our favourite products in one set: described by many as the \"most comfortable pajamas\", the sleep t-shirt and shorts combo is our absolute bestseller.",
              "variations": "Yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/1604/6077/products/dagsmejan-1460-The_favorites-THE_FAVORITES_MEN-3_800x.jpg?v=1650619664",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/1604/6077/products/deepgrey-shorts_800x.jpg?v=1650619667",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/1604/6077/products/sleepmasks_deepgrey_0d3759b1-007e-463b-9ab3-1cc7e7475962_800x.jpg?v=1650619669",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/1604/6077/products/dagsmejan-1460-The_favorites-THE_FAVORITES_MEN-2_800x.jpg?v=1646743003",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Organic Cotton Jersey pyjama Set ",
              "category": "Clothing",
              "subCategory": "Men",
              "section": "Sleepwear",
              "productLink": "https://rawganique.com/collections/mens-organic-sleepwear/products/bonn-elastic-free-organic-prima-cotton-jersey-pajama-set",
              "titleofProduct": "BONN Elastic-Free Organic Prima Cotton Jersey Pajama Set (Men's Top & Bottom)",
              "price": "128",
              "currency" : "Pond",
              "description": "Cozy & pure 100% organic Prima cotton pajamas sleepwear loungewear set for sleep & at-home lounging. The tops are dressy enough for work and Zoom. Great for yoga and meditation, too. Elastic-free. Plastic-free natural carved 100% tagua nut or coconut buttons. Scroll down for sizing.\nElastic-Free Organic Prima Cotton Jersey Pajama Set\nEco-friendly, ethically & sustainably made organic pajamas for the sweetest night ever. Our chemical-free, elastic-free 100% organic cotton pajamas are super soft, smooth, silky & cozy. The ultimate in purity down to the details: Organic cotton threads; Natural coconut or tagua nut buttons (a cash crop for the indigenous people that helps save the Amazon Rainforest), both are vegan and plastic-free. An absolute essential for the chemical-free, natural lifestyle.\n\nNote that the color tones of tops and bottoms may not match due to different batches. This is natural and to be expected because we use natural and fiber reactive dyes that vary from batch to batch. The Bonn Unisex Organic Cotton Jersey Pajama Set includes:\n\n1 button-down pajama top (available separately as Strasbourg Men's Banded Collar Pajama Top)\n1 pajama bottom (Interlaken Organic Cotton Jammy Bottom). The bottom is available as default elastic-free, with adjustable length thanks to the ingeniously designed button system), with organic cotton drawstring. The drawstring can be removed or replaced if needed. The pants are also made in a version with elastic; if you want this version, please order the top and bottom separately, and choose �With Elastic� on the Interlaken Organic Cotton Jammy Bottom page.",
              "variations": "Yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/rgpj-7300-set-2.jpg?v=1658897309",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/bonn-strasbourg-interlaken-Z6N3912-5blackbott_7ee8e911-44e6-4f1b-a9af-eab3ea96757f.jpg?v=1658897309",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/avignon-interlaken-bonn-20181219D810_DSC1688-8_3780026e-6822-4cd9-9105-1845ac3b6103.jpg?v=1638601937",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/rgpj-7300-set-8.jpg?v=1638601937",
              "pictureLink5": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/rgpj-7300-set-3.jpg?v=1638601937"
            },
            {
              "nameofProduct": "Organic Hemp Unisex Pyjama Set",
              "category": "Clothing",
              "subCategory": "Men",
              "section": "Sleepwear",
              "productLink": "https://rawganique.com/collections/mens-organic-sleepwear/products/organic-hemp-pajamas-pj-set",
              "titleofProduct": "SAN JOSE 100% Organic Hemp Pajamas PJ Set (Long Sleeves / Pants) (Unisex)",
              "price": "128",
              "currency" : "Pond",
              "description": "100% organic woven hemp fabric that is soft and cozy and very breathable. 100% natural tagua nut buttons (not plastic). Ivory/blue pinstripes. Drawstring pants with button fly and 2 side pockets and covered elastic waistband (elastic is not sewn through and can be removed as needed). Made from start to finish at Rawganique Atelier. Relaxed fit. See sizing chart below.\n100% Organic Hemp Pajamas PJ Set\n100% organic hemp pajama set (long-sleeve top and long bottoms) featuring 100% natural tagua nut buttons (not plastic). \n\n100% Organic Hemp Pajama TOP Sizing\n\nXS: 8.5� Neck width 1/2; 18.1� Chest 1/2; 5.5� Sleeve opening 1/2; 22.7� Sleeve length from shoulder; 28� Body length\n\nSmall:  9� Neck width 1/2; 19.7� Chest 1/2; 5.7� Sleeve opening 1/2; 23.3� Sleeve length from shoulder; 28.6� Body length\n\nMedium:  9.5� Neck width 1/2; 21.6� Chest 1/2; 5.9� Sleeve opening 1/2; 23.6� Sleeve length from shoulder; 29.6� Body length\n\nLarge:  10.2� Neck width 1/2; 23.6� Chest 1/2; 6.1� Sleeve opening 1/2; 24� Sleeve length from shoulder; 30.8� Body length\n\nXL:  10.9� Neck width 1/2; 25.6� Chest 1/2; 6.4� Sleeve opening 1/2; 24.6� Sleeve length from shoulder; 32� Body length\n\n100% Organic Hemp Pajama BOTTOM Sizing\n(Please allow 1-2 from the max waist measurement to be able to draw the strings. The fabric is 100% organic woven hemp so there's no latex or elastic or stretch so allow plenty of room for comfort.) The drawstring can be removed or replaced if needed.\n\nXS: Waist extended 1/2 16.9�; Waist relaxed 1/2 14.95�; Hips 1/2 17.9�; Leg opening 1/2 8.1�; Inseam 28.1�\n\nSmall?: Waist extended 1/2 18.6�; Waist relaxed 1/2 16.6�; Hips 1/2 19.5�; Leg opening 1/2 8.4�; Inseam 28.4�\n\nMedium?: Waist extended 1/2 20.5�; Waist relaxed 1/2 18.5�; Hips 1/2 21.5�; Leg opening 1/2 8.7�; Inseam 28.55�\n\nLarge?: Waist extended 1/2 22.1�; Waist relaxed 1/2 20.1�; Hips 1/2 23.4�; Leg opening 1/2 9.2�; Inseam 29.52�\n\nXL?: Waist extended 1/2 23.9�; Waist relaxed 1/2 21.95�; Hips 1/2 25.35�; Leg opening 1/2 9.6�; Inseam 30.53�\n\nThe San Jose Hemp Pajamas are made in-house in our European Atelier from start to finish: we grow, weave, and sew each pair for true purity and environmental sustainability. Chemical-free. Sweatshop-free. Great for men and women.\n\nBlue/Ivory Pinstripes. Unisize Mn XS | Wn S - Mn XL | Wn XXL.",
              "variations": "Yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/san-jose-pajamas-20190725Z6_Z6N1205-combo5.jpg?v=1609846866",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/san-jose-pajamas-20190725Z6_Z6N1284-3.jpg?v=1628285536",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/san-jose-20210804-_Z6N4209-2.jpg?v=1628285542",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/PB_RAWGANIQUE_19-11-2020b.jpg?v=1628285547",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Organic Cotton/Bamboo boxer Shorts",
              "category": "Clothing",
              "subCategory": "Men",
              "section": "Underwear",
              "productLink": "https://generousape.com/products/organic-grey-cottonbamboo-boxer-short",
              "titleofProduct": "Organic cotton/ bamboo jersey boxer short in grey",
              "price": "19",
              "currency" : "Pond",
              "description": "Comfortable elastic waistband\nSimple construction for comfort\nEuropean fit for a modern streamline style\nSize & Fit\n\nSize M is recommended for a 32\" waist.\n\nCare info\n\nWe recommend all garments are machine washed at 30 degrees and hung out to dry. This is best for your clothes and the planet!\n\nAbout me\n\nSumptuously soft jersey boxer short made from bamboo yarn.  \n\nFabrication: 46% organic bamboo, 46% organic cotton, 8% elastane.\n\nGrown, knitted & dyed in Turkey from organic bamboo yarns according to OEKO-TEX criteria. \n\nManufacturing Info\n\nMade to order in East Yorkshire, England.\n\nThis product is manufactured with care and transparency using solar energy and the highest quality fabrications by a fairly paid, skilled craftsman.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0478/1408/2711/products/GreyBoxerFront_6a9b7441-5880-4b8e-b356-041d42ff2b28_600x.jpg?v=1663150091",
              "pictureLink2": "",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Long Sleeve Top - Toad & Co",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Tops",
              "productLink": "https://www.toadandco.com/products/piru-long-sleeve-henley-black?variant=39619718447152",
              "titleofProduct": "Piru Long Sleeve Henley",
              "price": "69",
              "currency" : "Pond",
              "description": "Piru Long Sleeve Henley",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0253/4801/4128/products/T1241108-BLACK-1_700x.jpg?v=1626897393",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0253/4801/4128/products/T1241108-BLACK-2_700x.jpg?v=1626897393",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0253/4801/4128/products/T1241108-BLACK-3_700x.jpg?v=1626897393",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/0253/4801/4128/products/T1241108-BLACK-4_700x.jpg?v=1626897393",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Sineth Puff Sleeve Hemp Crop Top � Valani",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Tops",
              "productLink": "https://shopvalani.com/products/sineth-double-puff-top?variant=35349440364705",
              "titleofProduct": "Sineth Double Puff Sleeve Hemp Crop Top - Made in USA",
              "price": "127",
              "currency" : "Pond",
              "description": "Sineth is a romantic with a quick tongue and an even quicker wit. She�s a statement maker and she doesn�t care who knows. Blending in is for the birds. Sineth was born to stand out.\n\n \n\nMost days she�s modest, but when she�s ready to dial it up, look out!  She'll pull her puff sleeves down and show off her shoulders.  Yes...that's the sound of hearts breaking.\n\n\nWith a square neckline, cropped waist and double puff sleeve that can be worn on or off shoulder, Sineth is sure to add a romantic touch to your sustainable wardrobe.  Our hemp clothing is hypoallergenic and temperature regulating, making this sustainable top comfortable year round.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_8380_600x.jpg?v=1632849984",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_8362_600x.jpg?v=1632849984",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_8363_600x.jpg?v=1632849984",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_8408_600x.jpg?v=1632849984",
              "pictureLink5": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_8443_600x.jpg?v=1632849984"
            },
            {
              "nameofProduct": "Ami Sweatshirt - Aliyawanek",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Tops",
              "productLink": "https://aliyawanek.com/products/ami-sweatshirt-sumac",
              "titleofProduct": "Ami Sweatshirt - Sumac",
              "price": "52",
              "currency" : "Pond",
              "description": "Cropped sweatshirt with no shoulder seams in an organic cotton/hemp blend. Hits slightly above natural waist. Locally dyed. Produced in a family-owned factory in the Bay Area.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0327/7497/9628/products/aliya-wanek-ami-sweatshirt-sumac-oct-2021-2.jpg?v=1633242119",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0327/7497/9628/products/aliya-wanek-ami-sweatshirt-sumac-oct-2021.jpg?v=1633242119",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Epiq Mock Neck Dress - Toad & Co",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Dresses",
              "productLink": "https://www.toadandco.com/products/womens-epiq-mock-neck-dress-desert-sky?variant=39619734634544",
              "titleofProduct": "Women's Epiq Mock Neck Dress",
              "price": "55",
              "currency" : "Pond",
              "description": "Women's Epiq Mock Neck Dress",
              "variations": "NO",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0253/4801/4128/products/T1781102-DESERT_SKY-1_700x.jpg?v=1626897411",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0253/4801/4128/products/T1781102-DESERT_SKY-2_700x.jpg?v=1626897411",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0253/4801/4128/products/T1781102-DESERT_SKY-3_700x.jpg?v=1626897411",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/0253/4801/4128/products/T1781102-DESERT_SKY-4_700x.jpg?v=1626897411",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Handkerchief Midi Hemp Dress - Valani",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Dresses",
              "productLink": "https://shopvalani.com/products/vanna-hankerchief-hem-dress?variant=35349486338209",
              "titleofProduct": "Vanna Ruffle Hemp Handkerchief Midi Dress - USA",
              "price": "256",
              "currency" : "Pond",
              "description": "Wanna feel beautiful, flowy and flirty?  Meet your new bff - the Vanna hemp dress.  \nYou can find Vanna running through fields of flowers just to feel the cool breeze.   When it gets chilly, she throws on a turtleneck, leggings and boots and she's good to go! \n\nThe soft, lightweight hemp blended fabric will make you feel and look gorgeous.  It regulates temperature to keep you comfortable year round.\n\n\nWith a stretch ruffle neckline and straps, full draped skirt with handkerchief hem, and soft gathering, the Vanna hemp dress adds a touch of romance that can easily be dressed up or down.  Get ready to receive compliments wherever you go.  ",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_3367-1800x2400_300x.jpg?v=1615678723",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_3535_600x.jpg?v=1598724159",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_3313_600x.jpg?v=1598724158",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/DSC04808A_600x.jpg?v=1621231060",
              "pictureLink5": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/W18074_1200_600x.jpg?v=1600644786"
            },
            {
              "nameofProduct": "Check Corduroy Hemp Mini Dress - Afends",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Dresses",
              "productLink": "https://afends.com/products/afends-womens-kaia-hemp-check-corduroy-mini-dress-coffee",
              "titleofProduct": "KAIA- HEMP CHECK CORDUROY MINI DRESS - COFFEE\nHemp Check Corduroy Mini Dress",
              "price": "22",
              "currency" : "Pond",
              "description": "Look cute in this corduroy dress. When hemp meets organic cotton to create a midweight jacquard 12 wale corduroy, it offers a heavenly design and textured hand-feel. Featuring a fitted A-line design with a button-up front in our earthy coffee colourway, this mini dress looks good with a layer underneath for a retro outfit.",
              "variations": "No",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0497/8277/products/S4-RESHOOT-W4319_900x.jpg?v=1629085392",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0497/8277/products/S4-RESHOOT-W4322_900x.jpg?v=1629085392",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0497/8277/products/S4-RESHOOT-W4337_900x.jpg?v=1629085392",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/0497/8277/products/S4-RESHOOT-W4329_900x.jpg?v=1629085392",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Hemp Midi Dress - Valani",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Dresses",
              "productLink": "https://shopvalani.com/collections/dresses/products/sodalin-hemp-midi-dress?variant=35349415657633",
              "titleofProduct": "Sodalin Hemp Midi Dress with Puff Sleeves - Made in USA",
              "price": "256",
              "currency" : "Pond",
              "description": "The Sodalin hemp dress is the versatile, breezy piece your sustainable wardrobe has been waiting for. Featuring an open Mandarin collar with neck ruffle, v-neckline, elbow length bishop sleeves with a puffed shoulder, she has a delicate romantic look that can be dressed up or down. \n\nHemp is hypoallergenic and temperature regulating to keep you comfortable from season to season.  When she wants to have fun, Sodalin throws on a pair of sneakers, rolls up her puff sleeves, and meets her friends for an outdoor show.  Her extra long waist ties can be styled multiple ways depending on the mood.  ",
              "variations": "No",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_0517-1800x2400.jpg?v=1632849906",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_0832_600x.jpg?v=1632849906",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_1110_600x.jpg?v=1632849906",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_6883_600x.jpg?v=1632849906",
              "pictureLink5": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_1137-2_600x.jpg?v=1632849906"
            },
            {
              "nameofProduct": "Nora Paperbag Midi Hemp Skirt - Valani",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Skirts",
              "productLink": "https://shopvalani.com/collections/bottoms/products/nora-paperbag-hemp-midi-skirt?variant=35349506556065",
              "titleofProduct": "Nora Paperbag Midi Hemp Skirt - Made in USA",
              "price": "170",
              "currency" : "Pond",
              "description": "Nora is quite detailed and complex in her ways!  She's practical with deep pockets and has a beautifully detailed paper bag waist. \n\nWhen she�s ready for romance, it�s a pair of embellished ballet flats, an outdoor dinner, and a classic movie.   Her soft, lightweight hemp blended fabric will make you feel and look gorgeous.  It regulates temperature to keep you comfortable year round.",
              "variations": "No",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/DSC00706A_600x.jpg?v=1623993255",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/DSC00796a_600x.jpg?v=1623993323",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_5434_600x.jpg?v=1597588292",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_5658_600x.jpg?v=1597588293",
              "pictureLink5": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/W18072_750_300x.jpg?v=1600644699"
            },
            {
              "nameofProduct": "Banana 3 Tiered Midi Skirt - Valani",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Skirts",
              "productLink": "https://shopvalani.com/collections/new-arrivals/products/chanthu-banana-midi-skirt-purple?variant=40089538527393",
              "titleofProduct": "Chanthu Banana 3 Tiered Midi Skirt Purple",
              "price": "170",
              "currency" : "Pond",
              "description": "Chanthu Banana 3 Tiered Midi Skirt Purple",
              "variations": "No",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_06561800x2400_de7e57fa-fcd2-45ed-8260-f991199802c6_600x.jpg?v=1631604040",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_06101800x2400_f306f7b9-5621-4eec-9095-1bf4a6d7f95e_600x.jpg?v=1631604040",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_1434_ee8fe943-ceb2-48f7-aea1-d84cac545c16_600x.jpg?v=1631604040",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Hemp Organic Cotton Midi Skirt � ADKN",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Skirts",
              "productLink": "https://adkn.co.uk/products/plya-hemp-organic-cotton-midi-skirt",
              "titleofProduct": "Plya Grey Fit & Flare High Waist Skirt with Pockets",
              "price": "108",
              "currency" : "Pond",
              "description": "Plya Grey Fit & Flare High Waist Skirt with Pockets",
              "variations": "No",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0061/8312/5061/products/Sustainable-Grey-Hemp-Tweed-Wool-Skirt-A-Line-Flare-ADKN-UK-2_530x.jpg?v=1603730125",
              "pictureLink2": "",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Karuna Cord 5 Pocket Skinny Pant - Toad & Co",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Pants/Trousers",
              "productLink": "https://www.toadandco.com/products/karuna-cord-5-pocket-skinny-pant-brown-sugar?variant=39619726934064",
              "titleofProduct": "Karuna Cord 5 Pocket Skinny Pant",
              "price": "82",
              "currency" : "Pond",
              "description": "Karuna Cord 5 Pocket Skinny Pant",
              "variations": "No",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0253/4801/4128/products/T1441107-Brown_Sugar-6_700x.jpg?v=1659053288",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0253/4801/4128/products/T1441107-BROWN_SUGAR-1_700x.jpg?v=1659053288",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0253/4801/4128/products/T1441107-BROWN_SUGAR-2_700x.jpg?v=1659053288",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/0253/4801/4128/products/T1441107-BROWN_SUGAR-3_700x.jpg?v=1659053288",
              "pictureLink5": "https://cdn.shopify.com/s/files/1/0253/4801/4128/products/T1441107-Brown_Sugar-5_700x.jpg?v=1659053288"
            },
            {
              "nameofProduct": "Kosal Hemp Wrap Cropped Pants - Valani",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Pants/Trousers",
              "productLink": "https://shopvalani.com/collections/bottoms/products/kosal-hemp-wrap-pants?variant=35349471264929",
              "titleofProduct": "Kosal Hemp Wrap Cropped Pants",
              "price": "170",
              "currency" : "Pond",
              "description": "Wanna be a show stopper with mesmerizing movement?  Meet Kosal - she knows how to make an entrance.   She flows through life with an open heart and mind and is eager to try new things. She�s layered, yet open, and her limitless creative potential abounds.\n\n \n\nKosal is the breezy, elevated pant that your sustainable wardrobe needs.  She features a high waist and wide, relaxed leg as well as an adjustable partial wrap overlay to add movement to your outfits. Hemp regulates temperature, making these your ideal pants for both summer and winter.",
              "variations": "No",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_90251800x2400_7a2865a0-b450-453e-9d00-8383e47e2295_600x.jpg?v=1632849918",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_9005_600x.jpg?v=1632849918",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_9104_1e5f565f-ad3f-41af-a2c1-c9690348c0be_600x.jpg?v=1632849919",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_89473_1_600x.jpg?v=1632849919",
              "pictureLink5": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_8978_600x.jpg?v=1632849919"
            },
            {
              "nameofProduct": "Epiq Quilted Jacket - Toad & Co",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Coats & Jackets",
              "productLink": "https://www.toadandco.com/products/womens-epiq-quilted-jacket-sagebrush?variant=39619730440240",
              "titleofProduct": "Women's Epiq Quilted Jacket",
              "price": "88",
              "currency" : "Pond",
              "description": "Like your college sweatshirt, but make it fashion. Made with all-natural hemp and organic cotton, this gal will get you from game-day tailgates to treks through the apple orchard without missing a beat. A slouchy fit gives it a retro feel, but a hemline drawstring lets you style it how you please. Adulting never looked so good.\n\nMoisture-wicking\nOdor control\nInternal waist drawcord\nWash for vintage look and feel\n60 GSM recycled polyester insulation\nJersey lined interior\nEncased elastic cuffs\n24\" length",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0253/4801/4128/products/T1541007-SAGEBRUSH-2_700x.jpg?v=1626897405",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0253/4801/4128/products/T1541007-SAGEBRUSH-1_700x.jpg?v=1626897405",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Hemp Check Corduroy Jacket - Afends",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Coats & Jackets",
              "productLink": "https://afends.com/products/afends-womens-cara-hemp-check-corduroy-jacket-coffee",
              "titleofProduct": "Hemp Check Corduroy Jacket",
              "price": "26",
              "currency" : "Pond",
              "description": "Button-up in this cord jacket. Our dreamy and earth-friendly hemp and organic cotton corduroy offers a textured hand feel with its jacquard check design.\n\nCara puts comfort and versatility at the forefront with a relaxed boxy silhouette, gold brushed hardware and four-pocket combo in our rich shade of coffee brown. Pair it with anything cord for a retro outfit",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0497/8277/products/S4-RESHOOT-W4358_900x.jpg?v=1629085572",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0497/8277/products/S4-RESHOOT-W4362_900x.jpg?v=1629085572",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0497/8277/products/S4-RESHOOT-W4354_900x.jpg?v=1629085572",
              "pictureLink4": "https://cdn.shopify.com/s/files/1/0497/8277/products/S4-RESHOOT-W4359_900x.jpg?v=1629085572",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Stola London",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Nightwear",
              "productLink": "https://stolalondon.com/products/io-white-short-hemp-pyjamas",
              "titleofProduct": "Io White Short Hemp Pyjamas",
              "price": "170",
              "currency" : "Pond",
              "description": "Named after the goddess Io who was turned into a snow white heifer by Jove. Her beauty was such that even in cow form she still glowed.\nThe papaya orange trim transforms our white hemp fabric into a sweet and stylish design.\nThe ideal set to pack for a summer holiday and these warm summer nights. Why not pop on the shorts with a T-shirt and head down to the beach for a cocktail� or two! ",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0533/7333/7753/products/IOwhite_2_3000x.png?v=1650886475",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0533/7333/7753/products/IOwhite_1_3000x.png?v=1650886475",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0533/7333/7753/products/shortwhitecutout_3000x.jpg?v=1650886458",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Stay Cool Sleep Night Dress - Dagsmejan",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Nightwear",
              "productLink": "https://dagsmejan.com/products/stay-cool-sleep-slip-dress-women?gclid=CjwKCAjwwsmLBhACEiwANq-tXB6yjPrfSF3pR8HwVNCs7HyzCkjiLJdLDPl4h6Q-31Lvsyt9sAvKghoCHNoQAvD_BwE",
              "titleofProduct": "SLEEP SLIP DRESS WOMEN",
              "price": "105",
              "currency" : "Pond",
              "description": "Too hot to sleep? This feather-light cooling nightgown is 8x more breathable than cotton.Smoother than silk, softer than cotton and better moisture management than cotton high-tech eucalyptus fibres combined with NATTCOOL� technology helps you to sleep better in a totally natural and sustainable way.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/1604/6077/products/StayCool-Women-CoastalBlueSlipDress-Catalogue-FullBody_800x.jpg?v=1659441895",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/1604/6077/products/StayCool-Women-CoastalBlueSlipDress-Catalogue-Focus_800x.jpg?v=1659441895",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/1604/6077/products/StayCool-Women-CoastalBlueSlipDress-Catalogue-BackView_800x.jpg?v=1659441895",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Balance Sleep Shirt Lon Sleeve - Dagsmejan",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Nightwear",
              "productLink": "https://dagsmejan.com/collections/women-dagsmejan/products/balance-sleepshirt-long-sleeve-women",
              "titleofProduct": "SLEEPSHIRT LONG SLEEVE WOMEN",
              "price": "113",
              "currency" : "Pond",
              "description": "Incredible softness paired with lightweight breathability for supreme night comfort. Discover the most comfortable nightgown for women - 6x more breathable than cotton, 4x better at moisture management and 2x softer. Never feel too hot or cold at night with the best sleepwear for night sweats.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/1604/6077/products/img3_cb20991c-90dc-4f33-a388-a2599489267b_800x.jpg?v=1668677792",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/1604/6077/products/img1_6eb509e0-d300-4dd0-a03c-b8902cb57585_800x.jpg?v=1668677792",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/1604/6077/products/img4_1a60b122-139c-4f27-99fe-57b145f30840_800x.jpg?v=1668677792",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Explorer V2 for Women - 8000kicks",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Footwear",
              "productLink": "https://www.8000kicks.com/products/explorer-v2-for-women-black-and-white",
              "titleofProduct": "Explorer V2 for Women Black and White",
              "price": "102",
              "currency" : "Pond",
              "description": "The Explorer is the first-ever model of hemp shoes developed by 8000Kicks. It was designed and engineered in Portugal to achieve the most sustainable, durable and comfortable sneaker ever built. Minimalist, yet stylish enough to fit every occasion, indoors or outdoors.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0209/7371/5505/products/Blackandwhite4_8dbe017a-dbd2-4dc4-86d7-e72f5ae4ba57_800x.jpg?v=1615551931",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0209/7371/5505/products/Blackwomen_b1e35a20-0887-4d29-89bb-d1dc21e0357e_295x.jpg?v=1610894038",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0209/7371/5505/products/29_295x.jpg?v=1637783826",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Alex Dusky Blue Shoes - Rackle Shoes\n",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Footwear",
              "productLink": "https://rackleshoes.com/collections/womens-sustainable-shoes/products/alex-dusky-blue-womens",
              "titleofProduct": "Alex Dusky Blue Women's",
              "price": "80",
              "currency" : "Pond",
              "description": "Look good, feel good and do good in sustainable, eco-friendly footwear from Rackle. The ALEX is made with a 100% sustainable hemp upper and Eco-Pure�, a foam midsole/outsole unit that promotes bio-degradation. Designed for an everyday wear, with plush cushioning, they weigh in at a super lightweight 6 ounces. Featuring Rackle�s proprietary Plexus Arch� technology, that stimulates the foot, providing recovery benefits and comfort as you move though the day. You�ll feel so good, you might forget you have them on.\nThe 100% sustainable hemp upper is made of high grade hemp and provides year-round comfort and support thanks to the plants natural benefits: cool in the summer and warm in the winter; anti-microbial; lightweight; water-resistant; UV-resistant; and extremely durable.\nOur shoes soles are made of EcoPure� and incorporate Rackle�s proprietary PLEXUS ARCH� design. EcoPure� foam promotes bio-degradation � it begins to break down after 1 year in active enclosed landfill conditions. The PLEXUS ARCH� with its raised ribbed arch design stimulates the foot where veins in the arch area meet (plexus) during forward motion (e.g. walking, etc.). PLEXUS ARCH� technology offers recovery and comfort for people on the go.\nAmazingly comfortable, extremely lightweight, 100% sustainable - everything you need in your shoes, and nothing you don�t.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0297/6196/2119/products/duskyblue-alex-a_1024x1024@2x.jpg?v=1628044734",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0297/6196/2119/products/duskyblue-alex-b_1024x1024@2x.jpg?v=1628044734",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0297/6196/2119/products/OOOclouds_1024x1024_2x_1655797e-62b2-4546-b044-82d22578776f_1024x1024@2x.gif?v=1628044996",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Hemp Sandal - Rawganique",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Footwear",
              "productLink": "https://rawganique.com/collections/hemp-sandals/products/handmade-hemp-sandals-oregon-trail",
              "titleofProduct": "OREGON TRAIL Handmade Hemp Sandals (37 - 40 Women's 6 - Men's 7)",
              "price": "88",
              "currency" : "Pond",
              "description": "Handmade 100% organic hemp sandals with cork footbed and 100% natural rubber sole. Adjustable top strap with velcro closure. The cork shapes to your foot over time. Breathable, healthy. Made from start to finish at Rawganique Atelier. You can stain proof and water proof the uppers and straps using our 100% natural wax.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/oregon-trail-20201208-_Z6N8237-8.jpg?v=1660100309",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/oregon-trail-20201208-_Z6N8240-2b.jpg?v=1660100309",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/oregon-sandals-0K8A9260-2.jpg?v=1660100309",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Valani",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Accessories",
              "productLink": "https://shopvalani.com/collections/accessories/products/rufina-ruffle-hemp-scrunchie",
              "titleofProduct": "Rufina Ruffle Hemp Scrunchie\n(Ruff-eena)",
              "price": "16",
              "currency" : "Pond",
              "description": "There�s never a dull moment when Rufina is around. She�s charming, funny, and a little bit unexpected. She gets the job done as well as anyone else, but Rufina does it with style.   Rufina is made with a special blend of Hemp/Tencel and matches perfectly with the VALANI hemp collection.  Look completely put together with the right matching accessories.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/ruffina_b79a2ac6-cd51-44fd-bda0-68883d6c0d70.jpg?v=1630988802",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/ruffina-2.jpg?v=1630988802",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/DSC02376A_600x.jpg?v=1630988802",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Valani 2",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Accessories",
              "productLink": "https://shopvalani.com/collections/accessories/products/mocha-hemp-dog-bandana?variant=35946122838177",
              "titleofProduct": "Mocha Hemp Bandana",
              "price": "15",
              "currency" : "Pond",
              "description": "Mocha is a girl�s best friend. She�s there when the sun is shining, and there when you need a good cry. She�s classic, not basic, and she�ll never go out of style. She loves animals as much as people, and they love her back.\n\n \n\nMocha�s a comfort in tough times and a perennial partner in crime.   She looks best with her girls by her side. After all, a squad�s not complete without matching accessories.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/W99003_750_600x.jpg?v=1614449134",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/Bandana1_600x.jpg?v=1614449134",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0440/0522/8705/products/JZP_3627A_600x.jpg?v=1614449134",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Vegan Hemp Laptop Bag - Rawganique",
              "category": "Clothing",
              "subCategory": "Women",
              "section": "Accessories",
              "productLink": "https://rawganique.com/collections/hemp-accessories/products/vegan-hemp-laptop-bag-manhattan",
              "titleofProduct": "MANHATTAN 100% Organic Hemp Laptop Bag (15x11.4x4) (Plastic-Free)",
              "price": "154",
              "currency" : "Pond",
              "description": "Handmade 100% organic hemp laptop commute bag, featuring YKK metal zippers, house-made hemp trips, and our famed stiff unwashed hemp canvas that is gorgeous textured and ultra strong. Use our 100% natural wax to waterproof and stain-proof. Inside padded hemp dividing wall. Great for traveling or commuting to the office.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/rgbg-900tr-2.jpg?v=1628565507",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/rgbg-900tr-4.jpg?v=1628565564",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/rgbg-900tr-7.jpg?v=1628565564",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Below Knee Skirt � Gaia Conception",
              "category": "Clothing",
              "subCategory": "Children",
              "section": "Girls Bottoms",
              "productLink": "https://gaiaconceptions.com/product/girls-wanderer-below-knee-skirt/",
              "titleofProduct": "Girls � Wanderer Below Knee Skirt",
              "price": "67",
              "currency" : "Pond",
              "description": "Shape � The Wanderer is a flowy, full-bodied A-line design, creating indispensable mobility and comfort that will keep you coming back to it again and again. For a less flowy A-line design, view our Simplicity shape. The drawstring waistband is a string in the top seam of the garment, which can be adjusted for desired fit.",
              "variations": "yes",
              "pictureLink1": "https://gaiaconcept.wpenginepowered.com/wp-content/uploads/2016/10/bkwandererskirtkids1__75755.jpg",
              "pictureLink2": "https://gaiaconcept.wpenginepowered.com/wp-content/uploads/2016/10/bkwandererskirtkids2__05983.jpg",
              "pictureLink3": "https://gaiaconcept.wpenginepowered.com/wp-content/uploads/2016/10/bkwandererskirtkids3__36851.jpg",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Hemp Unisex Sweatpants - Jungmaven",
              "category": "Clothing",
              "subCategory": "Children",
              "section": "Girls Bottoms",
              "productLink": "https://jungmaven.com/collections/kids-hemp-clothing/products/hemp-sweatpants-kids-grom",
              "titleofProduct": "GROM SWEATPANT",
              "price": "31",
              "currency" : "Pond",
              "description": "Hemp sweatpants for the next generation of Mavens. Super soft for the most sensitive skin, but durable enough for the playground. Hemp fabric lasts for years, so can be passed down to little siblings or friends when your Grom is ready to size up.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/1123/4596/products/GromSweatPDP3_1800x1800.jpg?v=1643147950",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/1123/4596/products/GromSweatPDP4_1800x1800.jpg?v=1643147977",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/1123/4596/products/GromSweatPant_claygreen_1800x1800.jpg?v=1629236282",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Organic Cotton dress � Play up Store",
              "category": "Clothing",
              "subCategory": "Children",
              "section": "Girls Dresses",
              "productLink": "https://www.playupstore.com/en/girl/kids-girl-3-14-years/organic-cotton-dress/item_25920.html?id=284&cat=394&pc=1",
              "titleofProduct": "Jersey stitch sleeveless dress | Illustration",
              "price": "25.75",
              "currency" : "Pond",
              "description": "This dress is made of jersey stitch organic cotton with fleece on the inside, Frame Melange colour. This sleeveless model has a round neck with a detail on the side. All the raw materials used in this item have Standard 100 certification by OEKO-TEX, so it is free of substances that are harmful for children's skin. Fits larger than usual - we suggest ordering one size smaller.",
              "variations": "yes",
              "pictureLink1": "https://www.playupstore.com/api/api.php/getImage/1920/0/3/aW1hZ2VzX3Byb2RzX3N0YXRpYy9TS1VfR1JPVVAvNEFKMTE0NTBfTTA1MV8xLmpwZw==.jpg",
              "pictureLink2": "https://www.playupstore.com/api/api.php/getImage/1920/0/3/aW1hZ2VzX3Byb2RzX3N0YXRpYy9TS1VfR1JPVVAvNEFKMTE0NTBfTTA1MV8yLmpwZw==.jpg",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Organic Cotton bikini Briefs - Rawganique",
              "category": "Clothing",
              "subCategory": "Children",
              "section": "Girls Underwear",
              "productLink": "https://rawganique.com/collections/kidswear/products/girls-organic-pima-cotton-bikini-briefs",
              "titleofProduct": "Girls' Organic Pima Cotton Bikini Briefs",
              "price": "15",
              "currency" : "Pond",
              "description": "RGB-925 Girls' Organic Pima Cotton Bikini Briefs. Natural. Unbleached & undyed. Sizes 4 - 14+.\nGirls' Organic Pima Cotton Bikini Briefs\nOur Girls' Organic Pima Cotton Bikini Panty Briefs are made from the softest certified organic USA pima cotton. 100% organic pima cotton jersey. Covered elastic band.\nMade in Canada. Chemical-free. Unbleached & undyed. Sweatshop-free.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/RGB-925-2.jpg?v=1599205097",
              "pictureLink2": "",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Organic Cotton Briefs � Luck & Me",
              "category": "Clothing",
              "subCategory": "Children",
              "section": "Girls Underwear",
              "productLink": "https://luckyandme.com/products/gracie-tween-girls-organic-cotton-briefs",
              "titleofProduct": "Gracie Tween Girls Organic Cotton Briefs (5-Pack)",
              "price": "31",
              "currency" : "Pond",
              "description": "Our classic Gracie pure organic cotton girls brief underwear in larger sizes�designed to fit tweens and young teen girls.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0266/1492/3336/products/lm-gracie-tween-delightful-group-4000px_1024x1024.jpg?v=1667240476",
              "pictureLink2": "https://ucarecdn.com/1ad838cf-97f1-49e3-8c05-ed4d7021a671/-/format/auto/-/preview/3000x3000/-/quality/lighter/gracie-tween-brief-girls-lifestyle.jpg",
              "pictureLink3": "https://ucarecdn.com/75740936-5e4c-4a27-b99f-f42f7306c15c/-/format/auto/-/preview/3000x3000/-/quality/lighter/gracie-briefs-features-infographic-tween-desktop.png",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Organic Cotton Bikini Briefs � Luck & Me",
              "category": "Clothing",
              "subCategory": "Children",
              "section": "Girls Underwear",
              "productLink": "https://luckyandme.com/products/erica-girls-organic-cotton-bikini-underwear",
              "titleofProduct": "Erica Girls Organic Cotton Bikini Underwear (6-Pack)",
              "price": "29",
              "currency" : "Pond",
              "description": "The ultimate in soft comfort, this 100% organic cotton underwear has fabric covered waistband and leg openings.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0266/1492/3336/products/lm_product_girls_4000px_erica-macaron-group_1024x1024.jpg?v=1620224983",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0266/1492/3336/products/lm_product_girls_4000px_erica-macaron-pink_1024x1024.jpg?v=1620224984",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0266/1492/3336/products/lm_product_girls_4000px_erica-macaron-yellow_1024x1024.jpg?v=1620224984",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Organic Cotton Camisole � Luck & Me",
              "category": "Clothing",
              "subCategory": "Children",
              "section": "Girls Underwear",
              "productLink": "https://luckyandme.com/products/gracie-girls-organic-cotton-camisoles",
              "titleofProduct": "Gracie Girls Organic Cotton Camisoles (3-Pack)",
              "price": "22",
              "currency" : "Pond",
              "description": "This organic cotton cami is the ultimate in soft, natural comfort.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0266/1492/3336/products/lm_gracie_cami_whimsy_group_4000px_1024x1024.jpg?v=1585868473",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0266/1492/3336/products/lm_gracie_cami_whimsy_navy_4000px_1024x1024.jpg?v=1585868518",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0266/1492/3336/products/lm_gracie_cami_whimsy_ghost_4000px_1024x1024.jpg?v=1585868500",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Hemp Short Trousers Pyjamas - Mydo",
              "category": "Clothing",
              "subCategory": "Children",
              "section": "Sleepwear",
              "productLink": "https://mydo.world/prodotto/pippin-childs-pyjama-short-trousers-with-piping-100-hemp/",
              "titleofProduct": "Pippin - Child's Pyjama short trousers with piping - 100% Hemp",
              "price": "324",
              "currency" : "Pond",
              "description": "Natural fabrics that caress the body without forcing it to move to leave the warmth of dreams on the skin",
              "variations": "yes",
              "pictureLink1": "https://mydo.world/wp-content/uploads/2021/04/MDW-CHILD-PAJAMAS-SHORT-SLEEVES-SHORT-PANTS-WHITE-PIPING-RED-100HEMP-FRONT-copia.jpg",
              "pictureLink2": "https://mydo.world/wp-content/uploads/2021/04/MDW-CHILD-PAJAMAS-SHORT-SLEEVES-SHORT-PANTS-WHITE-PIPING-RED-100HEMP-BACK-copia.jpg",
              "pictureLink3": "https://mydo.world/wp-content/uploads/2021/04/MDW-CHILD-PAJAMAS-SHORT-SLEEVES-SHORT-PANTS-WHITE-PIPING-BLUE-100HEMP-FRONT-copia.jpg",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Hemp & Linen Long Trousers Pyjama - Mydo",
              "category": "Clothing",
              "subCategory": "Children",
              "section": "Sleepwear",
              "productLink": "https://mydo.world/prodotto/noa-childs-pyjama-long-trousers-50-hemp-50-linen/",
              "titleofProduct": "Noa - Child's Pyjama long trousers - 50% hemp 50% linen",
              "price": "360",
              "currency" : "Pond",
              "description": "Natural fabrics that caress the body without forcing it to move to leave the warmth of dreams on the skin",
              "variations": "yes",
              "pictureLink1": "https://mydo.world/wp-content/uploads/2021/04/MDW-CHILD-PAJAMAS-SHORT-SLEEVES-LONG-PANTS-BLUE-100HEMP-FRONT.jpg",
              "pictureLink2": "https://mydo.world/wp-content/uploads/2021/04/MDW-CHILD-PAJAMAS-SHORT-SLEEVES-LONG-PANTS-BLUE-100HEMP-BACK-copia.jpg",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Recycled Plastic Longline Waterproof Jacket- Polarnopyret",
              "category": "Clothing",
              "subCategory": "Children",
              "section": "Coats & Jackets",
              "productLink": "https://www.polarnopyret.co.uk/products/longline-kids-waterproof-shell-navy-6-12years-60453487-483",
              "titleofProduct": "Longline Waterproof Kids Shell Jacket",
              "price": "32",
              "currency" : "Pond",
              "description": "Our longer style kid�s navy shell jacket is 100% waterproof, offering great protection from torrential downpours. Almost sold out!",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0333/7099/6875/products/7325855446173_720x720_crop_center.jpg?v=1595257296",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0333/7099/6875/products/coat_2444263b-93c5-470c-bcf5-8dd131f9c02b_360x360_crop_center.jpg?v=1597323429",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0333/7099/6875/products/7325855446173_1_USP_720x720_crop_center.jpg?v=1597323430",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Organic Cotton Hoodie - Mighty",
              "category": "Clothing",
              "subCategory": "Children",
              "section": "Coats & Jackets",
              "productLink": "https://www.mightly.com/collections/girls/products/boys-girls-gender-nuetral-organic-cotton-hoodie?variant=39816620310711",
              "titleofProduct": "Kids Organic Cotton Hoodies",
              "price": "32",
              "currency" : "Pond",
              "description": "Kids Zip Up Hoodie\nGlobal Organic Textile Standard (GOTS) Certified\nSoft brushed inside\nEasy-up zipper\nSnap pockets Lined hood for warmth\n100% Organic Cotton Hoodies are perfect for layering. Mightly's zip up style has a locker loop and pockets that can be snapped closed.  \nPre-Shrunk Fabric.\nMachine Wash Cold. Tumble Dry.\nDesigned in California.\nMade in India.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0023/4337/0861/products/1HP001NS_1_500x.jpg?v=1660779864",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0023/4337/0861/products/1HP001NS_2_500x.jpg?v=1660779864",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "The Hemp Haven",
              "category": "Clothing",
              "subCategory": "Children",
              "section": "Footwear",
              "productLink": "https://www.thehemphaven.com.au/products/musty-pink",
              "titleofProduct": "Dusty Pink- Kids",
              "price": "31",
              "currency" : "Pond",
              "description": "Our Children's Hemp Shoes are practical, durable & comfortable for little feet. We make the soles slightly wider than usual to allow their little toes to spread and encourage balance. The full exterior is Hemp fabric, finished with Hemp rope at the base & Hemp shoe laces.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0267/1656/9786/products/IMG_E8519_590x.jpg?v=1660723076",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0267/1656/9786/products/IMG_E8620_590x.jpg?v=1660723076",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0267/1656/9786/products/0U3A3784_590x.jpg?v=1660723076",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Hemp Baby Blanket",
              "category": "Clothing",
              "subCategory": "Children",
              "section": "Accessories",
              "productLink": "https://bundlesofhope.cc/products/blanket",
              "titleofProduct": "Hemp Bundling Blanket - 48\" x 48\" Green, White, Yellow",
              "price": "37",
              "currency" : "Pond",
              "description": "100% Organic Hemp\nAmazing info on Hemp - amazing bundling blanket set made out of 100% organic Hemp. Hemp has traditionally been available overseas but, is now becoming available in the United States. Hemp offers distinct advantages in comfort and durability. Significant benefits for the economic and environmental sustainability of our planet. Hemp produces more fiber per acre than trees, flax and cotton. While taking 200-250% LESS water to grow. As we are looking for ways to conserve water - BUY HEMP.\nBreathable Super Fiber. While hemp fabric is super strong it is also super soft.\nAll products are quality controlled. Premium quality Hemp beautifully crafted. Makes a perfect gift for a new baby.\nHypoallergenic and Biodegradable, No Pesticides or Herbicides, Anti-Microbial, UV Resistant\nSoft upon Delivery - Softer with Each Washing. This product remains soft and strong after repeated washings. This is the best quality of a multi-use baby product. It can be washed over and over again. The color remains and the fabric is soft yet strong.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/1290/2973/products/0.jpg?v=1654548140",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/1290/2973/products/IMG_8470.jpg?v=1654548105",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/1290/2973/products/IMG_8488.jpg?v=1654548128",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Hemp Bathrobe � Mydo.World",
              "category": "Clothing",
              "subCategory": "Children",
              "section": "Accessories",
              "productLink": "https://mydo.world/prodotto/aki-childs-yukata-100-hemp/",
              "titleofProduct": "Aki - Child's Yukata - 100% hemp",
              "price": "342",
              "currency" : "Pond",
              "description": "Attention to detail is something you learn as a child, even in the most carefree moments like that of the bathroom",
              "variations": "yes",
              "pictureLink1": "https://mydo.world/wp-content/uploads/2021/04/MDW-CHILD-YUKATA-NATURAL-WHITE-100-HEMP-FRONT-copia.jpg",
              "pictureLink2": "https://mydo.world/wp-content/uploads/2021/04/MDW-CHILD-YUKATA-NATURAL-WHITE-100-HEMP-BACK-copia.jpg",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Hemp Unisex Sweat Short - Jungmaven",
              "category": "Clothing",
              "subCategory": "Children",
              "section": "Boys Bottoms",
              "productLink": "https://jungmaven.com/collections/kids-hemp-clothing/products/hemp-shorts-kids-grom-sweat-short",
              "titleofProduct": "GROM SWEAT SHORT",
              "price": "62",
              "currency" : "Pond",
              "description": "Hemp shorts for the next generation of Mavens. Super soft for the most sensitive skin, but durable enough for the playground. Hemp fabric lasts for years, so can be passed down to little siblings or friends when your Grom is ready to size up.\nRuns small; sizing up is recommended\nBuilt to last with rugged hemp fibers\nMade in Los Angeles, USA",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/1123/4596/products/GromSweatshortPDP1_1800x1800.jpg?v=1643147881",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/1123/4596/products/GromSweatshortPDP2_1800x1800.jpg?v=1643147842",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/1123/4596/products/Gromshort_claygreen_1800x1800.jpg?v=1629235469",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Organic Cotton Pyjamas � Luck & Me",
              "category": "Clothing",
              "subCategory": "Children",
              "section": "Boys Sleepwear",
              "productLink": "https://luckyandme.com/products/jojo-kids-organic-cotton-pajamas",
              "titleofProduct": "JoJo Boys & Girls Organic Cotton Pajamas",
              "price": "29",
              "currency" : "Pond",
              "description": "Our dreamy long sleeve pajama sets are crafted from the softest organic cotton for cozy comfort and warmth.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0266/1492/3336/products/lm-maya-pj-pink-stripe-group-4000px_0973719b-e90d-4282-a756-f7bd99572a7b_1024x1024.jpg?v=1615592160",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0266/1492/3336/products/lm-mason-pj-navy-stripe-group-4000px_be8e90f4-8f6f-42de-9e4a-979425698050_1024x1024.jpg?v=1615592168",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0266/1492/3336/products/lm-mason-pj-dino-group-4000px_5b465a5e-e8a4-4232-8b41-f52e28fb2f20_1024x1024.jpg?v=1615592177",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Organic Cotton Boys Boxer - Rawganique",
              "category": "Clothing",
              "subCategory": "Children",
              "section": "Boys Underwear",
              "productLink": "https://rawganique.com/collections/kidswear/products/boys-organic-pima-cotton-knit-boxers",
              "titleofProduct": "Boys' Organic Pima Cotton Knit Boxers",
              "price": "15",
              "currency" : "Pond",
              "description": "RGB-975 Boys' Organic Pima Cotton Jersey Boxers. Natural. Unbleached & undyed. 3 - 12+ years. Made in Canada. Sweatshop-free.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0466/9109/0599/products/RGB-975-2.jpg?v=1599205127",
              "pictureLink2": "",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Organic Cotton Boxer Briefs � Luck & Me",
              "category": "Clothing",
              "subCategory": "Children",
              "section": "Boys Underwear",
              "productLink": "https://luckyandme.com/products/nolan-organic-cotton-boys-boxer-briefs",
              "titleofProduct": "Nolan Boys Organic Cotton Boxer Briefs (7-Pack)",
              "price": "33",
              "currency" : "Pond",
              "description": "Organic cotton boxer briefs with a fabric-covered elastic waistband provide extra coverage and snug comfort.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0266/1492/3336/products/nolan-organic-cotton-boys-boxer-briefs-1500x1500_1024x1024.jpg?v=1662466221",
              "pictureLink2": "https://ucarecdn.com/ac5818ed-44b3-4d0b-b093-a1d7e7369118/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0266/1492/3336/products/lm_nolan_bb_parakeet_group_4000px_8027132b-5c53-46bc-a870-bebdf99a82b6_1024x1024.jpg?v=1647288135",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Organic Cotton Briefs � Luck & Me",
              "category": "Clothing",
              "subCategory": "Children",
              "section": "Boys Underwear",
              "productLink": "https://luckyandme.com/products/lucas-boys-organic-cotton-briefs?variant=31747703177356",
              "titleofProduct": "Lucas Boys Organic Cotton Briefs (3-Pack)",
              "price": "17",
              "currency" : "Pond",
              "description": "This super soft and natural organic cotton brief style with no-roll waistband will keep him comfy all day long.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0266/1492/3336/products/lm_lucas_oceanic_4000px-02_1024x1024.jpg?v=1592485966",
              "pictureLink2": "https://ucarecdn.com/4e98e9be-465d-4718-904c-d6ebca4b1dc3/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0266/1492/3336/products/lucas-cotton-boys-briefs-orange-1500x1500_1024x1024.jpg?v=1579182569",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Tampons � Your Daye",
              "category": "Clothing",
              "subCategory": "Bathroom",
              "section": "Hygiene",
              "productLink": "https://yourdaye.com/products/squish/",
              "titleofProduct": "Daye � Squish Set",
              "price": "29",
              "currency" : "Pond",
              "description": "Daye and Charli Howard at Squish bring you the ultimate period self-care kit: de-puff, tackle hormonal breakouts, and tune into your period power with CBD tampons",
              "variations": "yes",
              "pictureLink1": "https://images.prismic.io/ecommerce-website/57642e64-0f6c-47fe-8e04-0bc0036d38fe_squish-main.png?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&q=50&rect=0%2C0%2C1156%2C1000&w=578&h=500",
              "pictureLink2": "https://images.prismic.io/ecommerce-website/2c9d68f5-dab6-4e8b-9120-8c5e943a389d_2-squish-packaging.png?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&q=50&rect=22%2C0%2C1156%2C1000&w=578&h=500",
              "pictureLink3": "https://images.prismic.io/ecommerce-website/e62ddc99-642c-49c6-af60-35ddfe584ee0_4-squish-packaging.png?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&q=50&rect=22%2C0%2C1156%2C1000&w=578&h=500",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Build Your Own Tampon Box � Your Daye",
              "category": "Clothing",
              "subCategory": "Bathroom",
              "section": "Hygiene",
              "productLink": "https://yourdaye.com/subscribe/",
              "titleofProduct": "Subscribe to Daye tampons",
              "price": "4.50 to 6.70",
              "currency" : "Pond",
              "description": "Choose the tampons you'd like\nyellow tick symbol\nWe sync with every cycle length\nyellow tick symbol\nModify, skip or cancel anytime",
              "variations": "yes",
              "pictureLink1": "https://yourdaye.com/static/pouch-tinified-ada3c55255e16763c6be3694e948fc4c.png",
              "pictureLink2": "",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "ProViotics � Your Daye",
              "category": "Clothing",
              "subCategory": "Bathroom",
              "section": "Hygiene",
              "productLink": "http://yourdaye.com/products/proviotics/",
              "titleofProduct": "ProViotics",
              "price": "22.92",
              "currency" : "Pond",
              "description": "Boost your microbiome with ProViotics! They contain nothing but the good bacteria that make up a healthy vaginal and gut microbiome.",
              "variations": "yes",
              "pictureLink1": "https://images.prismic.io/ecommerce-website/9e33a792-42c7-48fc-848e-5f26a99913c1_6-proviotics-refill.png?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&q=50&rect=22%2C0%2C1156%2C1000&w=578&h=500",
              "pictureLink2": "https://images.prismic.io/ecommerce-website/7ab4aed8-632d-4e8f-8b0e-c48fa86bdcce_ProViotics-new-jar-with-pills.jpg?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&q=50&rect=22%2C0%2C1156%2C1000&w=578&h=500",
              "pictureLink3": "https://images.prismic.io/ecommerce-website/a26502a9-4e0a-4d6e-862b-3dc724e00ca4_ProViotics-new-jar-front.png?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&q=50&rect=0%2C0%2C1156%2C1000&w=578&h=500",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Sheets - Jungmaven",
              "category": "Clothing",
              "subCategory": "Bedroom",
              "section": "Bedding",
              "productLink": "https://jungmaven.com/collections/hemp-home-goods-decor-bedding/products/hemp-bedding-sheets",
              "titleofProduct": "100% HEMP SHEETS",
              "price": "123",
              "currency" : "Pond",
              "description": "Like sleeping on clouds� effortlessly floating between here and far away, between then and now. Woven for softness and breathability, this 100% hemp weave gets softer and more luxurious with each wash. Similar to the texture of linen, but dreamier. ",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/1123/4596/products/Jungmaven12.15.2130221_1800x1800.jpg?v=1640823678",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/1123/4596/products/Jungmaven12.15.2130103_69199fe0-b56e-4295-92da-3ea9acda1126_1800x1800.jpg?v=1640823678",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/1123/4596/products/Jungmaven12.15.2130242_1800x1800.jpg?v=1640823678",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Duvet Cover - Jungmaven",
              "category": "Clothing",
              "subCategory": "Bedroom",
              "section": "Bedding",
              "productLink": "https://jungmaven.com/collections/hemp-home-goods-decor-bedding/products/hemp-bedding-duvet-cover",
              "titleofProduct": "100% HEMP DUVET COVER",
              "price": "162",
              "currency" : "Pond",
              "description": "The 100% Hemp Duvet Cover is like kiss of the sun through the window in the morning. Woven for softness and breathability, this 100% hemp weave gets softer and more luxurious with each wash. Similar to the texture of linen, but dreamier.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/1123/4596/products/Jungmaven12.15.2130191_1800x1800.jpg?v=1640824541",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/1123/4596/products/Jungmaven12.15.2130163_1800x1800.jpg?v=1640824541",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/1123/4596/products/Jungmaven12.15.2130252_1800x1800.jpg?v=1640824541",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Pillowcases - Jungmaven",
              "category": "Clothing",
              "subCategory": "Bedroom",
              "section": "Bedding",
              "productLink": "https://jungmaven.com/collections/hemp-home-goods-decor-bedding/products/hemp-pillow-cases",
              "titleofProduct": "100% HEMP PILLOW CASES SET OF 2",
              "price": "45",
              "currency" : "Pond",
              "description": "You'll love these pillow cases so much you'll pack them on trips to cover the pillows wherever you sleep. Just don't forget them, because nobody wants to return them.  \n100% hemp, naturally washed and unbleached \nTextured but soft, heavy weight but breathable\nSimilar to the texture of linen, but dreamier\n2 Queen Pillowcases: 19\" x 29\"\nPillowcases have side envelope closure\nWash once or twice before using to soften the fabric",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/1123/4596/products/Jungmaven12.15.2130103_1800x1800.jpg?v=1640823535",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/1123/4596/products/Jungmaven12.15.2130258_1800x1800.jpg?v=1640823535",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/1123/4596/products/Jungmaven12.15.2130180_1800x1800.jpg?v=1640823535",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Bath Towel - Jungmaven",
              "category": "Clothing",
              "subCategory": "Home",
              "section": "Accessories",
              "productLink": "https://jungmaven.com/collections/hemp-home-goods-decor-bedding/products/hemp-towel-bath",
              "titleofProduct": "JUNGMAVEN BATH TOWEL",
              "price": "47",
              "currency" : "Pond",
              "description": "These are the best towels for the bath and beach! It's the towel that you'll gravitate toward at 6 am half asleep before coffee. You'll bring this along when you travel to the Mountains, Tokyo, Paris and surfing New York City.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/1123/4596/products/Towel_1800x1800.jpg?v=1646883040",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/1123/4596/products/Towel_WashedWhite_2_1800x1800.jpg?v=1646883040",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/1123/4596/products/Towel_WashedWhite_3_1800x1800.jpg?v=1646883040",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Essential Cooking Pan - Fromourplace",
              "category": "Clothing",
              "subCategory": "Home",
              "section": "Kitchenware",
              "productLink": "https://fromourplace.co.uk/products/always-essential-cooking-pan?variant=39932930982065",
              "titleofProduct": "",
              "price": "90",
              "currency" : "Pond",
              "description": "Meet our cult-favourite best-selling Always Pan. This do-it-all wonder is designed to replace eight traditional pieces of cookware. And it looks pretty good too.\n25.5 cm. diameter, 6.86 cm. depth, 2.46 L capacity\nLightweight construction (1.36 kg body)\nCompatible with all cooktops, including induction\nCeramic coating made without toxins",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0569/4937/5153/products/AlwaysPan_Steam_1_843ec937-3ab3-4edf-a733-2e94b7ea1ee7_750x.png?v=1623366210",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0569/4937/5153/products/PDP_Steam_V2_2_6b9e66b2-dbb7-43ce-a38e-f85bd64846fb_750x.png?v=1623366210",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0569/4937/5153/products/AlwaysPan_steam_6_d8861a03-d020-43e2-9fd3-12c3c966ba8c_750x.png?v=1623366210",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Perfect Pot - Fromourplace",
              "category": "Clothing",
              "subCategory": "Home",
              "section": "Kitchenware",
              "productLink": "https://fromourplace.co.uk/products/perfect-pot?variant=40485861884081",
              "titleofProduct": "Perfect Pot",
              "price": "140",
              "currency" : "Pond",
              "description": "Meet the pot that thought of everything and everyone.  We designed one (truly) perfect pot that combines every single pot and then some. Made with the same game-changing ingenuity that made the Always Pan a sellout, the Perfect Pot does everything from boiling to baking, crisping to steaming. Simply put, we reimagined what a pot can be, and it turns out, a pot can be perfect.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0569/4937/5153/products/PerfectPot_Blue_1_750x.png?v=1628546657",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0569/4937/5153/products/PerfectPot_Blue_2_750x.png?v=1628546753",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0569/4937/5153/products/PerfectPot_Blue_7_750x.png?v=1628546997",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Vodka",
              "category": "Beverages",
              "subCategory": "Alcohol",
              "section": "Spirits",
              "productLink": "https://lephiltre.com/panier/en/product/bouteille-bleu/",
              "titleofProduct": "BOTTLE LE PHILTRE",
              "price": "49",
              "currency" : "Pond",
              "description": "Born from the imagination of brothers Fr�d�ric and Charles Beigbeder and their friend Guillaume Rappeneau, Le Philtre is a French vodka, organic and without any added sugar to smooth its texture.",
              "variations": "yes",
              "pictureLink1": "https://lephiltre.com/panier/wp-content/uploads/2021/06/Le-Philtre-SF.jpeg",
              "pictureLink2": "",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Vodka 2",
              "category": "Beverages",
              "subCategory": "Alcohol",
              "section": "Spirits",
              "productLink": "https://karadarshop.com/en/bio-spirits/organic-grappa-riserva-walcher-distillery",
              "titleofProduct": "Organic Grappa Riserva 40% vol. Walcher Distillery",
              "price": "20.8",
              "currency" : "Pond",
              "description": "This organic Reserve Grappa is destilled slowly from organic grape peels and then aged in oak barells. The flavor is chracherized by scents of dried fruits and vanilla, pleasantly mild on the palate.",
              "variations": "yes",
              "pictureLink1": "https://karadarshop.com/31365-medium_default/organic-grappa-riserva-walcher-distillery.jpg",
              "pictureLink2": "https://karadarshop.com/31366-medium_default/organic-grappa-riserva-walcher-distillery.jpg",
              "pictureLink3": "https://karadarshop.com/31367-medium_default/organic-grappa-riserva-walcher-distillery.jpg",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Rum",
              "category": "Beverages",
              "subCategory": "Alcohol",
              "section": "Spirits",
              "productLink": "https://www.drinkfinder.co.uk/p/119691/dark-rum/papagayo/papagayo-organic-reserva-rum-70cl",
              "titleofProduct": "PAPAGAYO ORGANIC RESERVA RUM 70CL",
              "price": "37.99",
              "currency" : "Pond",
              "description": "This organic Reserva rum has been distilled in small batches in a remote area of Paraguay from organic certified and cooperatively farmed sugar cane molasses. This rum is finished in selected organic wine casks, each cask is hand selected for bottling by the Master Blender.",
              "variations": "yes",
              "pictureLink1": "https://d3mlfr7cn1raek.cloudfront.net/17/3/images/catalog/i/xl_11175-papagayo-reserve-rum.jpg",
              "pictureLink2": "",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Organic wine",
              "category": "Beverages",
              "subCategory": "Alcohol",
              "section": "Wine",
              "productLink": "https://karadarshop.com/en/bio-wines/granitus-santerhof-winery-bio",
              "titleofProduct": "Granitus 2018 - 13% vol. Santerhof - Wilhelm Gasser Organic Winery",
              "price": "16.65",
              "currency" : "Pond",
              "description": "Wine obtained from biological grapes.",
              "variations": "yes",
              "pictureLink1": "https://karadarshop.com/24235-medium_default/granitus-santerhof-winery-bio.jpg",
              "pictureLink2": "https://karadarshop.com/24237-medium_default/granitus-santerhof-winery-bio.jpg",
              "pictureLink3": "https://karadarshop.com/24238-medium_default/granitus-santerhof-winery-bio.jpg",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Grappa Storica Riserva",
              "category": "Beverages",
              "subCategory": "Alcohol",
              "section": "Liqueurs",
              "productLink": "https://karadarshop.com/en/distillates-grappa-and-liqueurs/grappa-storica-riserva-distillery-domenis",
              "titleofProduct": "Grappa Storica Riserva 50% vol. Distillery Domenis",
              "price": "40",
              "currency" : "Pond",
              "description": "0,5 lt.",
              "variations": "yes",
              "pictureLink1": "https://karadarshop.com/32726-medium_default/grappa-storica-riserva-distillery-domenis.jpg",
              "pictureLink2": "https://karadarshop.com/32727-medium_default/grappa-storica-riserva-distillery-domenis.jpg",
              "pictureLink3": "https://karadarshop.com/32728-medium_default/grappa-storica-riserva-distillery-domenis.jpg",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "La Binchoise Organic Bio Triple",
              "category": "Beverages",
              "subCategory": "Alcohol",
              "section": "Beers",
              "productLink": "https://www.beersofeurope.co.uk/beer/country/belgium/la-binchoise-organic-bio-triple",
              "titleofProduct": "La Binchoise Organic Bio Triple",
              "price": "2.99",
              "currency" : "Pond",
              "description": "A certified organic triple.",
              "variations": "yes",
              "pictureLink1": "https://www.beersofeurope.co.uk/images/product/l/LaBinchoiseBioTripleOrganic.jpg?t=1616533798",
              "pictureLink2": "",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Alcohol Free World Beer Mixed Case",
              "category": "Beverages",
              "subCategory": "Non Alcohol",
              "section": "Beers",
              "productLink": "https://www.thebelgianbeercompany.com/p/beer-cases/alcohol-free-world-beer-mixed-case/",
              "titleofProduct": "Alcohol Free World Beer Mixed Case",
              "price": "27.29",
              "currency" : "Pond",
              "description": "Alcohol free beers are becoming increasingly popular. We sell beers from all over the world so have put this mixed case together so you can sample some of the best alcohol free beers currently on the market",
              "variations": "yes",
              "pictureLink1": "https://www.thebelgianbeercompany.com/wp-content/uploads/2021/05/Alcohol-Free-Beer-Case-Mix-Pack.png",
              "pictureLink2": "",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "AquaSummer",
              "category": "Beverages",
              "subCategory": "Non Alcohol",
              "section": "Specialty Tea�s",
              "productLink": "https://www.kusmitea.com/int/aquasummer-organic-herbal-tea-AQSUBIOMASTER.html?v=21673A1070&lgw_code=12962-21673A1070",
              "titleofProduct": "AquaSummer Herbal tea Hibiscus, peach, apricot",
              "price": "15.4",
              "currency" : "Pond",
              "description": "Enjoy summer all year round with this organic peach-apricot herbal tea!\nGuess what! It�s summer all year round with AquaSummer! Your summer fling is the real thing. As the seasons pass, you�ll always have a taste of summer on your lips as you relish in utter relaxation and sun-ripened fruits. Tart hibiscus notes, the velvety, fleshy peach and apricot flavors�it�s just like being there all over again.\nLet the summer festivals begin. Hot or iced, get an instant fruit shot with this organic, caffeine-free herbal tea.\nAvailable in loose leaf (because it�s also good for the planet) or in teabags for when you�re on the go.",
              "variations": "yes",
              "pictureLink1": "https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BDHT_PRD/on/demandware.static/-/Sites-masterCatalog_Kusmi/default/dwb897007d/images/b/0/7/0/b0709ff299d4fc436dd585654c2a4b06ed949c93_21673A1070.png?sw=400",
              "pictureLink2": "",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "OCHASKI Organic Shizuoka Premium Ceremonial-Grade Matcha",
              "category": "Beverages",
              "subCategory": "Non Alcohol",
              "section": "Specialty Tea�s",
              "productLink": "https://www.takaski.com/product/ochaski-organic-premium-ceremonial-grade-matcha-1kg-free-can-made-in-japan/?attribute_pa_kind=och-3&aelia_cs_currency=GBP&srsltid=AR5OiO0UCJCEjBsxoO7KedNBXS584EuHWR3p_TfqZRyFwBJBisUL2FiRr",
              "titleofProduct": "OCHASKI Organic Shizuoka Premium Ceremonial-Grade Matcha 1kg + Free Can � Made in Japan",
              "price": "161.68",
              "currency" : "Pond",
              "description": "OCHASKI Organic Commercial Wholesale Size Premium Ceremonial-Grade Matcha with a Free Can. Produced for commercial use for sophisticated hotels, restaurants and cafes for straight matcha drinks. JAS certified. Comes in two 500g bags. OCH 1 is suitable as ceremonial matcha. OCH 2 is suitable as ceremonial and mixed matcha drinks. OCH 3 is suitable as mixed drinks and matcha deserts. It takes min. 10 days for production in Shizuoka and order dispatch from Japan. 1kg can be pre-packed in 50g or 100g bags for a fee if requested by email after purchase. Established in Tokyo, Ochaski is a nihon-cha specialist, offering premium Japanese tea to tea lovers around the globe. All Ochaski�s tea products are single-sourced from Japanese family-run tea growers only. They are thus 100% traceable. Ochaski�s collection of tea begins with a conversation with tea growers. It is not only Ochaski�s tea that is made in Japan � the tea containers, bags and wrapping materials are also made right here in Japan.",
              "variations": "yes",
              "pictureLink1": "https://www.takaski.com/wp-content/uploads/2018/07/Ochaski-Premium-Organic-Ceremonial-Grade-Matcha-Japan.jpg",
              "pictureLink2": "https://www.takaski.com/wp-content/uploads/2018/01/Kyoma-600x600.jpg",
              "pictureLink3": "https://www.takaski.com/wp-content/uploads/2018/01/Products_tea_can2.jpg",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Destination 'Tradition' organic coffee beans",
              "category": "Beverages",
              "subCategory": "Non Alcohol",
              "section": "Specialty Coffee",
              "productLink": "https://www.maxicoffee.com/en-gb/destination-tradition-organic-coffee-beans-1kg-p-1617.html?lgw_code=11806-1617",
              "titleofProduct": "Destination 'Tradition' organic coffee beans - 1kg",
              "price": "17.5",
              "currency" : "Pond",
              "description": "Arabica and Robusta\nOrganic coffee\nFor a traditional espresso\nRoasted in France\n1kg coffee beans",
              "variations": "yes",
              "pictureLink1": "https://www.maxicoffee.com/en-eu/images/products/large/cafe_grains_tradition_1000g_destination-1.jpg",
              "pictureLink2": "",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "AROUND THE WORLD BUNDLE",
              "category": "Beverages",
              "subCategory": "Non Alcohol",
              "section": "Specialty Coffee",
              "productLink": "https://unionroasted.com/products/around-the-world-bundle-4-pack?currency=GBP&variant=39444979744877&utm_medium=cpc&utm_source=google&utm_campaign=Googl",
              "titleofProduct": "AROUND THE WORLD BUNDLE",
              "price": "27",
              "currency" : "Pond",
              "description": "Hailing from three continents, we present our Around The World bundle, a selection of single origins which present the variety of coffee flavours from the globe.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0060/6230/9494/products/Around_the_World_Bundle_Prod_1.png?v=1626263850",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0060/6230/9494/files/filter_tb.png?9018904116016797722",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0060/6230/9494/files/filter_sq.png?9018904116016797722",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Black Bee Pharmacy Jelly Multivitamin 20 vials 10 ml",
              "category": "Beverages",
              "subCategory": "Non Alcohol",
              "section": "VITAMINS/SUPPLEMENTS",
              "productLink": "https://www.parafarmacia-online.com/en/black-bee-pharmacy-jelly-multivitamin-20-vials-10-ml",
              "titleofProduct": "BLACK BEE PHARMACY JELLY MULTIVITAMIN 20 VIALS 10 ML",
              "price": "13.93",
              "currency" : "Pond",
              "description": "Liquid food supplement based on Royal Jelly, 12 vitamins and Ashwaganda, a plant that helps maintain energy levels and maintain physical and mental well-being. Take 1 vial of 10 ml per day, directly or dissolved in a glass of water or juice, preferably on an empty stomach.",
              "variations": "yes",
              "pictureLink1": "https://static3.parafarmacia-online.com/9703-large_default/black-bee-pharmacy-jelly-multivitamin-20-vials-10-ml.jpg",
              "pictureLink2": "",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Whole Pimento/All Spice",
              "category": "Beverages",
              "subCategory": "Herbs",
              "section": "Spices and Seasoning",
              "productLink": "https://www.jamaicavalley.com/product-page/whole-pimento-all-spice-product-of-jamaica",
              "titleofProduct": "Whole Pimento/All Spice (Product of Jamaica)",
              "price": "2.99",
              "currency" : "Pond",
              "description": "Pimento is also known as allspice because it tastes like a combination of cinnamon, nutmeg and cloves. ... The dried berries of the evergreen pimento tree are dark brown and are available both whole and ground. Jamaica Valley Pimento is a Proud, authentic product of Jamaica!",
              "variations": "yes",
              "pictureLink1": "https://static.wixstatic.com/media/322f1a_340743e314d34a52ba3983e811217cb6~mv2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/322f1a_340743e314d34a52ba3983e811217cb6~mv2.webp",
              "pictureLink2": "",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Hemp Oil",
              "category": "Beverages",
              "subCategory": "OIL�s",
              "section": "CBD Oil",
              "productLink": "https://medterrahemp.co.uk/collections/oils/products/hemp-oil",
              "titleofProduct": "Hemp Oil",
              "price": "26.99",
              "currency" : "Pond",
              "description": "Our most popular product, Medterra's Hemp Oil is made with our 99%+ Hemp and Organic MCT Oil (Coconut derived) and is available in strengths of 500mg, 1000mg and 3000mg. Safe, affordable, and easy-to-use, each Hemp Oil contains 30 servings and can be taken day or night, sublingually.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0595/8287/3783/products/MT_OG_Tincture_Isolate_500mg_BOTTLE_FinalRender_HEMP_Front_400x.png?v=1635854884",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0595/8287/3783/products/MT_OG_Tincture_Isolate_500mg_BOTTLE_FinalRender_HEMP_Side1_400x.png?v=1635854885",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0595/8287/3783/products/Medterra_CBD_Oil_14_400x.png?v=1630307999",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Broad Spectrum Oil",
              "category": "Beverages",
              "subCategory": "OIL�s",
              "section": "CBD Oil",
              "productLink": "https://medterrahemp.co.uk/collections/oils/products/ultra-broad-spectrum-oil",
              "titleofProduct": "Ultra Broad Spectrum Oil",
              "price": "53.99",
              "currency" : "Pond",
              "description": "Medterra's Ultra Broad Spectrum� Hemp tinctures utilize our potent full-plant hemp extract without THC. Unlike our isolate tinctures which contains only Hemp, our broad spectrum tinctures contain Hemp with additional beneficial compounds such as CBG, CBN, CBC, CBDV, and natural terpenes.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0595/8287/3783/products/broad-spectrum-tincture-citrus-1000_89cbc8db-b2d4-4a8a-b696-6cf2dddbf205copy_700x.png?v=1631618015",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0595/8287/3783/products/2broad-spectrum-tincture-citrus-1000_89cbc8db-b2d4-4a8a-b696-6cf2dddbf205copy_700x.png?v=1631618015",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0595/8287/3783/products/5broad-spectrum-tincture-citrus-1000_89cbc8db-b2d4-4a8a-b696-6cf2dddbf205copy_700x.png?v=1631618028",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Hemp & CBG Oil",
              "category": "Beverages",
              "subCategory": "OIL�s",
              "section": "CBD Oil",
              "productLink": "https://medterrahemp.co.uk/collections/oils/products/hemp-cbg-oil",
              "titleofProduct": "Hemp + CBG Oil",
              "price": "71.99",
              "currency" : "Pond",
              "description": "Medterra�s unique 1:1 blend of Hemp and CBG combine two powerful cannabinoids to create this exciting formula. Unlike other CBG tinctures on the market, Medterra�s Hemp + CBG Tinctures combine powerful amounts of both CBG and Hemp. As always at Medterra, if we are going to do something, we are going to do it right!",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0595/8287/3783/products/01cbghemp_700x.png?v=1631624227",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0595/8287/3783/products/02cbghemp_700x.png?v=1631624228",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0595/8287/3783/products/04cbghemp_700x.png?v=1631624235",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Black Seed Oil",
              "category": "Beverages",
              "subCategory": "OIL�s",
              "section": "Black Seed Oil",
              "productLink": "https://heshhealth.com/products/pure-virgin-black-seed-oil",
              "titleofProduct": "Black Seed Oil - 100% Virgin - Cold Pressed",
              "price": "8.99",
              "currency" : "Pond",
              "description": "Cold-pressed from the finest Egyptian virgin black seeds, Black Seed Oil is revered across all cultures for its amazing benefits. This oil was once widely known as the \"Pharaohs Oil\", such is its prestigious reputation as the treatment oil for various ailments and infections.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0511/4078/8409/products/black_seed_oil-copy.jpg?v=1639876190",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0511/4078/8409/products/A2660Tile1BlackSeedOIlstg3.jpg?v=1666429688",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0511/4078/8409/products/A2660Tile4BlackSeedOIlstg3.jpg?v=1666429729",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "STRONG Black Seed Oil",
              "category": "Beverages",
              "subCategory": "OIL�s",
              "section": "Black Seed Oil",
              "productLink": "https://theblessedseed.com/shop/strong-black-seed-oil-100ml-bottle/",
              "titleofProduct": "STRONG Black Seed Oil � 100ml",
              "price": "17",
              "currency" : "Pond",
              "description": "Our strong black seed oil in a 100ml bottle is perfect for anyone who wants to try out the oil for a first time. Made from 100% pure, cold-pressed, and the finest quality Nigella Sativa seeds, it is the exact amount of black seed oil to try out before committing to a larger and a stronger one.\nAnd since our strong black seed oil is 4-5 times more powerful than most black seed oils on the market, with a volatile oil percentage of 3.3% � 4% (as a rule, the higher the volatile oil content, the more powerful it gets), you don�t even need too much of it! Once you start taking the oil, you�ll feel its powerful priorities within a few days.\nOur strong black seed oil is known for its exceptional properties and a lot of its cannot be found in other products in the market. We create the oils ourselves with companies who know and accept our requirements. That means producing the oil at the slowest speed possible creating the best cold press oil you may find.",
              "variations": "yes",
              "pictureLink1": "https://theblessedseed.com/wp-content/uploads/2017/09/strong-black-seed-oil-100-ml-1.png",
              "pictureLink2": "https://theblessedseed.com/wp-content/uploads/2017/09/strong-black-seed-oil-100-ml.png",
              "pictureLink3": "https://theblessedseed.com/wp-content/uploads/2017/09/The-Blessed-Seed-Black-Seed-Oil-Pourer-3.jpg",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Oxy-Powder",
              "category": "Beverages",
              "subCategory": "OIL�s",
              "section": "Supplements",
              "productLink": "https://globalhealing.com/collections/supplements/products/oxy-powder",
              "titleofProduct": "Oxy-Powder�",
              "price": "29.95",
              "currency" : "Pond",
              "description": "Is gas, bloating, or occasional constipation making you feel like your digestive system needs a tune-up? Maybe you just want to counteract the effects of the toxins that permeate our food, water, and air. Whatever your motivation, Oxy-Powder can help. It uses natural oxygen to safely and effectively melt away compacted feces from your intestinal tract. It�s an easy way to stay regular and support a healthy lifestyle.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0539/5621/4984/products/Oxy-Powder-120_1800x1800.png?v=1665006009",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0539/5621/4984/products/3000w_1a1e2945-9e52-4df4-8878-7537e691f442_1800x1800.jpg?v=1665006009",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0539/5621/4984/products/oxy-powder-carousel-2_1800x1800.jpg?v=1665005949",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Vitamin B12",
              "category": "Beverages",
              "subCategory": "OIL�s",
              "section": "Supplements",
              "productLink": "https://globalhealing.com/collections/supplements/products/vitamin-b12",
              "titleofProduct": "Vitamin B12 Natural Energy Boost in an Organic Vegan Formula",
              "price": "35.96",
              "currency" : "Pond",
              "description": "Vitamin B12 is a vital nutrient that supports normal energy levels, cardiovascular health, and the nervous system. We�ve created an organic, triple-activated vitamin B12 supplement that provides organic nutritional support to meet your needs.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0539/5621/4984/products/b12-1oz-22v02--bottle_1800x1800.png?v=1660256117",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0539/5621/4984/products/vitamin-b12-thumbnail_1800x1800.png?v=1659563777",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0539/5621/4984/products/carousel-1_bd84c660-023c-4046-ba20-a31055c01029_1800x1800.jpg?v=1665085956",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Hemp Capsules",
              "category": "Beverages",
              "subCategory": "OIL�s",
              "section": "Supplements",
              "productLink": "https://medterrahemp.co.uk/collections/capsules/products/hemp-capsules",
              "titleofProduct": "Hemp Capsules",
              "price": "40.99",
              "currency" : "Pond",
              "description": "Hemp Capsules",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0595/8287/3783/products/1102hempcapsulescopy_700xcopy_400x.png?v=1635247540",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0595/8287/3783/products/02hempcapsulescopy_400x.png?v=1631625157",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0595/8287/3783/products/Medterra_CBD_Capsules_7_400x.jpg?v=1631625157",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Hemp Joint & Muscle Cream",
              "category": "Beverages",
              "subCategory": "OIL�s",
              "section": "Creams",
              "productLink": "https://medterrahemp.co.uk/collections/hemp-topical-creams/products/hemp-cooling-cream-roll-on",
              "titleofProduct": "Hemp Rapid Cooling Cream Roll-on",
              "price": "53.99",
              "currency" : "Pond",
              "description": "Relief + Recovery Roll On is a powerhouse combination of 250mg of Hemp and organic ingredients. Available in a mess-free, roll-on applicator, this topical cream provides a rapid cooling effect, perfect for joint and muscle support. Our convenient applicator is perfect for an active, on-the-go lifestyle.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0595/8287/3783/products/01rollonhempcopy_700x.png?v=1631626138",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0595/8287/3783/products/02rollonhempcopy_700x.png?v=1631626142",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Dog Calming Hemp oil",
              "category": "Animals",
              "subCategory": "Animals",
              "section": "Wellbeing",
              "productLink": "https://hemptology.co.uk/product/dog-calming-wellbeing-hemp-oil/",
              "titleofProduct": "DOG CALMING & WELLBEING HEMP OIL",
              "price": "25",
              "currency" : "Pond",
              "description": "100% Himalayan Hemp Oil  Containing all 18 Essential Amino Acids and Omega 3, 6 & 9  for a Healthy and Happy dog.",
              "variations": "yes",
              "pictureLink1": "https://i1.wp.com/hemptology.co.uk/wp-content/uploads/2021/07/DSCF1301.jpg?fit=576%2C768&ssl=1",
              "pictureLink2": "https://i1.wp.com/hemptology.co.uk/wp-content/uploads/2021/07/DSCF1303.jpg?fit=576%2C768&ssl=1",
              "pictureLink3": "https://i0.wp.com/hemptology.co.uk/wp-content/uploads/2021/07/hemptology_hemp_dog_oil.jpg?fit=1000%2C706&ssl=1",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Hemp Pet Shampoo",
              "category": "Animals",
              "subCategory": "Animals",
              "section": "Pet Grooming",
              "productLink": "https://www.theneemteam.co.uk/neem-team-neem-hemp-pet-shampoo.html",
              "titleofProduct": "Neem Team - Neem & Hemp Pet Shampoo",
              "price": "9.25",
              "currency" : "Pond",
              "description": "Hemp oil is rich in Omega-3,6 and 9 fatty acids which may help stimulate growth of hair and improve blood circulation. Our Neem & Hemp shampoo combines the anti-inflammatory and repellent properties of neem with the complementary benefits of hemp oil.\nVegan-friendly. No artificial colours, SLS, SLES, known allergens, or parabens. Our products are never tested on animals.\nAlways consult a vet if you are worried about your pet. Do not use on sore or broken skin.\nMay cause eye irritation- avoid eyes and mouth. For external use only. Keep out of reach of children",
              "variations": "yes",
              "pictureLink1": "https://www.theneemteam.co.uk/user/products/large/Bluepark_1%20Bottles_1%20(2).jpg",
              "pictureLink2": "https://www.theneemteam.co.uk/user/products/large/Bluepark_1%20Bottles_1%20(2)[1].jpg",
              "pictureLink3": "",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Hemp Oil Shampoo",
              "category": "Animals",
              "subCategory": "Animals",
              "section": "Pet Grooming",
              "productLink": "https://www.showseasongrooming.com/products/16-oz-hemp-oil-shampoo",
              "titleofProduct": "Hemp Pet Shampoo | Showseason�",
              "price": "16",
              "currency" : "Pond",
              "description": "Hemp happiness, even if you're not into \"hemp\" like that! Soothes dry, itchy skin while preserving existing hydration.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/1235/3190/products/Hemp-Shampoo-Group_540x.png?v=1652469282",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/1235/3190/products/Hemp-Shampoo-16-oz_1024x1024@2x.png?v=1652469282",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/1235/3190/products/HempShampooGallon_clipped_rev_1_1_1024x1024@2x.png?v=1652469282",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Hemp Pet Beds",
              "category": "Animals",
              "subCategory": "Animals",
              "section": "Accessories",
              "productLink": "https://hemporganiclife.com/collections/hemp-for-pets-hemp-pet-beds-hemp-pet-mat-and-rugs/products/hemp-and-linen-pet-bed-mat-carpet-filled-organic-hemp-fiber-in-thick-falx-non-dyed-natural-fabric-pad-mattress-house-for-cats-organic?variant=31132675538979",
              "titleofProduct": "HEMP PET BED IN NATURAL NON-DYED LINEN FABRIC FILLED ORGANIC HEMP FIBER - MAT CARPET - HOUSE FOR CATS ORGANIC",
              "price": "46",
              "currency" : "Pond",
              "description": "HEMP pet bed in natural non-dyed linen fabric filled organic HEMP Fiber - mat carpet - house for cats organic\nmattress for the pets is made from natural materials, non poliester inside - natural hemp fiber - dogs and cats's very love it!\nThe material of the top is thick flax\\linen fabric, the filler is hemp fiber.\nDue to the hemp filler this lounger has unique properties: �\nThermoregulation:\nwill create comfort for your pet at any time of the year - cool in the heat and warm in winter.\nAbsorb odors and prevent the appearance of harmful bacteria, other pests.\nIt can be made according to customer sizes! Please, contact! all sizes - we make them by hand - all to order.\nAlso, possible personalization - embroidery on the bed for your pet.",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0272/6461/4435/products/HEMP-pet-bed-in-natural-non-dyed-linen-fabric-filled-organic-HEMP-Fiber-mat-carpet-house-for-cats-organic-HempOrganicLife_1100x.jpg?v=1651429599",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0272/6461/4435/products/HEMP-pet-bed-in-natural-non-dyed-linen-fabric-filled-organic-HEMP-Fiber-mat-carpet-house-for-cats-organic-HempOrganicLife-2_1100x.jpg?v=1651429605",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0272/6461/4435/products/HEMP-pet-bed-in-natural-non-dyed-linen-fabric-filled-organic-HEMP-Fiber-mat-carpet-house-for-cats-organic-HempOrganicLife-5_1100x.jpg?v=1651429622",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Hemp Pet Mat",
              "category": "Animals",
              "subCategory": "Animals",
              "section": "Accessories",
              "productLink": "https://hemporganiclife.com/collections/hemp-for-pets-hemp-pet-beds-hemp-pet-mat-and-rugs/products/copy-of-round-hemp-pet-mat-carpet-filled-hemp-fiber-rug-dog-mat-pad-cat-mat-organic-dog-mat-pad-organic-cat-pet-blanket?variant=31878142394403",
              "titleofProduct": "UNIQUE HEMP PET MAT CARPET FILLED HEMP FIBER/DOG MAT PAD/ CAT MAT/ORGANIC DOG MAT PAD/ORGANIC CAT/ PET BLANKET",
              "price": "30.9",
              "currency" : "Pond",
              "description": "Double-sided mattress for your lovely pet is made on 100% from natural materials.\nThe material:\none side - warm hemp&wool fabric\nsecond size - non-dyed linen fabric\nthe filler - is hemp fiber.\nDue to the hemp filler this lounger has unique properties: �\nThermoregulation:\nwill create comfort for your pet at any time of the year - cool in the heat and warm in winter.\nAbsorb odors and prevent the appearance of harmful bacteria, other pests.\n",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0272/6461/4435/products/Unique-HEMP-pet-mat-carpet-filled-HEMP-Fiberdog-mat-pad-cat-matorganic-dog-mat-padorganic-cat-pet-blanket-HempOrganicLife_1100x.jpg?v=1651433083",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0272/6461/4435/products/Unique-HEMP-pet-mat-carpet-filled-HEMP-Fiberdog-mat-pad-cat-matorganic-dog-mat-padorganic-cat-pet-blanket-HempOrganicLife-2_1100x.jpg?v=1651433089",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0272/6461/4435/products/Unique-HEMP-pet-mat-carpet-filled-HEMP-Fiberdog-mat-pad-cat-matorganic-dog-mat-padorganic-cat-pet-blanket-HempOrganicLife-9_1100x.jpg?v=1651430263",
              "pictureLink4": "",
              "pictureLink5": ""
            },
            {
              "nameofProduct": "Natural Fibre iPhone cases",
              "category": "Personal Electronics & Electric Mobility",
              "subCategory": "Personal Electronics & Electric Mobility",
              "section": "Mobile Case",
              "productLink": "https://eu.mous.co/products/limitless-3-0-bamboo-phone-case?variant=39384506433629&gclid=CjwKCAjw-L-ZBhB4EiwA76YzOS7Esxry65xlhonFzxkIWZao2OJF8rIqhIhk6mDsXVxXYmy5PqKTFhoCUIgQAvD_BwE",
              "titleofProduct": "Bamboo Phone Case",
              "price": "49.99",
              "currency" : "Pond",
              "description": "Innovative AiroShock� technology provides serious impact protection\nConnects to unique magnetic accessories through AutoAlign+� technology\nUniting style and protection, our design adds minimal extra bulk",
              "variations": "yes",
              "pictureLink1": "https://cdn.shopify.com/s/files/1/0049/5514/4307/products/Bamboo_Limitless3.0_S20Ultra_Perspectiveright_4x4_b842c3fb-093e-410e-aeb2-5ae1b15ffcc6_680x.jpg?v=1641579368",
              "pictureLink2": "https://cdn.shopify.com/s/files/1/0049/5514/4307/products/Bamboo_Limitless3.0_S20Ultra_Fallingright_4x4_e314c338-f910-4024-b42c-b8324fa2b981_680x.jpg?v=1641579368",
              "pictureLink3": "https://cdn.shopify.com/s/files/1/0049/5514/4307/products/Limitless3.0_S20_S20_S20Ultra_Leftside_4x4_24304a73-b417-492d-b3b7-6e7a0638c403_680x.jpg?v=1641579368",
              "pictureLink4": "",
              "pictureLink5": ""
            }
           ]

           for(let product of allproducts){
            product.addedby = req.token_decoded.d
            result = await productsOfStoreHelper.createProductsOfStore(product)
            let store = await Store.findById(productsOfStoreData.storeid)

            store.products.push(result._id)
            await store.save()
           } //end for */
                
           var result = await productsOfStoreHelper.createProductsOfStore(productsOfStoreData)
           let store = await Store.findById(productsOfStoreData.storeid)

           store.products.push(result._id)
           await store.save()
            
            var message = "Product created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getProductsOfStoresWithFullDetails = async (req, res) => {
    console.log("getProductsOfStoresWithFullDetails called")
    var productsOfStoreData = req.body


    try {

        var result = await productsOfStoreHelper.getProductsOfStoresWithFullDetails(productsOfStoreData.sortproperty, productsOfStoreData.sortProductsOfStore, productsOfStoreData.offset, productsOfStoreData.limit, productsOfStoreData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getProductsOfStoresList = async (req, res) => {
    console.log("getProductsOfStoresList called")
    var productsOfStoreData = req.body


    try {

        var result = await productsOfStoreHelper.getProductsOfStoresList(productsOfStoreData.sortproperty, productsOfStoreData.sortProductsOfStore, productsOfStoreData.offset, productsOfStoreData.limit, productsOfStoreData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateProductsOfStore = async (req, res) => {
    console.log("request received for updateProductsOfStore")

    var productsOfStoreData = req.body
    var role = req.token_decoded.r
    try {
        productsOfStoreData.lastModifiedBy = req.token_decoded.d
        
            var result = await productsOfStoreHelper.updateProductsOfStore(productsOfStoreData)
            var message = 'ProductsOfStore Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeProductsOfStore = async (req, res) => {
    console.log("removeProductsOfStore called")
    try {
        var role = req.token_decoded.r

       
            var productsOfStoreData = req.body
            productsOfStoreData.lastModifiedBy = req.token_decoded.d
            var result = await productsOfStoreHelper.removeProductsOfStore(productsOfStoreData)

            var message = "ProductsOfStore removed successfully"

            if (result == "ProductsOfStore does not exists.") {
                message = "ProductsOfStore does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findProductsOfStoreById = async (req, res) => {
    console.log("findProductsOfStoreById called")
    try {
       
        
            var productsOfStoreData = req.body

            var result = await productsOfStoreHelper.findProductsOfStoreById(productsOfStoreData)
            
            var message = "ProductsOfStore find successfully"
            if (result == null) {
                message = "ProductsOfStore does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createProductsOfStore,
    getProductsOfStoresWithFullDetails,
    getProductsOfStoresList,
    updateProductsOfStore,
    removeProductsOfStore,
    findProductsOfStoreById

}



