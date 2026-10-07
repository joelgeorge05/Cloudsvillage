import pic1 from '../assets/images/pic1.webp';
import pic2 from '../assets/images/pic2.webp';
import pic3 from '../assets/images/pic3.webp';
import pic4 from '../assets/images/pic4.webp';
import pic5 from '../assets/images/pic5.webp';
import suite1Img from '../assets/images/suite1.webp';
import dormitoryImg from '../assets/images/dormitory.webp';
import heritage1 from '../assets/images/heritage1.webp';
import heritage2 from '../assets/images/heritage2.webp';
import npool1 from '../assets/images/npool1.webp';
import npool2 from '../assets/images/npool2.webp';
import npool3 from '../assets/images/npool3.webp';
import birdWatchingImg from '../assets/images/bird_watching.webp';
import campfireImg from '../assets/images/campfire_night.webp';
import trekkingTrailImg from '../assets/images/trekking_trail.webp';
import trekkingPeakImg from '../assets/images/trekking_peak.webp';

import gal1 from '../assets/gallery/IMG_2325.webp';
import gal2 from '../assets/gallery/IMG_2331.webp';
import gal3 from '../assets/gallery/IMG_2561.webp';
import gal4 from '../assets/gallery/IMG_2666.webp';

import kottapparaImg from '../assets/destinations/Kottappara.webp';
import kattadikadavuImg from '../assets/destinations/Kattadikadavu.webp';
import anayadikuthuImg from '../assets/destinations/Anayadikuthu.webp';
import thommankuthuImg from '../assets/destinations/Thommankuthu.webp';
import meenuliyanparaImg from '../assets/destinations/Meenuliyanpara.webp';
import palkulameduImg from '../assets/destinations/Palkulamedu.webp';
import malankaraImg from '../assets/destinations/Malankara.webp';
import munnarImg from '../assets/destinations/Munnar.webp';
import vagamonImg from '../assets/destinations/Vagamon.webp';

export const INITIAL_GALLERY = [
    { id: 's1', url: pic1, title: 'Resort Weddings' },
    { id: 's2', url: pic3, title: 'Corporate Retreats' },
    { id: 's3', url: pic4, title: 'Family Gatherings' },
    { id: 's4', url: heritage1, title: 'Cultural Nights' },
    { id: 's5', url: heritage2, title: 'Birthday Celebrations' },
    { id: 's6', url: pic5, title: 'Yoga Retreats' },
    { id: 's7', url: gal1, title: 'Resort Views' },
    { id: 's8', url: gal2, title: 'Scenic Landscapes' },
    { id: 's9', url: gal3, title: 'Relaxing Vibes' },
    { id: 's10', url: gal4, title: 'Nature Escapes' }
];

export const INITIAL_ATTRACTIONS = [
    {
        id: 1,
        title: "Kottappara Viewpoint",
        subtitle: "Misty Sea of Clouds & Sunrise Ridge",
        category: "Viewpoints & Treks",
        description: "Perched at the high crest of Vannappuram's mountain ridge, Kottappara is celebrated across Kerala for its ethereal early-morning 'Koodal' — an unbroken ocean of dense white clouds blanketing the valley below. As the morning sun breaches the horizon, the sea of mist transforms into a radiant amber expanse, creating an unforgettable sunrise spectacle just minutes from Clouds Village.",
        image_url: kottapparaImg,
        distance: "15 MIN AWAY",
        best_time: "5:30 AM – 7:15 AM (Sunrise)",
        trek_level: "Gentle 10-Min Walk",
        highlights: ["Valley Cloud Bed ('Koodal')", "Spectacular Sunrise Horizon", "Cool Morning Drafts"],
        tips: "Reach the summit ridge around 5:45 AM before sunrise. The thick cloud blanket is at its most magical between dawn and 7:00 AM before the sun dissolves the mist.",
        map_link: "https://www.google.com/maps/search/?api=1&query=Kottappara+view+point+Idukki"
    },
    {
        id: 2,
        title: "Kattadikadavu",
        subtitle: "Wind Corridor & 180° Highland Ravine",
        category: "Viewpoints & Treks",
        description: "A dramatic knife-edge ridge renowned for its perpetual cool mountain drafts and untamed wilderness. A scenic 1.5 km trail weaves through wild lemongrass knolls and rocky slopes up to a striking cliff outcrop that plunges straight into verdant ravines. The steady, refreshing breeze rushing up the mountain face makes it an exhilarating morning trek.",
        image_url: kattadikadavuImg,
        distance: "20 MIN AWAY",
        best_time: "6:00 AM – 9:00 AM & 4:30 PM",
        trek_level: "Moderate 1.5 km Trail",
        highlights: ["Perpetual Mountain Winds", "Wild Lemongrass Slopes", "180° Highland Ravine Drop"],
        tips: "Wear sturdy walking footwear for the rocky uphill sections. Late afternoons offer breezy golden-hour light across the valley slopes.",
        map_link: "https://www.google.com/maps/search/?api=1&query=Kattadikadavu+view+point+Idukki"
    },
    {
        id: 3,
        title: "Anayadikuthu Waterfall",
        subtitle: "Lush Evergreen Shallows & Cascading Fall",
        category: "Waterfalls",
        description: "Hidden within a dense tropical forest canopy, Anayadikuthu owes its historic name to wild elephant herds that once ventured down from the higher ridges to drink from its tranquil waters. The river flows gracefully over broad, stepped rock shelves into gentle, shallow natural wading pools, creating a remarkably serene setting for peaceful dips and forest contemplation.",
        image_url: anayadikuthuImg,
        distance: "25 MIN AWAY",
        best_time: "Post-Monsoon (Aug – Jan)",
        trek_level: "Easy 5-Min Forest Trail",
        highlights: ["Broad Stepped Rock Shelves", "Safe Shallow Wading Pools", "Shaded Tropical Canopy"],
        tips: "Ideal for families and relaxed visits due to its gradual shallow waters. The waterfall is at its most picturesque immediately after the monsoon rains.",
        map_link: "https://www.google.com/maps/search/?api=1&query=Anayadikuthu+waterfall+Idukki"
    },
    {
        id: 4,
        title: "Thommankuthu Waterfall",
        subtitle: "Seven-Step Wilderness Forest Cascade & Eco-Trek",
        category: "Waterfalls",
        description: "One of Idukki's premier eco-tourism treasures, Thommankuthu is a magnificent seven-step waterfall cascading through the dense Kaliyar forest reserve. An exhilarating 12-kilometer nature trail follows the roaring mountain river past ancient hanging bridges, deep emerald bathing rock pools, and lush biodiversity habitats sheltered by giant jungle trees.",
        image_url: thommankuthuImg,
        distance: "30 MIN AWAY",
        best_time: "8:00 AM – 4:00 PM (Sep – Feb)",
        trek_level: "Eco-Trek Trail (2 to 12 km)",
        highlights: ["7 Distinct Waterfall Stages", "Forest Dept Guided Trails", "Hanging Footbridge & Caves"],
        tips: "Entry tickets and forest guides are managed at the Forest Department gate. Wear slip-resistant trekking shoes as granite river stones can be mossy.",
        map_link: "https://www.google.com/maps/search/?api=1&query=Thommankuthu+waterfall+Idukki"
    },
    {
        id: 5,
        title: "Meenuliyanpara",
        subtitle: "Colossal Granite Monolith & Evergreen Peak",
        category: "Viewpoints & Treks",
        description: "An awe-inspiring geological landmark towering more than 4,000 feet above sea level, Meenuliyanpara features a massive exposed granite face covering hundreds of acres, miraculously crowned at its summit by a lush two-acre evergreen canopy. The rewarding hike across the rock face opens up a breathtaking 360-degree vista spanning the Western Ghats and winding river tributaries below.",
        image_url: meenuliyanparaImg,
        distance: "35 MIN AWAY",
        best_time: "Early Morning (6:30 AM – 9:30 AM)",
        trek_level: "Adventurous Rock Slope Hike",
        highlights: ["Summit Forested Canopy", "360° Monolithic Panorama", "Ancient Granite Formations"],
        tips: "The exposed rock warms up under direct midday sun; start early in the morning and carry water to enjoy the crisp summit air comfortably.",
        map_link: "https://www.google.com/maps/search/?api=1&query=Meenuliyanpara+Idukki"
    },
    {
        id: 6,
        title: "Palkulamedu",
        subtitle: "Highland Summit with Distant Ocean Vistas",
        category: "Viewpoints & Treks",
        description: "Reaching an impressive elevation of 3,125 feet, Palkulamedu is named after the tranquil freshwater spring ('pal-kulam' or milk pond) that rests near its summit. Known for its cool mountain winds and wild grassland ridges, on exceptionally clear winter dawns visitors can witness the sun illuminating distant coastal plains all the way to the Arabian Sea.",
        image_url: palkulameduImg,
        distance: "40 MIN AWAY",
        best_time: "6:00 AM – 10:00 AM (Clear Dawns)",
        trek_level: "4x4 Jeep Trail / Moderate Hike",
        highlights: ["Highland Freshwater Spring", "Distant Coastal Horizons", "Rolling Grassland Ridges"],
        tips: "The approach road includes rugged terrain; our concierge can help arrange a local 4x4 Jeep transfer for a seamless highland excursion.",
        map_link: "https://www.google.com/maps/search/?api=1&query=Palkulamedu+Idukki"
    },
    {
        id: 7,
        title: "Malankara Dam",
        subtitle: "Serene Lakeside Promenade & Hill Reservoir",
        category: "Highland Escapes",
        description: "Formed across the gentle Muvattupuzha River, Malankara is an expansive water reservoir set against the undulating backdrop of the Western Ghat foothills. The serene waterfront features landscaped walking gardens, quiet breeze-swept promenades, and boating amenities, offering an idyllic and leisurely evening setting.",
        image_url: malankaraImg,
        distance: "45 MIN AWAY",
        best_time: "3:30 PM – 6:30 PM (Sunset Hours)",
        trek_level: "Leisure Waterfront Walk",
        highlights: ["Scenic Reservoir Boating", "Sunset Reflection Over Water", "Landscaped Garden Promenade"],
        tips: "A wonderful stop when returning from afternoon excursions. The gentle lake breezes and sunset reflections over the water provide a calm, relaxing close to the day.",
        map_link: "https://www.google.com/maps/search/?api=1&query=Malankara+Dam+Idukki"
    },
    {
        id: 8,
        title: "Munnar",
        subtitle: "Emerald Tea Valleys, Mist & Rolling Horizons",
        category: "Highland Escapes",
        description: "The historic jewel of Kerala's high ranges, Munnar is celebrated worldwide for its vast undulating carpets of emerald tea plantations, cool misty climate, and colonial hill station heritage. From the rare Nilgiri Tahr at Eravikulam National Park to the mirrored waters of Mattupetty Dam, Munnar offers a legendary high-altitude journey.",
        image_url: munnarImg,
        distance: "1.5 HRS AWAY",
        best_time: "Full Day Excursion (Year-Round)",
        trek_level: "Scenic Drives & Tea Trails",
        highlights: ["Endless Green Tea Estates", "Eravikulam & Mattupetty", "Cool High-Altitude Climate"],
        tips: "Leave Clouds Village early in the morning (around 7:30 AM) to enjoy the picturesque scenic drive through Cheeyappara waterfalls and tea slopes at your own pace.",
        map_link: "https://www.google.com/maps/search/?api=1&query=Munnar+Kerala"
    },
    {
        id: 9,
        title: "Vagamon",
        subtitle: "Pine Forest Whispers & Rolling Highland Meadows",
        category: "Highland Escapes",
        description: "A serene and uncommercialized hill haven defined by whispering pine forests, rolling green meadows (Motta Kunnu), and velvet tea plantations. Its crisp, cool mountain climate and peaceful tea gardens provide a tranquil, romantic highland experience away from crowded tourist circuits.",
        image_url: vagamonImg,
        distance: "1 HR AWAY",
        best_time: "Half-Day or Full-Day Trip",
        trek_level: "Gentle Meadow Strolls & Pine Walks",
        highlights: ["Whispering Pine Valleys", "Rolling Green Meadows", "Kurisumala Monastery Hills"],
        tips: "The whispering pine forest offers wonderful shady walks and photography spots during late morning and early afternoon.",
        map_link: "https://www.google.com/maps/search/?api=1&query=Vagamon+Kerala"
    }
];

export const INITIAL_FACILITIES = [
    {
        id: 'f1',
        title: "Natural Rock Spring Pool",
        description: "Immerse yourself in crystal clear, continuously cascading natural freshwater pools built into the highland stone. Sourced directly from untouched mountain rock springs.",
        image_url: npool1,
        category: "Natural Pools & Water",
        badge: "SIGNATURE EXPERIENCE",
    },
    {
        id: 'f2',
        title: "Luxury Plantation Suites",
        description: "Vernacular wooden architecture nestled amidst spice groves. Featuring handcrafted teak furnishings, panoramic mist-facing verandahs, and unhurried mountain stillness.",
        image_url: suite1Img,
        category: "Accommodations",
        badge: "PREMIUM STAY",
    },
    {
        id: 'f3',
        title: "Moonlit Lawn Banquet & Events",
        description: "Fairy-lit green lawn amphitheater, ceremonial stage, and open-air event space designed for dream destination weddings, birthday galas, and landmark celebrations under the stars.",
        image_url: gal2,
        category: "Events & Celebrations",
        badge: "DESTINATION WEDDINGS",
    },
    {
        id: 'f4',
        title: "Farm-to-Table Organic Dining",
        description: "Authentic, homely Kerala delicacies and estate cuisine prepared daily with 100% organic vegetables, fruits, and heirloom spices harvested straight from the Manjakunnel farm.",
        image_url: pic4,
        category: "Dining",
        badge: "ORGANIC HARVEST",
    },
    {
        id: 'f5',
        title: "Festive Foam & Night Music Lawn",
        description: "Enchanting evening celebrations featuring vibrant foam party showers, curated acoustic sounds, and ambient lighting surrounded by cool mountain forest breezes.",
        image_url: gal3,
        category: "Events & Celebrations",
        badge: "EVENING EXPERIENCE",
    },
    {
        id: 'f6',
        title: "15-Acre Spice Plantation Trail",
        description: "Wander through flourishing plantations with guided trails among fragrant green cardamom, Tellicherry black pepper, cocoa, wild nutmeg, and high-altitude rubber canopies.",
        image_url: pic1,
        category: "Farm Experiences",
        badge: "GUIDED TRAIL",
    },
    {
        id: 'f7',
        title: "Estate Welcome Gateway & Lounge",
        description: "A memorable highland arrival at our iconic sunburst illuminated entrance archway, complete with guest reception, estate orientation, and warm mountain hospitality.",
        image_url: gal1,
        category: "Facilities",
        badge: "ICONIC GATEWAY",
    },
    {
        id: 'f8',
        title: "Group Dormitory & Family Villa",
        description: "Spacious, comfortable wooden group accommodations ideal for large family reunions, hiking expeditions, and corporate retreats seeking authentic shared sanctuary.",
        image_url: dormitoryImg,
        category: "Accommodations",
        badge: "GROUP SANCTUARY",
    },
    {
        id: 'f9',
        title: "Private Lake Boating",
        description: "Glide across the peaceful waters of the private farm reservoir. A tranquil boating experience for couples and families surrounded by untouched greenery and birdsong.",
        image_url: npool2,
        category: "Natural Pools & Water",
        badge: "TRANQUIL RIDE",
    },
    {
        id: 'f10',
        title: "Angling & Fish Pond Experience",
        description: "Try your hand at recreational fishing in our expansive freshwater pond teeming with indigenous fish varieties, equipped with traditional bamboo rods and guidance.",
        image_url: npool3,
        category: "Farm Experiences",
        badge: "LEISURE ANGLING",
    },
    {
        id: 'f11',
        title: "Campfire",
        description: "Gather around crackling mountain wood fires under chilly highland night skies with music, dancing, and joyful celebrations under the stars.",
        image_url: campfireImg,
        images: [campfireImg],
        category: "Activities",
        badge: "STARLIT EVENING",
    },
    {
        id: 'f12',
        title: "Open-Air Gala Celebrations Pavilion",
        description: "Expansive multi-tier outdoor party lawn with custom lighting and mist-wrapped forest views for festive reunions, milestone birthdays, and company getaways.",
        image_url: gal4,
        category: "Events & Celebrations",
        badge: "FESTIVE GALA",
    },
    {
        id: 'f13',
        title: "Bird Watching",
        description: "Spot endemic Western Ghats birds and colourful migratory species in their natural lush habitats, flowering canopies, and landscaped relaxation lawns.",
        image_url: birdWatchingImg,
        images: [birdWatchingImg],
        category: "Activities",
        badge: "NATURE RETREAT",
    },
    {
        id: 'f14',
        title: "Trekking",
        description: "Guided forest expeditions through lush green canopies, bamboo railings, and ancient rock trails culminating in panoramic mountain views.",
        image_url: trekkingTrailImg,
        images: [trekkingTrailImg, trekkingPeakImg],
        category: "Activities",
        badge: "MOUNTAIN ADVENTURE",
    }
];
