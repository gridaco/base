import { DesignPlatform, SdkVersion, StorableLayerType, StorableSceneType } from '@bridged.xyz/client-sdk';
import { Injectable } from '@nestjs/common';
import * as dynamoose from "dynamoose";
import { NestedLayerRecord, Scene, NestedLayer, SceneRecord } from "../app.entity"


@Injectable()
export class ScenesService {
    async registerScreen(request) {

        const sdkVer = SdkVersion.v2020_0

        const someChild = <NestedLayerRecord>{
            nodeId: "other",
            key: 'yolo',
            index: 0,
            name: "text:1",
            sdkVersion: sdkVer,
            node: {
                text: "hi~"
            },
            type: StorableLayerType.vanilla,
            layers: undefined,
            componentId: undefined,
            width: 0,
            height: 0,
        }

        const layer = <NestedLayerRecord>{
            id: "testing id",
            nodeId: "",
            key: undefined,
            index: 0,
            name: "",
            sdkVersion: sdkVer,
            node: {
                anything: "test"
            },
            type: StorableLayerType.vanilla,
            layers: [someChild,],
            componentId: undefined,
            width: 0,
            height: 0,
        }


        const scene = new Scene({
            id: "test",
            projectId: "demo",
            fileId: "test",
            nodeId: "test",
            sdkVersion: sdkVer,
            designPlatform: DesignPlatform.figma,
            cachedPreview: "https://example.com/dog.png",
            sceneType: StorableSceneType.screen,
            route: "/home",
            path: "/home",
            name: "home",
            description: "home screen",
            tags: ["1", "2"],
            alias: "home",
            variant: "default",
            layers: [layer],
            width: 100,
            height: 100,
        });

        // const saved = await scene.save()

        const saved = await new Scene(request).save()

        return saved
    }

    async fetchScene(id: string) {
        const scene = await Scene.get({ id: id })
        return scene
    }

    async updateSceneInfo(request: {
        name?: string
        tags?: string[]
        description?: string
    }) {
        // update only provided field

        if (request.name) {
            // update name
        }

        if (request.tags) {
            // update tags
        }

        if (request.description) {
            // update description
        }
    }
}
