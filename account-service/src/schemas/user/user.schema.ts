import * as dynamoose from 'dynamoose';
import { nanoid } from 'nanoid';

import { UserSocialProviders, UserGenders, UserTypes } from './user.constants';

const UserSocial = new dynamoose.Schema(
  {
    id: { type: String, required: true },
    provider: {
      type: String,
      required: true,
      enum: Object.values(UserSocialProviders),
    },
    token: { type: String },
    status: { type: String },
    isDeleted: { type: Boolean, required: true, default: false },
    deletedAt: { type: Date },
    userId: { type: String },
  },
  {
    timestamps: {
      createdAt: 'registeredAt',
    },
  }
);

export const UserSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      default: () => nanoid(),
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    isEmailVerified: { type: String, required: true },
    isEmailSubscribed: { type: String, required: true },
    unsubscribedAt: { type: Date },
    phoneNumber: { type: String },
    password: { type: String, required: true },
    profileImageURL: { type: String },
    bio: { type: String },
    gender: {
      type: String,
      enum: Object.values(UserGenders),
      required: true,
    },
    birthday: { type: Date },
    isDeleted: { type: Boolean, required: true, default: false },
    deletedAt: { type: Date },
    referrer: { type: String },
    type: {
      type: String,
      enum: Object.values(UserTypes),
      required: true,
    },
    isApproved: { type: Boolean, required: true, default: false },
    social: {
      type: Set,
      schema: UserSocial.schemaObject,
    },
  },
  {
    timestamps: {
      createdAt: 'registeredAt',
      updatedAt: 'updatedAt',
    },
  }
);

const TABLE_USERS = process.env.DYNAMODB_TABLE_USER;
export const UserModel = dynamoose.model(TABLE_USERS, UserSchema, {
  create: false,
});
