"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs";
import { FormSchemaType, formSchema } from "../schemas/form";

class UserNotFoundError extends Error {}

export async function GetFormStats() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionsRate = visits > 0 && (submissions / visits) * 100;

  const bounceRate = 100 - submissions;

  return {
    visits,
    submissions,
    submissionsRate,
    bounceRate,
  };
}

export async function createForm({ name, description }: FormSchemaType) {
  const validation = formSchema.safeParse({ name, description });

  if (!validation.success) {
    throw new Error("Form is not valid");
  }

  const user = await currentUser();

  if (!user) {
    return new UserNotFoundError();
  }
  try {
    const form = await prisma.form.create({
      data: {
        userId: user.id,
        description,
        name,
      },
    });

    if (!form) {
      throw new Error("Something went wrong.");
    }
    return form.id;
  } catch (error) {
    console.error(error);
  }
}

export async function getForms() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  try {
    const forms = await prisma.form.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return forms;
  } catch (error) {
    console.error(error);
  }
}
