    localStorage.setItem('userRole', 'admin');

    function loadEvents() {
      const events = JSON.parse(localStorage.getItem('events')) || [];
      const eventsContainer = document.getElementById('top-events');
      const userRole = localStorage.getItem('userRole');

      events.forEach((event, index) => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');
        eventCard.innerHTML = `
          <img src="${event.image}" alt="${event.name}">
          <div class="details">
            <h3>${event.name}</h3>
            <p>${event.date}</p>
            <p>${event.description}</p>
            <button class="delete-event" data-index="${index}">Delete</button>
          </div>
        `;
        eventsContainer.appendChild(eventCard);
      });
      
      if (userRole === 'admin') {
        document.querySelectorAll('.delete-event').forEach(button => {
          button.classList.add('show');
          button.addEventListener('click', function() {
            deleteEvent(this.getAttribute('data-index'));
          });
        });
      }
    }

    function deleteEvent(index) {
      const events = JSON.parse(localStorage.getItem('events')) || [];
      events.splice(index, 1);
      localStorage.setItem('events', JSON.stringify(events));
      loadEvents();
    }

    window.onload = function() {
      loadEvents();
    }