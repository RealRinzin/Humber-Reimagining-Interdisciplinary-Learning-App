interface courseTabsTypes {
  title: string;
  content: string;
  videoID: number;
  icon: string;
  type: string;
  status: boolean;
  interactive_path?:string,
  onStatusUpdate?: () => void;
  all_complete: boolean;
  quizzes?:[] | null;
  ramblings?:[] | null;
}