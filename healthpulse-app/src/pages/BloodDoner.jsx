import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import {
  getDonors,
  getUser,
  getDonorsByBloodGroupAndDistrict,
} from "../service/user-service";
import { ToastContainer, toast } from "react-toastify";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import "../style/DonorList.css";

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState({});
  const [bloodGroup, setBloodGroup] = useState(""); // State for blood group filter
  const [district, setDistrict] = useState(""); // State for district filter

  const fetchDonors = () => {
    setLoading(true);
    setError(null);

    // Determine which API function to call
    const fetchFunction =
      bloodGroup && district
        ? () => getDonorsByBloodGroupAndDistrict(bloodGroup, district)
        : getDonors;

    fetchFunction()
      .then((data) => {
        setDonors(data);
        setLoading(false);
        console.log(data);

        // Fetch user data for each donor
        return Promise.all(
          data.map((donor) =>
            getUser(donor.userId).then((userData) => ({
              userId: donor.userId,
              userData,
            }))
          )
        );
      })
      .then((usersData) => {
        const usersMap = usersData.reduce((map, { userId, userData }) => {
          map[userId] = userData;
          return map;
        }, {});
        setUsers(usersMap);
      })
      .catch((err) => {
        toast.error(`Error fetching donors: ${err.message}`);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDonors(); // Fetch initial data without any filters
  }, []); // Empty dependency array to only fetch on component mount

  const handleFilterChange = () => {
    if (!bloodGroup || !district) {
      toast.warn("Please select both blood group and district");
      return;
    }
    fetchDonors();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Background />
      <Base>
        <div className="mt-40">
          <h2 className="animated-number">
            <CountUp
              start={0}
              end={donors.length}
              duration={2.5} // Duration of the animation in seconds
              separator=","
            />
            {" Donors Ready to Donate Blood"}
          </h2>

          {/* Filter Section */}
          <div className="filter-section">
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="rounded-0"
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

            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="rounded-0"
            >
              <option value="">Select your district</option>
              <option value="Bagerhat">Bagerhat</option>
              <option value="Bandarban">Bandarban</option>
              <option value="Barguna">Barguna</option>
              <option value="Barisal">Barisal</option>
              <option value="Bhola">Bhola</option>
              <option value="Bogra">Bogra</option>
              <option value="Brahmanbaria">Brahmanbaria</option>
              <option value="Chandpur">Chandpur</option>
              <option value="Chapai Nawabganj">Chapai Nawabganj</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Chuadanga">Chuadanga</option>
              <option value="Cox's Bazar">Cox's Bazar</option>
              <option value="Cumilla">Cumilla</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Dinajpur">Dinajpur</option>
              <option value="Faridpur">Faridpur</option>
              <option value="Feni">Feni</option>
              <option value="Gaibandha">Gaibandha</option>
              <option value="Gazipur">Gazipur</option>
              <option value="Gopalganj">Gopalganj</option>
              <option value="Habiganj">Habiganj</option>
              <option value="Jamalpur">Jamalpur</option>
              <option value="Jashore">Jashore</option>
              <option value="Jhalokathi">Jhalokathi</option>
              <option value="Jhenaidah">Jhenaidah</option>
              <option value="Joypurhat">Joypurhat</option>
              <option value="Khagrachari">Khagrachari</option>
              <option value="Khulna">Khulna</option>
              <option value="Kishoreganj">Kishoreganj</option>
              <option value="Kurigram">Kurigram</option>
              <option value="Kushtia">Kushtia</option>
              <option value="Lakshmipur">Lakshmipur</option>
              <option value="Lalmonirhat">Lalmonirhat</option>
              <option value="Madaripur">Madaripur</option>
              <option value="Magura">Magura</option>
              <option value="Manikganj">Manikganj</option>
              <option value="Meherpur">Meherpur</option>
              <option value="Moulvibazar">Moulvibazar</option>
              <option value="Munshiganj">Munshiganj</option>
              <option value="Mymensingh">Mymensingh</option>
              <option value="Naogaon">Naogaon</option>
              <option value="Narail">Narail</option>
              <option value="Narayanganj">Narayanganj</option>
              <option value="Narsingdi">Narsingdi</option>
              <option value="Natore">Natore</option>
              <option value="Netrokona">Netrokona</option>
              <option value="Nilphamari">Nilphamari</option>
              <option value="Noakhali">Noakhali</option>
              <option value="Pabna">Pabna</option>
              <option value="Panchagarh">Panchagarh</option>
              <option value="Patuakhali">Patuakhali</option>
              <option value="Pirojpur">Pirojpur</option>
              <option value="Rajbari">Rajbari</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Rangamati">Rangamati</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Satkhira">Satkhira</option>
              <option value="Shariatpur">Shariatpur</option>
              <option value="Sherpur">Sherpur</option>
              <option value="Sirajganj">Sirajganj</option>
              <option value="Sunamganj">Sunamganj</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Tangail">Tangail</option>
              <option value="Thakurgaon">Thakurgaon</option>
            </select>

            <button onClick={handleFilterChange} className="rounded-0">
              Apply Filters
            </button>
          </div>

          {/* Donor List Section */}
          <div className="donor-grid">
            {donors.map((donor) => {
              const user = users[donor.userId]; // Get the user details using userId
              return (
                <div className="donor-card" key={donor.id}>
                  <h3 style={{ textTransform: "uppercase", fontSize: "18px" }}>
                    {user?.name || "Unknown"}
                  </h3>

                  <p>Blood Group: {donor.bloodGroup}</p>
                  <p>Age: {donor.age}</p>
                  <p>Gender: {donor.gender}</p>
                  <p>Phone Number: {donor.phoneNumber}</p>
                  <p>Email: {user?.email || "Unknown"}</p>
                  <p>District: {donor.district}</p>
                  {/* <p>Full Address: {donor.address}</p> */}
                  {/* Display other donor information here */}
                </div>
              );
            })}
          </div>
        </div>
      </Base>
      <ToastContainer />
    </div>
  );
};

export default DonorList;
