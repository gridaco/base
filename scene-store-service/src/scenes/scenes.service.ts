import { Injectable, NotFoundException } from "@nestjs/common";
import { versions } from "@base-sdk/base";
import { SceneRegisterRequest } from "@base-sdk/scene-store/dist/__api/requests";
import { SceneRecord } from "@prisma/client";
import { PrismaService } from "../_prisma/prisma.service";

const SDK_VER = versions.SdkVersion.v2020_0;

// how to handle nested component? -> we should also upload the components linked. how to handle this case.
@Injectable()
export class ScenesService {
  constructor(private readonly prisma: PrismaService) {}

  async registerScreen(user, request: SceneRegisterRequest) {
    const new_rec = await this.prisma.sceneRecord.create({
      data: {
        ...request /** just in case that field is missing by developer's miss */,
        owner: user.id,
        fileId: request.fileId,
        nodeId: request.nodeId,
        sdkVersion: SDK_VER,
        description: request.description,
        tags: request.initialTags,
        rawname: request.rawname,
        raw: request.raw,
        from: request.from,
        width: request.width,
        height: request.height,
        sharing: request.initialSharingPolicy?.policy,
      },
    });

    return new_rec;
  }

  async fetchScene(user, id: string): Promise<SceneRecord> {
    const rec = await this.canAccess(user, id);
    if (rec) {
      return rec;
    }
    // return 404 instead 403
    throw new NotFoundException("resource not found");
  }

  async fetchSharedScene(id: string) {
    const rec = this.canReadAsShared(undefined, id);
    if (!rec) {
      throw new NotFoundException("resource not found");
    }
    return rec;
  }
  async fetchMyScenes(user) {
    return await this.prisma.sceneRecord.findMany({
      where: {
        owner: user.id,
      },
    });
  }

  // async updateSceneInfo(request: {
  //   name?: string;
  //   tags?: string[];
  //   description?: string;
  // }) {
  //   //
  //   throw "not implemented";
  // }

  // multipart form request with image data
  async updateScenePreview(user, p: { id: string; preview: string }) {
    if (await this.canAccess(user, p.id)) {
      await this.prisma.sceneRecord.update({
        where: {
          id: p.id,
        },
        data: {
          preview: p.preview,
        },
      });
      return true;
    }
    throw new NotFoundException("resource not found");
  }

  async updateSharingPolicy(
    user,
    id: string,
    sharing: {
      policy: string;
    }
  ) {
    const req = this.canAccess(user, id);
    if (req) {
      await this.prisma.sceneRecord.update({
        where: {
          id,
        },
        data: {
          sharing: sharing.policy,
        },
      });
      return {
        success: true,
        message: "sharing policy updated successfully",
        policy: sharing.policy,
      };
    }
  }

  private async canAccess(user, id): Promise<SceneRecord | false> {
    const rec = await this.prisma.sceneRecord.findUnique({ where: { id } });
    if (rec) {
      if (rec.owner == user.id) {
        return rec;
      }
      return false;
    }
    throw new NotFoundException("resource not found");
  }

  private async canReadAsShared(
    user: any | undefined,
    id: string
  ): Promise<SceneRecord | false> {
    const removeSensitive = (r: SceneRecord): SceneRecord => {
      return <SceneRecord>{
        ...r,
        // TODO: remove sensitive fields
      };
    };

    const rec = await this.prisma.sceneRecord.findUnique({ where: { id } });
    if (rec) {
      if (user) {
        if (rec.owner == user.id) {
          return rec;
        }
      }
      if (rec.sharing == "*") {
        return removeSensitive(rec);
      }
      return false;
    }
    throw new NotFoundException("resource not found");
  }
}
