const saveRoomHandler = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#roomId').value.trim();
  const name = document.querySelector('#name').value.trim();
  const description = document.querySelector('#description').value.trim();
  const size = document.querySelector('#size').value.trim();
  const amenities = document.querySelector('#amenities').value.trim();
  const locationId = document.querySelector('#locationId').value.trim();

  if (name && description && size && amenities) {
    const response = await fetch('/api/rooms/' + id || '', {
      method: id ? 'PUT' : 'POST',
      body: JSON.stringify({
        name,
        description,
        size,
        amenities,
        id,
        locationId
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace(`/user/location/${locationId}`);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.room-form')
  .addEventListener('submit', saveRoomHandler);
