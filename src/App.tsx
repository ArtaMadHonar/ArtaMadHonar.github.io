/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FlagshipSpotlight } from './components/FlagshipSpotlight';
import { InteractiveShowcase } from './components/InteractiveShowcase';
import { EditorialPhilosophy } from './components/EditorialPhilosophy';
import { TeamGallery } from './components/TeamGallery';
import { IdentityStory } from './components/IdentityStory';
import { FooterSection } from './components/FooterSection';
import { DomainDetailPage } from './components/DomainDetailPage';
import { ShowreelModal } from './components/ShowreelModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { TeamMemberModal } from './components/TeamMemberModal';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';
import { SELECTED_WORKS, ProjectWork, TeamMember } from './data/studioData';

const parseDomainFromLocation = (): string | null => {
  if (typeof window === 'undefined') return null;

  // 1. Check clean pathname first (e.g. /commercial-cgi)
  const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '').trim();
  if (pathname) {
    const segments = pathname.split('/');
    const lastSegment = segments[segments.length - 1];
    const matchByPath = SELECTED_WORKS.find((w) => w.id === lastSegment);
    if (matchByPath) return matchByPath.id;
  }

  // 2. Fallback support for hash if present
  const hash = (window.location.hash || '').replace(/^#\/?(domain\/)?/, '').trim();
  if (hash) {
    const matchByHash = SELECTED_WORKS.find((w) => w.id === hash);
    if (matchByHash) return matchByHash.id;
  }

  return null;
};

export default function App() {
  // Active dedicated domain page state (clean URL path e.g. /commercial-cgi)
  const [activeDomainId, setActiveDomainId] = useState<string | null>(() =>
    parseDomainFromLocation()
  );

  // Modal states
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);
  const [activeProject, setActiveProject] = useState<ProjectWork | null>(null);
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const handleRouteChange = () => {
      const domainId = parseDomainFromLocation();
      setActiveDomainId(domainId);
      if (domainId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  const handleOpenDomainPage = useCallback((domainId: string) => {
    try {
      window.history.pushState({ domainId }, '', `/${domainId}`);
    } catch {
      // Fallback in restricted iframe environments if pushState is blocked
    }
    setActiveDomainId(domainId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToHome = useCallback((targetSelector = '#works') => {
    try {
      window.history.pushState({}, document.title, '/');
    } catch {
      // Fallback in restricted iframe environments
    }
    setActiveDomainId(null);

    setTimeout(() => {
      if (!targetSelector || targetSelector === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.querySelector(targetSelector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 60);
  }, []);

  const handleOpenContact = (projId?: string) => {
    setSelectedProjectId(projId);
    setInquiryOpen(true);
  };

  const activeDomain = activeDomainId
    ? SELECTED_WORKS.find((w) => w.id === activeDomainId) || null
    : null;

  return (
    <div className="min-h-screen bg-[#EDE9DF] text-[#1E2424] flex flex-col font-fa selection:bg-[#3E777A] selection:text-[#FAF8F4]">
      {/* 1. Refined Top Navigation Bar */}
      <Navbar
        onOpenContact={() => handleOpenContact(activeDomain?.id)}
        onNavigateHome={
          activeDomain ? (href) => handleBackToHome(href || '#') : undefined
        }
      />

      <main className="flex-1">
        {activeDomain ? (
          /* Dedicated Domain Page View */
          <DomainDetailPage
            domain={activeDomain}
            onSelectDomain={(id) => handleOpenDomainPage(id)}
            onBackToHome={() => handleBackToHome('#works')}
            onSelectMember={(member) => setActiveMember(member)}
            onOpenContact={(id) => handleOpenContact(id)}
          />
        ) : (
          /* Main Studio Home Page View */
          <>
            {/* 2. The Grand Hero Canvas & Studio Overview */}
            <HeroSection
              onOpenShowreel={() => {
                const playerElem = document.getElementById('hero-video-player');
                if (playerElem) {
                  playerElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  const btn = playerElem.querySelector('button');
                  btn?.click();
                }
              }}
              onOpenContact={() => handleOpenContact()}
            />

            {/* 3. Flagship Feature Spotlight: «روز شگفت‌انگیز» (A Wonderful Day) */}
            <FlagshipSpotlight
              onOpenTeaser={() => {
                const playerElem = document.getElementById('hero-video-player');
                if (playerElem) {
                  playerElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  const btn = playerElem.querySelector('button');
                  btn?.click();
                }
              }}
            />

            {/* 4. Interactive Showcase & 5 Studio Domains (Bento Grid -> Enters Dedicated Page) */}
            <InteractiveShowcase
              onSelectProject={(proj) => handleOpenDomainPage(proj.id)}
            />

            {/* 5. Core Capabilities & Studio Vision */}
            <EditorialPhilosophy />

            {/* 6. Co-Founders & Studio Ensemble */}
            <TeamGallery
              onSelectMember={(member) => setActiveMember(member)}
            />

            {/* 7. Identity & Story of Arta Mad Honar */}
            <IdentityStory />
          </>
        )}
      </main>

      {/* 8. Contact & Footer */}
      <FooterSection onOpenContact={() => handleOpenContact(activeDomain?.id)} />

      {/* Interactive Modals */}
      <ShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
      />

      <ProjectDetailModal
        work={activeProject}
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
        onOpenInquiry={(id) => handleOpenContact(id)}
      />

      <TeamMemberModal
        member={activeMember}
        isOpen={!!activeMember}
        onClose={() => setActiveMember(null)}
      />

      <ProjectInquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        defaultProjectId={selectedProjectId}
      />
    </div>
  );
}

