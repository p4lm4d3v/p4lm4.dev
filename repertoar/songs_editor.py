import json
import os
import time

JSON_FILE = 'songs.json'

def load_data():
    """Loads the JSON data safely. Creates an empty file if it doesn't exist."""
    if not os.path.exists(JSON_FILE):
        return []
    try:
        with open(JSON_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except json.JSONDecodeError:
        print("⚠️ Warning: songs.json was corrupted or empty. Starting fresh.")
        return []

def save_data(data):
    """Saves data back to JSON, sorted neatly by author name."""
    # Keep the root authors sorted alphabetically
    data.sort(key=lambda x: x['author'].lower())

    # Sort the song titles inside each author group alphabetically too
    for artist_group in data:
        if 'songs' in artist_group:
            artist_group['songs'].sort(key=lambda x: x['title'].lower())

    with open(JSON_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("💾 Changes saved successfully!")

def get_flattened_list(data):
    """Flattens the structure into a flat list of items for easy indexing."""
    flat_list = []
    for artist_index, artist_group in enumerate(data):
        author = artist_group['author']
        for song_index, song_obj in enumerate(artist_group.get('songs', [])):
            flat_list.append({
                'author': author,
                'title': song_obj['title'],
                'link': song_obj['link'],
                'artist_idx': artist_index,
                'song_idx': song_index
            })
    return flat_list

def add_song(data):
    print("\n--- ➕ Add a New Song ---")
    author_input = input("Enter Artist/Author name: ").strip()
    song_title = input("Enter Song Title: ").strip()
    song_link = input("Enter Link (Tabs, Chords, Video): ").strip()

    if not author_input or not song_title:
        print("❌ Artist and Song Title cannot be empty!")
        return

    # Look for existing author group (case-insensitive check)
    target_group = None
    for artist_group in data:
        if artist_group['author'].lower() == author_input.lower():
            target_group = artist_group
            break

    new_song = {"title": song_title, "link": song_link}

    if target_group:
        # Check if song already exists under this author
        for s in target_group['songs']:
            if s['title'].lower() == song_title.lower():
                print(f"⚠️ '{song_title}' already exists under {target_group['author']}!")
                return
        target_group['songs'].append(new_song)
    else:
        # Create brand new author entry
        data.append({
            "author": author_input,
            "songs": [new_song]
        })

    save_data(data)

def display_all_songs(flat_list):
    """Prints a numbered layout of all tracks."""
    if not flat_list:
        print("\n📭 Repertoire is currently empty.")
        return False

    print(f"\n--- 🎶 Current Repertoire ({len(flat_list)} tracks) ---")
    for idx, item in enumerate(flat_list, start=1):
        print(f"[{idx}] {item['author']} | {item['title']} -> ({item['link']})")
    return True

def edit_song(data):
    flat_list = get_flattened_list(data)
    if not display_all_songs(flat_list):
        return

    print("\n--- ✏️ Edit an Existing Song ---")
    try:
        choice = int(input("Enter the track number to edit: "))
        if choice < 1 or choice > len(flat_list):
            raise ValueError
    except ValueError:
        print("❌ Invalid track selection number.")
        return

    selected = flat_list[choice - 1]
    artist_entry = data[selected['artist_idx']]
    song_entry = artist_entry['songs'][selected['song_idx']]

    print(f"\nEditing: {selected['author']} - {selected['title']}")
    print("Leave field blank to keep current value.")

    new_title = input(f"New Title [{selected['title']}]: ").strip()
    new_link = input(f"New Link [{selected['link']}]: ").strip()

    if new_title:
        song_entry['title'] = new_title
    if new_link:
        song_entry['link'] = new_link

    save_data(data)

def remove_song(data):
    flat_list = get_flattened_list(data)
    if not display_all_songs(flat_list):
        return

    print("\n--- ❌ Delete a Song ---")
    try:
        choice = int(input("Enter the track number to delete: "))
        if choice < 1 or choice > len(flat_list):
            raise ValueError
    except ValueError:
        print("❌ Invalid track selection number.")
        return

    selected = flat_list[choice - 1]
    artist_entry = data[selected['artist_idx']]

    # Remove the target song item from the original references nested list
    del artist_entry['songs'][selected['song_idx']]

    # Clean up empty authors entirely if no songs are left
    if not artist_entry['songs']:
        data.pop(selected['artist_idx'])
        print(f"Removed empty artist profile for: {selected['author']}")

    print(f"Deleted '{selected['title']}' by {selected['author']}.")
    save_data(data)

def main():
    while True:
        data = load_data()
        print("\n==============================")
        print("🎸 GUITAR REPERTOIRE MANAGER  ")
        print("==============================")
        print("[1] View Repertoire List")
        print("[2] Add New Song")
        print("[3] Edit a Song")
        print("[4] Delete a Song")
        print("[5] Exit")

        choice = input("Select an option (1-5): ").strip()

        if choice == '1':
            flat_list = get_flattened_list(data)
            display_all_songs(flat_list)
        elif choice == '2':
            add_song(data)
        elif choice == '3':
            edit_song(data)
        elif choice == '4':
            remove_song(data)
        elif choice == '5':
            print("\nGoodbye! Keep practicing. 🎸")
            break
        else:
            print("❌ Input option not recognized. Try again.")

        time.sleep(1)
        os.system('cls' if os.name == 'nt' else 'clear')

if __name__ == '__main__':
    main()
