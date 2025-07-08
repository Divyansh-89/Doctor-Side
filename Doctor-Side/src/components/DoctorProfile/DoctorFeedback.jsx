import React, { useState } from "react";
import patientFeedbackData from "../../data/patientFeedbackData";
import peerCommendationsData from "../../data/peerCommendationsData";

export default function DoctorFeedback() {
  const [patientFeedback, setPatientFeedback] = useState(patientFeedbackData);
  const [peerCommendations] = useState(peerCommendationsData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [message, setMessage] = useState("");

  const displayMessage = (msg, type = "success") => {
    setMessage({ text: msg, type: type });
    setTimeout(() => setMessage(""), 3000);
  };

  const handleRespondClick = (feedbackId) => {
    setSelectedFeedbackId(feedbackId);
    const feedback = patientFeedback.find((f) => f.id === feedbackId);
    if (feedback && feedback.response) {
      setResponseMessage(feedback.response);
    } else {
      setResponseMessage("");
    }
    setIsModalOpen(true);
  };

  const handleResponseSubmit = (e) => {
    e.preventDefault();
    if (!responseMessage.trim()) {
      displayMessage("Response cannot be empty.", "error");
      return;
    }
    setPatientFeedback((prevFeedback) =>
      prevFeedback.map((feedback) =>
        feedback.id === selectedFeedbackId
          ? { ...feedback, response: responseMessage.trim() }
          : feedback
      )
    );
    displayMessage("Response submitted successfully!");
    setIsModalOpen(false);
    setResponseMessage("");
    setSelectedFeedbackId(null);
  };

  const handleFlagClick = (feedbackId) => {
    setPatientFeedback((prevFeedback) =>
      prevFeedback.map((feedback) => {
        if (feedback.id === feedbackId) {
          const newFlaggedStatus = !feedback.flagged;
          const action = newFlaggedStatus ? "flagged" : "unflagged";
          console.log(`Feedback ID ${feedbackId} ${action} for review.`);
          displayMessage(`Comment ${action} successfully.`, newFlaggedStatus ? "warning" : "success");
          return { ...feedback, flagged: newFlaggedStatus };
        }
        return feedback;
      })
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className="star"
          style={{ color: i <= rating ? "#FFD700" : "#ccc" }}
        >
          &#9733;
        </span>
      );
    }
    return <div className="star-rating">{stars}</div>;
  };

  return (
    <section className="doctor-feedback">
      <h2>Patient & Peer Feedback</h2>
      <div className="feedback-section patient-feedback-section">
        <h3>Patient Feedback ({patientFeedback.length})</h3>
        {patientFeedback.length > 0 ? (
          <ul>
            {patientFeedback.map((feedback) => (
              <li key={feedback.id} className={`feedback-item ${feedback.flagged ? "flagged" : ""}`}>
                <div className="feedback-header">
                  <strong>{feedback.patientName}</strong>
                  {renderStars(feedback.rating)}
                  <span className="feedback-date">{feedback.date}</span>
                </div>
                <p className="feedback-comment">"{feedback.comment}"</p>
                {feedback.response && (
                  <p className="doctor-response">
                    **Your Response:** {feedback.response}
                  </p>
                )}
                <div className="feedback-actions">
                  <button
                    className="respond-button"
                    onClick={() => handleRespondClick(feedback.id)}
                  >
                    {feedback.response ? "Edit Response" : "Respond"}
                  </button>
                  <button
                    className={`flag-button ${feedback.flagged ? "unflag-button" : ""}`}
                    onClick={() => handleFlagClick(feedback.id)}
                  >
                    {feedback.flagged ? "Unflag" : "Flag"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No patient feedback yet.</p>
        )}
      </div>
      <div className="feedback-section peer-commendations-section">
        <h3>Peer & Management Commendations ({peerCommendations.length})</h3>
        {peerCommendations.length > 0 ? (
          <ul>
            {peerCommendations.map((commendation) => (
              <li key={commendation.id} className="commendation-item">
                <div className="commendation-header">
                  <strong>From: {commendation.from}</strong>
                  <span className="commendation-date">{commendation.date}</span>
                </div>
                <p className="commendation-comment">"{commendation.comment}"</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No peer commendations yet.</p>
        )}
      </div>
      {message && (
        <div className={`message ${message.type === "error" ? "error-message" : (message.type === "warning" ? "warning-message" : "")}`}>
          {message.text}
        </div>
      )}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <h3>Respond to Feedback</h3>
            <form onSubmit={handleResponseSubmit}>
              <label>
                Your Response:
                <textarea
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                  placeholder="Type your response here..."
                  rows="5"
                ></textarea>
              </label>
              <div className="form-actions">
                <button type="submit" className="submit-button">
                  Submit Response
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
