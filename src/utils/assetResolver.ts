import pic1 from '../assets/images/pic1.webp';
import pic2 from '../assets/images/pic2.webp';
import pic3 from '../assets/images/pic3.webp';
import pic4 from '../assets/images/pic4.webp';
import pic5 from '../assets/images/pic5.webp';
import suite1 from '../assets/images/suite1.webp';
import suite2 from '../assets/images/suite2.webp';
import dormitory from '../assets/images/dormitory.webp';
import heritage1 from '../assets/images/heritage1.webp';
import heritage2 from '../assets/images/heritage2.webp';
import npool1 from '../assets/images/npool1.webp';
import npool2 from '../assets/images/npool2.webp';
import npool3 from '../assets/images/npool3.webp';
import npool4 from '../assets/images/npool4.webp';
import npool5 from '../assets/images/npool5.webp';
import npool6 from '../assets/images/npool6.webp';
import npool7 from '../assets/images/npool7.webp';
import birdWatching from '../assets/images/bird_watching.webp';
import campfireNight from '../assets/images/campfire_night.webp';
import trekkingTrail from '../assets/images/trekking_trail.webp';
import trekkingPeak from '../assets/images/trekking_peak.webp';

import gal1 from '../assets/gallery/IMG_2325.webp';
import gal2 from '../assets/gallery/IMG_2331.webp';
import gal3 from '../assets/gallery/IMG_2561.webp';
import gal4 from '../assets/gallery/IMG_2666.webp';

import kottappara from '../assets/destinations/Kottappara.webp';
import kattadikadavu from '../assets/destinations/Kattadikadavu.webp';
import anayadikuthu from '../assets/destinations/Anayadikuthu.webp';
import thommankuthu from '../assets/destinations/Thommankuthu.webp';
import meenuliyanpara from '../assets/destinations/Meenuliyanpara.webp';
import palkulamedu from '../assets/destinations/Palkulamedu.webp';
import malankara from '../assets/destinations/Malankara.webp';
import munnar from '../assets/destinations/Munnar.webp';
import vagamon from '../assets/destinations/Vagamon.webp';

export const ASSET_MAP: Record<string, string> = {
    // Images
    pic1,
    pic2,
    pic3,
    pic4,
    pic5,
    suite1,
    suite2,
    dormitory,
    heritage1,
    heritage2,
    npool1,
    npool2,
    npool3,
    npool4,
    npool5,
    npool6,
    npool7,
    bird_watching: birdWatching,
    campfire_night: campfireNight,
    trekking_trail: trekkingTrail,
    trekking_peak: trekkingPeak,

    // Gallery
    img_2325: gal1,
    img_2331: gal2,
    img_2561: gal3,
    img_2666: gal4,

    // Destinations
    kottappara,
    kattadikadavu,
    anayadikuthu,
    thommankuthu,
    meenuliyanpara,
    palkulamedu,
    malankara,
    munnar,
    vagamon,
};

export const FACILITY_TITLE_MAP: Record<string, string> = {
    // Curated Luxury Facilities
    'natural rock spring pool': npool1,
    'natural rock pool': npool1,
    'swimming pool': npool1,
    'luxury plantation suites': suite1,
    'suite rooms': suite1,
    'suite room': suite1,
    'moonlit lawn banquet & events': gal2,
    'moonlit lawn banquet': gal2,
    'lawn banquet': gal2,
    'banquet hall': pic3,
    'farm-to-table organic dining': pic4,
    'restaurant': pic4,
    'festive foam & night music lawn': gal3,
    'festive foam': gal3,
    'relaxing vibes': gal3,
    '15-acre spice plantation trail': pic1,
    'spice plantation trail': pic1,
    'farm tour': pic1,
    'estate welcome gateway & lounge': gal1,
    'estate welcome gateway': gal1,
    'resort views': gal1,
    'group dormitory & family villa': dormitory,
    'dormitory': dormitory,
    'private lake boating': npool2,
    'boating': npool2,
    'angling & fish pond experience': npool3,
    'fishing': npool3,
    'campfire & barbecue nights': campfireNight,
    'campfire': campfireNight,
    'camp fire': campfireNight,
    'bird watching': birdWatching,
    'birdwatching': birdWatching,
    'trekking': trekkingTrail,
    'highland trekking': trekkingTrail,
    'trekking trails': trekkingTrail,
    'open-air gala celebrations pavilion': gal4,
    'gala celebrations': gal4,
    'nature escapes': gal4,
    'farmstay': pic2,
    'farm stay': pic2,
    'organic food': heritage1,
};

export const GALLERY_TITLE_MAP: Record<string, string> = {
    'resort weddings': pic1,
    'corporate retreats': pic3,
    'family gatherings': pic4,
    'cultural nights': heritage1,
    'birthday celebrations': heritage2,
    'yoga retreats': pic5,
    'resort views': gal1,
    'scenic landscapes': gal2,
    'relaxing vibes': gal3,
    'nature escapes': gal4,
};

/**
 * Resolves a database image URL (which may be a stale Vite build hash or broken path)
 * to a guaranteed valid local WebP asset or active remote URL.
 */
export function resolveAssetUrl(url?: string | null, title?: string, fallback: string = pic1): string {
    // 1. If it's a valid remote URL on Supabase storage or external CDN, use it
    if (url && (url.startsWith('https://') || url.startsWith('http://'))) {
        return url;
    }

    // 2. Check title against known facility titles
    if (title) {
        const normalizedTitle = title.trim().toLowerCase();
        if (FACILITY_TITLE_MAP[normalizedTitle]) {
            return FACILITY_TITLE_MAP[normalizedTitle];
        }
        if (GALLERY_TITLE_MAP[normalizedTitle]) {
            return GALLERY_TITLE_MAP[normalizedTitle];
        }
    }

    // 3. Extract filename from URL (e.g. "/assets/suite1-z2Ym7Bn9.jpeg" -> "suite1")
    if (url) {
        const lowerUrl = url.toLowerCase();
        for (const [key, asset] of Object.entries(ASSET_MAP)) {
            // Match substring (e.g. "suite1", "npool1", "dormitory", "pic4")
            if (lowerUrl.includes(key)) {
                return asset;
            }
        }
    }

    return fallback;
}

/**
 * Fallback event handler for <img> onError
 */
export function handleImageFallback(e: React.SyntheticEvent<HTMLImageElement, Event>, fallback: string = pic1) {
    if (e.currentTarget.src !== fallback) {
        e.currentTarget.src = fallback;
    }
}
