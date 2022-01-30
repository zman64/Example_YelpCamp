const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const axios = require('axios').default;

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]

// call unsplash and return small image
// async function seedImg() {
//     try {
//         const resp = await axios.get('https://api.unsplash.com/photos/random', {
//             params: {
//                 client_id: 
//                 collections: 1114848,
//             },
//         })
//         return resp.data.urls.small
//     } catch (err) {
//         console.error(err)
//     }
// }


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        // setup
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
          //Your user ID
            author: '61ef412dd3d4208d4ad2fe0f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, quisquam totam. Autem architecto asperiores quae inventore, harum nulla molestias possimus ipsa modi doloribus provident fugiat. Explicabo, iste ipsa? Aspernatur, accusantium!',
            price,
            geometry:{
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
            ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dwozyxk5t/image/upload/v1643232821/YelpCamp/lez8l6tib8sb76taxtio.jpg',
                  filename: 'YelpCamp/lez8l6tib8sb76taxtio',
                },
                {
                  url: 'https://res.cloudinary.com/dwozyxk5t/image/upload/v1643232821/YelpCamp/ojchkgmgb2o0bo8lplae.jpg',
                  filename: 'YelpCamp/ojchkgmgb2o0bo8lplae',
                },
                {
                  url: 'https://res.cloudinary.com/dwozyxk5t/image/upload/v1643232823/YelpCamp/jphswukzcdwiqjvdv647.jpg',
                  filename: 'YelpCamp/jphswukzcdwiqjvdv647',
                }
              ],
            
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})