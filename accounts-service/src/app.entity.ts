import { AssetType } from '@bridged.xyz/client-sdk/lib';
import * as dynamoose from 'dynamoose';
import { nanoid } from 'nanoid';

type UserSocialProvider = 'GITHUB';

type UserGender = 'M' | 'F' | 'X';

type UserType = 'NORMAL' | 'ADMINISTRATOR';

export interface UserSocial {
  id: string;
  provider: UserSocialProvider;
  token?: string;
  status?: string;
  registeredAt: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  userId: string;
}

export interface UserTable {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  isEmailVerified: boolean;
  isEmailSubscribed: boolean;
  unsubscribedAt?: Date;
  phoneNumber?: string;
  password: string;
  profileImageURL?: string;
  bio?: string;
  gender: UserGender;
  birthday?: Date;
  registeredAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  referrer: string;
  type: UserType;
  isApproved: boolean;
  social: UserSocial[];
}

type OrganizationType = 'PERSONAL' | 'GROUP';

export interface OrganizationTable {
  id: string;
  name: string;
  description?: string;
  type: OrganizationType;
  createdAt: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  organizationUsers: OrganizationUserTable[];
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
