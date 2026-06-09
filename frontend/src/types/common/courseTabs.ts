interface courseTabsTypes {
  title: string;
  content: string;
  videoID: number;
  icon: string;
  type: string;
  status: boolean;
  onStatusUpdate?: () => void;
  all_complete: boolean;
  quizzes?:[] | null;
  ramblings?:[] | null;
  interactive?:[] | null;
  available:boolean;
}