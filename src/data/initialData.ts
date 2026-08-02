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
        title: "Free WiFi",
        description: "We all are humans, so always connect with your loved ones and share all of your happiness with the world instantly.",
        image_url: pic1,
        category: "Facilities",
    },
    {
        id: 2,
        title: "Suite Rooms",
        description: "Live in the middle of the nature with all the safe facilities. We can provide you a safe and attractive premises.",
        image_url: suite1Img,
        category: "Accommodations",
        badge: "PREMIUM choice",
    },
    {
        id: 3,
        title: "Farm Tour",
        description: "Touch the nature and learn how we grow and maintain the crops. You can join and enjoy the happiness of harvesting together with us.",
        image_url: pic1,
        category: "Activities",
    },
    {
        id: 4,
        title: "Swimming Pool",
        description: "Relax and unwind in our refreshing pool.",
        image_url: npool1,
        category: "Facilities",
    },
    {
        id: 5,
        title: "Massage Centre",
        description: "Rejuvenate your body and mind with our wellness services.",
        image_url: pic4,
        category: "Wellness",
    },
    {
        id: 6,
        title: "Business Centre",
        description: "Ideal for corporate retreats and meetings.",
        image_url: pic5,
        category: "Facilities",
    },
    {
        id: 7,
        title: "Farm Stay",
        description: "Live day and night in a traditional kerala farm will be an amazing experience for you and your loved ones.",
        image_url: pic2,
        category: "Accommodations",
    },
    {
        id: 8,
        title: "Restaurant",
        description: "Taste the delicious and homely local kerala dishes with our farm made organic vegetables and fruits.",
        image_url: pic5,
        category: "Dining",
    },
    {
        id: 9,
        title: "Camp Fire",
        description: "We provide vast space and facilities for your comfortable stay. There is nothing more happiest than a camp fire with your friends or family.",
        image_url: pic2,
        category: "Activities",
    },
    {
        id: 10,
        title: "Boating",
        description: "We provide boating for our guests in the Farm house Fish pond. Boating will be a different experience for the guests who loves boating and fishing.",
        image_url: npool2,
        category: "Activities",
    },
    {
        id: 11,
        title: "Fishing",
        description: "Our large area fishing pond having variety of fish. We arrange fishing for our guests in our fishing pond.",
        image_url: npool3,
        category: "Activities",
    },
    {
        id: 12,
        title: "Organic Food",
        description: "Our Organic farm is growing organic vegetables and fruits. The guest can view the farming and can buy the fruits and vegetables.",
        image_url: heritage1,
        category: "Dining",
    },
    {
        id: 13,
        title: "Banquet Hall",
        description: "We provide banquet hall for birthday parties, Receptions, Holy communion and wedding ceremonies.",
        image_url: pic3,
        category: "Facilities",
    },
    {
        id: 14,
        title: "Dormitory",
        description: "We can also provide dormitory for a group of people. Our large area banquet hall can be converted as dormitory with provision of beds.",
        image_url: dormitoryImg,
        category: "Accommodations",
    },
    {
        id: 15,
        title: "Natural Rock Pool",
        description: "A Natural pool, which is surrounded by the rocks. The Natural rock is pool is safe for swimming and is filled with natural water.",
        image_url: npool1,
        category: "Activities",
        badge: "POPULAR",
    },
    {
        id: 16,
        title: "Wild Safari",
        description: "we offer wild safari through the forest for the guest with experienced guide. The safari will get you into the core side of the forest.",
        image_url: heritage2,
        category: "Activities",
    },
    {
        id: 17,
        title: "Rural Visit",
        description: "Our Forest areas habitat for various tribal colonies. we can experience the culture and living style through the rural visit.",
        image_url: heritage1,
        category: "Activities",
    },
    {
        id: 18,
        title: "Bird Watching",
        description: "Our forest are the having a wide variety and rare species of birds. You can experience it with our Bird watching facilities in the deep forest.",
        image_url: pic4,
        category: "Activities",
    },
    {
        id: 19,
        title: "Trekking",
        description: "We offer trekking to the trekking hill stations Kattadikadavu, Meenuliyan para mountain peak, Palkulamedu with our experienced guide.",
        image_url: pic1,
        category: "Activities",
    },
    {
        id: 20,
        title: "Camping",
        description: "We arrange camping in the trekking location",
        image_url: pic2,
        category: "Activities",
    },
    {
        id: 21,
        title: "Cultural Experiences",
        description: "Engage with local traditions and crafts.",
        image_url: heritage2,
        category: "Activities",
    }
];
