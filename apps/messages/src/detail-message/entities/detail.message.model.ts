export interface IDetailMessageModel {
  messageId: string;
  isRead: boolean;
  action: string;
  bannerUri: string | null;
  commission: string | null;
  userIds: string | null;
  typeAction: string;
  targetUserId: number | null;
  refUserId: number | null;
  amount: number | null;
  content: string | null;
  status: string;
}
