-- CreateTable
CREATE TABLE "Members" (
    "userId" INTEGER NOT NULL,
    "workspaceID" INTEGER NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("userId","workspaceID")
);
