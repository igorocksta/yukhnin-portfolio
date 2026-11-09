import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { usePrivacyModal } from '../context/PrivacyModalContext';

export default function PrivacyModal() {
  const { isPrivacyOpen, closePrivacyModal } = usePrivacyModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPrivacyOpen) {
        closePrivacyModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPrivacyOpen, closePrivacyModal]);

  useEffect(() => {
    if (isPrivacyOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPrivacyOpen]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isPrivacyOpen && (
        <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closePrivacyModal}
            className="fixed inset-0 bg-black/90"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-[#0d0d0f] border border-white/15 rounded-2xl p-4 sm:p-6 shadow-[0_24px_64px_rgba(0,0,0,0.9)] z-10 flex flex-col min-h-0 max-h-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-6 pb-4 border-b border-white/10 shrink-0">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Privacy Policy</h3>
                <p className="text-xs text-white/40 mt-1 font-light">Last updated: September 2, 2026</p>
              </div>
              <button
                onClick={closePrivacyModal}
                type="button"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#18181b] border border-white/[0.16] shadow-[0_4px_16px_rgba(0,0,0,0.6)] flex items-center justify-center text-white hover:text-white hover:bg-white/20 transition-all cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X size={16} strokeWidth={1.8} className="md:w-[18px] md:h-[18px]" />
              </button>
            </div>

            {/* Content Body */}
            <div className="mt-6 space-y-6 overflow-y-auto overscroll-contain pr-3 sm:pr-4 text-sm text-white/70 font-light leading-relaxed custom-scrollbar">
              <section>
                <p>
                  This Privacy Policy describes what data is collected on this portfolio website (the "Site"), owned by Igor Yukhnin ("I", "me"), how it is used, and how you can manage it. The Site is intended to showcase my work to potential clients and partners worldwide.
                </p>
              </section>

              <section>
                <h4 className="text-base font-medium text-white mb-2">1. What Data Is Collected</h4>
                <div className="space-y-4">
                  <div>
                    <strong className="text-white font-normal block mb-1">1.1. Contact Form Data</strong>
                    <p>The Site includes a contact form for reaching out to me about potential collaboration, which runs through the Formsubmit service. When you fill out the form, I receive the data you provide: your name, email address, and message content. This data is used solely to respond to your inquiry.</p>
                  </div>
                  <div>
                    <strong className="text-white font-normal block mb-1">1.2. Analytics (Google Analytics)</strong>
                    <p>The Site uses Google Analytics to track:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>number of visitors and page views;</li>
                      <li>traffic sources;</li>
                      <li>interactions with call-to-action (CTA) buttons on the Site.</li>
                    </ul>
                    <p className="mt-2">Google Analytics may use cookies to collect this information. Data is processed by Google in accordance with Google's Privacy Policy. You can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on, or by disabling cookies in your browser settings.</p>
                  </div>
                </div>
              </section>

              <section>
                <h4 className="text-base font-medium text-white mb-2">2. Purpose of Data Processing</h4>
                <p>The data collected is used to:</p>
                <ul className="list-disc pl-5 mt-2 mb-2 space-y-1">
                  <li>respond to inquiries about potential collaboration;</li>
                  <li>understand site traffic and CTA effectiveness;</li>
                  <li>improve the content and structure of the Site.</li>
                </ul>
                <p>I do not use your data for marketing emails and do not share it with third parties for marketing purposes.</p>
              </section>

              <section>
                <h4 className="text-base font-medium text-white mb-2">3. Third-Party Data Sharing</h4>
                <p className="mb-2">Data may be processed by the following third-party services:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-white font-normal">Google Analytics</strong> — website analytics (see Section 1.2);</li>
                  <li><strong className="text-white font-normal">Formsubmit</strong> — the service that handles the contact form; messages submitted through the form are transmitted to and temporarily stored on Formsubmit's servers before being delivered to my email. See Formsubmit's Privacy Policy for details;</li>
                  <li><strong className="text-white font-normal">Vercel</strong> — the hosting provider for this Site; processes basic technical data (IP address, browser type) when pages are loaded. See Vercel's Privacy Policy for details.</li>
                </ul>
                <p className="mt-2">These services process data according to their own privacy policies.</p>
              </section>

              <section>
                <h4 className="text-base font-medium text-white mb-2">4. International Data Transfers</h4>
                <p>
                  Since the Site's audience is worldwide, your data may be processed and stored on servers outside your country of residence, including within Google's, Formsubmit's, and Vercel's infrastructure.
                </p>
              </section>

              <section>
                <h4 className="text-base font-medium text-white mb-2">5. Data Retention</h4>
                <p>
                  Messages submitted through the contact form are retained for as long as necessary to respond to your inquiry and maintain business correspondence, or until you request deletion. Google Analytics data is retained according to Google Analytics' data retention settings (14 months by default, unless changed).
                </p>
              </section>

              <section>
                <h4 className="text-base font-medium text-white mb-2">6. Your Rights</h4>
                <p>Regardless of your country of residence, you have the right to:</p>
                <ul className="list-disc pl-5 mt-2 mb-2 space-y-1">
                  <li>request information about what data is held about you;</li>
                  <li>request correction or deletion of your data;</li>
                  <li>withdraw consent to processing at any time, including opting out of Google Analytics (see Section 1.2).</li>
                </ul>
                <p>To do so, please email <a href="mailto:igorocksta@gmail.com" className="text-white hover:text-[#ff6900] transition-colors underline">igorocksta@gmail.com</a>.</p>
              </section>

              <section>
                <h4 className="text-base font-medium text-white mb-2">7. Security</h4>
                <p>
                  I take reasonable measures to protect data transmitted through the Site, though no method of transmission over the internet can be guaranteed to be completely secure.
                </p>
              </section>

              <section>
                <h4 className="text-base font-medium text-white mb-2">8. Changes to This Policy</h4>
                <p>
                  This policy may be updated as the Site's functionality changes. The current version is always available on this page, along with the date of the last update.
                </p>
              </section>

              <section>
                <h4 className="text-base font-medium text-white mb-2">9. Contact</h4>
                <p>
                  For any questions about data processing, please email: <a href="mailto:igorocksta@gmail.com" className="text-white hover:text-[#ff6900] transition-colors underline">igorocksta@gmail.com</a>
                </p>
              </section>
            </div>

            {/* Footer button */}
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end shrink-0">
              <button
                onClick={closePrivacyModal}
                type="button"
                className="px-6 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
