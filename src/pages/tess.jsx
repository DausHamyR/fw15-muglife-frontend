import React from 'react';

function Tess() {
  const [newVariant, setNewVariant] = React.useState([]);

  const handleVariantSize = (size) => {
    const variant = {};

    if (size === 'R') {
      variant.code = 'R';
      variant.name = 'Regular';
      variant.price = 35000;
      variant.quantity = 20;
    } else if (size === 'L') {
      variant.code = 'L';
      variant.name = 'Large';
      variant.price = 40000;
      variant.quantity = 20;
    } else if (size === 'XL') {
      variant.code = 'XL';
      variant.name = 'Extra Large';
      variant.price = 45000;
      variant.quantity = 20;
    }

    const variantIndex = newVariant.findIndex((item) => item.code === variant.code);

    if (variantIndex === -1) {
      setNewVariant((prevVariants) => [...prevVariants, variant]);
    } else {
      setNewVariant((prevVariants) => prevVariants.filter((item, index) => index !== variantIndex));
    }
  };

  return (
    <div>
      <button onClick={() => handleVariantSize('R')}>R</button>
      <button onClick={() => handleVariantSize('L')}>L</button>
      <button onClick={() => handleVariantSize('XL')}>XL</button>
      <div>{JSON.stringify(newVariant)}</div>
    </div>
  );
}

export default Tess;
