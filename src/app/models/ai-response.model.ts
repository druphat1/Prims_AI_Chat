export interface AiResponse {
  id: string;
  personalityId: string;
  personalityName: string;
  emoji: string;
  response: string;
  glowClass: string;
  gradientClass: string;
  isTyping: boolean;
  displayedText: string;
  timestamp: Date;
}
