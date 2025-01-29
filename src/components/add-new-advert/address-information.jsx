import React, { useEffect, useState } from 'react'
import { getGoogleApi } from '@/services/address-controller-service';
import AddressInformationGoogleMap from './address-info-map';


const AddressInformationSection = ({ countries, cities, districts, state }) => {

  const [filteredCity, setFilteredCity] = useState();
  const [filteredDistrict, setFilteredDistrict] = useState();
  const [apiCountry, setApiCountry] = useState();
  const [apiCity, setApiCity] = useState();
  const [apiDistrict, setApiDistrict] = useState();
  const [apiAddress, setApiAddress] = useState();
  const [latlng, setLatlng] = useState();

  let apiAdress = `${apiAddress} ${apiDistrict} ${apiCity} ${apiCountry}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        const googleApiRes = await getGoogleApi(apiAdress, api);
        const googleApi = await googleApiRes.json();
        setLatlng(googleApi.results[0]?.geometry?.location);
      } catch (error) {
        console.error("Error fetching Google Maps API data:", error);
      }
    };
    fetchData();
  }, [apiAdress]);

  

    const handleSelectCountry = (e) => {
        let newCities = cities?.filter((item) => item?.countryId == e.target.value);
        let countryName = countries.filter((item) => item?.id == e.target.value);
        setApiCountry(countryName[0]?.countryName)
        setFilteredCity(newCities);
      };
      
      const handleSelectCity = (e) => {
        let newDistrict = districts?.filter(
          (item) => item.cityId == e.target.value
        );
        let cityName = cities?.filter((item) => item?.id == e.target.value);
        setApiCity(cityName[0]?.cityName);
        setFilteredDistrict(newDistrict);
      };
      
      const handleSelectDistrict = (e) => {
        let districtName = districts.filter((item) => item.id == e.target.value);
        setApiDistrict(districtName[0]?.districtsName);
      };
      
  return (
    <fieldset className="border rounded-3">
      <legend className="float-none w-auto px-3">Address Information</legend>
      <div className="row container">
        <div className="col-12 col-md-4">
          <label htmlFor="country_id">Country</label>


          <select
            className={`form-select  ${
              state?.errors?.country_id ? "is-invalid" : ""
            }`}
            aria-label="Default select example"
            onClick={(e) => handleSelectCountry(e)}
            name="country_id"
          >
            <option selected disabled>
              Choose country
            </option>
            {countries.map((item) => (
              <option key={item.id} value={item.id}>
                {item.countryName}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{state?.errors?.country_id}</div>
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="city_id">State / City  </label>
          
          <select
            className={`form-select  ${
              state?.errors?.city_id ? "is-invalid" : ""
            }`}
            aria-label="Default select example"
            onClick={(e) => handleSelectCity(e)}
            name="city_id"
          >
            <option selected disabled>
              Choose city
            </option>
            {filteredCity?.map((item) => (
              <>
                <option key={item.id} value={item.id}>
                  {item.cityName}
                </option>
              </>
            ))}
          </select>
          <div className="invalid-feedback">{state?.errors?.city_id}</div>
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="district_id">District</label>
     
          <select
            className={`form-select  ${
              state?.errors?.district_id ? "is-invalid" : ""
            }`}
            aria-label="Default select example"
            onClick={(e) => handleSelectDistrict(e)}
            name="district_id"
          >
            <option selected disabled>
              Choose district
            </option>
            {filteredDistrict?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.districtsName}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{state?.errors?.district_id}</div>
        </div>
        <div className="col-12">
          <label htmlFor="address">Address</label>
          <div className="input-group mb-3">
            <input
              type="address"
              className={`form-control rounded-3  ${
                state?.errors?.address ? "is-invalid" : ""
              }`}
              id="address"
              name="address"
              value={apiAddress}
              onChange={(e) => setApiAddress(e.target.value)}
            />
            <div className="invalid-feedback">{state?.errors?.address}</div>
          </div>
        </div>
        <div className="col-12">
          <input
            type="hidden"
            name="location.latitude"
            value={latlng?.lat}
          />
          <input
            type="hidden"
            name="location.longitude"
            value={latlng?.lng}
          />
          <AddressInformationGoogleMap latlng={latlng} />
        </div>
      </div>
    </fieldset>
  )
}

export default AddressInformationSection