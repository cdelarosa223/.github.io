import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Menu, X, Phone, Mail, 
  Calendar, CheckCircle, ArrowRight, BookOpen, 
  GraduationCap, Users, FileText, HelpCircle 
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

// FAQ Data based on CTC common questions
const faqData = [
  {
    question: "What is the difference between a Preliminary and Clear Credential?",
    answer: "A Preliminary Credential is your first teaching credential, valid for 5 years. It's what you earn after completing your teacher preparation program. A Clear Credential is the permanent credential you receive after completing a 2-year induction program while teaching. Think of Preliminary as 'learning to drive' and Clear as 'full license.'"
  },
  {
    question: "What are the main types of California teaching credentials?",
    answer: "California offers four main credentials: 1) Multiple Subject Credential for elementary teachers (K-6), 2) Single Subject Credential for middle/high school teachers who teach one subject like math or English, 3) Education Specialist Credential for special education teachers, and 4) PK-3 Early Childhood Education Specialist Credential for teaching preschool through 3rd grade."
  },
  {
    question: "Do I need to take the CBEST exam?",
    answer: "As of June 2024, if you have a bachelor's degree from a regionally accredited college or university, you automatically meet the Basic Skills Requirement and do NOT need to take the CBEST. This is great news for many candidates!"
  },
  {
    question: "What is Subject Matter Competence and how do I prove it?",
    answer: "Subject Matter Competence shows you know the content you'll teach. You can prove this by: 1) Passing CSET exams, 2) Completing an approved subject matter program, 3) Having a relevant degree major, or 4) A combination of coursework and exams. We'll help you find the best path based on your background."
  },
  {
    question: "What is a Certificate of Clearance (COC)?",
    answer: "A Certificate of Clearance is a background check document from the CTC that shows you're cleared to work in California schools. You'll need to get fingerprinted through Live Scan. It's not a teaching credential itself, but you need it before you can student teach or work in schools."
  },
  {
    question: "How long does it take to get a teaching credential?",
    answer: "Most credential programs take 1-2 years to complete if attending full-time. This includes coursework and student teaching. If you're working while studying, it may take longer. The good news: you can start teaching with a Preliminary Credential while completing your Clear Credential through induction."
  },
  {
    question: "I taught in another state. Can I transfer my credential to California?",
    answer: "California has specific requirements for out-of-state teachers. You'll need to apply to the CTC and may need to complete additional coursework or exams. The good news: your teaching experience counts! We'll help you navigate the transfer process and identify exactly what you need."
  },
  {
    question: "What is Teacher Induction?",
    answer: "Induction is a 2-year mentoring program for new teachers with Preliminary Credentials. You'll work with an experienced mentor teacher while teaching in your own classroom. Once completed, you'll receive your Clear Credential. It's like having a coach during your first years of teaching."
  }
];

// Credential Landscape Data (6th grade level explanation)
const credentialTypes = [
  {
    title: "Multiple Subject Credential",
    emoji: "📚",
    for: "Elementary School Teachers",
    description: "This credential lets you teach ALL subjects to kids in kindergarten through 6th grade. If you love the idea of teaching reading, math, science, and art to the same group of kids every day, this is for you!",
    gradeLevels: "K-6th grade",
    subjects: "All subjects in one classroom"
  },
  {
    title: "Single Subject Credential",
    emoji: "🔬",
    for: "Middle & High School Teachers",
    description: "This credential lets you teach ONE specific subject (like math, English, science, or history) to students in 6th-12th grade. If you're passionate about one subject and want to teach it in depth, this is your path!",
    gradeLevels: "6th-12th grade",
    subjects: "One subject (Math, English, Science, etc.)"
  },
  {
    title: "Education Specialist Credential",
    emoji: "🌟",
    for: "Special Education Teachers",
    description: "This credential prepares you to teach students with disabilities. You'll learn how to create special learning plans and support students with different needs. It's for teachers who want to make a difference for ALL learners!",
    gradeLevels: "K-12th grade",
    subjects: "Specialized instruction for students with IEPs"
  },
  {
    title: "PK-3 ECE Specialist Credential",
    emoji: "🎨",
    for: "Preschool & Early Elementary Teachers",
    description: "This NEW credential focuses on teaching our youngest learners from preschool through 3rd grade. You'll learn about early childhood development and how to create fun, engaging lessons for little ones!",
    gradeLevels: "Preschool - 3rd grade",
    subjects: "Early learning and development"
  }
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqDialogOpen, setFaqDialogOpen] = useState(false);
  const [landscapeDialogOpen, setLandscapeDialogOpen] = useState(false);
  
  // Refs for sections
  const heroRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  
  // Refs for animated elements
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroHeadlineRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLButtonElement>(null);
  const heroCaptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Hero entrance animation (auto-play on load)
    const heroTl = gsap.timeline({ delay: 0.2 });
    
    heroTl
      .fromTo(heroImageRef.current, 
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }
      )
      .fromTo(heroContentRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
        '-=0.7'
      )
      .fromTo(heroHeadlineRef.current?.querySelectorAll('.word') || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo([heroSubRef.current, heroCtaRef.current],
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(heroCaptionRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        '-=0.2'
      );

    // Hero scroll animation
    const heroScrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onLeaveBack: () => {
          // Reset hero elements when scrolling back to top
          gsap.set([heroImageRef.current, heroContentRef.current], { opacity: 1, x: 0 });
          gsap.set(heroHeadlineRef.current?.querySelectorAll('.word') || [], { opacity: 1, x: 0 });
          gsap.set([heroSubRef.current, heroCtaRef.current, heroCaptionRef.current], { opacity: 1, y: 0 });
        }
      }
    });

    // Hero EXIT animation (70%-100%)
    heroScrollTl
      .fromTo(heroHeadlineRef.current?.querySelectorAll('.word') || [],
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(heroContentRef.current,
        { x: 0, opacity: 1 },
        { x: '20vw', opacity: 0.3, ease: 'power2.in' },
        0.7
      )
      .fromTo(heroImageRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0.3, ease: 'power2.in' },
        0.7
      )
      .fromTo([heroSubRef.current, heroCtaRef.current],
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

    // Journey Section (Section 2)
    const journeyBg = journeyRef.current?.querySelector('.journey-bg') as Element | null;
    const journeyHeadline = journeyRef.current?.querySelector('.journey-headline') as Element | null;
    const journeyBody = journeyRef.current?.querySelector('.journey-body') as Element | null;
    const journeyLabel = journeyRef.current?.querySelector('.journey-label') as Element | null;

    if (journeyBg && journeyHeadline && journeyBody && journeyLabel) {
      const journeyTl = gsap.timeline({
        scrollTrigger: {
          trigger: journeyRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      const journeyLines = journeyHeadline.querySelectorAll('.line');

      journeyTl
        .fromTo(journeyBg,
          { scale: 1.12, x: '6vw', opacity: 0.6 },
          { scale: 1, x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(journeyLines,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0
        )
        .fromTo(journeyBody,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(journeyLabel,
          { y: -12, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(journeyBg,
          { scale: 1, x: 0, opacity: 1 },
          { scale: 1.06, x: '-6vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(journeyLines,
          { y: 0, opacity: 1 },
          { y: '-18vh', opacity: 0, stagger: 0.01, ease: 'power2.in' },
          0.7
        )
        .fromTo(journeyBody,
          { y: 0, opacity: 1 },
          { y: '8vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(journeyLabel,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.7
        );
    }

    // Process Section (Section 3)
    const processImage = processRef.current?.querySelector('.process-image') as Element | null;
    const processText = processRef.current?.querySelector('.process-text') as Element | null;
    const processHeadline = processRef.current?.querySelector('.process-headline') as Element | null;
    const processBody = processRef.current?.querySelector('.process-body') as Element | null;

    if (processImage && processText && processHeadline && processBody) {
      const processTl = gsap.timeline({
        scrollTrigger: {
          trigger: processRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      const processWords = processHeadline.querySelectorAll('.word');

      processTl
        .fromTo(processImage,
          { x: '-60vw', rotate: -2, opacity: 0 },
          { x: 0, rotate: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(processText,
          { x: '40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(processWords,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.05
        )
        .fromTo(processBody,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(processImage,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(processText,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0.3, ease: 'power2.in' },
          0.7
        );
    }

    // Support Section (Section 4)
    const supportBg = supportRef.current?.querySelector('.support-bg') as Element | null;
    const supportHeadline = supportRef.current?.querySelector('.support-headline') as Element | null;
    const supportBody = supportRef.current?.querySelector('.support-body') as Element | null;

    if (supportBg && supportHeadline && supportBody) {
      const supportTl = gsap.timeline({
        scrollTrigger: {
          trigger: supportRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      const supportLines = supportHeadline.querySelectorAll('.line');

      supportTl
        .fromTo(supportBg,
          { scale: 1.12, x: '6vw', opacity: 0.6 },
          { scale: 1, x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(supportLines,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0
        )
        .fromTo(supportBody,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(supportBg,
          { scale: 1, x: 0, opacity: 1 },
          { scale: 1.06, x: '-6vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(supportLines,
          { y: 0, opacity: 1 },
          { y: '-18vh', opacity: 0, stagger: 0.01, ease: 'power2.in' },
          0.7
        )
        .fromTo(supportBody,
          { y: 0, opacity: 1 },
          { y: '8vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }

    // Results Section (Section 5)
    const resultsImage = resultsRef.current?.querySelector('.results-image') as Element | null;
    const resultsText = resultsRef.current?.querySelector('.results-text') as Element | null;
    const resultsHeadline = resultsRef.current?.querySelector('.results-headline') as Element | null;
    const resultsBody = resultsRef.current?.querySelector('.results-body') as Element | null;

    if (resultsImage && resultsText && resultsHeadline && resultsBody) {
      const resultsTl = gsap.timeline({
        scrollTrigger: {
          trigger: resultsRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      const resultsWords = resultsHeadline.querySelectorAll('.word');

      resultsTl
        .fromTo(resultsText,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(resultsImage,
          { x: '60vw', rotate: 2, opacity: 0 },
          { x: 0, rotate: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(resultsWords,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.05
        )
        .fromTo(resultsBody,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(resultsText,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0.3, ease: 'power2.in' },
          0.7
        )
        .fromTo(resultsImage,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0.3, ease: 'power2.in' },
          0.7
        );
    }

    // Services Section (flowing)
    const serviceCards = servicesRef.current?.querySelectorAll('.service-card');
    
    gsap.fromTo(serviceCards || [],
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 0.5,
        }
      }
    );

    // Closing Section (flowing)
    const closingContent = closingRef.current?.querySelectorAll('.closing-animate');
    
    gsap.fromTo(closingContent || [],
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: closingRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 0.5,
        }
      }
    );

    // Global snap for pinned sections
    interface PinnedRange {
      start: number;
      end: number;
      center: number;
    }
    
    const pinned = ScrollTrigger.getAll()
      .filter((st: ScrollTrigger) => st.vars.pin)
      .sort((a: ScrollTrigger, b: ScrollTrigger) => a.start - b.start);
    
    const maxScroll = ScrollTrigger.maxScroll(window);
    
    if (maxScroll && pinned.length > 0) {
      const pinnedRanges: PinnedRange[] = pinned.map((st: ScrollTrigger) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some((r: PinnedRange) => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;
            
            const target = pinnedRanges.reduce((closest: number, r: PinnedRange) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st: ScrollTrigger) => st.kill());
    };
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-10 py-5 flex items-center justify-between bg-[#F6F8F7]/80 backdrop-blur-sm">
        <div className="font-display font-bold text-lg tracking-tight text-[#111]">
          Credential Consulting
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <button onClick={() => scrollToSection(heroRef)} className="text-sm font-medium text-[#111] hover:text-[#D4A24A] transition-colors">
            About
          </button>
          <button onClick={() => scrollToSection(processRef)} className="text-sm font-medium text-[#111] hover:text-[#D4A24A] transition-colors">
            Process
          </button>
          <button onClick={() => scrollToSection(servicesRef)} className="text-sm font-medium text-[#111] hover:text-[#D4A24A] transition-colors">
            Services
          </button>
          <button onClick={() => scrollToSection(closingRef)} className="text-sm font-medium text-[#111] hover:text-[#D4A24A] transition-colors">
            Contact
          </button>
          <button 
            onClick={() => setFaqDialogOpen(true)}
            className="text-sm font-medium text-[#D4A24A] hover:text-[#b88a3d] transition-colors"
          >
            FAQ
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F6F8F7] pt-20 px-6">
          <div className="flex flex-col gap-6">
            <button onClick={() => scrollToSection(heroRef)} className="text-2xl font-display font-bold text-left">
              About
            </button>
            <button onClick={() => scrollToSection(processRef)} className="text-2xl font-display font-bold text-left">
              Process
            </button>
            <button onClick={() => scrollToSection(servicesRef)} className="text-2xl font-display font-bold text-left">
              Services
            </button>
            <button onClick={() => scrollToSection(closingRef)} className="text-2xl font-display font-bold text-left">
              Contact
            </button>
            <button 
              onClick={() => {
                setFaqDialogOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-2xl font-display font-bold text-left text-[#D4A24A]"
            >
              FAQ
            </button>
          </div>
        </div>
      )}

      {/* Section 1: Hero */}
      <section ref={heroRef} className="section-pinned bg-[#F6F8F7] z-10">
        <div ref={heroImageRef} className="absolute left-0 top-0 w-full lg:w-[52vw] h-full">
          <img 
            src="/hero_portrait.jpg" 
            alt="Charity De La Rosa" 
            className="w-full h-full object-cover image-grade"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F6F8F7]/90 lg:to-transparent" />
        </div>
        
        <div ref={heroContentRef} className="absolute right-0 top-0 w-full lg:w-[48vw] h-full bg-[#F6F8F7] flex flex-col justify-center px-6 lg:px-12 pt-20 lg:pt-0">
          <h1 ref={heroHeadlineRef} className="headline-hero text-[#111] mb-6">
            <span className="word inline-block">NAVIGATE</span>{' '}
            <span className="word inline-block">YOUR</span>{' '}
            <span className="word inline-block">PATH</span>{' '}
            <span className="word inline-block">TO</span>{' '}
            <span className="word inline-block">THE</span>{' '}
            <span className="word inline-block">CLASSROOM</span>
          </h1>
          
          <p ref={heroSubRef} className="body-text text-[#6B7280] max-w-md mb-8">
            California educator credentialing, simplified. One-on-one guidance from Charity De La Rosa, 
            with 17 years of higher education and K-12 program administration experience.
          </p>
          
          <button ref={heroCtaRef} className="btn-primary w-fit">
            <Calendar className="w-5 h-5 mr-2" />
            Book a free 20-minute call
          </button>
        </div>
        
        <p ref={heroCaptionRef} className="absolute left-6 lg:left-[3vw] bottom-[6vh] text-sm text-white/90 z-20 hidden lg:block">
          One-on-one guidance for teachers.
        </p>
      </section>

      {/* Section 2: Journey */}
      <section ref={journeyRef} className="section-pinned z-20">
        <div className="journey-bg absolute inset-0">
          <img 
            src="/journey_nature.jpg" 
            alt="Nature journey" 
            className="w-full h-full object-cover image-grade"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F16]/65 via-[#0B1F16]/35 to-transparent" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-[7vw]">
          <span className="journey-label text-label text-[#D4A24A] mb-6">GUIDANCE</span>
          
          <h2 className="journey-headline headline-section text-white max-w-[70vw] mb-8">
            <span className="line block">YOUR</span>
            <span className="line block">JOURNEY</span>
            <span className="line block">STARTS NOW</span>
          </h2>
          
          <p className="journey-body body-text text-white/90 max-w-md">
            From prerequisites to application, we map the steps so you can move forward with clarity. 
            No more confusion about CTC requirements.
          </p>
        </div>
      </section>

      {/* Section 3: Process */}
      <section ref={processRef} className="section-pinned bg-[#F6F8F7] z-30">
        <div className="process-image absolute left-[6vw] top-[14vh] w-[44vw] h-[72vh] hidden lg:block">
          <img 
            src="/process_meeting.jpg" 
            alt="Consultation process" 
            className="w-full h-full object-cover rounded-sm shadow-lg image-grade"
          />
        </div>
        
        <div className="process-text absolute right-0 lg:right-auto lg:left-[54vw] top-0 lg:top-[14vh] w-full lg:w-[40vw] h-full lg:h-[72vh] flex flex-col justify-center px-6 lg:px-0">
          <span className="text-label text-[#D4A24A] mb-4">PROCESS</span>
          
          <h2 className="process-headline headline-section text-[#111] mb-6">
            <span className="word inline-block">A</span>{' '}
            <span className="word inline-block">SIMPLE,</span>{' '}
            <span className="word inline-block">STEADY</span>{' '}
            <span className="word inline-block">PROCESS</span>
          </h2>
          
          <p className="process-body body-text text-[#6B7280] max-w-md mb-6">
            We review your background, identify requirements, and build a plan that fits your timeline—
            whether you're just exploring or ready to apply.
          </p>
          
          <button 
            onClick={() => scrollToSection(servicesRef)}
            className="inline-flex items-center text-[#D4A24A] font-medium hover:underline w-fit"
          >
            See how it works
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </section>

      {/* Section 4: Support */}
      <section ref={supportRef} className="section-pinned z-40">
        <div className="support-bg absolute inset-0">
          <img 
            src="/support_nature.jpg" 
            alt="Support nature" 
            className="w-full h-full object-cover image-grade"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F16]/65 via-[#0B1F16]/35 to-transparent" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-[7vw]">
          <span className="support-label text-label text-[#D4A24A] mb-6">SUPPORT</span>
          
          <h2 className="support-headline headline-section text-white max-w-[70vw] mb-8">
            <span className="line block">SUPPORT</span>
            <span className="line block">AT EVERY</span>
            <span className="line block">TURN</span>
          </h2>
          
          <p className="support-body body-text text-white/90 max-w-md">
            We translate CTC requirements into a plan you can follow—no guesswork, no dead ends. 
            Every question answered, every step clarified.
          </p>
        </div>
      </section>

      {/* Section 5: Results */}
      <section ref={resultsRef} className="section-pinned bg-[#F6F8F7] z-50">
        <div className="results-text absolute left-0 lg:left-[6vw] top-0 lg:top-[14vh] w-full lg:w-[40vw] h-full lg:h-[72vh] flex flex-col justify-center px-6 lg:px-0">
          <span className="text-label text-[#D4A24A] mb-4">RESULTS</span>
          
          <h2 className="results-headline headline-section text-[#111] mb-6">
            <span className="word inline-block">CLEAR</span>{' '}
            <span className="word inline-block">STEPS.</span>{' '}
            <span className="word inline-block">REAL</span>{' '}
            <span className="word inline-block">PROGRESS.</span>
          </h2>
          
          <p className="results-body body-text text-[#6B7280] max-w-md mb-6">
            Clients leave with a concrete plan: what to do next, what to gather, and when to submit. 
            Your roadmap to the classroom, clearly defined.
          </p>
          
          <button 
            onClick={() => scrollToSection(servicesRef)}
            className="inline-flex items-center text-[#D4A24A] font-medium hover:underline w-fit"
          >
            View services
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
        
        <div className="results-image absolute right-[6vw] top-[14vh] w-[44vw] h-[72vh] hidden lg:block">
          <img 
            src="/results_writing.jpg" 
            alt="Planning results" 
            className="w-full h-full object-cover rounded-sm shadow-lg image-grade"
          />
        </div>
      </section>

      {/* Section 6: Services & Pricing */}
      <section ref={servicesRef} className="relative bg-[#F6F8F7] py-20 lg:py-28 z-[60]">
        <div className="px-6 lg:px-[6vw]">
          <span className="text-label text-[#D4A24A] mb-4 block">SERVICES</span>
          
          <h2 className="headline-section text-[#111] max-w-lg mb-4">
            Simple pricing. Real support.
          </h2>
          
          <p className="body-text text-[#6B7280] max-w-md mb-12">
            Choose the level of help that fits your stage—whether you need a single session or end-to-end guidance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-[3vw]">
            {/* Free Intake */}
            <div className="service-card bg-white border border-[#111]/8 p-6 lg:p-8 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 hover:shadow-[0_14px_36px_rgba(0,0,0,0.1)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-[#D4A24A]" />
                <h3 className="font-display font-bold text-lg">20-Minute Intake Call</h3>
              </div>
              <p className="text-3xl font-display font-bold text-[#D4A24A] mb-6">Free</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm text-[#6B7280]">
                  <CheckCircle className="w-5 h-5 text-[#D4A24A] flex-shrink-0 mt-0.5" />
                  Discuss your goals
                </li>
                <li className="flex items-start gap-3 text-sm text-[#6B7280]">
                  <CheckCircle className="w-5 h-5 text-[#D4A24A] flex-shrink-0 mt-0.5" />
                  Identify your pathway
                </li>
                <li className="flex items-start gap-3 text-sm text-[#6B7280]">
                  <CheckCircle className="w-5 h-5 text-[#D4A24A] flex-shrink-0 mt-0.5" />
                  Ask anything
                </li>
              </ul>
              <button className="btn-outline w-full">
                Book now
              </button>
            </div>
            
            {/* Single Session */}
            <div className="service-card bg-white border border-[#111]/8 p-6 lg:p-8 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 hover:shadow-[0_14px_36px_rgba(0,0,0,0.1)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-[#D4A24A]" />
                <h3 className="font-display font-bold text-lg">Single Session</h3>
              </div>
              <p className="text-3xl font-display font-bold text-[#D4A24A] mb-6">$150</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm text-[#6B7280]">
                  <CheckCircle className="w-5 h-5 text-[#D4A24A] flex-shrink-0 mt-0.5" />
                  1-hour deep dive
                </li>
                <li className="flex items-start gap-3 text-sm text-[#6B7280]">
                  <CheckCircle className="w-5 h-5 text-[#D4A24A] flex-shrink-0 mt-0.5" />
                  Document review
                </li>
                <li className="flex items-start gap-3 text-sm text-[#6B7280]">
                  <CheckCircle className="w-5 h-5 text-[#D4A24A] flex-shrink-0 mt-0.5" />
                  Next-step action plan
                </li>
              </ul>
              <button className="btn-primary w-full">
                Get started
              </button>
            </div>
            
            {/* Full Package */}
            <div className="service-card bg-white border border-[#111]/8 p-6 lg:p-8 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 hover:shadow-[0_14px_36px_rgba(0,0,0,0.1)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-6 h-6 text-[#D4A24A]" />
                <h3 className="font-display font-bold text-lg">Full Support Package</h3>
              </div>
              <p className="text-3xl font-display font-bold text-[#D4A24A] mb-6">$550</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm text-[#6B7280]">
                  <CheckCircle className="w-5 h-5 text-[#D4A24A] flex-shrink-0 mt-0.5" />
                  4 sessions + email support
                </li>
                <li className="flex items-start gap-3 text-sm text-[#6B7280]">
                  <CheckCircle className="w-5 h-5 text-[#D4A24A] flex-shrink-0 mt-0.5" />
                  Application roadmap
                </li>
                <li className="flex items-start gap-3 text-sm text-[#6B7280]">
                  <CheckCircle className="w-5 h-5 text-[#D4A24A] flex-shrink-0 mt-0.5" />
                  CTC timeline tracking
                </li>
              </ul>
              <button className="btn-primary w-full">
                Choose package
              </button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="mt-16 flex flex-wrap gap-4">
            <button 
              onClick={() => setFaqDialogOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#111]/10 rounded-full text-sm font-medium hover:border-[#D4A24A] transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-[#D4A24A]" />
              Read the FAQ
            </button>
            <button 
              onClick={() => setLandscapeDialogOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#111]/10 rounded-full text-sm font-medium hover:border-[#D4A24A] transition-colors"
            >
              <BookOpen className="w-4 h-4 text-[#D4A24A]" />
              Understand CA Credentials
            </button>
          </div>
        </div>
      </section>

      {/* Section 7: Closing CTA */}
      <section ref={closingRef} className="relative bg-[#0B1F16] py-20 lg:py-28 z-[70]">
        <div className="px-6 lg:px-[6vw]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="closing-animate headline-section text-white mb-6">
                READY TO BEGIN?
              </h2>
              
              <p className="closing-animate body-text text-white/80 max-w-md mb-8">
                Book your free intake call. We'll map your next steps together and answer all your questions about California credentialing.
              </p>
              
              <button className="closing-animate btn-primary mb-4">
                <Calendar className="w-5 h-5 mr-2" />
                Book a free 20-minute call
              </button>
              
              <p className="closing-animate text-sm text-white/60">
                Or email{' '}
                <a href="mailto:hello@credentialconsulting.com" className="text-[#D4A24A] hover:underline">
                  hello@credentialconsulting.com
                </a>
              </p>
            </div>
            
            <div className="closing-animate bg-white p-8 rounded-sm">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-5 h-5 text-[#D4A24A]" />
                <h3 className="font-display font-bold text-lg">Get in Touch</h3>
              </div>
              
              <p className="text-[#6B7280] mb-4">
                We typically reply within 1 business day.
              </p>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setFaqDialogOpen(true)}
                  className="flex items-center gap-2 text-[#D4A24A] hover:underline"
                >
                  <FileText className="w-4 h-4" />
                  Read the FAQ
                </button>
                <button 
                  onClick={() => setLandscapeDialogOpen(true)}
                  className="flex items-center gap-2 text-[#D4A24A] hover:underline"
                >
                  <BookOpen className="w-4 h-4" />
                  Understand CA Credentials
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-[#111]/10">
                <p className="text-sm text-[#6B7280]">
                  <span className="font-medium text-[#111]">Charity De La Rosa</span>
                  <br />
                  Owner & Consultant
                  <br />
                  17 years in higher education & K-12 administration
                </p>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/50">
              © 2024 Credential Consulting. All rights reserved.
            </p>
            <p className="text-sm text-white/50">
              Helping educators navigate California credentialing since 2010.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Dialog */}
      <Dialog open={faqDialogOpen} onOpenChange={setFaqDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-2xl">
              Frequently Asked Questions
            </DialogTitle>
          </DialogHeader>
          
          <p className="text-[#6B7280] mb-6">
            Common questions about California educator credentialing, answered in plain English.
          </p>
          
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-[#111]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#6B7280]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-8 pt-6 border-t border-[#111]/10">
            <p className="text-sm text-[#6B7280]">
              Still have questions?{' '}
              <a href="mailto:hello@credentialconsulting.com" className="text-[#D4A24A] hover:underline">
                Reach out to Charity
              </a>{' '}
              for personalized guidance.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Credential Landscape Dialog */}
      <Dialog open={landscapeDialogOpen} onOpenChange={setLandscapeDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-2xl">
              California Teaching Credentials Explained
            </DialogTitle>
          </DialogHeader>
          
          <p className="text-[#6B7280] mb-8">
            A simple guide to understanding the different types of teaching credentials in California. 
            Explained at a level anyone can understand! 🍎
          </p>
          
          <div className="space-y-6">
            {credentialTypes.map((type, index) => (
              <div key={index} className="bg-[#F6F8F7] p-6 rounded-sm">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{type.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg text-[#111] mb-1">
                      {type.title}
                    </h3>
                    <p className="text-sm text-[#D4A24A] font-medium mb-3">
                      For: {type.for}
                    </p>
                    <p className="text-[#6B7280] mb-4">
                      {type.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full">
                        <GraduationCap className="w-4 h-4 text-[#D4A24A]" />
                        Grades: {type.gradeLevels}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full">
                        <BookOpen className="w-4 h-4 text-[#D4A24A]" />
                        {type.subjects}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-[#0B1F16] p-6 rounded-sm">
            <h4 className="font-display font-bold text-white mb-3">
              The Two-Step Process
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-[#D4A24A] font-medium mb-2">Step 1: Preliminary Credential</p>
                <p className="text-white/80 text-sm">
                  This is your "learner's permit" to teach. You get it after completing your teacher 
                  preparation program. It's valid for 5 years.
                </p>
              </div>
              <div>
                <p className="text-[#D4A24A] font-medium mb-2">Step 2: Clear Credential</p>
                <p className="text-white/80 text-sm">
                  This is your "full license." You earn it after completing a 2-year induction program 
                  while teaching in your own classroom.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-[#111]/10">
            <p className="text-sm text-[#6B7280]">
              Want help figuring out which credential is right for you?{' '}
              <button 
                onClick={() => {
                  setLandscapeDialogOpen(false);
                  scrollToSection(closingRef);
                }}
                className="text-[#D4A24A] hover:underline"
              >
                Book a free consultation
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
