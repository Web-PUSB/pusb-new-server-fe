import React, { useState, useEffect } from 'react';

const FormEvent = ({ isEditMode, id }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [audience, setAudience] = useState('');
  const [period, setPeriod] = useState('');
  const [ministry, setMinistry] = useState('1');
  const [participantLink, setParticipantLink] = useState('');
  const [recruitmentLink, setRecruitmentLink] = useState('');
  const [audienceLink, setAudienceLink] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEventData = async () => {
      if (isEditMode && id) {
        try {
          const response = await fetch(`/api/pusb-events/${id}`);
          const data = await response.json();
          setName(data.name);
          setDescription(data.description);
          setStartDate(data.start_date ? data.start_date.slice(0, 10) : '');
          setEndDate(data.end_date ? data.end_date.slice(0, 10) : '');
          setStatus(data.status);
          setAudience(data.audience);
          setPeriod(data.period);
          setMinistry('1');
          setParticipantLink(data.participant_link);
          setRecruitmentLink(data.recruitment_link);
          setAudienceLink(data.audience_link);
          if (data.thumbnail) {
            setPreview(data.thumbnail);
          }
        } catch (error) {
          alert('Failed to load event data.');
          console.error(error);
        }
      }
    };

    fetchEventData();
  }, [isEditMode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (startDate && endDate && startDate > endDate) {
      alert('End date must be after the start date');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('ministry_id', ministry);
    formData.append('description', description);
    formData.append('start_date', startDate);
    formData.append('end_date', endDate);
    formData.append('status', status);
    formData.append('audience', audience);
    formData.append('period', period);
    formData.append('participant_link', participantLink);
    formData.append('recruitment_link', recruitmentLink);
    formData.append('audience_link', audienceLink);
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    try {
      const url = isEditMode ? `/api/pusb-events/${id}` : '/api/pusb-events';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        alert(isEditMode ? 'Event updated successfully!' : 'Event created successfully!');
        window.location.href = isEditMode ? `/admin/pusb-events/${id}/details` : '/admin/pusb-events';
      } else {
        alert('Failed to save event data.');
      }
    } catch (error) {
      alert('An error occurred while saving data.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Event Description */}
      <div>
        <label htmlFor="description">Event Description</label>
        <textarea
          id="description"
          placeholder="Enter event description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Start Date & End Date */}
      <div>
        <label htmlFor="start_date">Start Date</label>
        <input
          id="start_date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="end_date">End Date</label>
        <input
          id="end_date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status">Event Status</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="">Select Status</option>
          <option value="PRESENT">Ongoing</option>
          <option value="SOON">Upcoming</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {/* Participant Link */}
      <div>
        <label htmlFor="participant_link">Participant Link</label>
        <input
          id="participant_link"
          type="text"
          value={participantLink}
          onChange={(e) => setParticipantLink(e.target.value)}
          required
        />
      </div>

      {/* Thumbnail Upload */}
      <div>
        <label htmlFor="thumbnail">Event Thumbnail</label>
        <input id="thumbnail" type="file" onChange={handleThumbnailChange} />
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
