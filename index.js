const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the GoogleGenerativeAI instance with your API key
const genAI = new GoogleGenerativeAI("AIzaSyDbPyq2OsrUxnKFcdXbRuInAnVW4mWCqw8");

// INSERT THE carData OBJECT HERE
carData=[
    {
        "Brand": "Mercedes",
        "Model": "Mercedes-AMG GT R",
        "Engine": "4.0L V8 BiTurbo",
        "Horsepower": "577 hp",
        "Speed_0_to_60": "3.5",
        "Top_Speed": "198 mph",
        "Seating_Capacity": "2",
        "Price_USD": "$162,900",
        "commercial":"https://www.youtube.com/embed/csAXruiBLTs?si=5C4E931Zxi32PEJz&amp;start=15",
        "img":"https://images.pexels.com/photos/18354100/pexels-photo-18354100/free-photo-of-green-mercedes-amg-gtr.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "Brand": "BMW",
        "Model": "BMW M8 Competition",
        "Engine": "4.4L V8 BiTurbo",
        "Horsepower": "617 hp",
        "Speed_0_to_60": "3.0", 
        "Top_Speed": "190 mph",
        "Seating_Capacity": "4",
        "Price_USD": "$130,000",
        "commercial":"https://www.youtube.com/embed/PoYKovx16kw?si=a99Tzgdxd4_d0qmc",
        "img":"https://images.pexels.com/photos/8190581/pexels-photo-8190581.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "Brand": "Lamborghini",
        "Model": "Lamborghini Hurac\u00e1n EVO",
        "Engine": "5.2L V10 NA",
        "Horsepower": "631 hp",
        "Speed_0_to_60": "2.9",
        "Top_Speed": "202 mph",
        "Seating_Capacity": "2",
        "Price_USD": "$261,274",
        "commercial":"https://www.youtube.com/embed/1E4CDn4B7wo?si=NtolOg0rZWOayivi&amp;controls=0",
        "img":"https://images.pexels.com/photos/15063615/pexels-photo-15063615/free-photo-of-lamborghini-huracan-parked-on-asphalt-road-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "Brand": "Porsche",
        "Model": "Porsche 911 Turbo S",
        "Engine": "3.8L Twin-Turbo Flat-6",
        "Horsepower": "640 hp",
        "Speed_0_to_60": "2.6",
        "Top_Speed": "205 mph",
        "Seating_Capacity": "4",
        "Price_USD": "$207,000",
        "commercial":"https://www.youtube.com/embed/nT2mjvWC3e8?si=lVm6GhOd9YphR3Q3&amp;controls=0",
        "img":"https://images.pexels.com/photos/17304859/pexels-photo-17304859/free-photo-of-blue-car-on-an-exhibition.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "Brand": "Bentley",
        "Model": "Bentley Continental GT",
        "Engine": "6.0L W12 Twin-Turbo",
        "Horsepower": "626 hp",
        "Speed_0_to_60": "3.6",
        "Top_Speed": "207 mph",
        "Seating_Capacity": "4",
        "Price_USD": "$231,800",
        "commercial":"https://www.youtube.com/embed/oWuY_0gzNMU?si=1EMVNrVUSHweYfsd&amp;controls=0&amp;start=7",
        "img":"https://images.pexels.com/photos/16861684/pexels-photo-16861684/free-photo-of-black-bentley-continental-gt-parked-under-hotel-entrance.jpeg?auto=compress&cs=tinysrgb&w=600"

    },
    {
        "Brand": "Mercedes",
        "Model": "Mercedes-Benz S-Class S580",
        "Engine": "4.0L V8 BiTurbo + EQ Boost",
        "Horsepower": "496 hp",
        "Speed_0_to_60": "4.4",
        "Top_Speed": "155 mph",
        "Seating_Capacity": "5",
        "Price_USD": "$120,000",
        "commercial":"https://www.youtube.com/embed/-4zsY28t76k?si=_N9fCACkjXAPCZ74&amp;controls=0&amp;start=51",
        "img":"https://images.pexels.com/photos/23230766/pexels-photo-23230766/free-photo-of-a-mercedes-benz-s-class-parked-on-the-side-of-a-street.png?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "Brand": "BMW",
        "Model": "BMW X7 M60i",
        "Engine": "4.4L V8 BiTurbo",
        "Horsepower": "523 hp",
        "Speed_0_to_60": "4.5",
        "Top_Speed": "155 mph",
        "Seating_Capacity": "7",
        "Price_USD": "$120,000",
        "commercial":"https://www.youtube.com/embed/hxD1d-wR1Qg?si=5-6FgNb0tNDS4jgW&amp;start=20",
        "img":"https://images.pexels.com/photos/25286633/pexels-photo-25286633/free-photo-of-bmw-xm-suv-in-a-showroom.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "Brand": "Lamborghini",
        "Model": "Lamborghini Urus",
        "Engine": "4.0L V8 BiTurbo",
        "Horsepower": "641 hp",
        "Speed_0_to_60": "3.6",
        "Top_Speed": "190 mph",
        "Seating_Capacity": "5",
        "Price_USD": "$225,500",
        "commercial":"https://www.youtube.com/embed/CggXSu_P2GQ?si=ewulj7DPFAp9ZH15&amp;controls=0&amp;start=52",
        "img":"https://images.pexels.com/photos/16475235/pexels-photo-16475235/free-photo-of-close-up-of-black-lamborghini-urus.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "Brand": "Porsche",
        "Model": "Porsche Cayenne Turbo GT",
        "Engine": "4.0L Twin-Turbo V8",
        "Horsepower": "631 hp",
        "Speed_0_to_60": "3.1",
        "Top_Speed": "186 mph",
        "Seating_Capacity": "5",
        "Price_USD": "$182,150",
        "commercial":"https://www.youtube.com/embed/SCqDbLT0Dh0?si=DSoOB1r16ZroLSLA&amp;controls=0&amp;start=22",
        "img":"https://images.pexels.com/photos/20042057/pexels-photo-20042057/free-photo-of-man-cleaning-and-polishing-car.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "Brand": "Bentley",
        "Model": "Bentley Bentayga Speed",
        "Engine": "6.0L W12 Twin-Turbo",
        "Horsepower": "626 hp",
        "Speed_0_to_60": "3.8",
        "Top_Speed": "190 mph",
        "Seating_Capacity": "5",
        "Price_USD": "$245,000",
        "commercial":"https://www.youtube.com/embed/CMK1xzZ-Q-4?si=g9GeDPpwUtab2owD&amp;controls=0&amp;start=6",
        "img":"https://images.pexels.com/photos/15824825/pexels-photo-15824825/free-photo-of-bentley-bentayga-v8-rims.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "Brand": "Mercedes",
        "Model": "Mercedes-Maybach S680",
        "Engine": "6.0L V12 BiTurbo",
        "Horsepower": "621 hp",
        "Speed_0_to_60": "4.4",
        "Top_Speed": "155 mph",
        "Seating_Capacity": "5",
        "Price_USD": "$220,000",
        "commercial":"https://www.youtube.com/embed/GkoSo97cJn4?si=zY3NmRQD0_Po8Twe&amp;controls=0&amp;start=6",
        "img":"https://images.pexels.com/photos/17115620/pexels-photo-17115620/free-photo-of-black-mercedes-s-class.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "Brand": "BMW",
        "Model": "BMW M5 CS",
        "Engine": "4.4L V8 BiTurbo",
        "Horsepower": "627 hp",
        "Speed_0_to_60": "2.9",
        "Top_Speed": "190 mph",
        "Seating_Capacity": "5",
        "Price_USD": "$142,000",
        "commercial":"https://www.youtube.com/embed/vQXvyV0zIP4?si=uBTsPdT3esPOTJMd&amp;controls=0&amp;start=37",
        "img":"https://images.pexels.com/photos/16475237/pexels-photo-16475237/free-photo-of-white-bmw-m5.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "Brand": "Lamborghini",
        "Model": "Lamborghini Aventador SVJ",
        "Engine": "6.5L V12 NA",
        "Horsepower": "759 hp",
        "Speed_0_to_60": "2.8",
        "Top_Speed": "217 mph",
        "Seating_Capacity": "2",
        "Price_USD": "$517,770",
        "commercial":"https://www.youtube.com/embed/AFXt7BLB0IM?si=Ep0BMGjGT7K8su4M&amp;controls=0&amp;start=32",
        "img":"https://images.pexels.com/photos/14631574/pexels-photo-14631574.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "Brand": "Porsche",
        "Model": "Porsche Panamera Turbo S",
        "Engine": "4.0L Twin-Turbo V8",
        "Horsepower": "620 hp",
        "Speed_0_to_60": "2.9",
        "Top_Speed": "196 mph",
        "Seating_Capacity": "4",
        "Price_USD": "$179,800",
        "commercial":"https://www.youtube.com/embed/-QfRAwg3gkM?si=jYZpmRCzC-dAJZjG&amp;controls=0&amp;start=14",
        "img":"https://images.pexels.com/photos/17191607/pexels-photo-17191607/free-photo-of-new-sports-car-with-spoiler.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "Brand": "Bentley",
        "Model": "Bentley Flying Spur",
        "Engine": "6.0L W12 Twin-Turbo",
        "Horsepower": "626 hp",
        "Speed_0_to_60": "3.7",
        "Top_Speed": "207 mph",
        "Seating_Capacity": "5",
        "Price_USD": "$234,100",
        "commercial":"https://www.youtube.com/embed/K5hegk22kjk?si=DBhUTgMLR6hVDowp&amp;controls=0&amp;start=45",
        "img":"https://images.pexels.com/photos/18131323/pexels-photo-18131323/free-photo-of-a-bentley-flying-spur-parked-in-front-of-an-apartment-building.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
]

// Function to generate a string of car data from the carData object
function generateCarDataString(carData) {
    return carData.map(car => (
        `Brand: ${car.Brand},
         Model: ${car.Model},
         Engine: ${car.Engine},
         Horsepower: ${car.Horsepower},
         Speed_0_to_60:${car.Speed_0_to_60},
         Top_Speed:${car.Top_Speed},
         Seating_Capacity:${car.Seating_Capacity},
         Price_USD:${car.Price_USD},
         commercial:${car.commercial},
         img:${car.img}
        
         .`
    )).join("\n");
}

// Generate the carDataString dynamically from carData
const carDataString = generateCarDataString(carData);

// Endpoint to handle user queries
router.post('/ask', async (req, res) => {
    const userQuery = req.body.query;

    // Generate the prompt with car data and user query
    const prompt = `Based on the following car information: \n${carDataString}\n\n recommend and describe one car based on following question: ${userQuery} in 50 words `;
    
    

    try {
        // Get the generative model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Generate content using the model
        const result = await model.generateContent(prompt);

        

        // Send the result back as JSON
        res.json({  response: result.response.text(),
                    
                    
                    
                 });
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ response: "Error generating response" });
    }

    
});

module.exports = router;
