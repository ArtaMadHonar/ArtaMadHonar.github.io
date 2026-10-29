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

const parseDomainFromHash = (): string | null => {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash || '';
  if (hash.startsWith('#/domain/')) {
    const id = hash.replace('#/domain/', '').trim();
    const exists = SELECTED_WORKS.some((w) => w.id === id);
    return exists ? id : null;
  }
  return null;
};

export default function App() {
  // Active dedicated domain page state (synced with URL hash for GitHub Pages)
  const [activeDomainId, setActiveDomainId] = useState<string | null>(() =>
    parseDomainFromHash()
  );

  // Modal states
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);
  const [activeProject, setActiveProject] = useState<ProjectWork | null>(null);
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const domainId = parseDomainFromHash();
      setActiveDomainId(domainId);
      if (domainId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenDomainPage = useCallback((domainId: string) => {
    window.location.hash = `/domain/${domainId}`;
    setActiveDomainId(domainId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToHome = useCallback((targetSelector = '#works') => {
    if (window.location.hash.startsWith('#/domain/')) {
      window.history.pushState(
        '',
        document.title,
        window.location.pathname + window.location.search
      );
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

