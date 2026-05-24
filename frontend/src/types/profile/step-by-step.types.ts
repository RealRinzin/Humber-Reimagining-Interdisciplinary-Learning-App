export interface StepByStepDtypes {
  topics: any[];
  hoveredTopicId?: string | null;
  onHover?: (id: string) => void;
  onLeave?: () => void;
  totalCount: () => number;
}
