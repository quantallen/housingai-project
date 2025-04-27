import React, { useState, useEffect, useRef } from 'react';
import { Language, PropertyData } from '../globals.d';
import PropertiesFilter from './PropertiesFilter';
import PropertyList from './PropertyList';

// Define the props interface
interface PropertiesSectionProps {
  lang: Language;
  fadeIn: boolean;
}

const PropertiesSection: React.FC<PropertiesSectionProps> = ({ lang, fadeIn }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<PropertyData[]>([]);
  const [hasNoResults, setHasNoResults] = useState<boolean>(false);
  const [showAllProperties, setShowAllProperties] = useState<boolean>(false);
  
  // Add fade-in effect consistent with other sections
  useEffect(() => {
    if (fadeIn && sectionRef.current) {
      setTimeout(() => {
        if (sectionRef.current) {
          sectionRef.current.classList.add('visible');
        }
      }, 1000);
    }
  }, [fadeIn]);
  
  // Initial loading of property data
  useEffect(() => {
    const sampleProperties: PropertyData[] = [
      {
        id: 1,
        area: "信義區",
        price: "NT$ 35,800,000",
        size: "126",
        image: "/images/property1.webp",
        titleEn: "Luxury Apartment in Xinyi District",
        titleZh: "信義區豪華公寓",
        priceValue: "每坪 284,000",
        address: "台北市信義區松仁路100號",
        addressEn: "No. 100, Songren Road, Xinyi District, Taipei City",
        pingSize: "38",
        rooms: "3",
        parking: "1",
        floor: "18",
        descriptionEn: "Modern luxury apartment with stunning city views",
        descriptionZh: "現代豪華公寓，擁有令人驚嘆的城市景觀"
      },
      {
        id: 2,
        area: "大安區",
        price: "NT$ 28,500,000",
        size: "105",
        image: "/images/property2.webp",
        titleEn: "Cozy Home in Da'an District",
        titleZh: "大安區舒適住宅",
        priceValue: "每坪 271,000",
        address: "台北市大安區復興南路200號",
        addressEn: "No. 200, Fuxing South Road, Da'an District, Taipei City",
        pingSize: "32",
        rooms: "2",
        parking: "1",
        floor: "8",
        descriptionEn: "Quiet and comfortable living space in central Taipei",
        descriptionZh: "台北市中心安靜舒適的生活空間"
      },
      {
        id: 3,
        area: "內湖區",
        price: "NT$ 22,600,000",
        size: "98",
        image: "/images/property3.webp",
        titleEn: "Modern House in Neihu District",
        titleZh: "內湖區現代房屋",
        priceValue: "每坪 230,000",
        address: "台北市內湖區成功路300號",
        addressEn: "No. 300, Chenggong Road, Neihu District, Taipei City",
        pingSize: "30",
        rooms: "3",
        parking: "2",
        floor: "5",
        descriptionEn: "Family-friendly home with convenient transportation",
        descriptionZh: "適合家庭居住，交通便利的住宅"
      },
      {
        id: 4,
        area: "中山區",
        price: "NT$ 18,900,000",
        size: "85",
        image: "/images/property4.webp",
        titleEn: "Urban Apartment in Zhongshan",
        titleZh: "中山區都市公寓",
        priceValue: "每坪 222,000",
        address: "台北市中山區林森北路50號",
        addressEn: "No. 50, Linsen North Road, Zhongshan District, Taipei City",
        pingSize: "26",
        rooms: "2",
        parking: "1",
        floor: "12",
        descriptionEn: "Convenient urban living with easy access to shopping",
        descriptionZh: "便利的都市生活，購物交通便捷"
      },
      {
        id: 5,
        area: "松山區",
        price: "NT$ 32,500,000",
        size: "110",
        image: "/images/property5.webp",
        titleEn: "Elegant Home in Songshan",
        titleZh: "松山區典雅住宅",
        priceValue: "每坪 295,000",
        address: "台北市松山區民生東路150號",
        addressEn: "No. 150, Minsheng East Road, Songshan District, Taipei City",
        pingSize: "33",
        rooms: "3",
        parking: "2",
        floor: "15",
        descriptionEn: "Elegant living space with premium amenities",
        descriptionZh: "典雅的生活空間，配有高級設施"
      },
      {
        id: 6,
        area: "大安區",
        price: "NT$ 42,800,000",
        size: "145",
        image: "/images/property6.webp",
        titleEn: "Premium Residence in Da'an",
        titleZh: "大安區高級住宅",
        priceValue: "每坪 295,000",
        address: "台北市大安區敦化南路120號",
        addressEn: "No. 120, Dunhua South Road, Da'an District, Taipei City",
        pingSize: "44",
        rooms: "4",
        parking: "2",
        floor: "20",
        descriptionEn: "Premium residence in the heart of Taipei",
        descriptionZh: "台北市中心的頂級住宅"
      }
    ];
    
    setProperties(sampleProperties);
    
    // Initially show only first 3 properties
    setFilteredProperties(showAllProperties ? sampleProperties : sampleProperties.slice(0, 3));
  }, [showAllProperties]);
  
  // Handle filtering logic
  const handleFilter = (area: string, pingRange: string, priceRange: string) => {
    let results = [...properties];
    
    // Filter by area
    if (area && area !== "all") {
      results = results.filter(property => property.area === area);
    }
    
    // Filter by ping size
    if (pingRange && pingRange !== "all") {
      const [min, max] = pingRange.split("-").map(Number);
      results = results.filter(property => {
        const ping = parseInt(property.pingSize);
        return ping >= min && (max ? ping <= max : true);
      });
    }
    
    // Filter by price
    if (priceRange && priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(val => {
        // Handle price format, e.g., "20M" means 2000万
        if (val.endsWith("M")) {
          return parseFloat(val) * 1000000;
        }
        return parseFloat(val);
      });
      
      results = results.filter(property => {
        // Convert price string to number, e.g., "NT$ 35,800,000" => 35800000
        const price = parseInt(property.price.replace(/[^\d]/g, ""));
        return price >= min && (max ? price <= max : true);
      });
    }
    
    setFilteredProperties(results);
    setHasNoResults(results.length === 0);
  };
  
  // Get available area options
  const getAreas = () => {
    const areas = Array.from(new Set(properties.map(p => p.area)));
    return areas;
  };
  
  // Handle "View All Properties" button click
  const handleViewAllClick = () => {
    setShowAllProperties(true);
    
    // Reset filter if currently filtered
    if (filteredProperties.length !== properties.length) {
      setFilteredProperties(properties);
    }
    
    // Scroll to properties section
    const propertiesElement = document.getElementById('properties');
    if (propertiesElement) {
      propertiesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id="properties" className="fade-in-section" ref={sectionRef}>
      <h2 className="section-title">
        <span className="en">Featured Properties</span>
        <span className="zh">精選房源</span>
      </h2>
      
      <div className="properties-container">
        <PropertiesFilter 
          lang={lang} 
          areas={getAreas()} 
          onFilter={handleFilter} 
        />
        
        <PropertyList 
          lang={lang} 
          properties={filteredProperties} 
          hasNoResults={hasNoResults} 
        />
        
        {/* Show "View All" button only when not all properties are displayed */}
        {!showAllProperties && filteredProperties.length < properties.length && (
          <div className="view-all-button">
            <button onClick={handleViewAllClick}>
              <span className="en">View All Properties</span>
              <span className="zh">查看所有房源</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesSection;