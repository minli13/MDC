document.addEventListener("DOMContentLoaded", function () {
  const restaurants = [
      { name: 'Taco Gourmet Simply Fresh', distance: 0.9, price: '$$', typeOfFood: 'Mexican', hoursOpen: '08:00 - 20:00' },
      { name: 'Innovation Brew Works', distance: 0.7, price: '$$', typeOfFood: 'Brewery', hoursOpen: '11:00 - 21:00' },
      { name: 'Jinza Teriyaki', distance: 0.9, price: '$$', typeOfFood: 'Japanese', hoursOpen: '07:00 - 17:00' },
      { name: 'Makomae Japanese Cuisine', distance: 1.9, price: '$$', typeOfFood: 'Japanese', hoursOpen: '11:30 - 14:00' },
      { name: 'O Sushi & Grill', distance: 1.2, price: '$$', typeOfFood: 'Japanese', hoursOpen: '11:30 - 14:30' },
      { name: 'Koji Ramen', distance: 0.9, price: '$$', typeOfFood: 'Japanese', hoursOpen: '10:00 - 22:00' },
      { name: 'Mazesoba Hero', distance: 2, price: '$$', typeOfFood: 'Japanese', hoursOpen: '11:00 - 14:30' },
      { name: 'HoAloha Hawaiian BBQ', distance: 0.9, price: '$$', typeOfFood: 'Hawaiian', hoursOpen: '10:00 - 21:00' },
      { name: 'Pro Tacos Mexican Restaurant & Bar', distance: 2, price: '$', typeOfFood: 'Tacos', hoursOpen: '10:00 - 22:00' },
      { name: 'Palermo Bakery', distance: 1.1, price: '$$', typeOfFood: 'Vegan', hoursOpen: '08:00 - 15:00' },
      { name: 'Solo Hot Pot', distance: 1.8, price: '$$', typeOfFood: 'Asian Fusion', hoursOpen: '11:30 - 22:30' },
      { name: 'Baby Elephant Thai', distance: 2, price: '$$', typeOfFood: 'Thai', hoursOpen: '11:00 - 20:30' },
      { name: 'Sugar Rush Cafe', distance: 1.3, price: '$$', typeOfFood: 'Sandwiches', hoursOpen: '07:00 - 16:00' },
      { name: 'Uncle Chuang’s Bakery', distance: 0.9, price: '$$', typeOfFood: 'Bakery', hoursOpen: '09:00 - 19:00' },
      { name: 'Phillips Ranch Health Bar', distance: 1.7, price: '$', typeOfFood: 'Juice Bars & Smoothies', hoursOpen: '07:00 - 20:00' },
      { name: 'Hong Kong Cafe', distance: 3, price: '$$', typeOfFood: 'Hong Kong Style Cafe', hoursOpen: '11:00 - 21:00' },
      { name: 'Taco Nazo', distance: 1.9, price: '$', typeOfFood: 'Seafood', hoursOpen: '10:00 - 21:00' },
      { name: 'Clearwater Bagel', distance: 2, price: '$$', typeOfFood: 'Coffee & Tea', hoursOpen: '08:00 - 13:30' },
      { name: 'Hibachi-San', distance: 0.2, price: '$$', typeOfFood: 'Japanese', hoursOpen: '10:00 - 17:00' },
      { name: 'Nobibi Ice Cream & Tea', distance: 0.9, price: '$', typeOfFood: 'Ice Cream & Frozen Yogurt', hoursOpen: '12:00 - 21:30' }
  ];

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

  function populateTable(restaurantsToShow) {
      const tableBody = document.getElementById('table-body');
      tableBody.innerHTML = ''; // Clear existing data

      restaurantsToShow.forEach(restaurant => {
          const restaurantRow = createRestaurantRow(restaurant);
          tableBody.appendChild(restaurantRow);
          console.log(restaurantRow);
      });
  }

  function searchRestaurants() {
      const searchName = document.getElementById('search-name').value.toLowerCase();
      const searchDistance = parseFloat(document.getElementById('search-distance').value);
      const searchPrice = document.getElementById('search-price').value;
      const searchFood = document.getElementById('search-food').value.toLowerCase();
      const searchHours = document.getElementById('search-hours').value;
    
      console.log('Search Input:', {
        searchName,
        searchDistance,
        searchPrice,
        searchFood,
        searchHours,
      });
      const filteredRestaurants = restaurants.filter(restaurant => {
        return (
            (searchName === '' || restaurant.name.toLowerCase().includes(searchName)) &&
            (isNaN(searchDistance) || restaurant.distance === searchDistance) &&
            (searchPrice === '' || restaurant.price === searchPrice) &&
            (searchFood === '' || restaurant.typeOfFood.toLowerCase().includes(searchFood)) &&
            (searchHours === '' || isOpenAt(restaurant.hoursOpen, searchHours))
        );
    });

      // Calculate relevance scores for each restaurant
      const restaurantsWithScores = filteredRestaurants.map(restaurant => {
          return {
              restaurant,
              relevanceScore: calculateRelevanceScore(restaurant, searchName, searchDistance, searchPrice, searchFood, searchHours)
          };
      });

      // Sort the array based on relevance score (higher scores first)
      const sortedRestaurants = restaurantsWithScores.sort((a, b) => b.relevanceScore - a.relevanceScore);

      // Extract the sorted restaurants without relevance scores
      const sortedFilteredRestaurants = sortedRestaurants.map(item => item.restaurant);

      // Update the displayed table with the sorted, filtered data
      populateTable(sortedFilteredRestaurants);

      // Show the table after search
      document.getElementById('restaurant-table').style.display = 'table';
  }

  function calculateRelevanceScore(restaurant, searchName, searchDistance, searchPrice, searchFood, searchHours) {
      let score = 0;

      if (searchName !== '' && restaurant.name.toLowerCase().includes(searchName)) {
          score += 2;
      }

      if (!isNaN(searchDistance) && restaurant.distance === searchDistance) {
          score += 1;
      }

      // Add more scoring criteria based on other search parameters

      return score;
  }

  function isOpenAt(restaurantTime, searchTime) {
      const restaurantHours = parseInt(restaurantTime.split(':')[0]);
      const restaurantMinutes = parseInt(restaurantTime.split(':')[1]);

      const searchHours = parseInt(searchTime.split(':')[0]);
      const searchMinutes = parseInt(searchTime.split(':')[1]);

      const restaurantTotalMinutes = restaurantHours * 60 + restaurantMinutes;
      const searchTotalMinutes = searchHours * 60 + searchMinutes;

      return Math.abs(restaurantTotalMinutes - searchTotalMinutes) <= 30;
  }

  const searchButton = document.getElementById('search-button');

  // Add click event listener to the search button
  searchButton.addEventListener('click', function () {
      searchRestaurants();
  });

  populateTable(restaurants);

  const currentTime = new Date();
  const currentHours = currentTime.getHours().toString().padStart(2, '0');
  const currentMinutes = currentTime.getMinutes().toString().padStart(2, '0');
  const currentFormattedTime = `${currentHours}:${currentMinutes}`;
  document.getElementById('search-hours').value = currentFormattedTime;

  // Hide the table initially
  document.getElementById('restaurant-table').style.display = 'none';
});
