import { UserSocialProvider, UserGender, UserType } from './user.constants';

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
