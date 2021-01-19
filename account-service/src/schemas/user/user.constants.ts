export enum UserSocialProviders {
  GITHUB = 'GITHUB',
}

export enum UserGenders {
  M = 'M',
  F = 'F',
  X = 'X',
}

export enum UserTypes {
  NORMAL = 'NORMAL',
  ADMINISTRATOR = 'ADMINISTRATOR',
}

export type UserSocialProvider = keyof typeof UserSocialProviders;
export type UserGender = keyof typeof UserGenders;
export type UserType = keyof typeof UserTypes;
