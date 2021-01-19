import { OrganizationType } from './organization.constants';

export interface OrganizationTable {
  id: string;
  name: string;
  description?: string;
  type: OrganizationType;
  createdAt: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  projects: string[];
}

export interface OrganizationUserTable {
  id: string;
  organizationId: string;
  userId: string;
  joinedAt: Date;
  isOwner: boolean;
  isDeleted: boolean;
  deletedAt?: Date;
}

export interface OrganizationSubscriptionTable {
  id: string;
  isDeleted: boolean;
  deletedAt?: Date;
  currentSubscription: string;
  subscriptions: string[];
}
