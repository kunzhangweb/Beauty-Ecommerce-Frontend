const data = {
  categories: [
    "Brands",
    "Skin Care",
    "Makeup",
    "Health",
    "Body Care",
    "Face Mask",
    "Oral Care",
    "Medical",
  ],
  prices: [
    {
      range: 'Any',
      min: 0,
      max: 0,
    },
    {
      range: `$1 to $10`,
      min: 1,
      max: 10,
    },
    {
      range: `$10 to $100`,
      min: 10,
      max: 100,
    },
    {
      range: `$100 to $1000`,
      min: 100,
      max: 1000,
    },
  ],

  ratings: [
    {
      range: '4stars & up',
      rating: 4,
    },
  
    {
      range: '3stars & up',
      rating: 3,
    },
  
    {
      range: '2stars & up',
      rating: 2,
    },
  
    {
      range: '1stars & up',
      rating: 1,
    },
  ]
};

export default data;
