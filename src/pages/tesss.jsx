import { useState } from 'react';

const MyForm = () => {
  const data = [
    { id: 14, user_id: 5, item_id: 2, variant: 'R', quantity: '1' },
    { id: 15, user_id: 5, item_id: 2, variant: 'L', quantity: '1' },
  ];

  const transformedData = {
    item_id: data.map((item) => item.item_id.toString()),
    variant: data.map((item) => item.variant),
    quantity: data.map((item) => item.quantity),
  };

  console.log(transformedData);

  return <div>tes</div>;
};

export default MyForm;

// import { useState } from 'react';

// const MyForm = () => {
//     const [formData, setFormData] = useState({
//         itemId: [],
//         variant: [],
//         quantity: [],
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevFormData) => ({
//             ...prevFormData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Form data:', formData);
//         // Perform further actions with the form data, such as sending it to the backend
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Item ID:
//                 <input type="text" name="itemId" value={formData.itemId} onChange={handleInputChange} required />
//             </label>
//             <br />
//             <label>
//                 Variant:
//                 <input type="text" name="variant" value={formData.variant} onChange={handleInputChange} required />
//             </label>
//             <br />
//             <label>
//                 Quantity:
//                 <input type="text" name="quantity" value={formData.quantity} onChange={handleInputChange} required />
//             </label>
//             <br />
//             <button type="submit">Submit</button>
//         </form>
//     );
// };

// export default MyForm;
