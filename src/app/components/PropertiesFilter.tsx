import React, { useState } from 'react';
import { Language } from '../globals.d';

interface PropertiesFilterProps {
  lang: Language;
  areas: string[];
  onFilter: (area: string, pingRange: string, priceRange: string) => void;
}

const PropertiesFilter: React.FC<PropertiesFilterProps> = ({ lang, areas, onFilter }) => {
  const isEnglish = lang === 'en';
  
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [selectedPingRange, setSelectedPingRange] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  
  // 价格范围选项
  const priceRanges = [
    { value: "all", labelEn: "All Prices", labelZh: "全部價格" },
    { value: "0-15M", labelEn: "Under NT$15M", labelZh: "1500萬以下" },
    { value: "15M-25M", labelEn: "NT$15M - NT$25M", labelZh: "1500萬 - 2500萬" },
    { value: "25M-35M", labelEn: "NT$25M - NT$35M", labelZh: "2500萬 - 3500萬" },
    { value: "35M-50M", labelEn: "NT$35M - NT$50M", labelZh: "3500萬 - 5000萬" },
    { value: "50M-", labelEn: "Above NT$50M", labelZh: "5000萬以上" }
  ];
  
  // 坪数范围选项
  const pingRanges = [
    { value: "all", labelEn: "All Sizes", labelZh: "全部坪數" },
    { value: "0-20", labelEn: "Under 20 ping", labelZh: "20坪以下" },
    { value: "20-30", labelEn: "20 - 30 ping", labelZh: "20 - 30坪" },
    { value: "30-40", labelEn: "30 - 40 ping", labelZh: "30 - 40坪" },
    { value: "40-50", labelEn: "40 - 50 ping", labelZh: "40 - 50坪" },
    { value: "50-", labelEn: "Above 50 ping", labelZh: "50坪以上" }
  ];
  
  // Translation mapping for areas
  const getTranslatedArea = (area: string) => {
    if (!isEnglish) return area;
    
    const areaTranslations: Record<string, string> = {
      "信義區": "Xinyi District",
      "大安區": "Da'an District",
      "內湖區": "Neihu District",
      "中山區": "Zhongshan District",
      "松山區": "Songshan District",
      "文山區": "Wenshan District",
      "士林區": "Shilin District",
      "北投區": "Beitou District",
      "中正區": "Zhongzheng District",
      "萬華區": "Wanhua District",
      "大同區": "Datong District",
      "南港區": "Nangang District"
    };
    
    return areaTranslations[area] || area; // Return translation or original if not found
  };
  
  // 处理区域选择变化
  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArea(e.target.value);
    onFilter(e.target.value, selectedPingRange, selectedPriceRange);
  };
  
  // 处理坪数范围选择变化
  const handlePingRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPingRange(e.target.value);
    onFilter(selectedArea, e.target.value, selectedPriceRange);
  };
  
  // 处理价格范围选择变化
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriceRange(e.target.value);
    onFilter(selectedArea, selectedPingRange, e.target.value);
  };
  
  return (
    <div className="properties-filter">
      <div className="filter-group">
        <label>
          {isEnglish ? 'Area' : '區域'}
        </label>
        <select value={selectedArea} onChange={handleAreaChange}>
          <option value="all">
            {isEnglish ? 'All Areas' : '全部區域'}
          </option>
          {areas.map(area => (
            <option key={area} value={area}>
              {getTranslatedArea(area)}
            </option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label>
          {isEnglish ? 'Size (Ping)' : '坪數'}
        </label>
        <select value={selectedPingRange} onChange={handlePingRangeChange}>
          {pingRanges.map(range => (
            <option key={range.value} value={range.value}>
              {isEnglish ? range.labelEn : range.labelZh}
            </option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label>
          {isEnglish ? 'Price' : '價格'}
        </label>
        <select value={selectedPriceRange} onChange={handlePriceRangeChange}>
          {priceRanges.map(range => (
            <option key={range.value} value={range.value}>
              {isEnglish ? range.labelEn : range.labelZh}
            </option>
          ))}
        </select>
      </div>
      
      <button className="filter-reset-button" onClick={() => {
        setSelectedArea("all");
        setSelectedPingRange("all");
        setSelectedPriceRange("all");
        onFilter("all", "all", "all");
      }}>
        {isEnglish ? 'Reset Filters' : '重置篩選'}
      </button>
    </div>
  );
};

export default PropertiesFilter;