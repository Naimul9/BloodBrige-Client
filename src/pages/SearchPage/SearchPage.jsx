import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SearchPage = () => {
  const axiosPublic = useAxiosPublic();
  const [searchParams, setSearchParams] = useState({
    bloodGroup: '',
    district: '',
    upazila: ''
  });

  const { data: allDonors = [], isLoading, refetch } = useQuery({
    queryKey: ['donation', searchParams],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/donation');
      return data;
    },
  });

  const [data, setData] = useState([]);
  const [upData, setUpData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/districts.json');
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchUpData() {
      const response = await fetch('/upazilas.json');
      const result = await response.json();
      setUpData(result);
    }
    fetchUpData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;

    const bloodGroup = form.bloodGroup.value;
    const district = form.district.value;
    const upazila = form.upazila.value;

    setSearchParams({ bloodGroup, district, upazila });
    refetch();
    console.log('Search parameters:', { bloodGroup, district, upazila });
  };

  const filteredDonors = allDonors.filter((donor) => {
    return (
      (!searchParams.bloodGroup || donor.bloodGroup === searchParams.bloodGroup) &&
      (!searchParams.district || donor.recipientDistrict === searchParams.district) &&
      (!searchParams.upazila || donor.recipientUpazila === searchParams.upazila)
    );
  });

  return (
    <div>
      <h2>Search Donors</h2>
      <form onSubmit={handleSearch}>
        {/* Blood group */}
        <div className='mt-4'>
          <label
            className='block mb-2 text-sm font-medium text-gray-600 '
            htmlFor='bloodGroup'
          >
            Blood Group
          </label>
          <select
            id='bloodGroup'
            autoComplete='bloodGroup'
            name='bloodGroup'
            className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        {/* District */}
        <div className='mt-4'>
          <label
            className='block mb-2 text-sm font-medium text-gray-600 '
            htmlFor='district'
          >
            District
          </label>
          <select
            id='district'
            autoComplete='district'
            name='district'
            className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
          >
            <option value="">Select District</option>
            {data.map(district => (
              <option value={district.name} key={district._id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        {/* Upazila */}
        <div className='mt-4'>
          <label
            className='block mb-2 text-sm font-medium text-gray-600 '
            htmlFor='upazila'
          >
            Upazila
          </label>
          <select
            id='upazila'
            autoComplete='upazila'
            name='upazila'
            className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
          >
            <option value="">Select Upazila</option>
            {upData.map(upazila => (
              <option value={upazila.name} key={upazila._id}>
                {upazila.name}
              </option>
            ))}
          </select>
        </div>

        <div className='mt-6'>
          <button
            type='submit'
            className='w-full px-6 py-3 bg-red-700 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg hover:bg-red-800'
          >
            Search
          </button>
        </div>
      </form>

      {isLoading ? <p>Loading...</p> : null}

      <div className='mt-6'>
        <h3>Donors List</h3>
        {filteredDonors.length === 0 && !isLoading && <p>No donors found.</p>}
        {filteredDonors.length > 0 && (
          <ul>
            {filteredDonors.map((donor) => (
              <li key={donor._id}>
                {donor.recipientName} - {donor.bloodGroup} - {donor.recipientDistrict} - {donor.recipientUpazila}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
