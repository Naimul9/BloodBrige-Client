import  { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const SearchPage = () => {

    const axiosSecure=useAxiosSecure()

    const { data: donors = [], } = useQuery({
        queryKey: ['donation',],
        queryFn: async () => {
          const { data } = await axiosSecure.get('/donation');
          console.log(data);
          return data;
        },
      });


  const {loading} =useState()

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
      async function fetchData() {
        const response = await fetch('/upazilas.json');
        const result = await response.json();
        setUpData(result);
      }
  
      fetchData();
    }, []);



    const handleSearch = e => {

e.preventDefault()
    const form = e.target
   
    const bloodGroup = form.bloodGroup.value
    const district = form.district.value
    const upazila = form.upazila.value
   
    
    
    console.log({ bloodGroup , district, upazila })
    };

    return (
        <div className=''>
            <h2>Search Donors</h2>
            <form onSubmit={handleSearch}>

            {/*blood group  */}
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
            className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300 placeholder:'
            type='text'
            
          >
          <option value="A+"selected>A+</option>
          <option value="A-"selected>A-</option>
          <option value="B+"selected>B+</option>
          <option value="B-"selected>B-</option>
          <option value="AB+"selected>AB+</option>
          <option value="AB-"selected>AB-</option>
          <option value="O+"selected>O+</option>
          <option value="O-"selected>O-</option>

</select>
          


        </div>
{/* district  */}
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
            className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
            type='text'>

{
  data.map(district=>(
    <option value={district.name} key={district._id}>
      {district.name}
    </option>
  ))
}

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
            className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
            type='text'
          >
            {
  upData.map(upazila=>(
    <option value={upazila.name} key={upazila._id}>
      {upazila.name}
    </option>
  ))
}

          </select>
        </div>
          

            <div className='mt-6'>
              <button
                type='submit'
                className='w-full px-6 py-3 bg-red-700 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-lg hover:bg-red-800  '
              >
                Search
              </button>
            </div>
          </form>

            {loading && <p>Loading...</p>}

            <div className=''>
                <h3>Donors List</h3>
                {donors.length === 0 && !loading && <p>No donors found.</p>}
                {donors.length > 0 && (
                    <ul>
                        {donors.map((donor) => (
                            <li key={donor.id}>
                                {donor.
recipientName} - {donor.bloodGroup} - {donor.district} - {donor.upazila}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
