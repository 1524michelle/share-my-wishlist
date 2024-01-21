# Share my Wishlist!
Based off when2meet, but instead it`s a shareable wishlist where people can sign up to claim that gift to prevent cases of double-gifting.

## Routes by page

### Landing page: owner signs up
1. `/` (GET) = renders form where owner starts a wishlist by submitting their name
2. `submit_owner_name` (POST) = processes owner name from the form and stores it in the current session, redirects to create list page

### Create list page: owner creates their list
1. `create` (GET) = renders form where owner can add items to their wishlist
2. `add_item` (POST) = processes each item added to the wishlist and stores it in a list in the current session
3. `submit_list` (POST) = adds all items stored in the current session to db and removes them from the current session, redirects to wishlist page with a section to share the url of the wishlist contributors page

### Wishlist contributors signup page: shared by owner to contributors
1. `wishlist_contributors_signup/<wishlist_uuid>` (GET) = renders form where contributor submits their name
2. `submit_contributor_name/<wishlist_uuid>` (POST) = processes contributor name from the form and stores it in the current session, redirects to wishlist contributors page

### Wishlist contributors page: contributors select their gifts
1. `wishlist_contributors/<wishlist_uuid>` (GET) = renders list where contributor checks their gift choice(s)
2. `submit_wishlist_contributors/<wishlist_uuid>` (POST) = processes contributor choices from the form and adds them to the db, redirects to the wishlist page

### Wishlist page: see all items and contributors
1. `wishlist/<wishlist_uuid>` (GET) = renders wishlist page
2. `redirect_contributor_page/<wishlist_uuid>` (POST) = redirects to contributor signup page

## License

[MIT](https://choosealicense.com/licenses/mit/)