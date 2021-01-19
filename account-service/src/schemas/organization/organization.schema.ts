import * as dynamoose from 'dynamoose';
import { nanoid } from 'nanoid';

import { UserSchema } from '../user/user.schema';
import { OrganizationTypes } from './organization.constants';

const OrganizationSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      default: () => nanoid(),
    },
    name: { type: String, required: true },
    description: { type: String },
    type: {
      type: String,
      enum: Object.values(OrganizationTypes),
      required: true,
    },
    isDeleted: { type: Boolean, required: true, default: false },
    deletedAt: { type: Date },
    projects: { type: Set, schema: [String], default: [] },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: null,
    },
  }
);

const TABLE_ORGANIZATION = process.env.DYNAMODB_TABLE_ORGANIZATION;
export const OrganizationModel = dynamoose.model(
  TABLE_ORGANIZATION,
  OrganizationSchema,
  {
    create: false,
  }
);

const OrganizationUserSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      default: () => nanoid(),
    },
    organization: { type: String, schema: OrganizationSchema.schemaObject },
    user: { type: String, schema: UserSchema.schemaObject },
    isOwner: { type: Boolean, required: true, default: false },
    isDeleted: { type: Boolean, required: true, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: {
      createdAt: 'joinedAt',
      updatedAt: null,
    },
  }
);

const TABLE_ORGANIZATION_USER = process.env.DYNAMODB_TABLE_ORGANIZATION_USER;
export const OrganizationUserModel = dynamoose.model(
  TABLE_ORGANIZATION_USER,
  OrganizationUserSchema,
  {
    create: false,
  }
);

const OrganizationSubscriptionSchema = new dynamoose.Schema({
  id: {
    type: String,
    default: () => nanoid(),
  },
  organization: { type: String, schema: OrganizationSchema.schemaObject },
  currentSubscription: { type: String, required: true },
  subscriptions: { type: Set, schema: [String], required: true },
  isDeleted: { type: Boolean, required: true, default: false },
  deletedAt: { type: Date },
});

const TABLE_ORGANIZATION_SUBSCRIPTION =
  process.env.DYNAMODB_TABLE_ORGANIZATION_SUBSCRIPTION;
export const OrganizationSubscriptionModel = dynamoose.model(
  TABLE_ORGANIZATION_SUBSCRIPTION,
  OrganizationSubscriptionSchema,
  {
    create: false,
  }
);
