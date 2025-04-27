import React from 'react';
import Image from 'next/image'; // Add Image import
import { Language, PropertyData } from '../globals.d';

// Move hook outside the component to ensure it's called consistently
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= breakpoint);
    updateIsMobile(); // Initial check
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, [breakpoint]);

  return isMobile;
}

interface PropertyCardProps {
  property: PropertyData;
  lang: Language;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, lang }) => {
  // Ensure hook is called at the top of the component render
  const isMobile = useIsMobile();

  // Prevent undefined property errors
  if (!property) {
    return <div className="property-card-loading">Loading...</div>;
  }

  const isEnglish = lang === 'en';
  
  return (
    <div className="property-list-item" id={`property-${property.id || 'unknown'}`}>
      {!isMobile && (
        <div className="property-list-img">
          <Image 
            src={property.image} 
            alt={isEnglish ? property.titleEn : property.titleZh}
            width={300}
            height={220}
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      
      <div className="property-list-content">
        <div className="property-list-header">
          <h3 className="property-list-title">
            <span className="en">{property.titleEn}</span>
            <span className="zh">{property.titleZh}</span>
          </h3>
          <div className="property-list-price">{property.price}</div>
        </div>
        
        <div className="property-list-address">{property.address}</div>
        
        <div className="property-list-details">
          <div className="property-detail">
            <span className="property-detail-icon">📏</span>
            <span>{property.pingSize}坪</span>
          </div>
          <div className="property-detail">
            <span className="property-detail-icon">🛏️</span>
            <span>{property.rooms}房</span>
          </div>
          <div className="property-detail">
            <span className="property-detail-icon">🚗</span>
            <span>{property.parking}車位</span>
          </div>
          <div className="property-detail">
            <span className="property-detail-icon">🏢</span>
            <span>{property.floor}樓</span>
          </div>
        </div>
        
        <div className="property-list-description">
          <p className="en">{isEnglish ? property.descriptionEn : ''}</p>
          <p className="zh">{!isEnglish ? property.descriptionZh : ''}</p>
        </div>
        
        <a href="#" className="view-property">
          <span className="en">View Details</span>
          <span className="zh">查看詳情</span>
        </a>
      </div>
    </div>
  );
};

export default PropertyCard;