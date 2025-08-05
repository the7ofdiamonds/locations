import React from 'react';

import styles from './Locations.module.scss';

export const Locations: React.FC = () => {
  const iframeStyle = {
    border: '0',
  };

  return (
    <>
      <h2 className="title">Locations</h2>

      <div className={`${styles['map-card']} ${styles.card}}`}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.0490263522256!2d-83.00310162413575!3d39.96265657151629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88388f31a5f7886b%3A0xd48091e7abed9fae!2s10%20N%20High%20St%2C%20Columbus%2C%20OH%2043215!5e0!3m2!1sen!2sus!4v1697930773274!5m2!1sen!2sus"
          width="100%"
          height="500"
          style={iframeStyle}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </>
  );
}