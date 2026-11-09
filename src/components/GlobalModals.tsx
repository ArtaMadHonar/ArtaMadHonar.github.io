import React, { useState, useEffect } from 'react';
import { ProjectInquiryModal } from './ProjectInquiryModal';
import { TeamMemberModal } from './TeamMemberModal';
import { ProjectDetailModal } from './ProjectDetailModal';
import { ShowreelModal } from './ShowreelModal';
import type { TeamMember, ProjectWork, DomainGalleryItem } from '../data/studioData';

export const GlobalModals: React.FC = () => {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);

  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
  const [activeProject, setActiveProject] = useState<(ProjectWork | DomainGalleryItem) | null>(null);
  const [showreelOpen, setShowreelOpen] = useState(false);

  useEffect(() => {
    const handleInquiry = (e: Event) => {
      const custom = e as CustomEvent<{ projectId?: string }>;
      setSelectedProjectId(custom.detail?.projectId);
      setInquiryOpen(true);
    };

    const handleMember = (e: Event) => {
      const custom = e as CustomEvent<{ member: TeamMember }>;
      setActiveMember(custom.detail?.member || null);
    };

    const handleProject = (e: Event) => {
      const custom = e as CustomEvent<{ work: ProjectWork | DomainGalleryItem }>;
      setActiveProject(custom.detail?.work || null);
    };

    const handleShowreel = () => {
      setShowreelOpen(true);
    };

    window.addEventListener('amh:open-inquiry', handleInquiry);
    window.addEventListener('amh:open-member', handleMember);
    window.addEventListener('amh:open-project', handleProject);
    window.addEventListener('amh:open-showreel', handleShowreel);

    return () => {
      window.removeEventListener('amh:open-inquiry', handleInquiry);
      window.removeEventListener('amh:open-member', handleMember);
      window.removeEventListener('amh:open-project', handleProject);
      window.removeEventListener('amh:open-showreel', handleShowreel);
    };
  }, []);

  return (
    <>
      <ProjectInquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        defaultProjectId={selectedProjectId}
      />

      <TeamMemberModal
        member={activeMember}
        isOpen={!!activeMember}
        onClose={() => setActiveMember(null)}
      />

      <ProjectDetailModal
        work={activeProject}
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
        onOpenInquiry={(id) => {
          setActiveProject(null);
          setSelectedProjectId(id);
          setInquiryOpen(true);
        }}
      />

      <ShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
      />
    </>
  );
};
