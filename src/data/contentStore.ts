import defaultData from './studioContent.json';
import type { ProjectWork, TeamMember } from './studioData';

export interface StudioSeoSettings {
  siteTitle: string;
  siteTitleEn: string;
  description: string;
  keywords: string;
  ogImage: string;
  siteUrl: string;
}

export interface HeroContent {
  titleFa: string;
  titleEn: string;
  badges: string[];
  teaserTitle: string;
  teaserGenre: string;
  teaserPipeline: string;
  videoUrl: string;
  posterUrl: string;
}

export interface ConceptSlide {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

export interface FlagshipSpotlightContent {
  titleFa: string;
  titleEn: string;
  subBadge: string;
  genre: string;
  audience: string;
  logline: string;
  slides: ConceptSlide[];
}

export interface CapabilityPillar {
  num: string;
  title: string;
  en: string;
  keywords: string[];
}

export interface FooterContent {
  address: string;
  email: string;
  googleMapsUrl: string;
  copyrightText: string;
  socials: {
    instagram: string;
    linkedin: string;
    youtube: string;
    telegram: string;
  };
}

export interface HomeContent {
  hero: HeroContent;
  flagshipSpotlight: FlagshipSpotlightContent;
  capabilities: CapabilityPillar[];
  footer: FooterContent;
}

export interface GameLabHighlights {
  dailyPlaytimeMinutes: string;
  dailyPlaytimeLabel: string;
  dailyPlaytimeSub: string;
  mobileGameTitle: string;
  mobileGameSubtitle: string;
  mobileGameDescription: string;
  pcGameTitle: string;
  pcGameSubtitle: string;
  pcGameDescription: string;
}

export interface StudioContent {
  seo: StudioSeoSettings;
  home: HomeContent;
  gameLabHighlights: GameLabHighlights;
  selectedWorks: ProjectWork[];
  teamMembers: TeamMember[];
  wonderfulDayCatalog: typeof defaultData.wonderfulDayCatalog;
  characterConcepts: typeof defaultData.characterConcepts;
  studioCatalogInfo: typeof defaultData.studioCatalogInfo;
}

const STORAGE_KEY = 'amh-studio-content';

/** Get the currently active studio content (LocalStorage override in browser, or file defaults) */
export function getStudioContent(): StudioContent {
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.selectedWorks && parsed.teamMembers) {
          return {
            ...defaultData,
            ...parsed,
          } as StudioContent;
        }
      }
    } catch {
      // Ignore localStorage parse errors
    }
  }
  return defaultData as unknown as StudioContent;
}

/** Save updated content to both browser LocalStorage and the local disk API */
export async function saveStudioContent(newContent: StudioContent): Promise<{ success: boolean; diskSaved: boolean; error?: string }> {
  // 1. Always save to LocalStorage for immediate browser reactivity
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
      window.dispatchEvent(new CustomEvent('amh-content-updated', { detail: newContent }));
    } catch (err) {
      console.warn('LocalStorage save failed:', err);
    }
  }

  // 2. Attempt saving to disk via local dev API
  let diskSaved = false;
  try {
    const res = await fetch('/api/admin/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContent),
    });
    if (res.ok) {
      diskSaved = true;
    }
  } catch {
    // Disk API unavailable (e.g. static hosting)
  }

  return { success: true, diskSaved };
}

/** Reset content to default factory state */
export async function resetStudioContentToDefault(): Promise<StudioContent> {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('amh-content-updated', { detail: defaultData }));
    } catch {
      // Ignore
    }
  }
  await saveStudioContent(defaultData as unknown as StudioContent);
  return defaultData as unknown as StudioContent;
}
