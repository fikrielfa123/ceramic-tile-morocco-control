
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'ar' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Common
    appName: 'CeramControl',
    dashboard: 'Dashboard',
    batches: 'Production Batches',
    qualityControl: 'Quality Control',
    reports: 'Reports',
    analytics: 'Analytics',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Logout',
    
    // Quality Control
    qualityControlTitle: 'Quality Control',
    qualityControlDesc: 'Record quality measurements and document visual defects',
    physicalMeasurements: 'Physical Measurements',
    visualDefects: 'Visual Defects',
    recordQualityMeasurement: 'Record Quality Measurement',
    batch: 'Batch',
    selectBatch: 'Select a batch',
    parameter: 'Parameter',
    selectParameter: 'Select a quality parameter',
    measurementValue: 'Measurement Value',
    isoStandard: 'ISO Standard',
    reset: 'Reset',
    recordMeasurement: 'Record Measurement',
    recording: 'Recording...',
  },
  fr: {
    // Common
    appName: 'CeramControl',
    dashboard: 'Tableau de bord',
    batches: 'Lots de production',
    qualityControl: 'Contrôle qualité',
    reports: 'Rapports',
    analytics: 'Analyses',
    settings: 'Paramètres',
    profile: 'Profil',
    logout: 'Déconnexion',
    
    // Quality Control
    qualityControlTitle: 'Contrôle qualité',
    qualityControlDesc: 'Enregistrer les mesures de qualité et documenter les défauts visuels',
    physicalMeasurements: 'Mesures physiques',
    visualDefects: 'Défauts visuels',
    recordQualityMeasurement: 'Enregistrer une mesure de qualité',
    batch: 'Lot',
    selectBatch: 'Sélectionner un lot',
    parameter: 'Paramètre',
    selectParameter: 'Sélectionner un paramètre de qualité',
    measurementValue: 'Valeur de mesure',
    isoStandard: 'Norme ISO',
    reset: 'Réinitialiser',
    recordMeasurement: 'Enregistrer la mesure',
    recording: 'Enregistrement...',
  },
  ar: {
    // Common
    appName: 'سيرامكونترول',
    dashboard: 'لوحة التحكم',
    batches: 'دفعات الإنتاج',
    qualityControl: 'مراقبة الجودة',
    reports: 'التقارير',
    analytics: 'التحليلات',
    settings: 'الإعدادات',
    profile: 'الملف الشخصي',
    logout: 'تسجيل الخروج',
    
    // Quality Control
    qualityControlTitle: 'مراقبة الجودة',
    qualityControlDesc: 'تسجيل قياسات الجودة وتوثيق العيوب المرئية',
    physicalMeasurements: 'القياسات الفيزيائية',
    visualDefects: 'العيوب المرئية',
    recordQualityMeasurement: 'تسجيل قياس الجودة',
    batch: 'دفعة',
    selectBatch: 'اختر دفعة',
    parameter: 'معيار',
    selectParameter: 'اختر معيار الجودة',
    measurementValue: 'قيمة القياس',
    isoStandard: 'معيار الأيزو',
    reset: 'إعادة تعيين',
    recordMeasurement: 'تسجيل القياس',
    recording: 'جاري التسجيل...',
  },
  es: {
    // Common
    appName: 'CeramControl',
    dashboard: 'Tablero',
    batches: 'Lotes de producción',
    qualityControl: 'Control de calidad',
    reports: 'Informes',
    analytics: 'Análisis',
    settings: 'Configuración',
    profile: 'Perfil',
    logout: 'Cerrar sesión',
    
    // Quality Control
    qualityControlTitle: 'Control de calidad',
    qualityControlDesc: 'Registrar medidas de calidad y documentar defectos visuales',
    physicalMeasurements: 'Medidas físicas',
    visualDefects: 'Defectos visuales',
    recordQualityMeasurement: 'Registrar medida de calidad',
    batch: 'Lote',
    selectBatch: 'Seleccionar un lote',
    parameter: 'Parámetro',
    selectParameter: 'Seleccionar un parámetro de calidad',
    measurementValue: 'Valor de medida',
    isoStandard: 'Estándar ISO',
    reset: 'Restablecer',
    recordMeasurement: 'Registrar medida',
    recording: 'Registrando...',
  }
};

const defaultLanguageContext: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
};

const LanguageContext = createContext<LanguageContextType>(defaultLanguageContext);

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    // @ts-ignore
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
