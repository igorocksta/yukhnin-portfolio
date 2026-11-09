import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronDown, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Globe, 
  Video, 
  Download, 
  ExternalLink,
  Loader2,
  Pencil,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useScheduleModal } from '../context/ScheduleModalContext';
import { CONTACT_INFO } from '../data';
import { validateEmail, getDomainSuggestions } from '../utils/emailValidation';

const TIME_SLOTS = [
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
];

const TOPICS = [
  'A job opportunity',
  'A freelance or consulting project',
  'A potential collaboration',
  'A question',
  'Something else',
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

export default function ScheduleModal() {
  const { isScheduleModalOpen, closeScheduleModal } = useScheduleModal();
  
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [topic, setTopic] = useState(TOPICS[0]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeMonthArrow, setActiveMonthArrow] = useState<'prev' | 'next' | null>(null);

  // Detect user's timezone
  const userTimezone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    } catch {
      return 'UTC';
    }
  }, []);

  // Reset state when closed
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const modalOuterRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    closeScheduleModal();
    setTimeout(() => {
      setStep(1);
      setSelectedDate(null);
      setSelectedTime('');
      setName('');
      setEmail('');
      setEmailTouched(false);
      setTopic(TOPICS[0]);
      setNotes('');
      setIsSubmitting(false);
    }, 300);
  };

  // Reset scroll container position when step changes or modal opens
  useEffect(() => {
    const resetScroll = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
      if (modalOuterRef.current) {
        modalOuterRef.current.scrollTop = 0;
      }
    };

    resetScroll();
    const rafId = requestAnimationFrame(resetScroll);
    const t1 = setTimeout(resetScroll, 50);
    const t2 = setTimeout(resetScroll, 150);
    const t3 = setTimeout(resetScroll, 300);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [step, isScheduleModalOpen]);

  // Lock background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isScheduleModalOpen) {
        handleClose();
      }
    };
    if (isScheduleModalOpen) {
      const originalBodyStyle = document.body.style.overflow;
      const originalHtmlStyle = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalBodyStyle;
        document.documentElement.style.overflow = originalHtmlStyle;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isScheduleModalOpen]);

  // Confetti on step 4
  useEffect(() => {
    if (step === 4) {
      const brandColors = ['#ff6900', '#ff851a', '#155dfc', '#3b82f6', '#ffffff'];
      confetti({
        particleCount: 80,
        spread: 85,
        origin: { x: 0.5, y: 0.4 },
        colors: brandColors,
        disableForReducedMotion: true,
        zIndex: 99999,
      });
    }
  }, [step]);

  // Calendar calculations
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    // In JS Sunday is 0, convert so Monday is 0
    const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const days: (number | null)[] = [];
    for (let i = 0; i < startOffset; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    while (days.length % 7 !== 0) {
      days.push(null);
    }
    return days;
  }, [currentYear, currentMonth]);

  // Determine if a specific slot has already passed for the selected date
  const isSlotDisabled = useCallback((slot: string) => {
    if (!selectedDate) return false;
    const now = new Date();
    
    // Check if selectedDate is today
    const isToday =
      selectedDate.getFullYear() === now.getFullYear() &&
      selectedDate.getMonth() === now.getMonth() &&
      selectedDate.getDate() === now.getDate();

    if (!isToday) {
      // Check if selectedDate is entirely in the past
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      const startOfSelected = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()).getTime();
      return startOfSelected < startOfToday;
    }

    // Parse time (e.g. "10:00 AM", "01:30 PM")
    const [timeStr, modifier] = slot.split(' ');
    let [hours, minutes] = timeStr.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const slotTime = new Date(selectedDate);
    slotTime.setHours(hours, minutes, 0, 0);

    // Disable if slot time has already passed or is starting within the next 5 minutes
    return slotTime.getTime() <= now.getTime() + 5 * 60 * 1000;
  }, [selectedDate]);

  // Check if a given date has any remaining available slots
  const hasAvailableSlotsForDay = useCallback((date: Date) => {
    const now = new Date();
    const isToday =
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate();

    if (!isToday) return true;

    return TIME_SLOTS.some((slot) => {
      const [timeStr, modifier] = slot.split(' ');
      let [hours, minutes] = timeStr.split(':').map(Number);
      if (modifier === 'PM' && hours < 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;
      const slotTime = new Date(date);
      slotTime.setHours(hours, minutes, 0, 0);
      return slotTime.getTime() > now.getTime() + 5 * 60 * 1000;
    });
  }, []);

  // Deselect time if it becomes disabled
  useEffect(() => {
    if (selectedTime && isSlotDisabled(selectedTime)) {
      setSelectedTime('');
    }
  }, [selectedDate, isSlotDisabled, selectedTime]);

  const isDateDisabled = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    date.setHours(0, 0, 0, 0);
    const dayOfWeek = date.getDay();
    // Disable past days and weekends (Saturday=6, Sunday=0)
    if (date < today || dayOfWeek === 0 || dayOfWeek === 6) {
      return true;
    }
    // If it's today, but all time slots have already expired, disable today as well
    if (date.getTime() === today.getTime() && !hasAvailableSlotsForDay(date)) {
      return true;
    }
    return false;
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getFullYear() === currentYear &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getDate() === day
    );
  };

  const handlePrevMonth = () => {
    setActiveMonthArrow('prev');
    setTimeout(() => setActiveMonthArrow(null), 150);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    setActiveMonthArrow('next');
    setTimeout(() => setActiveMonthArrow(null), 150);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    if (isDateDisabled(day)) return;
    const d = new Date(currentYear, currentMonth, day);
    setSelectedDate(d);
  };

  const isValidEmail = (val: string) => validateEmail(val).isValid;

  // Format date string for Google Calendar and ICS
  const getEventDateTime = () => {
    if (!selectedDate || !selectedTime) return null;
    
    // Parse time (e.g. "02:30 PM")
    const [timeStr, modifier] = selectedTime.split(' ');
    let [hours, minutes] = timeStr.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const start = new Date(selectedDate);
    start.setHours(hours, minutes, 0, 0);

    const end = new Date(start.getTime() + 30 * 60 * 1000); // 30 mins

    return { start, end };
  };

  // Google Calendar URL Generator
  const getGoogleCalendarUrl = () => {
    const eventTime = getEventDateTime();
    if (!eventTime) return '#';

    const formatGoogleDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const datesParam = `${formatGoogleDate(eventTime.start)}/${formatGoogleDate(eventTime.end)}`;
    const title = encodeURIComponent(`Intro Call: Igor Yukhnin & ${name.trim() || 'Guest'}`);
    const details = encodeURIComponent(
      `30-minute intro call with Igor Yukhnin (Product Designer).\n\nTopic: ${topic}\nAttendee: ${name} (${email})\n${notes.trim() ? `Notes: ${notes}\n` : ''}\nMeeting Link: Google Meet (link attached upon calendar confirmation)\nContact: ${CONTACT_INFO.email}`
    );
    const location = encodeURIComponent('Google Meet');
    const addGuests = encodeURIComponent(`${CONTACT_INFO.email},${email.trim()}`);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${datesParam}&details=${details}&location=${location}&add=${addGuests}`;
  };

  // Download .ICS calendar event file
  const handleDownloadIcs = () => {
    const eventTime = getEventDateTime();
    if (!eventTime) return;

    const formatIcsDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Igor Yukhnin//Product Design Portfolio//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:meet-${Date.now()}@portfolio.igoryukhnin`,
      `DTSTAMP:${formatIcsDate(new Date())}`,
      `DTSTART:${formatIcsDate(eventTime.start)}`,
      `DTEND:${formatIcsDate(eventTime.end)}`,
      `SUMMARY:Intro Call: Igor Yukhnin & ${name.trim() || 'Guest'}`,
      `DESCRIPTION:30-minute intro call with Igor Yukhnin.\\nTopic: ${topic}\\nAttendee: ${name} (${email})\\nLocation: Google Meet`,
      'LOCATION:Google Meet',
      'STATUS:CONFIRMED',
      `ORGANIZER;CN=Igor Yukhnin:mailto:${CONTACT_INFO.email}`,
      `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=${name}:mailto:${email.trim()}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `call-igor-yukhnin-${selectedDate?.toISOString().slice(0,10)}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle final submission & dispatch confirmation email
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !isValidEmail(email) || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);

    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const payload = {
      _subject: `New Call Scheduled: ${name.trim()} (${formattedDate} at ${selectedTime})`,
      name: name.trim(),
      email: email.trim(),
      date: formattedDate,
      time: selectedTime,
      timezone: userTimezone,
      topic: topic,
      notes: notes.trim() || 'None',
      duration: '30 min',
      platform: 'Google Meet / Google Calendar',
      _replyto: email.trim(),
      _template: 'table',
      _captcha: 'false',
    };

    try {
      const sendPromise = fetch(`https://formsubmit.co/ajax/${CONTACT_INFO.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        keepalive: true,
        body: JSON.stringify(payload),
      }).catch((err) => {
        console.warn('Schedule background dispatch warning:', err);
      });

      await Promise.race([
        Promise.all([
          sendPromise,
          new Promise((resolve) => setTimeout(resolve, 700)),
        ]),
        new Promise((resolve) => setTimeout(resolve, 1200)),
      ]);
    } catch (err) {
      console.error('Error submitting call schedule:', err);
    } finally {
      setIsSubmitting(false);
      setStep(4);
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
      if (modalOuterRef.current) modalOuterRef.current.scrollTop = 0;
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isScheduleModalOpen && (
        <div 
          id="schedule-modal"
          ref={modalOuterRef}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto overscroll-contain"
          style={{ height: '100dvh' }}
        >
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/90 cursor-pointer"
          />

          {/* Modal Card Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="relative w-full max-w-2xl my-auto bg-[#080808] border border-white/[0.14] rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.95)] z-10 flex flex-col text-left overflow-hidden max-h-[calc(100dvh-32px)] sm:max-h-[calc(100dvh-48px)] md:max-h-[calc(100dvh-64px)] min-h-0"
          >
            {/* Top Close Button - Strict 24px offset from modal boundaries */}
            <button
              onClick={handleClose}
              type="button"
              id="schedule-modal-close-btn"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#18181b] border border-white/[0.16] shadow-[0_4px_16px_rgba(0,0,0,0.6)] flex items-center justify-center text-white hover:text-white hover:bg-white/20 transition-all cursor-pointer z-30"
              aria-label="Close modal"
            >
              <X size={16} strokeWidth={1.8} className="md:w-[18px] md:h-[18px]" />
            </button>

            {/* Inner Scrollable Container with 32px padding to content on desktop */}
            <div
              ref={scrollContainerRef}
              className={`w-full flex-1 min-h-0 custom-scrollbar px-4 sm:px-8 pb-0 overscroll-contain flex flex-col ${
                step === 4 
                  ? 'pt-4 sm:pt-6 md:overflow-y-hidden overflow-y-auto' 
                  : 'pt-4 sm:pt-8 overflow-y-auto'
              }`}
            >
              {/* Header Top Bar: Stepper Container with 24px gap before close button */}
              {step <= 3 && (
                <div className="flex items-center justify-between mb-6 md:mb-8 shrink-0 pr-12 md:pr-14">
                  {/* Stepper Tabs - Steps 1 to 3 */}
                  <div className="flex items-center justify-between flex-1 min-w-0">
                    {[1, 2, 3].map((stepNum, idx) => {
                      const isActive = step === stepNum;
                      const isCompleted = step > stepNum;
                      const isClickable = stepNum < step || (stepNum === 2 && selectedDate) || (stepNum === 3 && selectedDate && selectedTime);
                      
                      return (
                        <React.Fragment key={stepNum}>
                          <motion.button 
                            type="button"
                            onClick={() => {
                              if (stepNum === 1) setStep(1);
                              if (stepNum === 2 && selectedDate) setStep(2);
                              if (stepNum === 3 && selectedDate && selectedTime) setStep(3);
                            }}
                            disabled={!isClickable && !isActive}
                            animate={{
                              backgroundColor: isActive ? 'rgba(255, 255, 255, 0.08)' : isCompleted ? '#2a2a2a' : 'rgba(255, 255, 255, 0.02)',
                              borderColor: isActive ? '#f5f5f5' : isCompleted ? 'rgba(42, 42, 42, 0)' : 'rgba(255, 255, 255, 0.25)',
                              color: isActive ? '#f5f5f5' : isCompleted ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.25)',
                              boxShadow: isActive ? '0 0 16px rgba(245,245,245,0.2)' : '0 0 0px rgba(0,0,0,0)',
                            }}
                            transition={{ duration: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className={`w-8 h-8 rounded-full border-[1.5px] flex items-center justify-center text-xs sm:text-sm font-medium select-none shrink-0 ${isClickable ? 'cursor-pointer hover:border-white/60' : 'cursor-default'}`}
                          >
                            {stepNum}
                          </motion.button>
                          {idx < 2 && (
                            <div className="flex-1 mx-3 sm:mx-4 h-[1px] bg-white/10 relative overflow-hidden">
                              <motion.div 
                                initial={false}
                                animate={{ scaleX: isCompleted ? 1 : 0 }}
                                style={{ transformOrigin: 'left' }}
                                transition={{ duration: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 bg-white/45"
                              />
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              )}

            {/* Step Content */}
            <div className="relative flex-1 min-h-0 flex flex-col">
              <AnimatePresence mode="wait" initial={false}>
                {/* Step 1: Date (Calendar Picker) */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col w-full min-h-0"
                  >
                <div className="mb-6 md:mb-8 shrink-0">
                  <div className="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-[#ff6900] block mb-2 font-sans">
                    30 MIN INTRO CALL <span className="text-white/30 mx-2">/</span> <span className="text-white/60">DATE</span>
                  </div>
                  <h3 className="text-2xl sm:text-[32px] font-dm-sans font-extrabold tracking-[-0.5px] text-[#f5f5f5] leading-[32px] sm:leading-[42px]">
                    When works for you?
                  </h3>
                </div>

                {/* Month Selector Bar */}
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 sm:p-6 mb-0 shrink-0">
                  <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/[0.08] mb-3 sm:mb-4">
                    <span className="text-[20px] leading-[28px] font-dm-sans font-bold text-white tracking-normal">
                      {MONTH_NAMES[currentMonth]} {currentYear}
                    </span>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all flex items-center justify-center cursor-pointer focus:outline-none ${
                          activeMonthArrow === 'prev'
                            ? 'border-[#ff6900] bg-[#ff6900]/10 text-[#ff6900]'
                            : 'border-white/[0.12] bg-transparent text-[#9F9F9F] hover:border-white/30 hover:bg-white/5 hover:text-white active:border-[#ff6900] active:bg-[#ff6900]/10 active:text-[#ff6900]'
                        }`}
                        aria-label="Previous month"
                      >
                        <ArrowLeft size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all flex items-center justify-center cursor-pointer focus:outline-none ${
                          activeMonthArrow === 'next'
                            ? 'border-[#ff6900] bg-[#ff6900]/10 text-[#ff6900]'
                            : 'border-white/[0.12] bg-transparent text-[#9F9F9F] hover:border-white/30 hover:bg-white/5 hover:text-white active:border-[#ff6900] active:bg-[#ff6900]/10 active:text-[#ff6900]'
                        }`}
                        aria-label="Next month"
                      >
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Weekday Header & Days Grid with Smooth Transitions */}
                  <div className="relative">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={`${currentYear}-${currentMonth}`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        className="w-full"
                      >
                        {/* Weekday Header */}
                        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center">
                          {WEEKDAYS.map((wd) => (
                            <div key={wd} className="text-[10px] font-semibold text-white/40 py-1 font-sans">
                              {wd}
                            </div>
                          ))}
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
                          {calendarDays.map((day, idx) => {
                            if (day === null) {
                              return <div key={`empty-${currentYear}-${currentMonth}-${idx}`} className="h-10 sm:h-11" />;
                            }

                            const disabled = isDateDisabled(day);
                            const selected = isDateSelected(day);
                            const isCurrentDay =
                              today.getFullYear() === currentYear &&
                              today.getMonth() === currentMonth &&
                              today.getDate() === day;

                            return (
                              <button
                                key={`day-${currentYear}-${currentMonth}-${day}`}
                                type="button"
                                disabled={disabled}
                                onClick={() => handleSelectDay(day)}
                                className={`h-10 sm:h-11 rounded-xl text-sm font-light tracking-[0.02em] transition-all relative flex items-center justify-center ${
                                  selected
                                    ? 'bg-[#ff6900] text-white shadow-[0_0_16px_rgba(255,105,0,0.45)] scale-105 z-10'
                                    : disabled
                                    ? 'text-white/10 cursor-not-allowed'
                                    : 'text-white/70 hover:text-white hover:bg-white/[0.08] cursor-pointer'
                                }`}
                              >
                                {day}
                                {isCurrentDay && !selected && (
                                  <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#ff6900]" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between gap-4 mt-6 sm:mt-8 pt-0 pb-6 md:pb-8 shrink-0">
                  <div className="text-sm leading-[22px] text-white/50 font-light min-w-0">
                    {selectedDate ? (
                      <span className="text-white font-normal inline-flex items-center gap-1.5 whitespace-nowrap text-sm">
                        <Check size={16} strokeWidth={2.5} className="text-[#ff6900] shrink-0" />
                        <span>
                          <span className="sm:hidden">
                            {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </span>
                          <span className="hidden sm:inline text-[14px]">
                            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                          </span>
                        </span>
                      </span>
                    ) : (
                      <>
                        <span className="sm:hidden text-white/50 text-xs">Weekdays only</span>
                        <span className="hidden sm:inline text-[14px]">Weekdays only. Pick any open day that fits your schedule.</span>
                      </>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={!selectedDate}
                    onClick={() => setStep(2)}
                    className={`inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full text-sm font-normal transition-all duration-300 shrink-0 ${
                      selectedDate
                        ? 'bg-white text-black hover:bg-[#ff6900] hover:text-white cursor-pointer shadow-lg'
                        : 'bg-[#262626] text-[#888888] cursor-not-allowed opacity-100'
                    }`}
                  >
                    <span>Choose Time</span>
                    <ArrowRight size={16} className="shrink-0" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Time Selection */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col w-full min-h-0"
              >
                <div className="mb-6 md:mb-8 shrink-0">
                  <div className="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-[#ff6900] block mb-2 font-sans">
                    30 MIN INTRO CALL <span className="text-white/30 mx-2">/</span> <span className="text-white/60">TIME</span>
                  </div>
                  <h3 className="text-2xl sm:text-[32px] font-dm-sans font-extrabold tracking-[-0.5px] text-[#f5f5f5] leading-[32px] sm:leading-[42px]">
                    What time fits best?
                  </h3>
                  <div className="flex flex-wrap items-center gap-2.5 mt-4">
                    <span className="text-xs sm:text-sm font-normal text-[#f5f5f5] flex items-center gap-1.5 sm:gap-2 bg-[#ff6900]/10 border border-[#ff6900]/30 px-3.5 py-1.5 rounded-full">
                      <Globe size={14} strokeWidth={2} className="text-[#ff6900]" />
                      {userTimezone}
                    </span>
                    {selectedDate && (
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs sm:text-sm font-normal text-[#f5f5f5] hover:text-white flex items-center gap-1.5 sm:gap-2 bg-[#ff6900]/10 border border-[#ff6900]/30 hover:border-[#ff6900]/50 hover:bg-[#ff6900]/20 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer group"
                      >
                        <CalendarIcon size={14} strokeWidth={2} className="text-[#ff6900]" />
                        <span className="sm:hidden">
                          {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </span>
                        <span className="hidden sm:inline text-[14px]">
                          {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Time Slots Section - Always scrollable on mobile */}
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 sm:p-6 max-h-[288px] sm:max-h-none overflow-y-auto sm:overflow-visible custom-scrollbar overscroll-contain">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 pr-2 sm:pr-0">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = selectedTime === slot;
                      const isPast = isSlotDisabled(slot);
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isPast}
                          onClick={() => {
                            if (!isPast) setSelectedTime(slot);
                          }}
                          className={`h-12 rounded-lg text-sm sm:text-base font-light tracking-[0.02em] border transition-all flex items-center justify-center gap-2 select-none ${
                            isPast
                              ? 'bg-white/[0.01] border-white/[0.04] text-white/20 cursor-not-allowed pointer-events-none'
                              : isSelected
                              ? 'bg-[#ff6900] border-[#ff6900] text-white shadow-[0_0_16px_rgba(255,105,0,0.35)] scale-[1.02] cursor-pointer'
                              : 'bg-white/[0.03] border-white/[0.08] text-white/80 hover:border-white/25 hover:bg-white/[0.06] hover:text-white cursor-pointer'
                          }`}
                        >
                          <Clock size={15} strokeWidth={1.5} className={isPast ? "text-white/20" : isSelected ? "text-white" : "text-[#9F9F9F]"} />
                          <span className="font-light">{slot}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between gap-4 mt-6 sm:mt-8 pt-0 pb-6 md:pb-8 shrink-0">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 group cursor-pointer py-2 px-1"
                  >
                    <ArrowLeft size={16} strokeWidth={1.8} className="text-[#9F9F9F] group-hover:text-white transition-colors shrink-0" />
                    <span className="text-xs font-light tracking-[0.14em] uppercase text-white/60 group-hover:text-[#f5f5f5] transition-colors font-sans">
                      BACK
                    </span>
                  </button>

                  <button
                    type="button"
                    disabled={!selectedTime}
                    onClick={() => setStep(3)}
                    className={`inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full text-sm font-normal tracking-[0.02em] transition-all duration-300 ${
                      selectedTime
                        ? 'bg-white text-black hover:bg-[#ff6900] hover:text-white cursor-pointer shadow-lg'
                        : 'bg-[#262626] text-[#888888] cursor-not-allowed opacity-100'
                    }`}
                  >
                    <span>Continue to Details</span>
                    <ArrowRight size={16} className="shrink-0" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Details Form */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col w-full min-h-0"
              >
                <div className="mb-6 md:mb-8 shrink-0">
                  <div className="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-[#ff6900] block mb-2 font-sans">
                    30 MIN INTRO CALL <span className="text-white/30 mx-2">/</span> <span className="text-white/60">DETAILS</span>
                  </div>
                  <h3 className="text-2xl sm:text-[32px] font-dm-sans font-extrabold tracking-[-0.5px] text-[#f5f5f5] leading-[32px] sm:leading-[42px]">
                    Who should I expect?
                  </h3>
                </div>

                {/* Booking summary banner */}
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 mb-5 sm:mb-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#ff6900]/10 border border-[#ff6900]/30 flex items-center justify-center text-[#ff6900] shrink-0">
                      <Video size={18} />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-medium text-white">
                        30-Min Intro Call (Google Meet)
                      </div>
                      <div className="text-xs sm:text-sm text-white/50 font-light mt-0.5">
                        {selectedDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {selectedTime}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-[#ff6900] hover:text-[#ff9e42] transition-colors p-1.5 cursor-pointer shrink-0"
                    aria-label="Edit date and time"
                  >
                    <Pencil size={16} />
                  </button>
                </div>

                {/* Details Form */}
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-[10px] font-light tracking-[0.14em] uppercase text-white/60 mb-2 font-sans">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Johnson"
                        className="w-full bg-white/[0.04] border border-white/[0.12] focus:border-[#ff6900]/80 rounded-lg px-4 h-14 text-[#f5f5f5] placeholder-white/20 text-base leading-normal font-light outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-light tracking-[0.14em] uppercase text-white/60 mb-2 font-sans">
                        YOUR EMAIL *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onBlur={() => setEmailTouched(true)}
                          placeholder="alex@company.com"
                          className={`w-full bg-white/[0.04] border rounded-lg pl-4 pr-12 h-14 text-[#f5f5f5] placeholder-white/20 text-base leading-normal font-light outline-none transition-colors ${
                            emailTouched && !validateEmail(email).isValid && email.trim()
                              ? 'border-red-500/60 focus:border-red-500'
                              : validateEmail(email).isValid
                              ? 'border-emerald-500/60 focus:border-emerald-500'
                              : 'border-white/[0.12] focus:border-[#ff6900]/80'
                          }`}
                        />
                        {validateEmail(email).isValid && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 pointer-events-none">
                            <Check size={18} strokeWidth={2.2} />
                          </div>
                        )}
                      </div>

                      {/* Domain autocomplete chips */}
                      {(() => {
                        const domainSuggestions = getDomainSuggestions(email);
                        if (domainSuggestions.length === 0) return null;
                        return (
                          <div className="flex flex-wrap items-center gap-2 mt-4">
                            <span className="text-[14px] text-white/40 font-sans font-light tracking-wide">Quick add:</span>
                            {domainSuggestions.slice(0, 7).map((provider) => (
                              <button
                                key={provider}
                                type="button"
                                onClick={() => {
                                  const atIndex = email.indexOf('@');
                                  const local = atIndex !== -1 ? email.slice(0, atIndex) : email;
                                  setEmail(`${local || 'user'}@${provider}`);
                                  setEmailTouched(true);
                                }}
                                className="text-[14px] font-light px-4 py-2 rounded-full bg-white/[0.06] hover:bg-[#ff6900]/20 text-white/80 hover:text-white border border-white/10 hover:border-[#ff6900]/50 transition-colors font-sans cursor-pointer leading-none"
                              >
                                @{provider}
                              </button>
                            ))}
                          </div>
                        );
                      })()}

                      {/* Typo suggestion & error display */}
                      {(() => {
                        const validation = validateEmail(email);
                        if (validation.suggestion) {
                          return (
                            <div className="mt-4 flex items-center gap-2 text-[14px] font-light text-[#ff6900]">
                              <Sparkles size={16} strokeWidth={1.5} className="shrink-0" />
                              <span>
                                Did you mean{' '}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEmail(validation.suggestion!);
                                    setEmailTouched(true);
                                  }}
                                  className="underline font-light hover:text-white cursor-pointer"
                                >
                                  {validation.suggestion}
                                </button>?
                              </span>
                            </div>
                          );
                        }
                        if (emailTouched && validation.error && email.trim()) {
                          return (
                            <p className="mt-4 text-[14px] text-red-400 font-light flex items-center gap-2">
                              <AlertCircle size={16} strokeWidth={1.5} className="shrink-0 text-red-400" />
                              <span>{validation.error}</span>
                            </p>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6">
                    <label className="block text-[10px] font-light tracking-[0.14em] uppercase text-white/60 mb-2 font-sans">
                      TOPIC
                    </label>
                    <div className="relative group">
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className={`w-full appearance-none bg-white/[0.04] border border-white/[0.12] focus:border-[#ff6900]/80 rounded-lg pl-4 pr-12 h-14 text-base leading-normal font-light outline-none transition-colors cursor-pointer ${
                          topic ? 'text-[#f5f5f5]' : 'text-white/40'
                        }`}
                      >
                        <option value="" disabled className="bg-[#161616] text-white/40">Select a topic</option>
                        {TOPICS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#161616] text-[#f5f5f5] py-2">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 group-hover:text-white/80 transition-colors flex items-center justify-center">
                        <ChevronDown size={16} strokeWidth={1.8} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-[10px] font-light tracking-[0.14em] uppercase text-white/60 font-sans">
                        Anything specific you'd like to discuss?
                      </label>
                      <span className="text-[10px] font-light tracking-[0.14em] uppercase text-[#ff6900] font-sans">
                        OPTIONAL
                      </span>
                    </div>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Share a brief overview or questions..."
                      className="w-full bg-white/[0.04] border border-white/[0.12] focus:border-[#ff6900]/80 rounded-lg p-4 text-[#f5f5f5] placeholder-white/20 text-base leading-normal font-light outline-none transition-colors resize-none block"
                    />
                  </div>

                  {/* Form Footer */}
                  <div className="flex items-center justify-between gap-4 mt-6 sm:mt-8 pt-0 pb-6 md:pb-8">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 group cursor-pointer py-2 px-1"
                    >
                      <ArrowLeft size={16} strokeWidth={1.8} className="text-[#9F9F9F] group-hover:text-white transition-colors shrink-0" />
                      <span className="text-xs font-light tracking-[0.14em] uppercase text-white/60 group-hover:text-[#f5f5f5] transition-colors font-sans">
                        BACK
                      </span>
                    </button>

                    <button
                      type="submit"
                      disabled={!name.trim() || !isValidEmail(email) || isSubmitting}
                      className="inline-flex items-center justify-center gap-2 bg-[#0d0d0d] text-[#f5f5f5] border border-white/[0.18] px-6 h-12 rounded-full text-sm font-normal tracking-[0.02em] hover:bg-[#ff6900] hover:text-white hover:border-[#ff6900] transition-all cursor-pointer select-none disabled:bg-[#262626] disabled:text-[#888888] disabled:border-[#262626] disabled:opacity-100 disabled:pointer-events-none group shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Booking Call...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm & Book Call</span>
                          <Check size={16} strokeWidth={2.5} className="shrink-0" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 4: Booking Confirmation & Google Calendar Action */}
            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="flex flex-col items-center text-center pt-1 md:pt-2 pb-4 md:pb-6 w-full shrink-0"
              >
                {/* Checkmark animation badge */}
                <div className="relative mb-2 md:mb-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-[#ff6900] via-[#ff9e42] to-[#155dfc] p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#080808] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#ff6900]/15 to-[#155dfc]/15 pointer-events-none" />
                      <Check size={22} strokeWidth={2.5} className="text-[#ff6900] relative z-10 md:w-6 md:h-6" />
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl sm:text-[30px] font-dm-sans font-extrabold tracking-[-1px] text-[#f5f5f5] mb-2 leading-[32px] sm:leading-[38px]">
                  You're all booked!
                </h3>
                <p className="text-white/60 text-[14px] sm:text-[15px] leading-[20px] sm:leading-[22px] font-light max-w-lg mx-auto mb-4 md:mb-6">
                  <span className="block">A meeting notification has been sent to <span className="text-white font-normal">{email}</span>.</span>
                  <span className="block">Click below to add this event straight to your Google Calendar.</span>
                </p>

                {/* Event Summary Card */}
                <div className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 sm:py-4 sm:px-6 space-y-2 text-left mb-4 md:mb-6">
                  <div>
                    <span className="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-white/40 block font-sans">
                      DATE & TIME
                    </span>
                    <p className="text-[14px] sm:text-[15px] leading-[20px] sm:leading-[22px] font-normal text-[#f5f5f5] break-words mt-1">
                      {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {selectedTime}
                    </p>
                  </div>
                  
                  <div className="w-full h-[1px] bg-white/[0.06]" />

                  <div>
                    <span className="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-white/40 block font-sans">
                      HOST
                    </span>
                    <p className="text-[14px] sm:text-[15px] leading-[20px] sm:leading-[22px] font-normal text-[#f5f5f5] break-words mt-1">
                      Igor Yukhnin ({CONTACT_INFO.email})
                    </p>
                  </div>
                  
                  <div className="w-full h-[1px] bg-white/[0.06]" />

                  <div>
                    <span className="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-white/40 block font-sans">
                      PLATFORM
                    </span>
                    <div className="text-[14px] sm:text-[15px] leading-[20px] sm:leading-[22px] font-normal text-[#f5f5f5] break-words mt-1 flex items-center gap-2">
                      <Video size={16} className="text-[#ff6900]" />
                      <span>Google Meet</span>
                    </div>
                  </div>
                  
                  <div className="w-full h-[1px] bg-white/[0.06]" />

                  <div>
                    <span className="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-white/40 block font-sans">
                      TOPIC
                    </span>
                    <p className="text-[14px] sm:text-[15px] leading-[20px] sm:leading-[22px] font-normal text-[#f5f5f5] break-words mt-1">
                      {topic}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 w-full mb-4 md:mb-6">
                  {/* Direct Add to Google Calendar button */}
                  <a
                    href={getGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:flex-1 inline-flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-4 rounded-full bg-[#ff6900] hover:bg-[#ff851a] text-white text-[14px] sm:text-[15px] leading-[20px] sm:leading-[22px] font-normal tracking-[0.02em] transition-all duration-300 shadow-[0_4px_20px_rgba(255,105,0,0.35)] cursor-pointer"
                  >
                    <ExternalLink size={16} />
                    <span>Add to Google Calendar</span>
                  </a>

                  {/* Download .ICS button */}
                  <button
                    type="button"
                    onClick={handleDownloadIcs}
                    className="w-full md:flex-1 inline-flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-4 rounded-full bg-white/[0.05] border border-white/[0.12] hover:bg-white/[0.1] text-[#f5f5f5] hover:text-white text-[14px] sm:text-[15px] leading-[20px] sm:leading-[22px] font-light tracking-[0.02em] transition-all duration-300 cursor-pointer"
                  >
                    <Download size={16} />
                    <span>Download .ICS</span>
                  </button>
                </div>

                {/* Divider between buttons and Done & Close */}
                <div className="w-full h-[1px] bg-white/[0.08] mb-4 md:mb-6" />

                {/* Bottom Done / Close Button */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-center text-[14px] leading-[20px] font-normal text-white underline underline-offset-4 hover:text-white/80 transition-opacity cursor-pointer inline-block"
                >
                  Done & Close
                </button>
              </motion.div>
            )}
            </AnimatePresence>
            </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
