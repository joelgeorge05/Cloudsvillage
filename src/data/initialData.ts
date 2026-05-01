import pic1 from '../assets/images/pic1.jpeg';
import pic2 from '../assets/images/pic2.jpeg';
import pic3 from '../assets/images/pic3.jpeg';
import pic4 from '../assets/images/pic4.jpeg';
import pic5 from '../assets/images/pic5.jpeg';
import suite1Img from '../assets/images/suite1.jpeg';
import dormitoryImg from '../assets/images/dormitory.jpeg';
import heritage1 from '../assets/images/heritage1.jpeg';
import heritage2 from '../assets/images/heritage2.jpeg';
import npool1 from '../assets/images/npool1.jpeg';
import npool2 from '../assets/images/npool2.jpeg';
import npool3 from '../assets/images/npool3.jpeg';

import gal1 from '../assets/gallery/IMG_2325.JPG';
import gal2 from '../assets/gallery/IMG_2331.JPG';
import gal3 from '../assets/gallery/IMG_2561.JPG';
import gal4 from '../assets/gallery/IMG_2666.JPG';

import kottapparaImg from '../assets/destinations/Kottappara.jpg';
import kattadikadavuImg from '../assets/destinations/Kattadikadavu.jpg';
import anayadikuthuImg from '../assets/destinations/Anayadikuthu.jpg';
import thommankuthuImg from '../assets/destinations/Thommankuthu.jpg';
import meenuliyanparaImg from '../assets/destinations/Meenuliyanpara.jpg';
import palkulameduImg from '../assets/destinations/Palkulamedu.jpg';
import malankaraImg from '../assets/destinations/Malankara.jpg';
import munnarImg from '../assets/destinations/Munnar.jpg';
import vagamonImg from '../assets/destinations/Vagamon.jpg';

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
        description: "A stunning viewpoint offering a panoramic view of the majestic hills and deep valleys below.",
        image_url: kottapparaImg,
        distance: "15 MIN AWAY",
        map_link: "https://www.google.com/maps/search/?api=1&query=Kottappara+view+point+Idukki"
    },
    {
        id: 2,
        title: "Kattadikadavu",
        description: "Known for its cool breeze and spectacular views, Kattadikadavu is perfect for a short trek and a misty morning.",
        image_url: kattadikadavuImg,
        distance: "20 MIN AWAY",
        map_link: "https://www.google.com/maps/search/?api=1&query=Kattadikadavu+view+point+Idukki"
    },
    {
        id: 3,
        title: "Anayadikuthu Waterfall",
        description: "A beautiful cascading waterfall nestled within the lush greenery of Idukki forests.",
        image_url: anayadikuthuImg,
        distance: "25 MIN AWAY",
        map_link: "https://www.google.com/maps/search/?api=1&query=Anayadikuthu+waterfall+Idukki"
    },
    {
        id: 4,
        title: "Thommankuthu Waterfall",
        description: "A scenic seven-step waterfall offering a tranquil escape and adventurous trekking trails.",
        image_url: thommankuthuImg,
        distance: "30 MIN AWAY",
        map_link: "https://www.google.com/maps/search/?api=1&query=Thommankuthu+waterfall+Idukki"
    },
    {
        id: 5,
        title: "Meenuliyanpara",
        description: "A massive rocky peak adorned with a thick layer of green forest atop, offering a breathtaking 360-degree view.",
        image_url: meenuliyanparaImg,
        distance: "35 MIN AWAY",
        map_link: "https://www.google.com/maps/search/?api=1&query=Meenuliyanpara+Idukki"
    },
    {
        id: 6,
        title: "Palkulamedu",
        description: "A high-altitude viewpoint where you can sometimes spot the distant sea and backwaters on a clear day.",
        image_url: palkulameduImg,
        distance: "40 MIN AWAY",
        map_link: "https://www.google.com/maps/search/?api=1&query=Palkulamedu+Idukki"
    },
    {
        id: 7,
        title: "Malankara Dam",
        description: "A beautiful reservoir surrounded by hills, perfect for boating and a quiet evening walk.",
        image_url: malankaraImg,
        distance: "45 MIN AWAY",
        map_link: "https://www.google.com/maps/search/?api=1&query=Malankara+Dam+Idukki"
    },
    {
        id: 8,
        title: "Munnar",
        description: "Famous for its emerald green tea plantations, misty mountains, and pleasant weather all year round.",
        image_url: munnarImg,
        distance: "1.5 HRS AWAY",
        map_link: "https://www.google.com/maps/search/?api=1&query=Munnar+Kerala"
    },
    {
        id: 9,
        title: "Vagamon",
        description: "A quiet hill station known for its rolling pine forests, meadows, and breathtaking deep valleys.",
        image_url: vagamonImg,
        distance: "1 HR AWAY",
        map_link: "https://www.google.com/maps/search/?api=1&query=Vagamon+Kerala"
    }
];

export const INITIAL_FACILITIES = [
    {
        id: 1,
        title: "Suite Rooms",
        description: "Premium luxury suites with gorgeous views and exquisite amenities.",
        image_url: suite1Img,
        category: "Accommodations",
        badge: "PREMIUM choice",
    },
    {
        id: 2,
        title: "Farmstay",
        description: "Experience authentic rural life in our traditional farmstay cottages.",
        image_url: pic2,
        category: "Accommodations",
    },
    {
        id: 3,
        title: "Dormitory",
        description: "Comfortable and spacious shared accommodations for groups and backpackers.",
        image_url: dormitoryImg,
        category: "Accommodations",
    },
    {
        id: 4,
        title: "Massage Centre",
        description: "Rejuvenating therapies and traditional massages for ultimate relaxation.",
        image_url: pic4,
        category: "Wellness",
    },
    {
        id: 5,
        title: "Business Centre",
        description: "Fully equipped modern workspace and meeting rooms for professionals.",
        image_url: pic5,
        category: "Facilities",
    },
    {
        id: 6,
        title: "Banquet Hall",
        description: "State-of-the-art facilities for large gatherings, events, and celebrations.",
        image_url: pic3,
        category: "Facilities",
    },
    {
        id: 7,
        title: "Restaurant",
        description: "Multi-cuisine dining experience with a stunning view.",
        image_url: pic5,
        category: "Dining",
    },
    {
        id: 8,
        title: "Organic Food",
        description: "Farm-to-table dining featuring fresh, locally sourced organic ingredients.",
        image_url: heritage1,
        category: "Dining",
    },
    {
        id: 9,
        title: "Natural Rock Pool",
        description: "Crystal clear natural rock pools perfect for a refreshing dip.",
        image_url: npool1,
        category: "Activities",
        badge: "POPULAR",
    },
    {
        id: 10,
        title: "Farm Tour",
        description: "Guided tours through our rubber plantations, fruit gardens, and rice paddies.",
        image_url: pic1,
        category: "Activities",
    },
    {
        id: 11,
        title: "Campfire",
        description: "Cozy evenings around the campfire with music and storytelling.",
        image_url: pic2,
        category: "Activities",
    },
    {
        id: 12,
        title: "Boating",
        description: "Peaceful boating experiences on the scenic lake.",
        image_url: npool2,
        category: "Activities",
    },
    {
        id: 13,
        title: "Fishing",
        description: "Relaxing fishing activities by our well-stocked ponds.",
        image_url: npool3,
        category: "Activities",
    },
    {
        id: 14,
        title: "Wild Safari",
        description: "Thrilling wildlife encounters and guided safari adventures.",
        image_url: heritage2,
        category: "Activities",
    },
    {
        id: 15,
        title: "Rural Visit",
        description: "Immersive visits to local villages to experience the culture.",
        image_url: heritage1,
        category: "Activities",
    },
    {
        id: 16,
        title: "Bird Watching",
        description: "Spot endemic and migratory birds in their natural lush habitats.",
        image_url: pic4,
        category: "Activities",
    },
    {
        id: 17,
        title: "Trekking",
        description: "Challenging trails offering spectacular panoramic mountain views.",
        image_url: pic1,
        category: "Activities",
    },
    {
        id: 18,
        title: "Camping",
        description: "Sleep under the stars with our secure and scenic camping grounds.",
        image_url: pic2,
        category: "Activities",
    },
    {
        id: 19,
        title: "Cultural Experience",
        description: "Witness traditional art forms and local heritage showcases.",
        image_url: heritage2,
        category: "Activities",
    }
];
