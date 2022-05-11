import { Prisma } from "@prisma/client";

export const post_summary_select: Prisma.PostSelect = {
  id: true,
  title: true,
  slug: true,
  createdAt: true,
  postedAt: true,
};
