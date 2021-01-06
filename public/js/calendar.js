document.addEventListener('DOMContentLoaded', async function () {
  const modalEl = $('#reserve-form-modal')[0];
  const modal = new bootstrap.Modal(modalEl, {
    keyboard: false
  });

  //Form inputs
  const descEl = $('#description');
  const sponsorEl = $('#sponsoredBy');
  const publicEl = $('#public')[0];
  const dateEl = $('#date');
  const startEl = $('#startTime');
  const endEl = $('#endTime');
  const idEl = $('#id');
  const statusEl = $('#status');
  const statusSpan = $('#status-span');

  const formatDate = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${year}-${ month < 10 ? '0' + month : month }-${ day < 10 ? '0' + day : day }`;
  };

  const formatTime = (date) => {
    let hrs = date.getHours();
    let minutes = date.getMinutes();

    return `${hrs}:${ minutes < 10 ? '0' + minutes : minutes }`;
  };

  $('#reserve-form-modal').on('hidden.bs.modal', function () {
    //reset form
    descEl.val('');
    sponsorEl.val('');
    dateEl.val('');
    startEl.val('');
    endEl.val('');
    idEl.val('0');
    statusEl.addClass('d-none');
  });

  const response = await fetch('/api/reservations/room/' + roomId, {
    method: 'GET',
  });

  let reservations = await response.json();

  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: reservations.map(reservation => {
      let color = 'blue-font';

      if(reservation.status === 'Pending Approval') {
        color = 'grey-font';
      } else if(reservation.status === 'Approved') {
        color = 'green-font';
      } else if(reservation.status === 'Rejected') {
        color = 'red-font strikethrough';
      }

      return {
        id: reservation.id,
        title: `${reservation.description}`,
        start: reservation.startDate,
        classNames: [color],
      };
    }),
    dateClick: function (info) {
      dateEl.val(info.dateStr);
      modal.show();
    },
    eventClick: function (info) {
      //Get the event and the reservation clicked
      let event = info.event;
      let reservation = reservations.find(res => res.id + '' === event.id);

      //Set the form fields and pull up the form
      descEl.val(reservation.description);
      sponsorEl.val(reservation.sponsoredBy);
      publicEl.checked = true;

      //Split the date and time
      let startDate = new Date(reservation.startDate);
      let endDate = new Date(reservation.endDate);
      let dateStr = formatDate(startDate);
      dateEl.val(dateStr);

      startEl.val(formatTime(startDate));
      endEl.val(formatTime(endDate));

      //Set the id and the status, unhide the status
      idEl.val(reservation.id);
      statusSpan.text(reservation.status);
      statusEl.removeClass('d-none');

      if(reservation.status.includes('Rejected')) {
        statusSpan.addClass('red-font').removeClass('green-font grey-font');
      } else if(reservation.status.includes('Approved')) {
        statusSpan.addClass('green-font').removeClass('red-font grey-font');
      } else if(reservation.status.includes('Pending')) {
        statusSpan.addClass('grey-font').removeClass('red-font green-font');
      }

      modal.show();
    },
  });
  calendar.render();

  //Add on click event listener of the form submit
  $('#submit-reservation').on('click', async () => {
    event.preventDefault();

    //Get start and end date by combining date and time fields
    let startDate = new Date(dateEl.val() + ' ' + startEl.val());
    let endDate = new Date(dateEl.val() + ' ' + endEl.val());

    //Check if there is an id, if so this item needs updated rather than posted
    let id = idEl.val();

    //Get the form values
    let reservation = {
      description: descEl.val(),
      sponsoredBy: sponsorEl.val(),
      isPublic: publicEl.checked,
      startDate: startDate,
      endDate: endDate,
      roomId: roomId,
    };

    let url = '';
    let method = '';

    if(id === '0') {
      url = '/api/reservations/';
      method = 'POST';
    } else {
      url = '/api/reservations/' + id;
      method = 'PUT';
    }

    //Call the reservation post route posting the new reservation
    let res = await fetch(url, {
      method: method,
      body: JSON.stringify(reservation),
      headers: { 'Content-Type': 'application/json' },
    });

    if(!res.ok) {
      alert('You must be logged in to modify a reservation');
    } else {
      window.location.reload();
    }
  });
});