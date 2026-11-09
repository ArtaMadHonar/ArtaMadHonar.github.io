import type { TeamMember, ProjectWork, DomainGalleryItem } from '../data/studioData';

export function openInquiryModal(projectId?: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('amh:open-inquiry', { detail: { projectId } }));
  }
}

export function openTeamMemberModal(member: TeamMember) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('amh:open-member', { detail: { member } }));
  }
}

export function openProjectModal(work: ProjectWork | DomainGalleryItem) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('amh:open-project', { detail: { work } }));
  }
}

export function openShowreelModal() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('amh:open-showreel'));
  }
}
