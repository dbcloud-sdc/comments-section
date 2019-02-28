# dBCloud: Comments Section API v1.0

## Table of Contents
* [**Comments-Section.comments**](#commentscomments)
    * [GET /song/:songId/comments](#get-songsong_idcomments)
    * [POST /song/:songId/comments](#post-songsong_idcomments)
    * [PATCH /song/:songId/comments](#patch-songsong_idcomments)
    * [DELETE /song/:songId/comments](#delete-songsong_idcomments)
* [**Comments-Section.commentCount**](#commentscommentscount)
    * [GET /song/:songId/commentCount](#get-songsong_idcommentcount)
* [**Change History**](#change-history)
<hr>

## Comments-Section.comments
### `GET /song/:songId/comments`
Given a song id, return the comments for that song.

**Get Request Structure**
  * **Param**
    * `songId` _(Integer)_ : Identifier of the song to fetch all comments.

**Success Response**

  * **Code:** 200
  * **Content:** Array of comment objects in the following format:

    |Key              |Type    |
    |:--------------- |:------ |
    |`commentId`     |integer |
    |`songId`         |integer |
    |`username`       |string  |
    |`profilePic`     |string  |
    |`message`        |string  |
    |`postAt`         |string  |
    |`message`        |string  |
    |`message`        |integer |
 
**Error Response**

  * **Code:** `404 NOT FOUND`
  * **Content:** `{ error : * }`

### `POST /song/:songId/comments`
Write a comment to database, return comment id.

**Post Request Structure**
  * **Param:**
    * `songId` _(Integer)_ : Identifier of the song to comment on
  * **Body** 
    * JSON object in the following format:

      |Key              |Type    |
      |:--------------- |:------ |
      |`userId`         |integer |
      |`message`        |string  |
      |`songTime`       |string  |

**Success Response**

  * **Code:** 201
  * **Content:** `[{ id }]`
 
**Error Response**

  * **Code:** `400 BAD REQUEST`
    **Content:** `{ error : * }`

### `PATCH /song/:songId/comments`
Update a comment on database, return comment id.

**Patch Request Structure**
  * **Param** 
    * `songId` _(Integer)_ : Identifier of the song whose comment is to be updated
  * **Body**
    * JSON object in the following format:

      |Key              |Type    |
      |:--------------- |:------ |
      |`commentId`      |integer |
      |`message`        |string  |

**Success Response**

  * **Code:** 204
    **Content:** `[{ id }]`
 
**Error Response**

  * **Code:** `400 BAD REQUEST`
    **Content:** `{ error : * }`

### `DELETE /song/:songId/comments/:commentId`
Given a comment id, delete comment from database.

**Delete Request Structure**
  * **Param**
    * `songId` _(Integer)_ : Identifier of the song whose comment is to be deleted
    * `commentId` _(Integer)_: Identifier of the comment to be deleted

**Success Response**

  * **Code:** 201
 
**Error Response**

  * **Code:** `400 BAD REQUEST`
  * **Content:** `{ error : * }`

## Comments-Section.commentCount
### `GET /song/:songId/commentCount`
Given a song id, return the total number of comments for that song.

**GET Request Structure**
  * **Param**
    * `songId` _(Integer)_ : Identifier of the song to fetch comment count.

**Success Response**

  * **Code:** 200
    **Content:** `[{ count }]`
 
**Error Response**

  * **Code:** `404 NOT FOUND`
    **Content:** `{ error : * }`

### API
  GET    /song/:songId/commentCount -- return JSON data of the total number of comments
  GET    /song/:songId/comments -- return JSON data for all comments for rendering
  POST   /song/:songId/comments -- write a new comment to the database
  UPDATE /song/:songId/comments -- change the text of a given song comment
  DELETE /song/:songId/comments/:commentId --  remove a comment from the database
  GET    /song/:songId -- serves static assets
  GET    /bundle/ -- serves bundle for proxy services
<hr>

## Change History
|Name                                 |Version    |Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|Description     |
|:----------------------------------- |:--------- |:--------- |:------- |
|[@pafrias](https://github.com/pafrias) |1.0        |Feb-27-2019 |Document initial API CRUD routes for relevant models in the `Reservations` microservice.

### Getting Started
FILL ME IN
