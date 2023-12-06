import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCurrentUserDetails } from '../auth';

const DonationComponent = () => {
    const [user,setUser]=useState(undefined)
    const [amount, setAmount] = useState(10); // Default amount, you can set this dynamically
    
  useEffect(() => {
    setUser(getCurrentUserDetails())
  }, [])

   
    
  const handleDonate = async () => {
    try {
      // Make a request to your backend to initiate payment
      const response = await axios.post(`/payment/request/${user.id}/?amount=${amount}`);
      
      // Extract the order ID from the response
      const { orderId } = response.data;

      // Call Razorpay to handle the payment
      const options = {
        key: 'rzp_test_fgJt0qSORrJ9',
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        name: 'Your Blog',
        description: 'Donation for Blog',
        order_id: orderId,
        handler: (response) => {
          // Handle the success scenario, you can update the UI or show a success message
          console.log(response);
        },
        prefill: {
          name: 'Donor Name',
          email: 'donor@email.com',
          contact: '1234567890',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      // Handle errors, show error messages, etc.
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <div>
      <h2>Donation Page</h2>
      <p>Enter donation amount:</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleDonate}>Donate</button>
    </div>
  );
};

export default DonationComponent;
