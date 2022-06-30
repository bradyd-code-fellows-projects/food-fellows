# LAB - Class 14

## Project: Food Fellows - partner lab building a project of choosing using socket.io queueing

### Author: Brady Davenport, Elizabeth Hammes

### Problem Domain

Tired of wondering when your food will be delivered?  Have we got a solution for you!  With the Food Fellows food delivery notification service, food order information will be tracked from when you place your order, to when the vendor has cooked your food and its ready for pickup, all the way to arriving at your front door.  When you subscribe to the alerts, you will know where your food is, every step of the way!

### Links and Resources

[GitHub Repo](https://github.com/bradydavenport/food-fellows)

### Setup

* Clients
  * Customer
    * Publish:
      * ORDER
      * THANK_YOU
    * Receive:
      * READY_FOR_PICKUP
      * IN_TRANSIT
      * DELIVERED
  * Vendor
    * Publish:
      * READY_FOR_PICKUP
    * Receive:
      * ORDER
      * IN_TRANSIT
      * DELIVERED
      * THANK_YOU
  * Driver
    * Publish:
      * IN_TRANSIT
      * DELIVERED
    * Receive:
      * READY_FOR_PICKUP
      * THANK_YOU

### UML

![uml](/public/img/food-fellows-uml.jpg)
