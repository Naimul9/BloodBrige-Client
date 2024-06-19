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
      const { data } = await axiosPublic.get('/users');
      return data;
    },
    enabled: false, // Disable automatic query execution
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
      (!searchParams.district || donor.district === searchParams.district) &&
      (!searchParams.upazila || donor.upazila === searchParams.upazila)
    );
  });

  return (
    <div className='py-20'>
      <div className='bg-rose-100 lg:h-[384px] h-[700px] container mx-auto rounded-lg'>
      <h2 className='lg:text-6xl text-4xl text-center font-semibold mt-5 pt-20  '>Search Donors</h2>
      <form onSubmit={handleSearch}>
    <div className='flex lg:flex-row flex-col gap-5 items-center container justify-center mx-auto mt-8'>
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
        <div className='mt-4'>
        <label
            className='block mb-7 text-sm font-medium text-gray-600 '
            htmlFor='upazila'
          >
           
          </label>

          <button
            type='submit'
            className='block w-full px-4 py-3 bg-red-700 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg hover:bg-red-800'
          >
            Search
          </button>
        </div>
  
  
    </div>


       
      </form>
      </div>

      {isLoading ? <p>Loading...</p> : null}

      <div className='mt-6'>
        
        {filteredDonors.length === 0 && !isLoading && <p className='text-3xl font-bold text-center'>No donors found.</p>}
        {filteredDonors.length > 0 && (
          <div className="overflow-x-auto ">
          <table className="table container mx-auto text-center text-base">
            {/* head */}
            <thead className='bg-red-200 '>
              <tr>
                <th>Sl No.</th>
                <th>Name</th>
                <th>Blood Group</th>
                <th>District</th>
                <th>Upazila</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {filteredDonors.map((donor,index) =>   <tr key={donor._id} className="bg-base-200">
                <th>{index+1}</th>
                <td>{donor.name}</td>
                <td> {donor.bloodGroup} </td>
                <td>{donor.district}</td>
                <td>{donor.upazila}</td>
              </tr>
)}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
