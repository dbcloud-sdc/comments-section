# dBCloud: Reservations API v1.0

## <a style="color: #333333">Table of Contents</a>
* [**Comments by id**](#reservationsreservations)
    * [GET /api/reservations/:reservation_id](#get-apireservationsreservation_id)
    * [POST /api/reservations](#post-apireservations)
    * [PUT /api/reservations/:reservation_id](#put-apireservationsreservation_id)
    * [DELETE /api/reservations/:reservation_id](#delete-apireservationsreservation_id)
* [**Reservations.restaurants**](#reservationsrestaurants)
    * [GET /api/restaurants/:restaurant_id](#get-apirestaurantsrestaurant_id)
    * [POST /api/restaurants](#post-apirestaurants)
    * [PUT /api/restaurants/:restaurant_id](#put-apirestaurantsrestaurant_id)
    * [DELETE /api/restaurants/:restaurant_id](#delete-apirestaurantsrestaurant_id)
* [**Change History**](#change-history)
<hr>

**Get Song Comment Count**
----
  <_Given a song id, return the total number of comments for that song._>

* **Request:**

  - `GET /song/:songId/commentCount`

*  **URL Params**

   - **Required:**

      `songId=[integer]`

* **Success Response:**

  * **Code:** 200
    **Content:** `[{ count : * }]`
 
* **Error Response:**

  * **Code:** `404 NOT FOUND`
    **Content:** `{ error : * }`


**Get All Song Comments**
----
  <_Given a song id, return all comments on that song._>

* **Request:**

  - `GET /song/:songId/comments`

*  **URL Params**

   - **Required:**

      `songId=[integer]`

* **Success Response:**

  * **Code:** 200
    **Content:**
    ```
    body: [
      {
        id: 1346,
        songId: 684648,
        username: 'Diablo Codey',
        profilePic: 'https://s3-us-west-1.amazonaws.com/amazon-product-carousel-images/products/item-345438.png',
        message: 'wow great song',
        postedAt: '',
        songTime: '3:42',
        followers: '34',
      },
      {
        ...
      },
      ...
    ]
    ```
 
* **Error Response:**

  * **Code:** `404 NOT FOUND`
    **Content:** `{ error : * }`


**POST new Song Comment**
----
  <_Given a JSON message, create a new message in the database._>

* **Request:**

  - `POST /song/:songId/comment`

*  **URL Params**

   - **Required:**

      `songId=[integer]`

* **Success Response:**

  * **Code:** 200
    **Content:** `[{ count : * }]`
 
* **Error Response:**

  * **Code:** `404 NOT FOUND`
    **Content:** `{ error : * }`

**Update a Reservation**
----
  <_Given a restaurant id, date, and time, update a reservation for that day and time._>

* **URL**

  - `/api/reserve/book/:restaurantId/:date/:time`

* **Method:**

  - `PUT`

*  **URL Params**

   - **Required:**

      `restaurantId=[integer]`
      `date=[moment.js object]`
      `time=[HH:mm]`

* **Success Response:**

  * **Code:** 204
    **Content:** `{}`
 
* **Error Response:**

  * **Code:** `404 NOT FOUND`
    **Content:** `{ error : "" }`

* **Sample Call:**
  ```
  $.ajax({
    url: "/api/reserve/book/1//",
    dataType: "json",
    data: {},
    type : "POST",
    success : function(r) {
      console.log(r);
    }
  });
  ```

**Delete a Booking**
----
  <_Given a restaurant id, date, and time, make a reservation for that day and time._>

* **URL**

  - `/api/reserve/book/:restaurantId/:date/:time`

* **Method:**

  - `DELETE`

*  **URL Params**

   - **Required:**

      `restaurantId=[integer]`
      `date=[moment.js object]`
      `time=[HH:mm]`

* **Success Response:**

  * **Code:** 204
    **Content:** `{}`
 
* **Error Response:**

  * **Code:** `404 NOT FOUND`
    **Content:** `{ error : "" }`

* **Sample Call:**
  ```
  $.ajax({
    url: "/api/reserve/book/1//",
    dataType: "json",
    data: {},
    type : "POST",
    success : function(r) {
      console.log(r);
    }
  });
  ```

### API
  GET    /song/:songId/commentCount -- return JSON data of the total number of comments
  GET    /song/:songId/comments -- return JSON data for all comments for rendering
  POST   /song/:songId/comments -- write a new comment to the database
  UPDATE /song/:songId/comments -- change the text of a given song comment
  DELETE /song/:songId/comments --  remove a comment from the database
  GET    /song/:songId -- serves static assets
  GET    /bundle/ -- serves bundle for proxy services

### Getting Started
FILL ME IN
