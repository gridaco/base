-- CreateEnum
CREATE TYPE "DesignOrigin" AS ENUM ('FIGMA_DESKTOP', 'FIGMA_WEB', 'SKETCH_DESKTOP', 'SKETCH_FILE', 'XD_DESKTOP', 'IMAGE_UPLOAD', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "StorableSceneType" AS ENUM ('ANYNODE', 'SCREEN', 'COMPONENT', 'DOCS');

-- CreateTable
CREATE TABLE "SceneRecord" (
    "owner" TEXT NOT NULL,
    "sharing" TEXT NOT NULL DEFAULT E'none',
    "id" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "nodeId" TEXT NOT NULL,
    "sdkVersion" TEXT NOT NULL,
    "raw" JSONB NOT NULL,
    "rawname" TEXT NOT NULL,
    "preview" TEXT,
    "newname" TEXT,
    "description" TEXT,
    "from" "DesignOrigin" NOT NULL,
    "sceneType" "StorableSceneType" NOT NULL DEFAULT E'ANYNODE',
    "route" TEXT,
    "tags" TEXT[],
    "customdata_1p" JSONB NOT NULL DEFAULT E'{}',
    "customdata_3p" JSONB NOT NULL DEFAULT E'{}',
    "background" TEXT DEFAULT E'#FFFFFF',
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "archivedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SceneRecord.fileId_nodeId_unique" ON "SceneRecord"("fileId", "nodeId");
