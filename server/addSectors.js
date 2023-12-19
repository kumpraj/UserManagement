const mongoose = require("mongoose");
const Sectors = require('./models/Sectors');
require("dotenv").config();

const sectorsData = [
    { value: "1", label: "Manufacturing", indentation: 0 },
    { value: "19", label: "Construction materials", indentation: 1 },
    { value: "18", label: "Electronics and Optics", indentation: 1 },
    { value: "6", label: "Food and Beverage", indentation: 1 },
    { value: "342", label: "Bakery & confectionery products", indentation: 2 },
    { value: "43", label: "Beverages", indentation: 2 },
    { value: "42", label: "Fish & fish products", indentation: 2 },
    { value: "40", label: "Meat & meat products", indentation: 2 },
    { value: "39", label: "Milk & dairy products", indentation: 2 },
    { value: "437", label: "Other", indentation: 2 },
    { value: "378", label: "Sweets & snack food", indentation: 2 },
    { value: "13", label: "Furniture", indentation: 1 },
    { value: "389", label: "Bathroom/sauna", indentation: 2 },
    { value: "385", label: "Bedroom", indentation: 2 },
    { value: "390", label: "Children’s room", indentation: 2 },
    { value: "98", label: "Kitchen", indentation: 2 },
    { value: "101", label: "Living room", indentation: 2 },
    { value: "392", label: "Office", indentation: 2 },
    { value: "394", label: "Other (Furniture)", indentation: 2 },
    { value: "341", label: "Outdoor", indentation: 2 },
    { value: "99", label: "Project furniture", indentation: 2 },
    { value: "12", label: "Machinery", indentation: 1 },
    { value: "94", label: "Machinery components", indentation: 2 },
    { value: "91", label: "Machinery equipment/tools", indentation: 2 },
    { value: "224", label: "Manufacture of machinery", indentation: 2 },
    { value: "97", label: "Maritime", indentation: 2 },
    { value: "271", label: "Aluminium and steel workboats", indentation: 3 },
    { value: "269", label: "Boat/Yacht building", indentation: 3 },
    { value: "230", label: "Ship repair and conversion", indentation: 3 },
    { value: "93", label: "Metal structures", indentation: 2 },
    { value: "508", label: "Other", indentation: 2 },
    { value: "227", label: "Repair and maintenance service", indentation: 2 },
    { value: "11", label: "Metalworking", indentation: 1 },
    { value: "67", label: "Construction of metal structures", indentation: 2 },
    { value: "263", label: "Houses and buildings", indentation: 2 },
    { value: "267", label: "Metal products", indentation: 2 },
    { value: "542", label: "Metal works", indentation: 2 },
    { value: "75", label: "CNC-machining", indentation: 2 },
    { value: "62", label: "Forgings, Fasteners", indentation: 2 },
    { value: "69", label: "Gas, Plasma, Laser cutting", indentation: 2 },
    { value: "66", label: "MIG, TIG, Aluminum welding", indentation: 2 },
    { value: "9", label: "Plastic and Rubber", indentation: 1 },
    { value: "54", label: "Packaging", indentation: 2 },
    { value: "556", label: "Plastic goods", indentation: 2 },
    { value: "559", label: "Plastic processing technology", indentation: 2 },
    { value: "55", label: "Blowing", indentation: 2 },
    { value: "57", label: "Moulding", indentation: 2 },
    { value: "53", label: "Plastics welding and processing", indentation: 2 },
    { value: "560", label: "Plastic profiles", indentation: 2 },
    { value: "5", label: "Printing", indentation: 1 },
    { value: "148", label: "Advertising", indentation: 2 },
    { value: "150", label: "Book/Periodicals printing", indentation: 2 },
    { value: "145", label: "Labelling and packaging printing", indentation: 2 },
    { value: "7", label: "Textile and Clothing", indentation: 1 },
    { value: "44", label: "Clothing", indentation: 2 },
    { value: "45", label: "Textile", indentation: 2 },
    { value: "8", label: "Wood", indentation: 1 },
    { value: "337", label: "Other (Wood)", indentation: 2 },
    { value: "51", label: "Wooden building materials", indentation: 2 },
    { value: "47", label: "Wooden houses", indentation: 2 },
    { value: "3", label: "Other", indentation: 0 },
    { value: "37", label: "Creative industries", indentation: 1 },
    { value: "29", label: "Energy technology", indentation: 1 },
    { value: "33", label: "Environment", indentation: 1 },
    { value: "2", label: "Service", indentation: 0 },
    { value: "25", label: "Business services", indentation: 1 },
    { value: "35", label: "Engineering", indentation: 1 },
    { value: "28", label: "Information Technology and Telecommunications", indentation: 1 },
    { value: "581", label: "Data processing, Web portals, E-marketing", indentation: 2 },
    { value: "576", label: "Programming, Consultancy", indentation: 2 },
    { value: "121", label: "Software, Hardware", indentation: 2 },
    { value: "122", label: "Telecommunications", indentation: 2 },
    { value: "22", label: "Tourism", indentation: 1 },
    { value: "141", label: "Translation services", indentation: 1 },
    { value: "21", label: "Transport and Logistics", indentation: 1 },
    { value: "111", label: "Air", indentation: 2 },
    { value: "114", label: "Rail", indentation: 2 },
    { value: "112", label: "Road", indentation: 2 },
    { value: "113", label: "Water", indentation: 2 }
];
  
mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('MongoDB Connected');

        //clear any data if any
        await Sectors.deleteMany({});

        // add all new data
        await Sectors.insertMany(sectorsData);

        console.log("Sectors added to database successfully");
        mongoose.disconnect();

    })
    .catch(err => console.log(err))