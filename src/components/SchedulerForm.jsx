import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SchedulerForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ticketId: '',
        startDate: '',
        hoursRequired: '',
        endDate: '',
        Recipient_Email: '',
        country: '',
        servers: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            let updated = { ...prev };

            if (name === 'Recipient_Email') {
                const emails = value.split(',').map(email => email.trim());
                updated[name] = emails; // Store as an array of emails
            } else {
                updated[name] = value;
            }
            if (updated.startDate && updated.hoursRequired) {
                const start = new Date(updated.startDate);
                const hours = parseFloat(updated.hoursRequired);
                const end = new Date(start.getTime() + hours * 60 * 60 * 1000); // Add hours to start date
                const localEnd = new Date(end.getTime() - end.getTimezoneOffset() * 60 * 1000); // Adjust for local timezone
                updated.endDate = localEnd.toISOString().slice(0, 16); // Set end date to start date + hours required
            }
            return updated;
        });
    };

    const handleServerSelect = (e) => {
        const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
        setFormData((prev) => ({
            ...prev,
            servers: selected,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //UpdatedFormSchedules = new form data + existing schedules

        //For Testing Purposes
        //Get existing schedules from local storage
        //Basic Validation

        if (!formData.ticketId || !formData.startDate || !formData.endDate || !formData.Recipient_Email || !formData.country || !formData.servers.length) {
            alert("Please fill in all required fields.");
            return;
        }
        if (formData.startDate >= formData.endDate) {
            alert("End date must be after start date.");
            return;
        }
        if (new Date(formData.startDate) < new Date()) {
            alert("Start date must be in the future.");
            return;
        }

        const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
        const invalidEmail = formData.Recipient_Email.find(email => !isValidEmail(email));
        if (invalidEmail) {
            alert("Please enter a valid email address.");
            return;
        }
        if (formData.servers.length === 0) {
            alert("Please select at least one server.");
            return;
        }
        if (formData.country === '') {
            alert("Please select a country.");
            return;
        }
        if (formData.ticketId === '') {
            alert("Please enter a ticket ID.");
            return;
        }
        if (formData.startDate === '' || formData.endDate === '') {
            alert("Please enter a date.");
            return;
        }
        if (formData.startDate === formData.endDate) {
            alert("Start and end date cannot be the same.");
            return;
        }

        //API CAll 
        try {
            await axios.post();
            alert("Schedule saved!");
            navigate('/calendar'); // Redirect to the calendar page after submission
        } catch (err) {
            console.error("Error saving schedule:", err);
        }
        // Reset form data after submission 
        setFormData({
            ticketId: '',
            startDate: '',
            hoursRequired: '',
            endDate: '',
            Recipient_Email: '',
            country: '',
            servers: [],
        });

    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4">Schedule a UAT Test</h2>
            <form onSubmit={handleSubmit}
                className="space-y-4">
                {/* Ticket ID */}
                <div>
                    <label className="block font-medium">Ticket ID</label>
                    <input
                        type="text"
                        name="ticketId"
                        value={formData.ticketId}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Start Date */}
                <div>
                    <label className="block font-medium">Start Date & Time</label>
                    <input
                        type="datetime-local"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                {/* Hours Required */}
                <div>
                    <label className="block font-medium">Hours Required</label>
                    <input
                        type="number"
                        name="hoursRequired"
                        value={formData.hoursRequired}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* End Date */}
                <div>
                    <label className="block font-medium">End Date & Time</label>
                    <input
                        type="datetime-local"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Recipient Email */}
                <div>
                    <label className="block font-medium">Recipient Email</label>
                    <input
                        type="text"
                        name="Recipient_Email"
                        value={Array.isArray(formData.Recipient_Email) ? formData.Recipient_Email?.join(",") : formData.Recipient_Email || ""}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Country */}
                <div>
                    <label className="block font-medium">Country</label>
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Select a country</option>
                        <option value="Botswana">Botswana</option>
                        <option value="Eswatini">Eswatini</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Namibia">Namibia</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Tanzania">Tanzania</option>

                        {/* Add more as needed */}
                    </select>
                </div>

                {/* List of Servers */}
                <div>
                    <label className="block font-medium">List of Servers</label>
                    <select
                        name="servers"
                        multiple
                        value={formData.servers}
                        onChange={handleServerSelect}
                        className="w-full border rounded px-3 py-2 h-32"
                    >
                        <option value="ALL">ALL</option>
                        <option value="BRANCH">BRANCH</option>
                        <option value="DIGITAL">DIGITAL</option>
                        {/* Type values */}
                    </select>
                </div>

                {/* Submit */}
                <div>
                    <button type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Submit Schedule
                    </button>
                </div>
            </form>
        </div>
    );
};
export default SchedulerForm;
