import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";

const UpdateDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
 
  const [data, setData] = useState([]);
  const [upData, setUpData] = useState([]);
  const [editable, setEditable] = useState(false); // State to manage edit mode
  
  

  // Fetch user profile data
  const { data: User = {}, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user.email}`);
      return data;
    },
  });

  // Fetch districts and upazilas data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const responseDistricts = await fetch("/districts.json");
        const resultDistricts = await responseDistricts.json();
        setData(resultDistricts);

        const responseUpazilas = await fetch("/upazilas.json");
        const resultUpazilas = await responseUpazilas.json();
        setUpData(resultUpazilas);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const district = form.district.value;
    const upazila = form.upazila.value;
    const bloodGroup = form.bloodGroup.value
  
    const userData ={
      ...User,
      name: name,
      district:district,
      upazila:upazila,
      bloodGroup: bloodGroup
    }
    

    try {
      const response = await axiosSecure.put(`/user`, userData); // Assuming this endpoint updates user status
      if (response.data.modifiedCount > 0) {
        toast.success("Donation request updated successfully");
        setEditable(false); // Disable edit mode after successful update
      } else {
        toast.error("Failed to update donation request");
      }
    } catch (error) {
      toast.error("Failed to update donation request");
      console.error("Error updating donation request:", error);
      
    }
  };


  const handleEdit = () => {
    setEditable(true);
  };

 

  // Handle file selection
  // const handleFileChange = (e) => {
  //   setSelectedFile(e.target.files[0]);
  // };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          <div className="space-y-6">
            {/* Avatar */}
            <div className="flex flex-col items-center justify-center">
              <img
                src={User.photo} 
                alt="Avatar"
                className="w-36 h-36 p-4 rounded-full border border-black"
              />
              {editable && (
                <input
                  type="file"
                  accept="image/*"
                  // onChange={handleFileChange}
                  className="mt-2"
                />
              )}
            </div>

            {/* recipient name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 rounded-md"
                name="name"
                id="name"
                type="text"
                readOnly={!editable}
                placeholder={user?.name}
                required
              />
            </div>
            
            {/* Email */}
            <div className="space-y-1 text-sm">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 rounded-md"
                name="email"
                id="email"
                type="text"
                readOnly
                required
                placeholder={User.email}
              />
            </div>

          </div>

          <div className="space-y-6">
            {/* recipient district & upazila */}
            <div className="flex pt-24 justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="district" className="block text-gray-600">
                  Recipient District
                </label>
                <select
                  id="district"
                  name="district"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border border-red-300 focus:outline-red-500 rounded-md"
                  disabled={!editable}
                  required
                  placeholder={User.district}
                >
                  {data.map((district) => (
                    <option value={district.name} key={district._id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="upazila" className="block text-gray-600">
                  Recipient Upazila
                </label>
                <select
                  id="upazila"
                  name="upazila"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border border-red-300 focus:outline-red-500 rounded-md"
                  disabled={!editable}
                  required
                  placeholder={User.upazila}
                >
                  {upData.map((upazila) => (
                    <option value={upazila.name} key={upazila._id}>
                      {upazila.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Blood Group */}
            <div className="space-y-1 text-sm">
              <label htmlFor="bloodGroup" className="block text-gray-600">
                Blood Group
              </label>
              <select
                className="w-full px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 rounded-md"
                name="bloodGroup"
                id="bloodGroup"
                type="text"
                readOnly
                required
                placeholder={User.bloodGroup}
              >
                 <option value='A+'>A+</option>
                <option value='A-'>A-</option>
                <option value='B+'>B+</option>
                <option value='B-'>B-</option>
                <option value='AB+'>AB+</option>
                <option value='AB-'>AB-</option>
                <option value='O+'>O+</option>
                <option value='O-'>O-</option>
                </select>
            </div>

          </div>
        </div>

        <div className="mt-5">
          {editable ? (
            <button
              type="submit"
              className="w-full p-3 text-center font-medium text-white transition duration-200 rounded shadow-md bg-red-500 hover:bg-red-600"
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              onClick={handleEdit}
              className="w-full p-3 text-center font-medium text-white transition duration-200 rounded shadow-md bg-gray-500 hover:bg-gray-600"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateDonationRequest;
