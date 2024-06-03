import axios from 'axios';
import { parseStringPromise } from 'xml2js';

const ZILLOW_FEED_URL = 'https://dcepycifzliabhkgcitm.supabase.co/storage/v1/object/public/listing-feeds/zillow/rentengineListings.xml';
const ZUMPER_FEED_URL = 'https://dcepycifzliabhkgcitm.supabase.co/storage/v1/object/public/listing-feeds/zumper/rentengineListings.xml';

export const fetchFeed = async (url) => {
  const response = await axios.get(url);
  const result = await parseStringPromise(response.data);
  return result;
};

export const fetchZillowFeed = () => fetchFeed(ZILLOW_FEED_URL);
export const fetchZumperFeed = () => fetchFeed(ZUMPER_FEED_URL);
