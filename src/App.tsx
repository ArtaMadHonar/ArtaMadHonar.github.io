/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FlagshipSpotlight } from './components/FlagshipSpotlight';
import { InteractiveShowcase } from './components/InteractiveShowcase';
import { EditorialPhilosophy } from './components/EditorialPhilosophy';
import { TeamGallery } from './components/TeamGallery';
import { IdentityStory } from './components/IdentityStory';
import { FooterSection } from './components/FooterSection';
import { ShowreelModal } from './components/ShowreelModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { TeamMemberModal } from './components/TeamMemberModal';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';
import { ProjectWork, TeamMember } from './data/studioData';

export default function App() {
  // Modal states
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);
  const [activeProject, setActiveProject] = useState<ProjectWork | null>(null);
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);

  const handleOpenContact = (projId?: string) => {
    setSelectedProjectId(projId);
    setInquiryOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#18181B] flex flex-col font-fa selection:bg-[#18181B] selection:text-[#FBF9F5]">
      {/* 1. Refined Top Navigation Bar */}
      <Navbar onOpenContact={() => handleOpenContact()} />

      <main className="flex-1">
        {/* 2. The Grand Hero Canvas */}
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

        {/* 4. Interactive Showcase & Filterable Works */}
        <InteractiveShowcase
          onSelectProject={(proj) => setActiveProject(proj)}
        />

        {/* 5. The Editorial R&D Philosophy (تمایز علمی و هنری) */}
        <EditorialPhilosophy />

        {/* 6. The Team Gallery (تیم متخصص آرتا ماد هنر) */}
        <TeamGallery
          onSelectMember={(member) => setActiveMember(member)}
        />

        {/* 7. Identity & Story of Arta Mad Honar (داستان و ریشه نام) */}
        <IdentityStory />
      </main>

      {/* 8. Contact & Footer */}
      <FooterSection onOpenContact={() => handleOpenContact()} />

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
