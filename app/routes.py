from flask import Flask, jsonify, redirect, render_template, request, session, url_for
from .models import insert_wishlist, get_wishlist_by_uuid, update_wishlist_items
import uuid

app = Flask(__name__)
app.secret_key = 'my_secret_key'  # secret key for session mgmt


@app.route("/")
def home():
    wishlist_items = session.get('wishlist_items', [])
    return render_template('home.html', wishlist_items=wishlist_items)


@app.route('/add_item', methods=['POST'])
def add_item():
    title = request.form.get('title')
    link = request.form.get('link')
    contributor = None

    if title:
        item = {'title': title, 'link': link, 'contributor_name': None}

        # update the list stored in current session
        wishlist_items = session.get('wishlist_items', [])
        wishlist_items.append(item)
        session['wishlist_items'] = wishlist_items

    return redirect('/')


@app.route("/submit")
def submit():
    wishlist_uuid = str(uuid.uuid4())

    # get list from current session
    wishlist_items = session.get('wishlist_items', [])

    # insert wishlist data in db
    wishlist_data = {'wishlist_uuid': wishlist_uuid,
                     'items': wishlist_items, 'contributor_name': None}
    insert_wishlist(wishlist_data)

    # clear current session
    session.pop('wishlist_items', None)

    return redirect(url_for('wishlist', wishlist_uuid=wishlist_uuid))


@app.route("/wishlist/<wishlist_uuid>")
def wishlist(wishlist_uuid):
    # get wishlist data from db
    wishlist_data = get_wishlist_by_uuid(wishlist_uuid)
    print("Retrieved data:", wishlist_data)
    wishlist_items = wishlist_data['items']

    return render_template('wishlist.html', wishlist_uuid=wishlist_uuid, wishlist_items=wishlist_items)


@app.route("/submit_contributor/<wishlist_uuid>", methods=['POST'])
def submit_contributor(wishlist_uuid):
    contributor_name = request.form.get('contributor_name')

    if contributor_name:
        # set contributor name in current session
        session['contributor_name'] = contributor_name

    return redirect(url_for('wishlist', wishlist_uuid=wishlist_uuid))


@app.route("/submit_wishlist/<wishlist_uuid>", methods=['POST'])
def submit_wishlist(wishlist_uuid):
    # check if there's a contributor in session
    contributor_name = session.get('contributor_name')
    if not contributor_name:
        return redirect(url_for('wishlist', wishlist_uuid=wishlist_uuid))

    # get selected items and check that at least one is selected
    selected_items = request.form.getlist('wishlist_item')
    print("selected items: ", selected_items)
    if not selected_items:
        return redirect(url_for('wishlist', wishlist_uuid=wishlist_uuid))

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


@app.route("/hello")
@app.route("/hello/<name>")  # hello_world gets name param from url
def hello_world(name=None):
    return render_template('hello.html', name=name)
