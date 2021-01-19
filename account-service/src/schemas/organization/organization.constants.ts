export enum OrganizationTypes {
  PERSONAL = 'PERSONAL',
  GROUP = 'GROUP',
}

export type OrganizationType = keyof typeof OrganizationTypes;
