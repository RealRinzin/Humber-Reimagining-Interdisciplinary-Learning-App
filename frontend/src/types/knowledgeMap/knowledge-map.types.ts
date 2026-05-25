export interface StepByStepDtypes {
  topics: any[];
  hoveredTopicId?: string | null;
  onHover?: (id: string) => void;
  onLeave?: () => void;
  totalCount: () => number;
}
export interface ExploreMode {
  topics: any[];
  hoveredTopicId?: string | null;
  onHover?: (id: string) => void;
  onLeave?: () => void;
  totalCount: () => number;
}

export interface FoundationFirst {
  topics: any[];
  hoveredTopicId?: string | null;
  onHover?: (id: string) => void;
  onLeave?: () => void;
  totalCount: () => number;
}
