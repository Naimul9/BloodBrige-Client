import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const DonationRequests = () => {
    const axiosPublic = useAxiosPublic();
    const { data: pendingDonations = [], isLoading } = useQuery({
        queryKey: ['pendingDonations'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/donation');
            // Filter donations with status "pending"
            const pending = data.filter(donation => donation.donationStatus === 'pending');
            console.log(pending);
            return pending;
        },
    });

    return (
        <div className="container mx-auto pt-20">
            <div className="overflow-x-auto font-semibold text-base">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Recipient Name</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th className="pl-6">Details </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingDonations.map(pendingDonation => (
                            <tr key={pendingDonation._id}>
                                <td>{pendingDonation.recipientName}</td>
                                <td>{pendingDonation.recipientDistrict}, {pendingDonation.recipientUpazila}</td>
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
            </div>
        </div>
    );
};

export default DonationRequests;
