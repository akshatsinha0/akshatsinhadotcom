import React, { useState } from 'react';
import './ContactModal.css';
interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    professionalTitle: '',
    organization: '',
    linkedinProfile: '',
    // Project Intent
    projectType: '',
    collaborationType: '',
    budget: '',
    timeline: '',
    // Communication
    primaryMessage: '',
    specificQuestions: '',
    preferredMeeting: '',
    communicationStyle: '',
    // Additional Information
    hearAboutMe: '',
    expectations: '',
    additionalComments: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const steps = [
    {
      id: 1,
      title: "Professional Credentials",
      subtitle: "Let's establish your distinguished identity",
      icon: ""
    },
    {
      id: 2,
      title: "Collaboration Intentions",
      subtitle: "Define the scope of our potential partnership",
      icon: ""
    },
    {
      id: 3,
      title: "Communication Dynamics",
      subtitle: "Share your thoughts and inquiries",
      icon: "💬"
    },
    {
      id: 4,
      title: "Finalization & Submission",
      subtitle: "Review and transmit your distinguished request",
      icon: "✨"
    }
  ];
  const validateStep = (step: number): boolean => {
    const newErrors: {[key: string]: string} = {};
    switch(step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = "Your distinguished name is requisite";
        if (!formData.emailAddress.trim()) newErrors.emailAddress = "Electronic correspondence address required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) newErrors.emailAddress = "Please provide a valid electronic mail format";
        if (!formData.professionalTitle.trim()) newErrors.professionalTitle = "Your professional designation is essential";
        break;
      case 2:
        if (!formData.projectType) newErrors.projectType = "Please specify your collaboration intentions";
        if (!formData.timeline) newErrors.timeline = "Project timeline specification required";
        break;
      case 3:
        if (!formData.primaryMessage.trim()) newErrors.primaryMessage = "Your primary discourse is mandatory";
        if (formData.primaryMessage.length < 20) newErrors.primaryMessage = "Please elaborate your message comprehensively";
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };
  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setCurrentStep(4);
    setTimeout(() => {
      onClose();
      setCurrentStep(1);
      setFormData({
        fullName: '', emailAddress: '', phoneNumber: '', professionalTitle: '',
        organization: '', linkedinProfile: '', projectType: '', collaborationType: '',
        budget: '', timeline: '', primaryMessage: '', specificQuestions: '',
        preferredMeeting: '', communicationStyle: '', hearAboutMe: '',
        expectations: '', additionalComments: ''
      });
    }, 3000);
  };
  if (!isOpen) return null;
  return (
    <>
      <div className="contact-modal-backdrop" onClick={onClose} />
      <div className="contact-modal-container">
        <div className="modal-header">
          <div className="modal-title-section">
            <h2>Initiate Professional Discourse</h2>
            <p>Establish a distinguished connection with Akshat Sinha</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="progress-indicator">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`progress-step ${currentStep >= step.id ? 'active' : ''} ${currentStep === step.id ? 'current' : ''}`}
            >
              <span className="step-icon">{step.icon}</span>
              <span className="step-number">{step.id}</span>
            </div>
          ))}
        </div>
        <div className="modal-body">
          <div className="step-header">
            <h3>{steps[currentStep - 1]?.title}</h3>
            <p>{steps[currentStep - 1]?.subtitle}</p>
          </div>
          {}
          {currentStep === 1 && (
            <div className="form-step">
              <div className="form-grid">
                <div className="form-group">
                  <label>Distinguished Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Your complete nomenclature"
                    className={errors.fullName ? 'error' : ''}
                  />
                  {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>
                <div className="form-group">
                  <label>Electronic Correspondence *</label>
                  <input
                    type="email"
                    value={formData.emailAddress}
                    onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                    placeholder="your.email@domain.com"
                    className={errors.emailAddress ? 'error' : ''}
                  />
                  {errors.emailAddress && <span className="error-text">{errors.emailAddress}</span>}
                </div>
                <div className="form-group">
                  <label>Telephonic Contact</label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="+XX XXXXX XXXXX"
                  />
                </div>
                <div className="form-group">
                  <label>Professional Designation *</label>
                  <input
                    type="text"
                    value={formData.professionalTitle}
                    onChange={(e) => handleInputChange('professionalTitle', e.target.value)}
                    placeholder="Your current professional role"
                    className={errors.professionalTitle ? 'error' : ''}
                  />
                  {errors.professionalTitle && <span className="error-text">{errors.professionalTitle}</span>}
                </div>
                <div className="form-group">
                  <label>Organizational Affiliation</label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => handleInputChange('organization', e.target.value)}
                    placeholder="Company, Institution, or Organization"
                  />
                </div>
                <div className="form-group">
                  <label>LinkedIn Professional Profile</label>
                  <input
                    type="url"
                    value={formData.linkedinProfile}
                    onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>
            </div>
          )}
          {}
          {currentStep === 2 && (
            <div className="form-step">
              <div className="form-grid">
                <div className="form-group">
                  <label>Collaboration Category *</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => handleInputChange('projectType', e.target.value)}
                    className={errors.projectType ? 'error' : ''}
                  >
                    <option value="">Select your project paradigm</option>
                    <option value="web-development">Web Development & Engineering</option>
                    <option value="mobile-application">Mobile Application Architecture</option>
                    <option value="ai-ml-consulting">AI/ML Consultation & Implementation</option>
                    <option value="software-architecture">Software Architecture Design</option>
                    <option value="technical-mentoring">Technical Mentoring & Guidance</option>
                    <option value="research-collaboration">Research & Development Partnership</option>
                    <option value="startup-consultation">Startup Technical Consultation</option>
                    <option value="other">Alternative Collaboration Model</option>
                  </select>
                  {errors.projectType && <span className="error-text">{errors.projectType}</span>}
                </div>
                <div className="form-group">
                  <label>Engagement Methodology</label>
                  <select
                    value={formData.collaborationType}
                    onChange={(e) => handleInputChange('collaborationType', e.target.value)}
                  >
                    <option value="">Select collaboration structure</option>
                    <option value="full-time">Full-time Partnership</option>
                    <option value="part-time">Part-time Collaboration</option>
                    <option value="project-based">Project-specific Engagement</option>
                    <option value="consulting">Strategic Consultation</option>
                    <option value="freelance">Freelance Assignment</option>
                    <option value="long-term">Long-term Strategic Alliance</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Investment Parameters</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                  >
                    <option value="">Select budget range</option>
                    <option value="startup">Startup/Academic (&lt; $5K)</option>
                    <option value="small">Small Scale ($5K - $25K)</option>
                    <option value="medium">Medium Scale ($25K - $100K)</option>
                    <option value="enterprise">Enterprise Level ($100K+)</option>
                    <option value="equity">Equity-based Partnership</option>
                    <option value="discuss">Open for Discussion</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Project Timeline *</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className={errors.timeline ? 'error' : ''}
                  >
                    <option value="">Select expected duration</option>
                    <option value="immediate">Immediate (Within 2 weeks)</option>
                    <option value="short">Short-term (1-3 months)</option>
                    <option value="medium">Medium-term (3-6 months)</option>
                    <option value="long">Long-term (6+ months)</option>
                    <option value="ongoing">Ongoing Partnership</option>
                  </select>
                  {errors.timeline && <span className="error-text">{errors.timeline}</span>}
                </div>
              </div>
            </div>
          )}
          {}
          {currentStep === 3 && (
            <div className="form-step">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Primary Discourse *</label>
                  <textarea
                    value={formData.primaryMessage}
                    onChange={(e) => handleInputChange('primaryMessage', e.target.value)}
                    placeholder="Articulate your vision, requirements, and expectations in comprehensive detail..."
                    rows={6}
                    className={errors.primaryMessage ? 'error' : ''}
                  />
                  {errors.primaryMessage && <span className="error-text">{errors.primaryMessage}</span>}
                  <span className="character-count">{formData.primaryMessage.length}/500 characters</span>
                </div>
                <div className="form-group full-width">
                  <label>Specific Technical Inquiries</label>
                  <textarea
                    value={formData.specificQuestions}
                    onChange={(e) => handleInputChange('specificQuestions', e.target.value)}
                    placeholder="Pose any technical questions, clarifications, or specific concerns..."
                    rows={4}
                  />
                </div>
                <div className="form-group">
                  <label>Preferred Meeting Format</label>
                  <select
                    value={formData.preferredMeeting}
                    onChange={(e) => handleInputChange('preferredMeeting', e.target.value)}
                  >
                    <option value="">Select communication preference</option>
                    <option value="video-call">Video Conference (Zoom/Meet)</option>
                    <option value="phone-call">Telephonic Discussion</option>
                    <option value="in-person">Face-to-face Meeting</option>
                    <option value="email-first">Email Correspondence Initially</option>
                    <option value="messaging">Instant Messaging Platform</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Communication Style</label>
                  <select
                    value={formData.communicationStyle}
                    onChange={(e) => handleInputChange('communicationStyle', e.target.value)}
                  >
                    <option value="">Select your preference</option>
                    <option value="formal">Formal & Structured</option>
                    <option value="casual">Casual & Friendly</option>
                    <option value="technical">Technical & Direct</option>
                    <option value="collaborative">Collaborative & Interactive</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          {}
          {currentStep === 4 && (
            <div className="form-step success-step">
              <div className="success-animation">
                <div className="checkmark">✓</div>
              </div>
              <h3>Distinguished Request Transmitted Successfully!</h3>
              <p>Your comprehensive inquiry has been received and will be reviewed with utmost priority.</p>
              <div className="success-details">
                <p><strong>Anticipated Response Time:</strong> Within 24-48 hours</p>
                <p><strong>Next Steps:</strong> Akshat will personally review your request and respond accordingly</p>
                <p><strong>Alternative Contact:</strong> akshatsinhasramhardy@gmail.com</p>
              </div>
            </div>
          )}
        </div>
        {currentStep < 4 && (
          <div className="modal-footer">
            <button
              className="btn-secondary"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </button>
            {currentStep < 3 ? (
              <button className="btn-primary" onClick={handleNext}>
                Continue Forward
              </button>
            ) : (
              <button
                className="btn-primary submit-btn"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Transmitting...' : 'Submit Request'}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default ContactModal;