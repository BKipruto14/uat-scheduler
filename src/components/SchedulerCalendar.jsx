import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

function SchedulerCalendar() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventClick = async ({ event }) => {
        const response = await axios.get();
        const clicked = response.data.find(item => item.ticket_id === event.title);
        if (clicked) {
            setSelectedEvent({...clicked, oldticket_id: clicked.ticket_id}); // Store the old ticket ID for the update
        } else {
            console.warn("Event not found ");
        }
    };
    // Replace this with API call later

    //handle save changes to the event
    const handleSave = async () => {
        const { ticket_id, startdate, enddate, recipient_email, country, servers } = selectedEvent;

        // Validate the form data before saving
        if (!ticket_id || !startdate || !enddate || !recipient_email || !country) {
            alert("Please fill in all fields.");
            return;
        }
        if (!servers) {
            alert("Please select at least one server.");
            return;
        }

        if (startdate >= enddate) {
            alert("End date must be after start date.");
            return;
        }
        if (new Date(startdate) < new Date()) {
            alert("Start date must be in the future.");
            return;
        }
        if (startdate === enddate) {
            alert("Start and end date cannot be the same.");
            return;
        }

        const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
        const invalidEmail = recipient_email.find(email => !isValidEmail(email));
        if (invalidEmail) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            await axios.put(, {
                oldticket_id: selectedEvent.oldticket_id,
                ticket_id: selectedEvent.ticket_id,
                startdate: selectedEvent.startdate,
                enddate: selectedEvent.enddate,
                recipient_email: selectedEvent.recipient_email,
                country: selectedEvent.country,
                servers: selectedEvent.servers,
            }
            );
            alert("Schedule saved!");
            navigate('/calendar'); // Redirect to the calendar page after submission
            setSelectedEvent(null);
            window.location.reload(); // Reload the page to reflect changes
        } catch (err) {
            console.error("Error saving schedule:", err);
        }

    }


    const handleDelete = async () => {
        try {
            await axios.delete(, {
                data: { ticket_id: selectedEvent.ticket_id }
            });
            alert("Schedule deleted!");
            setSelectedEvent(null);
            window.location.reload(); // Reload the page to reflect changes
        }
        catch (err) {
            console.error("Error deleting schedule:", err);
            alert("Error deleting schedule. Please try again.");
        }

    };

    useEffect(() => {

        const fetchEvents = async () => {
            try {
                const response = await axios.get();
                const storedEvents = response.data;

                const mapped = storedEvents.map(item => ({  // Map the stored events to the format required by FullCalendar

                    title: item.ticket_id,
                    start: item.startdate,
                    end: item.enddate,
                    recipient_email: item.recipient_email,
                    country: item.country,
                    servers: item.servers,
                }));
                setEvents(mapped);
            } catch
            (error) {
                console.error("Error fetching events:", error);
            }
        }
        fetchEvents(); // Fetch events when the component mounts
    }, []);


    return (
        <div className="max-w-5xl mx-auto mt-8 p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-4">Scheduled Tests</h2>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                events={events}
                eventClick={handleEventClick}
                height="auto"
            />
            {selectedEvent && (
                <div style={{
                    position: 'fixed',
                    top: '20%',
                    left: '50%',
                    transform: 'translate(-50%, 0)',
                    backgroundColor: '#fff',
                    padding: '2rem',
                    border: '1px solid #ccc',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                    zIndex: 1000
                }}>
                    <h3>Schedule Details</h3>
                    <label><strong>Ticket ID:</strong> </label>
                    <input
                        type="text"
                        value={selectedEvent.ticket_id}
                        onChange={(e) => setSelectedEvent({ ...selectedEvent, ticket_id: e.target.value })}
                    />

                    <label><strong>Start:</strong></label>
                    <input
                        type="datetime-local"
                        value={selectedEvent.startdate}
                        onChange={(e) => setSelectedEvent({ ...selectedEvent, startdate: e.target.value })}
                    />

                    <label><strong>End:</strong></label>
                    <input
                        type="datetime-local"
                        value={selectedEvent.enddate}
                        onChange={(e) => setSelectedEvent({ ...selectedEvent, enddate: e.target.value })}
                    />

                    <label><strong>Recipient Email:</strong> </label>
                    <input
                        type="text"
                        value={Array.isArray(selectedEvent.recipient_email)
                            ? selectedEvent.recipient_email?.join(",")
                            : selectedEvent.recipient_email || ""}
                        onChange={(e) =>
                            setSelectedEvent({
                                ...selectedEvent,
                                recipient_email: e.target.value.split(",").map(email => email.trim())
                            })}
                    />
                    <label><strong>Country:</strong> </label>
                    <select
                        value={selectedEvent.country}
                        onChange={(e) => setSelectedEvent({ ...selectedEvent, country: e.target.value })}
                    >
                        <option value="Botswana">Botswana</option>
                        <option value="Eswatini">Eswatini</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Namibia">Namibia</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Tanzania">Tanzania</option>
                        {/* Add more countries as needed */}
                    </select>

                    <label><strong>Server:</strong></label>
                    <select
                        value={selectedEvent.servers || ""}
                        onChange={(e) => setSelectedEvent({ ...selectedEvent, servers: e.target.value })}
                    >
                        <option value="ALL">ALL</option>
                        <option value="BRANCH">BRANCH</option>
                        <option value="DIGITAL">DIGITAL</option>
                        {/* Type values */}
                    </select>
                    <button onClick={handleSave}>Save Changes</button>
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={() => setSelectedEvent(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}
export default SchedulerCalendar;