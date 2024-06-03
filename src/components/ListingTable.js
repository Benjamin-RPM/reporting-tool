import React, { useEffect, useState } from 'react';
import { fetchListings } from '../services/listingService';
import { fetchZillowFeed, fetchZumperFeed } from '../services/feedService';
import '../css/listing.css';

  const appendUrlToPhotos = (photos) => {
    return photos.map(photo => {
      // Check if the URL already starts with the provided prefix
      if (!photo.startsWith('https://dcepycifzliabhkgcitm.supabase.co/storage/v1/object/public/rentgod-photos-public/')) {
        return `https://dcepycifzliabhkgcitm.supabase.co/storage/v1/object/public/rentgod-photos-public/${photo}`;
      }
      return photo;
    });
  };

  const ListingTable = () => {
    const [listings, setListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);
    const [zillowData, setZillowData] = useState(null);
    const [zumperData, setZumperData] = useState(null);
    const [filters, setFilters] = useState({
      city: '',
      state: '',
      pets: '',
      status: ''
    });
  
    useEffect(() => {
      const loadData = async () => {
        const listingsData = await fetchListings();
        setListings(listingsData);
        setFilteredListings(listingsData);
        
        const zillowFeed = await fetchZillowFeed();
        setZillowData(zillowFeed);
        
        const zumperFeed = await fetchZumperFeed();
        setZumperData(zumperFeed);
      };
      loadData();
    }, []);
  
    const getListingStatus = (listingId, feedData) => {
      // Add logic to determine status based on feed data
      return feedData ? "Active" : "Inactive";
    };
  
    const applyFilters = () => {
      let filteredList = listings;
      if (filters.city) {
        filteredList = filteredList.filter(listing => listing.city_name.toLowerCase().includes(filters.city.toLowerCase()));
      }
      if (filters.state) {
        filteredList = filteredList.filter(listing => listing.state_name.toLowerCase().includes(filters.state.toLowerCase()));
      }
      if (filters.pets) {
        filteredList = filteredList.filter(listing => listing.pets_allowed && listing.pets_allowed.toLowerCase().includes(filters.pets.toLowerCase()));
      }
      if (filters.status) {
        filteredList = filteredList.filter(listing => getListingStatus(listing.id, zillowData) === filters.status || getListingStatus(listing.id, zumperData) === filters.status);
      }
      setFilteredListings(filteredList);
    };
  
    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters({ ...filters, [name]: value });
    };
  
    useEffect(() => {
      applyFilters();
    }, [filters, listings, zillowData, zumperData]);
  
    return (
      <div className="listing-table-container">
        <h1>Listing Health Status</h1>
        <div className="filters">
          <label>
            City:
            <input type="text" name="city" value={filters.city} onChange={handleFilterChange} />
          </label>
          <label>
            State:
            <input type="text" name="state" value={filters.state} onChange={handleFilterChange} />
          </label>
          <label>
            Pets:
            <input type="text" name="pets" value={filters.pets} onChange={handleFilterChange} />
          </label>
          <label>
            Status:
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
        </div>
        <table className="listing-table">
          <thead>
            <tr>
              <th>Unit ID</th>
              <th>Street Address</th>
              <th>City</th>
              <th>State</th>
              <th>Bedrooms</th>
              <th>Bathrooms</th>
              <th>Pets Allowed</th>
              <th>Photos</th>
              <th>Zillow Status</th>
              <th>Zumper Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredListings.map(listing => (
              <tr key={listing.id}>
                <td>{listing.id}</td>
                <td>{listing.street_number} {listing.street_name} {listing.unit}</td>
                <td>{listing.city_name}</td>
                <td>{listing.state_name}</td>
                <td>{listing.bedrooms}</td>
                <td>{listing.bathrooms}</td>
                <td>{listing.pets_allowed}</td>
                <td>
                  {appendUrlToPhotos(listing.photos).map((photo, index) => (
                    <img key={index} src={photo} alt={`Photo ${index}`} />
                  ))}
                </td>
                <td>{getListingStatus(listing.id, zillowData)}</td>
                <td>{getListingStatus(listing.id, zumperData)}</td>
                <td>
                  <a href={`https://www.zumper.com/backlinks/rent_engine/${listing.id}`} target="_blank" rel="noopener noreferrer">Zumper</a>
                <a href={`https://www.zillow.com`} target="_blank" rel="noopener noreferrer">Zillow</a> {/* Replace with actual URL */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
 
  
  export default ListingTable;
