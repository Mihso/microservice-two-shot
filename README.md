# Wardrobify

Team:

* Gio Medina - Shoes 
* Matthew Oshimo - Hats

## Design
Install Django App for Shoes and Hats
Create Models for Hats and Shoes.
Test on Insomnia if links work.
## Shoes microservice
Shoes Model
    - manufacturer, model name, color, url
Explain your models and integration with the wardrobe
microservice, here.

## Hats microservice
First, I created the Hats model and a locationVO model.
-Hats will have the variables styleName, color, pictureUrl, and a many to one relationship with a location.
-locationVO will have hold information retrieved from the Location models in the wardrobe app folder.
    - this location information will be retrieved using poller.
      - poller needs to be modified to send data to the api sibling folder.
- I wil need to go into the docker container in order to migrate the added variables to the models.
Then, I need to create views for listing the Hats models, getting details of individual hats, and deleting a hat
Afterwards, I need to create url paths to allow for testing out the GET, PUT, and Delete functionalities.
Once those are done, begin working with React to create components.
-Will make creating a Hat form and showing list of hats differing pages, so separate JavaScript files for each.
-Will include delete functionality as part of the list file.
    -will utilize fetchConfig used in similar projects, but change 'post' to 'delete'.
    -will need to get individual hat identification in order to properly delete selected hat.
        -add some kind of id variable to hat model

Changes made while implementing coding plan:
    -moved most of the componentMount in HatsList JavaScript functionality into a separate function so that it could be called again when a form is submitted.
        -this was done so that the hats list would automatically update when a hat is deleted.
    
-
Explain your models and integration with the wardrobe
microservice, here.
