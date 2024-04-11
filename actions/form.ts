"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs";
import { FormSchemaType, formSchema } from "../schemas/form";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

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

  let submissionsRate = 0;

  if (visits > 0) {
    submissionsRate = (submissions / visits) * 100;
  }

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
    throw new UserNotFoundError();
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
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    if (error instanceof UserNotFoundError) {
      throw new Error(error.message);
    }

    if (error instanceof PrismaClientValidationError) {
      throw new Error(error.message);
    }

    throw new Error(JSON.stringify(error));
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    if (error instanceof UserNotFoundError) {
      throw new Error(error.message);
    }
    if (error instanceof PrismaClientValidationError) {
      throw new Error(error.message);
    }

    throw new Error(JSON.stringify(error));
  }
}

export async function getFormById(formId: string) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  try {
    const form = await prisma.form.findUnique({
      where: {
        userId: user.id,
        id: +formId,
      },
    });

    return form;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    if (error instanceof UserNotFoundError) {
      throw new Error(error.message);
    }
    if (error instanceof PrismaClientValidationError) {
      throw new Error(error.message);
    }

    throw new Error(JSON.stringify(error));
  }
}

export async function updateFormContent(id: number, jsonContent: string) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  try {
    const form = await prisma.form.update({
      where: {
        id: id,
        userId: user.id,
      },
      data: {
        content: jsonContent,
      },
    });
    return form;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    if (error instanceof UserNotFoundError) {
      throw new Error(error.message);
    }
    if (error instanceof PrismaClientValidationError) {
      throw new Error(error.message);
    }

    throw new Error(JSON.stringify(error));
  }
}

export async function PublishForm(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  try {
    const form = await prisma.form.update({
      where: {
        id: id,
        userId: user.id,
      },
      data: {
        published: true,
      },
    });
    return form;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    if (error instanceof UserNotFoundError) {
      throw new Error(error.message);
    }
    if (error instanceof PrismaClientValidationError) {
      throw new Error(error.message);
    }

    throw new Error(JSON.stringify(error));
  }
}

export async function GetFormWithSubmissions(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  try {
    const form = await prisma.form.findUnique({
      where: {
        id: id,
        userId: user.id,
      },
      include: {
        FormSubmisions: true,
      },
    });
    return form;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    if (error instanceof UserNotFoundError) {
      throw new Error(error.message);
    }
    if (error instanceof PrismaClientValidationError) {
      throw new Error(error.message);
    }

    throw new Error(JSON.stringify(error));
  }
}

export async function GetFormContentByUrl(formUrl: string) {
  return await prisma.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareUrl: formUrl,
    },
  });
}

export async function SubmitForm(formUrl: string, content: string) {
  return await prisma.form.update({
    data: {
      submissions: {
        increment: 1,
      },
      FormSubmisions: {
        create: {
          content,
        },
      },
    },
    where: {
      shareUrl: formUrl,
      published: true,
    },
  });
}
