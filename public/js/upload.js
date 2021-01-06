$(document).ready(function () {
  let imagesPreview = function (input, placeToInsertImagePreview) {
    if (input.files) {
      let filesAmount = input.files.length;
      for (i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        reader.onload = function (event) {
          $($.parseHTML('<img>'))
            .attr('src', event.target.result)
            .appendTo(placeToInsertImagePreview);
        };
        reader.readAsDataURL(input.files[i]);
      }
    }
  };
  $('#input-files').on('change', function () {
    imagesPreview(this, 'div.preview-images');
  });

  const uploadImageHandler = async (event) => {
    event.preventDefault();

    const files = document.querySelector('#input-files').files;
    const roomId = document.querySelector('#roomId').value.trim();
    const locationId = document.querySelector('#locationId').value.trim();

    if (!files) return;

    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('roomId', roomId);
    formData.append('locationId', locationId);

    const response = await fetch('/api/pictures/upload', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      window.location.replace(document.referrer);
    } else {
      alert(response.statusText);
    }
  };

  document
    .querySelector('.upload-form')
    .addEventListener('submit', uploadImageHandler);
});
