import React from 'react';

const ContactPage = () => {
  return (
    <div className="card bg-base-200 shadow-xl max-w-4xl mx-auto">
      <div className="card-body">
        <h1 className="card-title text-3xl" style={{ fontFamily: 'Cinzel, serif' }}>Contact Us</h1>
        <div className="divider"></div>
        <p className="py-4">Have questions, feedback, or a brilliant idea? We'd love to hear from you!</p>
        <p>While we work on a direct contact form, you can reach out to us through our social channels (coming soon!) or by carrier pigeon if you're feeling particularly adventurous.</p>
        <p>For support, please email: <a href="mailto:support@example.com" className="link link-primary">support@dndforge.example</a></p>
      </div>
    </div>
  );
};

export default ContactPage;
