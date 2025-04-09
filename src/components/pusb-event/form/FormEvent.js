import React, { useState, useEffect } from 'react';

const FormEvent = ({ isEditMode, id }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: '',
    audience: '',
    period: '',
    participantLink: '',
    recruitmentLink: '',
    audienceLink: '',
    thumbnail: null,
  });
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      const fetchEventData = async () => {
        try {
          const response = await fetch(`/api/pusb-events/${id}`);
          if (!response.ok) throw new Error('Failed to load event data');
          const data = await response.json();

          setFormData({
            name: data.name || '',
            description: data.description || '',
            startDate: data.start_date ? data.start_date.slice(0, 10) : '',
            endDate: data.end_date ? data.end_date.slice(0, 10) : '',
            status: data.status || '',
            audience: data.audience || '',
            period: data.period || '',
            participantLink: data.participant_link || '',
            recruitmentLink: data.recruitment_link || '',
            audienceLink: data.audience_link || '',
            thumbnail: null,
          });
          if (data.thumbnail) setPreview(data.thumbnail);
        } catch (error) {
          console.error(error);
          alert('Failed to load event data.');
        }
      };

      fetchEventData();
    }
  }, [isEditMode, id]);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { startDate, endDate } = formData;
    if (startDate && endDate && startDate > endDate) {
      alert('End date must be after the start date');
      setIsLoading(false);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });
    data.append('ministry_id', '1');

    try {
      const url = isEditMode ? `/api/pusb-events/${id}` : '/api/pusb-events';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, { method, body: data });

      if (response.ok) {
        alert(isEditMode ? 'Event updated successfully!' : 'Event created successfully!');
        window.location.href = isEditMode ? `/admin/pusb-events/${id}/details` : '/admin/pusb-events';
      } else {
        alert('Failed to save event data.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while saving data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {/* Event Name */}
      <div>
        <label htmlFor="name">Event Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter the event name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Event Description */}
      <div>
        <label htmlFor="description">Event Description</label>
        <textarea
          id="description"
          placeholder="Enter event description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      {/* Start Date & End Date */}
      <div>
        <label htmlFor="startDate">Start Date</label>
        <input
          id="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date</label>
        <input
          id="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status">Event Status</label>
        <select id="status" value={formData.status} onChange={handleChange} required>
          <option value="">Select Status</option>
          <option value="PRESENT">Ongoing</option>
          <option value="SOON">Upcoming</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {/* Audience */}
      <div>
        <label htmlFor="audience">Audience</label>
        <input
          id="audience"
          type="text"
          value={formData.audience}
          onChange={handleChange}
          required
        />
      </div>

      {/* Participant Link */}
      <div>
        <label htmlFor="participantLink">Participant Link</label>
        <input
          id="participantLink"
          type="text"
          value={formData.participantLink}
          onChange={handleChange}
          required
        />
      </div>

      {/* Recruitment Link */}
      <div>
        <label htmlFor="recruitmentLink">Recruitment Link</label>
        <input
          id="recruitmentLink"
          type="text"
          value={formData.recruitmentLink}
          onChange={handleChange}
          required
        />
      </div>

      {/* Audience Link */}
      <div>
        <label htmlFor="audienceLink">Audience Link</label>
        <input
          id="audienceLink"
          type="text"
          value={formData.audienceLink}
          onChange={handleChange}
          required
        />
      </div>

      {/* Thumbnail Upload */}
      <div>
        <label htmlFor="thumbnail">Event Thumbnail</label>
        <input id="thumbnail" type="file" onChange={handleChange} />
        {preview && <img src={preview} alt="Preview" width={100} height={100} />}
      </div>

      {/* Submit Button */}
      <div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default FormEvent;
