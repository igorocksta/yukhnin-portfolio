/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */


import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Journal from './pages/Journal';
import JournalArticle from './pages/JournalArticle';
import CaseStudy from './pages/CaseStudy';
import UIKit from './pages/UIKit';
import Typography from './pages/Typography';
import SplashPreview from './pages/SplashPreview';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollPersistence from './components/ScrollPersistence';
import { CvModalProvider } from './context/CvModalContext';
import { ScheduleModalProvider } from './context/ScheduleModalContext';
import { PageTransitionProvider } from './context/PageTransitionContext';
import { PrivacyModalProvider } from './context/PrivacyModalContext';
import { SplashProvider } from './context/SplashContext';
import { JournalLanguageProvider } from './context/JournalLanguageContext';
import CvPasswordModal from './components/CvPasswordModal';
import ScheduleModal from './components/ScheduleModal';
import PrivacyModal from './components/PrivacyModal';
import CookieBanner from './components/CookieBanner';
import SplashScreen from './components/SplashScreen';
import PerformanceMonitoring from './components/PerformanceMonitoring';

// Lazy-load the 404 page route
const Interactive3D = lazy(() => import('./pages/Interactive3D'));

function AppContent() {
  const location = useLocation();
  const isSplashPage = location.pathname === '/splash' || location.pathname === '/animation' || location.pathname === '/blueprint';

  return (
    <>
      {!isSplashPage && <SplashScreen />}
      <ScrollPersistence />
      <CustomCursor />
      <div className="min-h-screen bg-[#080808] overflow-x-hidden relative">
        {/* Blueprint Grid Background */}
        {!isSplashPage && (
          <div 
            className="fixed inset-0 z-0 pointer-events-none opacity-[0.14]" 
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='124' height='124' viewBox='0 0 124 124' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M62 59v6M59 62h6' stroke='%23ffffff' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
              backgroundSize: '124px 124px'
            }} 
          />
        )}
        
        <div className="relative z-10">
          {!isSplashPage && <Navbar />}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/journal/:slug" element={<JournalArticle />} />
              <Route path="/case-study/:id" element={<CaseStudy />} />
              <Route path="/work/:id" element={<CaseStudy />} />
              <Route path="/ui-kit" element={<UIKit />} />
              <Route path="/typography" element={<Typography />} />
              <Route path="/design-system/typography" element={<Typography />} />
              <Route path="/splash" element={<SplashPreview />} />
              <Route path="/animation" element={<SplashPreview />} />
              <Route path="/blueprint" element={<SplashPreview />} />
              <Route
                path="/404"
                element={
                  <Suspense fallback={null}>
                    <Interactive3D />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={null}>
                    <Interactive3D />
                  </Suspense>
                }
              />
            </Routes>
          </main>
          {!isSplashPage && <Footer />}
        </div>

        {/* CV Protected Document Access Modal */}
        <CvPasswordModal />

        {/* Interactive Google Calendar Booking Modal */}
        <ScheduleModal />

        {/* Privacy Policy Modal */}
        <PrivacyModal />
        
        {/* Cookie Consent Banner */}
        <CookieBanner />

        {/* Real-world Performance & Web Analytics Monitoring */}
        <PerformanceMonitoring />
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router useTransitions={false}>
      <PageTransitionProvider>
        <SplashProvider>
          <CvModalProvider>
            <ScheduleModalProvider>
              <PrivacyModalProvider>
                <JournalLanguageProvider>
                  <AppContent />
                </JournalLanguageProvider>
              </PrivacyModalProvider>
            </ScheduleModalProvider>
          </CvModalProvider>
        </SplashProvider>
      </PageTransitionProvider>
    </Router>
  );
}

