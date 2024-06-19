import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const DonationRequests = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch pending donations using React Query
    const { data: donations = [], isLoading } = useQuery({
        queryKey: ['pendingDonations'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/donation/pending');
            return data; 
        },
    });

    // Filter donations where donationStatus is 'pending'
    const pendingDonations = donations.filter(donation => donation.donationStatus === 'pending');

    return (
        <div className="container mx-auto py-20">
            <h1 className="text-5xl text-center mb-5 font-semibold mt-6 text-red-600">All Pending Donation Requests</h1>
            <div className="p-10 overflow-x-auto font-semibold text-base border border-red-300 rounded-lg">
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <table className="table">
                        {/* Table head */}
                        <thead>
                            <tr>
                                <th>Sl No.</th>
                                <th>Recipient Name</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th className="pl-6">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingDonations.map((pendingDonation, index) => (
                                <tr key={pendingDonation._id}>
                                    <td>{index + 1}</td>
                                    <td>{pendingDonation.recipientName}</td>
                                    <td>{`${pendingDonation.recipientDistrict}, ${pendingDonation.recipientUpazila}`}</td>
                                    <td>{pendingDonation.donationDate}</td>
                                    <td>{pendingDonation.donationTime}</td>
                                    <td>
                                        <Link to={`/blood-donation-request-detail/${pendingDonation._id}`}>
                                            <button className="btn btn-ghost text-white btn-sm bg-red-400 hover:bg-red-500">View</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default DonationRequests;
