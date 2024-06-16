import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const DonationRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { data: pendingDonations = [], isLoading } = useQuery({
        queryKey: ['pendingDonations'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/donation');
            // Filter donations with status "pending"
            const pending = data.filter(donation => donation.donationStatus === 'pending');
            console.log(pending);
            return pending;
        },
    });

    return (
        <div className="pt-20">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Recipient Name</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingDonations.map(pendingDonation => (
                            <tr key={pendingDonation._id}>
                                <td>{pendingDonation.recipientName}</td>
                                <td>{pendingDonation.recipientDistrict}, {pendingDonation.recipientUpazila}</td>
                                <td>{pendingDonation.donationDate}</td>
                                <td>{pendingDonation.donationTime}</td>
                                <th>
                                    <Link to={`/blood-donation-request-detail/${pendingDonation._id}`}>
                                        <button className="btn btn-ghost btn-md">View</button>
                                    </Link>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DonationRequests;
