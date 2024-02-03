const restaurants = [
  { name: 'Restaurant A', distance: 5, price: '$$', typeOfFood: 'Italian', hoursOpen: '08:00 - 20:00' },
  { name: 'Restaurant B', distance: 8, price: '$$$', typeOfFood: 'Mexican', hoursOpen: '10:00 - 22:00' },
  // Add more restaurant data
];

// Function to create a table row for a restaurant
function createRestaurantRow(restaurant) {
  const row = document.createElement('tr');

  const nameCell = document.createElement('td');
  nameCell.textContent = restaurant.name;
  row.appendChild(nameCell);

  const distanceCell = document.createElement('td');
  distanceCell.textContent = restaurant.distance + ' miles';
  row.appendChild(distanceCell);

  const priceCell = document.createElement('td');
  priceCell.textContent = restaurant.price;
  row.appendChild(priceCell);

  const typeOfFoodCell = document.createElement('td');
  typeOfFoodCell.textContent = restaurant.typeOfFood;
  row.appendChild(typeOfFoodCell);

  const hoursOpenCell = document.createElement('td');
  hoursOpenCell.textContent = restaurant.hoursOpen;
  row.appendChild(hoursOpenCell);

  return row;
}

// Function to populate the table with restaurant data
function populateTable(restaurantsToShow) {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = ''; // Clear existing data

  restaurantsToShow.forEach(restaurant => {
    const restaurantRow = createRestaurantRow(restaurant);
    tableBody.appendChild(restaurantRow);
    console.log(restaurantRow);
  });
}

// Function to search for restaurants based on user input
function searchRestaurants() {
  const searchName = document.getElementById('search-name').value.toLowerCase();
  const searchDistance = parseFloat(document.getElementById('search-distance').value);
  const searchPrice = document.getElementById('search-price').value;
  const searchFood = document.getElementById('search-food').value.toLowerCase();
  const searchHours = document.getElementById('search-hours').value;

  const filteredRestaurants = restaurants.filter(restaurant => {
    return (
      (searchName === '' || restaurant.name.toLowerCase().includes(searchName)) &&
      (isNaN(searchDistance) || restaurant.distance === searchDistance) &&
      (searchPrice === '' || restaurant.price === searchPrice) &&
      (searchFood === '' || restaurant.typeOfFood.toLowerCase().includes(searchFood)) &&
      (searchHours === '' || isOpenAt(restaurant.hoursOpen, searchHours))
    );
  });

  // Update the displayed table with the filtered data
  populateTable(filteredRestaurants);
}


// Function to check if the restaurant is open at the desired time
function isOpenAt(restaurantTime, searchTime) {
  const restaurantHours = parseInt(restaurantTime.split(':')[0]);
  const restaurantMinutes = parseInt(restaurantTime.split(':')[1]);

  const searchHours = parseInt(searchTime.split(':')[0]);
  const searchMinutes = parseInt(searchTime.split(':')[1]);

  const restaurantTotalMinutes = restaurantHours * 60 + restaurantMinutes;
  const searchTotalMinutes = searchHours * 60 + searchMinutes;

  // Allow a 30-minute buffer before and after opening time
  return Math.abs(restaurantTotalMinutes - searchTotalMinutes) <= 30;
}

// Initial population of the table with all restaurants
populateTable(restaurants);

// Set the default value of the search hours input to the current time
const currentTime = new Date();
const currentHours = currentTime.getHours().toString().padStart(2, '0');
const currentMinutes = currentTime.getMinutes().toString().padStart(2, '0');
const currentFormattedTime = `${currentHours}:${currentMinutes}`;
document.getElementById('search-hours').value = currentFormattedTime;