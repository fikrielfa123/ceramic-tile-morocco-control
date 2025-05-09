
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'ar' | 'es';

interface TranslationParams {
  [key: string]: string | number;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: TranslationParams) => string;
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
    
    // Analytics
    passingRate: 'Passing Rate',
    failureRate: 'Failure Rate',
    unknown: 'Unknown',
    analyticsDescription: 'Quality metrics and production performance analytics',
    qualityTrends: 'Quality Trends',
    overTimeAnalysis: 'Analysis over time',
    defectDistribution: 'Defect Distribution',
    byTypeAnalysis: 'Analysis by defect type',
    productionPerformance: 'Production Performance',
    batchComparisonAnalysis: 'Batch comparison analysis',
    detailedAnalytics: 'Detailed Analytics',
    detailedAnalyticsDescription: 'In-depth analysis of quality and production metrics',
    qualityMetrics: 'Quality Metrics',
    productionMetrics: 'Production Metrics',
    complianceMetrics: 'Compliance Metrics',
    week: 'Week',
    month: 'Month',
    quarter: 'Quarter',
    year: 'Year',
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
    
    // Analytics
    passingRate: 'Taux de réussite',
    failureRate: 'Taux d\'échec',
    unknown: 'Inconnu',
    analyticsDescription: 'Métriques de qualité et analyse de la performance de production',
    qualityTrends: 'Tendances de qualité',
    overTimeAnalysis: 'Analyse dans le temps',
    defectDistribution: 'Distribution des défauts',
    byTypeAnalysis: 'Analyse par type de défaut',
    productionPerformance: 'Performance de production',
    batchComparisonAnalysis: 'Analyse comparative des lots',
    detailedAnalytics: 'Analyses détaillées',
    detailedAnalyticsDescription: 'Analyse approfondie des métriques de qualité et de production',
    qualityMetrics: 'Métriques de qualité',
    productionMetrics: 'Métriques de production',
    complianceMetrics: 'Métriques de conformité',
    week: 'Semaine',
    month: 'Mois',
    quarter: 'Trimestre',
    year: 'Année',
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
    
    // Analytics
    passingRate: 'معدل النجاح',
    failureRate: 'معدل الفشل',
    unknown: 'غير معروف',
    analyticsDescription: 'مقاييس الجودة وتحليل أداء الإنتاج',
    qualityTrends: 'اتجاهات الجودة',
    overTimeAnalysis: 'التحليل عبر الزمن',
    defectDistribution: 'توزيع العيوب',
    byTypeAnalysis: 'تحليل حسب نوع العيب',
    productionPerformance: 'أداء الإنتاج',
    batchComparisonAnalysis: 'تحليل مقارنة الدفعات',
    detailedAnalytics: 'تحليلات مفصلة',
    detailedAnalyticsDescription: 'تحليل متعمق لمقاييس الجودة والإنتاج',
    qualityMetrics: 'مقاييس الجودة',
    productionMetrics: 'مقاييس الإنتاج',
    complianceMetrics: 'مقاييس الامتثال',
    week: 'أسبوع',
    month: 'شهر',
    quarter: 'ربع سنة',
    year: 'سنة',
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
    
    // Analytics
    passingRate: 'Tasa de aprobación',
    failureRate: 'Tasa de fallo',
    unknown: 'Desconocido',
    analyticsDescription: 'Métricas de calidad y análisis de rendimiento de producción',
    qualityTrends: 'Tendencias de calidad',
    overTimeAnalysis: 'Análisis a lo largo del tiempo',
    defectDistribution: 'Distribución de defectos',
    byTypeAnalysis: 'Análisis por tipo de defecto',
    productionPerformance: 'Rendimiento de producción',
    batchComparisonAnalysis: 'Análisis comparativo de lotes',
    detailedAnalytics: 'Análisis detallado',
    detailedAnalyticsDescription: 'Análisis en profundidad de métricas de calidad y producción',
    qualityMetrics: 'Métricas de calidad',
    productionMetrics: 'Métricas de producción',
    complianceMetrics: 'Métricas de cumplimiento',
    week: 'Semana',
    month: 'Mes',
    quarter: 'Trimestre',
    year: 'Año',
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

  const t = (key: string, params?: TranslationParams): string => {
    // @ts-ignore
    let text = translations[language][key] || key;
    
    // Replace parameters in the text if they exist
    if (params) {
      Object.keys(params).forEach(paramKey => {
        text = text.replace(`{${paramKey}}`, String(params[paramKey]));
      });
    }
    
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
