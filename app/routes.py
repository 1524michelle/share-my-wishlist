from flask import Flask, jsonify, redirect, render_template, request, session, url_for
from flask_cors import CORS
from .models import insert_wishlist, get_wishlist_by_uuid, update_wishlist_items
import uuid

app = Flask(__name__, static_folder="../client/build")
CORS(app)
app.secret_key = 'my_secret_key'  # secret key for session mgmt

# LANDING PAGE


@app.route("/")
def home():
    print("home")
    return render_template('home.html')


@app.route('/submit_owner_name', methods=['POST', 'OPTIONS'])
def submit_owner_name():
    print("submit_owner_name")
    if request.method == 'OPTIONS':  # preflight request handling
        response = app.make_default_options_response()
        return response
    else:
        owner_name = request.form.get('owner_name')

        if owner_name:
            session['owner_name'] = owner_name
            return redirect(url_for('create_list'))
        else:
            # no name -> refresh
            return redirect(url_for('home'))

# ADD TO (CREATE) LIST PAGE


@ app.route("/create_list")
def create_list():
    print("create_list")
    wishlist_items = session.get('wishlist_items', [])
    owner_name = session['owner_name']
    return render_template('create_list.html', wishlist_items=wishlist_items, owner_name=owner_name)


@app.route('/add_item', methods=['POST', 'OPTIONS'])
def add_item():
    print("add_item")
    if request.method == 'OPTIONS':  # preflight request handling
        response = app.make_default_options_response()
        return response
    else:
        title = request.form.get('title')
        link = request.form.get('link')
        contributor_name = None

        if title:
            item = {'title': title, 'link': link, 'contributor_name': None}

            # update the list stored in current session
            wishlist_items = session.get('wishlist_items', [])
            wishlist_items.append(item)
            session['wishlist_items'] = wishlist_items

        return redirect(url_for('create_list'))


@app.route("/submit_wishlist")
def submit_wishlist():
    print("submit_wishlist")
    wishlist_uuid = str(uuid.uuid4())

    # get items from current session
    owner_name = session.get('owner_name', "mimi")
    wishlist_items = session.get('wishlist_items', [])

    # insert wishlist data in db
    wishlist_data = {'owner_name': owner_name, 'wishlist_uuid': wishlist_uuid,
                     'items': wishlist_items, 'contributor_name': None}
    insert_wishlist(wishlist_data)

    # clear current session
    session.pop('wishlist_items', None)
    session.pop('owner_name', None)

    return redirect(url_for('wishlist', wishlist_uuid=wishlist_uuid))

# WISHLIST CONTRIBUTORS SIGNUP PAGE


@app.route("/wishlist_contributors_signup/<wishlist_uuid>")
def wishlist_contributors_signup(wishlist_uuid):
    print("wishlist_contributors_signup")
    # get wishlist data from db
    wishlist_data = get_wishlist_by_uuid(wishlist_uuid)
    owner_name = wishlist_data['owner_name']

    return render_template('wishlist_contributors_signup.html', owner_name=owner_name, wishlist_uuid=wishlist_uuid)


@app.route('/submit_contributor_name/<wishlist_uuid>', methods=['POST', 'OPTIONS'])
def submit_contributor_name(wishlist_uuid):
    print("submit_contributor_name")
    if request.method == 'OPTIONS':  # preflight request handling
        response = app.make_default_options_response()
        return response
    else:
        contributor_name = request.form.get('contributor_name')

        if contributor_name:
            session['contributor_name'] = contributor_name
            return redirect(url_for('wishlist_contributors', wishlist_uuid=wishlist_uuid))
        else:
            # no contributor name -> refresh page
            return redirect(url_for('wishlist_contributors_signup', wishlist_uuid=wishlist_uuid))

# WISHLIST CONTRIBUTORS PAGE


@app.route("/wishlist_contributors/<wishlist_uuid>")
def wishlist_contributors(wishlist_uuid):
    print("wishlist_contributors")

    # get wishlist data from db
    wishlist_data = get_wishlist_by_uuid(wishlist_uuid)
    print("Retrieved data:", wishlist_data['items'])
    owner_name = wishlist_data['owner_name']
    wishlist_items = wishlist_data['items']

    # get contributor name from session
    contributor_name = session['contributor_name']

    return render_template('wishlist_contributors.html', owner_name=owner_name, contributor_name=contributor_name, wishlist_uuid=wishlist_uuid, wishlist_items=wishlist_items)


@app.route("/submit_wishlist_contributors/<wishlist_uuid>", methods=['POST', 'OPTIONS'])
def submit_wishlist_contributors(wishlist_uuid):
    print("submit_wishlist_contributors")
    # check if there's a contributor in session, refresh if not
    contributor_name = session.get('contributor_name')
    if not contributor_name:
        print("no contributor name")

    # get selected items and check that at least one is selected, refresh if not
    selected_items = request.form.getlist('wishlist_item')
    print("selected items: ", selected_items)
    if not selected_items:
        print("no selected items")
        return redirect(url_for('wishlist_contributors', wishlist_uuid=wishlist_uuid))

    # get wishlist data from db
    wishlist_data = get_wishlist_by_uuid(wishlist_uuid)
    wishlist_items = wishlist_data['items']

    # update contributor field for selected items in db
    for item in wishlist_items:
        if item['title'] in selected_items:
            item['contributor_name'] = contributor_name
            print("item: ", item)
    update_wishlist_items(wishlist_uuid, wishlist_items)

    # clear contributor name from session
    session.pop('contributor_name', None)

    return redirect(url_for('wishlist', wishlist_uuid=wishlist_uuid))

# WISHLIST RECEIPT PAGE


@app.route("/wishlist/<wishlist_uuid>")
def wishlist(wishlist_uuid):
    print("wishlist")
    # get wishlist data from db
    wishlist_data = get_wishlist_by_uuid(wishlist_uuid)
    owner_name = wishlist_data['owner_name']
    wishlist_items = wishlist_data['items']

    return render_template('wishlist.html', owner_name=owner_name, wishlist_uuid=wishlist_uuid, wishlist_items=wishlist_items)


@app.route("/redirect_contributor_page/<wishlist_uuid>", methods=['POST', 'OPTIONS'])
def redirect_contributor_page(wishlist_uuid):
    print(redirect_contributor_page)
    if request.method == 'OPTIONS':  # preflight request handling
        response = app.make_default_options_response()
        return response
    else:
        return redirect(url_for('wishlist_contributors_signup', wishlist_uuid=wishlist_uuid))

# TEST


@app.route("/hello")
@app.route("/hello/<name>")  # hello_world gets name param from url
def hello_world(name=None):
    return render_template('hello.html', name=name)


if __name__ == "__main__":
    app.run(debug=True)
