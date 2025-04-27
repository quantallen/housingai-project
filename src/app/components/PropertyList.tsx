import React from 'react';
import Image from 'next/image';
import { Language, PropertyData } from '../globals.d';

// 移動 hook 到元件外面，確保它被一致性地調用
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= breakpoint);
    updateIsMobile(); // 初始檢查
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, [breakpoint]);

  return isMobile;
}

interface PropertyListProps {
  lang: Language;
  properties: PropertyData[];
  hasNoResults: boolean;
}

const PropertyList: React.FC<PropertyListProps> = ({ lang, properties, hasNoResults }) => {
  const isEnglish = lang === 'en';
  const isMobile = useIsMobile();
  
  // 獲取格式化地址
  const getFormattedAddress = (property: PropertyData) => {
    if (isEnglish && property.addressEn) {
      return property.addressEn;
    } else if (isEnglish) {
      // 如果沒有英文地址，則使用轉換方式
      const addressParts = property.address.split('市');
      if (addressParts.length > 1) {
        return `No. ${addressParts[1].replace(/[^\d]/g, '')}, ${property.area} District, Taipei City`;
      }
    }
    return property.address;
  };
  
  if (hasNoResults) {
    return (
      <div className="no-results-message">
        {isEnglish ? 'No properties match your filter criteria.' : '沒有符合您篩選條件的房源。'}
      </div>
    );
  }
  
  return (
    <div className="property-list">
      {properties.map(property => (
        <div className="property-list-item" key={property.id} id={`property-${property.id}`}>
          {!isMobile && (
            <div className="property-list-img">
              <Image 
                src={property.image} 
                alt={isEnglish ? property.titleEn : property.titleZh}
                width={300}
                height={220}
                style={{ objectFit: 'cover' }}
                priority={property.id <= 3} // 優先加載前三個
              />
            </div>
          )}
          
          <div className="property-list-content">
            <div className="property-list-header">
              <h3 className="property-list-title">
                {isEnglish ? property.titleEn : property.titleZh}
              </h3>
              <div className="property-list-price">{property.price}</div>
            </div>
            
            <div className="property-list-address">{getFormattedAddress(property)}</div>
            
            <div className="property-list-details">
              <div className="property-detail">
                <span className="property-detail-icon">📏</span>
                <span>{property.pingSize} {isEnglish ? 'ping' : '坪'}</span>
              </div>
              <div className="property-detail">
                <span className="property-detail-icon">🛏️</span>
                <span>{property.rooms} {isEnglish ? 'rooms' : '房'}</span>
              </div>
              <div className="property-detail">
                <span className="property-detail-icon">🚗</span>
                <span>{property.parking} {isEnglish ? 'parking' : '車位'}</span>
              </div>
              <div className="property-detail">
                <span className="property-detail-icon">🏢</span>
                <span>{property.floor} {isEnglish ? 'floor' : '樓'}</span>
              </div>
            </div>
            
            <div className="property-list-description">
              {isEnglish ? property.descriptionEn : property.descriptionZh}
            </div>
            
            <a href="#" className="view-property">
              {isEnglish ? 'View Details' : '查看詳情'}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;