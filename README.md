# Share my Wishlist!
Based off when2meet, but instead it's a shareable wishlist where people can sign up to cover that gift to prevent cases of double-gifting.

## Routes by page

### Landing page: owner signs up
1. '/' (GET) = renders form where owner starts a wishlist by submitting their name
2. 'submit_owner_name' (POST) = processes owner name from the form and stores it in the current session, redirects to create list page

### Create list page: owner creates their list
1. 'create_list' (GET) = renders form where owner can add items to their wishlist
2. 'add_item' (POST) = processes each item added to the wishlist and stores it in a list in the current session
3. 'submit_list' (POST) = adds all items stored in the current session to db and removes them from the current session, redirects to wishlist contributors page

### Wishlist contributors page: shared by owner to contributors
1. 'wishlist_contributors/<wishlist_uuid>' (GET) = 